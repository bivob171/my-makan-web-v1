"use client";

import React, { useContext, useState } from "react";
import { MdOutlineTabUnselected } from "react-icons/md";
import { CiSaveDown1 } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import AllMessages from "./AllMessages";
import MessageBox from "./MessageBox";
import ProfileDetails from "./ProfileDetails";
import { ChatValueContext } from "@/Context/chatContext";
import PrivateRouteContext from "@/Context/PrivetRouteContext";

const Chats = () => {
  const [isProfileVisible, setIsProfileVisible] = useState(true);
  const { user } = PrivateRouteContext();
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

  function profileSideBar() {
    setIsProfileVisible(!isProfileVisible);
  }

  return (
    <div className="mx-auto max-w-screen-xl pt-[120px] h-screen text-[#222]">
      <div className="grid grid-cols-11">
        <div className="col-span-3 h-[80vh] bg-white rounded-l-xl">
          <div className="border-b-[1px] p-2 !pt-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[24px] font-bold leading-3 !m-0">Chats</h3>
              {/* tab button  */}
              <button>
                <MdOutlineTabUnselected className="w-5 h-5 text-[#615DFA]" />{" "}
              </button>
            </div>
            <div className="grid grid-cols-5 gap-x-2 items-center">
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="w-full h-[28px] bg-[#EFF4FB] rounded col-span-2 border-[1px] relative"
              >
                <span className="text-[12px] font-semibold ">All Chats</span>
                <CiSaveDown1 className="w-4 h-4 text-[#615DFA] absolute top-1/2 right-2 transform -translate-y-1/2" />
              </button>
              <div className="w-auto col-span-3 relative">
                <input
                  type="search"
                  name=""
                  id=""
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-[12px] font-normal h-[28px] bg-[#EFF4FB] px-2 rounded placeholder:!font-normal  border-[1px] outline-none"
                  placeholder="search user"
                />
                <IoIosSearch className="w-4 h-4 text-[#615DFA] absolute top-1/2 right-2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>
          <div className="h-[70vh] overflow-y-auto">
            <AllMessages
              chats={chats}
              handleChatSelection={handleChatSelection}
            />
          </div>
        </div>
        <div
          className={`${
            isProfileVisible === true ? "col-span-5" : "col-span-8"
          } " h-[80vh] bg-[#f7fafd] border-[0.5px] relative w-auto"`}
        >
          {selectedChatId && selectedChat && (
            <MessageBox
              chatId={selectedChatId}
              selectedChat={selectedChat}
              profileSideBar={profileSideBar}
            />
          )}
        </div>
        {isProfileVisible === true ? (
          <div className="col-span-3 h-[80vh] bg-white rounded-r-xl">
            {selectedChatId && selectedChat && (
              <ProfileDetails
                selectedChat={selectedChat}
                profileSideBar={profileSideBar}
              />
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Chats;
