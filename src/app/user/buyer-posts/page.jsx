"use client";
import AllPost from "@/app/Component/NewsFeed/AllPost";
import NewsFeedRightSection from "@/app/Component/NewsFeed/NewsFeedRightSection";
import PostSection from "@/app/Component/NewsFeed/PostSection";
import React, { useState } from "react";
import AvailablePosts from "../profile/available-post/page";
import RequiredPosts from "../profile/required-post/page";

export default function BuyerPosts() {
  const [activeTab, setActiveTab] = useState("allPosts");
  return (
    <div className="page-content">
      <div className="container">
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
      </div>
    </div>
  );
}
