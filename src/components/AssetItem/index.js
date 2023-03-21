import React from "react";
import { Link } from "react-router-dom";

const AssetItem = ({ data }) => {
  const assetName = (name) => {
    return name.replace('_', ' ');
  }

  return (
    <Link
      to={`/asset/${data.name}/${data.address}`}
      className="flex flex-col bg-white hover:bg-gray-700 text-black hover:text-white px-6 py-3 rounded-md cursor-pointer"
    >
      <div>
        Name:
        <span className="ml-2 uppercase">
          {assetName(data.name)}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center">
        <div className="flex items-center">
          Borrowed Amount:
          <div className="ml-2">
            {data.borrowed_amount}
          </div>
        </div>
        <div className="flex items-center sm:ml-4">
          Loan Limit:
          <div className="ml-2">
            {data.loan_limit}
          </div>
        </div>
        {
          data.is_defaulted && (
            <div className="sm:ml-4 text-red-600">
              In default
            </div>
          )
        }
        {
          data.is_marginCall && (
            <div className="sm:ml-4 text-red-600">
              Call amount
            </div>
          )
        }
      </div>
    </Link>
  )
}

export default AssetItem;