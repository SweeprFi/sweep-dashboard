import { languages } from "@config/languages"
import { convertNumber } from "@utils/helper";
import SweeprLogo from "@images/icon_sweepr.png"

const SweeprInfo = ({ data, connected, setIsOpen, setSelectedToken }) => {
    return (
        <div className="w-full border border-app-gray-light rounded-3xl p-6 mt-2 sm:mt-6">
            <div className="mb-3">
                <span className="uppercase bg-app-sweepMetrics py-1 px-2 rounded-lg">
                    {languages.text_sweepr_title}
                </span>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="bg-app-sweepMetrics rounded-3xl p-8 flex justify-start items-center gap-6 relative overflow-hidden">
                    <div className="growing absolute top-0 left-0 w-full h-full p-[2px] rounded-3xl">
                        <div className="growing-inner-lg w-full h-full"></div>
                    </div>
                    <img src={SweeprLogo} alt="logo" className="w-10 sm:w-14 lg:w-10 xl:w-14 rounded-full" />
                    <div className="flex justify-start items-center gap-4">
                        <div className="">
                            <h3 className="font-archivo-regular mt-2 text-app-gray-dark text-xs sm:text-base lg:text-sm xl:text-base whitespace-nowrap">
                                {languages.label_sweepr_total}
                            </h3>
                            <div className="text-2xl sm:text-4xl lg:text-3xl xl:text-4xl">{convertNumber(data?.total_supply)}</div>
                        </div>
                        <div className="flex w-1 h-14 bg-app-gray-light rotate-12"></div>
                        <div className="ml-2">
                            <h3 className="font-archivo-regular mt-2 text-app-gray-dark text-xs sm:text-base lg:text-sm xl:text-base whitespace-nowrap">
                                {languages.label_sweepr_local}
                            </h3>
                            <div className="text-2xl sm:text-4xl lg:text-3xl xl:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200">
                                {convertNumber(data?.local_supply)}
                            </div>
                        </div>
                    </div>
                </div>
                {
                    connected && (
                        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                            <div className="group inline-block rounded-full bg-white/20 p-1 hover:bg-sweepr w-full">
                                <div
                                    className="inline-block w-full rounded-full bg-sweepr p-0.5 group-hover:bg-black group-hover:bg-none"
                                >
                                    <button
                                        onClick={() => { setIsOpen(true); setSelectedToken('sweepr'); }}
                                        className="flex w-full items-center justify-center gap-1 space-x-1 rounded-full px-16 py-3 bg-black text-white whitespace-nowrap"
                                    >
                                        <img src={SweeprLogo} alt="logo" className="w-6 mr-1" />
                                        <span>
                                            {languages.btn_sweepr_bridge}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SweeprInfo;