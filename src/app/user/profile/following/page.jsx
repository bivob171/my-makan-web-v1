"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FollowCard } from "../../_component/Card/FollowCard";
import { FollowingAgentPage } from "../../_component/FollowComponent/FollowingAgentPage";
import { FollowingUserPage } from "../../_component/FollowComponent/FollowingUserPage";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
export default function Following() {
  const [activeTab, setActiveTab] = useState("Agent");
  const { user } = PrivateRouteContext;
  return (
    <>
      {/* Page Content */}
      <div className="page-conten">
        <div className="container">
          {user?.role === "agent" ? (
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
                      activeTab === "Agent" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("Agent")}
                    role="tab"
                    aria-selected={activeTab === "Agent"}
                  >
                    <i className="icofont-copy" />
                    All Following Agent
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
                      activeTab === "Buyer" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("Buyer")}
                    role="tab"
                    aria-selected={activeTab === "Buyer"}
                  >
                    <i className="icofont-image" />
                    All Following Buyer
                  </a>
                </li>
              </ul>
            </div>
          ) : null}

          {user?.role === "agent" ? (
            <div>
              {activeTab === "Agent" && <FollowingAgentPage />}
              {activeTab === "Buyer" && <FollowingUserPage />}
            </div>
          ) : (
            <div>
              <FollowingAgentPage />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
