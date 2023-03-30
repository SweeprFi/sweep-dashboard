import { addresses, network } from "./address"

export const buySweepLink = `https://app.uniswap.org/#/swap?inputCurrency=${addresses.usdc}&outputCurrency=${addresses.sweep}`

export const assetName = (name) => {
  return name ? name : 'Off Chain Asset';
}

export const shortAddress = (addr) => {
  return addr?.slice(0, 8) + '...' + addr?.slice(-6)
}

export const scanLink = (addr) => {
  return network.scan + addr;
}