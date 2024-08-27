"use client";
import AllPost from "@/app/Component/NewsFeed/AllPost";
import NewsFeedRightSection from "@/app/Component/NewsFeed/NewsFeedRightSection";
import PostSection from "@/app/Component/NewsFeed/PostSection";
import React, { useState } from "react";
import AvailablePosts from "../profile/available-post/page";
import RequiredPosts from "../profile/required-post/page";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import Image from "next/image";
import NewsFeedLeftSection from "@/app/Component/NewsFeed/NewsFeedLeftSection";
import PostSearch from "@/app/Component/NewsFeed/PostSearch/PostSearch";

export default function BuyerPosts() {
  const [activeTab, setActiveTab] = useState("allPosts");
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();
  const userName = user?.fullName?.split(" ")[0];
  const [verifyPopup, setVerifyPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  function open() {
    setIsOpen(true);
  }
  const role = user?.role;
  return (
    <div className="page-content -mt-11">
      <div className="container">
        <PostSection isOpen={isOpen} setIsOpen={setIsOpen} />
        {/* post nav section  */}

        <div className="row">
          <div className="col-lg-3 widget-block widget-break-lg ">
            <div className="!sticky top-[110px] ">
              <div className="h-[86vh] overflow-y-scroll">
                <NewsFeedLeftSection />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="!sticky top-[100px] bg-[#EFF4FB] z-440">
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

            {activeTab === "allPosts" && <AllPost />}
            {activeTab === "availablePosts" && <AvailablePosts />}
            {activeTab === "required" && <RequiredPosts />}
          </div>
          <div className="col-lg-3 widget-block widget-break-lg">
            <NewsFeedRightSection />
          </div>
        </div>
      </div>
    </div>
  );
}
