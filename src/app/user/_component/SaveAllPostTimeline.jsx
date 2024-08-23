"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { BiCommentDetail, BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import Image from "next/image";
import houseData from "@/data/houseData";
import Link from "next/link";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { PostLodaing } from "@/app/Component/NewsFeed/PostLodaing/PostLodaing";
import PackageCard from "./Card/PackageCard";
export const SaveAllPostTimeline = () => {
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
  const [saveRerander, setSaveRerander] = useState(false);
  const [followRerander, setFollowRerander] = useState(false);
  const myId = user?._id;

  const getAllPosts = async (token) => {
    try {
      setIsFetching(true);
      let url = `https://api.mymakan.ae/save-post/my-save-post?`;
      // Constructing the URL with query parameters based on state variables
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
  }, [sortOrder, sortBy, limit, page, like, saveRerander, followRerander]);

  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore]
  );

  return (
    <div className="pb-[50px]">
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
              <div ref={lastPostElementRef} key={i}>
                <PackageCard
                  item={item}
                  myId={myId}
                  setlike={setlike}
                  like={like}
                  saveRerander={saveRerander}
                  setSaveRerander={setSaveRerander}
                  followRerander={followRerander}
                  setFollowRerander={setFollowRerander}
                />
              </div>
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
  );
};
