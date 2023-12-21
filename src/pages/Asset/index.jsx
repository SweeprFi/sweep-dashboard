import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setIsLoading } from "@redux/app.reducers";

import AssetPage from "@components/AssetPage";
import AssetNotFound from "@components/AssetNotFound";
import { assetFetch } from "@utils/contract";

const Asset = () => {
  const dispatch = useDispatch();
  const { network, address } = useParams();
  const [asset, setAsset] = useState({
    loading: true,
    found: true,
    data: {}
  });

  useEffect(() => {
    const initialHandler = async () => {
      try {
        dispatch(setIsLoading(true));
        const assetData = await assetFetch(network, address);
        setAsset(assetData);
      } catch (error) {
        console.log(error);
        setAsset({ loading: false, found: false, data: {} });
      } finally {
        dispatch(setIsLoading(false));
      }
    }

    initialHandler();
  }, [network, address, dispatch]);

  return (
    <div className="bg-l2s p-4">
      {asset.found && <AssetPage asset={asset.data} network={network} address={address} />}
      {!asset.found && <AssetNotFound />}
    </div>
  )
}

export default Asset;