import {
  networks,
  hosts,
  scans,
  tokens
} from "@config/constants";

const chainId = process.env.REACT_APP_CHAIN_ID;

const addresses = {
  sweep: tokens.sweep[chainId],
  usdc: tokens.usdc[chainId]
}

const network = {
  chain: chainId,
  host: hosts[chainId],
  scan: scans[chainId],
  name: networks[chainId]
}

export {
  addresses,
  network
}