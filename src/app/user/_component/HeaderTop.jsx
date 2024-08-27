"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import Image from "next/image";
import Link from "next/link";
import { FaComments, FaMinus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import axios from "axios";
import toast from "react-hot-toast";
import io from "socket.io-client";
import { formatDistanceToNow, format, formatDate } from "date-fns"; // Ensure you have these imports
import { IoClose } from "react-icons/io5";
import { Howl } from "howler";

const socket = io("https://api.mymakan.ae", {
  path: "/socket.io", // Ensure this matches the path set in rewrites
  transports: ["websocket"], // Use WebSocket transport
});

const Icofont = dynamic(() => import("react-icofont"), { ssr: false });
const HTopNotification = dynamic(() => import("./HTopNotification"), {
  ssr: false,
});

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

  // notification
  const observer = useRef();
  const [allNotification, setAllNotification] = useState([]);
  const [allNotificationLength, setAllNotificationLength] = useState([]);
  const [loadingNotify, setLoadingNotify] = useState(true);
  const [sortByNotify, setSortByNotify] = useState("createdAt");
  const [sortOrderNotify, setSortOrderNotify] = useState("desc");
  const [limitNotify, setLimitNotify] = useState(3);
  const [pageNotify, setPageNotify] = useState(1);
  const [hasMoreNotify, setHasMoreNotify] = useState(true);
  const [isFetchingNotify, setIsFetchingNotify] = useState(false);
  const [unseenCount, setUnseenCount] = useState(
    () => parseInt(localStorage.getItem("unseenCount")) || 0
  );

  const getAllNotification = async (token) => {
    setIsFetchingNotify(true);
    try {
      let url = `https://api.mymakan.ae/notification/my-all-com-notification?`;

      url += `sortBy=${sortByNotify}&`;
      url += `sortOrder=${sortOrderNotify}&`;
      url += `page=${pageNotify}&`;
      url += `limit=${limitNotify}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const allNotify = await response.json();
      setHasMoreNotify(allNotify.length === limitNotify);
      setAllNotification((prevPosts) =>
        pageNotify === 1 ? allNotify : [...prevPosts, ...allNotify]
      );
      setLoadingNotify(false);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setIsFetchingNotify(false);
    }
  };

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem(`${userRole}AccessToken`);
    getAllNotification(token);
  }, [sortOrderNotify, sortByNotify, limitNotify, pageNotify]);

  const lastPostElementRefNotify = useCallback(
    (node) => {
      if (isFetchingNotify) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreNotify) {
          setPageNotify((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingNotify, hasMoreNotify]
  );

  const updateMultipleNotifications = async (ids) => {
    try {
      const userRole = localStorage.getItem("role");
      const token = localStorage.getItem(`${userRole}AccessToken`);
      const response = await axios.patch(
        `https://api.mymakan.ae/notification/multiple-update`,
        { ids },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating notifications:", error);
      throw error;
    }
  };

  const handleNotificationMarkAsRead = async () => {
    const notificationIds = allNotification.map(
      (notification) => notification._id
    );

    try {
      // Perform the API call to update the notifications
      await updateMultipleNotifications(notificationIds);

      // Optimistically update the state assuming the update was successful
      setAllNotification((prevNotifications) =>
        prevNotifications.map((notification) =>
          notificationIds.includes(notification._id)
            ? { ...notification, read: true } // Assume `read` is the property to mark as read
            : notification
        )
      );
    } catch (error) {
      console.error("Failed to update notifications:", error);
    }
  };

  const handleSingleNotificationMarkAsRead = async (notificationId) => {
    try {
      // Perform the API call to update the notification
      await updateMultipleNotifications([notificationId]);

      // Optimistically update the state assuming the update was successful
      setAllNotification((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === notificationId
            ? { ...notification, read: true } // Assume `read` is the property to mark as read
            : notification
        )
      );
    } catch (error) {
      console.error("Failed to update notifications:", error);
    }
  };
  const playNotificationSound = () => {
    const notificationSound = new Audio("/audio/incomingNotify.mp3");
    notificationSound.volume = 1.0;

    notificationSound.addEventListener("canplaythrough", () => {
      notificationSound.play();
    });
  };

  useEffect(() => {
    const handleNewNotifyCreate = (newnotify) => {
      const {
        _id,
        createdAt,
        mention,
        notifyingType,
        notifyingUserId,
        notifyingAgentId,
        nitifyerUserId,
        nitifyerAgentId,
        mentionAgentId,
        mentionUserId,
        notifyFor,
        notifyerType,
      } = newnotify;

      const commonUser =
        notifyerType === "agent" ? nitifyerAgentId : nitifyerUserId;

      const mentionMe =
        user?.role === "agent"
          ? mentionAgentId.some((item) => item._id === user?._id)
          : mentionUserId.some((item) => item._id === user?._id);

      const notifyText = (() => {
        if (mention === true && mentionMe === true) {
          if (notifyFor === "comment") {
            return `${commonUser?.fullName} mentioned you in a post`;
          }
          if (notifyFor === "reply") {
            return `${commonUser?.fullName} mentioned you in a comment`;
          }
          return `${commonUser?.fullName} mentioned you`;
        }

        switch (notifyFor) {
          case "comment":
            return `${commonUser?.fullName} commented on your post`;
          case "reply":
            return `${commonUser?.fullName} replied to your comment`;
          case "like":
            return `${commonUser?.fullName} liked your post`;
          case "follow":
            return `${commonUser?.fullName} started following you`;
          case "unfollow":
            return `${commonUser?.fullName} unfollowed you`;
          case "followBack":
            return `${commonUser?.fullName} follow Back you`;
          default:
            return "";
        }
      })();

      // You can include image URL in the notification data if available
      const userImage = commonUser?.image; // Replace with default image URL if necessary
      const userName = commonUser?.fullName; // Replace with default image URL if necessary

      if (
        (user?.role === "agent" &&
          user?._id === newnotify?.notifyingAgentId?._id &&
          user?._id !== newnotify?.nitifyerAgentId?._id) ||
        newnotify.mentionAgentId.some((item) => item._id === user?._id) ||
        (user?.role === "buyer" &&
          user?._id === newnotify?.notifyingUserId?._id &&
          user?._id !== newnotify?.nitifyerUserId?._id) ||
        newnotify.mentionUserId.some((item) => item._id === user?._id)
      ) {
        setAllNotification((prevNotifys) => [newnotify, ...prevNotifys]);
        playNotificationSound();
        const tostId = toast(
          <div className="relative">
            <div className="flex items-center ">
              <img
                src={userImage}
                alt="User"
                className="w-[32px] h-[32px] rounded-full mr-2"
              />
              <div>
                <p className="text-[15px] font-semibold leading-[18px] -mb-0">
                  {userName}
                </p>
                <p className="text-[14px] font-medium leading-[18px] -mb-0">
                  {notifyText}
                </p>
              </div>
            </div>
            <button
              onClick={() => toast.dismiss(tostId)} // Close the toast
              className="ml-2 p-1 text-gray-500 hover:text-gray-700 absolute -top-[12px] -right-[15px]"
            >
              <IoClose className="w-5 h-5" />
            </button>
          </div>,
          {
            autoClose: 3000, // Adjust as needed
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        setUnseenCount((prevCount) => {
          const newCount = prevCount + 1;
          localStorage.setItem("unseenCount", newCount);
          return newCount;
        });
      }
    };

    socket.on("newNotifyCreate", handleNewNotifyCreate);

    return () => {
      socket.off("newNotifyCreate", handleNewNotifyCreate);
    };
  }, [user]);

  useEffect(() => {
    if (notificationOpen === true) {
      setUnseenCount(0);
      localStorage.setItem("unseenCount", 0);
    }
  }, [notificationOpen]);

  // match Propertice

  // massage

  return (
    <header ref={dropdownRef} className="fixed-header !z-40 ">
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

                    // Clear the unseen notification count
                    setUnseenCount(0);
                    localStorage.setItem("unseenCount", 0);
                  }}
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="icofont-notification" />
                  {unseenCount === 0 ? null : (
                    <span className="notify-count">{unseenCount}</span>
                  )}
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
              allNotification={allNotification}
              lastPostElementRefNotify={lastPostElementRefNotify}
              loadingNotify={loadingNotify}
              hasMoreNotify={hasMoreNotify}
              isFetchingNotify={isFetchingNotify}
              handleNotificationMarkAsRead={handleNotificationMarkAsRead}
              handleSingleNotificationMarkAsRead={
                handleSingleNotificationMarkAsRead
              }
              user={user}
            />
          </div>
        </div>
      </div>
    </header>
  );
};
