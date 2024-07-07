"use client";
import React, { useEffect, useState } from "react";

import { BiCommentDetail, BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import { PostLodaing } from "@/app/Component/NewsFeed/PostLodaing/PostLodaing";
import PrivateRouteContext from "@/Context/PrivetRouteContext";

const AgentMyAvailablePosts = () => {
  const { user } = PrivateRouteContext();
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [postType, setPostType] = useState("Available");
  const [limit, setLimit] = useState(100);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [like, setlike] = useState(true);
  const agentId = user?._id;
  const getAllPosts = async () => {
    try {
      let url = "http://localhost:4000/post-agent/get?";
      // Constructing the URL with query parameters based on state variables
      url += `agentId=${agentId}&`;
      url += `postType=${postType}&`;
      url += `sortBy=${sortBy}&`;
      url += `sortOrder=${sortOrder}&`;
      url += `page=${page}&`;
      url += `limit=${limit}`;

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
      setAllPosts(allPostsList);
      setLoading(false);
      if (allPostsList?.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    getAllPosts();
  }, [sortOrder, sortBy, limit, page, agentId, like]);
  console.log(allPosts);
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
    const url = `http://localhost:4000/post-agent/${id}/like`;
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
    const url = `http://localhost:4000/post-agent/${id}/unlike`;
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
    <div className="">
      <div className="">
        <div className="container">
          <div className="block-box user-search-bar justify-content-between">
            <div className="box-item">
              <div className="item-show-title">
                Total {allPosts?.length} Posts
              </div>
            </div>

            <div className="box-item search-filter">
              <div className="dropdown">
                <label className="mr-[5px]">Order By:</label>
                <button
                  onClick={handelOldOrNewPostDropdown}
                  className="dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  {sortOrder === "desc" ? "Newest Post" : " Oldest Post"}
                </button>
                {oldOrNewPostDropdown === true && (
                  <div
                    className="absolute right-0 z-10 mt-2 w-[150px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabindex="-1"
                  >
                    <div className="py-1 mt-[7px]" role="none">
                      <p
                        onClick={handelNewPosts}
                        className="block px-4  cursor-pointer text-sm text-gray-700"
                      >
                        Newest Post
                      </p>
                      <p
                        onClick={handelOldPosts}
                        className="block px-4   cursor-pointer  text-sm text-gray-700"
                      >
                        Oldest Post
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
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
                    <div
                      key={i}
                      className="w-full h-auto bg-white rounded-[15px] py-[25px] "
                    >
                      <div>
                        <div className="flex justify-between px-[15px]">
                          <div className="flex gap-x-[15px] items-center h-[45px] ">
                            <div className="mb-[17px]">
                              <div className=" relative w-[40px] h-[40px]">
                                <div>
                                  <Image
                                    width={40}
                                    height={40}
                                    alt="img"
                                    src={agentId?.image}
                                    className="w-[40px] h-[40px] rounded-full"
                                  />
                                </div>
                                <div className="absolute bottom-[2px] right-0 bg-white w-[10px] h-[10px] rounded-full flex items-center justify-center">
                                  <Image
                                    width={8}
                                    height={8}
                                    alt=""
                                    className="pl-[]"
                                    src="/homeCard/active.png"
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className=" -mb-[20px] ">
                                <div className="flex gap-x-[8px] items-center">
                                  {item.role === "buyer" ? (
                                    <p className="text-[0.875rem] text-[#8F8F8F] font-semibold">
                                      Hidden Name{" "}
                                    </p>
                                  ) : (
                                    <p className="text-[0.875rem] text-[#333335] font-semibold">
                                      {agentId?.fullName}
                                    </p>
                                  )}
                                  <div className="mb-[5px]">
                                    <Image
                                      width={15}
                                      height={15}
                                      alt=""
                                      src="/homeCard/verified.png"
                                    />
                                  </div>
                                  <div className="flex items-center gap-x-[5px] mt-[5px]">
                                    <p className="text-[#F5B849] text-[0.875rem] font-semibold">
                                      {agentId?.avgrating}
                                    </p>
                                    <p className="text-[#F5B849] text-[0.875rem] font-semibold">
                                      <GoStarFill />
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {item.role === "buyer" ? (
                                <p className="hover:underline underline-offset-4 text-[#8920AD] text-[13px] font-medium -mb-[10px]">
                                  Buyer From{" "}
                                  <span className="text-[#E6533C]">
                                    {" "}
                                    {agentId?.country}
                                  </span>
                                </p>
                              ) : (
                                <p className="hover:underline underline-offset-4 text-[#8920AD] text-[13px] font-medium -mb-[10px]">
                                  Rapid Properties
                                </p>
                              )}
                              <div className="flex flex-wrap items-center mt-[2px] ">
                                <div>
                                  <p className="text-[#8C9097] text-[0.625rem]">
                                    {formatDate(createdAt)}
                                  </p>
                                </div>
                                <div className="w-[10px] h-[5px] mb-[13px]">
                                  <Image
                                    width={40}
                                    height={2}
                                    alt=""
                                    className=""
                                    src="/homeCard/full-stop.png"
                                  />
                                </div>
                                <div>
                                  <p className="hover:underline underline-offset-1 text-[#49B6F5] text-[12px] font-medium">
                                    {location?.city}
                                  </p>
                                </div>
                                <div className="w-[10px] h-[5px] mb-[16px] ml-[4px]">
                                  <Image
                                    width={40}
                                    height={2}
                                    alt=""
                                    className=""
                                    src="/homeCard/location.png"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="leading-normal text-[0.825rem] text-red  ps-4 font-semibold -mb-[1px]">
                              {item?.postType}
                            </p>
                            <span className="leading-normal text-[0.755rem] sm:block align-right text-end text-black font-medium">
                              For {item.for}
                            </span>
                          </div>
                        </div>
                        <div className="h-[0.5px] w-full bg-[#F0F1F7] mt-[20px]"></div>
                        <div className="px-[15px] mt-[7px]">
                          <div>
                            <p className="font-inter text-[0.875rem] text-[#333335] font-semibold -mb-[0px] leading-[40px]">
                              {item?.title}
                            </p>
                            {item?.description.length > 132 ? (
                              <p className="font-inter text-[#333335] text-[14px] font-normal  leading-[20px]">
                                {item?.description.slice(0, 133)}...
                                <Link
                                  href={`${
                                    role === "agent"
                                      ? "/user/agent-post-details"
                                      : "/user/buyer-post-details"
                                  }/${_id}`}
                                >
                                  <span className="hover:underline underline-offset-1 text-[#49B6F5] text-[14px] font-medium cursor-pointer font-inter">
                                    see more
                                  </span>
                                </Link>
                              </p>
                            ) : (
                              <p className="font-inter text-[#333335] text-[14px] font-normal  leading-[20px]">
                                {item?.description}...
                                <Link
                                  href={`${
                                    role === "agent"
                                      ? "/user/agent-post-details"
                                      : "/user/buyer-post-details"
                                  }/${_id}`}
                                >
                                  <span className="hover:underline underline-offset-1 text-[#49B6F5] text-[14px] font-medium cursor-pointer font-inter">
                                    see more
                                  </span>
                                </Link>
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="px-[20px] flex items-center justify-between">
                          <div className="flex flex-wrap gap-x-[5px]">
                            {tags.map((tag, index) => {
                              const { bgColor, textColor } =
                                getTagStyles(index);
                              return (
                                <button
                                  key={index}
                                  className="h-[17px] px-[7px] rounded flex items-center"
                                  style={{ backgroundColor: bgColor }}
                                >
                                  <p
                                    className="text-[10px] font-medium font-inter pt-[9px]"
                                    style={{ color: textColor }}
                                  >
                                    {tag}
                                  </p>
                                </button>
                              );
                            })}
                          </div>
                          <div>
                            <button className="bg-[#F2EEFC] h-[25px] px-[13px] rounded flex items-center">
                              <p className="text-[15px] font-medium font-inter h-[17px]  text-[#26BF94] -mb-[1px]">
                                {" "}
                                <FaRegComment />
                              </p>
                            </button>
                          </div>
                        </div>
                        <div className="h-[0.5px] w-full bg-[#F0F1F7] my-[15px]"></div>
                        <div className=" flex items-center justify-between px-[15px]">
                          <div className="flex flex-wrap items-center gap-x-[10px]">
                            <div className="flex">
                              <Image
                                width={18}
                                height={18}
                                src="https://spruko.com/demo/tailwind/ynex/dist/assets/images/faces/11.jpg"
                                alt="..."
                                className="w-[18px] h-[18px] rounded-full border-2 border-blueGray-50 shadow hover:z-50 hover:-mt-[2.5px]"
                              ></Image>
                              <Image
                                width={18}
                                height={18}
                                src="https://spruko.com/demo/tailwind/ynex/dist/assets/images/faces/11.jpg"
                                alt="..."
                                className="w-[18px] h-[18px] rounded-full border-2 border-blueGray-50 shadow -ml-[6px] hover:z-50 hover:-mt-[2.5px]"
                              ></Image>
                              <Image
                                width={18}
                                height={18}
                                src="https://spruko.com/demo/tailwind/ynex/dist/assets/images/faces/11.jpg"
                                alt="..."
                                className="w-[18px] h-[18px] rounded-full border-2 border-blueGray-50 hover:z-50 hover:-mt-[2.5px] shadow -ml-[6px]"
                              ></Image>
                              <Image
                                width={18}
                                height={18}
                                src="https://spruko.com/demo/tailwind/ynex/dist/assets/images/faces/11.jpg"
                                alt="..."
                                className="w-[18px] h-[18px] rounded-full border-2 border-blueGray-50 shadow -ml-[6px] hover:z-50 hover:-mt-[2.5px]"
                              ></Image>
                              <div className="w-[18px] h-[18px] rounded-full bg-[#845ADF]  -ml-[6px] hover:z-50 hover:-mt-[2.5px] flex items-center justify-center">
                                <p className="text-[8px] -mb-[1px] text-white font-normal">
                                  +2
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="-mb-0 text-[11px]">+65 Matched</p>
                            </div>
                          </div>
                          <div className="flex gap-x-[7px] items-center flex-wrap">
                            <div className="flex items-center">
                              {hasId === true ? (
                                <p
                                  onClick={() => giveUnLike(_id)}
                                  className="text-[#845ADF]  cursor-pointer   text-[11px] -mb-0 mr-[2px]"
                                >
                                  {" "}
                                  <BiSolidLike />
                                </p>
                              ) : (
                                <p
                                  onClick={() => giveLike(_id)}
                                  className=" cursor-pointer text-[11px] -mb-0 mr-[2px]"
                                >
                                  {" "}
                                  <BiSolidLike />
                                </p>
                              )}
                              <p className="text-[#845ADF] font-medium text-[11px] -mb-0">
                                {likeCount === 0 ? "00" : likeCount}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <p className="text-[#AFB2B7] text-[11px] -mb-0 mr-[2px]">
                                {" "}
                                <BiCommentDetail />
                              </p>
                              <p className="text-[#AFB2B7] font-medium text-[11px] mb-[1px]">
                                {comment.length === 0 ? "00" : comment.length}{" "}
                              </p>
                            </div>
                            <div>
                              {item.type === "Urgent" ? (
                                <button className="rounded-[5px] w-[45px] h-[23px] hover:bg-[#E6533C] bg-[#FCEDEB] mb-[5px] flex justify-center gap-x-[2px] text-[5px] items-center">
                                  <p className="-mb-[1px] text-[#E6533C] hover:text-white text-[8px] font-semibold">
                                    {item.type}
                                  </p>
                                </button>
                              ) : item.type === "Sponsored" ? (
                                <button className="rounded-[5px] w-[70px] h-[23px] hover:bg-[#845ADF] bg-[#EEEBF8] mb-[5px] flex justify-center gap-x-[2px] text-[5px] items-center">
                                  <p className="-mb-[1px] text-[#845ADF] hover:text-white text-[8px] font-semibold">
                                    {item.type}
                                  </p>
                                  <p className="text-[#F5B849] text-[8px] font-semibold -mb-[1px]">
                                    <GoStarFill />
                                  </p>
                                </button>
                              ) : (
                                <button className="rounded-[5px] w-[70px] h-[23px] hover:bg-[#845ADF] bg-[#EEEBF8] mb-[5px] flex justify-center gap-x-[2px] text-[5px] items-center">
                                  <p className="-mb-[1px] text-[#845ADF] hover:text-white text-[8px] font-semibold">
                                    {item.type}
                                  </p>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {hasMore && !loading && (
              <footer className="">
                <div
                  onClick={handleLoadMore}
                  className="block-box load-more-btn mt-10 w-full"
                >
                  <p className="item-btn">
                    <i className="icofont-refresh" />
                    Load More Posts
                  </p>
                </div>
              </footer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentMyAvailablePosts;
