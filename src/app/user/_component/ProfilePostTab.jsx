import React from "react";
import Link from "next/link";
import { FaCheckCircle, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdTimer } from "react-icons/io";
import Image from "next/image";
import PackageCard from "./Card/PackageCard";

const ProfilePostTab = () => {
    const cardData = [
        {}
    ]
  return (
    <div className="grid grid-cols-11 gap-10">
      <div className="col-span-5">
        {" "}
        <div className="widget widget-author !pb-2 !pl-2 !pr-2">
          <div className="author-heading">
            <ul className="author-statistics flex justify-around text-center mt-[5px] mb-4">
              <li>
                <a href="#">
                  <span className="text-[16px] text-[#525252] font-bold ">
                    0
                  </span>{" "}
                  <br />
                  <span className=" text-[#9e9faf] font-semibold text-[14px]">
                    Posts
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="text-[16px] text-[#525252] font-bold ">
                    2.4k
                  </span>{" "}
                  <br />
                  <span className=" text-[#9e9faf] font-semibold text-[14px]">
                    Matched
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="text-[16px] text-[#525252] font-bold">
                    {" "}
                    0
                  </span>

                  <br />
                  <span className=" whitespace-nowrap text-[#9e9faf] font-semibold text-[14px]">
                    Ads Posts
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="text-[16px] text-[#525252] font-bold">
                    1,125
                  </span>
                  <br />
                  <span className="whitespace-nowrap text-[#9e9faf] font-semibold text-[14px]">
                    My Connect
                  </span>
                </a>
              </li>
            </ul>
            <div className="mt-[4px] mb-[12px]">
              <div className="h-[0.5px] w-full bg-[#5EDFFF] " />
              <div className="mt-[15px] px-[10px]">
                <p className="-mb-0 text-start text-[16px] text-[#323232CC] text-opacity-80 font-semibold leading-[20px]">
                  Verified By My-Makan in
                </p>
                <div className="flex gap-x-2 items-center mt-[10px] ">
                  <div>
                    <p className="-mb-0 text-[11px] text-[#5EDFFF]">
                      <FaCheckCircle className="w-4 h-4" />
                    </p>
                  </div>
                  <div>
                    <p className="-mb-0 text-[16px] leading-[20px] text-[#323232CC] text-opacity-80 font-medium uppercase">
                      ARBAT REAL ESTATE BROKERS L.L.C
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <div className="h-[0.5px] w-full bg-[#5EDFFF] " />
              <div className="mt-[15px] px-[10px]">
                <div className="flex justify-between items-center mb-[10px]">
                  <div className="flex gap-x-2 items-center">
                    <div>
                      <p className="-mb-0 text-[16px] text-[#5EDFFF]">
                        <FaLocationDot className="w-4 h-4" />
                      </p>
                    </div>
                    <div>
                      <p className="-mb-0 text-[16px] text-[#323232CC] text-opacity-80 font-medium">
                        From
                      </p>
                    </div>
                  </div>
                  <div>
                    <Link href="/user/profile/about">
                      <p className="-mb-0 text-[14px] text-blue-500 text-opacity-80 font-semibold">
                        Add Country
                      </p>
                    </Link>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-[10px]">
                  <div className="flex gap-x-2 items-center">
                    <div>
                      <p className="-mb-0 text-[16px] text-[#5EDFFF]">
                        <FaUser className="w-4 h-4" />
                      </p>
                    </div>
                    <div>
                      <p className="-mb-0 text-[16px] text-[#323232CC] text-opacity-80 font-medium">
                        Member Since
                      </p>
                    </div>
                  </div>
                  <div>
                    {" "}
                    <p className="-mb-0 text-[14px] text-[#323232CC] text-opacity-80 font-semibold">
                      Jul 2024
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-x-2 items-center">
                    <div>
                      <p className="-mb-0 text-[14px] text-[#5EDFFF]">
                        <IoMdTimer className="w-4 h-4" />
                      </p>
                    </div>
                    <div>
                      <p className="-mb-0 text-[16px] text-[#323232CC] text-opacity-80 font-medium">
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
        </div>
      </div>
      <div className="col-span-6">
        {" "}
        <div className="newsfeed-search">
          <ul className="member-list gap-2">
            <li className="active-member">
              <Image
                width={40}
                height={40}
                alt="img"
                src=""
                className="w-[45px] h-[45px] rounded-full border-2"
              />
            </li>
            <li>
              <button className="cursor-pointer">
                <div className="!w-full !max-w-[500px] bg-[#EEF3FA] border-[1px] h-[45px] rounded-full flex justify-start items-center pl-4 pr-[120px]">
                  <span className="text-[16px] font-mono font-medium">
                    what are you looking for, Bayzid?
                  </span>
                </div>
              </button>
            </li>
          </ul>
          <ul className="search-list">
            <li className="search-filter">
              <button className="drop-btn" type="button">
                <i className="icofont-abacus-alt" />
              </button>
              <div className="drop-menu"></div>
            </li>
          </ul>
        </div>
        {/* news feed card  */}
        <div>
          <PackageCard
            item={item}
            key={i}
            myId={myId}
            setlike={setlike}
            like={like}
            saveRerander={saveRerander}
            setSaveRerander={setSaveRerander}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePostTab;
