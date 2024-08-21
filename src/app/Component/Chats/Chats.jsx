"use client";

import React, { useState } from "react";
import { MdOutlineTabUnselected } from "react-icons/md";
import { CiSaveDown1 } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import AllMessages from "./AllMessages";
import MessageBox from "./MessageBox";
import ProfileDetails from "./ProfileDetails";

const Chats = () => {
  const [isProfileVisible, setIsProfileVisible] = useState(true);

  const handleProfileToggle = () => {
    setIsProfileVisible((prev) => !prev);
  };
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
              <button className="w-full h-[28px] bg-[#EFF4FB] rounded col-span-2 border-[1px] relative">
                <span className="text-[12px] font-semibold ">All Chats</span>
                <CiSaveDown1 className="w-4 h-4 text-[#615DFA] absolute top-1/2 right-2 transform -translate-y-1/2" />
              </button>
              <div className="w-auto col-span-3 relative">
                <input
                  type="search"
                  name=""
                  id=""
                  className="w-full text-[12px] font-normal h-[28px] bg-[#EFF4FB] px-2 rounded placeholder:!font-normal  border-[1px] outline-none"
                  placeholder="search user"
                />
                <IoIosSearch className="w-4 h-4 text-[#615DFA] absolute top-1/2 right-2 transform -translate-y-1/2" />
              </div>
            </div>
          </div>
          <div>
            <AllMessages />
          </div>
        </div>
        <div className="col-span-5 h-[80vh] bg-[#f7fafd] border-[0.5px] relative">
          <MessageBox onProfileClick={handleProfileToggle} />
        </div>
        <div className="col-span-3 h-[80vh] bg-white rounded-r-xl">
          {isProfileVisible && <ProfileDetails onClose={handleProfileToggle} />}
        </div>
      </div>
    </div>
  );
};

export default Chats;
