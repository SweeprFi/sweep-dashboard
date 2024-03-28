import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSweepData, sendNotification } from "@redux/app.reducers";
import { useWallet } from "@utils/walletHelper";
import InputBox from "@components/InputBox";
import { tokenList } from "@config/constants";
import { languages } from "@config/languages";
import {
  getBalances,
  getMarketMakerAllowance,
  buySweepOnMarketMaker,
  approveMarketMaker
} from "@utils/contract";
import { pp, convertNumber, format } from "@utils/helper";
import { ArrowDownIcon } from '@heroicons/react/20/solid';

const Buy = () => {
  const dispatch = useDispatch();
  const { web3, chainId, walletAddress } = useWallet();
  const sweepInfo = useSelector((state) => state.sweep)
  const sweepToken = tokenList[0];

  const [amount, setAmount] = useState(0);
  const [sweepAmount, setSweepAmount] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [balances, setBalances] = useState({ usdc: 0, sweep: 0 });
  const [isPendingApprove, setIsPendingApprove] = useState(false);
  const [isPendingBuy, setIsPendingBuy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [max, setMax] = useState(0);
  const [maxToBuy, setMaxToBuy] = useState(0);
  const [token, setToken] = useState();

  const isApproval = useMemo(() => {
    return (allowance >= amount * (10 ** (token?.decimal || 6)));
  }, [allowance, token?.decimal, amount])

  const updateData = useCallback(() => {
    dispatch(updateSweepData());
  }, [dispatch]);

  useEffect(() => {
    const _token = Number(chainId) === 56 ? tokenList[3] : tokenList[2];
    setToken(_token);
  }, [chainId]);

  useEffect(() => {
    const intialHandler = async () => {
      if (walletAddress === "") return;
      setIsLoading(true);
      try {
        const result = await getBalances(chainId, [token, sweepToken], walletAddress);
        setBalances({ usdc: result[0].bal, sweep: result[1].bal });
        var _bal = pp(result[0].bal, token?.decimal || 6, 2);
        if (_bal > maxToBuy) _bal = maxToBuy;
        setMax(_bal);

        const _allowance = await getMarketMakerAllowance(chainId, token?.name.toLowerCase(), walletAddress);
        setAllowance(_allowance);

        let _max = sweepInfo[chainId]?.maxToBuy;
        setMaxToBuy(_max || 0);
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false);
    }

    intialHandler();
  }, [walletAddress, chainId, token, sweepToken, isPendingBuy, setMax, maxToBuy, sweepInfo])

  useEffect(() => {
    const marketPrice = sweepInfo[chainId]?.market_price;
    const _sweepAmount = Number((amount / marketPrice).toFixed(2));
    setSweepAmount(isNaN(_sweepAmount) ? 0 : _sweepAmount);
  }, [amount, chainId, sweepInfo])

  useEffect(() => {
    const marketPrice = sweepInfo[chainId]?.market_price;
    const _amount = Number((sweepAmount * marketPrice).toFixed(2));
    setAmount(isNaN(_amount) ? 0 : _amount)
  }, [sweepAmount, chainId, sweepInfo])

  const buySweepHandler = useCallback(async () => {
    if (Number(amount) === 0 || isPendingBuy) return;

    const displayNotify = async (data) => {
      dispatch(sendNotification(data));

      if (data.type === 'success') {
        const result = await getBalances(chainId, [token, sweepToken], walletAddress);
        setBalances({ usdc: result[0].bal, sweep: result[1].bal });
        setAmount(0);
      }
    }

    if (web3) {
      var _amount = format(amount, token?.decimal || 6);
      if (Number(_amount) > Number(balances.usdc)) _amount = balances.usdc;
      await buySweepOnMarketMaker(web3, chainId, _amount, walletAddress, setIsPendingBuy, displayNotify, updateData);
    }
  }, [web3, chainId, walletAddress, isPendingBuy, token, balances.usdc, sweepToken, amount, updateData, dispatch]);

  const approveHandler = useCallback(async () => {
    if (Number(amount) === 0 || isPendingApprove) return;

    const displayNotify = async (data) => {
      dispatch(sendNotification(data));
    }

    if (web3) {
      var _amount = format(amount, token?.decimal || 6);
      if (Number(_amount) > Number(balances.usdc)) _amount = balances.usdc;
      await approveMarketMaker(web3, chainId, _amount, token, walletAddress, setIsPendingApprove, setAllowance, displayNotify);
    }
  }, [web3, chainId, amount, token, walletAddress, isPendingApprove, dispatch, balances.usdc])

  const setMaxAmount = useCallback(() => {
    setAmount(max)
  }, [setAmount, max])

  const enabledClass = "text-black bg-white";
  const disabledClass = "cursor-not-allowed text-white bg-black";
  const approveDisabled = (isApproval && amount >= 0) || (isPendingApprove || isPendingBuy);
  const buyDisabled = !(isApproval && amount > 0) || (isPendingApprove || isPendingBuy);

  return (
    <div className="mb-2">
      <div className="flex min-h-full items-center justify-center mt-10">
        <div className="w-full max-w-md rounded-3xl bg-app-black text-white p-8 text-left align-middle border-2 border-white">
          <div className="mt-6 mb-2 text-md flex items-center">
            {languages.label_buy_from}
          </div>
          <div className="rounded-xl border border-app-gray-light px-4 pt-1 pb-2 relative bg-app-gray-semilight">
            <InputBox
              className='bg-transparent text-2xl cursor-text'
              title=""
              value={amount}
              minValue={0}
              maxValue={max}
              setValue={setAmount}
              pending={isPendingApprove || isPendingBuy}
            />
            <div>
              {
                isLoading ?
                  <div className="justify-center items-center text-gray-300 text-right text-sm mt-1 absolute left-4">
                    Loading ...
                  </div> :
                  <div className="flex justify-center items-center text-gray-300 text-right text-sm mt-1 absolute left-4">
                    {languages.label_balance} {convertNumber(pp(balances.usdc, token?.decimal, 2))}
                    <div className="ml-2 cursor-pointer flex justify-center items-center border border-app-gray-light px-2 text-xs rounded-2xl" onClick={setMaxAmount}>
                      MAX
                    </div>
                  </div>
              }
            </div>
            <br />
            <div className="absolute right-4 top-6 flex justify-center items-center gap-4">
              <div className="">
                <span className="flex items-center">
                  <img src={token?.logo} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                  <span className="ml-2 block truncate">{token?.name}</span>
                </span>
              </div>
            </div>
            <div className="flex justify-center items-center absolute left-1/2 -translate-x-1/2 -bottom-10 opacity-60">
              <ArrowDownIcon className="h-8 w-8 text-white" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-4 mb-2 text-md flex items-center">
            {languages.label_buy_to}
          </div>
          <div className="rounded-xl border border-app-gray-light px-4 pt-1 pb-10 relative bg-app-gray-semilight">
            <div className="text-2xl pt-2 pl-0 cursor-default">
              {sweepAmount}
            </div>
            <div className="flex justify-center items-center text-gray-300 text-right text-sm mt-1 absolute left-4 bottom-4">
              {
                isLoading ? <div>Loading ...</div> :
                  <>
                    {languages.label_balance} {convertNumber(pp(balances.sweep, 18, 2))}
                  </>
              }
            </div>
            <div className="absolute right-4 top-6 flex justify-center items-center gap-4">
                <span className="flex items-center">
                  <img src={sweepToken?.logo} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                  <span className="ml-2 block truncate">{sweepToken?.name}</span>
                </span>
            </div>
          </div>

          <div className="mt-6 justify-center gap-4">
            <div className="flex">
              <div className={`inline-block m-1 rounded-full bg-white/20 p-1 w-1/2 ${approveDisabled ? "" : "group hover:bg-rainbow"}`}>
                <div className="inline-block w-full rounded-full p-0.5 bg-rainbow group-hover:bg-black group-hover:bg-none">
                  <button
                    disabled={approveDisabled}
                    onClick={() => approveHandler()}
                    className={`flex w-full items-center justify-center gap-1 space-x-1 rounded-full px-6 py-2 ${approveDisabled ? disabledClass : enabledClass}`}
                  >
                    <span>
                      {isPendingApprove ? languages.btn_pending : languages.btn_approve}
                    </span>
                  </button>
                </div>
              </div>

              <div className={`inline-block m-1 rounded-full bg-white/20 p-1 w-1/2 ${buyDisabled ? "" : "group hover:bg-rainbow"}`}>
                <div className="inline-block w-full rounded-full bg-rainbow p-0.5 group-hover:bg-black group-hover:bg-none">
                  <button
                    disabled={!isApproval}
                    onClick={() => buySweepHandler()}
                    className={`flex w-full items-center justify-center gap-1 space-x-1 rounded-full px-6 py-2 text-black whitespace-nowrap ${buyDisabled ? disabledClass : enabledClass}`}
                  >
                    <span>
                      {isPendingBuy ? languages.btn_pending : languages.btn_buy}
                    </span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Buy;