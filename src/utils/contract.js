import Web3 from 'web3'
import { ethers } from "ethers";
import { Multicall } from 'ethereum-multicall';
import { addresses } from "@utils/address";
import { assetStatus, rpcLinks, tokens, contracts } from "@config/constants";
import { languages } from "@config/languages";
import { toInt, pp, toDate, toTime, annualRate, otherChainRpcs } from './helper';
import erc20ABI from "@abis/erc20.json";
import sweepABI from "@abis/sweep.json";
import sweeprABI from "@abis/sweepr.json";
import stabilizerABI from "@abis/stabilizer.json";
import marketMakerABI from "@abis/marketMaker.json";

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
      { reference: 'targetPriceCall', methodName: 'targetPrice' },
      { reference: 'ammPriceCall', methodName: 'ammPrice' },
      { reference: 'arbSpreadCall', methodName: 'arbSpread' },
      { reference: 'mintingAllowedCall', methodName: 'isMintingAllowed' },
      { reference: 'getMintersCall', methodName: 'getMinters' },
    ]
  }

  let callResults = await multicall.call(callInfo);
  const data = callResults.results['sweep']['callsReturnContext']

  const otherRpcs = otherChainRpcs(chainId);
  const otherTotalSupplys = await Promise.all(otherRpcs.map(async (rpc) => {
    return await getTotalSupply(rpc, 'sweep');
  }));

  let totalSupply = toInt(data[0]);
  otherTotalSupplys.map((supply) => totalSupply += Number(supply));

  const market_price = toInt(data[2]) * (1 + toInt(data[4]) / 1e6);

  return {
    total_supply: pp(totalSupply, 18, 2),
    local_supply: pp(toInt(data[0]), 18, 2),
    interest_rate: annualRate(toInt(data[1])),
    targe_price: pp(toInt(data[2]), 6, 5),
    amm_price: pp(toInt(data[3]), 6, 5),
    market_price: pp(market_price, 6, 5),
    mint_status: data[5].returnValues[0] ? 0 : 1,
    assets: data[6].returnValues
  }
}

export const sweeprFetch = async (chainId) => {
  const RPC = rpcLinks[chainId];
  const web3 = new Web3(RPC);
  const multicall = new Multicall({ web3Instance: web3, tryAggregate: true });

  const callInfo = {
    reference: 'sweepr',
    contractAddress: addresses.sweepr,
    abi: sweeprABI,
    calls: [
      { reference: 'totalSupplyCall', methodName: 'totalSupply' }
    ]
  }

  let callResults = await multicall.call(callInfo);
  const data = callResults.results['sweepr']['callsReturnContext']
  const otherRpcs = otherChainRpcs(chainId);
  const otherTotalSupplys = await Promise.all(otherRpcs.map(async (rpc) => {
    return await getTotalSupply(rpc, 'sweepr');
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

export const bridgeSweep = async (web3, tokenName, tokenABI, curtChainId, destNetId, sendAmount, walletAddress, setIsPending, displayNotify) => {
  const key = Object.keys(tokens).filter((key) => key === tokenName);
  const token = tokens[key];
  const tokenAddress = token[curtChainId]
  const contract = new web3.eth.Contract(tokenABI, tokenAddress);
  const amount = (sendAmount * 1e18).toString();
  const adapterParam = ethers.solidityPacked(["uint16", "uint256"], [1, 225000]);
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
      '0x'
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
    console.log(error)
  }
}

export const buySweepOnMarketMaker = async (web3, chainId, sweepAmount, walletAddress, setIsPending, displayNotify) => {
  const marketMakerAddress = getAddress(contracts, 'marketMaker', chainId);
  const contract = new web3.eth.Contract(marketMakerABI, marketMakerAddress);
  const amount = (sweepAmount * 1e18).toString();

  try {
    await contract.methods.buySweep(
      amount
    ).send({ from: walletAddress })
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
    console.log(error)
  }
}

export const getMarketMakerAllowance = async (chainId, walletAddress) => {
  const rpc = rpcLinks[chainId];
  const web3 = new Web3(rpc);
  const tokenAddress = getAddress(tokens, 'usdc', chainId);
  const marketMakerAddress = getAddress(contracts, 'marketMaker', chainId);
  const contract = new web3.eth.Contract(erc20ABI, tokenAddress);

  return await contract.methods.allowance(walletAddress, marketMakerAddress).call();
}

export const approveMarketMaker = async (web3, chainId, usdcAmount, walletAddress, setIsPending, setAllowance) => {
  const tokenAddress = getAddress(tokens, 'usdc', chainId);
  const marketMakerAddress = getAddress(contracts, 'marketMaker', chainId);
  const amount = (usdcAmount * 1e6).toString();
  const contract = new web3.eth.Contract(erc20ABI, tokenAddress);

  try {
    await contract.methods.approve(
      marketMakerAddress, amount
    ).send({ from: walletAddress })
      .on('transactionHash', () => {
        setIsPending(true);
      })
      .on('receipt', () => {
        setIsPending(false);
        setAllowance(Number(amount));
      })
      .on('error', () => {
        setIsPending(false);
      });
  } catch (error) {
    console.log(error)
  }
}

const getTotalSupply = async (rpc, type) => {
  const address = type === 'sweep' ? addresses.sweep : addresses.sweepr;
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