import React from "react";
import { FaStar } from "react-icons/fa";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { vendorReviews } from "../../../utils/constant";
const VendorReview = () => {
  return (
    <section>
      <div className="flex mx-5 items-center justify-between mt-10">
        <h1 className="font-bold text-2xl">Review</h1>
        <div className="flex items-center gap-4 text-white">
          <h1 className="px-2 py-2 bg-primary text-white rounded-full">
            <IoIosArrowBack size={30} color="white" />
          </h1>
          <h1 className="px-2 py-2 bg-primary text-white rounded-full">
            <IoIosArrowForward size={30} color="white" />
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mt-10">
        {vendorReviews.map((item) => (
          <div
            key={item.id}
            className="shadow-xl px-4 py-6 rounded-xl flex justify-between items-center"
          >
            <div>
              <h1 className="text-sm text-gray-400">{item.date}</h1>
              <h1>{item.review}</h1>
              <h1 className="flex items-center text-sm my-2 text-yellow-400">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
              </h1>
              <button className="px-5 py-2 bg-primary text-white rounded-full">
                Edit
              </button>
            </div>
            <div>
              <h1 className="font-bold text-sm tracking-wider py-2">
                {item.name}
              </h1>
              <img
                src={item.img}
                alt="review img"
                className="w-16 rounded-full"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default VendorReview;
