import React from "react";

const TableHead = ({ header }) => {
  return (
    <thead>
      <tr className="bg-primary/40 text-center font-mono ">
        {header.map((item, index) => (
          <th
            key={index}
            className="
                               w-1/6
                               min-w-[160px]
                              text-sm
                               font-semibold
                               text-secondary
                               py-4
                               lg:py-4
                               px-3
                               lg:px-4
                               border-l border-transparent
                               font-mono
                               "
          >
            {item}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
