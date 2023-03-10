import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Loader from "@components/Loader";
import { assetFetch } from "@utils/contract";
import { network } from "@utils/address";

const ModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgb(18 18 23 / 53%)',
    overflow: 'auto'
  }
};

const AssetItem = ({ data }) => {
  const [assetInfo, setAssetInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(false);

  const getAssetInfo = async () => {
    if (assetInfo?.name !== data.name) {
      setIsLoad(true);
      setAssetInfo(await assetFetch(data));
      setIsLoad(false);
    } else {
      setIsOpen(true);
    }
  }

  useEffect(() => {
    if (assetInfo !== undefined && assetInfo !== null)
      setIsOpen(true);
  }, [assetInfo])

  const assetName = (name) => {
    return name.replace('_', ' ');
  }

  const shortAddress = (addr) => {
    return addr.slice(0, 8) + '...' + addr.slice(-6)
  }

  const TextRow = (props) => {
    return (
      <div className="flex items-center">
        <div className="mr-2 font-bold">{props.name}</div>
        <div className={`${props.valueClass} hidden sm:block`}>{props.value}</div>
        <div className={`${props.valueClass} block sm:hidden`}>{props.mobileValue}</div>
      </div>
    )
  }

  return (
    <>
      <div
        className="flex flex-col bg-white hover:bg-gray-700 text-black hover:text-white px-6 py-3 rounded-md cursor-pointer"
        onClick={getAssetInfo}
      >
        <div>
          Name:
          <span className="ml-2 uppercase">
            {assetName(data.name)}
          </span>
        </div>
        <div className="flex items-center">
          Address:
          <a href={network.scan + data.value} target="_blank" rel="noreferrer" className="hover:text-red-300 ml-2 hidden sm:block">
            {data.value}
          </a>
          <a href={network.scan + data.value} target="_blank" rel="noreferrer" className="hover:text-red-300 ml-2 block sm:hidden">
            {shortAddress(data.value)}
          </a>
        </div>
      </div>
      {
        isOpen && (
          <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            style={ModalStyles}
            contentLabel="Asset Info"
            ariaHideApp={false}
          >
            <h1 className="uppercase text-xl sm:text-2xl lg:text-4xl font-bold text-center">
              Stabilizer
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 2xl:mt-8 2xl:mb-6">
              <TextRow 
                name="Name: "
                value={assetName(assetInfo.name)}
                valueClass="uppercase"
              />
              <TextRow 
                name="Link: "
                value={assetInfo.link}
              />
              <TextRow 
                name="Address: "
                value={assetInfo.address}
                mobileValue={shortAddress(assetInfo.address)}
              />
              <TextRow 
                name="Borrowed Amount: "
                value={assetInfo.borrowed_amount}
              />
              <TextRow 
                name="Current Value: "
                value={assetInfo.current_value}
              />
              <TextRow 
                name="Min Equity Ratio: "
                value={assetInfo.min_equity_ratio}
              />
              <TextRow 
                name="Equity Ratio: "
                value={assetInfo.equity_ratio}
              />
              <TextRow 
                name="Is Defaulted: "
                value={assetInfo.is_defaulted}
              />
              <TextRow 
                name="Call Time: "
                value={assetInfo.call_time}
              />
              <TextRow 
                name="Call Delay: "
                value={assetInfo.call_delay}
              />
              <TextRow 
                name="Call Amount: "
                value={assetInfo.call_amount}
              />
            </div>
          </Modal>
        )
      }
      {
        isLoad && <Loader />
      }
    </>
  )
}

export default AssetItem;