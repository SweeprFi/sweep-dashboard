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
                    <div className="sweepr-circle relative w-12 h-12 sm:w-16 sm:h-16 lg:w-12 lg:h-12 xl:w-16 xl:h-16">
                        <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden z-10">
                            <div className="border-app-gray-light border-[8px] -rotate-180 left-full border-l-0 rounded-tr-[80px] rounded-br-[80px] w-full h-full absolute origin-center-left"></div>
                        </div>
                        <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden z-10">
                            <div className="border-app-gray-light border-[8px] -rotate-45 -left-full border-r-0 rounded-tl-[80px] rounded-bl-[80px] w-full h-full absolute origin-center-right"></div>
                        </div>
                        <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center z-20">
                            <img src={SweeprLogo} alt="logo" className="w-8 sm:w-12 lg:w-8 xl:w-12 border-[4px] border-app-gray rounded-full" />
                        </div>
                    </div>
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
                            <div className="text-2xl sm:text-4xl lg:text-3xl xl:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-white to-app-gray-light">
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