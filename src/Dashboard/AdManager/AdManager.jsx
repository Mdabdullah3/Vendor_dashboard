import React from "react";
import { useNavigate } from "react-router-dom";
const AdManager = () => {
  const AdManager = [
    {
      id: 1,
      packageName: "Basic",
      duration: "1 Month",
      price: "432",
      image: "",
      maxProduct: "10",
      status: "active",
    },
    {
      id: 1,
      packageName: "Basic",
      duration: "1 Month",
      price: "432",
      image: "",
      maxProduct: "10",
      status: "active",
    },
  ];

  const header = [
    "Package Name",
    "Duration",
    "Price",
    "Max Product",
    "Status",
    "Action",
  ];

  const navigate = useNavigate();
  const handleEditPackage = (id) => {
    navigate(`/admin/ads-manager/${id}`);
  };

  // const handleDeletePackage = (id) => {};
  return (
    <div className="flex h-screen">
      <div className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold">Ad Manager</h1>
        </div>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              {header.map((head, index) => (
                <th
                  key={index}
                  className="py-3 px-6 bg-gray-200 text-left text-xs font-bold uppercase border-b border-gray-200"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {AdManager?.map((ad) => (
              <tr key={ad.id} className="border-b border-gray-200">
                <td className="py-4 px-6">{ad.packageName}</td>
                <td className="py-4 px-6">{ad.duration}</td>
                <td className="py-4 px-6">{ad.price}</td>
                <td className="py-4 px-6">{ad.maxProduct}</td>
                <td className="py-4 px-6">{ad.status}</td>
                <td className="py-4 px-6 flex space-x-2">
                  <button
                    onClick={() => handleEditPackage(ad.id)}
                    className=" px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Plan
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdManager;
