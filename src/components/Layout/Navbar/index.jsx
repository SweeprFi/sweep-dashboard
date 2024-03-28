import { Link } from "react-router-dom"
import { useWallet } from "@utils/walletHelper";
import { Disclosure } from "@headlessui/react"
import { AMMLinks } from "@config/constants";

import Disconnect from "@components/Layout/Disconnect";
import Connect from "@components/Layout/Connect";

import imgLogo from "@images/logo.svg";
import SweepLogo from "@images/icon_sweep.svg";
import LiFiIcon from "@images/icons/lifi.svg";
import BridgeIcon from "@images/icons/bridge.svg";

const Navbar = () => {
  const { connected, chainId } = useWallet();

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <div className="w-full container mx-auto">
          <div className="w-full flex items-center justify-between px-4">
            <Link to="/">
              <img src={imgLogo} alt="logo" className="w-40 hidden sm:block" />
              <img src={SweepLogo} alt="logo" className="w-10 sm:hidden" />
            </Link>
            <div className="flex w-full sm:w-2/3 justify-end items-center sm:mt-0 gap-2">
              <div className="flex justify-end items-center gap-2 w-full">
                <div className="md:flex justify-end items-center gap-2 hidden">
                  <a href={AMMLinks[chainId].link} target="_blank" rel="noreferrer" className="rounded-3xl p-1.5 border border-app-black-light">
                    <img src={AMMLinks[chainId].icon} alt="logo" className="h-6 w-6 hover:drop-shadow-textShadow text-black	" />
                  </a>
                  <Link to="/swap/" className="rounded-3xl p-1.5 border border-app-black-light">
                    <img src={LiFiIcon} alt="logo" className="h-6 w-6 hover:drop-shadow-textShadow text-black	" />
                  </Link>
                  <Link to="/move" className="rounded-3xl p-1.5 border border-app-black-light">
                    <img src={BridgeIcon} alt="logo" className="h-6 w-6 hover:drop-shadow-textShadow text-black	" />
                  </Link>
                </div>
                <div className="flex justify-center items-center gap-4">
                  {connected ? <Disconnect /> : <Connect />}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Disclosure>
  )
}

export default Navbar;