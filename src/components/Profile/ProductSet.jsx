import React from "react";
import PrimaryButton from "../common/PrimaryButton";

const ProductSet = () => {
  return (
    <section className="flex justify-center mt-10">
      <div>
        <img
          className="mx-auto"
          src="https://lzd-img-global.slatic.net/g/tps/imgextra/i2/O1CN01S1Dn1P28iTmYm1ycS_!!6000000007966-55-tps-185-184.svg"
          alt=""
        />
        <h1 className="text-xl font-semibold mb-4 text-center">
          Upload your first product
        </h1>
        <PrimaryButton value="Add Product" />
        <p className="mt-3">
          Add descriptions, images, and other details of your first product
        </p>
      </div>
    </section>
  );
};

export default ProductSet;
