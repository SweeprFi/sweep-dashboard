import Web3 from 'web3'
import { ethers } from "ethers";
import { Multicall } from 'ethereum-multicall';
import { languages } from "@config/languages";
import { assetStatus, rpcLinks, tokens, contracts, chainList, networks } from "@config/constants";
import {
  toInt, pp, toDate, toTime, annualRate,
  otherChainRpcs, getMaxBorrow, getMaxWithdraw
} from './helper';

import erc20ABI from "@abis/erc20.json";
import sweepABI from "@abis/sweep.json";
import sweeprABI from "@abis/sweepr.json";
import stabilizerABI from "@abis/stabilizer.json";
import marketMakerABI from "@abis/marketMaker.json";

export const sweepFetch = async (chainId) => {
  if(!chainId) return {};

  const RPC = rpcLinks[chainId];
  const web3 = new Web3(RPC);
  const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });
  const network = chainList.find((network) => network.chainId === chainId);

  const callInfo = {
    reference: 'sweep',
    contractAddress: tokens.sweep[chainId],
    abi: sweepABI,
    calls: [
      { reference: 'totalSupplyCall', methodName: 'totalSupply' },
      { reference: 'interestRateCall', methodName: 'interestRate' },
      { reference: 'targetPriceCall', methodName: 'targetPrice' },
      { reference: 'ammPriceCall', methodName: 'ammPrice' },
      { reference: 'arbSpreadCall', methodName: 'arbSpread' },
      { reference: 'mintingAllowedCall', methodName: 'isMintingAllowed' },
      { reference: 'getMintersCall', methodName: 'getMinters' },
    ]
  }

  let callResults = await multicall.call(callInfo);
  const data = callResults.results['sweep']['callsReturnContext']

  const { rpcs, ids } = otherChainRpcs(chainId);
  const otherTotalSupplys = await Promise.all(rpcs.map(async (rpc, index) => {
    return await getTotalSupply(rpc, tokens.sweep[ids[index]]);
  }));

  let totalSupply = toInt(data[0]);
  otherTotalSupplys.map((supply) => totalSupply += Number(supply));

  const market_price = toInt(data[2]) * (1 + toInt(data[4]) / 1e6);
  const assets = data[6].returnValues;
  const { totalBorrowed, totalValue } = await assetsBlock(chainId, assets);

  return {
    total_supply: pp(totalSupply, 18, 2),
    local_supply: pp(toInt(data[0]), 18, 2),
    interest_rate: annualRate(toInt(data[1])),
    targe_price: pp(toInt(data[2]), 6, 5),
    amm_price: pp(toInt(data[3]), 6, 5),
    market_price: pp(market_price, 6, 5),
    mint_status: data[5].returnValues[0] ? 0 : 1,
    assets,
    totalBorrowed,
    totalValue,
    network: network.name,
    chain: network.chainId,
    logo: network.logo
  }
}

