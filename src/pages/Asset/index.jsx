import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import Layout from "@components/Layout";
import Loader from "@components/Loader";
import AssetPage from "@components/AssetPage";
import AssetNotFound from "@components/AssetNotFound";
import { assetFetch } from "@utils/contract";

const Asset = () => {
  const { network, address } = useParams();
  const [data, setData] = useState({ loading: true, found: true, asset: {} });

  useEffect(() => {
    const initialHandler = async () => {
      try {
        const assetData = await assetFetch(network, address);
        setData(assetData);
      } catch (error) {
        console.log(error);
        setData({ loading: false, found: false, asset: {} });
      }
    }

    initialHandler();
  }, [network, address]);

  return (
    <Layout>
      <div className="bg-l2s p-4">
        {
          data.loading ?
            <Loader /> :
            data.found ?
              <AssetPage asset={data.asset} network={network} address={address} /> :
              <AssetNotFound />
        }
      </div>
    </Layout>
  )
}

export default Asset;