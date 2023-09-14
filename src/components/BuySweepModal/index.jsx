import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import InputBox from "../InputBox";
import { tokenList } from "@config/constants";
import { languages } from "@config/languages";
import { useWallet } from "@utils/walletHelper";
import { getBalances, getMarketMakerAllowance, buySweepOnMarketMaker, approveMarketMaker } from "@utils/contract";
import { pp } from "@utils/helper";
import { XMarkIcon, ArrowDownIcon } from '@heroicons/react/20/solid'
import icon_wallet from "@images/wallet.svg";

const BuySweepModal = (props) => {
    const sweepToken = tokenList[0];
    const usdcToken = tokenList[2];
    const { web3, chainId, walletAddress } = useWallet();
    const [usdcAmount, setUsdcAmount] = useState(0);
    const [sweepAmount, setSweepAmount] = useState(0);
    const [allowance, setAllowance] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [balances, setBalances] = useState({
        usdc: 0,
        sweep: 0
    });
    const [isPending, setIsPending] = useState(false);
    const [alertState, setAlertState] = useState({
        open: false,
        message: "",
        severity: undefined,
    });

    const sweepMaxAmount = useMemo(() => {
        return Number((pp(balances.usdc, 6, 0) / props.marketPrice).toFixed(2));
    }, [balances.usdc, props.marketPrice])

    const isApproval = useMemo(() => {
        return usdcAmount === 0 ? true : allowance >= usdcAmount * 1e6;
    }, [allowance, usdcAmount])

    useEffect(() => {
        const intialHandler = async () => {
            if (walletAddress === "") return;
            setIsLoading(true);
            try {
                const result = await getBalances(chainId, [usdcToken, sweepToken], walletAddress);
                setBalances({
                    usdc: result[0].bal,
                    sweep: result[1].bal
                });

                const _allowance = await getMarketMakerAllowance(chainId, walletAddress);
                setAllowance(_allowance);
            } catch (error) {
                console.log(error)
            }
            setIsLoading(false)
        }

        intialHandler();
    }, [walletAddress, chainId, setBalances])

    useEffect(() => {
        const _sweepAmount = Number((usdcAmount / props.marketPrice).toFixed(2));
        setSweepAmount(_sweepAmount)
    }, [usdcAmount, props.marketPrice])

    useEffect(() => {
        const _usdcAmount = Number((sweepAmount * props.marketPrice).toFixed(2));
        setUsdcAmount(_usdcAmount)
    }, [sweepAmount, props.marketPrice])

    const buySweepHandler = useCallback(async () => {
        if (Number(usdcAmount) === 0 || isPending) return;

        const displayNotify = async (type, content) => {
            setAlertState({
                open: true,
                message: content,
                severity: type,
            });

            if (type === 'success') {
                const result = await getBalances(chainId, [usdcToken, sweepToken], walletAddress);
                setBalances({
                    usdc: result[0].bal,
                    sweep: result[1].bal
                });
                setUsdcAmount(0);
            }
        }

        if (web3)
            await buySweepOnMarketMaker(web3, chainId, sweepAmount, walletAddress, setIsPending, displayNotify)
    }, [web3, chainId, sweepAmount, walletAddress, isPending, setIsPending]);

    const approveHandler = useCallback(async () => {
        if (Number(usdcAmount) === 0 || isPending) return;
        
        if (web3)
            await approveMarketMaker(web3, chainId, usdcAmount, walletAddress, setIsPending, setAllowance);
    }, [web3, chainId, usdcAmount, walletAddress, isPending, setIsPending, setAllowance])

    const closeNotify = useCallback(async () => {
        setAlertState({
            open: false,
            message: "",
            severity: undefined,
        })
    }, [setAlertState])

    const setMaxAmount = useCallback(() => {
        const _bal = pp(balances.usdc, 6, 2);
        setUsdcAmount(_bal)
    }, [balances, setUsdcAmount])

    return (
        <>
            <Transition appear show={props.isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => props.closeModal(true)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-white bg-opacity-20" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md md:max-w-xl transform overflow-hidden rounded-2xl bg-black p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-2xl md:text-3xl text-center uppercase text-bold text-white"
                                    >
                                        {languages.text_buy_sweep}
                                        <XMarkIcon className="h-8 w-8 text-white absolute right-4 top-3 cursor-pointer" aria-hidden="true" onClick={() => props.closeModal(false)} />
                                    </Dialog.Title>
                                    {
                                        alertState.open && (
                                            <div className={`${alertState.severity === 'info' ? 'bg-blue-400' : alertState.severity === 'success' ? 'bg-green-400' : 'bg-red-400'} text-white pl-6 pr-8 py-2 rounded-md w-full mt-4 relative`}>
                                                {alertState.message}
                                                <XMarkIcon className="h-5 w-5 text-white absolute right-3 top-2 cursor-pointer" aria-hidden="true" onClick={() => closeNotify()} />
                                            </div>
                                        )
                                    }
                                    <div className="mt-6 mb-2 text-xl text-white flex items-center">
                                        {languages.label_buy_from}
                                    </div>
                                    <div className="rounded-lg bg-white px-4 pt-1 pb-16 relative">
                                        <InputBox
                                            className='bg-transparent text-2xl cursor-text'
                                            title=""
                                            value={usdcAmount}
                                            minValue={0}
                                            maxValue={pp(balances.usdc, 6, 2)}
                                            setValue={setUsdcAmount}
                                            pending={isPending}
                                        />
                                        <div className="flex justify-center items-center text-black text-right text-sm mt-1 absolute left-4 bottom-4">
                                            {languages.label_balance} {isLoading ? 'Loading ...' : pp(balances.usdc, 6, 2)}
                                            <div className="ml-2 cursor-pointer" onClick={setMaxAmount}>
                                                <img src={icon_wallet} alt="wallet icon" className="h-5 w-5" />
                                            </div>
                                        </div>
                                        <div className="absolute right-4 top-6 flex justify-center items-center gap-4">
                                            <div className="">
                                                <span className="flex items-center">
                                                    <img src={usdcToken?.logo} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                                                    <span className="ml-3 block truncate">{usdcToken?.name}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center pt-6 pb-0">
                                        <ArrowDownIcon className="h-10 w-10 text-white cursor-pointer" aria-hidden="true" />
                                    </div>
                                    <div className="mb-2 text-xl text-white">
                                        {languages.label_buy_to}
                                    </div>
                                    <div className="rounded-lg bg-white px-4 pt-1 pb-16 relative">
                                        <InputBox
                                            className='bg-transparent text-2xl cursor-text'
                                            title=""
                                            value={sweepAmount}
                                            minValue={0}
                                            maxValue={sweepMaxAmount}
                                            setValue={setSweepAmount}
                                            pending={isPending}
                                        />
                                        <div className="text-black text-right text-sm mt-1 absolute left-4 bottom-4">
                                            {languages.label_balance} {isLoading ? 'Loading ...' : pp(balances.sweep, 18, 2)}
                                        </div>
                                        <div className="absolute right-4 top-6 flex justify-center items-center gap-4">
                                            <div className="">
                                                <span className="flex items-center">
                                                    <img src={sweepToken?.logo} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                                                    <span className="ml-3 block truncate">{sweepToken?.name}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-end gap-4">
                                        <button
                                            type="button"
                                            className={`inline-flex justify-center rounded-md px-4 py-2 text-sm md:text-base font-medium text-white bg-app-blue-light focus:bg-app-blue-dark hover:bg-app-blue-dark uppercase ${isApproval && (isPending || Number(usdcAmount) === 0) ? 'opacity-70 cursor-not-allowed' : ''}`}
                                            onClick={() => isApproval ? buySweepHandler() : approveHandler()}
                                        >
                                            {isPending ? languages.btn_pending : isApproval ? languages.btn_buy : languages.btn_approve}
                                        </button>
                                        <button
                                            type="button"
                                            className={`inline-flex justify-center rounded-md px-4 py-2 text-sm md:text-base font-medium bg-white text-app-blue-light hover:bg-gray-300 uppercase`}
                                            onClick={() => props.closeModal(false)}
                                        >
                                            {languages.btn_close}
                                        </button>
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