export const sweeprFetch = async (chainId) => {
  if(!chainId) return {};
  const RPC = rpcLinks[chainId];
  const web3 = new Web3(RPC);
  const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });

  const callInfo = {
    reference: 'sweepr',
    contractAddress: tokens.sweepr[chainId],
    abi: sweeprABI,
    calls: [
      { reference: 'totalSupplyCall', methodName: 'totalSupply' }
    ]
  }

  let callResults = await multicall.call(callInfo);
  const data = callResults.results['sweepr']['callsReturnContext']
  const { rpcs, ids} = otherChainRpcs(chainId);
  const otherTotalSupplys = await Promise.all(rpcs.map(async (rpc, index) => {
    return await getTotalSupply(rpc, tokens.sweepr[ids[index]]);
  }));

  let totalSupply = toInt(data[0]);
  otherTotalSupplys.map((supply) => totalSupply += Number(supply));

  return {
    total_supply: pp(totalSupply, 18, 2),
    local_supply: pp(toInt(data[0]), 18, 2)
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

export const getBalances = async (chainId, tokenLists, walletAddress) => {
  const rpc = rpcLinks[chainId];
  const web3 = new Web3(rpc);
  const balances = await Promise.all(
    tokenLists.map(async (token) => {
      const symbol = token.name.toLowerCase();
      const address = tokens[symbol][chainId];
      const abi = token.abi;
      const contract = new web3.eth.Contract(abi, address);
      const bal = await contract.methods.balanceOf(walletAddress).call();

      return {
        name: symbol,
        bal: bal
      }
    })
  )

  return balances;
}

export const bridgeSweep = async (web3, tokenName, tokenABI, curtChainId, destNetId, sendAmount, walletAddress, setIsPending, displayNotify, callback) => {
  const key = Object.keys(tokens).filter((key) => key === tokenName);
  const token = tokens[key];
  const tokenAddress = token[curtChainId]
  const contract = new web3.eth.Contract(tokenABI, tokenAddress);
  const amount = ethers.parseEther(sendAmount.toString()).toString();
  const adapterParam = ethers.solidityPacked(["uint16", "uint256"], [1, 200000]);
  const fees = await contract.methods.estimateSendFee(destNetId, walletAddress, amount, false, adapterParam).call();
  const gasFee = Number((fees.nativeFee * 1.01).toFixed(0));

  try {
    await contract.methods.sendFrom(
      walletAddress,
      destNetId,
      walletAddress,
      amount,
      walletAddress,
      '0x0000000000000000000000000000000000000000',
      []
    ).send({ from: walletAddress, value: gasFee })
      .on('transactionHash', (hash) => {
        setIsPending(true);
        displayNotify({ type: 'info', msg: "Track your token delivery on LayerZeroScan:", value: hash, network: 'lz' });
      })
      .on('receipt', () => {
        setIsPending(false);
        displayNotify({ type: 'success', msg: languages.text_tx_success, network: '' });
        callback();
      })
      .on('error', (error) => {
        setIsPending(false);
        displayNotify({ type: 'error', msg: error.message, network: '' });
      });
  } catch (error) {
    console.log(error)
  }
}

export const buySweepOnMarketMaker = async (web3, chainId, usdcAmount, decimals, walletAddress, setIsPending, displayNotify, callback) => {
  const marketMakerAddress = getAddress(contracts, 'marketMaker', chainId);
  const contract = new web3.eth.Contract(marketMakerABI, marketMakerAddress);
  const amount = ethers.parseUnits(usdcAmount.toString(), decimals).toString();
  const network = networks[chainId];
  // const gasAmount = await contract.methods.buySweep(amount).estimateGas({ from: walletAddress });

  try {
    await contract.methods.buySweep(amount)
      .send({ from: walletAddress })
      .on('transactionHash', (hash) => {
        setIsPending(true);
        displayNotify({ type: 'info', msg: "Tx Hash:", value: hash, network: network });
      })
      .on('receipt', () => {
        setIsPending(false);
        displayNotify({ type: 'success', msg: languages.text_tx_success, network: '' });
        callback();
      })
      .on('error', (error) => {
        setIsPending(false);
        displayNotify({ type: 'error', msg: error.message, network: '' });
      });
  } catch (error) {
    console.log(error)
  }
}

export const getMarketMakerAllowance = async (chainId, token, walletAddress) => {
  const rpc = rpcLinks[chainId];
  const web3 = new Web3(rpc);
  const tokenAddress = getAddress(tokens, token, chainId);
  const marketMakerAddress = getAddress(contracts, 'marketMaker', chainId);
  const contract = new web3.eth.Contract(erc20ABI, tokenAddress);

  return await contract.methods.allowance(walletAddress, marketMakerAddress).call();
}

export const approveMarketMaker = async (web3, chainId, tokenAmount, token, walletAddress, setIsPending, setAllowance, displayNotify) => {
  const tokenAddress = getAddress(tokens, token.name.toLowerCase(), chainId);
  const marketMakerAddress = getAddress(contracts, 'marketMaker', chainId);
  const amount = ethers.parseUnits(tokenAmount.toString(), token.decimal).toString();
  const contract = new web3.eth.Contract(erc20ABI, tokenAddress);
  const network = networks[chainId];

  try {
    await contract.methods.approve(
      marketMakerAddress, amount
    ).send({ from: walletAddress })
      .on('transactionHash', (hash) => {
        setIsPending(true);
        displayNotify({ type: 'info', msg: "Tx Hash:", value: hash, network: network });
      })
      .on('receipt', () => {
        setIsPending(false);
        setAllowance(Number(amount));
        displayNotify({ type: 'success', msg: languages.text_tx_success, network: '' });
      })
      .on('error', (error) => {
        displayNotify({ type: 'error', msg: error.message, network: '' });
        setIsPending(false);
      });
  } catch (error) {
    console.log(error)
  }
}

export const assetFetch = async (network, addr) => {
  const chain = chainList.filter(_chain => _chain.name.toLowerCase() === network);
  const chainId = chain[0]?.chainId;
  const RPC = rpcLinks[chainId];
  const web3 = new Web3(RPC);
  const sweepAddress = tokens.sweep[chainId];
  const isValidMinter = await checkAsset(web3, sweepAddress, addr);

  if (!isValidMinter) return { loading: false, found: false, data: {} };

  const info = {
    reference: addr,
    contractAddress: addr,
    abi: stabilizerABI,
    calls: [
      { reference: 'borrowerCall', methodName: 'borrower' },
      { reference: 'sweepBorrowedCall', methodName: 'sweepBorrowed' },
      { reference: 'loanLimitCall', methodName: 'loanLimit' },
      { reference: 'currentValueCall', methodName: 'currentValue' },
      { reference: 'assetValueCall', methodName: 'assetValue' },
      { reference: 'equityRatioCall', methodName: 'getEquityRatio' },
      { reference: 'juniorTranchCall', methodName: 'getJuniorTrancheValue' },
      { reference: 'nameCall', methodName: 'name' },
      { reference: 'debtCall', methodName: 'getDebt' },
      { reference: 'feeCall', methodName: 'accruedFee' },
      { reference: 'minEquityRatioCall', methodName: 'minEquityRatio' },
      { reference: 'callDelayCall', methodName: 'callDelay' },
      { reference: 'callAmountCall', methodName: 'callAmount' },
      { reference: 'callTimeCall', methodName: 'callTime' },
      { reference: 'spreadFeeCall', methodName: 'spreadFee' },
      { reference: 'spreadDateCall', methodName: 'spreadDate' },
      { reference: 'autoInvestMinRatioCall', methodName: 'autoInvestMinRatio' },
      { reference: 'autoInvestMinAmountCall', methodName: 'autoInvestMinAmount' },
      { reference: 'autoInvestEnabledCall', methodName: 'autoInvestEnabled' },
      { reference: 'settingsEnabledCall', methodName: 'settingsEnabled' },
      { reference: 'startingTimeCall', methodName: 'startingTime' },
      { reference: 'startingPriceCall', methodName: 'startingPrice' },
      { reference: 'decreaseFactorCall', methodName: 'decreaseFactor' },
      { reference: 'minLiquidationRatioCall', methodName: 'minLiquidationRatio' },
      { reference: 'auctionAllowedCall', methodName: 'auctionAllowed' },
      { reference: 'linkCall', methodName: 'link' },
    ]
  }

  const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });
  let callResult = await multicall.call(info);
  const data = callResult.results[addr]['callsReturnContext'];

  let sweepBorrowed = pp(toInt(data[1]), 18, 2);
  let currentValue = pp(toInt(data[3]), 6, 2);
  let assetValue = pp(toInt(data[4]), 6, 2);
  let minEquityRatio = pp(toInt(data[10]), 4, 2);
  let juniorTranche = pp(toInt(data[6]), 6, 2);
  let maxBorrow = getMaxBorrow(juniorTranche, minEquityRatio);
  let accruedFee = data[9].returnValues[0].hex;
  let feeInUSD = await convertToUSD(web3, sweepAddress, accruedFee);

  return {
    loading: false,
    found: true,
    data: {
      borrower: data[0].returnValues[0],
      loanLimit: pp(toInt(data[2]), 18, 2),
      equityRatio: pp(toInt(data[5]), 4, 2),
      name: data[7].returnValues[0],
      debt: pp(toInt(data[8]), 18, 2),
      fee: pp(toInt(data[9]), 18, 2),
      callDelay: toTime(toInt(data[11])),
      callAmount:pp(toInt(data[12]), 18, 2),
      callTime: toDate(toInt(data[13])),
      spreadFee: pp(toInt(data[14]), 4, 2),
      spreadDate: toInt(data[15]),
      autoInvestMinRatio: pp(toInt(data[16]), 4, 2),
      autoInvestMinAmount: pp(toInt(data[17]), 18, 2),
      autoInvestEnabled: data[18].returnValues[0],
      settingsEnabled: data[19].returnValues[0],
      startingTime: data[20].returnValues[0],
      startingPrice: pp(toInt(data[21]), 6, 2),
      decreaseFactor: pp(toInt(data[22]), 4, 2),
      minLiquidationRatio: pp(toInt(data[23]), 4, 2),
      auctionAllowed: data[24].returnValues[0],
      sweepBorrowed, currentValue, assetValue, minEquityRatio, juniorTranche, maxBorrow,
      remainingBorrow: (maxBorrow - sweepBorrowed).toFixed(2),
      maxWithdraw: getMaxWithdraw(currentValue, minEquityRatio, juniorTranche),
      deposited: (currentValue - assetValue + pp(feeInUSD, 6, 2)).toFixed(2),
      link: data[25].returnValues[0]
    }
  }
}

