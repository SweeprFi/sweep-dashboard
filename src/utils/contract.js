import Web3 from 'web3'
import { ethers } from "ethers";
import { Multicall } from 'ethereum-multicall';
import { addresses, network } from "@utils/address";
import { assetStatus, rpcLinks, tokens } from "@config/constants";
import { languages } from "@config/languages";
import { toInt, pp, toDate, toTime } from './helper';
import { getWeb3 } from './walletHelper';
import json_sweep from "@abis/sweep.json";
import json_stabilizer from "@abis/stabilizer.json";

export const sweepFetch = async () => {
  const web3 = new Web3(network.rpc);
  const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });

  const callInfo = {
    reference: 'sweep',
    contractAddress: addresses.sweep,
    abi: json_sweep,
    calls: [
      { reference: 'totalSupplyCall', methodName: 'totalSupply' },
      { reference: 'interestRateCall', methodName: 'interest_rate' },
      { reference: 'currentTargetPriceCall', methodName: 'current_target_price' },
      { reference: 'ammPriceCall', methodName: 'amm_price' },
      { reference: 'mintingAllowedCall', methodName: 'is_minting_allowed', methodParameters: [1] },
      { reference: 'getMintersCall', methodName: 'getMinters' }
    ]
  }

  let callResults = await multicall.call(callInfo);
  const data = callResults.results['sweep']['callsReturnContext']

  return {
    total_supply: pp(toInt(data[0]), 18, 2),
    interest_rate: pp(toInt(data[1]), 4, 2),
    targe_price: pp(toInt(data[2]), 6, 4),
    amm_price: pp(toInt(data[3]), 6, 4),
    mint_status: data[4].returnValues[0] ? "Minting" : "Repaying",
    assets: data[5].returnValues
  }
}

export const assetListFetch = async (assets) => {
  const web3 = new Web3(network.rpc);
  const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });

  const callInfo = await Promise.all(
    assets.map(async (asset) => {
      const info = {
        reference: asset,
        contractAddress: asset,
        abi: json_stabilizer,
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
          { reference: 'callDelayCall', methodName: 'call_delay' },
          { reference: 'frozenCall', methodName: 'frozen' },
          { reference: 'nameCall', methodName: 'name' },
        ]
      }

      return info;
    })
  )

  const assetList = [];
  let callResults = await multicall.call(callInfo);
  callResults = callResults.results;

  Object.keys(callResults).map(async (key) => {
    const data = callResults[key]['callsReturnContext'];
    const info = {
      borrower: data[0].returnValues[0],
      link: data[1].returnValues[0],
      borrowed_amount: pp(toInt(data[2]), 18, 2),
      loan_limit: pp(toInt(data[3]), 18, 2),
      current_value: pp(toInt(data[4]), 6, 2),
      equity_ratio: pp(toInt(data[5]), 4, 2),
      min_equity_ratio: pp(toInt(data[6]), 4, 2),
      is_defaulted: data[7].returnValues[0],
      call_time: toDate(toInt(data[8])),
      call_amount: pp(toInt(data[9]), 18, 2),
      call_delay: toTime(toInt(data[10])),
      isFrozen: data[11].returnValues[0],
      name: data[12].returnValues[0],
      address: key,
    };
    const status = getStatus(info);
    info.status = status;

    assetList.push(info);
  })

  return assetList;
}

export const getSweepBalance = async (chainId, walletAddress) => {
  if(walletAddress === '') return 0;

  const rpc = rpcLinks[chainId];
  const sweepAddress = tokens.sweep[chainId]
  const web3 = new Web3(rpc);
  const contract = new web3.eth.Contract(json_sweep, sweepAddress);
  
  return await contract.methods.balanceOf(walletAddress).call();
}

export const bridgeSweep = async (curtChainId, destNetId, sendAmount, walletAddress, setIsPending, displayNotify) => {
  const web3 = getWeb3();
  const sweepAddress = tokens.sweep[curtChainId]
  const contract = new web3.eth.Contract(json_sweep, sweepAddress);
  const amount = (sendAmount * 1e18).toString();
  const adapterParam = ethers.solidityPacked(["uint16", "uint256"], [1, 200000])
  const fees = await contract.methods.estimateSendFee(destNetId, walletAddress, amount, false, adapterParam).call();
  const gasFee = fees.nativeFee;
  
  try {
    await contract.methods.sendFrom(
      walletAddress,
      destNetId,
      walletAddress,
      amount,
      walletAddress,
      '0x0000000000000000000000000000000000000000',
      adapterParam
    ).send({ from: walletAddress, value: gasFee })
    .on('transactionHash', () => {
      setIsPending(true);
      displayNotify('info', languages.text_tx_process);
    })
    .on('receipt', () => {
      setIsPending(false);
      displayNotify('success', languages.text_tx_success);
    })
    .on('error', () => {
      setIsPending(false);
      displayNotify('error', languages.text_tx_error);
    });
  } catch (error) {
    
  }
}

const getStatus = (info) => {
  if(info.isFrozen)
    return assetStatus.frozen;
  
  if(info.loan_limit === 0)
    return assetStatus.deprecated;

  if (info.borrowed_amount === 0)
    return assetStatus.good;
  
  if (info.is_defaulted)
    return assetStatus.defaulted;

  if (info.equity_ratio < info.min_equity_ratio)
    return assetStatus.marginCall;
  
  if(info.call_time > 0 && info.call_amount > 0)
    return assetStatus.call;

  return assetStatus.good;
}