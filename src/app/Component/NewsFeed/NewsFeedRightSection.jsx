"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ProfileCard } from "../ProfileCard/ProfileCard";
import { TopAgent } from "./TopNewPopulerAgent/TopAgent";
import { NewAgents } from "./TopNewPopulerAgent/NewAgents";
import { PopulerAgents } from "./TopNewPopulerAgent/PopulerAgents";

const NewsFeedRightSection = () => {
  const [activeTab, setActiveTab] = useState("topAgents");
  return (
    <>
      <div className="col-lg-4 widget-block widget-break-lg">
        <div>
          <ProfileCard />
        </div>
        <div className="widget widget-memebers">
          <div className="widget-heading">
            <h3 className="widget-title">Agents</h3>
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                ...
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#">
                  Close
                </a>
                <a className="dropdown-item" href="#">
                  Edit
                </a>
                <a className="dropdown-item" href="#">
                  Delete
                </a>
              </div>
            </div>
          </div>
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "topAgents" ? "active" : ""
                }`}
                data-toggle="tab"
                onClick={() => setActiveTab("topAgents")}
                role="tab"
                aria-selected={activeTab === "topAgents" && "true"}
              >
                Top Agents
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "newAgents" ? "active" : ""
                }`}
                data-toggle="tab"
                onClick={() => setActiveTab("newAgents")}
                role="tab"
                aria-selected={activeTab === "newAgents" && "true"}
              >
                NEWEST
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "populerAgents" ? "active" : ""
                }`}
                data-toggle="tab"
                onClick={() => setActiveTab("populerAgents")}
                role="tab"
                aria-selected={activeTab === "populerAgents" && "true"}
              >
                POPULAR
              </a>
            </li>
          </ul>
          <div className="">
            {activeTab === "topAgents" && <TopAgent />}
            {activeTab === "newAgents" && <NewAgents />}
            {activeTab === "populerAgents" && <PopulerAgents />}
          </div>
        </div>
        <div className="widget widget-groups">
          <div className="widget-heading">
            <h3 className="widget-title">Categories</h3>
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                ...
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#">
                  Close
                </a>
                <a className="dropdown-item" href="#">
                  Edit
                </a>
                <a className="dropdown-item" href="#">
                  Delete
                </a>
              </div>
            </div>
          </div>
          <ul className="nav nav-tabs" role="tablist">
            <li className="nav-item">
              <a
                className="nav-link active"
                data-toggle="tab"
                href="#active-group"
                role="tab"
                aria-selected="true"
              >
                ACTIVE
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#popular-group"
                role="tab"
                aria-selected="false"
              >
                POPULAR
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link"
                data-toggle="tab"
                href="#newest-group"
                role="tab"
                aria-selected="false"
              >
                NEWEST
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className="tab-pane fade show active"
              id="active-group"
              role="tabpanel"
            >
              <div className="group-list">
                <div className="media flex">
                  <div className="item-img">
                    <a href="#">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/groups/groups_9.png"
                        alt="group"
                      />
                    </a>
                  </div>
                  <div className="media-body">
                    <h4 className="item-title">
                      <a href="#">Horizon Tower</a>{" "}
                      <a href="#">
                        <i className="icofont-location-pin" />
                      </a>
                    </h4>
                    <div className="item-member">
                      265 Realtors | 3.5k Posts | 200 Buyers
                    </div>
                  </div>
                </div>
                <div className="media flex">
                  <div className="item-img">
                    <a href="#">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/groups/groups_9.png"
                        alt="group"
                      />
                    </a>
                  </div>
                  <div className="media-body">
                    <h4 className="item-title">
                      <a href="#">City Tower</a>{" "}
                      <a href="#">
                        <i className="icofont-location-pin" />
                      </a>
                    </h4>
                    <div className="item-member">
                      265 Realtors | 3.5k Posts | 200 Buyers
                    </div>
                  </div>
                </div>
                <div className="media flex">
                  <div className="item-img">
                    <a href="#">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/groups/groups_9.png"
                        alt="group"
                      />
                    </a>
                  </div>
                  <div className="media-body">
                    <h4 className="item-title">
                      <a href="#">Corninch Tower</a>{" "}
                      <a href="#">
                        <i className="icofont-location-pin" />
                      </a>
                    </h4>
                    <div className="item-member">
                      265 Realtors | 3.5k Posts | 200 Buyers
                    </div>
                  </div>
                </div>
                <div className="media flex">
                  <div className="item-img">
                    <a href="#">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/groups/groups_9.png"
                        alt="group"
                      />
                    </a>
                  </div>
                  <div className="media-body">
                    <h4 className="item-title">
                      <a href="#">Twin Tower</a>{" "}
                      <a href="#">
                        <i className="icofont-location-pin" />
                      </a>
                    </h4>
                    <div className="item-member">
                      265 Realtors | 3.5k Posts | 200 Buyers
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="popular-group" role="tabpanel">
              <div className="group-list">
                <div className="media">
                  <div className="item-img">
                    <a href="#">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/groups/groups_9.jpg"
                        alt="group"
                      />
                    </a>
                  </div>
                  <div className="media-body">
                    <h4 className="item-title">
                      <a href="#">Kito Development</a>
                    </h4>
                    <div className="item-member">265 Members</div>
                  </div>
                </div>
                <div className="media">
                  <div className="item-img">
                    <a href="#">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/groups/groups_10.jpg"
                        alt="group"
                      />
                    </a>
                  </div>
                  <div className="media-body">
                    <h4 className="item-title">
                      <a href="#">Chef Express</a>
                    </h4>
                    <div className="item-member">4,265 Members</div>
                  </div>
                </div>
                <div className="media">
                  <div className="item-img">
                    <a href="#">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/groups/groups_11.jpg"
                        alt="group"
                      />
                    </a>
                  </div>
                  <div className="media-body">
                    <h4 className="item-title">
                      <a href="#">Photo Contest</a>
                    </h4>
                    <div className="item-member">1,265 Members</div>
                  </div>
                </div>
                <div className="media">
                  <div className="item-img">
                    <a href="#">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/groups/groups_12.jpg"
                        alt="group"
                      />
                    </a>
                  </div>
                  <div className="media-body">
                    <h4 className="item-title">
                      <a href="#">WP Developers</a>
                    </h4>
                    <div className="item-member">265 Members</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab-pane fade" id="newest-group" role="tabpanel">
              <div className="group-list">
                <div className="media">
                  <div className="item-img">
                    <a href="#">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/groups/groups_9.jpg"
                        alt="group"
                      />
                    </a>
                  </div>
                  <div className="media-body">
                    <h4 className="item-title">
                      <a href="#">Kito Development</a>
                    </h4>
                    <div className="item-member">265 Members</div>
                  </div>
                </div>
                <div className="media">
                  <div className="item-img">
                    <a href="#">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/groups/groups_10.jpg"
                        alt="group"
                      />
                    </a>
                  </div>
                  <div className="media-body">
                    <h4 className="item-title">
                      <a href="#">Chef Express</a>
                    </h4>
                    <div className="item-member">4,265 Members</div>
                  </div>
                </div>
                <div className="media">
                  <div className="item-img">
                    <a href="#">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/groups/groups_11.jpg"
                        alt="group"
                      />
                    </a>
                  </div>
                  <div className="media-body">
                    <h4 className="item-title">
                      <a href="#">Photo Contest</a>
                    </h4>
                    <div className="item-member">1,265 Members</div>
                  </div>
                </div>
                <div className="media">
                  <div className="item-img">
                    <a href="#">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/groups/groups_12.jpg"
                        alt="group"
                      />
                    </a>
                  </div>
                  <div className="media-body">
                    <h4 className="item-title">
                      <a href="#">WP Developers</a>
                    </h4>
                    <div className="item-member">265 Members</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="widget widget-banner">
          <h3 className="item-title">Most Popular</h3>
          <div className="item-subtitle">MyMakan Application</div>
          <a href="#" className="item-btn">
            <span className="btn-text">Download Now</span>
            <span className="btn-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="21px"
                height="10px"
              >
                <path
                  fillRule="evenodd"
                  d="M16.671,9.998 L12.997,9.998 L16.462,6.000 L5.000,6.000 L5.000,4.000 L16.462,4.000 L12.997,0.002 L16.671,0.002 L21.003,5.000 L16.671,9.998 ZM17.000,5.379 L17.328,5.000 L17.000,4.621 L17.000,5.379 ZM-0.000,4.000 L3.000,4.000 L3.000,6.000 L-0.000,6.000 L-0.000,4.000 Z"
                />
              </svg>
            </span>
          </a>
          <div className="item-img">
            <Image
              width={1000}
              height={100}
              className="w-auto h-auto"
              src="/media/figure/widget_banner_1.png"
              alt="banner"
            />
          </div>
        </div>
        <div className="widget widget-memebers widget-activity">
          <div className="widget-heading">
            <h3 className="widget-title">My Connect Activity</h3>
            <div className="dropdown">
              <button
                className="dropdown-toggle"
                type="button"
                data-toggle="dropdown"
                aria-expanded="false"
              >
                ...
              </button>
              <div className="dropdown-menu dropdown-menu-right">
                <a className="dropdown-item" href="#">
                  Close
                </a>
                <a className="dropdown-item" href="#">
                  Edit
                </a>
                <a className="dropdown-item" href="#">
                  Delete
                </a>
              </div>
            </div>
          </div>
          <div className="activity-list">
            <div className="media grid grid-cols-5">
              <div className="item-img col-span-1">
                <a href="#">
                  <Image
                    width={1000}
                    height={100}
                    className="!w-full !h-full"
                    src="/media/figure/chat_10.jpg"
                    alt="Chat"
                  />
                </a>
              </div>
              <div className="media-body col-span-4">
                <h4 className="item-title">
                  <a href="#" className="author-name">
                    Aahat Akter
                  </a>
                  commented on Destroy Dex&apos;&s
                  <a href="#" className="activity-link">
                    Photo
                  </a>
                </h4>
                <div className="activity-time">20 minutes ago</div>
              </div>
            </div>
            <div className="media grid grid-cols-5">
              <div className="item-img col-span-1">
                <a href="#">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/chat_8.jpg"
                    alt="Chat"
                  />
                </a>
              </div>
              <div className="media-body col-span-4">
                <h4 className="item-title">
                  <a href="#" className="author-name">
                    Neko Bebop
                  </a>
                  liked Marina
                  <a href="#" className="activity-link">
                    Status
                  </a>
                </h4>
                <div className="activity-time">15 minutes ago</div>
              </div>
            </div>
            <div className="media grid grid-cols-5">
              <div className="item-img item-img col-span-1">
                <a href="#">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/chat_1.jpg"
                    alt="Chat"
                  />
                </a>
              </div>
              <div className="media-body col-span-4">
                <h4 className="item-title">
                  <a href="#" className="author-name">
                    Neko Bebop
                  </a>
                  commented on Destroy Dex&apos;s
                  <a href="#" className="activity-link">
                    Photo
                  </a>
                </h4>
                <div className="activity-time">20 minutes ago</div>
              </div>
            </div>
            <div className="media grid grid-cols-5">
              <div className="item-img item-img col-span-1">
                <a href="#">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/chat_6.jpg"
                    alt="Chat"
                  />
                </a>
              </div>
              <div className="media-body col-span-4">
                <h4 className="item-title">
                  <a href="#" className="author-name">
                    Neko Bebop
                  </a>
                  commented on Destroy Dex&apos;s
                  <a href="#" className="activity-link">
                    Photo
                  </a>
                </h4>
                <div className="activity-time">20 minutes ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsFeedRightSection;
