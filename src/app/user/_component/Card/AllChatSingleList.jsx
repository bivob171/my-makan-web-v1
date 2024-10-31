"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { LuCheckCheck } from "react-icons/lu";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
export const AllChatSingleList = ({
  chat,
  activeUsers,
  userID,
  handleChatSelection,
  userRole,
  user,
}) => {
  const premium = user?.premium;
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "No Date";
    const date = timestamp.toDate(); // Convert Timestamp to Date object
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }); // Format as 'HH:MM'
  };

  const participantId = chat?.participants
    .filter((p) => p.id !== userID) // Exclude the current user
    .map((p) => p.id)[0];
  const participantImage = chat?.participants
    .filter((p) => p.id !== userID) // Exclude the current user
    .map((p) => p.image)[0];
  const participantName = chat?.participants
    .filter((p) => p.id !== userID) // Exclude the current user
    .map((p) => p.name)[0];
  const participantRole = chat?.participants
    .filter((p) => p.id !== userID) // Exclude the current user
    .map((p) => p.role)[0];
  const unseenCountparticipan = chat.unseenMessages[participantId] || 0;
  const unseenCount = chat.unseenMessages[userID] || 0;
  const isActive = activeUsers.includes(participantId);

  const time = chat.latestMessageTimestamp
    ? chat.latestMessageTimestamp
    : chat.createdAt;

  const [profile, setProfile] = useState();
  const [isFollow, setIsFollow] = useState(false);
  const [isFollowEr, setIsFollowEr] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const fetchUserProfile = async (participantId, participantRole) => {
    if (!participantId && !participantRole) return;
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem(`${userRole}AccessToken`);
    const endpoint = `https://q2p08zg4-4000.asse.devtunnels.ms/user/${participantId}`;
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      } else {
        const profile = await response.json();
        setProfile(profile);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    if (participantRole === "buyer") {
      fetchUserProfile(participantId, participantRole);
    }
  }, [participantId, participantRole]);

  useEffect(() => {
    setIsFollow(profile?.following);
    setIsFollowEr(profile?.follower);
    setIsFriend(profile?.friend);
  }, [profile]);

  return (
    <div
      key={chat.id}
      onClick={() => handleChatSelection(chat?.id, chat)}
      className=" cursor-pointer flex justify-start items-start gap-2 py-[6px] px-[2px] border-b-[1px] hover:bg-[#eff4fbc0] hover:rounded-md"
    >
      <Image
        src={participantImage}
        alt=""
        width={500}
        height={500}
        className="w-[50px] h-[50px] object-cover rounded-full object-top"
      />

      <div className="w-full">
        <div className="flex justify-between items-start">
          <span className="text-[16px] font-bold ">
            {participantRole === "buyer"
              ? isFriend || isFollow || isFollowEr
                ? participantName
                : "Hidden Name"
              : participantName}
          </span>
          <span className="text-[10px] font-normal">
            {formatTimestamp(time)}
          </span>
        </div>
        <div className="flex justify-between items-center -mt-1">
          {userRole === "agent" ? (
            <>
              {chat.latestMessage.length > 0 ? (
                <>
                  {premium === false && participantRole === "buyer" ? (
                    <span className="text-[12px] leading-5">
                      For see the massage buy a package
                    </span>
                  ) : (
                    <span className="text-[12px] leading-5">
                      {" "}
                      {chat.latestMessage.length > 30
                        ? chat.latestMessage.slice(0, 30) + "..."
                        : chat.latestMessage}{" "}
                    </span>
                  )}
                </>
              ) : (
                <span className="text-[12px] leading-5"> No messages yet.</span>
              )}
            </>
          ) : (
            <>
              {chat.latestMessage.length > 0 ? (
                <span className="text-[12px] leading-5">
                  {" "}
                  {chat.latestMessage.length > 30
                    ? chat.latestMessage.slice(0, 30) + "..."
                    : chat.latestMessage}{" "}
                </span>
              ) : (
                <span className="text-[12px] leading-5"> No messages yet.</span>
              )}
            </>
          )}

          <div className="flex gap-x-[5px] items-center">
            <div className="">
              {" "}
              {unseenCount > 0 ? null : (
                <>
                  {chat.latestMessage.length > 0 ? (
                    <p
                      className={`${
                        unseenCountparticipan > 0 || unseenCount > 0
                          ? "text-green-500"
                          : "text-blue-500"
                      } "text-[11px]   font-bold "`}
                    >
                      <LuCheckCheck />
                    </p>
                  ) : null}
                </>
              )}
            </div>
            <div>
              {unseenCount > 0 ? (
                <div className="w-[20px] h-[20px] bg-red-500 rounded-full px-2 py-0.5 relative">
                  <span className=" text-white text-[9px] absolute inset-0 flex items-center justify-center">
                    {unseenCount}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
