"use client";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import Image from "next/image";
import React, { useState, useRef, useEffect, useContext } from "react";
import { MdAddAPhoto, MdVideoCall } from "react-icons/md";
import {
  db,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
  increment,
  writeBatch,
  where,
  getDocs,
  getDoc,
  Timestamp,
  storage,
  arrayUnion,
  arrayRemove,
} from "../../../../firebase";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

import Link from "next/link";
import { CheckIcon } from "lucide-react";
import { AiOutlineCheck } from "react-icons/ai";
import { LuCheckCheck } from "react-icons/lu";

// Extend dayjs with the plugins
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { FaPlusCircle, FaPlusSquare } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { CgClose } from "react-icons/cg";
import axios from "axios";
import { useClickOutside } from "react-haiku";
import clsx from "clsx";
import { SingleChat } from "@/app/Component/Chats/SingleChat";
import { SingleChatForFreeAgent } from "@/app/Component/Chats/SingleChatForFreeAgent";
import { PremiumValueContext } from "@/Context/premiumContext";

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(customParseFormat);

const formatDateHeader = (date) => {
  if (dayjs(date).isToday()) return "Today";
  if (dayjs(date).isYesterday()) return "Yesterday";
  return dayjs(date).format("DD, MM, YYYY");
};

export const NewsFeedChatCard = ({
  chatId,
  setSelectedChatId,
  setSelectedChat,
  selectedChat,
  setActiveChatId,
  activeChatId,
  handleOpenInChats,
}) => {
  const sendWithMediaRef = useRef(null);
  const { user, activeUsers, lastActiveTime, timeAgo } = PrivateRouteContext();
  const [rows, setRows] = useState(1);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatOpened, setChatOpened] = useState(false);
  const textareaRef = useRef(1);
  const messageContainerRef = useRef(null);
  const [rawFile, setRawFile] = useState([]);
  const [file, setFile] = useState([]);
  const [uploadingProssing, setUploadingProssing] = useState([]);
  const [userRole, setUserFeedRole] = useState("");
  const [userID, setUserID] = useState("");
  useEffect(() => {
    const role = localStorage.getItem("role");
    const id = localStorage.getItem(`${role}Id`);
    setUserFeedRole(role);
    setUserID(id);
  }, []);

  const participantId = selectedChat?.participants
    .filter((p) => p.id !== userID) // Exclude the current user
    .map((p) => p.id)[0];
  const participantImage = selectedChat?.participants
    .filter((p) => p.id !== userID) // Exclude the current user
    .map((p) => p.image)[0];
  const participantName = selectedChat?.participants
    .filter((p) => p.id !== userID) // Exclude the current user
    .map((p) => p.name)[0];
  const participantRole = selectedChat?.participants
    .filter((p) => p.id !== userID) // Exclude the current user
    .map((p) => p.role)[0];

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom(); // Scroll to bottom when messages change
  }, [messages]);
  const playNotificationSound = () => {
    const notificationSound = new Audio("/audio/massagesendnotify.mp3");
    notificationSound.volume = 1.0;
    notificationSound.addEventListener("canplaythrough", () => {
      notificationSound.play();
    });
  };
  const playNotificationSoundMassageCome = () => {
    const notificationSound = new Audio("/audio/massageNotify.mp3");
    notificationSound.volume = 1.0;
    notificationSound.addEventListener("canplaythrough", () => {
      notificationSound.play();
    });
  };
  const { premiumPopup, setPremiumPopup } = useContext(PremiumValueContext);

  const sendMessage = async () => {
    if (
      userRole === "agent" &&
      user?.premium === false &&
      participantRole === "buyer"
    ) {
      return setPremiumPopup(true);
    }
    if (newMessage.trim() === "" && file.length === 0) return;

    const tempId = Date.now(); // Temporary ID for the message
    const messageData = {
      chatId,
      senderId: userID,
      content: newMessage || "",
      status: "sending", // Set initial status to "sending"
      media: file || null, // Ensure media is defined or set to null
      createdAt: new Date(), // Temporarily set createdAt to current date/time for local state
      tempId,
      seen: null,
      reactions: [],
      deletedFor: [],
    };
    playNotificationSound();
    scrollToBottom();
    // Update the local messages state with "sending" status
    setMessages((prevMessages) => [...prevMessages, messageData]);
    // Clear the input field
    setNewMessage("");
    setFilePreview(false);

    try {
      let uploadedMedia = [];

      if (file.length > 0) {
        uploadedMedia = await handleUpload(rawFile, file);
      }

      // Add the message to Firestore with uploaded media URLs
      const messagesRef = collection(db, `chats/${chatId}/messages`);
      const docRef = await addDoc(messagesRef, {
        ...messageData,
        media: uploadedMedia.length > 0 ? uploadedMedia : null,
        createdAt: serverTimestamp(), // Overwrite createdAt with Firestore's server timestamp
        status: "sent", // Set status to "sent" after successful send
        seen: null,
      });
      // Update the message status to "sent" in the local state
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.tempId === tempId
            ? { ...msg, status: "sent", id: docRef.id }
            : msg
        )
      );

      // Clear files and media state
      setFile([]);
      setRawFile([]);

      // Get the timestamp of the new message
      const messageSnapshot = await getDoc(docRef);
      const messageDataFromFirestore = messageSnapshot.data();
      const messageTimestamp = messageDataFromFirestore?.createdAt?.toMillis();

      // Reference to the chat document
      const chatDocRef = doc(db, `chats/${chatId}`);
      const chatDocSnapshot = await getDoc(chatDocRef);

      if (!chatDocSnapshot.exists()) {
        throw new Error("Chat document not found.");
      }

      // Get chat data and participants
      const chatData = chatDocSnapshot.data();
      const participants = chatData.participants || [];

      // Prepare the unseen messages update object
      const unseenMessagesUpdate = {};
      participants.forEach((participant) => {
        if (participant.id !== userID) {
          unseenMessagesUpdate[`unseenMessages.${participant.id}`] =
            increment(1);
        }
      });

      if (typeof messageTimestamp === "number") {
        // Update the chat document with the latest message info
        await updateDoc(chatDocRef, {
          latestMessage: newMessage === "" ? "image" : newMessage,
          latestMessageTimestamp: Timestamp.fromMillis(messageTimestamp),
          ...unseenMessagesUpdate, // Increment unseen messages count for other participants
        });
      } else {
        console.error("Error: Message timestamp is invalid or undefined.");
      }
    } catch (error) {
      console.error("Error sending message: ", error);
      // Optionally update the message status to "failed" in the local state
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.tempId === tempId ? { ...msg, status: "failed" } : msg
        )
      );
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Function to upload an image
  const generateRandomCode = () => {
    const randomNum = Math.floor(Math.random() * 10000);
    const code = String(randomNum).padStart(4, "0");
    return code;
  };
  const [filePreview, setFilePreview] = useState(false);
  useClickOutside(sendWithMediaRef, () => {
    setFilePreview(false);
    setFile([]);
    setRawFile([]);
  });
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    const fileDetails = files.map((file) => {
      console.log(String(file.type || "").split("/")?.[0] || file?.type, file);
      return {
        _id: generateRandomCode(), // Generate a random code for each file and use it as the ID
        type: String(file.type || "").split("/")?.[0] || file?.type,
        url: URL.createObjectURL(file),
      };
    });

    setFile((prevFiles) => [...prevFiles, ...fileDetails]);
    setRawFile((prevFiles) => [...prevFiles, ...files]);
    setFilePreview(true);
  };
  const handleUpload = async (files, fileDetails) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file); // Append each file to FormData
    });

    try {
      const response = await axios.post(
        "https://api.mymakan.ae/file-upload/upload",
        formData,
        {
          onUploadProgress: (data) => {
            const progress = Math.round((data.loaded / data.total) * 100);

            const progressUpdates = fileDetails.map((file) => ({
              _id: file._id,
              progress: progress,
            }));

            setUploadingProssing((prevProgress) => {
              const updatedProgress = [...prevProgress];

              progressUpdates.forEach((update) => {
                const index = updatedProgress.findIndex(
                  (item) => item._id === update._id
                );

                if (index !== -1) {
                  updatedProgress[index] = {
                    ...updatedProgress[index],
                    progress: update.progress,
                  };
                } else {
                  updatedProgress.push(update);
                }
              });

              return updatedProgress;
            });
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const links = response.data.map((item, index) => ({
        _id: fileDetails[index]._id,
        type: fileDetails[index].type,
        url: item.Location,
      }));

      return links; // Return the uploaded media links
    } catch (error) {
      console.error("Upload failed:", error);
      return []; // Return an empty array on failure
    } finally {
      // Clear upload progress for files after upload completes
      setUploadingProssing((prevProgress) =>
        prevProgress.filter((item) =>
          fileDetails.some((file) => file._id !== item._id)
        )
      );
    }
  };
  // file disply
  const [selectedImage, setSelectedImage] = useState({});
  useEffect(() => {
    if (file) {
      const defultSelecetdImage = file.length > 0 && file[0];
      setSelectedImage(defultSelecetdImage);
    }
  }, [file]);

  function handelselectedImage(value) {
    setSelectedImage(value);
  }

  const handleFileDelete = (fileId) => {
    // Filter out the file with the specified _id
    setFile((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
    setRawFile((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
  };
  const videoRefs = useRef([]);
  const handleVideoClick = (index) => {
    if (videoRefs.current[index]) {
      if (videoRefs.current[index].paused) {
        videoRefs.current[index].play();
      } else {
        videoRefs.current[index].pause();
      }
    }
  };

  const filePreviewRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filePreviewRef.current &&
        !filePreviewRef.current.contains(event.target)
      ) {
        setFilePreview(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filePreviewRef]);

  // massage seen and get
  // Function to mark unseen messages as seen when opening the chat
  const markMessagesAsSeen = async (chatId, userID) => {
    if (!chatId || !userID) return; // Ensure chatId and userID are provided

    try {
      // Reference to the messages collection in the chat
      const messagesRef = collection(db, `chats/${chatId}/messages`);

      // Query to get unseen messages
      const q = query(messagesRef, where("seen", "==", null));

      // Get all unseen messages
      const querySnapshot = await getDocs(q);
      const batch = writeBatch(db);

      // Iterate over unseen messages and update their seen status
      querySnapshot.forEach((doc) => {
        if (doc.data().senderId !== userID) {
          batch.update(doc.ref, { seen: serverTimestamp() });
        }
      });

      // Commit batch updates
      await batch.commit();

      // Update the chat document to reset unseenMessagesCount
      const chatRef = doc(db, "chats", chatId);
      const chatDoc = await getDoc(chatRef);
      if (!chatDoc.exists()) {
        console.error("Chat document not found.");
        return;
      }

      const chatData = chatDoc.data();
      const currentUnseenMessages = chatData?.unseenMessages || {};
      // Update the unseen messages count
      await updateDoc(chatRef, {
        unseenMessages: {
          ...currentUnseenMessages,
          [userID]: 0, // Reset unseen messages count for the current user
        },
      });
    } catch (error) {
      console.error("Error marking messages as seen:", error);
    }
  };
  // Subscribe to real-time updates of messages
  useEffect(() => {
    if (chatId) {
      const messagesRef = collection(db, `chats/${chatId}/messages`);
      const q = query(messagesRef, orderBy("createdAt", "asc"));

      const unsubscribeMessages = onSnapshot(q, (querySnapshot) => {
        const fetchedMessages = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);

        if (!chatOpened) {
          // Play notification sound for new messages if the chat is not currently open
          playNotificationSoundMassageCome();
        }

        // Mark messages as seen only if the chat is currently open
        if (chatOpened) {
          markMessagesAsSeen();
        }
      });

      return () => {
        unsubscribeMessages();
      };
    }
  }, [chatId, chatOpened]);

  // Handle marking messages as seen when chat is opened

  useEffect(() => {
    if (chatId) {
      setChatOpened(true); // Mark chat as opened
      markMessagesAsSeen(chatId, userID); // Mark messages as seen when chat is opened
    }

    return () => {
      setChatOpened(false); // Reset chat open state on unmount or chatId change
    };
  }, [chatId, chatOpened, messages]);

  let lastDate = "";

  const isActive = activeUsers.includes(participantId);
  const lastActive = lastActiveTime[participantId]
    ? timeAgo(lastActiveTime[participantId])
    : "No recent activity";

  const [profile, setProfile] = useState();
  const [isFollow, setIsFollow] = useState(false);
  const [isFollowEr, setIsFollowEr] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const fetchUserProfile = async (participantId, participantRole) => {
    if (!participantId) return;
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem(`${userRole}AccessToken`);
    const endpoint =
      participantRole === "buyer"
        ? `https://api.mymakan.ae/user/${participantId}`
        : `https://api.mymakan.ae/agent/${participantId}`;
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      } else {
        const profile = await response.json();
        setProfile(profile);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile(participantId, participantRole);
  }, [participantId, participantRole]);
  useEffect(() => {
    setIsFollow(profile?.following);
    setIsFollowEr(profile?.follower);
    setIsFriend(profile?.friend);
  }, [profile]);
  if (chatId === null && selectedChat === null && activeChatId === null) {
    return null;
  }
  return (
    <div>
      <div className="bg-white  rounded-lg max-w-lg w-full">
        <div className="px-3 py-[10px] border-b bg-[#615DFA] text-white rounded-t-lg flex justify-between items-center">
          <Menu as="div" className="relative inline-block text-left">
            <div className="flex items-center">
              <MenuButton className="">
                {" "}
                <Image
                  alt=""
                  width={1000}
                  height={100}
                  className="rounded-full w-[30px] h-[30px]"
                  src={participantImage}
                />
              </MenuButton>

              <div className="pl-2 flex gap-x-[6px] items-center">
                {participantRole === "buyer" ? (
                  <>
                    {isFriend ? (
                      <p className="text-[14px] text-white font-semibold -mb-0">
                        {participantName}
                      </p>
                    ) : isFollow ? (
                      <p className="text-[14px] text-white font-semibold -mb-0">
                        {participantName}
                      </p>
                    ) : isFollowEr ? (
                      <p className="text-[14px] text-white font-semibold -mb-0">
                        {participantName}
                      </p>
                    ) : (
                      <p className="text-[14px] text-white font-semibold -mb-0">
                        Hidden Name
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <p className="text-[14px] text-white font-semibold -mb-0">
                      {participantName}
                    </p>
                  </>
                )}

                {isActive ? (
                  <div className="bg-[#17DD17] h-[6px] w-[6px] mt-[2px] rounded-full"></div>
                ) : (
                  <div className="bg-red-500 h-[6px] w-[6px] mt-[2px] rounded-full"></div>
                )}
              </div>
            </div>
            <MenuItems
              transition
              className="absolute right-0 z-10 mt-2 w-[150px]  origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="pt-2">
                <MenuItem>
                  <Link
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    href={
                      participantRole === "buyer"
                        ? `/user/buyer-profile/${participantId}`
                        : `/user/agent-profile/${participantId}`
                    }
                  >
                    View Profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <p
                    onClick={() => handleOpenInChats(chatId, selectedChat)}
                    className="block cursor-pointer px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                  >
                    Open in chats
                  </p>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
          <button
            onClick={() => {
              setActiveChatId(null);
              setSelectedChatId(null);
              setSelectedChat(null);
              setChatOpened(false);
            }}
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
        <div ref={messageContainerRef} className="p-[2px] h-80 overflow-y-auto">
          {/* Chat messages will be displayed here */}
          {messages.length > 0 ? (
            messages.map((msg, index) => {
              const isSent = msg.senderId === userID;
              // Ensure msg.createdAt is not null or undefined and is a Firestore Timestamp
              const createdAt = msg.createdAt
                ? msg.createdAt.toDate
                  ? msg.createdAt.toDate()
                  : msg.createdAt
                : new Date();

              const parsedDate = dayjs(createdAt);
              const msgDate = parsedDate.format("YYYY-MM-DD");
              const formattedDate = formatDateHeader(parsedDate);
              const formattedTime = parsedDate.format("h:mm A");

              // Only show the date header if the date of the current message is different from the last message's date
              const showDateHeader = lastDate !== msgDate;
              lastDate = msgDate;

              return (
                <div key={index}>
                  {userRole === "buyer" ? (
                    <SingleChat
                      key={index}
                      msg={msg}
                      isSent={isSent}
                      formattedDate={formattedDate}
                      formattedTime={formattedTime}
                      showDateHeader={showDateHeader}
                      user={user}
                      status={msg.status}
                      uploadingProssing={uploadingProssing}
                      participantImage={participantImage}
                    />
                  ) : (
                    <>
                      {user?.premium === false &&
                      participantRole === "buyer" ? (
                        <SingleChatForFreeAgent
                          key={index}
                          msg={msg}
                          isSent={isSent}
                          formattedDate={formattedDate}
                          formattedTime={formattedTime}
                          showDateHeader={showDateHeader}
                          user={user}
                          status={msg.status}
                          uploadingProssing={uploadingProssing}
                          participantImage={participantImage}
                        />
                      ) : (
                        <SingleChat
                          key={index}
                          msg={msg}
                          isSent={isSent}
                          formattedDate={formattedDate}
                          formattedTime={formattedTime}
                          showDateHeader={showDateHeader}
                          user={user}
                          status={msg.status}
                          uploadingProssing={uploadingProssing}
                          participantImage={participantImage}
                        />
                      )}
                    </>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">No messages yet.</p>
          )}
        </div>
        <div className="flex gap-x-3 items-center">
          <div className="ml-2">
            <div className="relative">
              {filePreview === true ? (
                <div
                  ref={sendWithMediaRef}
                  className="absolute bottom-full mb-2 bg-white shadow-lg shadow-gray-700/60 w-[400px] h-auto rounded-md"
                >
                  <div className="p-2">
                    {selectedImage.type === "image" ? (
                      <div className="w-full relative">
                        <Image
                          src={selectedImage?.url}
                          width={100}
                          height={100}
                          alt=""
                          className="w-full  aspect-video object-contain rounded-md"
                        />
                        <CgClose
                          className="bg-red-500 text-white p-[2px] rounded-full absolute top-1 right-1 cursor-pointer"
                          onClick={() => handleFileDelete(selectedImage?._id)}
                        />
                      </div>
                    ) : (
                      <div className=" w-full aspect-video relative">
                        <video
                          src={selectedImage?.url}
                          controls
                          className="w-full aspect-video object-contain bg-black rounded-md"
                        />
                        <CgClose
                          className="bg-red-500 text-white p-[2px] rounded-full absolute top-1 right-1 cursor-pointer"
                          onClick={() => handleFileDelete(selectedImage?._id)}
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <textarea
                      className="w-full max-w-[100%] border-[0.5px]  border-gray-100 max-h-12 resize-none outline-none px-3 py-1 scroll-pb-1.5 leading-5"
                      value={newMessage}
                      rows={2}
                      placeholder="Type your message..."
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                  </div>
                  <div className="flex justify-between items-center gap-2 px-2 pl-4 pb-1">
                    <button
                      className="text-[30px] text-blue-500 aspect-squere"
                      onClick={() =>
                        document.getElementById("image-input").click()
                      }
                    >
                      <MdAddAPhoto className="size-5" />
                    </button>
                    <div className="flex gap-x-1 flex-grow overflow-auto p-2">
                      {file.map((f, i) => {
                        return (
                          <div key={i}>
                            {f?.type === "image" && (
                              <Image
                                onClick={() => handelselectedImage(f)}
                                src={f.url}
                                alt=""
                                width={50}
                                height={50}
                                className={clsx(
                                  "flex-shrink-0 object-cover bg-white cursor-pointer rounded-sm size-10",
                                  selectedImage?._id === f._id
                                    ? "ring-2 ring-offset-1 ring-blue-600"
                                    : ""
                                )}
                              />
                            )}
                            {f?.type === "video" && (
                              <video
                                width="50"
                                onClick={() => handelselectedImage(f)}
                                src={f.url}
                                alt=""
                                className={clsx(
                                  "flex-shrink-0 object-cover size-10 cursor-pointer rounded-sm",
                                  selectedImage?._id === f._id
                                    ? "ring-2 ring-offset-1 ring-blue-600"
                                    : ""
                                )}
                              />
                            )}
                            {console.log(selectedImage, f)}
                          </div>
                        );
                      })}
                    </div>
                    <div
                      onClick={sendMessage}
                      className="pt-[0px] relative bg-blue-500 w-[30px] h-[30px] rounded-sm cursor-pointer"
                    >
                      <p className=" ml-[5px] text-[20px] text-white mt-[5px]">
                        <IoMdSend />
                      </p>

                      <div className="absolute top-[25px] w-[10px] h-[10px] right-0 bg-white flex justify-center rounded-full">
                        <p className=" text-[7px]  leading-[10px] ">
                          {file.length}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            <button
              type="button"
              onClick={() => document.getElementById("image-input").click()}
              className="mt-[10px]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-[#615DFA]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </button>
          </div>
          <div className="py-3 border-t flex">
            <input
              id="user-input"
              type="text"
              value={newMessage}
              placeholder="Type your message..."
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-3 py-[5px] border rounded-l-[20px]  outline-none"
            />
            <button
              id="send-button"
              type="button"
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-[5px] rounded-r-md hover:bg-blue-600 transition duration-300"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      <input
        id="image-input"
        type="file"
        accept="image/*,video/*"
        multiple
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </div>
  );
};
