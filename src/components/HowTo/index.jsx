import { stabilizers } from "@utils/functions";
import { languages } from "@config/languages";

const HowTo = (props) => {
  const functions = stabilizers[props.name] || [];

  return (
    <div className="grid">
      <div className="sm:col-span-6 lg:col-span-6 xl:col-span-7 bg-app-sweepMetrics rounded-3xl p-8 items-center gap-6 relative overflow-hidden">
        <span className="uppercase text-white bg-app-sweepMetrics py-1 px-2 rounded-lg bg-gradient-to-r from-app-red to-app-pink-light">
          {languages.text_how_to}
        </span>
        <div>
          {
            functions.map((fun, i) => {
              return (
                <div key={i} className="p-3">
                  <h3 className="uppercase text-app-red">{fun.name}</h3>
                  <div>
                    <i className="text-app-gray">{fun.description}</i>
                    <div>
                      {
                        fun.params.map((param, j) => {
                          return (
                            <div key={j}>
                              <span className="font-archivo-bold">{param.name}: </span>
                              <i className="text-app-gray">{param.description}</i>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default HowTo;
