"use client";
import React, { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import PostSection from "@/app/Component/NewsFeed/PostSection";
import NewsFeedLeftSection from "@/app/Component/NewsFeed/NewsFeedLeftSection";
import NewsFeedRightSection from "@/app/Component/NewsFeed/NewsFeedRightSection";
import ChatModal from "@/app/Component/NewsFeed/ChatModal";
import { AccountVerifyModal } from "@/app/Component/NewsFeed/AccountVerifyModal";
import { useRouter } from "next/router";
import { MachedPostPage } from "../../_component/MachedPostPage/MachedPostPage";
import PostSearch from "@/app/Component/NewsFeed/PostSearch/PostSearch";

export default function MatchedPost() {
  const params = useParams();
  const matchpostId = params.matchpostId;
  const pathname = usePathname();
  const basePath = pathname.substring(0, pathname.lastIndexOf("/") + 1);
  const { user } = PrivateRouteContext();
  const userName = user?.fullName?.split(" ")[0];
  const [verifyPopup, setVerifyPopup] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  function open() {
    setIsOpen(true);
  }
  const role = user?.role;
  const [activeTab, setActiveTab] = useState("allPosts");

  const dateStr = user?.createdAt;

  const dateObj = new Date(dateStr);

  const options = { year: "numeric", month: "short" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);

  //   get the match post
  const [item, setSinglePost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const getSinglePost = async (token) => {
    try {
      let url = `http://localhost:4000/allposts/single-post/${matchpostId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const singlePost = await response.json();
        setSinglePost(singlePost);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem(`${userRole}AccessToken`);
    getSinglePost(token);
  }, [matchpostId]);

  const [postType, setPostType] = useState("");
  const [saveRerander, setSaveRerander] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  function taballPosts() {
    setAllPosts([]),
      setActiveTab("allPosts"),
      setPostType(""),
      setSaveRerander(!saveRerander);
  }
  function tabavailablePosts() {
    setAllPosts([]),
      setActiveTab("availablePosts"),
      setPostType("Available"),
      setSaveRerander(!saveRerander);
  }
  function tabrequiredPosts() {
    setAllPosts([]),
      setActiveTab("required"),
      setPostType("Required"),
      setSaveRerander(!saveRerander);
  }

  return (
    <>
      <div className="page-content">
        <div className="container">
          <div>
            <PostSection isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
          <div className="row">
            <div className="col-lg-3 widget-block widget-break-lg ">
              <div className="!sticky top-[110px]">
                <div className="h-[86vh] overflow-y-scroll">
                  <NewsFeedLeftSection />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
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
                        onClick={taballPosts}
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
                        onClick={tabavailablePosts}
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
                        onClick={tabrequiredPosts}
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
              {/* post card */}
              <MachedPostPage
                item={item}
                postType={postType}
                saveRerander={saveRerander}
                setSaveRerander={setSaveRerander}
                allPosts={allPosts}
                setAllPosts={setAllPosts}
              />
            </div>
            <div className="col-lg-3 widget-block widget-break-lg">
              <NewsFeedRightSection />
            </div>
          </div>
        </div>
      </div>

      {/* Chat Modal Here */}
      <ChatModal />
      <AccountVerifyModal visible={verifyPopup} closePopUp={setVerifyPopup} />
    </>
  );
}
