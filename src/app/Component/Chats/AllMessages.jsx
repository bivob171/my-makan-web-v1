"use client";
import { AllChatSingleList } from "@/app/user/_component/Card/AllChatSingleList";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { LuCheckCheck } from "react-icons/lu";

const AllMessages = ({ chats, handleChatSelection }) => {
  const { user, activeUsers } = PrivateRouteContext();
  const [userRole, setUserFeedRole] = useState("");
  const [userID, setUserID] = useState("");
  useEffect(() => {
    const role = localStorage.getItem("role");
    const id = localStorage.getItem(`${role}Id`);
    setUserFeedRole(role);
    setUserID(id);
  }, []);
  return (
    <div className="px-3 py-2 ">
      {chats.map((chat) => {
        return (
          <AllChatSingleList
            key={chat.id}
            chat={chat}
            activeUsers={activeUsers}
            userID={userID}
            handleChatSelection={handleChatSelection}
            userRole={userRole}
            user={user}
          />
        );
      })}
    </div>
  );
};

export default AllMessages;
