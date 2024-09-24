"use client";
import React, { useEffect, useRef, useState } from "react";
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

  //   get the match post
  const [item, setSinglePost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const getSinglePost = async (token) => {
    try {
      let url = `https://q2p08zg4-4000.asse.devtunnels.ms/allposts/single-post/${matchpostId}`;

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

  const [saveRerander, setSaveRerander] = useState(false);
  const [allPosts, setAllPosts] = useState();
  const [minMatchPercentage, setMinMatchPercentage] = useState(0);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const filterRef = useRef(null);
  return (
    <div className="mx-auto container pt-[120px] text-[#222]">
      <div className="flex justify-between items-start">
        <div className="bg-[#fdeaeae1] rounded-3xl mb-3 px-7 py-[16px] w-full max-w-[400px] inline-block">
          <h3 className="text-[22px] font-black text-[#666] leading-none m-0">
            Matched Posts
          </h3>
        </div>
        <div className="relative">
          {" "}
          <button
            className="col-span-1 flex justify-center !items-center hover:bg-[#dfdfdf6e] hover:rounded-full p-1 relative"
            type="button"
            onClick={() => setFilterVisible(!filterVisible)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-[#615DFA]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
            {/* select filter number  */}
            {filterCount > 0 && (
              <div className="absolute -top-[5px] right-0">
                <div className="bg-[#ff3333bd] rounded-full w-4 h-4 relative">
                  <span className="text-[10px] text-[#fefefe] font-mono font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {filterCount}
                  </span>
                </div>
              </div>
            )}
          </button>
          {filterVisible && (
            <div
              ref={filterRef}
              className="absolute top-[65px] right-0 z-50"
            ></div>
          )}
        </div>{" "}
      </div>

      <div>
        <MachedPostPage
          item={item}
          saveRerander={saveRerander}
          setSaveRerander={setSaveRerander}
          setAllPosts={setAllPosts}
          minMatchPercentage={minMatchPercentage}
        />
      </div>
    </div>
  );
}
