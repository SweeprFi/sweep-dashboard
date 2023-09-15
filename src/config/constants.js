import { ReactComponent as GitbookIcon } from "@images/icons/gitbook.svg"
import { ReactComponent as GithubIcon } from "@images/icons/github.svg"
import { ReactComponent as DiscordIcon } from "@images/icons/discord.svg"
import { ReactComponent as TwitterIcon } from "@images/icons/twitter.svg"
import { ReactComponent as MediumIcon } from "@images/icons/medium.svg"
import ethIcon from "@images/chains/ethereum.svg"
import arbIcon from "@images/chains/arbitrum.svg"
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
  42161: 'arbitrum',
  421613: 'arbiturm goerli'
}

const rpcLinks = {
  1: `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_KEY}`,
  5: `https://eth-goerli.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_KEY}`,
  42161: `https://arb-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ARBITRUM_MAIN_KEY}`,
  421613: `https://arb-goerli.g.alchemy.com/v2/${process.env.REACT_APP_ARBITRUM_MAIN_KEY}`,
}

const scans = {
  1: 'https://etherscan.io/address/',
  5: 'https://goerli.etherscan.io/address/',
  42161: `https://arbiscan.io/address/`
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
    class: 'bg-app-green text-black'
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
    5: '0x760389840E5B30919D881feb747C12054CBE671f',
    42161: '0xB88a5Ac00917a02d82c7cd6CEBd73E2852d43574',
    421613: '0xe5618312ac98a9DE15C287009a539F2E732aC5f2',
  },
  sweepr: {
    1: '0x89B1e7068bF8E3232dD8f16c35cAc45bDA584f4E',
    5: '0x504C094E10DC89100803b1A69b619c69751Dc9Ae',
    42161: '0x89B1e7068bF8E3232dD8f16c35cAc45bDA584f4E',
    421613: '0xfFDD225Ab8E6048DE7D45e765Ac9bCf7F8494BF2',
  },
  usdc: {
    1: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    5: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
    42161: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    421613: '0x8FB1E3fC51F3b789dED7557E680551d93Ea9d892'
  }
}

const contracts = {
  marketMaker: {
    1: '0x709d075147a10495e5c3bBF3dfc0c138F34C6E72',
    5: '',
    42161: '0x33A48e4aA79A66fc4f7061f5D9E274528C213029',
    421613: ''
  }
}

const AMMLinks = {
  1: {
    title: 'Swap on Ethereum',
    link: `https://app.uniswap.org/#/swap?outputCurrency=${tokens.sweep[1]}`
  },
  5: {
    title: 'Swap on Ethereum',
    link: `https://app.uniswap.org/#/swap?outputCurrency=${tokens.sweep[5]}`
  },
  42161: {
    title: 'Swap on Arbitrum',
    link: `https://app.uniswap.org/#/swap?outputCurrency=${tokens.sweep[42161]}`
  },
  421613: {
    title: 'Swap on Arbitrum',
    link: `https://app.uniswap.org/#/swap?outputCurrency=${tokens.sweep[421613]}`
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
  }
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