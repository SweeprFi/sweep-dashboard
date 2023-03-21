import Web3 from 'web3'
import { addresses, network } from "@utils/address";
import { assets } from "@utils/constants";
import json_sweep from "@abis/sweep.json";
import json_asset_aave from "@abis/assets/aave.json";
import json_asset_off_chain from "@abis/assets/off_chain.json";
import json_asset_token from "@abis/assets/token.json";
import json_asset_uniswap from "@abis/assets/uniswap.json";

const getWeb3 = () => {
  if (typeof window !== "undefined") {
    const web3 = new Web3(network.host);

    return web3
  } else {
    return null
  }
}

export const sweepFetch = async () => {
  const web3 = getWeb3();
  const contract = new web3.eth.Contract(json_sweep, addresses.sweep);
  const totalSupply = await contract.methods.totalSupply().call();
  const interest_rate = await contract.methods.interest_rate().call();
  const targe_price = await contract.methods.current_target_price().call();
  const amm_price = await contract.methods.amm_price().call();

  let minterList = [];

  // Get Minters from onChain
  /*
  const minterEvents = await contract.getPastEvents('MinterAdded', {
    fromBlock: 0,
    toBlock: 'latest'
  });
  await Promise.all(minterEvents.map(async (item) => {
    const code = await web3.eth.getCode(item.returnValues.minter_address);
    if(code != "0x")
      minterList.push(item.returnValues.minter_address);
  }));
  minterList = [...new Set(minterList)];
  */
 
  minterList = await Promise.all(
    Object.keys(assets).map(async (key) => {
      const info = {
        name: key,
        addr: assets[key][network.chain]
      };

      return await getAssetInfo(info);
    })
  )
console.log(1)
  return {
    total_supply: totalSupply / 1e18,
    interest_rate: interest_rate / 1e4,
    targe_price: targe_price / 1e6,
    amm_price: amm_price / 1e6,
    minterList: minterList
  }
}

const getAssetInfo = async (info) => {
  const abi = getAssetAbi(info.name);
  if (abi === null) return;
  
  const web3 = getWeb3();
  const contract = new web3.eth.Contract(abi, info.addr);

  const borrowed_amount = await contract.methods.sweep_borrowed().call();
  const loan_limit = await contract.methods.loan_limit().call();
  const is_defaulted = await contract.methods.isDefaulted().call();
  const call_amount = await contract.methods.call_amount().call();

  return {
    name: info.name,
    address: info.addr,
    borrowed_amount: borrowed_amount / 1e18,
    loan_limit: loan_limit / 1e18,
    is_defaulted: is_defaulted,
    is_marginCall: call_amount > 0
  }
}

export const assetFetch = async (info) => {
  const abi = getAssetAbi(info.name);
  if (abi === null) return;

  const web3 = getWeb3();
  const contract = new web3.eth.Contract(abi, info.addr);

  const link = await contract.methods.link().call();
  const borrower = await contract.methods.borrower().call();
  const borrowed_amount = await contract.methods.sweep_borrowed().call();
  const min_equity_ratio = await contract.methods.min_equity_ratio().call();
  const current_value = await contract.methods.currentValue().call();
  const equity_ratio = await contract.methods.getEquityRatio().call();
  const is_defaulted = await contract.methods.isDefaulted().call();
  const call_time = await contract.methods.call_time().call();
  const call_delay = await contract.methods.call_delay().call();
  const call_amount = await contract.methods.call_amount().call();

  return {
    name: info.name,
    link: link,
    address: info.addr,
    borrower: borrower,
    borrowed_amount: borrowed_amount / 1e18,
    min_equity_ratio: min_equity_ratio / 1e4,
    current_value: current_value / 1e6,
    equity_ratio: equity_ratio / 1e6,
    is_defaulted: is_defaulted,
    call_amount: call_amount / 1e18,
    call_time: call_time,
    call_delay: call_delay
  }
}

const getAssetAbi = (name) => {
  switch (name) {
    case 'aave':
      return json_asset_aave;
    case 'off_chain':
      return json_asset_off_chain;
    case 'weth':
      return json_asset_token;
    case 'wbtc':
      return json_asset_token;
    case 'uniswap':
      return json_asset_uniswap;
    default:
      return null;
  }
}