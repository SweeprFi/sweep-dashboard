import "@styles/Loader.css";
import imgLogo from "@images/logo.png";

const Loader = () => {
  return (
    <div className="loader-bg">
      <div className="loader">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <img src={imgLogo} alt="img" className="img-loader" />
    </div>
  );
}

export default Loader;