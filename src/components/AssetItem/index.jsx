import React from "react";
import StatusBadge from "@components/StatusBadge";
import { assetName, scanLink } from "@utils/helper";
import { useWallet } from "@utils/walletHelper";
import { languages } from "@config/languages";
import { convertNumber } from "@utils/helper";
import imgLogo from "@images/logo.png";
import { ArrowRightIcon } from '@heroicons/react/20/solid'

const AssetItem = ({ data }) => {
  const { chainId } = useWallet();

  const Row = (props) => {
    return (
      <div className="flex justify-between items-center">
        <span className="font-medium capitalize">
          {props.title}
        </span>
        <div className={`capitalize flex items-center font-medium ${props.class ? props.class : "text-base sm:text-lg"}`}>
          {
            props.symbolLeft && props.symbolLeft
          }
          <div className="leading-6">
            {props.value}
            {
              props.value2 && (
                <>
                  <br />
                  {
                    props.value2
                  }
                </>
              )
            }
          </div>
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
      <a href={props.link} className="flex items-center font-archivo-light gap-1 hover:underline text-app-gray-dark hover:text-white" target="_blank" rel="noreferrer">
        {props.title}
        <ArrowRightIcon className="-rotate-45 w-5 h-5" />
      </a>
    )
  }

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
            {assetName(data.name)}
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
          <div className="col-span-1 flex justify-end items-center">
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
      <div className="flex lg:hidden flex-col gap-2 p-6">
        <Row
          title={languages.column_name}
          value={assetName(data.name)}
        />
        <Row
          title={languages.column_borrowed + '/' + languages.column_limit}
          value={convertNumber(data.borrowed_amount)}
          value2={'/ ' + convertNumber(data.loan_limit)}
          symbolLeft={
            <LogoSweep className="w-6" />
          }
          class="gap-2"
        />
        <Row
          title={languages.column_value}
          value={convertNumber(data.current_value)}
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
          class="gap-2"
        />
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-8 px-6 pt-4 pb-8 lg:py-3 text-sm font-light bg-app-black-medium rounded-b-2xl">
        {
          data.link && (
            <AssetLink
              title={languages.link_deal}
              link={data.link}
            />
          )
        }
        <AssetLink
          title={languages.link_stabilizer}
          link={scanLink(chainId, data.address)}
        />
      </div>
    </div>
  )
}

export default AssetItem;