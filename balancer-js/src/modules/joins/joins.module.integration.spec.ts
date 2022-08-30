import dotenv from 'dotenv';
import { expect } from 'chai';
import hardhat from 'hardhat';
import {
  BalancerError,
  BalancerErrorCode,
  Network,
  RelayerAuthorization,
  PoolModel,
  Subgraph,
  SubgraphPoolRepository,
} from '@/.';
import { BigNumber, parseFixed } from '@ethersproject/bignumber';
import { Contracts } from '@/modules/contracts/contracts.module';
import { JsonRpcSigner } from '@ethersproject/providers';
import { MaxInt256, MaxUint256 } from '@ethersproject/constants';
import { PoolsProvider } from '@/modules/pools/provider';
import { forkSetup, getBalances } from '@/test/lib/utils';
import { ADDRESSES } from '@/test/lib/constants';

/*
 * Testing on GOERLI
 * - Update hardhat.config.js with chainId = 5
 * - Update ALCHEMY_URL on .env with a goerli api key
 * - Run node on terminal: yarn run node
 * - Uncomment section below:
 */
// const network = Network.GOERLI;
// const poolId =
//   '0x13acd41c585d7ebb4a9460f7c8f50be60dc080cd00000000000000000000005f';
// const blockNumber = 7452900;

/*
 * Testing on MAINNET
 * - Update hardhat.config.js with chainId = 1
 * - Update ALCHEMY_URL on .env with a mainnet api key
 * - Run node on terminal: yarn run node
 * - Uncomment section below:
 */
const network = Network.MAINNET;
const poolId =
  '0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb20000000000000000000000fe';
const blockNumber = 15372650;

dotenv.config();

const { ALCHEMY_URL: jsonRpcUrl } = process.env;
const { ethers } = hardhat;
const MAX_GAS_LIMIT = 8e6;

const rpcUrl = 'http://127.0.0.1:8545';
const provider = new ethers.providers.JsonRpcProvider(rpcUrl, network);
const { contracts, contractAddresses } = new Contracts(
  network as number,
  provider
);
const relayer = contractAddresses.relayer as string; // only currenlty supported on GOERLI
const fromPool = {
  id: poolId,
  address: ADDRESSES[network].bbausd.address,
}; // bbausd
const tokensIn = [
  ADDRESSES[network].USDT.address,
  ADDRESSES[network].DAI.address,
  ADDRESSES[network].USDC.address,
];
// Slots used to set the account balance for each token through hardhat_setStorageAt
// Info fetched using npm package slot20
const slots = [
  ADDRESSES[network].USDT.slot,
  ADDRESSES[network].DAI.slot,
  ADDRESSES[network].USDC.slot,
];
const initialBalances = [
  parseFixed('0', ADDRESSES[network].USDT.decimals).toString(),
  parseFixed('100', ADDRESSES[network].DAI.decimals).toString(),
  parseFixed('100', ADDRESSES[network].USDC.decimals).toString(),
];

const signRelayerApproval = async (
  relayerAddress: string,
  signerAddress: string,
  signer: JsonRpcSigner
): Promise<string> => {
  const approval = contracts.vault.interface.encodeFunctionData(
    'setRelayerApproval',
    [signerAddress, relayerAddress, true]
  );

  const signature =
    await RelayerAuthorization.signSetRelayerApprovalAuthorization(
      contracts.vault,
      signer,
      relayerAddress,
      approval
    );

  const calldata = RelayerAuthorization.encodeCalldataAuthorization(
    '0x',
    MaxUint256,
    signature
  );

  return calldata;
};

describe('bbausd generalised join execution', async () => {
  let signer: JsonRpcSigner;
  let signerAddress: string;
  let authorisation: string;
  let pool: PoolModel;
  let bptBalanceBefore: BigNumber;
  let bptBalanceAfter: BigNumber;
  let tokensBalanceBefore: BigNumber[];
  let tokensBalanceAfter: BigNumber[];

  beforeEach(async function () {
    this.timeout(20000);

    signer = provider.getSigner();
    signerAddress = await signer.getAddress();
    authorisation = await signRelayerApproval(relayer, signerAddress, signer);

    await forkSetup(
      signer,
      tokensIn,
      slots,
      initialBalances,
      jsonRpcUrl as string,
      blockNumber
    );

    const config = {
      network,
      rpcUrl,
    };
    const subgraph = new Subgraph(config);
    const pools = new PoolsProvider(
      config,
      new SubgraphPoolRepository(subgraph.client)
    );
    await pools.findBy('address', fromPool.address).then((res) => {
      if (!res) throw new BalancerError(BalancerErrorCode.POOL_DOESNT_EXIST);
      pool = res;
    });
  });

  async function testFlow(
    previouslyAuthorised = false,
    minBptOut: undefined | string = undefined
  ): Promise<string> {
    [bptBalanceBefore, ...tokensBalanceBefore] = await getBalances(
      [fromPool.address, ...tokensIn],
      signer,
      signerAddress
    );

    const gasLimit = MAX_GAS_LIMIT;

    // let query = await pool.generalisedJoin(
    //   '0',
    //   tokensIn,
    //   tokensBalanceBefore.map((b) => b.toString()),
    //   signerAddress,
    //   authorisation
    // );
    // Static call can be used to simulate tx and get expected BPT in/out deltas
    // const staticResult = await signer.call({
    //   to: query.to,
    //   data: query.data,
    // });
    // const bptOut = query.decode(staticResult); // pending implementation
    // console.log(bptOut);
    const bptOut = '0';

    const query = await pool.generalisedJoin(
      minBptOut ? minBptOut : bptOut,
      tokensIn,
      tokensBalanceBefore.map((b) => b.toString()),
      signerAddress,
      previouslyAuthorised ? undefined : authorisation
    );

    const response = await signer.sendTransaction({
      to: query.to,
      data: query.data,
      gasLimit,
    });

    const receipt = await response.wait();
    console.log('Gas used', receipt.gasUsed.toString());

    [bptBalanceAfter, ...tokensBalanceAfter] = await getBalances(
      [fromPool.address, ...tokensIn],
      signer,
      signerAddress
    );

    expect(receipt.status).to.eql(1);
    expect(bptBalanceBefore.eq(0)).to.be.true;
    expect(bptBalanceAfter.gt(0)).to.be.true;
    tokensBalanceBefore.forEach((b, i) => expect(b.eq(tokensIn[i])).to.be.true);
    tokensBalanceAfter.forEach((b) => expect(b.eq(0)).to.be.true);
    return bptOut;
  }

  let bptOut: string;

  context('not staked', async () => {
    it('should transfer tokens from stable to boosted - without minBPT limit', async () => {
      bptOut = await testFlow();
    }).timeout(20000);

    it('should transfer tokens from stable to boosted - limit should fail', async () => {
      let errorMessage = '';
      try {
        await testFlow(false, BigNumber.from(bptOut).add(MaxInt256).toString());
      } catch (error) {
        errorMessage = (error as Error).message;
      }
      expect(errorMessage).to.contain('BAL#507'); // SWAP_LIMIT - Swap violates user-supplied limits (min out or max in)
    }).timeout(20000);
  });
}).timeout(20000);