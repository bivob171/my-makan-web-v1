"use client";

import PrivateRouteContext from "@/Context/PrivetRouteContext";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export const DashboardNavbar = ({ open, setOpen }) => {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();
  const [pnOpen, setPNOpen] = useState(false);
  const [tnOpen, setTNOpen] = useState(false);
  return (
    <div className="">
      <div
        className={` ${
          open ? "w-[250px]" : "w-20 "
        } bg-[#4951FA] h-screen overflow-auto  pt-[20px] relative duration-300`}
      >
        <div className="flex gap-x-2 items-center px-5">
          {isAuthenticated === true ? (
            <Link href="/dashboard">
              {user?.image === null ? (
                <Image
                  width={40}
                  height={40}
                  alt=""
                  src="https://source.unsplash.com/50x50/?portrait"
                  className={`cursor-pointer rounded-full duration-500 w-[40px] h-[40px] ${
                    open && "rotate-[360deg]"
                  }`}
                />
              ) : (
                <Image
                  width={40}
                  height={40}
                  src={user?.image}
                  alt=""
                  className={`cursor-pointer rounded-full duration-500 w-[40px] h-[40px] ${
                    open && "rotate-[360deg]"
                  }`}
                />
              )}
            </Link>
          ) : (
            <>
              <Image
                width={40}
                height={40}
                alt=""
                src="https://source.unsplash.com/50x50/?portrait"
                className={`cursor-pointer rounded-full duration-500 w-[40px] h-[40px] ${
                  open && "rotate-[360deg]"
                }`}
              />
            </>
          )}

          <h1
            className={`text-white origin-left font-medium text-[18px] duration-200 ${
              !open && "scale-0"
            }`}
          >
            MY MAKAN
          </h1>
        </div>
        <div className=" mt-[25px]">
          <p
            className={`${
              !open && "hidden"
            } origin-left duration-200 text-[12px] font-normal px-5 text-white
            `}
          >
            MAIN
          </p>
          <Link href="/dashboard">
            <div className="cursor-pointer hover:bg-[#6A6AF0] px-5 py-[5px] text-[16px] font-normal text-white text-opacity-70 hover:text-opacity-100 flex items-center gap-x-4 my-[10px]">
              <Image
                width={20}
                alt=""
                height={20}
                className="w-[20px] h-[20px]"
                src="https://i.ibb.co/D4zFJNh/home.png"
              />
              <span
                className={`${!open && "hidden"} origin-left duration-200 
            `}
              >
                Dashboard
              </span>
            </div>
          </Link>

          <p
            className={`${
              !open && "hidden"
            } origin-left duration-200 text-[12px] px-5 font-normal text-white mt-[7px]
            `}
          >
            CONTENTS
          </p>

          <Link href="/dashboard">
            <div className="cursor-pointer hover:bg-[#6A6AF0] px-5 py-[5px] text-[16px] font-normal text-white text-opacity-70 hover:text-opacity-100 flex items-center gap-x-4 my-[10px]">
              <Image
                width={20}
                alt=""
                height={20}
                className="w-[20px] h-[20px]"
                src="https://i.ibb.co/D4zFJNh/home.png"
              />
              <span
                className={`${!open && "hidden"} origin-left duration-200 
            `}
              >
                Profile
              </span>
            </div>
          </Link>
          <div></div>
        </div>
      </div>
    </div>
  );
};
