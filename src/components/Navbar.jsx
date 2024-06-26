import React from "react";
import { Link } from "react-router-dom";
import { FiAlignJustify } from "react-icons/fi";
const Navbar = (props) => {
  const { onOpenSidenav, brandText } = props;

  return (
    <nav className="sticky top-3 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl  p-2 backdrop-blur-lg bg-white/5">
      <div className="ml-[6px]">
        <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-gray-700 hover:underline "
            href=" "
          >
            Pages
            <span className="mx-1 text-sm text-gray-700 hover:text-gray-700 ">
              {" "}
              /{" "}
            </span>
          </a>
          <Link
            className="text-sm font-normal capitalize text-gray-700 hover:underline "
            to="#"
          >
            {brandText}
          </Link>
        </div>
        <p className="shrink text-[33px] capitalize text-gray-700 ">
          <Link to="#" className="font-bold capitalize hover:text-gray-700 ">
            {brandText}
          </Link>
        </p>
      </div>
      <span
        className="flex cursor-pointer text-xl text-gray-600 xl:hidden"
        onClick={onOpenSidenav}
      >
        <FiAlignJustify className="h-5 w-5" />
      </span>
    </nav>
  );
};

export default Navbar;
