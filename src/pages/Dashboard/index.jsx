import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import Loader from "@components/Loader";
import BridgeModal from "@components/BridgeModal";
import BuySweepModal from "@components/BuySweepModal";
import { useWallet } from "@utils/walletHelper";
import { sweepFetch, sweeprFetch, assetListFetch } from "@utils/contract";
import { AMMLinks } from "@config/constants";
import { languages } from "@config/languages";
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { ReactComponent as UniswapIcon } from "@images/icons/uniswap.svg";
import SweepLogo from "@images/icon_sweep.svg"
import SweepInfo from "@components/SweepInfo";
import AssetInfo from "@components/AssetInfo";
import SweeprInfo from "@components/SweeprInfo";

const Dashboard = () => {
  const { connected, chainId } = useWallet();
  const [sweepInfo, setSweepInfo] = useState({
    total_supply: 0,
    local_supply: 0,
    interest_rate: 0,
    targe_price: 0,
    amm_price: 0,
    market_price: 0,
    mint_status: 0,
    assets: []
  });
  const [sweeprInfo, setSweeprInfo] = useState({
    total_supply: 0,
    local_supply: 0
  });
  const [assetInfo, setAssetInfo] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isBuyOpen, setIsBuyOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState('');

  useEffect(() => {
    const initialHandler = async () => {
      setIsLoad(true);
      try {
        const sweepData = await sweepFetch(chainId);
        setSweepInfo(sweepData);
        if (sweepData.assets.length > 0) {
          setAssetInfo(await assetListFetch(chainId, sweepData.assets));
        } else {
          setAssetInfo([]);
        }
      } catch (error) {
        console.log(error)
      }
      setIsLoad(false);
    }

    initialHandler();
  }, [chainId]);

  useEffect(() => {
    const initialHandler = async () => {
      try {
        const sweeprData = await sweeprFetch(chainId);
        setSweeprInfo(sweeprData);
      } catch (error) {
        console.log(error)
      }
    }

    initialHandler();
  }, [chainId]);


  return (
    <Layout>
      <div className="bg-l2s p-4">
        <h1 className="text-xl font-archivo-regular mt-4 pb-2">
          {languages.text_title1} <br />
          {languages.text_title2}
        </h1>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-start sm:items-center my-6 gap-3 sm:gap-6 mb-10">
          <div className="group inline-block rounded-full bg-white/20 p-1 hover:bg-rainbow">
            <a
              href={AMMLinks[chainId].link}
              target="_blank"
              rel="noreferrer"
              className="inline-block w-full rounded-full bg-rainbow p-0.5 group-hover:bg-black group-hover:bg-none"
            >
              <button className="flex w-full items-center justify-center gap-1 space-x-1 rounded-full px-6 py-2 bg-white text-black whitespace-nowrap">
                <UniswapIcon className="w-6 h-6" />
                <span>
                  {AMMLinks[chainId].title}
                </span>
                <ArrowRightIcon className="-rotate-45 w-6 h-6" />
              </button>
            </a>
          </div>
          {
            connected && (
              <>
              {
                // Hide buy button when mint not allowed.
                sweepInfo.mint_status === 0 && (
                  <div className="group inline-block rounded-full bg-white/20 p-1 hover:bg-rainbow">
                    <div
                      className="inline-block w-full rounded-full bg-rainbow p-0.5 group-hover:bg-black group-hover:bg-none"
                    >
                      <button
                        onClick={() => setIsBuyOpen(true)}
                        className="flex w-full items-center justify-center gap-1 space-x-1 rounded-full px-6 py-2 bg-white text-black whitespace-nowrap"
                      >
                        <img src={SweepLogo} alt="logo" className="w-6 mr-1" />
                        <span>
                          {languages.btn_buy_sweep_on_market + ' $' + sweepInfo.market_price}
                        </span>
                      </button>
                    </div>
                  </div>
                )
              }
                <div className="group inline-block rounded-full bg-white/20 p-1 hover:bg-rainbow">
                  <div
                    className="inline-block w-full rounded-full bg-rainbow p-0.5 group-hover:bg-black group-hover:bg-none"
                  >
                    <button
                      onClick={() => { setIsOpen(true); setSelectedToken('sweep'); }}
                      className="flex w-full items-center justify-center gap-1 space-x-1 rounded-full px-6 py-2 bg-white text-black whitespace-nowrap"
                    >
                      <img src={SweepLogo} alt="logo" className="w-6 mr-1" />
                      <span>
                        {languages.btn_sweep_bridge}
                      </span>
                    </button>
                  </div>
                </div>
              </>
            )
          }
        </div>
        <SweepInfo
          data={sweepInfo}
        />
      </div>

      <div className="px-4">
        <AssetInfo
          data={assetInfo}
        />

        <SweeprInfo
          data={sweeprInfo}
          connected={connected}
          setIsOpen={setIsOpen}
          setSelectedToken={setSelectedToken}
        />
      </div>

      {
        isLoad && <Loader />
      }
      <BridgeModal
        isOpen={isOpen}
        closeModal={setIsOpen}
        selectedToken={selectedToken}
      />
      <BuySweepModal
        isOpen={isBuyOpen}
        closeModal={setIsBuyOpen}
        marketPrice={sweepInfo.market_price}
      />
    </Layout>
  )
}

export default Dashboard;