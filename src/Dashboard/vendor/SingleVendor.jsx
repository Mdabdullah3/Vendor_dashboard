import PrimaryButton from "../../components/common/PrimaryButton";

import { vendor } from "../../utils/constant";
const SingleVendor = () => {
  const vendorDetails = {
    address: {
      address1: "Dhaka, Bangladesh",
      address2: "Mirpur, Dhaka",
      city: "Mirpur",
      state: "Dhaka",
      country: "Bangladesh",
    },
    phone: "017561231",
    personalInfo: {
      idCardForntImage: "image",
      idCardBackSideImage: "image",
      idCardNumber: "12489891824124",
    },
    bankInfo: {
      bankStatementImage: "image",
      accountHolderName: "Md Kasem",
      accountNumber: "12313412",
      routingNumber: "2142124",
      bank: "Islami Bank Bangladesh",
      bankBranch: "Mirpur, Dhaka",
    },
  };
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
      <section className="mt-16 flex justify-between">
        <div>
          <h1 className="font-semibold text-lg">Personal Info</h1>
          <h2 className="my-2 mt-4">
            <span className="font-semibold">City</span> :{" "}
            {vendorDetails.address.city}
          </h2>
          <h2 className="my-2">
            <span className="font-semibold">State</span> :{" "}
            {vendorDetails.address.state}
          </h2>
          <h2 className="my-2">
            <span className="font-semibold">Country</span> :{" "}
            {vendorDetails.address.country}
          </h2>
          <h2 className="my-2">
            {" "}
            <span className="font-semibold">Address</span> :{" "}
            {vendorDetails.address.address1}
          </h2>
          <h2 className="my-2">
            {" "}
            <span className="font-semibold">Phone</span> : {vendorDetails.phone}
          </h2>
          <h2 className="my-2">
            {" "}
            <span className="font-semibold">Id Card Number</span> :{" "}
            {vendorDetails.personalInfo.idCardNumber}
          </h2>
        </div>
        <div>
          <h1 className="text-lg font-semibold">Bank Info</h1>
          <h2 className="my-2 mt-4">
            <span className="font-semibold"> Bank Name</span> :{" "}
            {vendorDetails.bankInfo.bank}
          </h2>
          <h2 className="my-2">
            <span className="font-semibold">Account Holder Name</span> :{" "}
            {vendorDetails.bankInfo.accountHolderName}
          </h2>
          <h2 className="my-2">
            <span className="font-semibold">Account Number</span> :{" "}
            {vendorDetails.bankInfo.accountNumber}
          </h2>
          <h2 className="my-2">
            <span className="font-semibold">Routing Number</span> :{" "}
            {vendorDetails.bankInfo.routingNumber}
          </h2>
          <h2 className="my-2">
            <span className="font-semibold">Bank Branch</span> :{" "}
            {vendorDetails.bankInfo.bankBranch}
          </h2>
        </div>
      </section>
    </section>
  );
};

export default SingleVendor;
