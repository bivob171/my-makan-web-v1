"use client";
import AllPostAgent from "@/app/Component/NewsFeed/AgentPost/AllPostAgent";
import AvailablePostsAgent from "@/app/Component/NewsFeed/AgentPost/AvailablePostsAgent";
import RequiredPostsAgent from "@/app/Component/NewsFeed/AgentPost/RequiredPostsAgent";
import NewsFeedRightSection from "@/app/Component/NewsFeed/NewsFeedRightSection";
import PostSection from "@/app/Component/NewsFeed/PostSection";
import React, { useState } from "react";

export default function AgentPosts() {
  const [activeTab, setActiveTab] = useState("allPostsAgent");
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
    </div>
  );
}
