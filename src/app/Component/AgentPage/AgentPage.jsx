"use client";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosStar, IoMdTimer } from "react-icons/io";
import { FaCheckCircle, FaUser } from "react-icons/fa";
import { FaLocationDot, FaStarHalfStroke } from "react-icons/fa6";
import { MdNavigateNext } from "react-icons/md";
import { ProfileCard } from "../ProfileCard/ProfileCard";
export const AgentPage = () => {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();
  const dateStr = user?.createdAt;

  const dateObj = new Date(dateStr);

  const options = { year: "numeric", month: "short" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);
  return (
    <div>
      <div className="page-content">
        <div className="container">
          <div className="lg:w-[1100px] w-full py-[20px] px-[15px] rounded-sm bg-white flex items-center justify-between">
            <div>
              <div class="relative">
                <input
                  class="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Search country..."
                />
                <div class="absolute right-0 inset-y-0 flex items-center">
                  <Image
                    width={100}
                    height={100}
                    src="/countryicon1.png"
                    className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
                  ></Image>
                </div>
              </div>
            </div>
            <div>
              <div class="relative">
                <input
                  class="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="Search State..."
                />
                <div class="absolute right-0 inset-y-0 flex items-center">
                  <Image
                    width={100}
                    height={100}
                    src="/stateicon.png"
                    className="-ml-1 mr-3 h-5 w-5 text-gray-400 hover:text-gray-500"
                  ></Image>
                </div>
              </div>
            </div>
            <div>
              <div class="relative">
                <input
                  class="appearance-none border-2 pl-10 border-gray-300 hover:border-gray-400 transition-colors rounded-md w-full py-2 px-3 text-gray-800 leading-tight focus:outline-none focus:ring-purple-600 focus:border-purple-600 focus:shadow-outline"
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
                class="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              >
                Find
              </button>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-8">
              <div className="mb-[50px]">
                <div class="w-[249px] h-[242px] bg-white rounded-lg relative border-[#E8E8E8] border-[1px] hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] transition-shadow duration-300">
                  <div class="rounded-t-lg h-[86px] overflow-hidden relative">
                    <img
                      class="object-cover object-top w-full h-[62px]"
                      src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                      alt="Mountain"
                    />
                    <div class="mx-auto h-[65px] w-[65px] border-4 border-[#615DFA] rounded-full absolute top-[20px] left-[10px] ">
                      <img
                        class="object-cover  h-[57px] z-50 w-[65px] rounded-full"
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
                        alt="Woman looking front"
                      />
                    </div>
                  </div>
                  <div className="px-[12px]">
                    <div class="text-start mt-[9px]">
                      <h2 class="font-semibold leading-[15px]  text-[16px] text-[#191919] -mb-0">
                        MD Bayzid Islam Nishat
                      </h2>
                      <h2 class="font-normal leading-[15px] -mb-0 mt-[9px] text-[14px] text-[#191919] ">
                        Properties: <span className="font-medium">19</span>
                      </h2>
                      <h2 class="font-normal leading-[17px] -mb-0 mt-[5px] text-[14px] text-[#191919] ">
                        Speakes:{" "}
                        <span className="font-medium">
                          English, Bangla and 2 more languses
                        </span>
                      </h2>
                      <h2 class="font-normal leading-[10px] mt-[5px] text-[14px] text-[#191919] ">
                        Bangladesh
                      </h2>
                    </div>
                    <div className=" absolute bottom-[10px]">
                      <button
                        type="button"
                        class="inline-block  rounded-[20px] border-[2px] border-primary w-[225px] h-[30px]  uppercase  text-primary transition duration-150 ease-in-out hover:border-primary-accent-300 hover:bg-primary-50/50 hover:text-primary-accent-300 focus:border-primary-600 focus:bg-primary-50/50 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 motion-reduce:transition-none dark:text-primary-500 dark:hover:bg-blue-950 dark:focus:bg-blue-950 font-semibold leading-[2px] pt-[2px]"
                        data-twe-ripple-init
                      >
                        View Profile
                      </button>
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
            <div className="col-lg-4 widget-block widget-break-lg">
              <div>
                <ProfileCard />
              </div>
              <div className="widget widget-memebers widget-activity">
                <div className="widget-heading">
                  <h3 className="widget-title">My Connect Activity</h3>
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      ...
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">
                        Close
                      </a>
                      <a className="dropdown-item" href="#">
                        Edit
                      </a>
                      <a className="dropdown-item" href="#">
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
                <div className="activity-list">
                  <div className="media">
                    <div className="item-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/chat_10.jpg"
                          alt="Chat"
                        />
                      </a>
                    </div>
                    <div className="media-body">
                      <h4 className="item-title">
                        <a href="#" className="author-name">
                          Aahat Akter
                        </a>
                        commented on Destroy Dex&apos;&s
                        <a href="#" className="activity-link">
                          Photo
                        </a>
                      </h4>
                      <div className="activity-time">20 minutes ago</div>
                    </div>
                  </div>
                  <div className="media">
                    <div className="item-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/chat_8.jpg"
                          alt="Chat"
                        />
                      </a>
                    </div>
                    <div className="media-body">
                      <h4 className="item-title">
                        <a href="#" className="author-name">
                          Neko Bebop
                        </a>
                        liked Marina
                        <a href="#" className="activity-link">
                          Status
                        </a>
                      </h4>
                      <div className="activity-time">15 minutes ago</div>
                    </div>
                  </div>
                  <div className="media">
                    <div className="item-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/chat_1.jpg"
                          alt="Chat"
                        />
                      </a>
                    </div>
                    <div className="media-body">
                      <h4 className="item-title">
                        <a href="#" className="author-name">
                          Neko Bebop
                        </a>
                        commented on Destroy Dex&apos;s
                        <a href="#" className="activity-link">
                          Photo
                        </a>
                      </h4>
                      <div className="activity-time">20 minutes ago</div>
                    </div>
                  </div>
                  <div className="media">
                    <div className="item-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/chat_6.jpg"
                          alt="Chat"
                        />
                      </a>
                    </div>
                    <div className="media-body">
                      <h4 className="item-title">
                        <a href="#" className="author-name">
                          Neko Bebop
                        </a>
                        commented on Destroy Dex&apos;s
                        <a href="#" className="activity-link">
                          Photo
                        </a>
                      </h4>
                      <div className="activity-time">20 minutes ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
