import { BalancerSdkConfig, BalancerNetworkConfig } from '@/types';
import { Swaps } from './swaps/swaps.module';
import { Relayer } from './relayer/relayer.module';
import { Subgraph } from './subgraph/subgraph.module';
import { Sor } from './sor/sor.module';
import { getNetworkConfig } from './sdk.helpers';
import { Pricing } from './pricing/pricing.module';
import { ContractInstances, Contracts } from './contracts/contracts.module';
import { Zaps } from './zaps/zaps.module';
import { Pools } from './pools';
import { Data } from './data';
import { Provider } from '@ethersproject/providers';

interface BalancerSDKRoot {
  config: BalancerSdkConfig;
  sor: Sor;
  subgraph: Subgraph;
  pools: Pools;
  data: Data;
  swaps: Swaps;
  relayer: Relayer;
  networkConfig: BalancerNetworkConfig;
  rpcProvider: Provider;
}

/**
 * Balancer SDK - services for interacting with Balancer Protocol V2.
 *
 * ```ts
 * import { BalancerSDK, Network } from '@balancer-labs/sdk'
 *
 * const sdk = new BalancerSDK({
 *   network: Network.MAINNET,
 *   rpcUrl: 'https://ethereum-node:8454/...',
 * })
 * ```
 *
 * @public
 */
export class BalancerSDK implements BalancerSDKRoot {
  /**
   * @public
   */
  readonly swaps: Swaps;
  /**
   * @public
   */
  readonly relayer: Relayer;
  /**
   * @public
   */
  readonly pricing: Pricing;
  /**
   * @public
   */
  readonly pools: Pools;
  /**
   * @public
   */
  readonly data: Data;
  balancerContracts: Contracts;
  /**
   * @public
   */
  zaps: Zaps;
  /**
   * @public
   */
  readonly networkConfig: BalancerNetworkConfig;
  /**
   * @public
   */
  readonly provider: Provider;

  /**
   * @public
   * @param config
   * @param sor
   * @param subgraph
   */
  constructor(
    public config: BalancerSdkConfig,
    public sor = new Sor(config),
    public subgraph = new Subgraph(config)
  ) {
    this.networkConfig = getNetworkConfig(config);
    this.provider = sor.provider;

    this.data = new Data(
      this.networkConfig,
      sor.provider,
      config.subgraphQuery
    );
    this.swaps = new Swaps(this.config);
    this.relayer = new Relayer(this.swaps);
    this.pricing = new Pricing(config, this.swaps);
    this.pools = new Pools(this.networkConfig, this.data);

    this.balancerContracts = new Contracts(
      this.networkConfig.addresses.contracts,
      sor.provider
    );
    this.zaps = new Zaps(this.networkConfig.chainId);
  }

  get rpcProvider(): Provider {
    return this.sor.provider;
  }

  /**
   * Instantiated Balancer typechain contracts, e.g. Vault, LidoRelayer.
   * @public
   */
  get contracts(): ContractInstances {
    return this.balancerContracts.contracts;
  }
}
