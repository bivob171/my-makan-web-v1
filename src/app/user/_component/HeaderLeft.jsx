"use client";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { CiLogout } from "react-icons/ci";

export const HeaderLeft = () => {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsVisible(false);
    }
  };
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);
  return (
    <div className="">
      <div className="fixed-sidebar">
        <div className="fixed-sidebar-left small-sidebar ">
          <div className="sidebar-toggle h-[100px]">
            <button
              onClick={toggleVisibility}
              className="toggle-btn toggler-open focus:outline-none"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
          <div className="sidebar-menu-wrap">
            <div
              className="mCustomScrollbar"
              data-mcs-theme="dark"
              data-mcs-axis="y"
            >
              <ul className="side-menu">
                <li>
                  <Link
                    href="/user/newsfeed"
                    className="menu-link"
                    data-toggle="tooltip"
                    data-placement="right"
                    title=" NEWSFEED"
                  >
                    <i className="icofont-newspaper" />
                  </Link>
                </li>
                <li>
                  <a
                    href="user-timeline.html"
                    className="menu-link"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="AGENTS TIMELINE"
                  >
                    <i className="icofont-list" />
                  </a>
                </li>
                <li>
                  <a
                    href="user-groups.html"
                    className="menu-link"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="CATEGORIES"
                  >
                    <i className="icofont-users-alt-2" />
                  </a>
                </li>
                <li>
                  <a
                    href="user-friends.html"
                    className="menu-link"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="MY CONNECT"
                  >
                    <i className="icofont-users-alt-4" />
                  </a>
                </li>
                <li>
                  <a
                    href="user-photo.html"
                    className="menu-link"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="PROPERTIES"
                  >
                    <i className="icofont-photobucket" />
                  </a>
                </li>
                <li>
                  <a
                    href="user-video.html"
                    className="menu-link"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="VIDEOS"
                  >
                    <i className="icofont-play-alt-1" />
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="menu-link"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="EVENT SCHEDULE"
                  >
                    <i className="icofont-calendar" />
                  </a>
                </li>
                <li>
                  <a
                    href="forums-timeline.html"
                    className="menu-link"
                    data-toggle="tooltip"
                    data-placement="right"
                    title="TANENT MANAGEMENT"
                  >
                    <i className="icofont-ui-text-chat" />
                  </a>
                </li>
                {/* <li className="ml-[25px] cursor-pointer" onClick={logOut}>
                  <p className="hover:text-[#5EDFFF]  font-semibold text-[28px] text-[#98A4B4]">
                    <BiLogOut />
                  </p>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
        {/* large slide bar  */}
        <div
          ref={sidebarRef}
          className={`fixed h-full bg-white shadow-md transition-transform duration-500 ease-in-out w-[270px] ${
            isVisible ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="bg-blue-600 text-center h-[89px] flex items-center justify-between pl-[30px] pr-[18px]">
            <div className="inline-block mt-[9px]">
              <Link href="/user">
                <Image
                  src="/media/logo2.png"
                  alt="Logo"
                  className="w-auto h-auto"
                  width={1000}
                  height={100}
                />
              </Link>
            </div>
            <div className="sidebar-toggle ">
              <button
                onClick={toggleVisibility}
                className="toggle-btn focus:outline-none"
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
          <div className="overflow-y-auto max-h-full p-[35px]">
            <ul className="mt-[1px]">
              <li className="mb-[30px]">
                <Link
                  href="/user/newsfeed"
                  className="hover:text-[#5EDFFF] flex items-center text-[#98A4B4]"
                >
                  <i className="icofont-newspaper mr-3 text-[23px]"></i>
                  <span className="text-[14px] font-medium">Newsfeed</span>
                </Link>
              </li>
              <li className="mb-[30px]">
                <a
                  href="newsfeed.html"
                  className="hover:text-[#5EDFFF] flex items-center text-[#98A4B4]"
                >
                  <i className="icofont-list mr-3 text-[23px]"></i>
                  <span className="text-[14px] font-medium">
                    Agents Timeline
                  </span>
                </a>
              </li>
              <li className="mb-[30px]">
                <a
                  href="newsfeed.html"
                  className="hover:text-[#5EDFFF] flex items-center text-[#98A4B4]"
                >
                  <i className="icofont-users-alt-2 mr-3 text-[23px]"></i>
                  <span className="text-[14px] font-medium">Categories</span>
                </a>
              </li>
              <li className="mb-[30px]">
                <a
                  href="newsfeed.html"
                  className="hover:text-[#5EDFFF] flex items-center text-[#98A4B4]"
                >
                  <i className="icofont-users-alt-4 mr-3 text-[23px]"></i>
                  <span className="text-[14px] font-medium">My Connect</span>
                </a>
              </li>
              <li className="mb-[30px]">
                <a
                  href="newsfeed.html"
                  className="hover:text-[#5EDFFF] flex items-center text-[#98A4B4]"
                >
                  <i className="icofont-photobucket mr-3 text-[23px]"></i>
                  <span className="text-[14px] font-medium">Properties</span>
                </a>
              </li>
              <li className="mb-[30px]">
                <a
                  href="newsfeed.html"
                  className="hover:text-[#5EDFFF] flex items-center text-[#98A4B4]"
                >
                  <i className="icofont-play-alt-1 mr-3 text-[23px]"></i>
                  <span className="text-[14px] font-medium">Videos</span>
                </a>
              </li>
              <li className="mb-[30px]">
                <a
                  href="newsfeed.html"
                  className="hover:text-[#5EDFFF] flex items-center text-[#98A4B4]"
                >
                  <i className="icofont-calendar mr-3 text-[23px]"></i>
                  <span className="text-[14px] font-medium">
                    Event Schedule
                  </span>
                </a>
              </li>
              <li className="mb-[25px]">
                <a
                  href="newsfeed.html"
                  className="hover:text-[#5EDFFF] flex items-center text-[#98A4B4]"
                >
                  <i className="icofont-ui-text-chat mr-3 text-[23px]"></i>
                  <span className="text-[14px] font-medium mb-[6px]">
                    Talent Management
                  </span>
                </a>
              </li>
              {/* <li
                onClick={logOut}
                className="mb-[30px] hover:text-[#5EDFFF] cursor-pointer "
              >
                <p className="hover:text-[#5EDFFF] flex items-center text-[#98A4B4]">
                  <p className="hover:text-[#5EDFFF] font-semibold text-[28px] text-[#98A4B4]">
                    <BiLogOut />
                  </p>
                  <span className="text-[15px] font-semibold mb-[8px] ml-[12px]">
                    Log Out
                  </span>
                </p>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
