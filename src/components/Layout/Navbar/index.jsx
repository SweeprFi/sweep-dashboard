import { Link } from "react-router-dom"
import { useWallet } from "@utils/walletHelper";
import { Disclosure } from "@headlessui/react"
import { socialLinks } from "@config/constants";
import Disconnect from "@components/Layout/Disconnect";
import Connect from "@components/Layout/Connect";

import imgLogo from "@images/logo.svg";
import SweepLogo from "@images/icon_sweep.svg";

const Navbar = () => {
  const { connected } = useWallet();

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
                  {
                    socialLinks.map(item => (
                      <a key={item.link} href={item.link} target="_blank" rel="noreferrer">
                        <item.icon className="h-10 w-10 hover:drop-shadow-textShadow" />
                      </a>
                    ))
                  }
                </div>
                <div className="ml-6 flex justify-center items-center gap-4">
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