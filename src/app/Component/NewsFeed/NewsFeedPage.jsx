"use client";

import React, { useState } from "react";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import Image from "next/image";
import NewsFeedRightSection from "./NewsFeedRightSection";
import ChatModal from "./ChatModal";
import PostSection from "./PostSection";
import { AccountVerifyModal } from "./AccountVerifyModal";
import { AllTotalPost } from "./TotalPost/AllTotalPost";
import { AvailableTotalPost } from "./TotalPost/AvailableTotalPost";
import { RequiredTotalPost } from "./TotalPost/RequiredTotalPost";

export const NewsFeedPage = () => {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();
  const userName = user?.fullName?.split(" ")[0];
  const [verifyPopup, setVerifyPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  function open() {
    setIsOpen(true);
  }
  const role = user?.role;
  const [activeTab, setActiveTab] = useState("allPosts");

  const dateStr = user?.createdAt;

  const dateObj = new Date(dateStr);

  const options = { year: "numeric", month: "short" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);

  return (
    <>
      <div className="page-content">
        <div className="container">
          {/* Banner Area Start */}
          <div className="newsfeed-banner">
            <div className="media  gap-x-5 items-center flex">
              <div className="flex gap-x-5 mb-2">
                <Image
                  width={1000}
                  height={100}
                  className="w-[60px] h-auto py-4"
                  src="/media/favicon.jpg"
                  alt=""
                />
              </div>
              <div className="bg-white w-[5px] h-[65px] rounded-b-[10px] rounded-t-[10px]"></div>
              <div className="media-body">
                <h3 className="text-white font-iuter  font-extrabold text-[32px] ">
                  My Makan Newsfeed
                </h3>
                <p className="font-iuter text-white">
                  All Realtors and Buyers Latest post
                </p>
              </div>
            </div>
            <ul className="animation-img">
              <li
                data-sal="slide-down"
                data-sal-duration={800}
                data-sal-delay={400}
              >
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto"
                  src="/media/banner/shape_7.png"
                  alt="shape"
                />
              </li>
              <li>
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto"
                  src="/media/banner/people_2.png"
                  alt="shape"
                />
              </li>
            </ul>
          </div>
          <div>
            <PostSection isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          {/* post nav section  */}
          <div className="row">
            <div className="col-lg-3 widget-block widget-break-lg ">
              <NewsFeedRightSection />
            </div>
            <div className="col-lg-6">
              <div className="newsfeed-search">
                <ul className="member-list gap-2">
                  <li className="active-member">
                    <Image
                      width={40}
                      height={40}
                      alt="img"
                      src={user?.image}
                      className="w-[45px] h-[45px] rounded-full border-2"
                    />
                  </li>
                  <li>
                    {user?.role === "agent" ? (
                      <>
                        {user?.verified === false ? (
                          <>
                            <button
                              className="cursor-pointer"
                              onClick={() => setVerifyPopup(true)}
                            >
                              <div className="!w-full !max-w-[500px] bg-[#EEF3FA] border-[1px] h-[45px] rounded-full flex justify-start items-center pl-4 pr-[120px]">
                                <span className="text-[16px] font-mono font-medium">
                                  what are you looking for, {userName}?
                                </span>
                              </div>
                            </button>
                          </>
                        ) : (
                          <>
                            <button className="cursor-pointer" onClick={open}>
                              <div className="!w-full !max-w-[500px] bg-[#EEF3FA] border-[1px] h-[45px] rounded-full flex justify-start items-center px-3">
                                <span className="text-[16px] font-mono font-medium">
                                  what are you looking for, {userName}?
                                </span>
                              </div>
                            </button>
                          </>
                        )}
                      </>
                    ) : (
                      <button className="cursor-pointer" onClick={open}>
                        <div className="w-[500px] bg-[#EEF3FA] border-[1px] h-[45px] rounded-full flex justify-start items-center px-3">
                          <span className="text-[16px] font-mono font-medium">
                            what are you looking for, {userName}?
                          </span>
                        </div>
                      </button>
                    )}
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
              <div className="block-box post-input-tab">
                <ul className="nav nav-tabs" role="tablist">
                  <li
                    className="nav-item"
                    role="presentation"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="STATUS"
                  >
                    <a
                      className={`nav-link ${
                        activeTab === "allPosts" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("allPosts")}
                      role="tab"
                      aria-selected={activeTab === "allPosts"}
                    >
                      <i className="icofont-copy" />
                      All Posts
                    </a>
                  </li>
                  <li
                    className="nav-item"
                    role="presentation"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="MEDIA"
                  >
                    <a
                      className={`nav-link ${
                        activeTab === "availablePosts" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("availablePosts")}
                      role="tab"
                      aria-selected={activeTab === "availablePosts"}
                    >
                      <i className="icofont-image" />
                      Available Posts
                    </a>
                  </li>
                  <li
                    className="nav-item"
                    role="presentation"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="BLOG"
                  >
                    <a
                      className={`nav-link ${
                        activeTab === "required" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("required")}
                      role="tab"
                      aria-selected={activeTab === "required"}
                    >
                      <i className="icofont-list" />
                      Required Posts
                    </a>
                  </li>
                </ul>
              </div>
              {activeTab === "allPosts" && <AllTotalPost />}
              {activeTab === "availablePosts" && <AvailableTotalPost />}
              {activeTab === "required" && <RequiredTotalPost />}
            </div>
            <div className="col-lg-3 widget-block widget-break-lg">
              <NewsFeedRightSection />
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal Here */}
      <ChatModal />
      <AccountVerifyModal visible={verifyPopup} closePopUp={setVerifyPopup} />
    </>
  );
};
