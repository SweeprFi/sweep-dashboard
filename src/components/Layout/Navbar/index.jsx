import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import SelectBox from "@components/SelectBox";
import { socialLinks, chainList } from "@config/constants";
import { languages } from "@config/languages";
import { useWallet } from "@utils/walletHelper";
import { shortAddress } from "@utils/helper";
import imgLogo from "@images/logo.svg"
import {ReactComponent as BlockieIcon } from "@images/icon_blockies.svg"

const Navbar = () => {
  const { connected, connectHandler, walletAddress, chainId, setChain } = useWallet();
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
    <div className="w-full container mx-auto">
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <Link to="/">
          <img src={imgLogo} alt="logo" className="w-40" />
        </Link>
        <div className="flex w-full sm:w-1/2 justify-end content-center items-center mt-4 sm:mt-0 gap-2">
          {
            socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noreferrer"
              >
                <item.icon className="h-10 w-10 hover:drop-shadow-textShadow" />
              </a>
            ))
          }
          <div className="ml-6 flex justify-center items-center gap-4">
            {
              connected && (
                <div>
                  <SelectBox
                    title=""
                    data={chainList}
                    val={curtChain}
                    setVal={(e) => chainChange(e)}
                    onlyIcon={true}
                    pending={false}
                  />
                </div>
              )
            }
            {
              connected ? (
                <div className="flex justify-center items-center text-white gap-2">
                  <BlockieIcon className="w-6 h-6"/>
                  {shortAddress(walletAddress)}
                </div>
              ) : (
                <div className="group inline-block rounded-full bg-white/20 p-1 hover:bg-rainbow">
                  <div
                    className="inline-block w-full rounded-full bg-rainbow p-0.5 group-hover:bg-black group-hover:bg-none"
                    onClick={connectHandler}
                  >
                    <button className="flex w-full items-center justify-center space-x-1 rounded-full px-6 py-2 bg-white whitespace-nowrap">
                      <span class="font-bold text-black group-active:text-black/70">{languages.btn_connect}</span>
                    </button>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;