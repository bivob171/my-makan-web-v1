"use client";
import React, { useEffect, useRef, useState } from "react";

import { BiCommentDetail, BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { PostLodaing } from "@/app/Component/NewsFeed/PostLodaing/PostLodaing";
import PackageCard from "../../_component/Card/PackageCard";

const AvailablePosts = () => {
  const { user } = PrivateRouteContext();
  const myRole = user?.role;
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const containerRefPost = useRef(null);
  const [like, setlike] = useState(true);
  const [postType, setPostType] = useState("Available");
  const [role, setRole] = useState("buyer");
  const [saveRerander, setSaveRerander] = useState(false);
  const getAllPosts = async (token) => {
    try {
      setIsFetching(true);
      let url = `https://q4m0gph5-4000.asse.devtunnels.ms/allposts/get?`;
      // Constructing the URL with query parameters based on state variables
      url += `role=${role}&`;
      url += `postType=${postType}&`;
      url += `sortBy=${sortBy}&`;
      url += `sortOrder=${sortOrder}&`;
      url += `page=${page}&`;
      url += `limit=${limit}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const allPostsList = await response.json();
      setHasMore(allPostsList.length === limit);
      setAllPosts((prevPost) =>
        page === 1 ? allPostsList : [...prevPost, ...allPostsList]
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem(`${userRole}AccessToken`);
    getAllPosts(token);
  }, [sortOrder, sortBy, limit, page, like, saveRerander]);

  const handleScrollPostResult = () => {
    const containerM = containerRefPost.current;
    if (
      containerM.scrollTop + containerM.clientHeight >=
        containerM.scrollHeight - 2 &&
      !isFetching &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const containerM = containerRefPost.current;
    containerM.addEventListener("scroll", handleScrollPostResult);
    return () =>
      containerM.removeEventListener("scroll", handleScrollPostResult);
  }, [isFetching, hasMore]);

  const myId = user?._id;

  return (
    <div ref={containerRefPost} className="overflow-y-auto h-screen pb-[50px]">
      <div className="">
        <div className="">
          <div>
            {loading && (
              <div>
                <PostLodaing />
              </div>
            )}
            {!loading && allPosts?.length === 0 && (
              <div className="text-center text-gray-500 mt-4">
                No posts available.
              </div>
            )}
            {!loading && allPosts.length > 0 && (
              <div className="grid grid-cols-1 gap-4 ">
                {allPosts?.map((item, i) => {
                  return (
                    <PackageCard
                      item={item}
                      key={i}
                      myId={myId}
                      setlike={setlike}
                      like={like}
                      saveRerander={saveRerander}
                      setSaveRerander={setSaveRerander}
                    />
                  );
                })}
              </div>
            )}

            {isFetching && (
              <div className="mb-[20px] mt-[20px] text-center">
                <PostLodaing />
              </div>
            )}
            {!hasMore && allPosts.length !== 0 && (
              <div className="mb-[20px] mt-[40px] text-center">
                <p>No more Post to load.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailablePosts;
