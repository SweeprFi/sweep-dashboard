import React from "react";

const StatusBadge = ({ status }) => {
  return (
    <div className={`${status.class} rounded-md px-3 lg:px-1 xl:px-2 2xl:px-3 py-1 text-xs font-archivo-semibold uppercase whitespace-nowrap`}>
      {status.name}
    </div>
  )
}

export default StatusBadge;