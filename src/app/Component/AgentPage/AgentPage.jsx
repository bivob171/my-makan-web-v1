"use client";

import React from "react";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import Image from "next/image";
import agentData from "@/data/agentData";

export const AgentPage = () => {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();
  const dateStr = user?.createdAt;

  const dateObj = new Date(dateStr);

  const options = { year: "numeric", month: "short" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);

  const formatLanguages = (languages) => {
    if (languages.length === 0) {
      return "";
    } else if (languages.length === 1) {
      return languages[0];
    } else if (languages.length === 2) {
      return `${languages[0]} and ${languages[1]}`;
    } else {
      const firstLanguages = languages.slice(0, 2).join(", ");
      const remainingCount = languages.length - 2;
      return `${firstLanguages} and ${remainingCount} more language${
        remainingCount > 1 ? "s" : ""
      }`;
    }
  };

  return (
    <div>
      <div className="page-content">
        <div className="container">
          <div className="w-auto py-[20px] px-[25px] bg-white grid grid-cols-4 rounded-md items-center gap-6 mb-10">
            <div>
              <div className="relative">
                <input
                  className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Search country..."
                />
                <div className="absolute right-0 inset-y-0 flex items-center">
                  <Image
                    width={100}
                    height={100}
                    src="/countryicon1.png"
                    className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
                    alt="Mountain"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="relative">
                <input
                  className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Search State..."
                />
                <div className="absolute right-0 inset-y-0 flex items-center">
                  <Image
                    width={100}
                    height={100}
                    src="/stateicon.png"
                    className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
                    alt="Mountain"
                  ></Image>
                </div>
              </div>
            </div>
            <div>
              <div className="relative">
                <input
                  className="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline "
                  id="username"
                  type="text"
                  placeholder="Search Company..."
                />
                <div className="absolute right-0 inset-y-0 flex items-center">
                  <Image
                    width={100}
                    height={100}
                    src="/companyicon.png"
                    className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="button"
                className="inline-block rounded bg-primary px-6 py-2 text-[16px] uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong font-bold w-full"
              >
                Find
              </button>
            </div>
          </div>

          <div className="">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
              {agentData.map((data) => (
                <div
                  className="delay-150 duration-200 ease-in-out hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-full bg-white rounded-lg relative border-[#E8E8E8] border-[1px] transition shadow-[#615DFA]"
                  key={data.id}
                >
                  <div className="rounded-t-lg h-[95px] relative">
                    <Image
                      width={100}
                      height={100}
                      className="object-cover object-center w-full h-full rounded-t-lg"
                      src={data.image}
                      alt="Mountain"
                    />
                    <div className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-0">
                      <div className="mx-auto h-[75px] w-[75px] border-4 border-[#615DFA] relative rounded-full z-30">
                        <Image
                          width={100}
                          height={100}
                          className="object-cover h-[70px] w-[70px] rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                          src={data.profile}
                          alt="Woman looking front"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pt-8">
                    <div className="text-start space-y-[10px]">
                      <h2 className="font-semibold leading-[15px] text-[20px] text-[#333] !mb-6 font-mono mt-2 uppercase">
                        {data.name}
                      </h2>
                      <h2 className="font-semibold leading-[17px] text-[15px] text-[#666] ">
                        Properties:{" "}
                        <span className="font-normal font-mono">
                          {data.properties}
                        </span>
                      </h2>
                      <h2 className="font-semibold leading-[17px] -mb-0 mt-[5px] text-[15px] text-[#666] ">
                        Spake:{" "}
                        <span className="font-normal font-mono">
                          {formatLanguages(data.spake[0].split(", "))}
                        </span>
                      </h2>
                      <h2 className="font-semibold leading-[17px] mt-[5px] text-[15px] text-[#666] ">
                        Country:{" "}
                        <span className="font-normal font-mono">
                          {data.country}
                        </span>
                      </h2>
                    </div>
                    <hr className="mt-4 mb-2 mx-8" />
                    <center>
                      <button
                        type="button"
                        className="text-center mb-3 text-[#615DFA] hover:text-[#6c67fdf6] font-semibold hover:drop-shadow-2xl hover:font-bold hover:shadow-[#615DFA]"
                        data-twe-ripple-init
                      >
                        View Profile
                      </button>
                    </center>
                  </div>
                </div>
              ))}
            </div>
            <div className="block-box load-more-btn mt-10">
              <a href="#" className="item-btn">
                <i className="icofont-refresh" />
                Load More Posts
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
