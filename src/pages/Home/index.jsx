import React from "react";
import { useSelector } from "react-redux";
import { useWallet } from "@utils/walletHelper";
import SweepInfo from "@components/SweepInfo";
import SweepDescription from "@components/SweepDescription";
import AssetsBlock from "@components/AssetsBlock";
import { languages } from "@config/languages";

const Home = () => {
  const { chainId, connected, connectHandler } = useWallet();
  const sweepInfo = useSelector((state) => state.sweep)
  const chains = Object.keys(sweepInfo);
  const _id = chains.includes(chainId.toString()) ? chainId : chains[0]

  return (
    <>
      <h1 className="font-archivo-regular mb-6 mx-1 mt-1 release-title">
        {languages.text_asset_distribution}
      </h1>
      <div className="sm:bg-l2s p-4">
        <SweepInfo data={sweepInfo[_id]} />
        <SweepDescription
          marketPrice={sweepInfo[chainId]?.market_price}
          chainId={chainId}
          connected={connected}
          connectHandler={connectHandler}
          maxToBuy={sweepInfo[chainId]?.maxToBuy}
          network={sweepInfo[chainId]?.network}
          status={sweepInfo[chainId]?.mint_status}
        />
      </div>
      <AssetsBlock chainId={chainId} />
    </>
  )
}

export default Home;