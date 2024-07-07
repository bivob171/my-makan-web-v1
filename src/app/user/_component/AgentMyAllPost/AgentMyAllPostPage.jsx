import React, { useState } from "react";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import AgentMyAllPosts from "./AgentMyAllPosts";
import AgentMyAvailablePosts from "./AgentMyAvailablePosts";
import AgentMyRequiredPosts from "./AgentMyRequiredPosts";

export const AgentMyAllPostPage = () => {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();
  const [activeTab, setActiveTab] = useState("allPosts");

  return (
    <div className="container">
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
    </div>
  );
};
