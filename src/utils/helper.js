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

export const toDate = (val) => {
  if (val === 0)
    return '';

  const date = new Date(val * 1000);

  return date.getDate() + '/' + (date.getMonth() + 1) + ' ' + date.getHours() + ':' + date.getMinutes();
}

export const toTime = (val) => {
  if (val === 0)
    return '';

  const d = Math.floor(val / (3600 * 24));
  const h = Math.floor(val % (3600 * 24) / 3600);
  const m = val % 3600;

  const day = d === 0 ? '' : d > 1 ? d + ' Days ' : d + ' Day ';
  const hour = h === 0 ? '' : h > 1 ? h + ' Hours ' : h + ' Hour ';
  const min = m === 0 ? '' : m > 1 ? m + ' Mins' : m + ' Min';
  
  return day + hour + min;
}

export const toInt = (val) => {
  return parseInt(val.returnValues[0].hex, 16);
}

export const pp = (v, d, p) => {
  return Number((v / (10 ** d)).toFixed(p));
}