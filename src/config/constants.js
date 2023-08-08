import DocIcon from "@images/icon_doc.svg"
import TwitterIcon from "@images/icon_twitter.svg"
import DiscordIcon from "@images/icon_discord.svg"
import ethIcon from "@images/chains/ethereum.svg"
import arbIcon from "@images/chains/arbitrum.svg"
import SweepLogo from "@images/icon_sweep.svg"
import SweeprLogo from "@images/icon_sweepr.png"
import sweepABI from "@abis/sweep.json";
import sweeprABI from "@abis/sweepr.json";

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
    name: 'doc',
    link: 'https://docs.sweepr.finance',
    icon: DocIcon
  },
  {
    name: 'twitter',
    link: 'https://twitter.com/SweeprFi',
    icon: TwitterIcon
  },
  {
    name: 'discord',
    link: 'https://github.com/SweeprFi',
    icon: DiscordIcon
  }
]

const assetStatus = {
  good: {
    name: 'Good',
    class: 'bg-app-green text-black'
  },
  defaulted: {
    name: 'Defaulted',
    class: 'bg-red-500 text-white'
  },
  deprecated: {
    name: 'Deprecated',
    class: 'bg-app-gray text-white'
  },
  call: {
    name: 'Call',
    class: 'bg-app-yellow text-black'
  },
  marginCall: {
    name: 'Margin Call',
    class: 'bg-app-yellow text-black'
  },
  frozen: {
    name: 'Paused',
    class: 'bg-red-500 text-white'
  }
}

const tokens = {
  sweep: {
    1: '',
    5: '0x760389840E5B30919D881feb747C12054CBE671f',
    42161: '0x4F4219c9B851AEbB652DD182D944A99b0b68edcf',
    421613: '0xe5618312ac98a9DE15C287009a539F2E732aC5f2',
  },
  sweepr: {
    1: '',
    5: '0xeE5d3F262b961A276802EB8bdC889BB3140447F4',
    42161: '',
    421613: '0xaE0a9399313b65995e64d65F5637281CC83ff30c',
  },
  usdc: {
    1: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    5: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
    42161: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
    421613: '0x8FB1E3fC51F3b789dED7557E680551d93Ea9d892'
  }
}

const AMMLinks = {
  1: {
    title: 'Uniswap on Ethereum',
    link: `https://app.uniswap.org/#/swap`
  },
  5: {
    title: 'Uniswap on Ethereum',
    link: `https://app.uniswap.org/#/swap`
  },
  42161: {
    title: 'Uniswap on Arbitrum',
    link: `https://app.uniswap.org/#/swap`
  },
  421613: {
    title: 'Uniswap on Arbitrum',
    link: `https://app.uniswap.org/#/swap`
  }
}

const tokenList = [
  {
    name: 'Sweep',
    logo: SweepLogo,
    abi: sweepABI
  },
  {
    name: 'Sweepr',
    logo: SweeprLogo,
    abi: sweeprABI
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
  networks,
  rpcLinks,
  scans,
  tokens,
  tokenList,
  socialLinks,
  assetStatus,
  chainList,
  AMMLinks
}