"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export const HeaderRight = () => {
  const [open, setOpen] = useState(true);

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
      <div className="fixed-sidebar !z-50 right">
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
                      <li
                        onClick={() => setChatOpen(!chatOpen)}
                        className="chat-item chat-open"
                      >
                        <div className="author-img">
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/figure/chat_1.jpg"
                            alt="chat"
                          />
                          <span className="chat-status offline" />
                        </div>
                      </li>
                      <li
                        onClick={() => setChatOpen(!chatOpen)}
                        className="chat-item chat-open"
                      >
                        <div className="author-img">
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/figure/chat_2.jpg"
                            alt="chat"
                          />
                          <span className="chat-status offline" />
                        </div>
                      </li>
                      <li
                        onClick={() => setChatOpen(!chatOpen)}
                        className="chat-item chat-open"
                      >
                        <div className="author-img">
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/figure/chat_3.jpg"
                            alt="chat"
                          />
                          <span className="chat-status offline" />
                        </div>
                      </li>
                      <li
                        onClick={() => setChatOpen(!chatOpen)}
                        className="chat-item chat-open"
                      >
                        <div className="author-img">
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/figure/chat_4.jpg"
                            alt="chat"
                          />
                          <span className="chat-status online" />
                        </div>
                      </li>
                      <li
                        onClick={() => setChatOpen(!chatOpen)}
                        className="chat-item chat-open"
                      >
                        <div className="author-img">
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/figure/chat_5.jpg"
                            alt="chat"
                          />
                          <span className="chat-status online" />
                        </div>
                      </li>
                      <li
                        onClick={() => setChatOpen(!chatOpen)}
                        className="chat-item chat-open"
                      >
                        <div className="author-img">
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/figure/chat_6.jpg"
                            alt="chat"
                          />
                          <span className="chat-status online" />
                        </div>
                      </li>
                      <li
                        onClick={() => setChatOpen(!chatOpen)}
                        className="chat-item chat-open"
                      >
                        <div className="author-img">
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/figure/chat_7.jpg"
                            alt="chat"
                          />
                          <span className="chat-status offline" />
                        </div>
                      </li>
                      <li
                        onClick={() => setChatOpen(!chatOpen)}
                        className="chat-item chat-open"
                      >
                        <div className="author-img">
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/figure/chat_8.jpg"
                            alt="chat"
                          />
                          <span className="chat-status offline" />
                        </div>
                      </li>
                      <li
                        onClick={() => setChatOpen(!chatOpen)}
                        className="chat-item chat-open"
                      >
                        <div className="author-img">
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/figure/chat_9.jpg"
                            alt="chat"
                          />
                          <span className="chat-status offline" />
                        </div>
                      </li>
                      <li
                        onClick={() => setChatOpen(!chatOpen)}
                        className="chat-item chat-open"
                      >
                        <div className="author-img">
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/figure/chat_10.jpg"
                            alt="chat"
                          />
                          <span className="chat-status offline" />
                        </div>
                      </li>
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
          chatOpen
            ? "translate-y-0 opacity-100 visible"
            : "translate-y-4 opacity-0 invisible"
        }`}
      >
        <div className="bg-white  rounded-lg max-w-lg w-full">
          <div className="px-3 py-[10px] border-b bg-[#615DFA] text-white rounded-t-lg flex justify-between items-center">
            <div className="flex items-center">
              <Image
                alt=""
                width={1000}
                height={100}
                className="rounded-full w-[30px] h-[30px]"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              />
              <div className="pl-2 flex gap-x-[6px] items-center">
                <p className="text-[14px] text-white font-semibold -mb-0">
                  Bayzid Islam
                </p>
                <div className="bg-[#17DD17] h-[6px] w-[6px] mt-[3px] rounded-full"></div>
              </div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="p-4 h-80 overflow-y-auto">
            {/* Chat messages will be displayed here */}

            <div className="mb-2">
              <div className="flex items-center flex-row-reverse mb-[12px]">
                <div className="flex-none flex flex-col items-center space-y-1 ml-4">
                  <Image
                    width={1000}
                    height={100}
                    alt=""
                    className="rounded-full w-[30px] h-[30px]"
                    src="/media/figure/notifiy_3.png"
                  />
                </div>

                <div className="    relative ">
                  <p class="bg-blue-500  leading-[18px] text-[13px] text-white rounded-lg py-2  px-3 inline-block">
                    hello
                  </p>
                  <div className="absolute right-[1px] top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-blue-500" />
                </div>
              </div>
              <div className="flex items-center mb-[20px]">
                <div className="flex-none flex flex-col items-center space-y-1 mr-4">
                  <Image
                    alt=""
                    width={1000}
                    height={100}
                    className="rounded-full w-[30px] h-[30px]"
                    src="/media/figure/notifiy_1.png"
                  />
                </div>
                <div className="    relative">
                  <p class="bg-[#E0E7FF]  leading-[18px] -mb-0 text-[13px] text-black rounded-lg py-2  px-3 inline-block">
                    Hi
                  </p>

                  <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-[#E0E7FF]" />
                </div>
              </div>
              <div className="flex items-center flex-row-reverse mb-[12px]">
                <div className="flex-none flex flex-col items-center space-y-1 ml-4">
                  <Image
                    alt=""
                    width={1000}
                    height={100}
                    className="rounded-full w-[30px] h-[30px]"
                    src="/media/figure/notifiy_3.png"
                  />
                </div>

                <div className="     relative">
                  <p class="bg-blue-500   leading-[18px] text-[13px] text-white rounded-lg py-2  px-3 inline-block">
                    How are You
                  </p>
                  <div className="absolute right-[1px] top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-blue-500" />
                </div>
              </div>
              <div className="flex items-center mb-[20px]">
                <div className="flex-none flex flex-col items-center space-y-1 mr-4">
                  <Image
                    alt=""
                    width={1000}
                    height={100}
                    className="rounded-full w-[30px] h-[30px]"
                    src="/media/figure/notifiy_1.png"
                  />
                </div>
                <div className="    relative">
                  <p class="bg-[#E0E7FF]  leading-[18px] -mb-0 text-[13px] text-black rounded-lg py-2  px-3 inline-block">
                    I am Fine, what about you?
                  </p>

                  <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-[#E0E7FF]" />
                </div>
              </div>
              <div className="flex items-center flex-row-reverse mb-[12px]">
                <div className="flex-none flex flex-col items-center space-y-1 ml-4">
                  <Image
                    alt=""
                    width={1000}
                    height={100}
                    className="rounded-full w-[30px] h-[30px]"
                    src="/media/figure/notifiy_3.png"
                  />
                </div>

                <div className="    relative">
                  <p class="bg-blue-500  leading-[18px] text-[13px] text-white rounded-lg py-2  px-3 inline-block">
                    I Have A job for Your.
                  </p>
                  <div className="absolute right-[1px] top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-blue-500" />
                </div>
              </div>
              <div className="flex items-center mb-[20px]">
                <div className="flex-none flex flex-col items-center space-y-1 mr-4">
                  <Image
                    alt=""
                    width={1000}
                    height={100}
                    className="rounded-full w-[30px] h-[30px]"
                    src="/media/figure/notifiy_1.png"
                  />
                </div>
                <div className="relative">
                  <p class="bg-[#E0E7FF]  leading-[18px] -mb-0 text-[13px] text-black rounded-lg py-2  px-3 inline-block">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>

                  <div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-[#E0E7FF]" />
                </div>
              </div>
            </div>
          </div>
          <div className="p-3 border-t flex">
            <input
              id="user-input"
              type="text"
              placeholder="Type a message"
              className="w-full px-3 py-[5px] border rounded-l-[20px]  outline-none"
            />
            <button
              id="send-button"
              className="bg-blue-500 text-white px-4 py-[5px] rounded-r-md hover:bg-blue-600 transition duration-300"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
