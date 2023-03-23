import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import AssetItem from "@components/AssetItem";
import Loader from "@components/Loader";
import { sweepFetch } from "@utils/contract";
import { buySweepLink } from "@utils/helper";
import { ReactComponent as LogoSweep } from "@images/logo.svg";
import { ReactComponent as LogoUniswap } from "@images/icon_uniswap.svg";

const Dashboard = () => {
  const [sweepInfo, setSweepInfo] = useState([]);
  const [isLoad, setIsLoad] = useState(false);

  useEffect(() => {
    const initialHandler = async () => {
      setIsLoad(true);
      setSweepInfo(await sweepFetch());
      setIsLoad(false);
    }

    initialHandler();
  }, []);

  return (
    <Layout>
      <h1 className="text-4xl font-bold">
        Maxos builds open source software and financial structures for decentralized money markets.
      </h1>
      <div className="flex my-6">
        <a
          href={buySweepLink}
          target="_blank"
          rel="noreferrer" 
          className="flex items-center border border-app-red rounded-md px-3 py-1 transform hover:scale-105 duration-300"
        >
          <LogoUniswap />
          <span>
            Buy Sweep on Uniswap
          </span>
        </a>
      </div>
      <h3 className="uppercase mb-3">
        Protocol metrics
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-app-blue rounded-lg p-8 flex flex-col justify-center items-center">
          <div className="flex items-center gap-4">
            <LogoSweep className="" />
            <h2 className="text-4xl">
              {sweepInfo?.total_supply?.toFixed(2)}
            </h2>
          </div>
          <h3 className="uppercase font-bold mt-2">
            Current Supply
          </h3>
        </div>
        <div className="bg-app-blue rounded-lg p-6 flex flex-col justify-center items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl">
              {sweepInfo?.interest_rate}
              %
            </h2>
          </div>
          <h3 className="uppercase font-bold mt-2">
            Interest Rate
          </h3>
        </div>
        <div className="bg-app-blue rounded-lg p-6 flex flex-col justify-center items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl">
              $
              {sweepInfo?.targe_price}
            </h2>
          </div>
          <h3 className="uppercase font-bold mt-2">
            Target Price
          </h3>
        </div>
        <div className="bg-app-blue rounded-lg p-6 flex flex-col justify-center items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-4xl">
              $
              {sweepInfo?.amm_price}
            </h2>
          </div>
          <h3 className="uppercase font-bold mt-2">
            AMM Price
          </h3>
        </div>
      </div>

      <h3 className="uppercase mt-12 mb-6">
        Assets
      </h3>
      <div className="flex flex-col gap-4 w-full pb-12">
        <div className="lg:grid grid-cols-12 gap-2 px-6 font-bold uppercase hidden">
          <div className="col-span-2 flex items-end">
            Name
          </div>
          <div className="col-span-2 flex items-end">
            Borrowed/Limit
          </div>
          <div className="col-span-1 flex items-end">
            Value
          </div>
          <div className="col-span-2 flex items-end">
            Min.Equity Ratio
          </div>
          <div className="col-span-1 flex items-end">
            Equity Ratio
          </div>
          <div className="col-span-1 flex items-end">
            Status
          </div>
          <div className="col-span-1 flex items-end">
            Call Time
          </div>
          <div className="col-span-1 flex items-end">
            Call Delay
          </div>
          <div className="col-span-1 flex items-end">
            Call Amount
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-4">
          {
            sweepInfo?.minterList?.map((item, index) => (
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
    </Layout>
  )
}

export default Dashboard;