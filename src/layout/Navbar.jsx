import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className=" px-10 py-3 cursor-pointer">
      <Link to="/">
        <h1 className="text-xl font-[500] text-primary">
          Babur Hut <br /> Seller Center
        </h1>
      </Link>
    </div>
  );
};

export default Navbar;
