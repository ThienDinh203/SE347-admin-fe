import React, { ReactNode } from "react";

const CardDataStats = ({ title, total, children }) => {
  return (
    <div className="border p-4 shadow-md ">
      <div className="flex h-11 w-11 items-center justify-center">
        {children}
      </div>

      <div className="mt-4 flex justify-between">
        <div>
          <h4 className="text-2xl font-bold text-black">{total}</h4>
          <span>{title}</span>
        </div>
      </div>
    </div>
  );
};

export default CardDataStats;
