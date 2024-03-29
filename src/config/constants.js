import { ReactComponent as GitbookIcon } from "@images/icons/gitbook.svg"
import { ReactComponent as GithubIcon } from "@images/icons/github.svg"
import { ReactComponent as DiscordIcon } from "@images/icons/discord.svg"
import { ReactComponent as TwitterIcon } from "@images/icons/twitter.svg"
import { ReactComponent as MediumIcon } from "@images/icons/medium.svg"

import ethIcon from "@images/chains/ethereum.svg"
import arbIcon from "@images/chains/arbitrum.svg"
import optIcon from "@images/chains/optimism.svg"
import baseIcon from "@images/chains/base.svg"
import avaxIcon from "@images/chains/avalanche.svg"
import polygonIcon from "@images/chains/polygon.svg"
import bscIcon from "@images/chains/bsc.svg"

import SweepLogo from "@images/logo.png"
import SweeprLogo from "@images/icon_sweepr.png"
import UsdcLogo from "@images/icon_usdc.webp"
import UsdtLogo from "@images/icon_usdt.png"

import BalancerIcon from "@images/icons/balancer.svg";
import PancakeIcon from "@images/icons/pancake.svg";

import sweepABI from "@abis/sweep.json";
import sweeprABI from "@abis/sweepr.json";
import erc20ABI from "@abis/erc20.json";

const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const networks = {
  1: 'mainnet',
  10: 'optimism',
  8453: 'base',
  42161: 'arbitrum',
  43114: 'avalanche',
  137: 'polygon',
  56: 'bnb chain',

  5: 'goerli',
  // 420: 'optimism goerli',
  421613: 'arbiturm goerli',
}

const rpcLinks = {
  // mainnet
  1: `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_KEY}`,
  10: `https://opt-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_OPTIMISTIC_API_KEY}`,
  42161: `https://arb-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ARBITRUM_MAIN_KEY}`,
  8453: `https://base-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ARBITRUM_MAIN_KEY}`,
  43114: `https://avalanche-mainnet.core.chainstack.com/ext/bc/C/rpc/${process.env.REACT_APP_AVAX_KEY}`,
  137: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_POLYGON_KEY}`,
  56: `https://bsc-mainnet.core.chainstack.com/${process.env.REACT_APP_BSC_KEY}`,

  // testnet
  5: `https://eth-goerli.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_KEY}`,
  420: `https://opt-goerli.g.alchemy.com/v2/${process.env.REACT_APP_OPTIMISTIC_API_KEY}`,
  421613: `https://arb-goerli.g.alchemy.com/v2/${process.env.REACT_APP_ARBITRUM_MAIN_KEY}`,
}

const scans = {
  1: 'https://etherscan.io/',
  10: 'https://optimistic.etherscan.io/',
  42161: 'https://arbiscan.io/',
  8453: 'https://basescan.org/',
  43114: 'https://snowtrace.io/',
  137: 'https://polygonscan.com/',
  56: 'https://bscscan.com/',
 
  5: 'https://goerli.etherscan.io/',
  420: 'https://goerli-optimism.etherscan.io/',
  421613: 'https://goerli.arbiscan.io/'
}

const socialLinks = [
  {
    name: 'GitBook',
    link: 'https://docs.sweepr.finance/',
    icon: GitbookIcon
  },
  {
    name: 'Github',
    link: 'https://github.com/SweeprFi',
    icon: GithubIcon
  },
  {
    name: 'X',
    link: 'https://twitter.com/SweeprFi',
    icon: TwitterIcon
  },
  {
    name: 'Discord',
    link: 'https://discord.gg/dnJ7MMgQWH',
    icon: DiscordIcon
  },
  {
    name: 'Medium',
    link: 'https://medium.com/Sweepr',
    icon: MediumIcon
  }
]

