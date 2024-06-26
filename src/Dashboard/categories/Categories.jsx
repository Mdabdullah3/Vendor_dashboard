import React, { useState } from "react";

import { categoriesData } from "../../utils/constant";
import InputSearch from "../../components/common/InputSearch";
import TableHead from "../../components/common/TableHead";
import AddMainCategory from "../../components/Dashboard/Category/AddMainCategory";
import AddSubCategory from "../../components/Dashboard/Category/AddSubCategory";
const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeMenu, setActiveMenu] = useState("All");
  const handleSearch = (value) => {
    setSearchTerm(value);
  };
  const header = ["Category Name", "Sub Category Name", "status", "Action"];
  const menu = ["All", "Add Main Category", "Add Sub Category"];
  return (
    <section className="w-11/12 mx-auto">
      <div className="flex mt-8 items-center justify-center gap-10 w-10/12 mx-auto my-4 border-b-2 ">
        {menu.map((item, index) => (
          <>
            <button
              key={index}
              onClick={() => setActiveMenu(item)}
              className={`font-bold pb-2 ${
                activeMenu === item
                  ? "text-primary border-b-2 border-primary"
                  : ""
              }`}
            >
              {item}
            </button>
          </>
        ))}
      </div>

      {activeMenu === "All" && (
        <>
          <div className="mt-4">
            <InputSearch
              placeholder="Search For Categories.."
              value={searchTerm}
              onChange={(value) => setSearchTerm(value)}
              onSearch={handleSearch}
            />
          </div>
          <table className="table-auto w-full overflow-auto mt-10">
            <TableHead header={header} />
            {categoriesData.map((item) => (
              <tbody key={item.id}>
                <tr className="border-r border-l border-gray-300 border-b">
                  <td className="text-center text-dark font-medium text-secondary py-5 text-sm bg-transparent border-b border-l border-r border-gray-300">
                    {item.categoryName}
                  </td>
                  <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300">
                    {item.subcategory[0]}
                  </td>
                  <td className="text-center text-dark font-medium text-secondary py-5 px-2 bg-transparent border-b border-r border-gray-300">
                    {item.status}
                  </td>
                  <td className="text-center text-dark font-medium text-secondary py-5 px-2 cursor-pointer bg-transparent border-b border-r border-gray-300">
                    <button className="bg-primary text-white px-5 py-1.5 rounded-lg">
                      Edit
                    </button>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </>
      )}
      {activeMenu === "Add Main Category" && <AddMainCategory />}

      {activeMenu === "Add Sub Category" && <AddSubCategory />}
    </section>
  );
};

export default Categories;
