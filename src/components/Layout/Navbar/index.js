import { Link } from "react-router-dom"
import { socialLinks } from "@config/constants";
import { languages } from "@config/languages";
import { useWallet } from "@utils/walletHelper";
import { shortAddress } from "@utils/helper";
import imgLogo from "@images/logo_title.png"

const Navbar = () => {
  const { connected, connectHandler, walletAddress } = useWallet();

  return (
    <div className="w-full container mx-auto">
      <div className="w-full flex items-center justify-between">
        <Link to="/">
          <img src={imgLogo} alt="logo" className="w-40" />
        </Link>
        <div className="flex w-1/2 justify-end content-center items-center">
          {
            socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="p-2 md:p-3 transform hover:scale-125 duration-300 ease-in-out"
                target="_blank"
                rel="noreferrer"
              >
                <img src={item.icon} className="w-7" alt="icon" />
              </a>
            ))
          }
          <div className="ml-6">
            {
              connected ? (
                <div className="bg-white text-black py-1 px-4 rounded-md">
                  { shortAddress(walletAddress) }
                </div>
              ) : (
                <div
                  className="bg-white text-black py-1 px-4 rounded-md font-archivo-semibold cursor-pointer hover:scale-105 transform duration-200"
                  onClick={connectHandler}
                >
                  { languages.btn_connect }
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