import React from "react";
import TableHead from "../common/TableHead";
import { reacentOrder } from "../../utils/constant";
const RecentOrder = () => {
  const header = [
    "Image",
    "Product Name",
    "Customer",
    "Product ID",
    "Quantity",
  ];
  return (
    <div>
      <table className="table-auto w-full overflow-auto">
        <TableHead header={header} />
        {reacentOrder?.map((item) => (
          <tbody key={item?.id}>
            <tr className="border-r border-l border-gray-300 border-b">
              <td>
                <img className="w-20 h-20 mx-auto" src={item?.img} alt="" />
              </td>
              <td
                className="
                               text-center text-dark
                               font-medium
                               text-secondary
                               py-5 text-sm
                                bg-transparent
                               border-b border-l border-r border-gray-300
                               "
              >
                {item?.name}
              </td>

              <td
                className="
                               text-center text-dark
                               font-medium
                               text-secondary
                               py-5
                               px-2 bg-transparent
                               border-b border-r border-gray-300
                               "
              >
                {item?.customerNumber}
              </td>
              <td
                className="
                               text-center text-dark
                               font-medium
                               text-secondary
                               py-5
                               px-2 bg-transparent
                               border-b border-r border-gray-300
                               "
              >
                {item?.productId ? item.productId : "No Code"}
              </td>
              <td
                className="
                               text-center text-dark
                               font-medium
                               text-secondary
                               py-5
                               px-2 cursor-pointer
                               bg-transparent
                               border-b border-r border-gray-300
                               "
              >
                {item?.quantity}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export default RecentOrder;
