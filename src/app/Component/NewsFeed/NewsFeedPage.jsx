"use client";

import React, { useState } from "react";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import Image from "next/image";
import AllPost from "./AllPost";
import NewsFeedRightSection from "./NewsFeedRightSection";
import AddPost from "./AddPost";
import Blogs from "@/app/user/profile/blogs/page";
import ChatModal from "./ChatModal";
import PostSection from "./PostSection";
import AvailablePosts from "./AvailablePost";

export const NewsFeedPage = () => {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();

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
          <PostSection />
          {/* post nav section  */}
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
                        activeTab === "addPost" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("addPost")}
                      role="tab"
                      aria-selected={activeTab === "addPost"}
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
                        activeTab === "blogs" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("blogs")}
                      role="tab"
                      aria-selected={activeTab === "blogs"}
                    >
                      <i className="icofont-list" />
                      Required Posts
                    </a>
                  </li>
                </ul>
              </div>
              {activeTab === "allPosts" && <AllPost />}
              {activeTab === "availablePosts" && <AvailablePosts />}
              {activeTab === "blogs" && <Blogs />}
            </div>
            <NewsFeedRightSection />
          </div>
        </div>
      </div>

      {/* Chat Modal Here */}
      <ChatModal />
    </>
  );
};
