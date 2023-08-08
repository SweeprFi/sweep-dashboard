import {
  networks,
  rpcLinks,
  scans,
  tokens,
  AMMLinks
} from "@config/constants";

const chainId = process.env.REACT_APP_CHAIN_ID;

const addresses = {
  sweep: tokens.sweep[chainId],
  usdc: tokens.usdc[chainId]
}

const network = {
  chain: chainId,
  rpc: rpcLinks[chainId],
  scan: scans[chainId],
  name: networks[chainId],
  ammLink: AMMLinks[chainId]
}

export {
  addresses,
  network
}