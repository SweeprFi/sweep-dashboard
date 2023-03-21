import React, { useEffect, useState } from "react";
import Layout from "@components/Layout";
import AssetItem from "@components/AssetItem";
import Loader from "@components/Loader";
import { sweepFetch } from "@utils/contract";

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

  const TextRow = (props) => {
    return (
      <div className="flex items-center">
        <div className="w-28 text-right mr-2">
          {props.title}
        </div>
        <div>{props.value}</div>
        <div className="ml-1">{props.symbol}</div>
      </div>
    )
  }

  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl xl:text-3xl text-center uppercase text-white">Sweep Coin</h2>
            <div className="flex flex-col gap-2 mt-6">
              <TextRow
                title="Current Supply:"
                value={sweepInfo?.total_supply?.toFixed(2)}
                symbol=""
              />
              <TextRow
                title="Interest Rate:"
                value={sweepInfo?.interest_rate}
                symbol="%"
              />
              <TextRow
                title="Target Price:"
                value={sweepInfo?.targe_price}
                symbol="$"
              />
              <TextRow
                title="AMM Price:"
                value={sweepInfo?.amm_price}
                symbol="$"
              />
            </div>
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-10">
            <h2 className="text-2xl xl:text-3xl text-center uppercase text-white">Asset List</h2>
            <div className="flex flex-col gap-4 mt-6">
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
        </div>
      </div>
      {
        isLoad && <Loader />
      }
    </Layout>
  )
}

export default Dashboard;