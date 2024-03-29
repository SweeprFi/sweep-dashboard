import Web3 from 'web3'
import { ethers } from "ethers";
import { Multicall } from 'ethereum-multicall';
import { languages } from "@config/languages";
import { assetStatus, rpcLinks, tokens, contracts, chainList, networks } from "@config/constants";
import {
  toInt, pp, toDate, toTime, annualRate,
  otherChainIds, getMaxBorrow, getMaxWithdraw
} from './helper';

import erc20ABI from "@abis/erc20.json";
import sweepABI from "@abis/sweep.json";
import sweeprABI from "@abis/sweepr.json";
import stabilizerABI from "@abis/stabilizer.json";
import marketMakerABI from "@abis/marketMaker.json";

import { simulateApprove, simulateBuySweep } from './simulation';

export const sweepFetch = async (chainId) => {
  if(!chainId) return null;

  const network = chainList.find((network) => network.chainId === chainId);
  const MMAddress = getAddress(contracts, 'marketMaker', chainId);
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

  const web3 = await getWeb3(chainId);
  if(!web3) return null;

  const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });
  const maxToBuy = await getMaxBuy(multicall, MMAddress);

  let callResults = await multicall.call(callInfo);
  const data = callResults.results['sweep']['callsReturnContext']

  const ids = otherChainIds(chainId);
  const otherTotalSupplys = await Promise.all(ids.map(async (id) => {
    return await getTotalSupply(id, tokens.sweep[id]);
  }));

  let totalSupply = toInt(data[0]);
  otherTotalSupplys.map((supply) => totalSupply += Number(supply));

  const market_price = toInt(data[2]) * (1 + toInt(data[4]) / 1e6);
  const assets = data[6].returnValues;
  const { totalBorrowed, totalValue } = await assetsBlock(multicall, assets);

  return {
    total_supply: pp(totalSupply, 18, 2),
    local_supply: pp(toInt(data[0]), 18, 2),
    interest_rate: annualRate(toInt(data[1])),
    target_price: pp(toInt(data[2]), 6, 5),
    amm_price: pp(toInt(data[3]), 6, 5),
    market_price: pp(market_price, 6, 5),
    mint_status: data[5].returnValues[0] ? 0 : 1,
    assets,
    totalBorrowed,
    totalValue,
    network: network.name,
    chain: network.chainId,
    logo: network.logo,
    maxToBuy: Number(maxToBuy.toFixed(2))
  }
}

export const sweeprFetch = async (chainId) => {
  if(!chainId) return null;
  const web3 = await getWeb3(chainId);
  if(!web3) return null;

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
  const ids = otherChainIds(chainId);
  const otherTotalSupplys = await Promise.all(ids.map(async (id) => {
    return await getTotalSupply(id, tokens.sweepr[id]);
  }));

  let totalSupply = toInt(data[0]);
  otherTotalSupplys.map((supply) => totalSupply += Number(supply));

  return {
    total_supply: pp(totalSupply, 18, 2),
    local_supply: pp(toInt(data[0]), 18, 2)
  }
}

export const assetListFetch = async (chainId, assets) => {
  const web3 = await getWeb3(chainId);
  if(!web3) return [];
  const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });

  const assetList = [];
  const calls = assets.map(async (asset) => {
    const callInfo = [
      {
        reference: "asset",
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
        ],
      },
      {
        reference: "sw",
        contractAddress: tokens.sweep[chainId],
        abi: sweepABI,
        calls: [{ reference: 'minterC', methodName: 'minters', methodParameters: [asset] }],
      },
    ];

    const result = await multicall.call(callInfo);
    assetList.push(result);
  });

  await Promise.all(calls);

  const assetData = assetList.map(asset => {
    const aData = asset.results.asset.callsReturnContext;
    const address = asset.results.asset.originalContractCallContext.contractAddress;
    const sData = asset.results.sw.callsReturnContext;
    const max = sData[0].returnValues[0];
    
    const info = {
      borrower: aData[0].returnValues[0],
      link: aData[1].returnValues[0],
      borrowed_amount: pp(toInt(aData[2]), 18, 2),
      loan_limit: pp(toInt(aData[3]), 18, 2),
      current_value: pp(toInt(aData[4]), 6, 2),
      equity_ratio: pp(toInt(aData[5]), 4, 2),
      min_equity_ratio: pp(toInt(aData[6]), 4, 2),
      isDefaulted: aData[7].returnValues[0],
      call_time: toDate(toInt(aData[8])),
      call_amount: pp(toInt(aData[9]), 18, 2),
      call_delay: toTime(toInt(aData[10])),
      isPaused: aData[11].returnValues[0],
      name: aData[12].returnValues[0],
      address,
      maxAmount: pp(parseInt(max.hex, 16), 18, 2)
    };
    const status = getStatus(info);
    info.status = status;

    return info;
  })

  return assetData;
}

