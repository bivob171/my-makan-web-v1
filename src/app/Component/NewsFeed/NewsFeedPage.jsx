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
import NewsFeedLeftSection from "./NewsFeedLeftSection";
import PostSearch from "./PostSearch/PostSearch";

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
      <div className="page-content mt-6 lg:mt-0">
        <div className="container">
          <div className="newsfeed-banner !mb-0">
            <div className="media gap-x-4 items-center flex md:py-4">
              <div className="flex gap-x-5 mb-2">
                <Image
                  width={1000}
                  height={100}
                  className="w-[45px] md:w-[50px] h-auto"
                  src="/media/favicon.jpg"
                  alt=""
                />
              </div>
              <div className="bg-white w-[3px] h-[65px] rounded-b-[10px] rounded-t-[10px]" />
              <div className="media-body !text-start">
                <h3 className="text-white font-iuter font-extrabold text-[24px] md:text-[32px]">
                  My Makan Newsfeed
                </h3>
                <p className="font-iuter text-white leading-none">
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
          <div className="grid lg:grid-cols-12 gap-[24px]">
            <div className="lg:col-span-3 hidden lg:block">
              <div className="!sticky top-[110px]">
                <div className="h-[86vh] overflow-y-scroll">
                  <NewsFeedLeftSection />
                </div>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="md:!sticky top-[100px] bg-[#EFF4FB] z-40">
                <PostSearch
                  open={open}
                  user={user}
                  setVerifyPopup={setVerifyPopup}
                  userName={userName}
                />

                <div className="block-box post-input-tab !rounded-none border-t">
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
              </div>
              {activeTab === "allPosts" && <AllTotalPost />}
              {activeTab === "availablePosts" && <AvailableTotalPost />}
              {activeTab === "required" && <RequiredTotalPost />}
            </div>
            <div className="lg:col-span-3 hidden lg:block ">
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
