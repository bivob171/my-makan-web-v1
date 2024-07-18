import React, { useState } from "react";
import Image from "next/image";
import { MdAddAPhoto } from "react-icons/md";
import { GoStarFill } from "react-icons/go";
import ProfilePostTab from "./ProfilePostTab";

export const AgentProfile = () => {
  const [activeTab, setActiveTab] = useState("Posts");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Posts":
        return <ProfilePostTab />;
      case "About":
        return <div>About Tab</div>;
      case "Photos":
        return <div>Photos Tab</div>;
      case "Videos":
        return <div>Videos Tab</div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="page-content bg-[white] shadow-sm !pt-[100px]">
        <div className="container">
          <div className="relative">
            <div className="relative">
              <Image
                src="/media/blog/cover.jpg"
                width={1000}
                height={1000}
                alt="cover image"
                className="w-full h-[450px] object-cover object-top rounded-b-lg"
              />
              <button className="bg-[white] hover:bg-[#fefefef1] py-1 px-3 flex justify-center items-center gap-2 absolute bottom-4 right-4 rounded-md shadow-md">
                <MdAddAPhoto className="w-5 h-5" />
                <span className="text-[16px] font-bold">Edit Cover Photo</span>
              </button>
            </div>
            <div className="flex justify-start items-end gap-3 -mt-10 px-10">
              <div className="relative w-[180px] h-[180px] border-4 border-[#dbdbdb] rounded-full">
                <Image
                  src="/media/blog/blog_9.jpg"
                  width={1000}
                  height={1000}
                  alt="cover image"
                  className="w-full h-full object-cover object-top rounded-full shadow-md"
                />
                <button className="absolute bottom-1 right-0 bg-[#dbdbdb] p-[6px] rounded-full flex justify-center items-center">
                  <MdAddAPhoto className="w-5 h-5" />
                </button>
              </div>
              <div>
                <div className="flex justify-start items-center gap-4">
                  <div className="flex justify-start items-start gap-2">
                    <h1 className="text-[42px] leading-none">Md Bayzid</h1>
                    <Image
                      src="/homeCard/verified.png"
                      width={100}
                      height={100}
                      alt="cover image"
                      className="w-5 h-5"
                    />
                  </div>
                  <p className="text-[#F5B849] text-[18px] font-semibold flex justify-start items-center gap-1 !m-0">
                    <span>4.5</span>
                    <GoStarFill className="w-5 h-5" />
                  </p>
                </div>
                <h1 className="text-[28px] font-semibold leading-none hover:underline underline-offset-4 text-[#8920AD] uppercase">
                  BETTER HOME (L.L.C)
                </h1>
              </div>
            </div>
          </div>
          {/* tab menu  */}
          <div className="h-[60px] mt-4 border-t-[1px] border-b-[1px]">
            <ul className="flex h-full">
              {["Posts", "About", "Photos", "Videos"].map((tab) => (
                <li
                  key={tab}
                  className={`cursor-pointer flex justify-center items-center px-4 text-[14px] font-bold ${
                    activeTab === tab
                      ? "border-b-2 border-b-[#615DFA] transition duration-300"
                      : "hover:bg-[#ecececc2] transition duration-300"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-[#EFF4FB] my-10">
        <div className="page-content !pt-0">
          <div className="container">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};
