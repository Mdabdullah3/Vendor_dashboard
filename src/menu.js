import React from "react";
import { BiSupport } from "react-icons/bi";
import { FaCartFlatbed, FaMoneyCheck, FaRocketchat, FaUser } from "react-icons/fa6";
import { CiShoppingBasket } from "react-icons/ci";
import { IoIosRocket } from "react-icons/io";
import { BsFillHandIndexFill, BsTicketDetailed } from "react-icons/bs";
import SingleVendor from "./Dashboard/vendor/SingleVendor";
import Products from "./Dashboard/products/Products"
import OrderReview from "./Dashboard/Order/OrderReview";
import Finance from "./Dashboard/Finance/index";
import AdManager from "./Dashboard/AdManager/AdManager";
import VoucherAdminPanel from "./Dashboard/Voucher/index";
import AddNewVoucher from "./Dashboard/Voucher/AddVoucher";
import EditVoucher from "./Dashboard/Voucher/EditVoucher";
const menu = [
    {
        name: "Profile",
        layout: "/admin",
        path: "default",
        icon: <FaUser className="h-6 w-6" />,
        navMenu: true,
        component: <SingleVendor />
    },
    {
        name: "Products",
        layout: "/admin",
        path: "products",
        navMenu: true,
        icon: <FaCartFlatbed className="h-6 w-6" />,
        component: <Products />
    },

    {
        name: "Order & Review",
        layout: "/admin",
        path: "order-review",
        navMenu: true,
        icon: <CiShoppingBasket className="h-6 w-6" />,
        component: <OrderReview />
    },
    {
        name: "Finance",
        layout: "/admin",
        path: "finance",
        navMenu: true,
        icon: <FaMoneyCheck className="h-6 w-6" />,
        component: <Finance />
    },
    {
        name: "Ads Manager",
        layout: "/admin",
        path: "ads-manager",
        navMenu: true,
        icon: <IoIosRocket className="h-6 w-6" />,
        component: <AdManager />
    },
    {
        name: "Vouchers",
        layout: "/admin",
        path: "vouchers",
        navMenu: true,
        icon: <BsTicketDetailed className="h-6 w-6" />,
        component: <VoucherAdminPanel />
    },
    {
        name: "Create Voucher",
        layout: "/admin",
        path: "add-voucher",
        component: <AddNewVoucher />
    },
    {
        name: "Edit Voucher",
        layout: "/admin",
        path: "edit-voucher/:id",
        component: <EditVoucher />
    },
    {
        name: "Event Manager",
        layout: "/admin",
        path: "event-manager",
        navMenu: true,
        icon: <BsFillHandIndexFill className="h-6 w-6" />,
    },
    {
        name: "Message Center",
        layout: "/admin",
        icon: <FaRocketchat className="h-6 w-6" />,
        path: "message-center",
        navMenu: true,
    },
    {
        name: "Support",
        layout: "/admin",
        icon: <BiSupport className="h-6 w-6" />,
        path: "message-center",
        navMenu: true,
    },

];
export default menu;
