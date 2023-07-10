import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import AssetItem from "@components/AssetItem";
import Loader from "@components/Loader";
import BridgeModal from "@components/BridgeModal";
import { useWallet } from "@utils/walletHelper";
import { sweepFetch, assetListFetch } from "@utils/contract";
import { buySweepLink } from "@utils/helper";
import { network } from "@utils/address";
import { languages } from "@config/languages"
import { ReactComponent as LogoUniswap } from "@images/icon_uniswap.svg";
import imgLogo from "@images/logo.png";

const Dashboard = () => {
  const { connected } = useWallet();
  const [sweepInfo, setSweepInfo] = useState([]);
  const [assetInfo, setAssetInfo] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const initialHandler = async () => {
      setIsLoad(true);
      const sweepData = await sweepFetch();
      setSweepInfo(sweepData);
      setAssetInfo(await assetListFetch(sweepData.assets));
      setIsLoad(false);
    }

    initialHandler();
  }, []);

  const SweepItem = (props) => {
    return (
      <div className="bg-app-blue rounded-lg p-8 flex flex-col justify-center items-center">
        <div className="flex items-center gap-4 text-4xl">
          {
            props.symbolLeft && props.symbolLeft
          }
          {props.value}
          {
            props.symbolRight && props.symbolRight
          }
        </div>
        <h3 className="uppercase font-archivo-bold mt-2">
          {props.label}
        </h3>
      </div>
    )
  }

  return (
    <Layout>
      <div className="flex my-6 gap-6">
        <a
          href={buySweepLink}
          target="_blank"
          rel="noreferrer"
          className="flex items-center border border-app-red rounded-md px-3 py-1 hover:bg-white hover:text-app-red transform duration-300"
        >
          <LogoUniswap />
          <span>
            {languages.btn_link_uniswap}
            <span className="capitalize"> {network.name}</span>
          </span>
        </a>
        {
          connected && (
            <div
              onClick={() => setIsOpen(true)}
              className="flex items-center border border-app-red rounded-md px-3 py-1 hover:bg-white hover:text-app-red transform duration-300 cursor-pointer"
            >
              <img src={imgLogo} alt="logo" className="w-6 mr-2" />
              <span>
                {languages.btn_sweep_bridge}
              </span>
            </div>
          )
        }
      </div>
      <h3 className="uppercase mb-3">
        {languages.text_sweep_title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <SweepItem
          label={languages.label_current_supply}
          value={sweepInfo?.total_supply}
          symbolLeft={
            <img src={imgLogo} alt="logo" className="w-8" />
          }
        />
        <SweepItem
          label={languages.label_interest_rate}
          value={sweepInfo?.interest_rate}
          symbolRight="%"
        />
        <SweepItem
          label={languages.label_target_price}
          value={sweepInfo?.targe_price}
          symbolLeft="$"
        />
        <SweepItem
          label={
            languages.label_amm_price + 
            (sweepInfo?.mint_status && ` - ${sweepInfo.mint_status}`)
          }
          value={sweepInfo?.amm_price}
          symbolLeft="$"
        />
      </div>

      <h3 className="uppercase mt-12 mb-6">
        {languages.text_assets_title}
      </h3>
      <div className="flex flex-col gap-4 w-full pb-12">
        <div className="lg:grid grid-cols-12 gap-2 px-6 font-archivo-semibold uppercase hidden">
          <div className="col-span-2 flex items-end">
            {languages.column_name}
          </div>
          <div className="col-span-2 flex items-end">
            {languages.column_borrowed}/{languages.column_limit}
          </div>
          <div className="col-span-2 flex items-end">
            {languages.column_value}
          </div>
          <div className="col-span-1 flex items-end">
            {languages.column_min_equity}
          </div>
          <div className="col-span-1 flex items-end">
            {languages.column_equity}
          </div>
          <div className="col-span-1 flex items-end">
            {languages.column_status}
          </div>
          <div className="col-span-1 flex items-end">
            {languages.column_call_time}
          </div>
          <div className="col-span-1 flex items-end">
            {languages.column_call_delay}
          </div>
          <div className="col-span-1 flex items-end">
            {languages.column_call_amount}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-4">
          {
            assetInfo?.map((item, index) => (
              <AssetItem
                key={index}
                data={item}
              />
            ))
          }
        </div>
      </div>
      {
        isLoad && <Loader />
      }
      <BridgeModal 
        isOpen={isOpen}
        closeModal={setIsOpen}
      />
    </Layout>
  )
}

export default Dashboard;