const assetStatus = {
  good: {
    name: 'Good',
    class: 'bg-app-green-light text-black'
  },
  defaulted: {
    name: 'Defaulted',
    class: 'bg-app-red-light text-white'
  },
  deprecated: {
    name: 'Deprecated',
    class: 'bg-app-gray text-white'
  },
  call: {
    name: 'Call',
    class: 'bg-app-blue-light text-black'
  },
  marginCall: {
    name: 'Margin Call',
    class: 'bg-app-yellow text-black'
  },
  paused: {
    name: 'Paused',
    class: 'bg-app-pink text-white'
  }
}

const tokens = {
  sweep: {
    1: '0xB88a5Ac00917a02d82c7cd6CEBd73E2852d43574',
    5: '0x6C68a114c406dA77c3Ce1Ad1Cf09B420E37087b8',// '0x760389840E5B30919D881feb747C12054CBE671f'
    10: '0xB88a5Ac00917a02d82c7cd6CEBd73E2852d43574',
    137: '0xB88a5Ac00917a02d82c7cd6CEBd73E2852d43574',
    420: '',
    8453: '0xB88a5Ac00917a02d82c7cd6CEBd73E2852d43574',
    42161: '0xB88a5Ac00917a02d82c7cd6CEBd73E2852d43574',
    421613: '0xa5120a12Ff848b2e96439557A9f7E4083f921314',
    43114: '0xB88a5Ac00917a02d82c7cd6CEBd73E2852d43574',
    56: '0xB88a5Ac00917a02d82c7cd6CEBd73E2852d43574',
  },
  sweepr: {
    1: '0x89B1e7068bF8E3232dD8f16c35cAc45bDA584f4E',
    5: '0x504C094E10DC89100803b1A69b619c69751Dc9Ae',
    10: '0x89B1e7068bF8E3232dD8f16c35cAc45bDA584f4E',
    137: '0x89B1e7068bF8E3232dD8f16c35cAc45bDA584f4E',
    420: '',
    8453: '0x89B1e7068bF8E3232dD8f16c35cAc45bDA584f4E',
    42161: '0x89B1e7068bF8E3232dD8f16c35cAc45bDA584f4E',
    421613: '0x98d06DBb715e16dB57021eCA85b44e7916EB0c17',
    43114: '0x89B1e7068bF8E3232dD8f16c35cAc45bDA584f4E',
    56: '0x89B1e7068bF8E3232dD8f16c35cAc45bDA584f4E',
  },
  usdc: {
    1: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    5: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
    10: '0x0b2c639c533813f4aa9d7837caf62653d097ff85',
    137: '0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359',
    420: '',
    8453: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
    42161: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    421613: '0x8FB1E3fC51F3b789dED7557E680551d93Ea9d892',
    43114: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
    56: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  },
  usdt: {
    56: '0x55d398326f99059fF775485246999027B3197955',
  }
}

const contracts = {
  marketMaker: {
    1: '0x0FbA85De62C85c3cB444ec828b42BbF0a9208318',
    5: '0x1655D8EC4d34BAE3E93a0864166676B86B0287d3',
    10: '0x82f23E915985de7Db7C9463E4d898ccf2ab2fCeF',
    137: '0x7685fc882c91936BF94974916cC410028F73C957',
    420: '',
    8453: '0x47a393e60DfCF12CA3892dBC2C2E66BCE083BB26',
    42161: '0xC246bC4785f26fcA455542D04FE072F5b1ECC436',
    421613: '0x953b290385d856303834aCab13Ee12Bf2CEEF253',
    43114: '0x676524646377A6e66Ca797edF7CCB1B5162a8cE0',
    56: '0xe3E123ED9fec48a6f40A8aC7bE9afEDDAD80F146',
  }
}

