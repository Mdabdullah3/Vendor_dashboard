/* eslint-disable array-callback-return */
import React from "react";
import { Link, useLocation } from "react-router-dom";

export function SidebarLinks(props) {
    let location = useLocation();
    const { routes } = props;
    const activeRoute = (routeName) => {
        return location.pathname.includes(routeName);
    };
    const createLinks = (routes) => {
        return routes.map((route, index) => {
            if (route.layout === "/admin" && route?.navMenu === true) {
                return (
                    <Link key={index} to={route.layout + "/" + route.path}>
                        <div className="relative mb-5 flex hover:cursor-pointer">
                            <li
                                className="my-[3px] flex cursor-pointer items-center px-8"
                                key={index}
                            >
                                <span
                                    className={`${activeRoute(route.path) === true
                                        ? "font-bold text-primary"
                                        : "font-medium"
                                        }`}
                                >
                                    {route.icon ? route.icon : ""}{" "}
                                </span>
                                <p
                                    className={`leading-1 ml-4 flex uppercase tracking-wider ${activeRoute(route.path) === true
                                        ? "font-bold text-primary "
                                        : "font-medium text-gray-500"
                                        }`}
                                >
                                    {route.name}
                                </p>
                            </li>
                            {activeRoute(route.path) ? (
                                <div className="absolute right-0 top-px h-9 w-1 rounded-lg bg-primary" />
                            ) : null}
                        </div>
                    </Link>
                );
            }
        });
    };
    return createLinks(routes);
}

export default SidebarLinks;
