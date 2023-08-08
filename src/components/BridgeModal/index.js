import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import SelectBox from "../SelectBox";
import InputBox from "../InputBox";
import { tokenList, chainList } from "@config/constants";
import { languages } from "@config/languages";
import { useWallet } from "@utils/walletHelper";
import { getSweepBalance, bridgeSweep } from "@utils/contract";
import { pp } from "@utils/helper";
import { XMarkIcon, ArrowDownIcon } from '@heroicons/react/20/solid'
import icon_wallet from "@images/wallet.svg";

const BridgeModal = (props) => {
    const { web3, chainId, walletAddress } = useWallet();
    const [sendAmount, setSendAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [destChain, setDestChain] = useState(chainList[1]);
    const [balances, setBalances] = useState({
        curt: 0,
        dest: 0
    });
    const [isPending, setIsPending] = useState(false);
    const [alertState, setAlertState] = useState({
        open: false,
        message: "",
        severity: undefined,
    })
    
    const token = useMemo(() => {
        return tokenList.filter((item) => item.name.toLowerCase() === props.selectedToken)[0] || tokenList[0];
    }, [tokenList, props])

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
    }, [walletAddress, props, chainId, destChain, setBalances, setSendAmount])

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

    const closeNotify = useCallback(async () => {
        setAlertState({
            open: false,
            message: "",
            severity: undefined,
        })
    }, [setAlertState])

    const setMaxAmount = useCallback(() => {
        const _bal = pp(balances.curt, 18, 2);
        setSendAmount(_bal)
    }, [balances, setSendAmount])

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
                                        {props.selectedToken + ' ' + languages.text_bridge}
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
                                    <div className="mt-6 mb-2 text-xl text-white">
                                        {languages.label_transfer_from}
                                    </div>
                                    <div className="rounded-lg bg-white px-4 pt-1 pb-16 relative">
                                        <InputBox
                                            className='bg-transparent text-2xl'
                                            title=""
                                            value={sendAmount}
                                            minValue={0}
                                            maxValue={pp(balances.curt, 18, 2)}
                                            setValue={setSendAmount}
                                            pending={isPending}
                                        />
                                        <div className="flex justify-center items-center text-black text-right text-sm mt-1 absolute left-4 bottom-4">
                                            {languages.label_balance} {isLoading ? 'Loading ...' : pp(balances.curt, 18, 2)}
                                            <div className="ml-2 cursor-pointer" onClick={setMaxAmount}>
                                                <img src={icon_wallet} alt="wallet icon" className="h-5 w-5" />
                                            </div>
                                        </div>
                                        <div className="absolute right-4 top-6 flex justify-center items-center gap-4">
                                            <div className="">
                                                <span className="flex items-center">
                                                    <img src={token?.logo} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                                                    <span className="ml-3 block truncate">{token?.name}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center pt-6 pb-0">
                                        <ArrowDownIcon className="h-10 w-10 text-white cursor-pointer" aria-hidden="true" />
                                    </div>
                                    <div className="mb-2 text-xl text-white">
                                        {languages.label_transfer_to}
                                    </div>
                                    <div className="rounded-lg bg-white px-4 pt-1 pb-16 relative">
                                        <div className="text-2xl pt-4 pl-3">
                                            {sendAmount}
                                        </div>
                                        <div className="text-black text-right text-sm mt-1 absolute left-4 bottom-4">
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
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-end">
                                        <button
                                            type="button"
                                            className={`inline-flex justify-center rounded-md px-4 py-2 text-sm md:text-base font-medium text-white bg-app-blue-light focus:bg-app-blue-dark hover:bg-app-blue-dark uppercase ${isPending || Number(sendAmount) === 0 ? 'opacity-70 cursor-not-allowed' : ''}`}
                                            onClick={() => sweepBridgeHandler()}
                                        >
                                            {isPending ? languages.btn_pending : languages.btn_send}
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

export default BridgeModal;