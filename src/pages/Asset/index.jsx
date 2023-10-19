import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import Layout from "@components/Layout";
import Loader from "@components/Loader";
import AssetPage from "@components/AssetPage";
import AssetNotFound from "@components/AssetNotFound";

import { useWallet } from "@utils/walletHelper";
import { assetFetch } from "@utils/contract";

const Asset = () => {
  const { address } = useParams();
  const { chainId } = useWallet();
  const [data, setData] = useState({ loading: true, found: true, asset: {} });

  useEffect(() => {
    const initialHandler = async () => {
      try {
        const assetData = await assetFetch(chainId, address);
        setData(assetData);
      } catch (error) {
        console.log(error);
        setData({ loading: false, found: false, asset: {} });
      }
    }

    initialHandler();
  }, [chainId, address]);

  return (
    <Layout>
      <div className="bg-l2s p-4">
        {
          data.loading ?
            <Loader /> :
            data.found ?
              <AssetPage asset={data.asset} chainId={chainId} address={address} /> :
              <AssetNotFound />
        }
      </div>
    </Layout>
  )
}

export default Asset;