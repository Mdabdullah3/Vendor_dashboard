import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import usePackageStore from "../../store/PackageStore";
const AdManager = () => {
  const { fetchPackages, packages } = usePackageStore();
  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

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
            {packages?.length > 0 ? (
              packages?.map((pack) => (
                <tr key={pack._id} className="border-b border-gray-200">
                  <td className="py-4 px-6 capitalize">{pack.name}</td>
                  <td className="py-4 px-6">{pack.duration}</td>
                  <td className="py-4 px-6">৳{pack.price}</td>
                  <td className="py-4 px-6">{pack.maxProduct}</td>
                  <td className="py-4 px-6">{pack.status}</td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleEditPackage(pack._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Plan
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 px-6 text-center text-red-500">
                  No Packages Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdManager;