export const getSweepBalance = async (tokenName, curtChainId, destChainId, walletAddress) => {
  const key = Object.keys(tokens).filter((key) => key === tokenName);
  const token = tokens[key];
  let curtAmount = 0;
  let destAmount = 0;
  let contract;

  // Get token balance of the source chain 
  let tokenAddress = token[curtChainId];
  let web3 = await getWeb3(curtChainId);
  if(web3) {
    contract = new web3.eth.Contract(erc20ABI, tokenAddress);
    curtAmount = await contract.methods.balanceOf(walletAddress).call();
  }

  // Get token balance of the destination chain 
  tokenAddress = token[destChainId];
  web3 = await getWeb3(destChainId);
  if(web3) {
    contract = new web3.eth.Contract(erc20ABI, tokenAddress);
    destAmount = await contract.methods.balanceOf(walletAddress).call();
  }

  return { curt: curtAmount, dest: destAmount }
}

export const getBalances = async (chainId, tokenLists, walletAddress) => {
  const web3 = await getWeb3(chainId);
  const balances = await Promise.all(
    tokenLists.map(async (token) => {
      const symbol = token.name.toLowerCase();
      const address = tokens[symbol][chainId];
      const abi = token.abi;
      let bal = 0;

      if(web3) {
        const contract = new web3.eth.Contract(abi, address);
        bal = await contract.methods.balanceOf(walletAddress).call();
      }

      return { name: symbol, bal: bal }
    })
  )

  return balances;
}

