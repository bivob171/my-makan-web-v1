"use client";

import React, { useEffect, useRef, useState } from "react";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import Image from "next/image";
import Link from "next/link";
import { FaComments, FaMinus } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import Icofont from "react-icofont";
import { useRouter } from "next/navigation";

export const HeaderTop = () => {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();
  const [matchOpen, setMatchOpen] = useState(false);
  const [messageOpen, setMessageOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      console.log("Clicked outside", notificationOpen);
      setNotificationOpen(false);
      setMessageOpen(false);
      setMatchOpen(false);
      setIsVisible(false);
    } else {
      console.log("Clicked inside");
    }
  };

  useEffect(() => {
    if (notificationOpen || messageOpen || matchOpen || isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notificationOpen, messageOpen, matchOpen, isVisible]);

  const userName = user?.fullName?.split(" ")[0];

  const toggleMenu = () => {
    setIsVisible(!isVisible);
    setNotificationOpen(false);
    setMessageOpen(false);
    setMatchOpen(false);
  };

  const router = useRouter();
  return (
    <div ref={dropdownRef}>
      <header className="fixed-header ">
        <div className="header-menu relative">
          <div className="navbar">
            <Link href="/">
              <Image
                width={1000}
                height={100}
                className="w-auto h-auto"
                src="/media/logo.png"
                alt="Mymakan"
              />
            </Link>
            <div className="nav-item nav-top-menu">
              <nav id="dropdown" className="template-main-menu">
                <ul className="menu-content">
                  <li className="header-nav-item">
                    <Link href="/user/agent" className="menu-link active">
                      Agents
                    </Link>
                  </li>
                  <li className="header-nav-item">
                    <Link href="/user/company" className="menu-link active">
                      Company
                    </Link>
                  </li>

                  <li className="header-nav-item">
                    <a href="#" className="menu-link">
                      Properties
                    </a>
                  </li>
                  <li className="header-nav-item">
                    <a href="#" className="menu-link">
                      Buyer Posts
                    </a>
                  </li>
                  <li className="header-nav-item">
                    <a href="#" className="menu-link have-sub">
                      By location
                    </a>
                    <ul className="sub-menu">
                      <li>
                        <a href="about-us.html">Dubai</a>
                      </li>
                      <li>
                        <a href="user-blog.html">Ajman</a>
                      </li>
                      <li>
                        <a href="shop.html">Ras-alkhaima</a>
                      </li>
                      <li>
                        <a href="single-blog.html">Sharjah</a>
                      </li>
                      <li>
                        <a href="single-shop.html">Al-ain</a>
                      </li>
                      <li>
                        <a href="contact.html">Ummul-Quin</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="relative nav-item header-control items-center">
              {/* search  */}
              <div className="inline-item d-none d-md-block">
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search here......."
                  />
                  <div className="input-group-append">
                    <button className="submit-btn" type="button">
                      <i className="icofont-search" />
                    </button>
                  </div>
                </div>
              </div>
              <div className=" inline-item d-flex align-items-center focus:outline-none">
                {/* button  */}
                <div className="dropdown dropdown-friend border-none">
                  <button
                    onClick={() => {
                      setMatchOpen(!matchOpen);
                      setMessageOpen(false);
                      setNotificationOpen(false);
                      setIsVisible(false);
                    }}
                    className="dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="icofont-users-alt-2" />
                  </button>
                </div>
                <div className="dropdown dropdown-message">
                  <button
                    onClick={() => {
                      setMessageOpen(!messageOpen);
                      setMatchOpen(false);
                      setNotificationOpen(false);
                      setIsVisible(false);
                    }}
                    className="dropdown-toggle"
                    type="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <Icofont icon="speech-comments" />
                  </button>
                </div>
                <div className="dropdown dropdown-notification">
                  <button
                    className="dropdown-toggle"
                    type="button"
                    onClick={() => {
                      setNotificationOpen(!notificationOpen);
                      setMatchOpen(false);
                      setMessageOpen(false);
                      setIsVisible(false);
                    }}
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i className="icofont-notification" />
                    <span className="notify-count">3</span>
                  </button>
                </div>
              </div>

              {/* avatar  */}
              <div className="inline-item ">
                <div className="dropdown dropdown-admin">
                  <button
                    className="dropdown-toggle "
                    type="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="media flex justify-between items-center">
                      <span
                        onClick={toggleMenu}
                        className="item-img !mr-0 relative"
                      >
                        {isAuthenticated === true ? (
                          <Link href="">
                            {user?.image === null ? (
                              <Image
                                width={1000}
                                height={100}
                                className="w-[45px] h-[45px] "
                                src="https://i.ibb.co/7298VDJ/user.png"
                                alt="Chat"
                              />
                            ) : (
                              <Image
                                width={1000}
                                height={100}
                                className="w-[45px] h-[45px]"
                                src={user?.image}
                                alt="Chat"
                              />
                            )}
                          </Link>
                        ) : (
                          <>
                            <Image
                              onClick={toggleMenu}
                              width={1000}
                              height={100}
                              className="w-[45px] h-[45px]  focus:outline-none "
                              src="https://i.ibb.co/7298VDJ/user.png"
                              alt="Chat"
                            />
                          </>
                        )}
                        <span className="acc-verified focus:outline-none">
                          <i className="icofont-check" />
                        </span>
                      </span>
                      <span onClick={toggleMenu} className="ml-4">
                        <span className="text-white text-[14px]">
                          {userName}
                        </span>
                      </span>
                    </span>
                  </button>
                </div>
              </div>

              {/* notify dropdown  */}
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
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
