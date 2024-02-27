import { ethers } from "ethers";
import { chainList, scans, month } from "../config/constants";

export const shortAddress = (address) => {
  if(!address) return
  return `${address.slice(0, 6)} ··· ${address.slice(-4)}`
}

export const scanLink = (network, address) => {
  if(network === 'lz') return `https://layerzeroscan.com/${address}`

  const chain = chainList.find(_chain => _chain.name.toLowerCase() === network?.toLowerCase());
  return scans[chain?.chainId] + address;
}

export const assetLink = (address, chainId) => { 
  const chain = chainList.find((_chain) => _chain.chainId === Number(chainId));
  const network = chain?.name.toLowerCase();
  return `/asset/${network}/${address}`;
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

export const format = (v, d) => {
  return ethers.utils.parseUnits(v.toString(), d).toString();
}

export const convertNumber = (val) => {
  if(!val) return 0;
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const pp = (v, d, p) => {
  return Number((v / (10 ** d)).toFixed(p));
}

export const annualRate = (dayRate = 0) => {
  const PRECISION = 1e10;

  return Number(((dayRate / PRECISION * 365) * 100).toFixed(2));
}

export const otherChainIds = (chainId) => {
  return chainList.filter((item) => Number(item.chainId) !== Number(chainId)).map((item) => item.chainId);
}

export const zeroToNum = (val) => {
  return ('00' + val).slice(-2);
}

export const getMaxBorrow = (junior, ratio) => {
  if(ratio === 0) ratio = 0.01;
  return ((junior * (1/(ratio/100))-1)).toFixed(2);  
}

export const getMaxWithdraw = (total, ratio, junior) => {
  const maxWithdraw = junior - (ratio/100 * total);
  return (maxWithdraw > 0) ? maxWithdraw.toFixed(2) : 0;
}