import { AMMLinks } from "@config/constants";
import { languages } from "@config/languages";

import { ArrowRightIcon } from '@heroicons/react/20/solid'
import { ReactComponent as BalancerIcon } from "@images/icons/balancer.svg";
import SweepLogo from "@images/icon_sweep.svg"

const DashboardButtons = (props) => {
  const { chain, sweepData, handleBuyPopup, handleBridgePopup } = props

  return (
    <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-start sm:items-center my-6 gap-3 sm:gap-6 mb-10">
      <div className="group inline-block rounded-full bg-white/20 p-1 hover:bg-rainbow w-full sm:w-auto">
        <a
          href={AMMLinks[chain.chainId].link}
          target="_blank"
          rel="noreferrer"
          className="inline-block w-full rounded-full bg-rainbow p-0.5 group-hover:bg-black group-hover:bg-none"
        >
          <button className="flex w-full items-center justify-center gap-1 space-x-1 rounded-full px-6 py-2 bg-white text-black whitespace-nowrap">
            <BalancerIcon className="w-6 h-6" />
            <span>
              {AMMLinks[chain.chainId].title}
            </span>
            <ArrowRightIcon className="-rotate-45 w-6 h-6" />
          </button>
        </a>
      </div>
      <>
        {
          // Hide buy button when mint not allowed.
          (!!sweepData && sweepData?.mint_status === 0) && (
            <div className="group inline-block rounded-full bg-white/20 p-1 hover:bg-rainbow w-full sm:w-auto">
              <div
                className="inline-block w-full rounded-full bg-rainbow p-0.5 group-hover:bg-black group-hover:bg-none"
              >
                <button
                  onClick={handleBuyPopup}
                  className="flex w-full items-center justify-center gap-1 space-x-1 rounded-full px-6 py-2 bg-white text-black whitespace-nowrap"
                >
                  <img src={SweepLogo} alt="logo" className="w-6 mr-1" />
                  <span>{`${languages.btn_buy_sweep_on_market} $ ${sweepData?.market_price || 1}`}</span>
                </button>
              </div>
            </div>
          )
        }
        <div className="group inline-block rounded-full bg-white/20 p-1 hover:bg-rainbow w-full sm:w-auto">
          <div
            className="inline-block w-full rounded-full bg-rainbow p-0.5 group-hover:bg-black group-hover:bg-none"
          >
            <button
              onClick={() => handleBridgePopup('sweep')}
              className="flex w-full items-center justify-center gap-1 space-x-1 rounded-full px-6 py-2 bg-white text-black whitespace-nowrap"
            >
              <img src={SweepLogo} alt="logo" className="w-6 mr-1" />
              <span>
                {languages.btn_sweep_bridge}
              </span>
            </button>
          </div>
        </div>
      </>
    </div>
  )
}

export default DashboardButtons;