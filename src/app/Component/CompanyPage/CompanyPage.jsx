"use client";
import Image from "next/image";
import React from "react";
import { MdNavigateNext } from "react-icons/md";
import { ProfileCard } from "../ProfileCard/ProfileCard";
export const CompanyPage = () => {
  return (
    <div>
      <div className="page-content">
        <div className="container">
          <div className="lg:w-[1100px] w-full py-[20px] px-[25px] rounded-sm bg-white lg:flex items-center justify-between mb-[30px]">
            <div>
              <div class="relative">
                <input
                  class="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-[330px] py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Search Company..."
                />
                <div class="absolute right-0 inset-y-0 flex items-center">
                  <Image
                    width={100}
                    height={100}
                    src="/companyicon.png"
                    className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
                  ></Image>
                </div>
              </div>
            </div>

            <div>
              <button
                type="button"
                class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-[16px] uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong font-bold w-full mt-[10px]"
              >
                Find
              </button>
            </div>
          </div>
          <div>
            <div className="mb-[30px]">
              <div class="w-[270px] h-[180px] bg-white rounded-lg relative border-[#E8E8E8] border-[1px] hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-shadow duration-300">
                <div class="rounded-t-lg h-[120px] overflow-hidden relative">
                  <img
                    class="object-cover object-top w-full h-[120px]"
                    src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                    alt="Mountain"
                  />
                </div>
                <div className="px-[12px]">
                  <div class="text-start mt-[9px]">
                    <div className="flex items-center justify-between">
                      <h2 class="font-semibold leading-[14px]  text-[15px] text-[#191919] -mb-0">
                        My-Makan LTD
                      </h2>
                      <p className="font-semibold leading-[15px]  text-[18px] text-[#191919] mb-[2px] cursor-pointer">
                        <MdNavigateNext />
                      </p>
                    </div>

                    <h2 class="font-medium leading-[10px] mt-[6px] text-[13px] text-[#191919] ">
                      95000 Active Agents
                    </h2>
                  </div>
                </div>
              </div>
            </div>
            <div className="block-box load-more-btn">
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
