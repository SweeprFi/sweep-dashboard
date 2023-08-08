import Navbar from "./Navbar"
import { socialLinks } from "@config/constants";

const Layout = ({ children }) => {
  return (
    <div className="relative bg-black text-white font-archivo-regular">
      <div className="h-full p-6 min-h-screen">
        <Navbar />
        <div className="container sm:pt-6 mx-auto">
          {children}
        </div>
        <div className="flex w-full justify-center content-center items-center gap-4">
          {
            socialLinks.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="p-2 md:p-3 transform hover:scale-125 duration-300 ease-in-out md:hidden"
                target="_blank"
                rel="noreferrer"
              >
                <img src={item.icon} className="w-7" alt="icon" />
              </a>
            ))
          }
          </div>
      </div>
    </div>
  )
}

export default Layout;