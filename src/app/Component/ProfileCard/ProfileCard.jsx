"use client";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdTimer } from "react-icons/io";
import { FaCheckCircle, FaStar, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { AiOutlineStar } from "react-icons/ai";
export const ProfileCard = () => {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();

  const [totalPoset, setTotalPost] = useState();
  const dateStr = user?.createdAt;

  const dateObj = new Date(dateStr);

  const options = { year: "numeric", month: "short" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);

  const ratingStar = Array.from({ length: 5 }, (e, i) => {
    return (
      <>
        {user?.avgrating > i ? (
          <span className="flex gap-x-[3px] -mb-0 mt-[5px] text-[#F5B849]">
            <FaStar />
          </span>
        ) : (
          <span className="flex gap-x-[3px] -mb-0 mt-[5px] text-[#F5B849]">
            <AiOutlineStar />
          </span>
        )}
      </>
    );
  });

  const getAllPosts = async (token) => {
    try {
      let url = `https://q4m0gph5-4000.asse.devtunnels.ms/allposts/my-post-length`;
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
      setTotalPost(allPostsList);
    } catch (error) {
      console.error("Error fetching:", error);
    }
  };

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem(`${userRole}AccessToken`);
    getAllPosts(token);
  }, []);
  const totalAdsPost = totalPoset?.sponsoredPosts + totalPoset?.urgentPosts;
  console.log(totalPoset);
  return (
    <div className="mb-[20px]">
      <div className="widget widget-author !pb-2 !pl-2 !pr-2">
        <div className="author-heading">
          <div className="cover-img">
            <Image
              width={1000}
              height={200}
              className=""
              src="/media/figure/shape_12.jpg"
              alt="cover"
            />
          </div>
          <div className="profile-img">
            {isAuthenticated === true ? (
              <Link href="">
                {user?.image === null ? (
                  <Image
                    width={1000}
                    height={100}
                    className="w-[100px] h-[100px]"
                    src="https://i.ibb.co/7298VDJ/user.png"
                    alt="author"
                  />
                ) : (
                  <Image
                    width={1000}
                    height={100}
                    className="w-[100px] h-[100px]"
                    src={user?.image}
                    alt="author"
                  />
                )}
              </Link>
            ) : (
              <div className="flex justify-center">
                <Image
                  width={1000}
                  height={100}
                  className="w-[100px] h-[100px]"
                  src="https://i.ibb.co/7298VDJ/user.png"
                  alt="author"
                />
              </div>
            )}
          </div>
          <div className="profile-name -mt-[8px]">
            <h4 className="author-name">
              <Link href={`${"/user/agent-profile"}/${user?._id}`}>
                {user?.fullName}
              </Link>
            </h4>
            {user?.role === "buyer" ? (
              <div className="author-location leading-3">
                <a href="#">
                  <b className="-mb-0"></b>
                </a>
              </div>
            ) : (
              <div className="author-location leading-3">
                <a href="#">
                  <b>{user?.companyName}</b>
                </a>
              </div>
            )}
          </div>
        </div>

        <div
          className={`${
            user?.role === "buyer"
              ? "flex justify-center -mt-[47px] "
              : "flex justify-center -mt-[27px] "
          }`}
        >
          <>{ratingStar}</>
          <p className=" text-[12px] text-[#F5B849]  font-medium ml-[5px]">
            {user?.avgrating}
            <span className="text-[#F5B849] font-normal  ml-[5px]">
              ( {user?.totalrating} reviews )
            </span>
          </p>
        </div>
        <ul className="author-statistics flex justify-center my-[5px]">
          <li>
            <a href="#">
              <span className="text-[12px] text-[#525252] font-bold ">
                {totalPoset?.totalPosts}
              </span>{" "}
              <br />
              <span className=" text-[#9e9faf] font-semibold text-[10px]">
                Posts
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="text-[12px] text-[#525252] font-bold ">
                2.4k
              </span>{" "}
              <br />
              <span className=" text-[#9e9faf] font-semibold text-[10px]">
                Matched
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="text-[12px] text-[#525252] font-bold">
                {" "}
                {totalAdsPost}
              </span>

              <br />
              <span className=" whitespace-nowrap text-[#9e9faf] font-semibold text-[10px]">
                Ads Posts
              </span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="text-[12px] text-[#525252] font-bold">
                1,125
              </span>
              <br />
              <span className="whitespace-nowrap text-[#9e9faf] font-semibold text-[10px]">
                My Connect
              </span>
            </a>
          </li>
        </ul>
        {user?.role === "agent" ? (
          <div className="mt-[1px] mb-[12px]">
            <div className="h-[0.5px] w-full bg-[#5EDFFF] "></div>
            <div className="mt-[8px] px-[10px]">
              <p className="-mb-0 text-start text-[13px] text-[#323232CC] text-opacity-80 font-semibold leading-[20px]">
                Verified By My-Makan in
              </p>
              <div className="flex gap-x-2 items-center mt-[5px] ">
                <div>
                  <p className="-mb-0 text-[11px] text-[#5EDFFF]">
                    <FaCheckCircle />
                  </p>
                </div>
                <div>
                  <p className="-mb-0 text-[11px] leading-[20px] text-[#323232CC] text-opacity-80 font-medium">
                    {user?.companyName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="">
          <div className="h-[0.5px] w-full bg-[#5EDFFF] "></div>
          <div className="mt-[15px] px-[10px]">
            <div className="flex justify-between items-center mb-[10px]">
              <div className="flex gap-x-2 items-center">
                <div>
                  <p className="-mb-0 text-[14px] text-[#5EDFFF]">
                    <FaLocationDot />
                  </p>
                </div>
                <div>
                  <p className="-mb-0 text-[14px] text-[#323232CC] text-opacity-80 font-medium">
                    From
                  </p>
                </div>
              </div>
              <div>
                {" "}
                {user?.country === null ? (
                  <Link href="/user/profile/about">
                    <p className="-mb-0 text-[14px] text-blue-500 text-opacity-80 font-semibold">
                      Add Country
                    </p>
                  </Link>
                ) : (
                  <p className="-mb-0 text-[14px] text-[#323232CC] text-opacity-80 font-semibold">
                    {user?.country}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mb-[10px]">
              <div className="flex gap-x-2 items-center">
                <div>
                  <p className="-mb-0 text-[14px] text-[#5EDFFF]">
                    <FaUser />
                  </p>
                </div>
                <div>
                  <p className="-mb-0 text-[14px] text-[#323232CC] text-opacity-80 font-medium">
                    Member Since
                  </p>
                </div>
              </div>
              <div>
                {" "}
                <p className="-mb-0 text-[14px] text-[#323232CC] text-opacity-80 font-semibold">
                  {formattedDate}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-x-2 items-center">
                <div>
                  <p className="-mb-0 text-[14px] text-[#5EDFFF]">
                    <IoMdTimer />
                  </p>
                </div>
                <div>
                  <p className="-mb-0 text-[14px] text-[#323232CC] text-opacity-80 font-medium">
                    Avg Response Time
                  </p>
                </div>
              </div>
              <div>
                {" "}
                <p className="-mb-0 text-[14px] text-[#323232CC] text-opacity-80 font-semibold">
                  1 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
