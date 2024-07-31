"use client";

import React, { useEffect, useRef, useState } from "react";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import Image from "next/image";
import Link from "next/link";
import { FaComments, FaMinus } from "react-icons/fa";
import Icofont from "react-icofont";
import { useRouter } from "next/navigation";
import HTopNotification from "./HTopNotification";

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
    <header ref={dropdownRef} className="fixed-header !z-40">
      <div className="header-menu relative">
        <div className="navbar !h-[100px] flex flex-col md:flex-row gap-y-1">
          <Link href="/user/newsfeed" className="">
            <Image
              width={1000}
              height={100}
              className="w-full h-[30px]"
              src="/media/logo.png"
              alt="Mymakan"
            />
          </Link>
          <div className="nav-item nav-top-menu ">
            <nav id="dropdown" className="template-main-menu">
              <ul className="!w-auto">
                <li className="header-nav-item">
                  <Link
                    href="/user/agent"
                    className="menu-link have-sub active"
                  >
                    Agents
                  </Link>
                  <ul className="sub-menu">
                    <li className="header-nav-item">
                      <Link href="/user/agent" className="menu-link active">
                        Agents
                      </Link>
                    </li>

                    <li className="header-nav-item">
                      <Link
                        href="/user/agent-posts"
                        className="menu-link active"
                      >
                        Agent Posts
                      </Link>
                    </li>

                    <li className="header-nav-item">
                      <Link
                        href="/user/buyer-posts"
                        className="menu-link active"
                      >
                        Buyer Posts
                      </Link>
                    </li>
                  </ul>
                </li>
                {/* <li className="header-nav-item">
                  <Link href="/user/agent" className="menu-link active">
                    Agents
                  </Link>
                  <ul className="dropdown-menu">
                    <li>
                      <Link href="/user/agent-posts">Agent Posts</Link>
                    </li>
                  </ul>
                </li> */}
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
                {/* {user?.role === "agent" ? (
                  <li className="header-nav-item">
                    <Link href="/user/agent-posts" className="menu-link active">
                      Agent Posts
                    </Link>
                  </li>
                ) : (
                  <li className="header-nav-item">
                    <Link href="/user/buyer-posts" className="menu-link active">
                      Buyer Posts
                    </Link>
                  </li>
                )} */}
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
            <div className="inline-item !mr-0">
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
                              className="w-[45px] h-[45px] object-cover"
                              src="https://i.ibb.co/7298VDJ/user.png"
                              alt="Chat"
                            />
                          ) : (
                            <Image
                              width={1000}
                              height={100}
                              className="w-[45px] h-[45px] object-cover"
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
                            className="w-[45px] h-[45px] object-cover focus:outline-none "
                            src="https://i.ibb.co/7298VDJ/user.png"
                            alt="Chat"
                          />
                        </>
                      )}
                      <span className="acc-verified focus:outline-none">
                        <i className="icofont-check" />
                      </span>
                    </span>
                    <span onClick={toggleMenu} className="ml-4 hidden md:block">
                      <span className="text-white text-[14px]">{userName}</span>
                    </span>
                  </span>
                </button>
              </div>
            </div>

            {/* notify dropdown  */}
            <HTopNotification
              isVisible={isVisible}
              matchOpen={matchOpen}
              logOut={logOut}
              notificationOpen={notificationOpen}
              messageOpen={messageOpen}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
