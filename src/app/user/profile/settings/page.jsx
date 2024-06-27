"use client";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import Image from "next/image";
import React from "react";
import { IoIosStar, IoMdTimer } from "react-icons/io";
import { FaCheckCircle, FaUser } from "react-icons/fa";
import { FaLocationDot, FaStarHalfStroke } from "react-icons/fa6";
import Link from "next/link";
import { SettingsPage } from "../../_component/SettingsPage";

export default function Settings() {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();
  const dateStr = user?.createdAt;

  const dateObj = new Date(dateStr);

  const options = { year: "numeric", month: "short" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);
  return (
    <>
      <div className="page-conten">
        <div className="container">
          <div className="row">
            <SettingsPage />
            <div className="col-lg-4 widget-block widget-break-lg">
              <div className="widget widget-author ">
                <div className="author-heading">
                  <div className="cover-img">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/figure/shape_12.jpg"
                      alt="cover"
                    />
                  </div>
                  <div className="profile-img">
                    {isAuthenticated === true ? (
                      <Link href="">
                        {user?.image === null ? (
                          <Image
                            width={1000}
                            height={100}
                            className="w-[100px] h-[100px]"
                            src="https://i.ibb.co/7298VDJ/user.png"
                            alt="author"
                          />
                        ) : (
                          <Image
                            width={1000}
                            height={100}
                            className="w-[100px] h-[100px]"
                            src={user?.image}
                            alt="author"
                          />
                        )}
                      </Link>
                    ) : (
                      <>
                        <Image
                          width={1000}
                          height={100}
                          className="w-[100px] h-[100px]"
                          src="https://i.ibb.co/7298VDJ/user.png"
                          alt="author"
                        />
                      </>
                    )}
                  </div>
                  <div className="profile-name -mt-[8px]">
                    <h4 className="author-name">
                      <a href="#">{user?.fullName}</a>
                    </h4>
                    <div className="author-location">
                      <a href="#">
                        <b>Rapid Properties</b>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center -mt-[20px] ">
                  <span className="flex gap-x-[3px] text-[#F5B849]">
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                    <IoIosStar />
                    <FaStarHalfStroke />
                  </span>
                  <p className="-mb-0 text-[12px] text-[#F5B849] font-medium ml-[5px]">
                    4.7{" "}
                    <span className="text-[#F5B849] font-normal ">
                      ( 300 reviews )
                    </span>
                  </p>
                </div>
                <ul className="author-statistics flex mt-[20px]">
                  <li>
                    <a href="#">
                      <span className="item-numbe text-[#525252] font-bold ">
                        30
                      </span>{" "}
                      <span className="item-tex text-[#9e9faf] font-semibold text-[11px]">
                        Posts
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="item-numbe text-[#525252] font-bold ">
                        2.4k
                      </span>{" "}
                      <span className="item-tex text-[#9e9faf] font-semibold text-[11px]">
                        Matched
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="item-numbe text-[#525252] font-bold">
                        12
                      </span>{" "}
                      <br />
                      <span className=" whitespace-nowrap text-[#9e9faf] font-semibold text-[11px]">
                        Ads Posts
                      </span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <span className="item-numbe text-[#525252] font-bold">
                        1,125
                      </span>{" "}
                      <br />
                      <span className="whitespace-nowrap text-[#9e9faf] font-semibold text-[11px]">
                        My Connect
                      </span>
                    </a>
                  </li>
                </ul>
                {user?.role === "agent" ? (
                  <div className="mt-[1px] mb-[12px]">
                    <div className="h-[1px] w-full bg-[#5EDFFF] "></div>
                    <div className="mt-[8px] px-[10px]">
                      <p className="-mb-0 text-start text-[13px] text-[#323232CC] text-opacity-80 font-semibold">
                        Verified By My-Makan in
                      </p>
                      <div className="flex gap-x-2 items-center mt-[5px] ">
                        <div>
                          <p className="-mb-0 text-[11px] text-black">
                            <FaCheckCircle />
                          </p>
                        </div>
                        <div>
                          <p className="-mb-0 text-[11px] text-[#323232CC] text-opacity-80 font-medium">
                            {user?.companyName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <div className="">
                  <div className="h-[1px] w-full bg-[#5EDFFF] "></div>
                  <div className="mt-[15px] px-[10px]">
                    <div className="flex justify-between items-center mb-[10px]">
                      <div className="flex gap-x-2 items-center">
                        <div>
                          <p className="-mb-0 text-[14px] text-black">
                            <FaLocationDot />
                          </p>
                        </div>
                        <div>
                          <p className="-mb-0 text-[14px] text-[#323232CC] text-opacity-80 font-medium">
                            From
                          </p>
                        </div>
                      </div>
                      <div>
                        {" "}
                        <p className="-mb-0 text-[14px] text-[#323232CC] text-opacity-80 font-semibold">
                          {user?.country}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mb-[10px]">
                      <div className="flex gap-x-2 items-center">
                        <div>
                          <p className="-mb-0 text-[14px] text-black">
                            <FaUser />
                          </p>
                        </div>
                        <div>
                          <p className="-mb-0 text-[14px] text-[#323232CC] text-opacity-80 font-medium">
                            Member Since
                          </p>
                        </div>
                      </div>
                      <div>
                        {" "}
                        <p className="-mb-0 text-[14px] text-[#323232CC] text-opacity-80 font-semibold">
                          {formattedDate}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-x-2 items-center">
                        <div>
                          <p className="-mb-0 text-[14px] text-black">
                            <IoMdTimer />
                          </p>
                        </div>
                        <div>
                          <p className="-mb-0 text-[14px] text-[#323232CC] text-opacity-80 font-medium">
                            Avg Response Time
                          </p>
                        </div>
                      </div>
                      <div>
                        {" "}
                        <p className="-mb-0 text-[14px] text-[#323232CC] text-opacity-80 font-semibold">
                          1 hours
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="widget widget-banner">
                <h3 className="item-title">Most Popular</h3>
                <div className="item-subtitle">MyMakan Application</div>
                <a href="#" className="item-btn">
                  <span className="btn-text">Download Now</span>
                  <span className="btn-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="21px"
                      height="10px"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.671,9.998 L12.997,9.998 L16.462,6.000 L5.000,6.000 L5.000,4.000 L16.462,4.000 L12.997,0.002 L16.671,0.002 L21.003,5.000 L16.671,9.998 ZM17.000,5.379 L17.328,5.000 L17.000,4.621 L17.000,5.379 ZM-0.000,4.000 L3.000,4.000 L3.000,6.000 L-0.000,6.000 L-0.000,4.000 Z"
                      />
                    </svg>
                  </span>
                </a>
                <div className="item-img">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/widget_banner_1.png"
                    alt="banner"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
