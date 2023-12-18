import React from "react";
import { useSelector } from "react-redux";
import { useWallet } from "@utils/walletHelper";
import SweepInfo from "@components/SweepInfo";
import SweepDescription from "@components/SweepDescription";
import AssetsBlock from "../../components/AssetsBlock";

const Home = () => {
  const { chainId } = useWallet();
  const sweepInfo = useSelector((state) => state.sweep)

  return (
    <>
      <div className="sm:bg-l2s p-4">
        <SweepInfo data={sweepInfo[chainId]} />
        <SweepDescription marketPrice={sweepInfo[chainId]?.market_price} />
      </div>
      <AssetsBlock chainId={chainId} />
    </>

  )
}

export default Home;