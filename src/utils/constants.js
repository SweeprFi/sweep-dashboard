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

const wallets = {
  owner: {
    1: '', // Ethereum Mainnet
    5: '0x7Adc86401f246B87177CEbBEC189dE075b75Af3A', // Ethereum Goerli
    42161: '0x7Adc86401f246B87177CEbBEC189dE075b75Af3A', // Arbitrum One
  },
  borrower: {
    1: '',
    5: '0x93aE1efd2E78028351C080FA0fbBBeF97Ec42EAD',
    42161: '0x7Adc86401f246B87177CEbBEC189dE075b75Af3A',
  },
  wallet: {
    1: '',
    5: '0x93aE1efd2E78028351C080FA0fbBBeF97Ec42EAD',
    42161: '0x7Adc86401f246B87177CEbBEC189dE075b75Af3A',
  },
  treasury: {
    1: '',
    5: '0x93aE1efd2E78028351C080FA0fbBBeF97Ec42EAD',
    42161: '0x0d6fF486F1cdBb024942f62E5AD8c07091A53772',
  },
  usdc_holder: {
    1: '0xF977814e90dA44bFA03b6295A0616a897441aceC',
    5: '0x93aE1efd2E78028351C080FA0fbBBeF97Ec42EAD',
    42161: '0xAEafDd0ce0c4ab0AC57913916E5c386D847609c3',
  },
  comp_holder: {
    1: '',
    5: '0xA051d2543AFC78b082832d6ef495e62Bb86490eb',
    42161: '',
  },
  multisig: { // Gnosis safe wallet
    1: '0x23Ab3E2954Ec5577730B7674f4bA9e78Eb96C4d1',
    5: '0x23Ab3E2954Ec5577730B7674f4bA9e78Eb96C4d1',
    42161: '0x23Ab3E2954Ec5577730B7674f4bA9e78Eb96C4d1',
  },
}

const tokens = {
  sweep: {
    1: '',
    5: '0x5729dc3190d2c2E82e7Be0F3FE92fD77BA249b2c',
    42161: '0x4F4219c9B851AEbB652DD182D944A99b0b68edcf',
  },
  sweeper: {
    1: '',
    5: '0xFDB2901ECa193Fc2d652624839B0cC1BC4a92C3c',
    42161: '0x4d20a1d57435bA91614c215F843362e6E95555Bd',
  },
  usdc: {
    1: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    5: '0x07865c6E87B9F70255377e024ace6630C1Eaa37F',
    42161: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
  },
  usdt: {
    1: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    5: '0xe802376580c10fE23F027e1E19Ed9D54d4C9311e',
    42161: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
  },
  aave_usdc: {
    1: '0xBcca60bB61934080951369a648Fb03DF4F96263C',
    5: '0x935c0F6019b05C787573B5e6176681282A3f3E05',
    42161: '0x625E7708f30cA75bfd92586e17077590C60eb4cD',
  },
  comp: {
    1: '0xc00e94Cb662C3520282E6f5717214004A7f26888',
    5: '0x3587b2F7E0E2D6166d6C14230e7Fe160252B0ba4',
    42161: '',
  },
  comp_cusdc: {
    1: '0x39AA39c021dfbaE8faC545936693aC917d5E7563',
    5: '0x73506770799Eb04befb5AaE4734e58C2C624F493',
    42161: '',
  },
  weth: {
    1: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    5: '0x60d4db9b534ef9260a88b0bed6c486fe13e604fc',
    42161: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
  },
  wbtc: {
    1: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    5: '',
    42161: '0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f',
  },
}

const libraries = {
  liquidity_helper: {
    1: '',
    5: '',
    42161: '0x08D052d1CAc852905E4C0cAddF782e1af2b8B214',
  },
  timelock: {
    1: '',
    5: '0x93aE1efd2E78028351C080FA0fbBBeF97Ec42EAD',
    42161: '0xEda97F14dBCD80d20ec4a79D930c6896F92112F7',
  },
  approver: {
    1: '',
    5: '0xF353CD895643F20ee4c5DC71364c211cE13a1E52',
    // 42161: '0x9690b6F7Bb2Ea75F85a09E50eb00Cb8Ce60661dC', // Whitelist
    42161: '0x59490d4dcC479B3717A6Eb289Db929E125E86eB1' // blacklist
  },
  uniswap_pool: {
    1: '',
    5: '0x3aA3633bc4d514CcfB052FD9Db2f978500A387af',
    42161: '0xF75F92BF819FcBA96209990aE040DABd9Fd1c067',
  },
  uniV3Twap_oracle: {
    1: '',
    5: '0xd652C68ED7e93Adc5616cC61142AeaA262B09326',
    42161: '0x95DF0227C1520BCD194a4690b91bE0E11B454b03',
  },
  uniswap_factory: {
    1: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
    5: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
    42161: '0x1F98431c8aD98523631AE4a59f267346ea31F984',
  },
  uniswap_router: {
    1: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
    5: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
    42161: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
  },
  uniswapV3_positions: {
    1: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    5: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
    42161: '0xC36442b4a4522E871399CD717aBDD847Ab11FE88',
  },
  aaveV2_pool: {
    1: '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9',
    5: '0x4bd5643ac6f66a5237E18bfA7d47cF22f1c9F210',
    42161: '',
  },
  aaveV3_pool: {
    1: '',
    5: '',
    42161: '0x794a61358D6845594F94dc1DB02A252b5b4814aD',
  },
  comp_control: {
    1: '0x3d9819210A31b4961b30EF54bE2aeD79B9c9Cd3B',
    5: '0x05Df6C772A563FfB37fD3E04C1A279Fb30228621',
    42161: '',
  }
}

const chainlink_oracle = {
  comp_usdc: {
    1: '0xdbd020CAeF83eFd542f4De03e3cF0C28A4428bd5',
    5: '',
    42161: '0xe7C53FFd03Eb6ceF7d208bC4C13446c76d1E5884',
  },
  weth_usdc: {
    1: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419', // ETH - USDC
    5: '0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e', // ETH - USDC
    42161: '0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612',
  },
  wbtc_usdc: {
    1: '0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c', // BTC - USDC
    5: '0xA39434A63A52E749F02807ae27335515BA4b07F7', // BTC - USDC
    42161: '0xd0C7101eACbB49F3deCcCc166d238410D6D46d57',
  },
}

const contracts = {
  governance: {
    1: '',
    5: '0xDF4Fe71f494D1Db41c073a7629A788cA5A80e8f0',
    42161: '0xD013237b30e5Bcd8924b85aCA7b2254DF06D5B92'
  },
  balancer: {
    1: '',
    5: '0xA8aEDDB1c514977700609e886dA7814A311499F2',
    42161: '0x12770f03074e9bfaC13Dbd23b6030df69f5e5C04',
  },
  uniswap_amm: {
    1: '',
    5: '0x1aE97B3897eFC558955FB980B319D0ac8E22021B',
    42161: '0x57F45f0F38A9eEC3Db698b19eabF613a9207a9c7',
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
  wallets,
  tokens,
  libraries,
  contracts,
  chainlink_oracle,
  assets,
  socialLinks,
  assetStatus
}