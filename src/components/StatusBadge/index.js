import React from "react";

const StatusBadge = ({ status }) => {
  return (
    <div className={`${status.class} rounded-xl px-4 lg:px-1 xl:px-2 2xl:px-4 py-1 text-xs font-medium uppercase whitespace-nowrap`}>
      {status.name}
    </div>
  )
}

export default StatusBadge;