const AMMLinks = {
  1: {
    title: 'Swap on Ethereum',
    link: `https://app.balancer.fi/#/ethereum/swap/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/0xB88a5Ac00917a02d82c7cd6CEBd73E2852d43574`,
    icon: BalancerIcon,
  },
  5: {
    title: 'Swap on Ethereum',
    link: `https://app.balancer.fi/#/ethereum/swap`,
    icon: BalancerIcon,
  },
  10: {
    title: 'Swap on Optimism',
    link: `https://app.balancer.fi/#/optimism/swap/0x0b2c639c533813f4aa9d7837caf62653d097ff85/0xB88a5Ac00917a02d82c7cd6CEBd73E2852d43574`,
    icon: BalancerIcon,
  },
  137: {
    title: 'Swap on Polygon',
    link: `https://app.balancer.fi/#/polygon/swap/0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359/0xB88a5Ac00917a02d82c7cd6CEBd73E2852d43574`,
    icon: BalancerIcon,
  },
  420: {
    title: 'Swap on Optimism',
    link: 'https://app.balancer.fi/#/optimism/swap',
    icon: BalancerIcon,
  },
  8453: {
    title: 'Swap on Base',
    link: 'https://app.balancer.fi/#/base/swap/0x833589fcd6edb6e08f4c7c32d4f71b54bda02913/0xB88a5Ac00917a02d82c7cd6CEBd73E2852d43574',
    icon: BalancerIcon,
  },
  42161: {
    title: 'Swap on Arbitrum',
    link: `https://app.balancer.fi/#/arbitrum/swap/0xaf88d065e77c8cC2239327C5EDb3A432268e5831/0xB88a5Ac00917a02d82c7cd6CEBd73E2852d43574`,
    icon: BalancerIcon,
  },
  421613: {
    title: 'Swap on Arbitrum',
    link: `https://app.balancer.fi/#/arbitrum/swap`,
    icon: BalancerIcon,
  },
  43114: {
    title: 'Swap on Avalanche',
    link: `https://app.balancer.fi/#/avalanche/swap/0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E/0xB88a5Ac00917a02d82c7cd6CEBd73E2852d43574`,
    icon: BalancerIcon,
  },
  56: {
    title: 'Swap on BNB Chain',
    link: `https://pancakeswap.finance/swap?inputCurrency=0x55d398326f99059fF775485246999027B3197955&outputCurrency=0xB88a5Ac00917a02d82c7cd6CEBd73E2852d43574`,
    icon: PancakeIcon,
  },
}

const tokenList = [
  {
    name: 'Sweep',
    logo: SweepLogo,
    decimal: 18,
    abi: sweepABI
  },
  {
    name: 'Sweepr',
    logo: SweeprLogo,
    decimal: 18,
    abi: sweeprABI
  },
  {
    name: 'USDC',
    logo: UsdcLogo,
    decimal: 6,
    abi: erc20ABI
  },
  { // ONLY for BSC
    name: 'USDT',
    logo: UsdtLogo,
    decimal: 18,
    abi: erc20ABI
  },
]

const testChainList = [
  {
    chainId: 5,
    netId: 10121,
    name: 'Ethereum Goerli',
    logo: ethIcon
  },
  // {
  //   chainId: 420,
  //   netId: 10132,
  //   name: 'Optimism Goerli',
  //   logo: optIcon
  // },
  {
    chainId: 421613,
    netId: 10143,
    name: 'Arbitrum Goerli',
    logo: arbIcon
  }
]

const mainChainList = [
  {
    chainId: 1,
    netId: 101,
    name: 'Ethereum',
    logo: ethIcon
  },
  {
    chainId: 42161,
    netId: 110,
    name: 'Arbitrum',
    logo: arbIcon
  },
  {
    chainId: 10,
    netId: 111,
    name: 'Optimism',
    logo: optIcon
  },
  {
    chainId: 8453,
    netId: 184,
    name: 'Base',
    logo: baseIcon
  },
  {
    chainId: 43114,
    netId: 106,
    name: 'Avalanche',
    logo: avaxIcon
  },
  {
    chainId: 137,
    netId: 109,
    name: 'Polygon',
    logo: polygonIcon
  },
  {
    chainId: 56,
    netId: 102,
    name: 'BNB Chain',
    logo: bscIcon
  },
]

const chainList = Number(process.env.REACT_APP_MODE) === 0 ? testChainList : mainChainList;

export {
  month,
  networks,
  rpcLinks,
  scans,
  tokens,
  contracts,
  tokenList,
  socialLinks,
  assetStatus,
  chainList,
  AMMLinks
}