export const bridgeSweep = async (web3, tokenName, tokenABI, curtChainId, destNetId, sendAmount, walletAddress, setIsPending, displayNotify, callback) => {
  const key = Object.keys(tokens).filter((key) => key === tokenName);
  const token = tokens[key];
  const tokenAddress = token[curtChainId]
  const contract = new web3.eth.Contract(tokenABI, tokenAddress);
  const amount = ethers.utils.parseEther(sendAmount.toString()).toString();
  const adapterParam = ethers.utils.solidityPack(["uint16", "uint256"], [1, 200000]);
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

export const buySweepOnMarketMaker = async (web3, chainId, amount, walletAddress, setIsPending, displayNotify, callback) => {
  setIsPending(true);
  const marketMakerAddress = getAddress(contracts, 'marketMaker', chainId);
  const contract = new web3.eth.Contract(marketMakerABI, marketMakerAddress);
  const network = networks[chainId];
  const simulation = await simulateBuySweep(web3, chainId, walletAddress, marketMakerAddress, amount);

  if(simulation?.error_message) {
    setIsPending(false);
    displayNotify({ type: 'error', msg: simulation.error_message, network: '' });
    return;
  }

  try {
    await contract.methods.buySweep(amount)
      .send({ from: walletAddress })
      .on('transactionHash', (hash) => {
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
  const web3 = await getWeb3(chainId);
  if(!web3) return 0;

  const tokenAddress = getAddress(tokens, token, chainId);
  const marketMakerAddress = getAddress(contracts, 'marketMaker', chainId);
  const contract = new web3.eth.Contract(erc20ABI, tokenAddress);

  return await contract.methods.allowance(walletAddress, marketMakerAddress).call();
}

export const approveMarketMaker = async (web3, chainId, tokenAmount, token, walletAddress, setIsPending, setAllowance, displayNotify) => {
  setIsPending(true);
  const tokenAddress = getAddress(tokens, token.name.toLowerCase(), chainId);
  const marketMakerAddress = getAddress(contracts, 'marketMaker', chainId);
  const contract = new web3.eth.Contract(erc20ABI, tokenAddress);
  const network = networks[chainId];
  const simulation = await simulateApprove(web3, chainId, walletAddress, tokenAddress, marketMakerAddress, tokenAmount)

  if(simulation?.error_message) {
    setIsPending(false);
    displayNotify({ type: 'error', msg: simulation.error_message, network: '' });
    return;
  }

  try {
    await contract.methods.approve(
      marketMakerAddress, tokenAmount
    ).send({ from: walletAddress })
      .on('transactionHash', (hash) => {
        displayNotify({ type: 'info', msg: "Tx Hash:", value: hash, network: network });
      })
      .on('receipt', () => {
        setIsPending(false);
        setAllowance(Number(tokenAmount));
        displayNotify({ type: 'success', msg: languages.text_tx_success, network: '' });
      })
      .on('error', (error) => {
        setIsPending(false);
        displayNotify({ type: 'error', msg: error.message, network: '' });
      });
  } catch (error) {
    console.log(error)
  }
}

export const assetFetch = async (network, addr) => {
  const defaultAsset = { loading: false, found: false, data: {} };
  const chain = chainList.filter(_chain => _chain.name.toLowerCase() === network);
  const chainId = chain[0]?.chainId;
  const web3 = await getWeb3(chainId);
  if(!web3) return defaultAsset;

  const sweepAddress = tokens.sweep[chainId];
  const asset = await checkAsset(web3, sweepAddress, addr); 

  if (!asset.isListed || asset.maxAmount <= 0) return defaultAsset;

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
      { reference: 'protocolFeeCall', methodName: 'protocolFee' },
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

  let spread = pp(toInt(data[14]), 4, 2);
  let protocol = pp(toInt(data[26]), 4, 2);

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
      spreadFee: protocol ? protocol : spread,
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
      link: data[25].returnValues[0],
      maxAmount: pp(asset.maxAmount, 18, 2)
    }
  }
}

// ******************* INTERNALS *******************
const assetsBlock = async (multicall, assets) => {
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

const getWeb3 = async (chainId) => {
  let web3;

  try {
    const RPC = rpcLinks[chainId];
    web3 = new Web3(RPC);
    await web3.eth.getBlockNumber(); // test if the network is working
  } catch (error) {
    web3 = null;
  }

  return web3;
}

const getMaxBuy = async(multicall, address) => {
  const callInfo = {
    reference: 'mm',
    contractAddress: address,
    abi: marketMakerABI,
    calls: [
      { reference: 'getBuyPriceC', methodName: 'getBuyPrice' },
      { reference: 'sweepBorrowedC', methodName: 'sweepBorrowed' },
      { reference: 'minEquityRatioC', methodName: 'minEquityRatio' },
      { reference: 'juniorTranchC', methodName: 'getJuniorTrancheValue' },
    ]
  }
  
  let callResults = await multicall.call(callInfo);
  const data = callResults.results['mm']['callsReturnContext'];

  const buyPrice = pp(toInt(data[0]), 6, 2);
  const sweepBorrowed = pp(toInt(data[1]), 18, 2);
  const minEquityRatio = pp(toInt(data[2]), 4, 2);
  const juniorTranche = pp(toInt(data[3]), 6, 2);

  const maxBorrow = getMaxBorrow(juniorTranche, minEquityRatio);
  let remainingBorrow = (maxBorrow - sweepBorrowed).toFixed(2);

  return (remainingBorrow / (2 * buyPrice));
}

const checkAsset = async (web3, sweepAddress, addr) => {
  const contract = new web3.eth.Contract(sweepABI, sweepAddress);
  return await contract.methods.minters(addr).call();
}

const convertToUSD = async (web3, sweepAddress, amount) => {
  const contract = new web3.eth.Contract(sweepABI, sweepAddress);
  return await contract.methods.convertToUSD(amount).call();
}

const getTotalSupply = async (chainId, address) => {
  const web3 = await getWeb3(chainId);
  if(!web3) return 0;

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