"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
export const NotificationChatList = ({
  chat,
  activeUsers,
  userID,
  handelChatSelectedFromChatNotifyDropdown,
}) => {
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

  const [profile, setProfile] = useState();
  const [isFollow, setIsFollow] = useState(false);
  const [isFollowEr, setIsFollowEr] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const fetchUserProfile = async (participantId, participantRole) => {
    if (!participantId && !participantRole) return;
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem(`${userRole}AccessToken`);
    const endpoint = `https://api.mymakan.ae/user/${participantId}`;
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
      key={chat?.id}
      onClick={() => handelChatSelectedFromChatNotifyDropdown(chat?.id, chat)}
      className="flex items-start px-[15px] py-[12px] h-[80px] transition-all duration-300 ease-in-out hover:bg-[#F6F9FD] relative cursor-pointer"
    >
      <div className="mr-3 mt-[9px]">
        <Image
          width={40}
          height={40}
          className="rounded-full w-[40px] h-[40px]"
          src={participantImage}
          alt="Notify"
        />
        <span className="chat-status offline" />
      </div>
      <div className="relative flex-1 mt-[4px]">
        <h6 className=" mt-[5px] font-bold text-[14px] text-black">
          {participantRole === "buyer"
            ? isFriend || isFollow || isFollowEr
              ? participantName
              : "Hidden Name"
            : participantName}
        </h6>
        <p className="-mt-[13px]  text-[11px] font-semibold text-gray-500 leading-4">
          {chat.latestMessage.length > 30
            ? chat.latestMessage.slice(0, 30) + "..."
            : chat.latestMessage}
        </p>

        <div className="absolute top-[5px] right-0 flex gap-x-2.5">
          <p className="text-[11px] font-semibold text-gray-500 leading-4">
            {formatTimestamp(chat.latestMessageTimestamp)}
          </p>
        </div>
      </div>
      <div className="absolute right-[10px] bottom-[20px]">
        {unseenCount > 0 ? (
          <div className="w-[20px] h-[20px] bg-red-500 rounded-full px-2 py-0.5 relative ">
            <span className=" text-white text-[9px] absolute inset-0 flex items-center justify-center">
              {unseenCount}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
