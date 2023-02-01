import { JsonRpcProvider } from '@ethersproject/providers';
import { expect } from 'chai';
import { BalancerSDK } from '@/.';
import { Contracts } from './contracts.module';

const sdkConfig = {
  network: 1,
  rpcUrl: `https://rpc.ankr.com/eth`,
};

describe('contracts module', () => {
  context('instantiation', () => {
    it('instantiate via module with provider', async () => {
      const provider = new JsonRpcProvider(sdkConfig.rpcUrl);
      const contracts = new Contracts(sdkConfig.network, provider);
      const vaultContract = contracts.contracts['vault'];
      expect(vaultContract.address).to.eq(
        '0xBA12222222228d8Ba445958a75a0704d566BF2C8'
      );
    });

    it('instantiate via SDK', async () => {
      const balancer = new BalancerSDK(sdkConfig);
      const vaultContract = balancer.contracts['vault'];
      expect(vaultContract.address).to.eq(
        '0xBA12222222228d8Ba445958a75a0704d566BF2C8'
      );
    });
  });
});
