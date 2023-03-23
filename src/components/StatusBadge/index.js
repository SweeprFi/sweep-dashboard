import React from "react";

const StatusBadge = ({ status }) => {
  switch (status) {
    case "good":
      return (
        <div className="bg-app-green text-black rounded-xl px-4 py-1 text-sm">
          Good
        </div>
      );
    case "bad":
      return (
        <div className="bg-app-red rounded-xl px-4 py-1 text-sm">
          Bad
        </div>
      )
    default:
      return (
        <div className="bg-app-blue-dark rounded-xl px-4 py-1 text-sm">
          Waiting
        </div>
      );
  }
}

export default StatusBadge;