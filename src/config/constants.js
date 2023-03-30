import DocIcon from "@images/icon_doc.svg"
import TwitterIcon from "@images/icon_twitter.svg"
import DiscordIcon from "@images/icon_discord.svg"

const networks = {
  1: 'mainnet',
  5: 'goerli',
  42161: 'arbitrum',
}

const hosts = {
  1: `https://eth-mainnet.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_KEY}`,
  5: `https://eth-goerli.alchemyapi.io/v2/${process.env.REACT_APP_ALCHEMY_KEY}`,
  42161: `https://arb-mainnet.g.alchemy.com/v2/${process.env.REACT_APP_ARBITRUM_MAIN_KEY}`
}

const scans = {
  1: 'https://etherscan.io/address/',
  5: 'https://goerli.etherscan.io/address/',
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
  },
  frozen: {
    name: 'Paused',
    class: 'bg-red-500 text-white'
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

export {
  networks,
  hosts,
  scans,
  tokens,
  socialLinks,
  assetStatus
}