import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom"
import SelectBox from "@components/SelectBox";
import { socialLinks, chainList } from "@config/constants";
import { languages } from "@config/languages";
import { useWallet } from "@utils/walletHelper";
import { shortAddress } from "@utils/helper";
import imgLogo from "@images/logo.svg"

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
        <div className="flex w-full sm:w-1/2 justify-end content-center items-center mt-4 sm:mt-0">
          {
            socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="p-2 md:p-3 transform hover:scale-125 duration-300 ease-in-out hidden md:block"
                target="_blank"
                rel="noreferrer"
              >
                <img src={item.icon} className="w-7" alt="icon" />
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
                <div className="bg-white text-black py-1 px-4 rounded-md">
                  {shortAddress(walletAddress)}
                </div>
              ) : (
                <div
                  className="bg-white text-black py-1 px-4 rounded-md font-archivo-semibold cursor-pointer hover:scale-105 transform duration-200"
                  onClick={connectHandler}
                >
                  {languages.btn_connect}
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