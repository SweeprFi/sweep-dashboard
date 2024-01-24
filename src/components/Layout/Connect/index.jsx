import { languages } from "@config/languages";
import { useWallet } from "@utils/walletHelper";

const Connect = () => {
  const { connectHandler } = useWallet();

  return (
    <div className="group inline-block rounded-full bg-white/20 p-1 hover:bg-rainbow">
      <div
        className="inline-block w-full rounded-full bg-rainbow p-0.5 group-hover:bg-black group-hover:bg-none"
        onClick={connectHandler}
      >
        <button className="flex w-full items-center justify-center space-x-1 rounded-full px-6 py-2 bg-white whitespace-nowrap">
          <span className="font-bold text-black group-active:text-black/70">{languages.btn_connect}</span>
        </button>
      </div>
    </div>
  )
}

export default Connect;