import DocIcon from "@images/icon_doc.svg"
import TwitterIcon from "@images/icon_twitter.svg"
import DiscordIcon from "@images/icon_discord.svg"

const networks = {
  1: 'mainnet',
  5: 'goerli',
  42161: 'arbitrum',
}

const hosts = {
  1: '',
  5: '',
  42161: `https://arb-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ARBITRUM_MAIN_KEY}`
}

const scans = {
  1: '',
  5: '',
  42161: `https://arbiscan.io/address/`
}

const socialLinks = [
  {
    name: 'doc',
    link: 'https://docs.maxos.finance',
    icon: DocIcon
  },
  {
    name: 'twitter',
    link: 'https://twitter.com/maxoslabs',
    icon: TwitterIcon
  },
  {
    name: 'discord',
    link: 'https://github.com/MaxosLabs/',
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
  }
}

const tokens = {
  sweep: {
    1: '',
    5: '0x5729dc3190d2c2E82e7Be0F3FE92fD77BA249b2c',
    42161: '0x4F4219c9B851AEbB652DD182D944A99b0b68edcf',
  },
  usdc: {
    1: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    5: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
    42161: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
  }
}

const assets = {
  off_chain: {
    1: '',
    5: '0xb45EAAc6f139ebaF7c89115DbfFF316c3BCB4313',
    // NEWER: '0x2dBf7A6D35bE22eADe0c4d4Df77937c8aBC18E80'
    42161: '0x7D009f68cc4323246cC563BF4Ec6db3d88A69384',
  },
  aave:{
    1: '',
    5: '0x56873F157202a5bD2ea798376CFae96Efd053011',
    42161: '0x81635EcF627ff0bC0D9CF30Bc5A963b5aa2F30fE',
  },
  uniswap: {
    1: '',
    5: '0xE2EAd4044Dd87402e04D988fB0160ecCfB0e787B',
    42161: '0x843aCEBB52B2B91DE9818DEE873103466379CaA1',
  },
  weth: {
    1: '',
    5: '',
    42161: '0x1dd3D88699B69a04Ca2dd3AA45D667632B29E9BA',
  },
  wbtc: {
    1: '',
    5: '',
    42161: '0xF1d58bfBE3a0D9598061C1881f0b9bb9c390F1EB',
  }
}

export {
  networks,
  hosts,
  scans,
  tokens,
  assets,
  socialLinks,
  assetStatus
}