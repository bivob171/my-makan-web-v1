"use client";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { AccountVerifyModal } from "@/app/Component/NewsFeed/AccountVerifyModal";
import AllPostAgent from "@/app/Component/NewsFeed/AgentPost/AllPostAgent";
import AvailablePostsAgent from "@/app/Component/NewsFeed/AgentPost/AvailablePostsAgent";
import RequiredPostsAgent from "@/app/Component/NewsFeed/AgentPost/RequiredPostsAgent";
import NewsFeedRightSection from "@/app/Component/NewsFeed/NewsFeedRightSection";
import PostSection from "@/app/Component/NewsFeed/PostSection";
import Image from "next/image";
import React, { useState } from "react";

export default function AgentPosts() {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();
  const [activeTab, setActiveTab] = useState("allPostsAgent");
  const userName = user?.fullName?.split(" ")[0];
  const [verifyPopup, setVerifyPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  function open() {
    setIsOpen(true);
  }
  return (
    <div className="page-content">
      <div className="container">
        <PostSection isOpen={isOpen} setIsOpen={setIsOpen} />
        {/* post nav section  */}

        <div className="row">
          <div className="col-lg-8">
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
                  {user?.verified !== true ? (
                    <>
                      <button
                        className="cursor-pointer"
                        onClick={() => setVerifyPopup(true)}
                      >
                        <div className="w-[500px] bg-[#EEF3FA] border-[1px] h-[45px] rounded-full flex justify-start items-center px-3">
                          <span className="text-[16px] font-mono font-medium">
                            what are you looking for, {userName}?
                          </span>
                        </div>
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="cursor-pointer" onClick={open}>
                        <div className="w-[500px] bg-[#EEF3FA] border-[1px] h-[45px] rounded-full flex justify-start items-center px-3">
                          <span className="text-[16px] font-mono font-medium">
                            what are you looking for, {userName}?
                          </span>
                        </div>
                      </button>
                    </>
                  )}
                </li>
              </ul>
              <ul className="search-list">
                <li className="search-filter">
                  <button className="drop-btn" type="button">
                    <i className="icofont-abacus-alt" />
                  </button>
                  <div className="drop-menu">
                    <select className="select2">
                      <option>--Everything--</option>
                      <option>Status</option>
                      <option>Quotes</option>
                      <option>Photos</option>
                      <option>Videos</option>
                      <option>Audios</option>
                      <option>slideshows</option>
                      <option>files</option>
                      <option>Updates</option>
                      <option>New Members</option>
                      <option>Posts</option>
                      <option>New Groups</option>
                    </select>
                  </div>
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
                  title="MEDIA"
                >
                  <a
                    className={`nav-link ${
                      activeTab === "availablePostsAgent" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("availablePostsAgent")}
                    role="tab"
                    aria-selected={activeTab === "availablePostsAgent"}
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
            {activeTab === "allPostsAgent" && <AllPostAgent />}
            {activeTab === "availablePostsAgent" && <AvailablePostsAgent />}
            {activeTab === "requiredPostsAgent" && <RequiredPostsAgent />}
          </div>
          <NewsFeedRightSection />
        </div>
      </div>
      <AccountVerifyModal visible={verifyPopup} closePopUp={setVerifyPopup} />
    </div>
  );
}
