import { useCallback, useEffect, useState } from "react";
import { useWallet } from "@utils/walletHelper";
import { Link } from "react-router-dom"
import { Disclosure } from "@headlessui/react"
import SelectBox from "@components/SelectBox";
import Disconnect from "@components/Layout/Disconnect";
import { socialLinks, chainList } from "@config/constants";
import { languages } from "@config/languages";

import imgLogo from "@images/logo.svg"
import SweepLogo from "@images/icon_sweep.svg"
import { ReactComponent as BlockieIcon } from "@images/icon_blockies.svg"

const Navbar = () => {
  const { connected, connectHandler, chainId, setChain } = useWallet();
  const [curtChain, setCurtChain] = useState(chainList[0]);

  useEffect(() => {
    const chain = chainList.filter((e) => e.chainId === chainId);
    setCurtChain(chain[0])
  }, [chainId, setCurtChain])

  const chainChange = useCallback(async (e) => {
    const re = await setChain({ chainId: e.chainId });
    if (re) setCurtChain(e);
  }, [setChain, setCurtChain])

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
                  {
                    connected ? (
                      <>
                        <div>
                          <SelectBox
                            title=""
                            data={chainList}
                            val={curtChain}
                            setVal={(e) => chainChange(e)}
                            onlyIcon={true}
                            pending={false}
                            bg={true}
                          />
                        </div>
                        <div className="flex justify-center items-center text-white gap-2">
                          <BlockieIcon className="w-6 h-6" />
                          <Disconnect/>
                        </div>
                      </>
                    ) : (
                      <div className="group inline-block rounded-full bg-white/20 p-1 hover:bg-rainbow">
                        <div
                          className="inline-block w-full rounded-full bg-rainbow p-0.5 group-hover:bg-black group-hover:bg-none"
                          onClick={connectHandler}
                        >
                          <button className="flex w-full items-center justify-center space-x-1 rounded-full px-6 py-2 bg-white whitespace-nowrap">
                            <span className="font-bold text-black group-active:text-black/70">{languages.btn_connect}</span>
                          </button>
                        </div>
                      </div>
                    )
                  }
                </div>
              </div>
              <Disclosure.Panel className="bg-app-gray-light border-app-gray-dark border-b-2 absolute w-full left-0 top-0 z-20">
                <div className="flex flex-col justify-center items-center pt-14 pb-8">
                  <div className="ml-6 flex justify-center items-center gap-4">
                    {
                      connected ? (
                        <>
                          <div>
                            <SelectBox
                              title=""
                              data={chainList}
                              val={curtChain}
                              setVal={(e) => chainChange(e)}
                              onlyIcon={true}
                              pending={false}
                              bg={true}
                            />
                          </div>
                          <div className="flex justify-center px-2 py-2 rounded-xl items-center text-white gap-2">
                            <BlockieIcon className="w-6 h-6" />
                            <Disconnect/>
                          </div>
                        </>
                      ) : (
                        <div className="group inline-block rounded-full bg-white/20 p-1 hover:bg-rainbow">
                          <div
                            className="inline-block w-full rounded-full bg-rainbow p-0.5 group-hover:bg-black group-hover:bg-none"
                            onClick={connectHandler}
                          >
                            <button className="flex w-full items-center justify-center space-x-1 rounded-full px-6 py-2 bg-white whitespace-nowrap">
                              <span className="font-bold text-black group-active:text-black/70">{languages.btn_connect}</span>
                            </button>
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              </Disclosure.Panel>
            </div>
          </div>
        </div>
      )}
    </Disclosure>
  )
}

export default Navbar;