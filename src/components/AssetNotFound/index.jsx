import "@styles/Asset.css";
import { Link } from 'react-router-dom'
import { languages } from "@config/languages";

const AssetNotFound = () => {
  return (
    <div className="flex justify-center flex-col items-center main-container">
      <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold uppercase font-nidus_sans__reguar tracking-widest">
        {languages.text_asset_not_found}
      </h1>
      <br/>
      <h2 className="text-white text-xl sm:text-2xl lg:text-3xl font-nidus_sans__reguar tracking-widest">
        {languages.subtext_asset_not_found}
      </h2>
      <div className="mt-6">
        <Link to="/" className="text-green text-xl sm:text-2xl underline uppercase font-nidus_sans__reguar tracking-widest cursor-pointer">
          {languages.link_go_home}
        </Link>
      </div>      
    </div>
  )
}

export default AssetNotFound;