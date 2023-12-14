import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import SelectBox from "../SelectBox";
import InputBox from "../InputBox";
import Alert from "@components/Alert"
import { tokenList, chainList } from "@config/constants";
import { languages } from "@config/languages";
import { getSweepBalance, bridgeSweep } from "@utils/contract";
import { pp } from "@utils/helper";
import { XMarkIcon, ArrowDownIcon } from '@heroicons/react/20/solid'
import icon_wallet from "@images/wallet.svg";

const BridgeModal = (props) => {
    const { web3, chainId, walletAddress } = props.walletProps;
    const [sendAmount, setSendAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [destChain, setDestChain] = useState(chainList[1]);
    const [balances, setBalances] = useState({ curt: 0, dest: 0 });
    const [isPending, setIsPending] = useState(false);
    const [alertState, setAlertState] = useState({
        open: false,
        message: "",
        severity: undefined,
    })

    const token = useMemo(() => {
        return tokenList.filter((item) => item.name.toLowerCase() === props.selectedToken)[0] || tokenList[0];
    }, [props])

    const curtChain = useMemo(() => {
        return chainList.filter((item) => item.chainId === chainId)
    }, [chainId]);

    const destChainList = useMemo(() => {
        return chainList.filter((item) => item.chainId !== chainId)
    }, [chainId]);

    useEffect(() => {
        const intialHandler = async () => {
            if (walletAddress === "" || props.selectedToken === "") return;
            setIsLoading(true)
            const bal = await getSweepBalance(props.selectedToken, chainId, destChain.chainId, walletAddress);
            setBalances(bal)

            const _bal = pp(bal.curt, 18, 2);
            if (sendAmount > _bal) setSendAmount(_bal);
            setIsLoading(false)
        }

        intialHandler();
    }, [walletAddress, props, chainId, destChain, setBalances, setSendAmount, sendAmount])

    useEffect(() => {
        if (destChainList.indexOf(destChain) < 0)
            setDestChain(destChainList[0])
    }, [destChain, destChainList])

    const sweepBridgeHandler = useCallback(async () => {
        if (Number(sendAmount) === 0 || isPending) return;

        const displayNotify = async (type, content) => {
            setAlertState({
                open: true,
                message: content,
                severity: type,
            });

            if (type === 'success') {
                const bal = await getSweepBalance(props.selectedToken, chainId, destChain.chainId, walletAddress);
                setBalances(bal);
                setSendAmount(0);
            }
        }

        if (web3)
            await bridgeSweep(web3, props.selectedToken, token.abi, chainId, destChain.netId, Number(sendAmount), walletAddress, setIsPending, displayNotify)
    }, [web3, props, chainId, destChain, token, sendAmount, walletAddress, isPending, setIsPending]);

    const setMaxAmount = useCallback(() => {
        const _bal = pp(balances.curt, 18, 2);
        setSendAmount(_bal)
    }, [balances, setSendAmount])

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
                                        className="text-2xl md:text-3xl text-left text-bold text-white capitalize"
                                    >
                                        {props.selectedToken + ' ' + languages.text_bridge}
                                        <XMarkIcon className="h-7 w-7 text-white opacity-60 absolute right-5 top-4 cursor-pointer" aria-hidden="true" onClick={() => props.closeModal(false)} />
                                    </Dialog.Title>
                                    <Alert data={alertState} />
                                    <div className="mt-6 mb-2 text-md flex items-center">
                                        {languages.label_transfer_from}
                                        <img src={curtChain[0]?.logo} alt="" className="h-5 w-5 flex-shrink-0 rounded-full ml-2" />
                                    </div>
                                    <div className="rounded-xl border border-app-gray-light px-4 pt-1 pb-10 relative">
                                        <InputBox
                                            className='bg-transparent text-2xl'
                                            title=""
                                            value={sendAmount}
                                            minValue={0}
                                            maxValue={pp(balances.curt, 18, 2)}
                                            setValue={setSendAmount}
                                            pending={isPending}
                                        />
                                        <div className="flex justify-center items-center text-gray-300 text-right text-sm mt-1 absolute left-4 bottom-4">
                                            {languages.label_balance} {isLoading ? 'Loading ...' : pp(balances.curt, 18, 2)}
                                            <div className="ml-2 cursor-pointer flex justify-center items-center bg-app-gray-light px-2 py-0.5 rounded-2xl -mt-0.5" onClick={setMaxAmount}>
                                                <img src={icon_wallet} alt="wallet icon" className="h-4 w-4" />
                                            </div>
                                        </div>
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
                                        {languages.label_transfer_to}
                                    </div>
                                    <div className="rounded-xl border border-app-gray-light px-4 pt-1 pb-10 relative">
                                        <div className="text-2xl pt-2 pl-0 cursor-default">
                                            {sendAmount}
                                        </div>
                                        <div className="flex justify-center items-center text-gray-300 text-right text-sm mt-1 absolute left-4 bottom-4">
                                            {languages.label_balance} {isLoading ? 'Loading ...' : pp(balances.dest, 18, 2)}
                                        </div>
                                        <div className="absolute right-4 top-4 flex justify-center items-center gap-4">
                                            <div>
                                                <SelectBox
                                                    title=""
                                                    data={destChainList}
                                                    val={destChain}
                                                    setVal={setDestChain}
                                                    onlyIcon={true}
                                                    pending={isPending}
                                                    bg={true}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-center gap-4">
                                        <div className="group inline-block rounded-full bg-white/20 p-1 hover:bg-white w-1/2">
                                            <div
                                                className="inline-block w-full rounded-full bg-app-gray-light p-0.5 group-hover:bg-white"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => props.closeModal(false)}
                                                    className={`flex w-full items-center justify-center gap-1 space-x-1 rounded-full px-6 py-2 bg-app-gray-light whitespace-nowrap group-hover:bg-white group-hover:text-black`}
                                                >
                                                    <span>
                                                        {languages.btn_close}
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                        <div className={`inline-block rounded-full bg-white/20 p-1 w-1/2 ${isPending || Number(sendAmount) === 0 ? "" : "group hover:bg-rainbow"}`}>
                                            <div
                                                className="inline-block w-full rounded-full bg-rainbow p-0.5 group-hover:bg-black group-hover:bg-none"
                                            >
                                                <button
                                                    type="button"
                                                    onClick={() => sweepBridgeHandler()}
                                                    className={`flex w-full items-center justify-center gap-1 space-x-1 rounded-full px-6 py-2 text-black whitespace-nowrap ${isPending || Number(sendAmount) === 0 ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
                                                >
                                                    <span>
                                                        {isPending ? languages.btn_pending : languages.btn_send}
                                                    </span>
                                                </button>
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

export default BridgeModal;