import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import Loader from "@components/Loader";
import AssetPage from "@components/AssetPage";
import AssetNotFound from "@components/AssetNotFound";
import { assetFetch } from "@utils/contract";

const Asset = () => {
  const { network, address } = useParams();
  const [asset, setAsset] = useState({
    loading: true,
    found: true,
    data: {}
  });

  useEffect(() => {
    const initialHandler = async () => {
      try {
        const assetData = await assetFetch(network, address);
        setAsset(assetData);
      } catch (error) {
        console.log(error);
        setAsset({ loading: false, found: false, data: {} });
      }
    }

    initialHandler();
  }, [network, address]);

  return (
    <div className="bg-l2s p-4">
      {asset.loading && <Loader />}
      {!asset.loading && asset.found && <AssetPage asset={asset.data} network={network} address={address} />}
      {!asset.loading && !asset.found && <AssetNotFound />}
    </div>
  )
}

export default Asset;