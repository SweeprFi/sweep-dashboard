import { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBridgePopup, updateSweepData, updateSweeprData, sendNotification } from "@redux/app.reducers";
import { useWallet } from "@utils/walletHelper";
import SelectBox from "../SelectBox";
import InputBox from "../InputBox";
import { tokenList, chainList } from "@config/constants";
import { languages } from "@config/languages";
import { getSweepBalance, bridgeSweep } from "@utils/contract";
import { pp } from "@utils/helper";
import { XMarkIcon, ArrowDownIcon } from '@heroicons/react/20/solid'
import icon_wallet from "@images/wallet.svg";
import Modal from "@components/Modal";

const BridgeModal = () => {
    const { web3, chainId, walletAddress, setChain } = useWallet();
    const dispatch = useDispatch();
    const bridgeProps = useSelector((state) => state.bridgePopup);
    const [sendAmount, setSendAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isConnecting, setIsConnecting] = useState(false);
    const [destChain, setDestChain] = useState(chainList[1]);
    const [balances, setBalances] = useState({ curt: 0, dest: 0 });
    const [isPending, setIsPending] = useState(false);

    const token = useMemo(() => {
        return tokenList.filter((item) => item.name.toLowerCase() === bridgeProps.selectedToken)[0] || tokenList[0];
    }, [bridgeProps])

    const curtChain = useMemo(() => {
        return chainList.filter((item) => item.chainId === chainId)
    }, [chainId]);

    const destChainList = useMemo(() => {
        return chainList.filter((item) => item.chainId !== chainId)
    }, [chainId]);

    const closeModal = useCallback(() => {
        dispatch(setBridgePopup({ isOpen: false, selectedToken: '', chainId: 0 }));
    }, [dispatch]);

    const updateData = useCallback(() => {
        if (bridgeProps.selectedToken === 'sweep') {
            dispatch(updateSweepData());
        } else {
            dispatch(updateSweeprData());
        }
    }, [dispatch, bridgeProps.selectedToken]);

    useEffect(() => {
        const intialHandler = async () => {
            if (walletAddress === "" || bridgeProps.selectedToken === "") return;
            setIsLoading(true)
            const bal = await getSweepBalance(bridgeProps.selectedToken, chainId, destChain.chainId, walletAddress);
            setBalances(bal)

            const _bal = pp(bal.curt, 18, 2);
            if (sendAmount > _bal) setSendAmount(_bal);
            setIsLoading(false)
        }

        intialHandler();
    }, [walletAddress, bridgeProps, chainId, destChain, setBalances, setSendAmount, sendAmount])

    useEffect(() => {
        if (destChainList.indexOf(destChain) < 0)
            setDestChain(destChainList[0])
    }, [destChain, destChainList])

    useEffect(() => {
        const networkHandler = async () => {
            if (
                bridgeProps?.chainId > 0 &&
                Number(bridgeProps.chainId) !== Number(chainId)
            ) {
                setIsConnecting(true);
                await setChain({ chainId: bridgeProps.chainId });
            }

            setIsConnecting(false);
        }
        networkHandler();
    }, [bridgeProps.chainId, chainId, setChain])

    const sweepBridgeHandler = useCallback(async () => {
        if (Number(sendAmount) === 0 || isPending) return;

        const displayNotify = async (data) => {
            dispatch(sendNotification(data));

            if (data.type === 'success') {
                const bal = await getSweepBalance(bridgeProps.selectedToken, chainId, destChain.chainId, walletAddress);
                setBalances(bal);
                setSendAmount(0);
            }
        }

        if (web3)
            await bridgeSweep(web3, bridgeProps.selectedToken, token.abi, chainId, destChain.netId, Number(sendAmount), walletAddress, setIsPending, displayNotify, updateData)
    }, [web3, bridgeProps, chainId, destChain, token, sendAmount, walletAddress, isPending, setIsPending, updateData, dispatch]);

    const setMaxAmount = useCallback(() => {
        const _bal = pp(balances.curt, 18, 2);
        setSendAmount(_bal)
    }, [balances, setSendAmount])

    return (
        <Modal isOpen={(bridgeProps.isOpen && !isConnecting)} onClose={() => closeModal()}>
            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center font-archivo-regular">
                    <div className="w-full max-w-md md:max-w-md transform overflow-visible rounded-3xl bg-app-black-dark text-white px-10 py-8 text-left align-middle shadow-xl transition-all">
                        <h3 className="text-2xl md:text-3xl text-left text-bold text-white capitalize">
                            {languages.text_bridge} {bridgeProps.selectedToken}
                            <XMarkIcon className="h-7 w-7 text-white opacity-60 absolute right-5 top-4 cursor-pointer" aria-hidden="true" onClick={() => closeModal()} />
                        </h3>
                        <div className="mt-6 mb-2 text-md flex items-center">
                            {languages.label_transfer_from}
                            <img src={curtChain[0]?.logo} alt="" className="h-5 w-5 flex-shrink-0 rounded-full ml-2" />
                        </div>
                        <div className="rounded-xl border border-app-gray-light px-4 pt-1 pb-12 relative">
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
                                {
                                    isLoading ? <div>Loading ...</div> :
                                        <>
                                            {languages.label_balance} {pp(balances.curt, 18, 2)}
                                            <div className="ml-2 cursor-pointer flex justify-center items-center border border-app-gray-light px-2 rounded-2xl" onClick={setMaxAmount}>
                                                <img src={icon_wallet} alt="wallet icon" className="h-4 w-4" />
                                            </div>
                                        </>
                                }
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
                                <ArrowDownIcon className="h-8 w-8 text-white" aria-hidden="true" />
                            </div>
                        </div>
                        <div className="mt-4 mb-2 text-md flex items-center">
                            {languages.label_transfer_to}
                        </div>
                        <div className="rounded-xl border border-app-gray-light px-4 pt-1 pb-12 relative">
                            <div className="text-2xl pt-2 pl-0 cursor-default">
                                {sendAmount}
                            </div>
                            <div className="flex justify-center items-center text-gray-300 text-right text-sm mt-1 absolute left-4 bottom-4">
                                {
                                    isLoading ? <div>Loading ...</div> :
                                    <>{languages.label_balance} {pp(balances.dest, 18, 2)}</>
                                }
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
                        <br />
                        <div className="mt-6 flex justify-center gap-4">
                            <div className="group inline-block rounded-full bg-white/20 p-1 hover:bg-white w-1/2">
                                <div className="inline-block w-full rounded-full bg-app-gray-light p-0.5 group-hover:bg-white">
                                    <button
                                        type="button"
                                        onClick={() => closeModal()}
                                        className={`flex w-full items-center justify-center gap-1 space-x-1 rounded-full px-6 py-2 bg-app-gray-light whitespace-nowrap group-hover:bg-white group-hover:text-black`}
                                    >
                                        <span>
                                            {languages.btn_close}
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className={`inline-block rounded-full bg-white/20 p-1 w-1/2 ${isPending || Number(sendAmount) === 0 ? "" : "group hover:bg-rainbow"}`}>
                                <div className="inline-block w-full rounded-full bg-rainbow p-0.5 group-hover:bg-black group-hover:bg-none">
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
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default BridgeModal;