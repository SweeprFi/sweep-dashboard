import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { updateSweepData, updateSweeprData, sendNotification } from "@redux/app.reducers";
import { useWallet } from "@utils/walletHelper";
import SelectBox from "@components/SelectBox";
import InputBox from "@components/InputBox";
import { tokenList, chainList } from "@config/constants";
import { languages } from "@config/languages";
import { getSweepBalance, bridgeSweep } from "@utils/contract";
import { pp } from "@utils/helper";
import { ArrowDownIcon } from '@heroicons/react/20/solid'

const Move = () => {
  const { web3, chainId, walletAddress, connected } = useWallet();
  const dispatch = useDispatch();

  const [sendAmount, setSendAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [destChain, setDestChain] = useState(chainList[1]);
  const [balances, setBalances] = useState({ curt: 0, dest: 0 });
  const [isPending, setIsPending] = useState(false);
  const [selectedToken, setSelectedToken] = useState(tokenList[0]);

  const curtChain = useMemo(() => {
    return chainList.filter((item) => item.chainId === chainId)
  }, [chainId]);

  const destChainList = useMemo(() => {
    return chainList.filter((item) => item.chainId !== chainId)
  }, [chainId]);

  const updateData = useCallback(() => {
    if (selectedToken.name === 'Sweep') {
      dispatch(updateSweepData());
    } else {
      dispatch(updateSweeprData());
    }
  }, [dispatch, selectedToken]);

  useEffect(() => {
    const intialHandler = async () => {
      if (walletAddress === "") return;
      setIsLoading(true)
      const bal = await getSweepBalance(selectedToken.name, chainId, destChain.chainId, walletAddress);
      setBalances(bal)

      const _bal = pp(bal.curt, 18, 2);
      if (sendAmount > _bal) setSendAmount(_bal);
      setIsLoading(false)
    }

    intialHandler();
  }, [walletAddress, chainId, destChain, setBalances, setSendAmount, sendAmount, selectedToken.name])

  useEffect(() => {
    if (destChainList.indexOf(destChain) < 0)
      setDestChain(destChainList[0])
  }, [destChain, destChainList])

  const sweepBridgeHandler = useCallback(async () => {
    if (Number(sendAmount) === 0 || isPending) return;

    const displayNotify = async (data) => {
      dispatch(sendNotification(data));

      if (data.type === 'success') {
        const bal = await getSweepBalance(selectedToken.name, chainId, destChain.chainId, walletAddress);
        setBalances(bal);
        setSendAmount(0);
      }
    }

    if (web3)
      await bridgeSweep(web3, selectedToken.name, selectedToken.abi, chainId, destChain.netId, Number(sendAmount), walletAddress, setIsPending, displayNotify, updateData)
  }, [web3, selectedToken, chainId, destChain, sendAmount, walletAddress, isPending, setIsPending, updateData, dispatch]);

  const setMaxAmount = useCallback(() => {
    const _bal = pp(balances.curt, 18, 2);
    setSendAmount(_bal)
  }, [balances, setSendAmount])

  const sweepIsSelected = selectedToken.name === "Sweep";

  return (
    <div className="flex min-h-full items-center justify-center p-4 text-center font-archivo-regular">
      <div className="w-full max-w-md rounded-3xl bg-app-black text-white p-8 text-left align-middle border-2 border-white">
        <div className="flex justify-around">
          <div
            onClick={() => setSelectedToken(tokenList[0])}
            className={`rounded-xl border border-app-white p-3 rounded-3xl cursor-pointer w-5/12 grid justify-center ${sweepIsSelected ? 'bg-app-gray-semidark' : ''}`}
          >
            <img src={tokenList[0].logo} className="h-10 w-10 ml-2" alt="logo" />
            <h1>{tokenList[0].name}</h1>
          </div>
          <div
            onClick={() => setSelectedToken(tokenList[1])}
            className={`rounded-xl border border-app-white p-3 rounded-3xl cursor-pointer w-5/12 grid justify-center ${!sweepIsSelected ? 'bg-app-gray-semidark' : ''}`}
          >
            <img src={tokenList[1].logo} className="h-10 w-10 ml-2" alt="logo" />
            <h1>{tokenList[1].name}</h1>
          </div>
        </div>
        <div className="mt-6 mb-2 text-md flex items-center">
          {languages.label_transfer_from}
          <img src={curtChain[0]?.logo} alt="" className="h-5 w-5 flex-shrink-0 rounded-full ml-2" />
        </div>
        <div className="rounded-xl border border-app-gray-light px-4 pt-1 pb-12 relative bg-app-gray-semilight">
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
                  <div className="ml-2 cursor-pointer flex justify-center items-center border border-app-gray-light px-2 text-xs rounded-2xl" onClick={setMaxAmount}>
                    MAX
                  </div>
                </>
            }
          </div>
          <div className="absolute right-4 top-6 flex justify-center items-center gap-4">
            <div className="">
              <span className="flex items-center">
                <img src={selectedToken?.logo} alt="" className="h-5 w-5 flex-shrink-0 rounded-full" />
                <span className="ml-2 block truncate">{selectedToken?.name}</span>
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
        <div className="rounded-xl border border-app-gray-light px-4 pt-1 pb-12 relative bg-app-gray-semilight">
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
        <div className="flex justify-center gap-4">
          <div className={`inline-block rounded-full bg-white/20 p-1 w-1/2 ${isPending || Number(sendAmount) === 0 ? "" : "group hover:bg-rainbow"}`}>
            <div className="inline-block w-full rounded-full bg-rainbow p-0.5 group-hover:bg-black group-hover:bg-none">
              <button
                type="button"
                onClick={() => sweepBridgeHandler()}
                className={`flex w-full items-center justify-center gap-1 space-x-1 rounded-full px-6 py-2 whitespace-nowrap ${isPending || Number(sendAmount) === 0 || !connected ? 'bg-black cursor-not-allowed text-white' : 'bg-white text-black'}`}
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
  )
}

export default Move;