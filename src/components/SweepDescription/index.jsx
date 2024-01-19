import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { setBuyPopup, setBridgePopup } from "@redux/app.reducers";
import { languages } from "@config/languages";
import { AMMLinks, tokens } from "@config/constants";

import ExternalLink from "@components/ExternalLink";
import { scanLink } from "@utils/helper";

import SweepLogo from "@images/icon_sweep.svg"
import { DocumentDuplicateIcon } from '@heroicons/react/20/solid'

const SweepDescription = ({ marketPrice, maxToBuy, chainId, connected, connectHandler, network, status }) => {
  const [copiedText, setCopiedText] = useState(false);
  const sweepAddress = tokens.sweep[chainId];
  const dispatch = useDispatch();
  const classButton = "flex w-full items-center justify-center gap-1 space-x-1 rounded-full px-6 py-2 bg-white text-black whitespace-nowrap";
  const classContainer = "group inline-block rounded-full bg-white/20 p-1 hover:bg-rainbow w-11/12";

  const handleBuyPopup = async () => {
    if (connected) {
      dispatch(setBuyPopup({ isOpen: true, marketPrice: marketPrice, chainId, maxToBuy: maxToBuy }));
    } else {
      await connectHandler();
    }
  }

  const handleBridgePopup = async () => {
    if (connected) {
      dispatch(setBridgePopup({ isOpen: true, selectedToken: 'sweep', chainId }));
    } else {
      await connectHandler();
    }
  }

  const clickHandler = () => {
    navigator.clipboard.writeText(sweepAddress);
    setCopiedText(true)
    setTimeout(() => {
      setCopiedText(false);
    }, 2000);
  }

  return (
    <div className="my-12">
      <div>
        <table>
          <tbody>
            <tr>
              <td className="flex justify-left">
                <div className={classContainer}>
                  <a
                    href={AMMLinks[chainId].link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <button className={classButton}>
                      <img src={AMMLinks[chainId].icon} alt="logo" className="w-6 h-6" />
                      <span>{AMMLinks[chainId].title}</span>
                    </button>
                  </a>
                </div>
              </td>
              <td>
                <h1>{languages.text_swap_sweep_amm}</h1>
              </td>
            </tr>
            <tr>
              <td className="flex justify-left">
                <div className={classContainer}>
                  <Link to="/swap/">
                    <button className={classButton}>
                      <span>{languages.btn_swap_sweep}</span>
                    </button>
                  </Link>
                </div>
              </td>
              <td>
                <h1>{languages.text_swap_sweep}</h1>
              </td>
            </tr>
            {
              (status === 0) &&
              <tr>
                <td className="flex justify-left">
                  <div className={classContainer}>
                    <button onClick={handleBuyPopup} className={classButton}>
                      <img src={SweepLogo} alt="logo" className="w-6 mr-1" />
                      <span>{`${languages.btn_buy_sweep_on_market} $ ${marketPrice || 1}`}</span>
                    </button>
                  </div>
                </td>
                <td>
                  <h1>{languages.text_buy_at}</h1>
                </td>
              </tr>
            }
            <tr>
              <td className="flex justify-left">
                <div className={classContainer}>
                  <button onClick={handleBridgePopup} className={classButton}>
                    <img src={SweepLogo} alt="logo" className="w-6 mr-1" />
                    <span>{languages.btn_sweep_bridge}</span>
                  </button>
                </div>
              </td>
              <td>
                <h1>{languages.text_bridge_sweep}</h1>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <div className="mb-4 md:flex sm:grid text-sm md:text-lg">
        <h1 className="release-title mr-2">Sweep token:</h1>
        <ExternalLink
          title={sweepAddress}
          link={scanLink(network, `address/${sweepAddress}`)}
        />
        {
          copiedText ?
            <h1 className="ml-2">Copied!</h1> :
            <DocumentDuplicateIcon
              className="h-6 w-6 text-white cursor-pointer ml-2"
              onClick={clickHandler}
            />
        }
      </div>
      <h1 className="font-archivo-regular mb-4 release-title">
        {languages.text_how_sweep_works}
      </h1>
      <h1 className="font-archivo-regular mb-6 release-title">
        {languages.text_asset_distribution}
      </h1>
    </div>
  )
}

export default SweepDescription;
