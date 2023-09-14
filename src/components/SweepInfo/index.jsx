import { languages } from "@config/languages"
import { convertNumber } from "@utils/helper";
import SweepLogo from "@images/icon_sweep.svg"
import SweepLogoWhite from "@images/logo.png"

const SweepInfo = ({ data }) => {
    const SweepItem = (props) => {
        return (
            <div className={`bg-app-sweepMetrics rounded-3xl p-8 flex flex-col justify-center items-start relative overflow-hidden ${props.className}`}>
                <div className="growing absolute top-0 left-0 w-full h-full p-[2px] rounded-3xl">
                    <div className="growing-inner w-full h-full"></div>
                </div>
                <h3 className="font-archivo-regular mt-2 text-app-gray-dark whitespace-nowrap text-sm sm:text-base lg:text-sm xl:text-base">
                    {props.label}
                </h3>
                <div className="flex items-center gap-4 text-3xl sm:text-4xl lg:text-3xl xl:text-4xl">
                    {
                        props.symbolLeft && props.symbolLeft
                    }
                    {props.value}
                    {
                        props.symbolRight && props.symbolRight
                    }
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="mb-3">
                <span className="uppercase bg-app-sweepMetrics py-1 px-2 rounded-lg">
                    {languages.text_sweep_title}
                </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-8 lg:grid-cols-14 xl:grid-cols-15 2xl:grid-cols-14 gap-4">
                <div className="sm:col-span-6 lg:col-span-6 xl:col-span-7 2xl:col-span-6 bg-app-sweepMetrics rounded-3xl p-8 flex justify-start items-center gap-6 relative overflow-hidden">
                    <div className="growing absolute top-0 left-0 w-full h-full p-[2px] rounded-3xl">
                        <div className="growing-inner-lg w-full h-full"></div>
                    </div>
                    <div className="sweep-circle relative w-12 h-12 sm:w-16 sm:h-16 lg:w-12 lg:h-12 xl:w-16 xl:h-16">
                        <div className="absolute left-0 top-0 w-1/2 h-full overflow-hidden z-10">
                            <div className="border-app-gray-light border-[8px] -rotate-180 left-full border-l-0 rounded-tr-[80px] rounded-br-[80px] w-full h-full absolute origin-center-left"></div>
                        </div>
                        <div className="absolute right-0 top-0 w-1/2 h-full overflow-hidden z-10">
                            <div className="border-app-gray-light border-[8px] -rotate-45 -left-full border-r-0 rounded-tl-[80px] rounded-bl-[80px] w-full h-full absolute origin-center-right"></div>
                        </div>
                        <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center z-20">
                            <img src={SweepLogoWhite} alt="logo" className="w-8 sm:w-12 lg:w-8 xl:w-12 border-[4px] border-app-gray rounded-full" />
                        </div>
                    </div>
                    <div className="flex justify-start items-center gap-4">
                        <div className="">
                            <h3 className="font-archivo-regular mt-2 text-app-gray-dark text-xs sm:text-base lg:text-sm xl:text-base whitespace-nowrap">
                                {languages.label_sweep_total}
                            </h3>
                            <div className="text-2xl sm:text-4xl lg:text-3xl xl:text-4xl">{convertNumber(data?.total_supply)}</div>
                        </div>
                        <div className="flex w-1 h-14 bg-app-gray-light rotate-12"></div>
                        <div className="ml-2">
                            <h3 className="font-archivo-regular mt-2 text-app-gray-dark text-xs sm:text-base lg:text-sm xl:text-base whitespace-nowrap">
                                {languages.label_sweep_local}
                            </h3>
                            <div className="text-2xl sm:text-4xl lg:text-3xl xl:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-app-red to-app-pink-light">
                                {convertNumber(data?.local_supply)}
                            </div>
                        </div>
                    </div>
                </div>
                <SweepItem
                    label={languages.label_interest_rate}
                    value={data?.interest_rate}
                    symbolRight="%"
                    className="sm:col-span-2 lg:col-span-2"
                />
                <SweepItem
                    label={languages.label_target_price}
                    value={data?.targe_price}
                    symbolLeft="$"
                    className="sm:col-span-4 lg:col-span-3"
                />
                <SweepItem
                    label={
                        languages.label_amm_price +
                        (data?.mint_status && ` - ${data.mint_status}`)
                    }
                    value={data?.amm_price}
                    symbolLeft="$"
                    className="sm:col-span-4 lg:col-span-3"
                />
            </div>
        </>
    )
}

export default SweepInfo;