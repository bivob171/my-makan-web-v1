"use client";

import React, { useState } from "react";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import Image from "next/image";
import AllPost from "./AllPost";
import NewsFeedRightSection from "./NewsFeedRightSection";
import ChatModal from "./ChatModal";
import PostSection from "./PostSection";
import AvailablePosts from "@/app/user/profile/available-post/page";
import RequiredPosts from "@/app/user/profile/required-post/page";
import AllPostAgent from "./AgentPost/AllPostAgent";
import AvailablePostsAgent from "./AgentPost/AvailablePostsAgent";
import RequiredPostsAgent from "./AgentPost/RequiredPostsAgent";

export const NewsFeedPage = () => {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();

  const role = user?.role;
  const [isOpen, setIsOpen] = useState(false);
  function open() {
    setIsOpen(true);
  }
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
            <div className="media flex">
              <div className="item-icon mb-2">
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto py-4"
                  src="/media/favicon.jpg"
                  alt=""
                />
              </div>
              <div className="media-body">
                <h3 className="item-title">My Makan News Feed</h3>
                <p>All Realtors and Buyers Latest post</p>
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
          {user?.role === "agent" ? (
            <div className="row">
              <div className="col-lg-8">
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
                {activeTab === "allPosts" && <AllPost />}
                {activeTab === "availablePosts" && <AvailablePosts />}
                {activeTab === "required" && <RequiredPosts />}
              </div>
              <NewsFeedRightSection />
            </div>
          ) : (
            <div className="row">
              <div className="col-lg-8">
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
                {activeTab === "allPosts" && <AllPostAgent />}
                {activeTab === "availablePostsAgent" && <AvailablePostsAgent />}
                {activeTab === "requiredPostsAgent" && <RequiredPostsAgent />}
              </div>
              <NewsFeedRightSection />
            </div>
          )}
        </div>
      </div>

      {/* Chat Modal Here */}
      <ChatModal />
    </>
  );
};
