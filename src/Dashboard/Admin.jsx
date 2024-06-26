import React from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
import PieChart from "../components/charts/PieChart";
import BarChart from "../components/charts/BarChart";
import AreaLineChart from "../components/charts/AreaLineChart";
import PrimaryButton from "../components/common/PrimaryButton";
import RecentOrder from "../components/Dashboard/RecentOrder";

const Admin = () => {
  return (
    <section>
      <div className="grid grid-cols-4 gap-5 rounded-xl items-center">
        <div>
          <div className="mt-4 shadow-lg pl-2 h-64">
            <h1 className="text-gray-500 text-lg flex items-center font-bold pt-3">
              $ <span className="text-3xl text-black mr-2">56,9923</span>
              <span className="flex items-center bg-green-200 text-sm rounded-lg px-2 py-1 text-green-600">
                <AiOutlineArrowUp /> <span>+20%</span>
              </span>
            </h1>
            <h2 className="text-md text-gray-500">Expected Earning</h2>
            <div className="-mt-10">
              <PieChart />
            </div>
          </div>
          <div>
            <div className="mt-4 shadow-lg pl-2 h-64">
              <h1 className="text-gray-500 text-lg flex items-center font-bold pt-3">
                $ <span className="text-3xl text-black mr-2">56,9923</span>
                <span className="flex items-center bg-green-200 text-sm rounded-lg px-2 py-1 text-green-600">
                  <AiOutlineArrowUp /> <span>+20%</span>
                </span>
              </h1>
              <h2 className="text-md text-gray-500">Order This Month</h2>
              <div className="mt-24">
                <h1 className="font-bold flex justify-between">
                  1080 to Goal <span className="text-green-500 pr-4">62%</span>
                </h1>
                <progress
                  className="progress progress-green-500 w-56"
                  value="70"
                  max="100"
                ></progress>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="mt-4 shadow-lg pl-2 h-64 rounded-xl">
            <h1 className="text-gray-500 text-lg flex items-center font-bold pt-3">
              $ <span className="text-3xl text-black mr-2">56,9923</span>
              <span className="flex items-center bg-green-200 text-sm rounded-lg px-2 py-1 text-green-600">
                <AiOutlineArrowUp /> <span>+20%</span>
              </span>
            </h1>
            <h2 className="text-md text-gray-500">Average Daily Sale</h2>
            <div className="mt-6">
              <BarChart />
            </div>
          </div>
          <div className="mt-4 shadow-lg pl-2 h-64 rounded-xl">
            <h1 className="font-bold pt-3">
              <span className="text-3xl text-black mr-2">354K</span>
            </h1>
            <h2 className="text-md text-gray-500">New Customer This Month</h2>
            <div className="pt-14">
              <h1>Todays Hero</h1>
              <div>
                <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                  <div className="avatar">
                    <div className="w-12">
                      <img
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                        alt="logo"
                      />
                    </div>
                  </div>
                  <div className="avatar">
                    <div className="w-12">
                      <img
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                        alt="logo"
                      />
                    </div>
                  </div>
                  <div className="avatar">
                    <div className="w-12">
                      <img
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                        alt="logo"
                      />
                    </div>
                  </div>
                  <div className="avatar">
                    <div className="w-12">
                      <img
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                        alt="logo"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 shadow-lg rounded-xl p-4">
          <h1 className="text-lg font-bold">Sale This Month</h1>
          <p>User of all chanel</p>
          <div className="mt-16">
            <h1 className="text-gray-500 text-lg flex items-center font-bold pt-3">
              $ <span className="text-3xl text-black mr-2">56,9923</span>
              <span className="flex items-center bg-green-200 text-sm rounded-lg px-2 py-1 text-green-600">
                <AiOutlineArrowUp /> <span>+20%</span>
              </span>
            </h1>
            <h1>Another $4232,992 to Goal</h1>
          </div>
          <div className="">
            <AreaLineChart />
          </div>
        </div>
      </div>
      <section className="my-10">
        <div className="my-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Recent Order</h1>
          <PrimaryButton value="See all" />
        </div>
        <RecentOrder />
      </section>
    </section>
  );
};

export default Admin;
