import { Link } from "react-router-dom"
import { socialLinks } from "@utils/constants";
import { ReactComponent as LogoIcon } from "@images/logo.svg"

const Navbar = () => {
  return (
    <div className="w-full container mx-auto">
      <div className="w-full flex items-center justify-between">
        <Link to="/">
          <LogoIcon/>
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
                <img src={item.icon} className="w-7" alt="icon"/>
              </a>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar;