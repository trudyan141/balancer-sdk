import { Network } from '@/lib/constants/network';
import { AddressZero } from '@ethersproject/constants';

export const ADDRESSES = {
  [Network.MAINNET]: {
    BatchRelayer: {
      address: '0xdcdbf71A870cc60C6F9B621E28a7D3Ffd6Dd4965',
    },
    ETH: {
      address: AddressZero,
      decimals: 18,
      symbol: 'ETH',
    },
    BAL: {
      address: '0xba100000625a3754423978a60c9317c58a424e3d',
      decimals: 18,
      symbol: 'BAL',
    },
    USDC: {
      address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      decimals: 6,
      symbol: 'USDC',
      slot: 9,
    },
    USDT: {
      address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
      decimals: 6,
      symbol: 'USDT',
      slot: 2,
    },
    WBTC: {
      address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
      decimals: 8,
      symbol: 'WBTC',
      slot: 0,
    },
    renBTC: {
      address: '0xeb4c2781e4eba804ce9a9803c67d0893436bb27d',
      decimals: 8,
      symbol: 'renBTC',
      slot: 102,
    },
    WETH: {
      address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      decimals: 18,
      symbol: 'WETH',
      slot: 3,
    },
    DAI: {
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      decimals: 18,
      symbol: 'DAI',
      slot: 2,
    },
    STETH: {
      address: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
      decimals: 18,
      symbol: 'STETH',
    },
    wSTETH: {
      address: '0x7f39c581f595b53c5cb19bd0b3f8da6c935e2ca0',
      decimals: 18,
      symbol: 'wSTETH',
      slot: 0,
    },
    bbausd: {
      address: '0x7b50775383d3d6f0215a8f290f2c9e2eebbeceb2',
      decimals: 18,
      symbol: 'bbausd',
    },
    bbausd2: {
      address: '0x9b532ab955417afd0d012eb9f7389457cd0ea712',
      decimals: 18,
      symbol: 'bbausd2',
    },
    bbausdc: {
      address: '0x9210F1204b5a24742Eba12f710636D76240dF3d0',
      decimals: 18,
      symbol: 'bbausdc',
    },
    waDAI: {
      address: '0x02d60b84491589974263d922d9cc7a3152618ef6',
      decimals: 18,
      symbol: 'waDAI',
      slot: 52,
    },
    waUSDC: {
      address: '0xd093fa4fb80d09bb30817fdcd442d4d02ed3e5de',
      decimals: 6,
      symbol: 'waUSDC',
      slot: 52,
    },
    waUSDT: {
      address: '0xf8Fd466F12e236f4c96F7Cce6c79EAdB819abF58',
      decimals: 6,
      symbol: 'waUSDT',
      slot: 52,
    },
  },
  [Network.KOVAN]: {
    // Visit https://balancer-faucet.on.fleek.co/#/faucet for test tokens
    BatchRelayer: {
      address: '0x41B953164995c11C81DA73D212ED8Af25741b7Ac',
    },
    ETH: {
      address: AddressZero,
      decimals: 18,
      symbol: 'ETH',
    },
    BAL: {
      address: '0x41286Bb1D3E870f3F750eB7E1C25d7E48c8A1Ac7',
      decimals: 18,
      symbol: 'BAL',
    },
    USDC: {
      address: '0xc2569dd7d0fd715B054fBf16E75B001E5c0C1115',
      decimals: 6,
      symbol: 'USDC',
    },
    WBTC: {
      address: '0x1C8E3Bcb3378a443CC591f154c5CE0EBb4dA9648',
      decimals: 8,
      symbol: 'WBTC',
    },
    WETH: {
      address: '0xdFCeA9088c8A88A76FF74892C1457C17dfeef9C1',
      decimals: 18,
      symbol: 'WETH',
    },
    DAI: {
      address: '0x04DF6e4121c27713ED22341E7c7Df330F56f289B',
      decimals: 18,
      symbol: 'DAI',
    },
    STETH: {
      address: '0x4803bb90d18a1cb7a2187344fe4feb0e07878d05',
      decimals: 18,
      symbol: 'STETH',
    },
    wSTETH: {
      address: '0xa387b91e393cfb9356a460370842bc8dbb2f29af',
      decimals: 18,
      symbol: 'wSTETH',
    },
    USDT_from_AAVE: {
      address: '0x13512979ade267ab5100878e2e0f485b568328a4',
      decimals: 6,
      symbol: 'USDT_from_AAVE',
    },
    USDT: {
      address: '0x13512979ade267ab5100878e2e0f485b568328a4',
      decimals: 6,
      symbol: 'USDT',
    },
    aUSDT: {
      address: '0xe8191aacfcdb32260cda25830dc6c9342142f310',
      decimals: 6,
      symbol: 'aUSDT',
    },
    bUSDT: {
      address: '0xe667d48618e71c2a02e4a1b66ed9def1426938b6',
      decimals: 18,
      symbol: 'bUSDT',
    },
    USDC_from_AAVE: {
      address: '0xe22da380ee6b445bb8273c81944adeb6e8450422',
      decimals: 6,
      symbol: 'USDC_from_AAVE',
    },
    aUSDC: {
      address: '0x0fbddc06a4720408a2f5eb78e62bc31ac6e2a3c4',
      decimals: 6,
      symbol: 'aUSDC',
    },
    DAI_from_AAVE: {
      address: '0xff795577d9ac8bd7d90ee22b6c1703490b6512fd',
      decimals: 18,
      symbol: 'DAI_from_AAVE',
    },
    bDAI: {
      address: '0xfcccb77a946b6a3bd59d149f083b5bfbb8004d6d',
      decimals: 18,
      symbol: 'bDAI',
    },
    STABAL3: {
      address: '0x8fd162f338b770f7e879030830cde9173367f301',
      decimals: 18,
      symbol: 'STABAL3',
    },
    bbausd: {
      address: 'N/A',
      decimals: 18,
      symbol: 'bbausd',
    },
    waDAI: {
      address: '',
      decimals: 18,
      symbol: 'waDAI',
      slot: 52,
    },
    waUSDC: {
      address: '',
      decimals: 6,
      symbol: 'waUSDC',
      slot: 52,
    },
    waUSDT: {
      address: '',
      decimals: 6,
      symbol: 'waUSDT',
      slot: 52,
    },
  },
  [Network.POLYGON]: {
    MATIC: {
      address: AddressZero,
      decimals: 18,
      symbol: 'MATIC',
    },
    LINK: {
      address: '0x53E0bca35eC356BD5ddDFebbD1Fc0fD03FaBad39',
      decimals: 18,
      symbol: 'LINK',
    },
    BAL: {
      address: '0x9a71012b13ca4d3d0cdc72a177df3ef03b0e76a3',
      decimals: 18,
      symbol: 'BAL',
    },
    USDC: {
      address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      decimals: 6,
      symbol: 'USDC',
    },
    WBTC: {
      address: '0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6',
      decimals: 8,
      symbol: 'WBTC',
    },
    WETH: {
      address: '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
      decimals: 18,
      symbol: 'WETH',
    },
    DAI: {
      address: '0x8f3cf7ad23cd3cadbd9735aff958023239c6a063',
      decimals: 18,
      symbol: 'DAI',
    },
    STETH: {
      address: '0xae7ab96520de3a18e5e111b5eaab095312d7fe84',
      decimals: 18,
      symbol: 'STETH',
    },
    stUSD_PLUS: {
      address: '0x5a5c6aa6164750b530b8f7658b827163b3549a4d',
      decimals: 6,
      symbol: 'stUSD+',
    },
    bstUSD_PLUS: {
      address: '0x1aafc31091d93c3ff003cff5d2d8f7ba2e728425',
      decimals: 18,
      symbol: 'bstUSD+',
    },
    USD_PLUS: {
      address: '0x5d9d8509c522a47d9285b9e4e9ec686e6a580850',
      decimals: 6,
      symbol: 'USD_PLUS',
    },
    USDT: {
      address: '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
      decimals: 6,
      symbol: 'USDT',
    },
    DHT: {
      address: '0x8C92e38eCA8210f4fcBf17F0951b198Dd7668292',
      decimals: 18,
      symbol: 'DHT',
    },
    dUSD: {
      address: '0xbAe28251B2a4E621aA7e20538c06DEe010Bc06DE',
      decimals: 18,
      symbol: 'dUSD',
    },
    bbausd: {
      address: 'N/A',
      decimals: 18,
      symbol: 'bbausd',
    },
    waDAI: {
      address: '',
      decimals: 18,
      symbol: 'waDAI',
      slot: 52,
    },
    waUSDC: {
      address: '',
      decimals: 6,
      symbol: 'waUSDC',
      slot: 52,
    },
    waUSDT: {
      address: '',
      decimals: 6,
      symbol: 'waUSDT',
      slot: 52,
    },
  },
  [Network.ARBITRUM]: {
    WETH: {
      address: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
      decimals: 18,
      symbol: 'WETH',
    },
    BAL: {
      address: '0x040d1edc9569d4bab2d15287dc5a4f10f56a56b8',
      decimals: 18,
      symbol: 'BAL',
    },
    USDC: {
      address: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8',
      decimals: 6,
      symbol: 'USDC',
    },
    DAI: {
      address: '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1',
      decimals: 18,
      symbol: 'DAI',
    },
    USDT: {
      address: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
      decimals: 6,
      symbol: 'USDT',
    },
    STETH: {
      address: 'N/A',
      decimals: 18,
      symbol: 'STETH',
    },
    bbausd: {
      address: 'N/A',
      decimals: 18,
      symbol: 'bbausd',
    },
    waDAI: {
      address: '',
      decimals: 18,
      symbol: 'waDAI',
      slot: 52,
    },
    waUSDC: {
      address: '',
      decimals: 6,
      symbol: 'waUSDC',
      slot: 52,
    },
    waUSDT: {
      address: '',
      decimals: 6,
      symbol: 'waUSDT',
      slot: 52,
    },
  },
  [Network.GOERLI]: {
    USDC: {
      address: '0xdabd33683bafdd448968ab6d6f47c3535c64bf0c',
      decimals: 6,
      symbol: 'USDC',
      slot: 0,
    },
    USDT: {
      address: '0x14468fd5e1de5a5a4882fa5f4e2217c5a8ddcadb',
      decimals: 6,
      symbol: 'USDT',
      slot: 0,
    },
    DAI: {
      address: '0xb8096bc53c3ce4c11ebb0069da0341d75264b104',
      decimals: 18,
      symbol: 'DAI',
      slot: 0,
    },
    bbausd: {
      address: '0x13acd41c585d7ebb4a9460f7c8f50be60dc080cd',
      decimals: 18,
      symbol: 'bbausd',
    },
    waDAI: {
      address: '0x0b61329839d2ebea96e21f45d4b065dbf38a7af6',
      decimals: 18,
      symbol: 'waDAI',
      slot: 52,
    },
    waUSDC: {
      address: '0xb8b3c69687ac048f607d75d89145bc82232098ca',
      decimals: 6,
      symbol: 'waUSDC',
      slot: 52,
    },
    waUSDT: {
      address: '0x014c0b2b8c4ed33231f9b33aca21735c8f71bbfb',
      decimals: 6,
      symbol: 'waUSDT',
      slot: 52,
    },
    MAI: {
      address: '0x398106564948fEeb1fEdeA0709AE7D969D62a391',
      decimals: 18,
      symbol: 'MAI',
      slot: 0,
    },
    waMAI: {
      address: '0x6B53E04299124217ebb46c2830e00DFafd0d86d6',
      decimals: 18,
      symbol: 'waMAI',
      slot: 0,
    },
    WETH: {
      address: '0xdfcea9088c8a88a76ff74892c1457c17dfeef9c1',
      decimals: 18,
      symbol: 'WETH',
      slot: 4,
    },
    waWETH: {
      address: '0xAB1Ec6011332A431d3fFA597681C29E28FeFe065',
      decimals: 18,
      symbol: 'waWETH',
      slot: 0,
    },
    WBTC: {
      address: '0x37f03a12241E9FD3658ad6777d289c3fb8512Bc9',
      decimals: 18,
      symbol: 'WBTC',
      slot: 0,
    },
    waWBTC: {
      address: '0xB846B79562Bc238b1919c665AB49F6217c072D11',
      decimals: 18,
      symbol: 'waWBTC',
      slot: 0,
    },
    bbadai: {
      address: '0x594920068382f64e4bc06879679bd474118b97b1',
      decimals: 18,
      symbol: 'bbadai',
      slot: 0,
    },
    bbausdc: {
      address: '0x4d983081b9b9f3393409a4cdf5504d0aea9cd94c',
      decimals: 18,
      symbol: 'bbausdc',
      slot: 0,
    },
    bbamai: {
      id: '0x24c52fee349194f68a998ac4e2ce170d780d010c0000000000000000000001a1',
      address: '0x24C52feE349194f68A998aC4E2ce170D780D010c',
      decimals: 18,
      symbol: 'bb-a-mai',
      slot: 0,
    },
    bbaweth: {
      id: '0xd8143b8e7a6e452e5e1bc42a3cef43590a2300310000000000000000000001a2',
      address: '0xD8143B8E7a6e452E5E1BC42A3ceF43590A230031',
      decimals: 18,
      symbol: 'bb-a-weth',
      slot: 0,
    },
    bbamaiweth: {
      id: '0x45631a4b3cab78e6dfdd21a7025a61fac76839190000000000000000000001a8',
      address: '0x45631A4b3CaB78E6DFDd21a7025A61fAC7683919',
      decimals: 18,
      symbol: 'bb-a-mai-weth',
      slot: 0,
    },
    boostedMeta1: {
      id: '0x48e984db5f9ba1bf2ee21d0a207a96c944d807e30000000000000000000001a9',
      address: '0x48e984DB5F9BA1Bf2Ee21d0A207a96C944D807E3',
      decimals: 18,
      symbol: 'boostedMeta1',
    },
    boostedMetaBig1: {
      id: '0xae5bfce463ab4689e9353d13b537e9896f13c7420000000000000000000001aa',
      address: '0xae5bfce463ab4689e9353d13b537e9896f13c742',
      decimals: 18,
      symbol: 'boostedMetaBig1',
    },
    bbausd2: {
      address: '0x3d5981BDD8D3E49EB7BBDC1d2B156a3eE019c18e',
      decimals: 18,
      symbol: 'bbausd2',
      slot: 0,
    },
  },
};
