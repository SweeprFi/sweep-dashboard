import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import AssetItem from "@components/AssetItem";
import Loader from "@components/Loader";
import BridgeModal from "@components/BridgeModal";
import { useWallet } from "@utils/walletHelper";
import { sweepFetch, assetListFetch } from "@utils/contract";
import { AMMLinks } from "@config/constants";
import { languages } from "@config/languages"
import { ReactComponent as LogoUniswap } from "@images/icon_uniswap.svg";
import SweepLogo from "@images/icon_sweep.svg"
import SweeprLogo from "@images/icon_sweepr.png"
import SweeprLogoWhite from "@images/icon_sweepr_white.png"

const Dashboard = () => {
  const { connected, chainId } = useWallet();
  const [sweepInfo, setSweepInfo] = useState({
    total_supply: 0,
    local_supply: 0,
    interest_rate: 0,
    targe_price: 0,
    amm_price: 0,
    mint_status: "Minting",
    assets: []
  });
  const [assetInfo, setAssetInfo] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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
      <h1 className="text-xl mt-4 pb-2">
        {languages.text_title}
      </h1>
      <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-start sm:items-center my-6 gap-3 sm:gap-6">
        <a
          href={AMMLinks[chainId].link}
          target="_blank"
          rel="noreferrer"
          className="flex items-center border border-app-red rounded-md px-3 py-1 hover:bg-white hover:text-app-red transform duration-300 h-10"
        >
          <LogoUniswap />
          <span>
            {AMMLinks[chainId].title}
          </span>
        </a>
        {
          connected && (
            <>
              <div
                onClick={() => { setIsOpen(true); setSelectedToken('sweep'); }}
                className="flex items-center border border-app-red rounded-md px-4 py-1 hover:bg-white hover:text-app-red transform duration-300 cursor-pointer h-10"
              >
                <img src={SweepLogo} alt="logo" className="w-6 mr-2" />
                <span>
                  {languages.btn_sweep_bridge}
                </span>
              </div>
              <div
                onClick={() => { setIsOpen(true); setSelectedToken('sweepr'); }}
                className="flex items-center border border-app-red rounded-md px-4 py-1 hover:bg-white hover:text-app-red transform duration-300 cursor-pointer h-10 group"
              >
                <img src={SweeprLogoWhite} alt="logo" className="w-6 mr-2 group-hover:hidden" />
                <img src={SweeprLogo} alt="logo" className="w-6 mr-2 hidden group-hover:block" />
                <span>
                  {languages.btn_sweepr_bridge}
                </span>
              </div>
            </>
          )
        }
      </div>
      <h3 className="text-xl uppercase mb-3">
        {languages.text_sweep_title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-app-blue rounded-lg p-8 flex flex-col justify-center items-center">
          <div className="uppercase text-2xl">
            <div>{sweepInfo?.total_supply} /</div>
            <div>{sweepInfo?.local_supply}</div>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <img src={SweepLogo} alt="logo" className="w-8" />
            <div className="uppercase font-archivo-bold">
              <div className="whitespace-nowrap">{languages.label_sweep_total} /</div>
              <div>{languages.label_local}</div>
            </div>
          </div>
        </div>
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

      <h3 className="text-xl uppercase mt-12 mb-6">
        {languages.text_assets_title}
      </h3>
      {
        assetInfo.length > 0 ? (
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
        ) : (
          <div className="text-center">
            {languages.text_empty_asset}
          </div>
        )
      }
      {
        isLoad && <Loader />
      }
      <BridgeModal
        isOpen={isOpen}
        closeModal={setIsOpen}
        selectedToken={selectedToken}
      />
    </Layout>
  )
}

export default Dashboard;