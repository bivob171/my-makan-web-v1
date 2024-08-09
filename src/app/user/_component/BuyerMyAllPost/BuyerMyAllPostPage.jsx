import React, { useState } from "react";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import BuyerMyAllPosts from "./BuyerMyAllPosts";
import BuyerMyRequiredPosts from "./BuyerMyRequiredPosts";
import BuyerMyAvailablePosts from "./BuyerMyAvailablePosts";
import Image from "next/image";
import PostSection from "@/app/Component/NewsFeed/PostSection";
import PostSearch from "@/app/Component/NewsFeed/PostSearch/PostSearch";

export const BuyerMyAllPostPage = () => {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();

  const [activeTab, setActiveTab] = useState("allPosts");
  const userName = user?.fullName?.split(" ")[0];

  const [isOpen, setIsOpen] = useState(false);
  function open() {
    setIsOpen(true);
  }
  return (
    <div className="container">
      <PostSection isOpen={isOpen} setIsOpen={setIsOpen} />
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
      <div className="">
        {activeTab === "allPosts" && <BuyerMyAllPosts />}
        {activeTab === "availablePosts" && <BuyerMyAvailablePosts />}
        {activeTab === "required" && <BuyerMyRequiredPosts />}
      </div>
    </div>
  );
};
