import React from "react";
import StatusBadge from "@components/StatusBadge";
import { assetName, scanLink } from "@utils/helper";
import { languages } from "@config/languages";
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
            props.symbolLeft && props.symbolLeft
          }
          {props.value}
          {
            props.symbolRight && props.symbolRight
          }
        </div>
        {
          props.badge && props.badge
        }
      </div>
    )
  }

  const AssetLink = (props) => {
    return (
      <a href={props.link} className="flex items-center gap-2 hover:underline" target="_blank" rel="noreferrer">
        {props.title}
        <IconLink />
      </a>
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
          <div className="col-span-2 flex items-center">
            <span>$</span>
            {data.current_value}
          </div>
          <div className="col-span-1 flex items-center">
            {data.min_equity_ratio}
            %
          </div>
          <div className="col-span-1 flex items-center">
            {data.equity_ratio}
            %
          </div>
          <div className="col-span-1 flex items-center">
            <StatusBadge
              status={data.status}
            />
          </div>
          <div className="col-span-1 flex items-center">
            {data.call_time}
          </div>
          <div className="col-span-1 flex items-center">
            {data.call_delay}
          </div>
          <div className="col-span-1 flex items-center gap-2">
            <LogoSweep className="w-6" />
            {data.call_amount}
          </div>
        </div>
      </div>

      {/* Mobile Design */}
      <div className="flex lg:hidden flex-col gap-2 p-6">
        <Row
          title={languages.column_name}
          value={assetName(data.name)}
        />
        <Row
          title={languages.column_borrowed + '/' + languages.column_limit}
          value={data.borrowed_amount + '/' + data.loan_limit}
          symbolLeft={
            <LogoSweep className="w-6" />
          }
        />
        <Row
          title={languages.column_value}
          value={data.current_value}
          symbolLeft="$"
        />
        <Row
          title={languages.column_min_equity}
          value={data.min_equity_ratio}
          symbolRight="%"
        />
        <Row
          title={languages.column_equity}
          value={data.equity_ratio}
          symbolRight="%"
        />
        <Row
          title={languages.column_status}
          badge={
            <StatusBadge
              status={data.status}
            />
          }
        />
        <Row
          title={languages.column_call_time}
          value={data.call_time}
        />
        <Row
          title={languages.column_call_delay}
          value={data.call_delay}
        />
        <Row
          title={languages.column_call_amount}
          value={data.call_amount}
          symbolLeft={
            <LogoSweep className="w-6" />
          }
        />
      </div>

      <hr className="border-app-blue-dark" />

      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 px-6 pt-4 pb-8 lg:py-3 text-sm font-light">
        {
          data.link && (
            <AssetLink
              title={languages.link_deal}
              link={data.link}
            />
          )
        }
        {
          data.borrower && (
            <AssetLink
              title={languages.link_borrower}
              link={scanLink(data.borrower)}
            />
          )
        }
        <AssetLink
          title={languages.link_stabilizer}
          link={scanLink(data.address)}
        />
      </div>
    </div>
  )
}

export default AssetItem;