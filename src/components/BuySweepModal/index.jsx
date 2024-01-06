import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBuyPopup, updateSweepData } from "@redux/app.reducers";
import { useWallet } from "@utils/walletHelper";
import { Dialog, Transition } from '@headlessui/react'
import InputBox from "../InputBox";
import Alert from "@components/Alert"
import { tokenList } from "@config/constants";
import { languages } from "@config/languages";
import {
  getBalances,
  getMarketMakerAllowance,
  buySweepOnMarketMaker,
  approveMarketMaker
} from "@utils/contract";
import { pp, convertNumber } from "@utils/helper";
import { XMarkIcon, ArrowDownIcon } from '@heroicons/react/20/solid'
import WalletIcon from "@images/wallet.svg";

const BuySweepModal = () => {
  const dispatch = useDispatch();
  const buyProps = useSelector((state) => state.buyPopup);
  const { marketPrice } = buyProps;
  const { web3, chainId, walletAddress, setChain } = useWallet();
  const sweepToken = tokenList[0];
  const token = Number(chainId) === 56 ? tokenList[3] : tokenList[2];

  const [amount, setAmount] = useState(0);
  const [sweepAmount, setSweepAmount] = useState(0);
  const [allowance, setAllowance] = useState(0);
  const [balances, setBalances] = useState({ usdc: 0, sweep: 0 });
  const [isPendingApprove, setIsPendingApprove] = useState(false);
  const [isPendingBuy, setIsPendingBuy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const [alertState, setAlertState] = useState({ open: false, message: "", severity: undefined });

  const sweepMaxAmount = useMemo(() => {
    return Number((pp(balances.usdc, 6, 0) / marketPrice).toFixed(2));
  }, [balances.usdc, marketPrice])

  const isApproval = useMemo(() => {
    return (allowance >= amount * (10 ** token.decimal));
  }, [allowance, token.decimal, amount])

  const closeModal = useCallback(() => {
    dispatch(setBuyPopup({ isOpen: false, marketPrice: 0, chainId: 0 }));
  }, [dispatch]);

  const updateData = useCallback(() => {
    dispatch(updateSweepData());
  }, [dispatch]);

  useEffect(() => {
    const intialHandler = async () => {
      if (walletAddress === "") return;
      setIsLoading(true);
      try {
        const result = await getBalances(chainId, [token, sweepToken], walletAddress);
        setBalances({ usdc: result[0].bal, sweep: result[1].bal });

        const _allowance = await getMarketMakerAllowance(chainId, token?.name.toLowerCase(), walletAddress);
        setAllowance(_allowance);
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false);
    }

    intialHandler();
  }, [walletAddress, chainId, token, sweepToken, isPendingBuy])

  useEffect(() => {
    const _sweepAmount = Number((amount / marketPrice).toFixed(2));
    setSweepAmount(isNaN(_sweepAmount) ? 0 : _sweepAmount);
  }, [amount, marketPrice])

  useEffect(() => {
    const _amount = Number((sweepAmount * marketPrice).toFixed(2));
    setAmount(isNaN(_amount) ? 0 : _amount)
  }, [sweepAmount, marketPrice])

  useEffect(() => {
    const networkHandler = async () => {
      if (
        buyProps?.chainId > 0 &&
        Number(buyProps.chainId) !== Number(chainId)
      ) {
        setIsConnecting(true);
        await setChain({ chainId: buyProps.chainId });
      }

      setIsConnecting(false);
    }
    networkHandler();
  }, [buyProps.chainId, chainId, setChain])

  const buySweepHandler = useCallback(async () => {
    if (Number(amount) === 0 || isPendingBuy) return;

    const displayNotify = async (type, content) => {
      setAlertState({ open: true, message: content, severity: type });

      if (type === 'success') {
        const result = await getBalances(chainId, [token, sweepToken], walletAddress);
        setBalances({ usdc: result[0].bal, sweep: result[1].bal });
        setAmount(0);
      }
    }

    if (web3)
      await buySweepOnMarketMaker(web3, chainId, amount, token?.decimal, walletAddress, setIsPendingBuy, displayNotify, updateData)
  }, [web3, chainId, walletAddress, isPendingBuy, token, sweepToken, amount, updateData]);

  const approveHandler = useCallback(async () => {
    if (Number(amount) === 0 || isPendingApprove) return;

    if (web3)
      await approveMarketMaker(web3, chainId, amount, token, walletAddress, setIsPendingApprove, setAllowance);
  }, [web3, chainId, amount, token, walletAddress, isPendingApprove])

  const setMaxAmount = useCallback(() => {
    const _bal = pp(balances.usdc, 6, 2);
    setAmount(_bal)
  }, [balances, setAmount])

  useEffect(() => {
    const interval = setInterval(() => {
      if (alertState.open) {
        setAlertState({
          open: false,
          message: "",
          severity: undefined,
        })
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [alertState, setAlertState])

  const enabledClass = "text-black bg-white";
  const disabledClass = "cursor-not-allowed text-white bg-app-gray";
  const approveDisabled = (isApproval && amount >= 0) || (isPendingApprove || isPendingBuy);
  const buyDisabled = !(isApproval && amount > 0) || (isPendingApprove || isPendingBuy);

  return (
    <>
      <Transition appear show={(buyProps.isOpen && !isConnecting)} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={() => closeModal()}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center font-archivo-regular">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md md:max-w-md transform overflow-hidden rounded-3xl bg-app-black-dark text-white px-10 py-8 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-2xl md:text-3xl text-left text-bold text-white"
                  >
                    {languages.text_buy_sweep}
                    <XMarkIcon className="h-7 w-7 text-white opacity-60 absolute right-5 top-4 cursor-pointer" aria-hidden="true" onClick={() => closeModal()} />
                  </Dialog.Title>
                  <Alert data={alertState} />
                  <div className="mt-6 mb-2 text-md flex items-center">
                    {languages.label_buy_from}
                  </div>
                  <div className="rounded-xl border border-app-gray-light px-4 pt-1 pb-2 relative">
                    <InputBox
                      className='bg-transparent text-2xl cursor-text'
                      title=""
                      value={amount}
                      minValue={0}
                      maxValue={pp(balances.usdc, token?.decimal, 2)}
                      setValue={setAmount}
                      pending={isPendingApprove || isPendingBuy}
                    />
                    <div className="flex justify-center items-center text-gray-300 text-right text-sm mt-1 absolute left-4">
                      {languages.label_balance} {isLoading ? 'Loading ...' : convertNumber(pp(balances.usdc, token?.decimal, 2))}
                      <div className="ml-2 cursor-pointer flex justify-center items-center bg-app-gray-light px-2 py-0.5 rounded-2xl -mt-0.5" onClick={setMaxAmount}>
                        <img src={WalletIcon} alt="wallet icon" className="h-4 w-4" />
                      </div>
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
                      <ArrowDownIcon className="h-8 w-8 text-white cursor-pointer" aria-hidden="true" />
                    </div>
                  </div>
                  <div className="mt-4 mb-2 text-md flex items-center">
                    {languages.label_buy_to}
                  </div>
                  <div className="rounded-xl border border-app-gray-light px-4 pt-1 pb-10 relative">
                    <InputBox
                      className='bg-transparent text-2xl cursor-text'
                      title=""
                      value={sweepAmount}
                      minValue={0}
                      maxValue={sweepMaxAmount}
                      setValue={setSweepAmount}
                      pending={isPendingApprove || isPendingBuy}
                    />
                    <div className="flex justify-center items-center text-gray-300 text-right text-sm mt-1 absolute left-4 bottom-4">
                      {languages.label_balance} {isLoading ? 'Loading ...' : convertNumber(pp(balances.sweep, 18, 2))}
                    </div>
                    <div className="absolute right-4 top-6 flex justify-center items-center gap-4">
                      <div className="">
                        <span className="flex items-center">
                          <img src={sweepToken?.logo} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                          <span className="ml-2 block truncate">{sweepToken?.name}</span>
                        </span>
                      </div>
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
                        <div
                          className="inline-block w-full rounded-full bg-rainbow p-0.5 group-hover:bg-black group-hover:bg-none"
                        >
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default BuySweepModal;