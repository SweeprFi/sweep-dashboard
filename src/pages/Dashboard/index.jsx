import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';

import { useWallet } from "@utils/walletHelper";
import { assetListFetch } from "@utils/contract";
import { setIsLoading, setBuyPopup, setBridgePopup } from "@redux/app.reducers";

import { AMMLinks, chainList } from "@config/constants";
import { languages } from "@config/languages";

import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { ReactComponent as BalancerIcon } from "@images/icons/balancer.svg";
import SweepLogo from "@images/icon_sweep.svg"
import SweepInfo from "@components/SweepInfo";
import AssetInfo from "@components/AssetInfo";
import SweeprInfo from "@components/SweeprInfo";

const Dashboard = () => {
  const { network } = useParams();
  const { connected, chainId } = useWallet();
  const dispatch = useDispatch();

  const sweepInfo = useSelector((state) => state.sweep);
  const sweeprInfo = useSelector((state) => state.sweepr);
  const chain = chainList.find((chain) => chain.name.toLowerCase() === network);
  const sweepData = sweepInfo[chain?.chainId]
  const sweeprData = sweeprInfo[chain?.chainId]

  const [assetInfo, setAssetInfo] = useState([]);

  useEffect(() => {
    const initialHandler = async () => {
      try {
        dispatch(setIsLoading(true));
        if (sweepData?.assets && sweepData.assets.length > 0) {
          const assetsData = await assetListFetch(chain?.chainId, sweepData.assets);
          setAssetInfo(assetsData);
        } else {
          setAssetInfo([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    initialHandler();
  }, [chain, sweepData, dispatch]);

  if (!chainId) return;

  return (
    <>
      <div className="sm:bg-l2s p-4">
        <h1 className="font-archivo-regular my-2 release-title">
          {languages.text_title1}
        </h1>
        <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-start sm:items-center my-6 gap-3 sm:gap-6 mb-10">
          <div className="group inline-block rounded-full bg-white/20 p-1 hover:bg-rainbow w-full sm:w-auto">
            <a
              href={AMMLinks[chainId].link}
              target="_blank"
              rel="noreferrer"
              className="inline-block w-full rounded-full bg-rainbow p-0.5 group-hover:bg-black group-hover:bg-none"
            >
              <button className="flex w-full items-center justify-center gap-1 space-x-1 rounded-full px-6 py-2 bg-white text-black whitespace-nowrap">
                <BalancerIcon className="w-6 h-6" />
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
                  sweepData.mint_status === 0 && (
                    <div className="group inline-block rounded-full bg-white/20 p-1 hover:bg-rainbow w-full sm:w-auto">
                      <div
                        className="inline-block w-full rounded-full bg-rainbow p-0.5 group-hover:bg-black group-hover:bg-none"
                      >
                        <button
                          onClick={() => dispatch(setBuyPopup({isOpen: true, marketPrice: sweepData?.market_price }))}
                          className="flex w-full items-center justify-center gap-1 space-x-1 rounded-full px-6 py-2 bg-white text-black whitespace-nowrap"
                        >
                          <img src={SweepLogo} alt="logo" className="w-6 mr-1" />
                          <span>
                            {languages.btn_buy_sweep_on_market + ' $' + sweepData?.market_price}
                          </span>
                        </button>
                      </div>
                    </div>
                  )
                }
                <div className="group inline-block rounded-full bg-white/20 p-1 hover:bg-rainbow w-full sm:w-auto">
                  <div
                    className="inline-block w-full rounded-full bg-rainbow p-0.5 group-hover:bg-black group-hover:bg-none"
                  >
                    <button
                      onClick={() => { dispatch(setBridgePopup({ isOpen: true, selectedToken: 'sweep' })); }}
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
        <SweepInfo data={sweepData} />
      </div>

      <div className="px-4">
        <AssetInfo data={assetInfo} chainId={chain?.chainId} />
        <SweeprInfo
          data={sweeprData}
          connected={connected}
        />
      </div>
    </>
  )
}

export default Dashboard;