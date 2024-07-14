"use client";
import React, { useEffect, useRef, useState } from "react";

import { BiCommentDetail, BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import { PostLodaing } from "../PostLodaing/PostLodaing";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import PackageCard from "../PackageCard";

const AllPostAgent = () => {
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

  const getAllPosts = async () => {
    try {
      let url = "http://3.28.239.173:4000/post-agent/get?";
      // Constructing the URL with query parameters based on state variables
      url += `sortBy=${sortBy}&`;
      url += `sortOrder=${sortOrder}&`;
      url += `page=${page}&`;
      url += `limit=${limit}`;
      console.log(url);
      // Add other query parameters conditionally based on state variables
      // if (status !== "") url += `&status=${status}`;
      // if (packageExpired !== "") url += `&packageExpired=${packageExpired}`;
      // if (type !== "") url += `&type=${type}`;
      // if (planId !== "") url += `&planId=${planId}`;
      // if (packageId !== "") url += `&packageId=${packageId}`;
      // if (agentId !== "") url += `&agentId=${agentId}`;
      // if (doctorId !== "") url += `&doctorId=${doctorId}`;

      const response = await fetch(url);

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
    getAllPosts();
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
  const [oldOrNewPostDropdown, setOldOrNewPostDropdown] = useState(false);
  const handelOldOrNewPostDropdown = () => {
    setOldOrNewPostDropdown(!oldOrNewPostDropdown);
  };
  const handelOldPosts = () => {
    setSortOrder("asc");
    setOldOrNewPostDropdown(false);
  };
  const handelNewPosts = () => {
    setSortOrder("desc");
    setOldOrNewPostDropdown(false);
  };
  const handleLoadMore = () => {
    // setPage((prevPage) => prevPage + 1);
    setLimit((prevLimit) => prevLimit + 100);
  };

  const myId = user?._id;
  const giveLike = async (id) => {
    const url = `http://3.28.239.173:4000/post-agent/${id}/like`;
    const tokenKey = `${user?.role}AccessToken`;
    const token = localStorage.getItem(tokenKey);
    console.log(url, token);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      setlike(!like);
      console.log("Like successful", data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  const giveUnLike = async (id) => {
    const url = `http://3.28.239.173:4000/post-agent/${id}/unlike`;
    const tokenKey = `${user?.role}AccessToken`;
    const token = localStorage.getItem(tokenKey);
    console.log(url, token);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      setlike(!like);
      console.log("unLike successful", data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  return (
    <div ref={containerRefPost} className="h-full overflow-y-auto !mb-[100px]">
      <div className="">
        <div className="">
          <div className="">
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
                  const {
                    role,
                    agentId,
                    createdAt,
                    location,
                    tags,
                    _id,
                    likeCount,
                    comment,
                    likedBy,
                  } = item;
                  const hasId = likedBy.some((id) => id === myId);
                  const formatDate = (isoString) => {
                    const date = new Date(isoString);

                    const options = {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    };

                    return date.toLocaleDateString("en-GB", options);
                  };

                  const getTagStyles = (index) => {
                    const styles = [
                      { bgColor: "#F2EEFC", textColor: "#26BF94" },
                      { bgColor: "#EEEBF8", textColor: "#23B7E5" },
                      { bgColor: "#FCEDEB", textColor: "#E6533C" },
                      { bgColor: "#F3F6F8", textColor: "#F5B849" },
                      { bgColor: "#FCEFF1", textColor: "#AAB800" },
                    ];

                    // Use modulo to cycle through styles if index exceeds predefined styles length
                    const styleIndex = index % styles.length;

                    return styles[styleIndex];
                  };

                  return (
                    <div key={i}>
                      <PackageCard
                        item={item}
                        hasId={hasId}
                        formatDate={formatDate}
                        getTagStyles={getTagStyles}
                      />
                    </div>
                  );
                })}
              </div>
            )}
            {isFetching && (
              <div className="mb-[20px] mt-[40px] text-center">
                <p>Loading more Post...</p>
              </div>
            )}
            {!hasMore && (
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

export default AllPostAgent;
