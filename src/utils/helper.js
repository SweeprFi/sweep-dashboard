import { chainList, rpcLinks, scans, month } from "../config/constants";

export const assetName = (name) => {
  return name ? name : 'Off Chain Asset';
}

export const shortAddress = (addr) => {
  return addr?.slice(0, 6) + '...' + addr?.slice(-4)
}

export const scanLink = (chainId, addr) => {
  return scans[chainId] + addr;
}

export const assetLink = (addr) => {
  return "/asset/" + addr;
}

export const toDate = (val) => {
  if (val === 0)
    return '-';

  const date = new Date(val * 1000);

  return month[date.getMonth()] + ' ' + date.getDate() + ', ' + zeroToNum(date.getHours()) + ':' + zeroToNum(date.getMinutes());
}

export const toTime = (val) => {
  if (val === 0)
    return '-';

  const h = val / 3600;
  const m = Math.floor(val % 3600 / 60);

  const min = m === 0 ? '' : m > 1 ? m + ' mins' : m + ' min';
  const hour = h >= 1 ? Math.round(h) : 0;
  const delay = hour === 0 ? min : hour > 1 ? hour + ' hours ' : hour + ' hour ';

  return delay;
}

export const toInt = (val) => {
  if (val.returnValues.length > 0) {
    return parseInt(val.returnValues[0].hex, 16);
  }

  return 0;
}

export const convertNumber = (val) => {
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const pp = (v, d, p) => {
  return Number((v / (10 ** d)).toFixed(p));
}

export const annualRate = (dayRate = 0) => {
  const PRECISION = 1e10;

  return Number(((dayRate / PRECISION * 365) * 100).toFixed(2));
}

export const otherChainRpcs = (chainId) => {
  const ids = chainList.filter((item) => Number(item.chainId) !== Number(chainId)).map((item) => item.chainId);
  const rpcs = ids.map((id) => { return rpcLinks[id] });

  return {rpcs, ids};
}

export const zeroToNum = (val) => {
  return ('00' + val).slice(-2);
}

export const getMaxBorrow = (equity, ratio) => {
  if(ratio === 0) return 0;
  return ((equity * (1/(ratio/100))-1)).toFixed(2);  
}

export const getMaxWithdraw = (total, ratio, junior) => {
  const maxWithdraw = junior - (ratio/100 * total);
  return (maxWithdraw > 0) ? maxWithdraw.toFixed(2) : 0;
}