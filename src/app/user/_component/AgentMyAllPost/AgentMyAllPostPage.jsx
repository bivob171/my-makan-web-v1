import React, { useState } from "react";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import AgentMyAllPosts from "./AgentMyAllPosts";
import AgentMyAvailablePosts from "./AgentMyAvailablePosts";
import AgentMyRequiredPosts from "./AgentMyRequiredPosts";
import { AccountVerifyModal } from "@/app/Component/NewsFeed/AccountVerifyModal";
import PostSection from "@/app/Component/NewsFeed/PostSection";
import Image from "next/image";

export const AgentMyAllPostPage = () => {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();
  const [activeTab, setActiveTab] = useState("allPosts");

  const userName = user?.fullName?.split(" ")[0];
  const [verifyPopup, setVerifyPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  function open() {
    setIsOpen(true);
  }

  return (
    <div className="container">
      <PostSection isOpen={isOpen} setIsOpen={setIsOpen} />
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
      <div className="">
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
        {activeTab === "allPosts" && <AgentMyAllPosts />}
        {activeTab === "availablePosts" && <AgentMyAvailablePosts />}
        {activeTab === "required" && <AgentMyRequiredPosts />}
      </div>
      <AccountVerifyModal visible={verifyPopup} closePopUp={setVerifyPopup} />
    </div>
  );
};
