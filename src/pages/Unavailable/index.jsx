import { languages } from "@config/languages";

const PageUnavailable = () => {
  return (
    <div className="flex justify-center items-center w-full h-full top-0 left-0">
      <div className="flex flex-col items-center">
        <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-bold uppercase font-nidus_sans__reguar tracking-widest">
          {languages.text_page_unavailable}
        </h1>
      </div>
    </div>
  )
}

export default PageUnavailable;