import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "@components/Layout";
import { TextRow, LinkRow } from "@components/Row";
import Loader from "@components/Loader";
import { assetFetch } from "@utils/contract";
import { assetName, shortAddress, scanLink } from "@utils/helper";

const Asset = () => {
  const [assetInfo, setAssetInfo] = useState();
  const [isLoad, setIsLoad] = useState(false);
  const params = useParams();

  useEffect(() => {
    const initialHandler = async () => {
      setIsLoad(true);
      setAssetInfo(await assetFetch(params));
      setIsLoad(false);
    }

    initialHandler();
  }, [params]);

  return (
    <Layout>
      <div className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <h1 className="uppercase text-xl sm:text-2xl lg:text-4xl font-bold text-center text-white">
          Stabilizer
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 2xl:mt-8 2xl:mb-6">
          <TextRow
            name="Name: "
            value={assetName(assetInfo?.name)}
            valueClass="uppercase"
          />
          <LinkRow
            name="Link: "
            value={assetInfo?.link}
            link={assetInfo?.link}
          />
          <LinkRow
            name="Borrower: "
            value={assetInfo?.borrower}
            mobileValue={shortAddress(assetInfo?.borrower)}
            link={scanLink(assetInfo?.borrower)}
          />
          <LinkRow
            name="Address: "
            value={assetInfo?.address}
            mobileValue={shortAddress(assetInfo?.address)}
            link={scanLink(assetInfo?.address)}
          />
          <TextRow
            name="Borrowed Amount: "
            value={assetInfo?.borrowed_amount}
          />
          <TextRow
            name="Current Value: "
            value={assetInfo?.current_value}
          />
          <TextRow
            name="Min Equity Ratio: "
            value={assetInfo?.min_equity_ratio}
          />
          <TextRow
            name="Equity Ratio: "
            value={assetInfo?.equity_ratio}
          />
          <TextRow
            name="Is Defaulted: "
            value={assetInfo?.is_defaulted ? "true" : "false"}
          />
          <TextRow
            name="Call Time: "
            value={assetInfo?.call_time}
          />
          <TextRow
            name="Call Delay: "
            value={assetInfo?.call_delay}
          />
          <TextRow
            name="Call Amount: "
            value={assetInfo?.call_amount}
          />
        </div>
      </div>
      {
        isLoad && <Loader />
      }
    </Layout>
  )
}

export default Asset;