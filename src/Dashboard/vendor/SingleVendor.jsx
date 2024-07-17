import PrimaryButton from "../../components/common/PrimaryButton";

import { vendor } from "../../utils/constant";
const SingleVendor = () => {
  return (
    <section className="w-11/12 mx-auto my-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl text-gray-700 font-bold">Vendor</h1>
        <h2 className="text-xl font-bold">#509290323523</h2>
      </div>
      <div className="flex items-center justify-center gap-4">
        <img
          src={vendor[0].img}
          alt="vendor"
          className="w-40 px-4 py-4 shadow-lg rounded-lg border border-gray-300"
        />
        <h1 className="text-xl font-bold">{vendor[0].name}</h1>
        <PrimaryButton value="Deactive" />
        <button className="bg-blue-500 hover:bg-blue-500/70  text-white font-bold py-3 px-4 rounded-lg transition duration-300">
          Verified
        </button>
      </div>
    </section>
  );
};

export default SingleVendor;