const assetsBlock = async (chainId, assets) => {
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
          { reference: 'sweepBorrowedCall', methodName: 'sweepBorrowed' },
          { reference: 'currentValueCall', methodName: 'currentValue' },
          { reference: 'assetValueCall', methodName: 'assetValue' },
        ]
      }

      return info;
    })
  )

  let callResults = await multicall.call(callInfo);
  callResults = callResults.results;

  let totalValue = 0; 
  let totalBorrowed = 0;

  Object.keys(callResults).map(async (key) => {
    const data = callResults[key]['callsReturnContext'];
    totalBorrowed += toInt(data[0]);
    totalValue += toInt(data[2]);
  })

  return {
    totalBorrowed: pp(totalBorrowed, 18, 2),
    totalValue: pp(totalValue, 6, 2)
  };
}

// *******************
const checkAsset = async (web3, sweepAddress, addr) => {
  const contract = new web3.eth.Contract(sweepABI, sweepAddress);
  return await contract.methods.isValidMinter(addr).call();
}

const convertToUSD = async (web3, sweepAddress, amount) => {
  const contract = new web3.eth.Contract(sweepABI, sweepAddress);
  return await contract.methods.convertToUSD(amount).call();
}

const getTotalSupply = async (rpc, address) => {
  const web3 = new Web3(rpc);
  const contract = new web3.eth.Contract(erc20ABI, address);
  return await contract.methods.totalSupply().call();
}

const getStatus = (info) => {
  if (info.isPaused)
    return assetStatus.paused;

  if (info.loan_limit === 0)
    return assetStatus.deprecated;

  if (info.borrowed_amount === 0)
    return assetStatus.good;

  if (info.isDefaulted)
    return assetStatus.defaulted;

  if (info.equity_ratio < info.min_equity_ratio)
    return assetStatus.marginCall;

  if (info.call_time > 0 && info.call_amount > 0)
    return assetStatus.call;

  return assetStatus.good;
}

const getAddress = (list, name, id) => {
  return list[name][id];
}