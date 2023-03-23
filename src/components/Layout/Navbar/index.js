import { Link } from "react-router-dom"
import { ReactComponent as LogoIcon } from "@images/logo.svg"
import { ReactComponent as TwitterIcon } from "@images/icon_twitter.svg"
import { ReactComponent as DiscordIcon } from "@images/icon_discord.svg"

const Navbar = () => {
  return (
    <div className="w-full container mx-auto">
      <div className="w-full flex items-center justify-between">
        <Link to="/">
          <LogoIcon/>
        </Link>
        <div className="flex w-1/2 justify-end content-center items-center">
          <a href="https://twitter.com/maxoslabs" className="p-2 md:p-3 transform hover:scale-125 duration-300 ease-in-out" target="_blank" rel="noreferrer">
            <TwitterIcon className="w-7"/>
          </a>
          <a href="https://github.com/MaxosLabs/" className="p-2 md:p-3 transform hover:scale-125 duration-300 ease-in-out" target="_blank" rel="noreferrer">
            <DiscordIcon className="w-7"/>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Navbar;