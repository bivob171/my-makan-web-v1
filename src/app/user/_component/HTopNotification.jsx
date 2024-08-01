"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaComments, FaMinus } from "react-icons/fa6";

const HTopNotification = ({
  isVisible,
  matchOpen,
  logOut,
  notificationOpen,
  messageOpen,
}) => {
  return (
    <>
      <div
        className={`transition-all duration-300 ease-in-out transform w-[230px] h-[260px] rounded-md shadow-lg bg-white z-50 pt-[10px] absolute 2xl:ml-[350px] xl:ml-[350px] lg:ml-[350px] md:ml-[270px] sm:ml-[10px] ml-[10px] 2xl:top-[72px] xl:top-[74px] lg:top-[78px] md:top-[62px] sm:top-[57px] top-[57px]  ${
          isVisible
            ? "translate-y-0 opacity-100 visible"
            : "translate-y-4 opacity-0 invisible"
        }`}
      >
        <div>
          <div className="flex gap-x-[30px] mt-[15px] mb-[10px] items-center">
            <div className="bg-[#71728C] w-[6.5px] h-[6px] rounded-full ml-[25px]"></div>
            <Link
              href="/user/profile/about"
              className="pr-4  text-sm text-gray-700 text-opacity-70 hover:text-[#69E1FF]"
              role="menuitem"
            >
              Profile
            </Link>
          </div>
          <hr />
          <div className="flex gap-x-[30px] mt-[10px] mb-[10px] items-center">
            <div className="bg-[#71728C] w-[6.5px] h-[6px] rounded-full ml-[25px]"></div>
            <a
              href="#"
              className="pr-4  text-sm text-gray-700 text-opacity-70 hover:text-[#69E1FF]"
              role="menuitem"
            >
              Profile Settings
            </a>
          </div>
          <hr />
          <div className="flex gap-x-[30px] mt-[10px] mb-[10px] items-center">
            <div className="bg-[#71728C] w-[6.5px] h-[6px] rounded-full ml-[25px]"></div>
            <a
              href="#"
              className="pr-4  text-sm text-gray-700 text-opacity-70 hover:text-[#69E1FF]"
              role="menuitem"
            >
              Terms and Conditions
            </a>
          </div>
          <hr />

          <div className="flex gap-x-[30px] mt-[10px] items-center coursor-pointer">
            <div className="bg-[#71728C] w-[6.5px] h-[6px] rounded-full ml-[25px]"></div>
            <a
              onClick={() => {
                logOut();
              }}
              className="pr-4  text-sm text-gray-700 text-opacity-70 hover:text-[#69E1FF]"
            >
              Log Out
            </a>
          </div>
        </div>
      </div>
      <div
        className={`absolute  -ml-[5px]  2xl:top-[67px] xl:top-[67px] lg:top-[70px] md:top-[58px] transition-all duration-300 ease-in-out transform ${
          matchOpen
            ? "translate-y-0 opacity-100 visible"
            : "translate-y-4 opacity-0 invisible"
        }`}
      >
        <div className="mt-1 text-base text-left list-none bg-white border border-solid border-gray-300 rounded-b-[9px] shadow-lg  opacity-100 transform translate-y-0 w-[330px] right-0">
          <div className="flex items-center justify-between px-[15px] pt-[13px] text-sm">
            <p className="mt-[10px] font-bold text-black whitespace-nowrap">
              Matched Properties
            </p>
            <div className="text-right whitespace-nowrap">
              <a
                href="#"
                className="mr-3 text-xs text-gray-500 no-underline transition-all duration-300 ease-in-out cursor-pointer hover:text-[#615dfa]"
              >
                Settings
              </a>
              <a
                href="#"
                className="text-xs text-gray-500 no-underline transition-all duration-300 ease-in-out cursor-pointer hover:text-[#615dfa]"
              >
                Mark all as Read
              </a>
            </div>
          </div>
          <div>
            <div className="flex items-start px-[15px] py-[12px] h-[80px] transition-all duration-300 ease-in-out hover:bg-[#F6F9FD]">
              <div className="mr-3 mt-[8px]">
                <Image
                  width={1000}
                  height={100}
                  className="rounded-full w-auto h-auto"
                  src="/media/figure/chat_5.jpg"
                  alt="Notify"
                />
                <span className="chat-status offline" />
              </div>
              <div className="relative flex-1 items-center mt-[4px]">
                <h6 className=" mt-[4px] font-bold text-[14px] text-black">
                  <a href="#">Lily Zaman</a>
                </h6>
                <p className="-mt-[10px]  text-[11px] font-semibold text-gray-500 leading-4">
                  1 Posts matched to you
                </p>

                <div className="absolute top-2 right-0 flex gap-x-2.5">
                  <a href="#">
                    <button className="flex items-center h-[27px] px-[8px] rounded bg-[#CBDAEF] hover:bg-[#5EDFFF]">
                      <p className="text-[15px] font-medium text-white -mb-[1px]">
                        <FaComments />
                      </p>
                    </button>
                  </a>
                  <Link href="#">
                    <button className="focus:outline-none flex items-center h-[27px] px-[8px] rounded bg-[#CBDAEF] hover:bg-[#5EDFFF]">
                      <p className="text-[15px] font-normal text-white -mb-[1px]">
                        <FaMinus />
                      </p>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex items-start px-[15px] py-[12px] h-[80px] transition-all duration-300 ease-in-out hover:bg-[#F6F9FD]">
              <div className="mr-3 mt-[8px]">
                <Image
                  width={100}
                  height={100}
                  className="rounded-full w-auto h-auto"
                  src="/media/figure/chat_1.jpg"
                  alt="Notify"
                />
                <span className="chat-status offline" />
              </div>
              <div className="relative flex-1 mt-[4px]">
                <h6 className=" mt-[5px] font-bold text-[14px] text-black">
                  <a href="#">Lily Zaman</a>
                </h6>
                <p className="-mt-[10px]  text-[11px] font-semibold text-gray-500 leading-4">
                  1 Posts matched to you
                </p>

                <div className="absolute top-2 right-0 flex gap-x-2.5">
                  <a href="#">
                    <button className="flex items-center h-[27px] px-[8px] rounded bg-[#CBDAEF] hover:bg-[#5EDFFF]">
                      <p className="text-[15px] font-medium text-white -mb-[1px]">
                        <FaComments />
                      </p>
                    </button>
                  </a>
                  <a href="#">
                    <button className="flex items-center h-[27px] px-[8px] rounded bg-[#CBDAEF] hover:bg-[#5EDFFF]">
                      <p className="text-[15px] font-normal text-white -mb-[1px]">
                        <FaMinus />
                      </p>
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="flex items-start px-[15px] py-[12px] h-[80px] transition-all duration-300 ease-in-out hover:bg-[#F6F9FD]">
              <div className="mr-3 mt-[8px]">
                <Image
                  width={1000}
                  height={100}
                  className="rounded-full w-auto h-auto"
                  src="/media/figure/chat_8.jpg"
                  alt="Notify"
                />
                <span className="chat-status offline" />
              </div>
              <div className="relative flex-1 mt-[4px]">
                <h6 className=" mt-[5px] font-bold text-[14px] text-black">
                  <a href="#">Lily Zaman</a>
                </h6>
                <p className="-mt-[10px]  text-[11px] font-semibold text-gray-500 leading-4">
                  1 Posts matched to you
                </p>

                <div className="absolute top-2 right-0 flex gap-x-2.5">
                  <a href="#">
                    <button className="flex items-center h-[27px] px-[8px] rounded bg-[#CBDAEF] hover:bg-[#5EDFFF]">
                      <p className="text-[15px] font-medium text-white -mb-[1px]">
                        <FaComments />
                      </p>
                    </button>
                  </a>
                  <Link href="#">
                    <button className=" flex items-center h-[27px] px-[8px] rounded bg-[#CBDAEF] hover:bg-[#5EDFFF]">
                      <p className="text-[15px] font-normal text-white -mb-[1px]">
                        <FaMinus />
                      </p>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className=" mt-[8px]">
            <button className="focus:outline-none w-full h-[50px] text-base font-semibold text-white bg-[#615DFA] rounded-b-lg  block no-underline cursor-pointer transition-all duration-300 ease-in-out font-inter">
              View All Matched Properties
            </button>
          </div>
        </div>
      </div>
      <div
        className={`absolute  2xl:ml-[33px] xl:ml-[33px] lg:ml-[33px] md:ml-[33px] ml-[0px] 2xl:top-[67px] xl:top-[67px] lg:top-[70px] md:top-[58px] sm:top-[55px] top-[52px] transition-all duration-300 ease-in-out transform ${
          messageOpen
            ? "translate-y-0 opacity-100 visible"
            : "translate-y-4 opacity-0 invisible"
        }`}
      >
        <div className="mt-1 text-base text-left list-none bg-white border border-solid border-gray-300 rounded-b-[9px] shadow-lg  opacity-100 transform translate-y-0 w-[330px] right-0">
          <div className="flex items-center justify-between px-[15px] pt-[15px] text-sm">
            <h6 className="pt-[10px] font-bold text-black leading-[15px]">
              Message
            </h6>
            <div className="text-right">
              <a
                href="#"
                className="mr-3 text-xs text-gray-500 no-underline transition-all duration-300 ease-in-out cursor-pointer hover:text-[#615dfa]"
              >
                Settings
              </a>
              <a
                href="#"
                className="text-xs text-gray-500 no-underline transition-all duration-300 ease-in-out cursor-pointer hover:text-[#615dfa]"
              >
                Mark all as Read
              </a>
            </div>
          </div>
          <div>
            <div className="flex items-start px-[15px] py-[12px] h-[80px] transition-all duration-300 ease-in-out hover:bg-[#F6F9FD]">
              <div className="mr-3 mt-[9px]">
                <Image
                  width={1000}
                  height={100}
                  className="rounded-full w-auto h-auto"
                  src="/media/figure/notifiy_1.png"
                  alt="Notify"
                />
                <span className="chat-status offline" />
              </div>
              <div className="relative flex-1 mt-[4px]">
                <h6 className=" mt-[5px] font-bold text-[14px] text-black">
                  <a href="#">Diana Jameson</a>
                </h6>
                <p className="-mt-[13px]  text-[11px] font-semibold text-gray-500 leading-4">
                  when are nknowen printer took galley of types ...
                </p>

                <div className="absolute top-[5px] right-0 flex gap-x-2.5">
                  <p className="text-[11px] font-semibold text-gray-500 leading-4">
                    15 Minite
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start px-[15px] py-[12px] h-[80px] transition-all duration-300 ease-in-out hover:bg-[#F6F9FD]">
              <div className="mr-3 mt-[9px]">
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto rounded-full"
                  src="/media/figure/notifiy_3.png"
                  alt="Notify"
                />
                <span className="chat-status offline" />
              </div>
              <div className="relative flex-1 mt-[4px]">
                <h6 className=" mt-[5px] font-bold text-[14px] text-black">
                  <a href="#">Bayzid Islam</a>
                </h6>
                <p className="-mt-[13px]  text-[11px] font-semibold text-gray-500 leading-4">
                  when are nknowen printer took galley of types ...
                </p>

                <div className="absolute top-[5px] right-0 flex gap-x-2.5">
                  <p className="text-[11px] font-semibold text-gray-500 leading-4">
                    15 Minite
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-start px-[15px] py-[12px] h-[80px] transition-all duration-300 ease-in-out hover:bg-[#F6F9FD]">
              <div className="mr-3 mt-[9px]">
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto rounded-full"
                  src="/media/figure/notifiy_3.png"
                  alt="Notify"
                />
                <span className="chat-status offline" />
              </div>
              <div className="relative flex-1 mt-[4px]">
                <h6 className=" mt-[5px] font-bold text-[14px] text-black">
                  <a href="#">Bayzid Islam</a>
                </h6>
                <p className="-mt-[13px]  text-[11px] font-semibold text-gray-500 leading-4">
                  when are nknowen printer took galley of types ...
                </p>

                <div className="absolute top-[5px] right-0 flex gap-x-2.5">
                  <p className="text-[11px] font-semibold text-gray-500 leading-4">
                    15 Minite
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" mt-[15px]">
            <button className="focus:outline-none w-full h-[60px] text-base font-normal text-white bg-[#615DFA] rounded-b-lg  block no-underline cursor-pointer transition-all duration-300 ease-in-out font-inter">
              View All Messages
            </button>
          </div>
        </div>
      </div>
      <div></div>
      <div
        className={`absolute  2xl:ml-[65px] xl:ml-[65px] lg:ml-[65px] md:ml-[65px] ml-[0px] 2xl:top-[67px] xl:top-[67px] lg:top-[70px] md:top-[58px] sm:top-[55px] top-[52px] transition-all duration-300 ease-in-out transform ${
          notificationOpen === true
            ? "translate-y-0 opacity-100 visible"
            : "translate-y-4 opacity-0 invisible"
        }`}
      >
        <div className="mt-1 text-base text-left list-none bg-white border border-solid border-gray-300 rounded-b-[9px] shadow-lg  opacity-100 transform translate-y-0 w-[330px] right-0">
          <div className="flex items-center justify-between px-[15px] pt-[15px] text-sm">
            <h6 className="pt-[10px] font-bold text-black leading-[15px]">
              Notification
            </h6>
            <div className="text-right">
              <a
                href="#"
                className="mr-3 text-xs text-gray-500 no-underline transition-all duration-300 ease-in-out cursor-pointer hover:text-[#615dfa]"
              >
                Settings
              </a>
              <a
                href="#"
                className="text-xs text-gray-500 no-underline transition-all duration-300 ease-in-out cursor-pointer hover:text-[#615dfa]"
              >
                Mark all as Read
              </a>
            </div>
          </div>
          <div>
            <div className="flex items-start px-[15px] py-[12px] h-[80px] transition-all duration-300 ease-in-out hover:bg-[#F6F9FD]">
              <div className="mr-3 mt-[9px]">
                <Image
                  width={1000}
                  height={100}
                  className="rounded-full w-auto h-auto"
                  src="/media/figure/notifiy_1.png"
                  alt="Notify"
                />
                <span className="chat-status offline" />
              </div>
              <div className="relative flex-1 mt-[4px]">
                <h6 className=" mt-[5px] font-bold text-[14px] text-black">
                  <a href="#">Diana Jameson</a>
                </h6>
                <p className="-mt-[13px]  text-[11px] font-semibold text-gray-500 leading-4">
                  when are nknowen printer took galley of types ...
                </p>

                <div className="absolute top-[5px] right-0 flex gap-x-2.5">
                  <p className="text-[11px] font-semibold text-gray-500 leading-4">
                    15 Minite
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start px-[15px] py-[12px] h-[80px] transition-all duration-300 ease-in-out hover:bg-[#F6F9FD]">
              <div className="mr-3 mt-[9px]">
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto rounded-full"
                  src="/media/figure/notifiy_3.png"
                  alt="Notify"
                />
                <span className="chat-status offline" />
              </div>
              <div className="relative flex-1 mt-[4px]">
                <h6 className=" mt-[5px] font-bold text-[14px] text-black">
                  <a href="#">Bayzid Islam</a>
                </h6>
                <p className="-mt-[13px]  text-[11px] font-semibold text-gray-500 leading-4">
                  when are nknowen printer took galley of types ...
                </p>

                <div className="absolute top-[5px] right-0 flex gap-x-2.5">
                  <p className="text-[11px] font-semibold text-gray-500 leading-4">
                    15 Minite
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-start px-[15px] py-[12px] h-[80px] transition-all duration-300 ease-in-out hover:bg-[#F6F9FD]">
              <div className="mr-3 mt-[9px]">
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto rounded-full"
                  src="/media/figure/notifiy_3.png"
                  alt="Notify"
                />
                <span className="chat-status offline" />
              </div>
              <div className="relative flex-1 mt-[4px]">
                <h6 className=" mt-[5px] font-bold text-[14px] text-black">
                  <a href="#">Bayzid Islam</a>
                </h6>
                <p className="-mt-[13px]  text-[11px] font-semibold text-gray-500 leading-4">
                  when are nknowen printer took galley of types ...
                </p>

                <div className="absolute top-[5px] right-0 flex gap-x-2.5">
                  <p className="text-[11px] font-semibold text-gray-500 leading-4">
                    15 Minite
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className=" mt-[15px]">
            <button className="focus:outline-none w-full h-[60px] text-base font-normal text-white bg-[#615DFA] rounded-b-lg  block no-underline cursor-pointer transition-all duration-300 ease-in-out font-inter">
              View All Notification
            </button>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default HTopNotification;
