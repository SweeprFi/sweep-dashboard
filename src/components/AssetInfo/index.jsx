import { languages } from "@config/languages"
import AssetItem from "@components/AssetItem";

const AssetInfo = ({ data }) => {
    return (
        <div className="bg-asset pt-8 sm:pt-12 mt-12 sm:mt-16">
            <span className="uppercase bg-app-sweepMetrics py-1 px-2 rounded-lg">
                {languages.text_assets_title}
            </span>
            {
                data.length > 0 ? (
                    <div className="flex flex-col gap-4 w-full pb-12 pt-4">
                        <div className="lg:grid grid-cols-12 gap-2 px-6 font-archivo-regular hidden text-app-gray-dark">
                            <div className="col-span-2 flex items-end">
                                {languages.column_name}
                            </div>
                            <div className="col-span-2 flex items-end">
                                {languages.column_borrowed}/{languages.column_limit}
                            </div>
                            <div className="col-span-2 flex items-end justify-end">
                                {languages.column_value}
                            </div>
                            <div className="col-span-1 flex items-end justify-end">
                                {languages.column_min_equity}
                            </div>
                            <div className="col-span-1 flex items-end justify-end">
                                {languages.column_equity}
                            </div>
                            <div className="col-span-1 flex items-end justify-end">
                                {languages.column_status}
                            </div>
                            <div className="col-span-1 flex items-end justify-end">
                                {languages.column_call_time}
                            </div>
                            <div className="col-span-1 flex items-end justify-end">
                                {languages.column_call_delay}
                            </div>
                            <div className="col-span-1 flex items-end justify-end">
                                {languages.column_call_amount}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-4">
                            {
                                data?.map((item, index) => (
                                    <AssetItem
                                        key={index}
                                        data={item}
                                    />
                                ))
                            }
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        {languages.text_empty_asset}
                    </div>
                )
            }
        </div>
    )
}

export default AssetInfo;