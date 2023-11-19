import { ReactComponent as GitbookIcon } from "@images/icons/gitbook.svg"
import { ReactComponent as GithubIcon } from "@images/icons/github.svg"
import { ReactComponent as DiscordIcon } from "@images/icons/discord.svg"
import { ReactComponent as TwitterIcon } from "@images/icons/twitter.svg"
import { ReactComponent as MediumIcon } from "@images/icons/medium.svg"

import ethIcon from "@images/chains/ethereum.svg"
import arbIcon from "@images/chains/arbitrum.svg"
import optIcon from "@images/chains/optimism.svg"

import SweepLogo from "@images/logo.png"
import SweeprLogo from "@images/icon_sweepr.png"
import UsdcLogo from "@images/icon_usdc.webp"

import sweepABI from "@abis/sweep.json";
import sweeprABI from "@abis/sweepr.json";
import erc20ABI from "@abis/erc20.json";

const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const networks = {
  1: 'mainnet',
  5: 'goerli',
  10: 'optimism',
  // 420: 'optimism goerli',
  42161: 'arbitrum',
  421613: 'arbiturm goerli',
}

const rpcLinks = {
  // mainnet
  1: `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_KEY}`,
  10: `https://opt-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_OPTIMISTIC_API_KEY}`,
  42161: `https://arb-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ARBITRUM_MAIN_KEY}`,
  // testnet
  5: `https://eth-goerli.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_KEY}`,
  420: `https://opt-goerli.g.alchemy.com/v2/${process.env.REACT_APP_OPTIMISTIC_API_KEY}`,
  421613: `https://arb-goerli.g.alchemy.com/v2/${process.env.REACT_APP_ARBITRUM_MAIN_KEY}`,
}

const scans = {
  1: 'https://etherscan.io/address/',
  10: 'https://optimistic.etherscan.io/address/',
  42161: 'https://arbiscan.io/address/',
 
  5: 'https://goerli.etherscan.io/address/',
  420: 'https://goerli-optimism.etherscan.io/address/',
  421613: 'https://goerli.arbiscan.io/address/'
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
    link: 'https://medium.com/@SweeprFi',
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
    420: '',
    42161: '0xB88a5Ac00917a02d82c7cd6CEBd73E2852d43574',
    421613: '0xa5120a12Ff848b2e96439557A9f7E4083f921314',
  },
  sweepr: {
    1: '0x89B1e7068bF8E3232dD8f16c35cAc45bDA584f4E',
    5: '0x504C094E10DC89100803b1A69b619c69751Dc9Ae',
    10: '0x89B1e7068bF8E3232dD8f16c35cAc45bDA584f4E',
    420: '',
    42161: '0x89B1e7068bF8E3232dD8f16c35cAc45bDA584f4E',
    421613: '0x98d06DBb715e16dB57021eCA85b44e7916EB0c17'
  },
  usdc: {
    1: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    5: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
    10: '0x0b2c639c533813f4aa9d7837caf62653d097ff85',
    420: '',
    42161: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    421613: '0x8FB1E3fC51F3b789dED7557E680551d93Ea9d892'
  }
}

const contracts = {
  marketMaker: {
    1: '0x8adea764cabd2c61e51ceb6937fd026fa39d8e64',
    5: '0x1655D8EC4d34BAE3E93a0864166676B86B0287d3',
    10: '0xae851449e85b30b104e3155e5f4bb1bfd3a97010',
    420: '',
    42161: '0xA014cCE13ECB3d92BB6D253b74Bb6E7Ed2418276',
    421613: '0x953b290385d856303834aCab13Ee12Bf2CEEF253'
  }
}

const AMMLinks = {
  1: {
    title: 'Swap on Ethereum',
    link: `https://app.balancer.fi/#/ethereum/swap`
  },
  5: {
    title: 'Swap on Ethereum',
    link: `https://app.balancer.fi/#/ethereum/swap`
  },
  10: {
    title: 'Swap on Optimism',
    link: `https://app.balancer.fi/#/optimism/swap`
  },
  420: {
    title: 'Swap on Optimism',
    link: 'https://app.balancer.fi/#/optimism/swap'
  },
  42161: {
    title: 'Swap on Arbitrum',
    link: `https://app.balancer.fi/#/arbitrum/swap`
  },
  421613: {
    title: 'Swap on Arbitrum',
    link: `https://app.balancer.fi/#/arbitrum/swap`
  }
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
  }
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
]

const chainList = Number(process.env.REACT_APP_MODE) === 0 ? testChainList : mainChainList;

const sweepStatus = ["Minting", "Repaying"];

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
  AMMLinks,
  sweepStatus
}