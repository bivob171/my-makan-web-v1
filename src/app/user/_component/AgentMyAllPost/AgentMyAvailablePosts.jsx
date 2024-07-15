"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import React, { useContext, useEffect, useRef, useState } from "react";

import { BiCommentDetail, BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { PostLodaing } from "@/app/Component/NewsFeed/PostLodaing/PostLodaing";
import { EditPostSection } from "../PostEdit/EditPostSection";
import { PostHiddenModal } from "@/app/Component/NewsFeed/PostDeleteAndHiddenModal/PostHidden";
import { PostDeleteModal } from "@/app/Component/NewsFeed/PostDeleteAndHiddenModal/PostDeleteMOdal";
import { EditPostLocationValueContext } from "@/Context/EditpostValueContext";
import { PostLocationValueContext } from "@/Context/postValueContext";
import EditPostCard from "../Card/EditPostCard";

const AgentMyAvailablePosts = () => {
  const { user } = PrivateRouteContext();
  const { setPostId } = useContext(EditPostLocationValueContext);
  const { newsFeedRender } = useContext(PostLocationValueContext);
  const myRole = user?.role;
  const myId = user?._id;
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [role, setRole] = useState("agent");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const containerRefPost = useRef(null);
  const [like, setlike] = useState(true);
  const [postType, setPostType] = useState("Available");
  const getAllPosts = async (token, myId) => {
    try {
      let url = `https://q4m0gph5-4000.asse.devtunnels.ms/allposts/get?`;
      // Constructing the URL with query parameters based on state variables
      url += `agentId=${myId}&`;
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
    getAllPosts(token, myId);
  }, [sortOrder, sortBy, limit, page, like, myId, newsFeedRender]);

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

  const [isOpen, setIsOpen] = useState(false);
  function open(id) {
    setIsOpen(true);
    setPostId(id);
  }
  const [isOpenHideen, setIsOpenHidden] = useState(false);
  function openHiden(id) {
    setIsOpenHidden(true);
    setPostId(id);
  }
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  function openDelete(id) {
    setIsOpenDelete(true);
    setPostId(id);
  }
  return (
    <div ref={containerRefPost} className="overflow-y-auto h-screen pb-[50px]">
      <div className="">
        <div className="">
          <EditPostSection isOpen={isOpen} setIsOpen={setIsOpen} />
          <PostHiddenModal
            visible={isOpenHideen}
            closePopUp={setIsOpenHidden}
          />
          <PostDeleteModal
            visible={isOpenDelete}
            closePopUp={setIsOpenDelete}
          />
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
                    <EditPostCard
                      item={item}
                      key={i}
                      myId={myId}
                      setlike={setlike}
                      like={like}
                      open={open}
                      openHiden={openHiden}
                      openDelete={openDelete}
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
        </div>
      </div>
    </div>
  );
};

export default AgentMyAvailablePosts;
