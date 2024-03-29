import { languages } from "@config/languages";
import { socialLinks } from "@config/constants";

const Footer = () => {
  return (
    <footer className="bg-footer">
      <div className="container mx-auto py-12 lg:flex lg:flex-row-reverse lg:items-center lg:justify-between">
        <div className="-ml-4 -mt-1 flex flex-wrap items-center justify-center gap-3">
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
                <span className="text-sm font-normal tracking-[0.28px] text-white/80 group-hover:drop-shadow-textShadow">{item.name}</span>
              </a>
            ))
          }
        </div>
        <div className="mt-4 text-center text-sm font-normal tracking-[0.28px] text-white/80 lg:mt-0">
          {languages.text_copyright}
        </div>
      </div>
    </footer>
  )
}

export default Footer;