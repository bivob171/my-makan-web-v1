"use client";

import React from "react";
import Image from "next/image";
import { MdNavigateNext } from "react-icons/md";
import companyData from "@/data/companyData";

export const CompanyPage = () => {

  return (
    <div>
      <div className="page-content">
        <div className="container">
          <div className="w-auto py-[20px] px-[25px] bg-white lg:flex items-center justify-center gap-6 mb-[30px] rounded-md">
            <div>
              <div class="relative w-[100%]">
                <input
                  class="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full !max-w-[350px] py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Search Company..."
                />
                <div class="absolute right-0 inset-y-0 flex items-center">
                  <Image
                    src="/companyicon.png"
                    width={100}
                    height={100}
                    className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
                    alt="Mountain"
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="button"
                class="inline-block rounded bg-primary px-8 py-2 text-[16px] uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong font-bold w-full"
              >
                Find
              </button>
            </div>
          </div>
          <div>
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
              {companyData.map((data) => (
                <div
                  className="delay-150 duration-200 ease-in-out hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] w-full bg-white rounded-lg relative border-[#E8E8E8] border-[1px] transition shadow-[#615DFA] hover:-translate-y-1 hover:scale-100"
                  key={data.id}
                >
                  <div class="rounded-t-lg h-[130px] overflow-hidden relative">
                    <Image
                      width={100}
                      height={100}
                      className="object-cover w-full h-[130px] backdrop-blur-sm bg-black/30 hover:backdrop-blur-none"
                      src={data.image}
                      alt="Mountain"
                    />
                  </div>
                  <div className="px-[12px] py-2">
                    <div class="text-start mt-[9px]">
                      <div className="flex items-center justify-between cursor-pointer">
                        <h2 class="font-semibold leading-[14px] text-[15px] text-[#222] -mb-0 hover:!text-[#615DFA] transition delay-150 duration-300 ease-in-out">
                          {data.name}
                        </h2>
                        <p className="font-semibold leading-[15px]  text-[18px] text-[#999] mb-[2px] cursor-pointer">
                          <MdNavigateNext className="w-5 h-5" />
                        </p>
                      </div>

                      <h2 class="font-medium leading-[10px] mt-[10px] text-[14px] text-[#777] ">
                        {data.agentCount} Active Agents
                      </h2>
                    </div>
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
