"use client";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { AccountVerifyModal } from "@/app/Component/NewsFeed/AccountVerifyModal";
import AllPostAgent from "@/app/Component/NewsFeed/AgentPost/AllPostAgent";
import AvailablePostsAgent from "@/app/Component/NewsFeed/AgentPost/AvailablePostsAgent";
import RequiredPostsAgent from "@/app/Component/NewsFeed/AgentPost/RequiredPostsAgent";
import NewsFeedLeftSection from "@/app/Component/NewsFeed/NewsFeedLeftSection";
import NewsFeedRightSection from "@/app/Component/NewsFeed/NewsFeedRightSection";
import PostSearch from "@/app/Component/NewsFeed/PostSearch/PostSearch";
import PostSection from "@/app/Component/NewsFeed/PostSection";
import React, { useState } from "react";

export default function AgentPosts() {
  const { user } = PrivateRouteContext();
  const userName = user?.fullName?.split(" ")[0];
  const [verifyPopup, setVerifyPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  function open() {
    setIsOpen(true);
  }
  const [activeTab, setActiveTab] = useState("allPostsAgent");
  return (
    <div className="page-content">
      <div className="container">
        <PostSection isOpen={isOpen} setIsOpen={setIsOpen} />
        {/* post nav section  */}

        <div className="row">
          <div className="col-lg-3 widget-block widget-break-lg ">
            <div className="!sticky top-[110px]">
              <div className="h-[86vh] overflow-y-scroll">
                <NewsFeedLeftSection />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="!sticky top-[100px] bg-[#EFF4FB] z-10">
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
                        activeTab === "allPostsAgent" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("allPostsAgent")}
                      role="tab"
                      aria-selected={activeTab === "allPostsAgent"}
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
                    title="BLOG"
                  >
                    <a
                      className={`nav-link ${
                        activeTab === "availablePostsAgent" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("availablePostsAgent")}
                      role="tab"
                      aria-selected={activeTab === "availablePostsAgent"}
                    >
                      <i className="icofont-list" />
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
                        activeTab === "requiredPostsAgent" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("requiredPostsAgent")}
                      role="tab"
                      aria-selected={activeTab === "requiredPostsAgent"}
                    >
                      <i className="icofont-list" />
                      Required Posts
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {activeTab === "allPostsAgent" && <AllPostAgent />}
            {activeTab === "availablePostsAgent" && <AvailablePostsAgent />}
            {activeTab === "requiredPostsAgent" && <RequiredPostsAgent />}
          </div>
          <div className="col-lg-3 widget-block widget-break-lg">
            <NewsFeedRightSection />
          </div>
        </div>
      </div>
      <AccountVerifyModal visible={verifyPopup} closePopUp={setVerifyPopup} />
    </div>
  );
}
