"use client";
import React, { useEffect, useRef, useState } from "react";

import { BiCommentDetail, BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import Image from "next/image";
import houseData from "@/data/houseData";
import Link from "next/link";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { PostLodaing } from "@/app/Component/NewsFeed/PostLodaing/PostLodaing";
import PackageCard from "./Card/PackageCard";
export const SaveRequiredAllPostTimeline = () => {
  const { user } = PrivateRouteContext();
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const containerRefPost = useRef(null);
  const [like, setlike] = useState(true);
  const [postType, setPostType] = useState("Required");
  const myId = user?._id;

  const getAllPosts = async (token) => {
    try {
      let url = `https://q4m0gph5-4000.asse.devtunnels.ms/save-post/my-save-post?`;
      // Constructing the URL with query parameters based on state variables
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
  }, [sortOrder, sortBy, limit, page, like]);

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

  return (
    <div ref={containerRefPost} className="overflow-y-auto h-screen pb-[50px]">
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
      {!loading && allPosts?.length > 0 && (
        <div className="grid grid-cols-1 gap-4 ">
          {allPosts?.map((data, i) => {
            const { savePostId } = data;

            const item = savePostId;
            return (
              <PackageCard
                item={item}
                key={i}
                myId={myId}
                setlike={setlike}
                like={like}
              />
            );
          })}
        </div>
      )}
      {isFetching && (
        <div className="mb-[20px] mt-[40px] text-center">
          <p>Loading more Post...</p>
        </div>
      )}
      {!hasMore && allPosts.length !== 0 && (
        <div className="mb-[20px] mt-[40px] text-center">
          <p>No more Post to load.</p>
        </div>
      )}
    </div>
  );
};
