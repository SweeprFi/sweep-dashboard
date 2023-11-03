import React from "react";
import StatusBadge from "@components/StatusBadge";
import { assetLink } from "@utils/helper";
import { languages } from "@config/languages";
import { convertNumber } from "@utils/helper";
import imgLogo from "@images/logo.png";
import ExternalLink from "@components/ExternalLink";
import InternalLink from "@components/InternalLink";

const AssetItem = ({ data, chainId }) => {

  const LogoSweep = (props) => {
    return (
      <img src={imgLogo} className={props.className} alt="logo" />
    )
  }

  return (
    <div className="bg-app-black-light rounded-2xl lg:col-span-12">
      {/* Desktop Design */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-12 gap-2 px-6 py-3 text-lg">
          <div className="col-span-2 flex items-center font-archivo-semibold capitalize">
            {data.name}
          </div>
          <div className="col-span-2 flex items-center gap-2">
            <LogoSweep className="w-6" />
            <div className="leading-6">
              <span className="font-archivo-semibold">
                {convertNumber(data.borrowed_amount)}
              </span><br />
              <span className="whitespace-nowrap">
                / {convertNumber(data.loan_limit)}
              </span>
            </div>
          </div>
          <div className="col-span-2 flex items-center justify-end">
            <span>$</span>
            {convertNumber(data.current_value)}
          </div>
          <div className="col-span-1 flex items-center justify-end">
            {data.min_equity_ratio}
            %
          </div>
          <div className="col-span-1 flex items-center justify-end">
            {data.equity_ratio}
            %
          </div>
          <div className="col-span-1 flex items-center justify-end">
            <StatusBadge
              status={data.status}
            />
          </div>
          <div className="col-span-1 flex justify-end items-center text-sm whitespace-nowrap">
            {data.call_time}
          </div>
          <div className="col-span-1 flex justify-end items-center">
            {data.call_delay}
          </div>
          <div className="col-span-1 flex justify-center items-center gap-2">
            <LogoSweep className="w-6" />
            {convertNumber(data.call_amount)}
          </div>
        </div>
      </div>

      {/* Mobile Design */}
      <div className="flex lg:hidden flex-col p-6">
        <div className="flex justify-between items-center">
          <div className="text-xl">
            {data.name}
          </div>
          <StatusBadge
            status={data.status}
          />
        </div>
        <div className="flex justify-between mt-4">
          <div className="text-app-gray-dark">
            {languages.column_borrowed + '/' + languages.column_limit}
          </div>
          <div className="text-app-gray-dark">
            {languages.column_value}
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <LogoSweep className="w-6" />
            <div className="leading-6">
              <span className="font-archivo-semibold">
                {convertNumber(data.borrowed_amount)}
              </span><br />
              <span className="whitespace-nowrap">
                / {convertNumber(data.loan_limit)}
              </span>
            </div>
          </div>
          <div>
            ${convertNumber(data.current_value)}
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          <div>
            <div className="text-app-gray-dark">
              {languages.column_min_equity}
            </div>
            <div>
              {data.min_equity_ratio}%
            </div>
          </div>
          <div>
            <div className="text-app-gray-dark">
              {languages.column_equity}
            </div>
            <div>
              {data.equity_ratio}%
            </div>
          </div>
          <div>
            <div className="text-app-gray-dark">
              {languages.column_call_time}
            </div>
            <div>
              {data.call_time}
            </div>
          </div>
          <div>
            <div className="text-app-gray-dark">
              {languages.column_call_delay}
            </div>
            <div>
              {data.call_delay}
            </div>
          </div>
          <div>
            <div className="text-app-gray-dark">
              {languages.column_call_amount}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <LogoSweep className="w-6" />
              {data.call_amount}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row lg:items-center gap-4 lg:gap-8 px-6 pt-6 pb-6 lg:py-3 text-sm font-light bg-app-black-medium rounded-b-2xl">
        {
          data.link && (
            <ExternalLink title={languages.link_deal} link={data.link} />
          )
        }
        <InternalLink title={languages.link_asset} link={assetLink(data.address, chainId)} />
      </div>
    </div>
  )
}

export default AssetItem;