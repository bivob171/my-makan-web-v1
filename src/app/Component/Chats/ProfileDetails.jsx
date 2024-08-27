"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BsInfoCircle } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import Link from "next/link";
import PrivateRouteContext from "@/Context/PrivetRouteContext";

const ProfileDetails = ({ selectedChat, profileSideBar }) => {
  const [isMuted, setIsMuted] = useState(false);
  const { user } = PrivateRouteContext();
  const userId = user?._id;
  const handleMuteToggle = () => {
    setIsMuted((prevState) => !prevState);
  };

  const participantName = selectedChat?.participants
    .filter((p) => p.id !== userId) // Exclude the current user
    .map((p) => p.name)[0];
  const participantImage = selectedChat?.participants
    .filter((p) => p.id !== userId) // Exclude the current user
    .map((p) => p.image)[0];
  const participantRole = selectedChat?.participants
    .filter((p) => p.id !== userId) // Exclude the current user
    .map((p) => p.role)[0];
  const participantId = selectedChat?.participants
    .filter((p) => p.id !== userId) // Exclude the current user
    .map((p) => p.id)[0];

  return (
    <div className="p-3 relative">
      <button
        type="button"
        onClick={profileSideBar}
        className="absolute top-2 right-2 hover:bg-slate-100 p-1 rounded-full"
      >
        <IoCloseOutline className="text-[#999] w-6 h-6" />
      </button>
      <center className="">
        <Image
          src={participantImage}
          alt=""
          width={500}
          height={500}
          className="w-[120px] h-[120px] object-cover rounded-full object-top"
        />
      </center>

      <h3 className="text-center leading-6 text-[22px] m-0 font-bold mt-2">
        {participantName}
      </h3>

      <p className="text-center leading-6 text-[12px] m-0">Active 46m ago</p>
      <div className="flex justify-center gap-2 my-2">
        <Link
          href={
            participantRole === "buyer"
              ? `/user/buyer-profile/${participantId}`
              : `/user/agent-profile/${participantId}`
          }
        >
          {" "}
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
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </Link>
        <div onClick={handleMuteToggle} className="cursor-pointer">
          {isMuted ? (
            // Unmute icon
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
                d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6 4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
            </svg>
          ) : (
            // Mute icon
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
                d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
              />
            </svg>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center my-4">
        <h3 className="text-[22px] font-bold text-[#666] leading-none m-0">
          User Information
        </h3>
        <button>
          <BsInfoCircle className="text-[#615DFA] w-4 h-3" />
        </button>
      </div>
      <div>
        <p className="text-[12px] text-[#666] leading-3 m-0">User ID</p>
        <span className="text-[16px] font-bold text-[#333] leading-none px-2">
          @musfiehfiue
        </span>
      </div>
      <div className="my-3">
        <p className="text-[12px] text-[#666] leading-3 m-0">Email</p>
        <span className="text-[16px] font-bold text-[#333] leading-none px-2">
          abc123@gmail.com
        </span>
      </div>
    </div>
  );
};

export default ProfileDetails;
