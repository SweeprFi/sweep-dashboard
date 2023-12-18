import { languages } from "@config/languages";

const SweepDescription = ({ marketPrice }) => {
  const classButton = "flex w-full items-center justify-center gap-1 space-x-1 rounded-full px-6 py-2 bg-white text-black whitespace-nowrap";

  const handle = () => { console.log("click") }

  return (
    <div className="my-12">
      <h1 className="font-archivo-regular mb-4 release-title">
        {languages.text_how_sweep_works}
      </h1>

      <div>
        <table>
          <tbody>
            <tr>
              <td className="flex justify-center">
                <div className="group inline-block rounded-full bg-white/20 p-1 hover:bg-rainbow w-full sm:w-auto">
                  <button onClick={handle} className={classButton}>
                    <span>{languages.btn_swap_balancer}</span>
                  </button>
                </div>
              </td>
              <td>
                <h1>{languages.text_swap_sweep}</h1>
              </td>
            </tr>
            <tr>
              <td className="flex justify-center">
                <div className="group inline-block rounded-full bg-white/20 p-1 hover:bg-rainbow w-full sm:w-auto">
                  <button onClick={handle} className={classButton}>
                    <span>{languages.btn_buy_sweep_on_market + ' $' + marketPrice}</span>
                  </button>
                </div>
              </td>
              <td>
                <h1>{languages.text_buy_at}</h1>
              </td>
            </tr>
            <tr>
              <td className="flex justify-center">
                <div className="group inline-block rounded-full bg-white/20 p-1 hover:bg-rainbow w-full sm:w-auto">
                  <button onClick={handle} className={classButton}>
                    <span>{languages.btn_sweep_bridge}</span>
                  </button>
                </div>
              </td>
              <td>
                <h1>{languages.text_bridge_sweep}</h1>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h1 className="font-archivo-regular my-6 release-title">
        {languages.text_asset_distribution}
      </h1>
    </div>
  )
}

export default SweepDescription;
