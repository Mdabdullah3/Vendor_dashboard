/* eslint-disable */
import { HiX } from "react-icons/hi";
import { Link } from "react-router-dom";
import SidebarLinks from "./Links";
import menu from "../../menu";
const Sidebar = ({ open, onClose }) => {
  return (
    <div
      className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col bg-white overflow-auto scroll-smooth h-full  shadow-2xl shadow-white/5 transition-all  md:!z-50 lg:!z-50 xl:!z-0 ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <HiX />
      </span>
      <ul className="mb-auto pt-1 mt-10">
        <SidebarLinks routes={menu} />
      </ul>
    </div>
  );
};

export default Sidebar;
