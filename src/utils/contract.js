import Web3 from 'web3'
import { addresses, network } from "@utils/address";
import { assets } from "@utils/constants";
import json_sweep from "@abis/sweep.json";
import json_asset_aave from "@abis/assets/aave.json";
import json_asset_off_chain from "@abis/assets/off_chain.json";
import json_asset_token from "@abis/assets/token.json";
import json_asset_uniswap from "@abis/assets/uniswap.json";
import { Multicall } from 'ethereum-multicall';

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
  const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });

  const callInfo = {
    reference: 'sweep',
    contractAddress: addresses.sweep,
    abi: json_sweep,
    calls: [
      { reference: 'totalSupplyCall', methodName: 'totalSupply' },
      { reference: 'interestRateCall', methodName: 'interest_rate' },
      { reference: 'currentTargetPriceCall', methodName: 'current_target_price' },
      { reference: 'ammPriceCall', methodName: 'amm_price' }
    ]
  }

  let callResults = await multicall.call(callInfo);
  const data = callResults.results['sweep']['callsReturnContext']

  return {
    total_supply: toInt(data[0]) / 1e18,
    interest_rate: toInt(data[1]) / 1e4,
    targe_price: toInt(data[2]) / 1e6,
    amm_price: toInt(data[3]) / 1e6
  }
}

export const assetListFetch = async () => {
  const web3 = getWeb3();
  const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });

  const callInfo = await Promise.all(
    Object.keys(assets).map(async (key) => {
      const info = {
        reference: key,
        contractAddress: assets[key][network.chain],
        abi: getAssetAbi(key),
        calls: [
          { reference: 'borrowerCall', methodName: 'borrower' },
          { reference: 'linkCall', methodName: 'link' },
          { reference: 'sweepBorrowedCall', methodName: 'sweep_borrowed' },
          { reference: 'loanLimitCall', methodName: 'loan_limit' },
          { reference: 'currentValueCall', methodName: 'currentValue' },
          { reference: 'equityRatioCall', methodName: 'getEquityRatio' },
          { reference: 'minEquityRatioCall', methodName: 'min_equity_ratio' },
          { reference: 'defaultedCall', methodName: 'isDefaulted' },
          { reference: 'callTimeCall', methodName: 'call_time' },
          { reference: 'callAmountCall', methodName: 'call_amount' },
          { reference: 'callDelayCall', methodName: 'call_delay' }
        ]
      }

      return info;
    })
  )
  
  const assetList = [];
  let callResults = await multicall.call(callInfo);
  callResults = callResults.results;

  Object.keys(callResults).map(async (key) => {
    const data = callResults[key]['callsReturnContext']
    const info = {
      name: key,
      address: assets[key][network.chain],
      borrower: data[0].returnValues[0],
      link: data[1].returnValues[0],
      borrowed_amount: toInt(data[2]) / 1e18,
      loan_limit: toInt(data[3]) / 1e18,
      current_value: toInt(data[4]) / 1e6,
      equity_ratio: toInt(data[5]) / 1e4,
      min_equity_ratio: toInt(data[6]) / 1e4,
      is_defaulted: data[7].returnValues[0],
      call_time: toInt(data[8]),
      call_amount: toInt(data[9]) / 1e18,
      call_delay: toInt(data[10])
    }

    assetList.push(info);
  })

  return assetList;
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

const toInt = (val) => {
  return parseInt(val.returnValues[0].hex, 16);
}