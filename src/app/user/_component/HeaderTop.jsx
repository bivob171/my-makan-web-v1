"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import NotificationValueContext from "@/Context/notificationContext";
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
import ChatNotificationValueContext from "@/Context/chatNotification";
import { ChatValueContext } from "@/Context/chatContext";
import { HeaderInPutSearch } from "./HeaderInPutSearch";

const socket = io("https://api.mymakan.ae", {
  path: "/socket.io", // Ensure this matches the path set in rewrites
  transports: ["websocket"], // Use WebSocket transport
});

const Icofont = dynamic(() => import("react-icofont"), { ssr: false });
const HTopNotification = dynamic(() => import("./HTopNotification"), {
  ssr: false,
});

export const HeaderTop = () => {
  const {
    isAuthenticated,
    loading,
    user,
    setRender,
    render,
    logOut,
    activeUsers,
  } = PrivateRouteContext();
  const {
    setAllNotificationNumber,
    allNotificationNumber,
    setnotificationRerander,
    notificationRerander,
  } = NotificationValueContext();

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
          case "successVerify":
            return `Congratulations! Your account has been verified by MyMakan.`;
          case "reject":
            return `Sorry, your verification request has been rejected. Please re-upload your verification document.`;
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
              {notifyFor === "successVerify" || notifyFor === "reject" ? (
                <div className="w-[32px] h-[32px] rounded-full mr-2 bg-blue-500">
                  <Image
                    width={27}
                    height={27}
                    src="/favicon.ico"
                    alt="User"
                    className="w-[26px] h-[26px] rounded-full "
                  />
                </div>
              ) : (
                <Image
                  width={50}
                  height={50}
                  src={userImage}
                  alt="User"
                  className="w-[32px] h-[32px] rounded-full mr-2"
                />
              )}

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
        setnotificationRerander(!notificationRerander);
        // If notification panel is open, mark notifications as seen
        if (notificationOpen === true) {
          markNotificationAsSeen();
        }
      }
    };

    socket.on("newNotifyCreate", handleNewNotifyCreate);

    return () => {
      socket.off("newNotifyCreate", handleNewNotifyCreate);
    };
  }, [user, socket]);

  const markNotificationAsSeen = async () => {
    try {
      const userRole = localStorage.getItem("role");
      const token = localStorage.getItem(`${userRole}AccessToken`);

      const endpoint =
        userRole === "agent"
          ? "https://api.mymakan.ae/agent/update-notification"
          : "https://api.mymakan.ae/user/update-notification";
      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        toast.error(` ${response.status}`);
        console.log(response);
      } else {
        const data = await response.json();
        setnotificationRerander(!notificationRerander);
      }
    } catch (error) {
      console.log(` ${error}`);
    }
  };

  // match Propertice

  // massage

  function handleRelatedPosts({ type, value }) {
    console.log(value.company);

    let queryParam = "";
    switch (type) {
      case "location":
        queryParam = `location=` + value.city + `,` + value.country;
        break;
      case "tag":
        queryParam = `tag=${value}`;
        break;
      case "for":
        queryParam = `for=${value}`;
        break;
      case "type":
        queryParam = `type=${value}`;
        break;
      case "company":
        queryParam = `company=${value.company}`;
        break;

        return;
    }

    router.push(`/user/related-posts?${queryParam}`);
  }

  const { chats, handelChatSelectedFromChatNotifyDropdown } =
    useContext(ChatValueContext);

  // Function to play the notification sound
  const playNotificationSoundMassageCome = () => {
    const notificationSound = new Audio("/audio/massageNotify.mp3");
    notificationSound.volume = 1.0;
    notificationSound.addEventListener("canplaythrough", () => {
      notificationSound.play();
    });
  };

  // Calculate total unseen count across all chats
  const totalUnseenCount = chats.reduce((total, chat) => {
    const unseenCount = chat?.unseenMessages[user?._id] || 0;
    return total + unseenCount;
  }, 0);

  // useEffect to handle notification sound when unseen count increases
  useEffect(() => {
    if (totalUnseenCount) {
      playNotificationSoundMassageCome();
    }
  }, [totalUnseenCount]);

  // Rest of your component logic here

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
                      <a
                        onClick={() =>
                          handleRelatedPosts({
                            type: "location",
                            value: {
                              city: "Dubai",
                              country: "United Arab Emirates",
                            },
                          })
                        }
                      >
                        Dubai
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() =>
                          handleRelatedPosts({
                            type: "location",
                            value: {
                              city: "Ajman",
                              country: "United Arab Emirates",
                            },
                          })
                        }
                      >
                        Ajman
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() =>
                          handleRelatedPosts({
                            type: "location",
                            value: {
                              city: "Ras-alkhaima",
                              country: "United Arab Emirates",
                            },
                          })
                        }
                      >
                        Ras-alkhaima
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() =>
                          handleRelatedPosts({
                            type: "location",
                            value: {
                              city: "Sharjah",
                              country: "United Arab Emirates",
                            },
                          })
                        }
                      >
                        Sharjah
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() =>
                          handleRelatedPosts({
                            type: "location",
                            value: {
                              city: "Al-ain",
                              country: "United Arab Emirates",
                            },
                          })
                        }
                      >
                        Al-ain
                      </a>
                    </li>
                    <li>
                      <a
                        onClick={() =>
                          handleRelatedPosts({
                            type: "location",
                            value: {
                              city: "Ummul-Quin",
                              country: "United Arab Emirates",
                            },
                          })
                        }
                      >
                        Ummul-Quin
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
          <div className="relative nav-item header-control items-center">
            {/* search  */}
            <div className="inline-item d-none d-md-block">
              <HeaderInPutSearch />
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
                  {totalUnseenCount === 0 ? null : (
                    <span className="notify-count">{totalUnseenCount}</span>
                  )}
                </button>
              </div>
              <div className="dropdown dropdown-notification">
                <button
                  className="dropdown-toggle"
                  type="button"
                  onClick={() => {
                    setNotificationOpen(!notificationOpen);
                    markNotificationAsSeen();
                    setMatchOpen(false);
                    setMessageOpen(false);
                    setIsVisible(false);

                    // Clear the unseen notification count
                  }}
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="icofont-notification" />
                  {allNotificationNumber === 0 ? null : (
                    <span className="notify-count">
                      {allNotificationNumber}
                    </span>
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
              activeUsers={activeUsers}
              totalUnseenCount={totalUnseenCount}
              chats={chats}
              handelChatSelectedFromChatNotifyDropdown={
                handelChatSelectedFromChatNotifyDropdown
              }
            />
          </div>
        </div>
      </div>
    </header>
  );
};
