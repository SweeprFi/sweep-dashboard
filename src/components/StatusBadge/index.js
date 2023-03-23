import React from "react";

const StatusBadge = ({ isDefaulted }) => {
  return !isDefaulted ? (
    <div className="bg-app-green text-black rounded-xl px-4 py-1 text-xs font-medium uppercase">
      Good
    </div>
  ) : (
    <div className="bg-red-500 rounded-xl px-4 py-1 text-xs font-medium uppercase">
      Defaulted
    </div>
  );
}

export default StatusBadge;