import Web3 from 'web3'
import { ethers } from "ethers";
import { Multicall } from 'ethereum-multicall';
import { addresses } from "@utils/address";
import { assetStatus, rpcLinks, tokens } from "@config/constants";
import { languages } from "@config/languages";
import { toInt, pp, toDate, toTime, annualRate } from './helper';
import erc20ABI from "@abis/erc20.json";
import sweepABI from "@abis/sweep.json";
import stabilizerABI from "@abis/stabilizer.json";

export const sweepFetch = async (chainId) => {
  const RPC = rpcLinks[chainId];
  const web3 = new Web3(RPC);
  const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });

  const callInfo = {
    reference: 'sweep',
    contractAddress: addresses.sweep,
    abi: sweepABI,
    calls: [
      { reference: 'totalSupplyCall', methodName: 'totalSupply' },
      { reference: 'interestRateCall', methodName: 'interestRate' },
      { reference: 'currentTargetPriceCall', methodName: 'currentTargetPrice' },
      { reference: 'ammPriceCall', methodName: 'ammPrice' },
      { reference: 'mintingAllowedCall', methodName: 'isMintingAllowed'},
      { reference: 'getMintersCall', methodName: 'getMinters' }
    ]
  }

  let callResults = await multicall.call(callInfo);
  const data = callResults.results['sweep']['callsReturnContext']

  return {
    total_supply: pp(toInt(data[0]), 18, 2),
    interest_rate: annualRate(toInt(data[1])),
    targe_price: pp(toInt(data[2]), 6, 4),
    amm_price: pp(toInt(data[3]), 6, 4),
    mint_status: data[4].returnValues[0] ? "Minting" : "Repaying",
    assets: data[5].returnValues
  }
}

export const assetListFetch = async (chainId, assets) => {
  const RPC = rpcLinks[chainId];
  const web3 = new Web3(RPC);
  const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });

  const callInfo = await Promise.all(
    assets.map(async (asset) => {
      const info = {
        reference: asset,
        contractAddress: asset,
        abi: stabilizerABI,
        calls: [
          { reference: 'borrowerCall', methodName: 'borrower' },
          { reference: 'linkCall', methodName: 'link' },
          { reference: 'sweepBorrowedCall', methodName: 'sweepBorrowed' },
          { reference: 'loanLimitCall', methodName: 'loanLimit' },
          { reference: 'currentValueCall', methodName: 'currentValue' },
          { reference: 'equityRatioCall', methodName: 'getEquityRatio' },
          { reference: 'minEquityRatioCall', methodName: 'minEquityRatio' },
          { reference: 'defaultedCall', methodName: 'isDefaulted' },
          { reference: 'callTimeCall', methodName: 'callTime' },
          { reference: 'callAmountCall', methodName: 'callAmount' },
          { reference: 'callDelayCall', methodName: 'callDelay' },
          { reference: 'pauseCall', methodName: 'paused' },
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
      isDefaulted: data[7].returnValues[0],
      call_time: toDate(toInt(data[8])),
      call_amount: pp(toInt(data[9]), 18, 2),
      call_delay: toTime(toInt(data[10])),
      isPaused: data[11].returnValues[0],
      name: data[12].returnValues[0],
      address: key,
    };
    const status = getStatus(info);
    info.status = status;

    assetList.push(info);
  })

  return assetList;
}

export const getSweepBalance = async (tokenName, curtChainId, destChainId, walletAddress) => {
  const curtRPC = rpcLinks[curtChainId];
  const destRPC = rpcLinks[destChainId];
  const key = Object.keys(tokens).filter((key) => key === tokenName);
  const token = tokens[key];

  // Get token balance of the source chain 
  let tokenAddress = token[curtChainId];
  let web3 = new Web3(curtRPC);
  let contract = new web3.eth.Contract(erc20ABI, tokenAddress);
  const curtAmount = await contract.methods.balanceOf(walletAddress).call();

  // Get token balance of the destination chain 
  tokenAddress = token[destChainId];
  web3 = new Web3(destRPC);
  contract = new web3.eth.Contract(erc20ABI, tokenAddress);
  const destAmount = await contract.methods.balanceOf(walletAddress).call();
  
  return {
    curt: curtAmount,
    dest: destAmount
  }
}

export const bridgeSweep = async (web3, tokenName, tokenABI, curtChainId, destNetId, sendAmount, walletAddress, setIsPending, displayNotify) => {
  const key = Object.keys(tokens).filter((key) => key === tokenName);
  const token = tokens[key];
  const tokenAddress = token[curtChainId]
  const contract = new web3.eth.Contract(tokenABI, tokenAddress);
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
  if(info.isPaused)
    return assetStatus.paused;
  
  if(info.loan_limit === 0)
    return assetStatus.deprecated;

  if (info.borrowed_amount === 0)
    return assetStatus.good;
  
  if (info.isDefaulted)
    return assetStatus.defaulted;

  if (info.equity_ratio < info.min_equity_ratio)
    return assetStatus.marginCall;
  
  if(info.call_time > 0 && info.call_amount > 0)
    return assetStatus.call;

  return assetStatus.good;
}