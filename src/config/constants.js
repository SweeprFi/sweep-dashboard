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
    5: '0x44ce9744d89B7C3E55a8c328A0dCfC92b2CebA2a',
    42161: '0xB88a5Ac00917a02d82c7cd6CEBd73E2852d43574',
    421613: '0xa5120a12Ff848b2e96439557A9f7E4083f921314',
  },
  sweepr: {
    1: '0x89B1e7068bF8E3232dD8f16c35cAc45bDA584f4E',
    5: '0x8CAb65C701225a2c465B9ed98B94942d8a09b63B',
    42161: '0x89B1e7068bF8E3232dD8f16c35cAc45bDA584f4E',
    421613: '0x98d06DBb715e16dB57021eCA85b44e7916EB0c17'
  },
  usdc: {
    1: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    5: '0x65aFADD39029741B3b8f0756952C74678c9cEC93',
    42161: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    421613: '0x8FB1E3fC51F3b789dED7557E680551d93Ea9d892'
  }
}

const contracts = {
  marketMaker: {
    1: '0xff368E106EA8782FaB6B2D4AD69739a60C66400E',
    5: '',
    42161: '0x78326Ce3be64977658726EEdAd9A35de460E310A',
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