import React, { useEffect, useState } from "react";
import useUserStore from "../../store/AuthStore";
import { SERVER } from "../../config";
import { Link, Navigate } from "react-router-dom";

const SingleVendor = () => {
  const { user, fetchUser } = useUserStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      await fetchUser();
      setLoading(false);
    };

    loadUser();
  }, [fetchUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return (
    <section className="w-11/12 mx-auto my-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl text-gray-700 font-bold">Vendor</h1>
      </div>
      {user ? (
        <>
          <div className="flex items-center justify-between bg-white shadow-md p-6 rounded-lg">
            <div className="flex items-center gap-4 ">
              <img
                src={`${SERVER}${user?.avatar?.secure_url}`}
                alt="vendor"
                className="w-40 h-40 object-cover rounded-full border-4 border-gray-200"
              />
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold">{user?.name}</h1>
                <div className="mt-2">
                  {user?.status === "approved" ? (
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm font-semibold">
                      Verified
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-semibold">
                      Not Verified
                    </span>
                  )}
                </div>
                {/* <PrimaryButton value="Deactivate" className="mt-4" /> */}
              </div>
            </div>
            <Link to="/profile">
              <button className="bg-blue-500 hover:bg-blue-500/70 text-white font-bold py-2 px-4 rounded-lg mt-2">
                Update Profile
              </button>
            </Link>
          </div>
          <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-lg font-semibold">Personal Info</h1>
              <div className="mt-4 space-y-2">
                <p>
                  <span className="font-semibold">City:</span>{" "}
                  {user?.location?.city}
                </p>
                <p>
                  <span className="font-semibold">State:</span>{" "}
                  {user?.location?.state}
                </p>
                <p>
                  <span className="font-semibold">Country:</span>{" "}
                  {user?.location?.country}
                </p>
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {user?.location?.address1}
                </p>
                <p>
                  <span className="font-semibold">Phone:</span> {user?.phone}
                </p>
                <p>
                  <span className="font-semibold">ID Card Number:</span>{" "}
                  {user?.idCardNumber}
                </p>

                <div className=" space-y-3">
                  <h1 className=" font-semibold">ID Card Front Side Image</h1>
                  <img
                    src={`${SERVER}${user?.idCardFrontPageImage?.secure_url}`}
                    alt="ID Card Front"
                    className="w-32 h-20 object-cover border border-gray-300 rounded"
                  />
                  <h1 className="font-semibold">ID Card Back Side Image</h1>
                  <img
                    src={`${SERVER}${user?.idCardBackPageImage?.secure_url}`}
                    alt="ID Card Back"
                    className="w-32 h-20 object-cover border border-gray-300 rounded"
                  />
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-semibold">Bank Info</h1>
              <div className="mt-4 space-y-2">
                <p>
                  <span className="font-semibold">Bank Name:</span>{" "}
                  {user?.bankName}
                </p>
                <p>
                  <span className="font-semibold">Account Holder Name:</span>{" "}
                  {user?.accountHolderName}
                </p>
                <p>
                  <span className="font-semibold">Account Number:</span>{" "}
                  {user?.accountNumber}
                </p>
                <p>
                  <span className="font-semibold">Routing Number:</span>{" "}
                  {user?.routingNumber}
                </p>
                <p>
                  <span className="font-semibold">Bank Branch:</span>{" "}
                  {user?.bankBranch}
                </p>
                <h1 className="font-semibold my-2">Bank Statement Image</h1>
                <img
                  src={`${SERVER}${user?.bankStatementImage?.secure_url}`}
                  alt="Bank Statement"
                  className="w-32 h-20 object-cover border border-gray-300 rounded"
                />
              </div>
            </div>
          </section>
        </>
      ) : (
        <h1 className="text-center">No Data Found</h1>
      )}
    </section>
  );
};

export default SingleVendor;
