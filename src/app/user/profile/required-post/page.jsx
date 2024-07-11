"use client";
import React, { useEffect, useRef, useState } from "react";

import { BiCommentDetail, BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { PostLodaing } from "@/app/Component/NewsFeed/PostLodaing/PostLodaing";

const RequiredPosts = () => {
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
  const [postType, setPostType] = useState("Required");
  const [role, setRole] = useState("buyer");
  const getAllPosts = async (token) => {
    try {
      let url = `https://q4m0gph5-4000.asse.devtunnels.ms/allposts/get?`;
      // Constructing the URL with query parameters based on state variables
      url += `role=${role}&`;
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
      // if (userId !== "") url += `&userId=${userId}`;
      // if (doctorId !== "") url += `&doctorId=${doctorId}`;

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
    const url = `https://q4m0gph5-4000.asse.devtunnels.ms/allposts/${id}/like`;
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
    const url = `https://q4m0gph5-4000.asse.devtunnels.ms/allposts/${id}/unlike`;
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
    <div ref={containerRefPost} className="overflow-y-auto h-screen pb-[50px]">
      <div className="">
        <div className="container">
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
                  const {
                    role,
                    userId,
                    agentId,
                    createdAt,
                    location,
                    tags,
                    _id,
                    likeCount,
                    comment,
                    likedBy,
                  } = item;

                  const userinfo = role === "agent" ? agentId : userId;
                  const hasId = likedBy.some((user) => user._id === myId);

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
                      <div className="pt-2">
                        <div className="flex justify-between px-[15px] ">
                          <div className="flex gap-x-[15px] items-center h-[45px] ">
                            <div className="mb-[17px]">
                              <div className=" relative w-[40px] h-[40px] md:w-[60px] md:h-[60px]">
                                <div>
                                  <Image
                                    width={40}
                                    height={40}
                                    alt="img"
                                    src={userinfo?.image}
                                    className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full"
                                  />
                                </div>
                                <div className="absolute bottom-[2px] md:bottom-1 right-0 bg-white w-[10px] h-[10px] md:w-[14px] md:h-[14px] rounded-full flex items-center justify-center">
                                  <Image
                                    width={8}
                                    height={8}
                                    alt=""
                                    className="pl-[] w-full h-full"
                                    src="/homeCard/active.png"
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className=" -mb-[20px] md:-mb-4 ">
                                <div className="flex gap-x-[8px] items-center">
                                  {item.role === "buyer" ? (
                                    <>
                                      {userinfo?._id === myId ? (
                                        <p className="text-[0.875rem] md:!text-[1.3rem] text-[#333335] font-semibold">
                                          {userinfo?.fullName}
                                        </p>
                                      ) : (
                                        <p className="text-[0.875rem] md:!text-[1.3rem] text-[#8F8F8F] font-semibold">
                                          Hidden Name{" "}
                                        </p>
                                      )}
                                    </>
                                  ) : (
                                    <p className="text-[0.875rem] md:!text-[1.3rem] text-[#333335] font-semibold">
                                      {userinfo?.fullName}
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
                                      {userinfo?.avgrating}
                                    </p>
                                    <p className="text-[#F5B849] text-[0.875rem] font-semibold">
                                      <GoStarFill />
                                    </p>
                                  </div>
                                </div>
                              </div>
                              {item.role === "buyer" ? (
                                <p className="hover:underline underline-offset-4 text-[#8920AD] text-[13px] md:text-[16px] font-medium -mb-[10px] md:-mb-1">
                                  Buyer From{" "}
                                  <span className="text-[#E6533C]">
                                    {" "}
                                    {userinfo?.country}
                                  </span>
                                </p>
                              ) : (
                                <p className="hover:underline underline-offset-4 text-[#8920AD] text-[13px] md:text-[16px] font-medium -mb-[10px] md:-mb-1">
                                  {userinfo?.companyName}
                                </p>
                              )}
                              <div className="flex flex-wrap items-center mt-[2px] ">
                                <div>
                                  <p className="text-[#8C9097] text-[0.625rem] md:text-[0.8rem]">
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
                                <div className="w-full max-w-[14px] h-auto mb-[16px] ml-[4px]">
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
                          <div className="text-end">
                            <p className="leading-normal text-[0.825rem] md:text-[1rem] text-red-500 ps-4 font-semibold -mb-[1px]">
                              {item?.postType}
                            </p>
                            <span className="leading-normal text-[0.755rem] md:text-[0.8rem] sm:block align-right text-end text-black font-medium">
                              For {item?.for}
                            </span>
                          </div>
                        </div>
                        <div className="h-[0.5px] w-full bg-[#F0F1F7] mt-[20px]"></div>
                        <div className="px-[15px] mt-[7px]">
                          <div>
                            <p className="font-inter text-[0.875rem] md:text-[1.5rem] text-[#333335] font-semibold mb-2 leading-[40px]">
                              {item?.title}
                            </p>
                            {item?.description?.length > 132 ? (
                              <p className="font-inter text-[#333335] text-[14px] md:!text-[17px] font-normal leading-[20px]">
                                {item?.description.slice(0, 133)}...
                                <Link href={`${"/user/post-details"}/${_id}`}>
                                  <span className="hover:underline underline-offset-1 text-[#49B6F5] text-[14px] md:!text-[17px] font-medium cursor-pointer font-inter">
                                    see more
                                  </span>
                                </Link>
                              </p>
                            ) : (
                              <p className="font-inter text-[#333335] text-[14px] md:!text-[17px] font-normal  leading-[20px]">
                                {item?.description}...
                                <Link href={`${"/user/post-details"}/${_id}`}>
                                  <span className="hover:underline underline-offset-1 text-[#49B6F5] text-[14px] md:!text-[17px] font-medium cursor-pointer font-inter">
                                    see more
                                  </span>
                                </Link>
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="px-[20px] flex items-center justify-between">
                          <div className="flex flex-wrap gap-x-[8px] mt-2">
                            {tags?.map((tag, index) => {
                              const { bgColor, textColor } =
                                getTagStyles(index);
                              return (
                                <button
                                  key={index}
                                  className="!py-[0px] px-[7px] md:px-4 rounded "
                                  style={{ backgroundColor: bgColor }}
                                >
                                  <span
                                    className="text-[10px] md:text-[14px] font-medium font-inter"
                                    style={{ color: textColor }}
                                  >
                                    {tag}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                          <div>
                            <button className="bg-[#F2EEFC] p-[13px] rounded flex items-center">
                              <p className="text-[15px] font-medium font-inter text-[#26BF94] -mb-[1px]">
                                {" "}
                                <FaRegComment className="w-4 h-4 md:w-5 md:h-5" />
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
                                className="w-[18px] md:w-[28px] md:h-[28px] h-[18px] rounded-full border-2 border-blueGray-50 shadow hover:z-50 hover:-mt-[2.5px]"
                              ></Image>
                              <Image
                                width={18}
                                height={18}
                                src="https://spruko.com/demo/tailwind/ynex/dist/assets/images/faces/11.jpg"
                                alt="..."
                                className="w-[18px] md:w-[28px] md:h-[28px] h-[18px] rounded-full border-2 border-blueGray-50 shadow -ml-[6px] hover:z-50 hover:-mt-[2.5px]"
                              ></Image>
                              <Image
                                width={18}
                                height={18}
                                src="https://spruko.com/demo/tailwind/ynex/dist/assets/images/faces/11.jpg"
                                alt="..."
                                className="w-[18px] md:w-[28px] md:h-[28px] h-[18px] rounded-full border-2 border-blueGray-50 hover:z-50 hover:-mt-[2.5px] shadow -ml-[6px]"
                              ></Image>
                              <Image
                                width={18}
                                height={18}
                                src="https://spruko.com/demo/tailwind/ynex/dist/assets/images/faces/11.jpg"
                                alt="..."
                                className="w-[18px] md:w-[28px] md:h-[28px] h-[18px] rounded-full border-2 border-blueGray-50 shadow -ml-[6px] hover:z-50 hover:-mt-[2.5px]"
                              ></Image>
                              <div className="w-[18px] md:w-[28px] md:h-[28px] h-[18px] rounded-full bg-[#845ADF]  -ml-[6px] hover:z-50 hover:-mt-[2.5px] flex items-center justify-center">
                                <p className="text-[8px] -mb-[1px] text-white font-normal">
                                  +2
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="-mb-0 text-[12px] md:text-[14px] font-medium">
                                +65 Matched
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-x-[7px] items-center flex-wrap">
                            <div className="flex items-center">
                              {hasId === true ? (
                                <p
                                  onClick={() => giveUnLike(_id)}
                                  className="text-[#845ADF] cursor-pointer text-[12px] md:text-[14px] -mb-0 mr-[2px]"
                                >
                                  {" "}
                                  <BiSolidLike />
                                </p>
                              ) : (
                                <p
                                  onClick={() => giveLike(_id)}
                                  className=" cursor-pointer text-[12px] md:text-[14px] -mb-0 mr-[2px]"
                                >
                                  {" "}
                                  <BiSolidLike />
                                </p>
                              )}
                              <p className="text-[#845ADF] font-medium text-[12px] md:text-[14px] -mb-0">
                                {likeCount === 0 ? "00" : likeCount}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <p className="text-[#AFB2B7] text-[12px] md:text-[14px] -mb-0 mr-[2px]">
                                {" "}
                                <BiCommentDetail />
                              </p>
                              <p className="text-[#AFB2B7] font-medium text-[12px] md:text-[14px] mb-[1px]">
                                {comment?.length === 0 ? "00" : comment?.length}{" "}
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
                                  <p className="text-[#F5B849] text-[8px] md:text-[12px] font-semibold -mb-[1px]">
                                    <GoStarFill />
                                  </p>
                                </button>
                              ) : (
                                <button className="rounded-[5px] w-[70px] h-[23px] hover:bg-[#845ADF] bg-[#EEEBF8] mb-[5px] flex justify-center gap-x-[2px] text-[10px] md:text-[12px] items-center">
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

export default RequiredPosts;
