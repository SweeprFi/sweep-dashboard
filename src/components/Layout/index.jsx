import Navbar from "./Navbar"
import { languages } from "@config/languages";
import { socialLinks } from "@config/constants";

const Layout = ({ children }) => {
  return (
    <div className="relative bg-black text-white font-archivo-regular">
      <div className="h-full pt-6 min-h-screen flex flex-col">
        <Navbar />
        <div className="container sm:pt-6 mx-auto pb-8 flex-1">
          {children}
        </div>
        <footer class="bg-footer">
          <div class="container mx-auto py-12 lg:flex lg:flex-row-reverse lg:items-center lg:justify-between">
            <div class="-ml-4 -mt-1 flex flex-wrap items-center justify-center gap-3">
              {
                socialLinks.map((item, index) => (
                  <a
                    key={index}
                    href={item.link}
                    className="flex items-center justify-center gap-1 group"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <item.icon className="h-10 w-10 group-hover:drop-shadow-textShadow" />
                    <span className="text-sm font-normal tracking-[0.28px] text-white/80 group-hover:drop-shadow-textShadow">{ item.name }</span>
                  </a>
                ))
              }
            </div>
            <div class="mt-4 text-center text-sm font-normal tracking-[0.28px] text-white/80 lg:mt-0">
              {languages.text_copyright}
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Layout;