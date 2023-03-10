const {
  networks,
  hosts,
  scans,
  wallets,
  tokens,
  libraries,
  contracts,
  chainlink_oracle,
  stabilizers,
  assets,
  strategies
} = require("./constants");

const chainId = process.env.REACT_APP_CHAIN_ID;

const addresses = {
  // Wallets
  owner: wallets.owner[chainId],
  borrower: wallets.borrower[chainId],
  wallet: wallets.wallet[chainId],
  treasury: wallets.treasury[chainId],
  usdc_holder: wallets.usdc_holder[chainId],
  comp_holder: wallets.comp_holder[chainId],
  multisig: wallets.multisig[chainId],

  // Tokens
  sweep: tokens.sweep[chainId],
  sweeper: tokens.sweeper[chainId],
  usdc: tokens.usdc[chainId],
  usdt: tokens.usdt[chainId],
  aave_usdc: tokens.aave_usdc[chainId],
  comp: tokens.comp[chainId],
  comp_cusdc: tokens.comp_cusdc[chainId],
  weth: tokens.weth[chainId],
  wbtc: tokens.wbtc[chainId],

  // Libraries
  liquidity_helper: libraries.liquidity_helper[chainId],
  timelock: libraries.timelock[chainId],
  approver: libraries.approver[chainId],
  uniswap_pool: libraries.uniswap_pool[chainId],
  uniV3Twap_oracle: libraries.uniV3Twap_oracle[chainId],
  uniswap_factory: libraries.uniswap_factory[chainId],
  uniswap_router: libraries.uniswap_router[chainId],
  aaveV2_pool: libraries.aaveV2_pool[chainId],
  aaveV3_pool: libraries.aaveV3_pool[chainId],
  uniV3Positions: libraries.uniswapV3_positions[chainId],
  comp_control: libraries.comp_control[chainId],

  // Oracles - ChainLink
  oracle_comp_usdc: chainlink_oracle.comp_usdc[chainId],
  oracle_weth_usdc: chainlink_oracle.weth_usdc[chainId],
  oracle_wbtc_usdc: chainlink_oracle.wbtc_usdc[chainId],
  
  // Maxos contracts
  governance: contracts.governance[chainId],
  balancer: contracts.balancer[chainId],
  uniswap_amm: contracts.uniswap_amm[chainId],
  
  // Stabilizers
  stabilizer_offChain: stabilizers.off_chain[chainId],
  stabilizer_aave: stabilizers.aave[chainId],
  stabilizer_comp: stabilizers.comp[chainId],
  stabilizer_uniswap: stabilizers.uniswap[chainId],
  stabilizer_weth: stabilizers.weth[chainId],
  stabilizer_wbtc: stabilizers.wbtc[chainId],
  
  // Assets
  asset_offChain: assets.off_chain[chainId],
  asset_aave: assets.aave[chainId],
  asset_uniswap: assets.uniswap[chainId],
  asset_weth: assets.weth[chainId],
  asset_wbtc: assets.wbtc[chainId],

  // Strategies (Stabilizers + Assets)
  aave_strategy: strategies.aave[chainId],
}

const network = {
  chain: chainId,
  host: hosts[chainId],
  scan: scans[chainId],
  name: networks[chainId]
}

module.exports = {
  addresses,
  network
}