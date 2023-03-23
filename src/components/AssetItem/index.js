import React from "react";
import { Link } from "react-router-dom";
import StatusBadge from "@components/StatusBadge";
import { assetName, scanLink } from "@utils/helper";
import { ReactComponent as LogoSweep } from "@images/logo.svg";
import { ReactComponent as IconLink } from "@images/icon_link.svg";

const AssetItem = ({ data }) => {
  const status = data.current_value > 0 ? "good" : "none";

  return (
    <div className="bg-app-blue-light rounded-md">
      <Link
        to={`/asset/${data.name}/${data.address}`}
      >
        <div className="grid grid-cols-12 gap-2 px-6 py-3 text-lg">
          <div className="col-span-2 flex items-center uppercase">
            {assetName(data.name)}
          </div>
          <div className="col-span-2 flex items-center gap-2">
            <LogoSweep className="w-6" />
            {data.borrowed_amount}/{data.loan_limit}
          </div>
          <div className="col-span-1 flex items-center gap-2">
            <LogoSweep className="w-6" />
            {data.current_value}
          </div>
          <div className="col-span-2 flex items-center">
            {data.min_equity_ratio}
          </div>
          <div className="col-span-1 flex items-center">
            {data.equity_ratio}
          </div>
          <div className="col-span-1 flex items-center">
            <StatusBadge
              status={status}
            />
          </div>
          <div className="col-span-1 flex items-center">
            {data.call_time}
          </div>
          <div className="col-span-1 flex items-center">
            {data.call_delay}
          </div>
          <div className="col-span-1 flex items-center">
            {data.call_amount}
          </div>
        </div>
      </Link>
      <hr className="border-app-blue-dark" />
      <div className="flex items-center gap-8 px-6 py-3 text-sm font-light">
        {
          data.link && (
            <div className="flex items-center gap-2">
              Visit Borrower Website
              <a href={data.link} target="_blank" rel="noreferrer">
                <IconLink className="transform hover:scale-105 duration-75"/>
              </a>
            </div>
          )
        }
        {
          data.borrower && (
            <div className="flex items-center gap-2">
              Borrower Activity
              <a href={scanLink(data.borrower)} target="_blank" rel="noreferrer">
                <IconLink className="transform hover:scale-105 duration-75"/>
              </a>
            </div>
          )
        }
        <div className="flex items-center gap-2">
          Stabilizer Contract
          <a href={scanLink(data.address)} target="_blank" rel="noreferrer">
            <IconLink className="transform hover:scale-105 duration-75"/>
          </a>
        </div>
      </div>
    </div>
  )
}

export default AssetItem;