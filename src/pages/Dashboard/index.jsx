import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from 'react-router-dom';

import { useWallet } from "@utils/walletHelper";
import { assetListFetch } from "@utils/contract";
import {
  setIsLoading,
  // setBuyPopup,
  setBridgePopup
} from "@redux/app.reducers";

import { chainList } from "@config/constants";

import SweepInfo from "@components/SweepInfo";
import AssetInfo from "@components/AssetInfo";
import SweeprInfo from "@components/SweeprInfo";
// import DashboardButtons from "@components/DashboardButtons";

const Dashboard = () => {
  const { network } = useParams();
  const navigate = useNavigate();
  const { connected, chainId, connectHandler } = useWallet();
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
        navigate("/not-found");
      } finally {
        dispatch(setIsLoading(false));
      }
    };

    initialHandler();
  }, [chain, sweepData, dispatch, navigate]);

  if (!chainId) return;

  // const handleBuyPopup = async () => {
  //   if (connected) {
  //     dispatch(setBuyPopup({ isOpen: true, marketPrice: sweepData?.market_price, chainId: chain?.chainId, maxToBuy: sweepData?.maxToBuy }));
  //   } else {
  //     await connectHandler();
  //   }
  // }

  const handleBridgePopup = async (selected) => {
    if (connected) {
      dispatch(setBridgePopup({ isOpen: true, selectedToken: selected, chainId: chain?.chainId }));
    } else {
      await connectHandler();
    }
  }

  return (
    <>
      <div className="sm:bg-l2s p-4">
        {/* <DashboardButtons
          chain={chain}
          sweepData={sweepData}
          handleBuyPopup={handleBuyPopup}
          handleBridgePopup={handleBridgePopup}
        /> */}
        <SweepInfo data={sweepData} />
      </div>

      <div className="px-4">
        <AssetInfo data={assetInfo} chainId={chain?.chainId} />
        <SweeprInfo
          data={sweeprData}
          handleClick={handleBridgePopup}
        />
      </div>
    </>
  )
}

export default Dashboard;