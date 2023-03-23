import React from "react";
import StatusBadge from "@components/StatusBadge";
import { assetName, scanLink } from "@utils/helper";
import { ReactComponent as LogoSweep } from "@images/logo.svg";
import { ReactComponent as IconLink } from "@images/icon_link.svg";

const AssetItem = ({ data }) => {
  const Row = (props) => {
    return (
      <div className="flex justify-between items-center">
        <span className="uppercase font-medium">
          {props.title}
        </span>
        <div className="uppercase flex items-center gap-2 text-xl font-medium">
          {
            props.symbol && props.symbol
          }
          {props.value}
        </div>
        {
          props.badge && props.badge
        }
      </div>
    )
  }

  return (
    <div className="bg-app-blue-light rounded-md lg:col-span-12">

      {/* Desktop Design */}
      <div className="hidden lg:block">
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
              isDefaulted={data.is_defaulted}
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
      </div>

      {/* Mobile Design */}
      <div className="flex lg:hidden flex-col gap-2 p-6">
        <Row
          title="Name"
          value={assetName(data.name)}
        />
        <Row
          title="Borrowed/Limit"
          value={data.borrowed_amount + '/' + data.loan_limit}
          symbol={
            <LogoSweep className="w-6" />
          }
        />
        <Row
          title="Value"
          value={data.current_value}
          symbol={
            <LogoSweep className="w-6" />
          }
        />
        <Row
          title="Min. Equity Ratio"
          value={data.min_equity_ratio}
        />
        <Row
          title="Equity Ratio"
          value={data.equity_ratio}
        />
        <Row
          title="Status"
          badge={
            <StatusBadge
              isDefaulted={data.is_defaulted}
            />
          }
        />
        <Row
          title="Call Time"
          value={data.call_time}
        />
        <Row
          title="Call Delay"
          value={data.call_delay}
        />
        <Row
          title="Call Amount"
          value={data.call_amount}
        />
      </div>

      <hr className="border-app-blue-dark" />

      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 px-6 pt-4 pb-8 lg:py-3 text-sm font-light">
        {
          data.link && (
            <div className="flex items-center gap-2">
              Visit Borrower Website
              <a href={data.link} target="_blank" rel="noreferrer">
                <IconLink className="transform hover:scale-105 duration-75" />
              </a>
            </div>
          )
        }
        {
          data.borrower && (
            <div className="flex items-center gap-2">
              Borrower Activity
              <a href={scanLink(data.borrower)} target="_blank" rel="noreferrer">
                <IconLink className="transform hover:scale-105 duration-75" />
              </a>
            </div>
          )
        }
        <div className="flex items-center gap-2">
          Stabilizer Contract
          <a href={scanLink(data.address)} target="_blank" rel="noreferrer">
            <IconLink className="transform hover:scale-105 duration-75" />
          </a>
        </div>
      </div>
    </div>
  )
}

export default AssetItem;