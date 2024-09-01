"use client";
import { ChatValueContext } from "@/Context/chatContext";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { NewsFeedChatCard } from "./Card/NewsFeedChatCard";

export const HeaderRight = () => {
  const [open, setOpen] = useState(true);
  const { user, activeUsers } = PrivateRouteContext();
  const {
    handleChatSelection,
    selectedChatId,
    setSelectedChatId,
    activeChatId,
    setActiveChatId,
    chats,
    setChats,
    setLoading,
    loading,
    searchQuery,
    setSearchQuery,
    selectedChat,
    setSelectedChat,
  } = useContext(ChatValueContext);
  const [chatOpen, setChatOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setChatOpen(false);
    } else {
      console.log("Clicked inside");
    }
  };

  useEffect(() => {
    if (chatOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [chatOpen]);
  return (
    <div>
      <div className="fixed-sidebar !z-40 right">
        <div className="fixed-sidebar-right small-sidebar">
          <div
            onClick={() => {
              setOpen(!open);
              setChatOpen(false);
            }}
            className="sidebar-toggle !h-[100px] !w-full"
          >
            <button className="chat-icon focus:outline-none">
              <i className="icofont-speech-comments" />
            </button>
          </div>
          <div
            className={`sidebar-menu-wrap    transition-transform duration-300 ease-in-out transform ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
          >
            {open === true ? (
              <div>
                <div className=" h-screen overflow-y-auto ">
                  <div
                    className="mCustomScrollbar"
                    data-mcs-theme="dark"
                    data-mcs-axis="y"
                  >
                    <ul className="user-chat-list">
                      {chats.length > 0 &&
                        chats?.map((chat) => {
                          const formatTimestamp = (timestamp) => {
                            if (!timestamp) return "No Date";
                            const date = timestamp.toDate(); // Convert Timestamp to Date object
                            return date.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            }); // Format as 'HH:MM'
                          };

                          const participantId = chat?.participantsInfo?.id;
                          const participantImage =
                            chat?.participantsInfo?.image;
                          const participantName = chat?.participantsInfo?.name;
                          const unseenCountparticipan =
                            chat.unseenMessages[participantId] || 0;
                          const unseenCount =
                            chat.unseenMessages[user?._id] || 0;

                          const isActive = activeUsers.includes(participantId);
                          return (
                            <li
                              onClick={() => {
                                handleChatSelection(chat?.id, chat);
                                setChatOpen(!chatOpen);
                              }}
                              className="chat-item chat-open relative"
                            >
                              <div className="author-img">
                                <Image
                                  width={40}
                                  height={40}
                                  className=" h-[46px] w-[46px]"
                                  src={participantImage}
                                  alt="chat"
                                />
                                <span className="chat-status offline" />
                                {unseenCount > 0 ? (
                                  <div className="absolute right-0 -top-[10px] z-10">
                                    <div className="w-[20px] h-[20px] bg-red-500 rounded-full px-2 py-0.5 relative ">
                                      <span className=" text-white text-[9px] absolute inset-0 flex items-center justify-center">
                                        {unseenCount}
                                      </span>
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      {/* Chat messages will be displayed here */}
      <div
        ref={dropdownRef}
        className={`fixed bottom-0 right-[93px] w-96 z-50 transition-all duration-300 ease-in-out transform ${
          selectedChatId && selectedChat && activeChatId
            ? "translate-y-0 opacity-100 visible"
            : "translate-y-4 opacity-0 invisible"
        }`}
      >
        <NewsFeedChatCard
          chatId={selectedChatId}
          setSelectedChatId={setSelectedChatId}
          setSelectedChat={setSelectedChat}
          selectedChat={selectedChat}
          setActiveChatId={setActiveChatId}
          activeChatId={activeChatId}
        />
      </div>
    </div>
  );
};
