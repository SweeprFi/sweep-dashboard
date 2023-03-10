import "@styles/Loader.css";

const Loader = () => {
  return (
    <div className="w-full h-full absolute left-0 top-0 flex justify-center items-center loader">
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  );
}

export default Loader;