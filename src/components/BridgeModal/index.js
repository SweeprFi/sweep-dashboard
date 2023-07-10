import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Dialog, Transition } from '@headlessui/react'
import SelectBox from "../SelectBox";
import InputBox from "../InputBox";
import { chainList } from "@config/constants";
import { languages } from "@config/languages";
import { useWallet } from "@utils/walletHelper";
import { getSweepBalance, bridgeSweep } from "@utils/contract";
import { pp } from "@utils/helper";
import { XMarkIcon } from '@heroicons/react/20/solid'

const BridgeModal = (props) => {
    const { chainId, walletAddress } = useWallet();
    const [sendAmount, setSendAmount] = useState(0);
    const [curtChain, setCurtChain] = useState(chainList[0]);
    const [destChain, setDestChain] = useState(chainList[1]);
    const [balance, setBalance] = useState(0);
    const [isPending, setIsPending] = useState(false);
    const [alertState, setAlertState] = useState({
        open: false,
        message: "",
        severity: undefined,
    })

    const destChainList = useMemo(() => {
        return chainList.filter((item) => item.chainId !== curtChain.chainId)
    }, [curtChain]);

    const validConnect = useMemo(() => {
        return curtChain.chainId === chainId;
    }, [curtChain, chainId]);

    useEffect(() => {
        const intialHandler = async () => {
            const bal = await getSweepBalance(curtChain.chainId, walletAddress);
            setBalance(bal)

            const _bal = pp(bal, 18, 2);
            if (sendAmount > _bal) setSendAmount(_bal);
        }

        intialHandler();
    }, [curtChain, sendAmount, walletAddress, setBalance])

    useEffect(() => {
        if (destChainList.indexOf(destChain) < 0)
            setDestChain(destChainList[0])
    }, [destChain, destChainList])

    const displayNotify = async (type, content) => {
        setAlertState({
            open: true,
            message: content,
            severity: type,
        });

        if(type === 'success') {
            const bal = await getSweepBalance(curtChain.chainId, walletAddress);
            setBalance(bal);
            setSendAmount(0);
        }
    }

    const sweepBridgeHandler = useCallback(async () => {
        if (!validConnect || Number(sendAmount) === 0 || isPending) return;

        await bridgeSweep(curtChain.chainId, destChain.netId, Number(sendAmount), walletAddress, setIsPending, displayNotify)
    }, [curtChain, destChain, sendAmount, validConnect, walletAddress, setIsPending, displayNotify]);

    const closeNotify = useCallback(async () => {
        setAlertState({
            open: false,
            message: "",
            severity: undefined,
        })
    }, [setAlertState])

    return (
        <>
            <Transition appear show={props.isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => props.closeModal(false)}>
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
                                        className="text-2xl text-center uppercase text-bold text-white"
                                    >
                                        {languages.text_sweep_bridge}
                                    </Dialog.Title>
                                    {
                                        !validConnect && (
                                            <div className="text-red-400 mt-4">
                                                * {languages.text_change_network + curtChain.name}
                                            </div>
                                        )
                                    }
                                    {
                                        alertState.open && (
                                            <div className={`${alertState.severity === 'info' ? 'bg-blue-400' : alertState.severity === 'success' ? 'bg-green-400' : 'bg-red-400'} text-white pl-6 pr-8 py-2 rounded-md w-full mt-4 relative`}>
                                                {alertState.message}
                                                <XMarkIcon className="h-5 w-5 text-white absolute right-3 top-2 cursor-pointer" aria-hidden="true" onClick={() => closeNotify()} />
                                            </div>
                                        )
                                    }
                                    <div className="flex justify-between items-center gap-6 md:gap-8 mt-6">
                                        <div className="w-full">
                                            <SelectBox
                                                title="Current Chain"
                                                data={chainList}
                                                val={curtChain}
                                                setVal={setCurtChain}
                                                pending={isPending}
                                            />
                                        </div>
                                        <div className="w-full">
                                            <SelectBox
                                                title="Destination Chain"
                                                data={destChainList}
                                                val={destChain}
                                                setVal={setDestChain}
                                                pending={isPending}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 mt-4">
                                        <div className="w-1/2 pr-4">
                                            <InputBox
                                                title="Send Amount"
                                                value={sendAmount}
                                                minValue={0}
                                                maxValue={pp(balance, 18, 2)}
                                                setValue={setSendAmount}
                                                pending={isPending}
                                            />
                                            <div className="text-white text-right text-sm mt-1">
                                                {languages.label_balance} {pp(balance, 18, 2)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-end">
                                        <button
                                            type="button"
                                            className={`inline-flex justify-center rounded-md px-4 py-2 text-sm md:text-base font-medium text-white bg-app-blue-light focus:bg-app-blue-dark hover:bg-app-blue-dark uppercase ${!validConnect || isPending || Number(sendAmount) === 0 ? 'opacity-70 cursor-not-allowed' : ''}`}
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