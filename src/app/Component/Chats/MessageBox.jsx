"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { MdVideoCall } from "react-icons/md";
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
} from "../../../firebase";
import Link from "next/link";
import { CheckIcon } from "lucide-react";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
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
import { SingleChat } from "./SingleChat";

dayjs.extend(relativeTime);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(customParseFormat);

const formatDateHeader = (date) => {
  if (dayjs(date).isToday()) return "Today";
  if (dayjs(date).isYesterday()) return "Yesterday";
  return dayjs(date).format("DD, MM, YYYY");
};

const MessageBox = ({ chatId, selectedChat, profileSideBar }) => {
  const { user, activeUsers, lastActiveTime, timeAgo } = PrivateRouteContext();
  const [rows, setRows] = useState(1);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatOpened, setChatOpened] = useState(false);
  const textareaRef = useRef(1);
  const messageContainerRef = useRef(null);
  const userId = user?._id;
  const [rawFile, setRawFile] = useState([]);
  const [file, setFile] = useState([]);
  const [uploadingProssing, setUploadingProssing] = useState([]);

  const participantId = selectedChat?.participantsInfo?.id;
  const participantImage = selectedChat?.participantsInfo?.image;
  const participantName = selectedChat?.participantsInfo?.name;

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

  const sendMessage = async () => {
    if (newMessage.trim() === "" && file.length === 0) return;

    const tempId = Date.now(); // Temporary ID for the message
    const messageData = {
      chatId,
      senderId: userId,
      content: newMessage || "",
      status: "sending", // Set initial status to "sending"
      media: file || null, // Ensure media is defined or set to null
      createdAt: new Date(), // Temporarily set createdAt to current date/time for local state
      tempId,
      seen: null,
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
        if (participant.id !== userId) {
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
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    const fileDetails = files.map((file) => ({
      _id: generateRandomCode(), // Generate a random code for each file and use it as the ID
      type: "image",
      url: URL.createObjectURL(file),
    }));

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
        "http://localhost:4000/file-upload/upload",
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
  const markMessagesAsSeen = async (chatId, userId) => {
    if (!chatId || !userId) return; // Ensure chatId and userId are provided

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
        if (doc.data().senderId !== userId) {
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
          [userId]: 0, // Reset unseen messages count for the current user
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
      markMessagesAsSeen(chatId, userId); // Mark messages as seen when chat is opened
    }

    return () => {
      setChatOpened(false); // Reset chat open state on unmount or chatId change
    };
  }, [chatId, chatOpened, messages]);

  let lastDate = "";

  const isActive = activeUsers.includes(participantId);

  return (
    <div className="" ref={filePreviewRef}>
      <div className="sticky top-0 h-[65px] bg-white border-b flex items-center justify-between px-3">
        {/* click this button then open profile details section  */}
        <button
          type="button"
          onClick={profileSideBar}
          className="flex justify-start items-center gap-2 hover:bg-[#f5f8fd] rounded"
        >
          <Image
            src={participantImage}
            alt=""
            width={500}
            height={500}
            className="w-[50px] h-[50px] object-cover rounded-full object-top"
          />

          <div className="flex flex-col items-start">
            <h3 className="text-[16px] font-bold leading-4">
              {" "}
              {participantName}
            </h3>
            {isActive ? (
              <p className="text-center leading-3 text-[12px] m-0">Active</p>
            ) : (
              <p className="text-center leading-3 text-[12px] m-0">
                Last Active {timeAgo(lastActiveTime[participantId])}
              </p>
            )}
          </div>
        </button>
        <button>
          <MdVideoCall className="w-6 h-6 text-[#615DFA]" />
        </button>
      </div>
      <div
        ref={messageContainerRef}
        className="overflow-y-auto h-[480px] bg-[#F7FAFD] pb-[100px]"
      >
        {messages.length > 0 ? (
          messages.map((msg, index) => {
            const isSent = msg.senderId === userId;
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
            );
          })
        ) : (
          <p className="text-center text-gray-500">No messages yet.</p>
        )}
      </div>
      {/* bottom */}
      <div className="absolute bottom-0 h-auto min-h-[55px] max-h-[150px] bg-white border-t-[0.5px] w-full flex justify-around items-center gap-1 py-2 px-2">
        <div className="relative">
          <button>
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
                d="M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
              />
            </svg>
          </button>
          {filePreview === true ? (
            <div className="absolute bottom-[1px] bg-[#F7F7F7] shadow-md w-[400px] h-[300px] rounded-[10px]">
              {selectedImage.type === "image" ? (
                <div className="bg-slate-50 w-full h-[180px] rounded-[10px] relative">
                  <Image
                    src={selectedImage?.url}
                    width={100}
                    height={100}
                    alt=""
                    className="w-full h-[180px] object-cover rounded-t-[10px]"
                  />
                  <CgClose
                    className="bg-red-500 text-white p-[2px] rounded-full absolute top-1 right-1 cursor-pointer"
                    onClick={() => handleFileDelete(selectedImage?._id)}
                  />
                </div>
              ) : (
                <div className="bg-slate-50 w-full h-[180px] rounded-[10px] relative">
                  <video
                    src={selectedImage?.url}
                    width="50"
                    onClick={() => handleVideoClick(_id)}
                    className="w-full h-[180px] object-cover rounded-t-[10px]"
                  />
                  <CgClose
                    className="bg-red-500 text-white p-[2px] rounded-full absolute top-1 right-1 cursor-pointer"
                    onClick={() => handleFileDelete(selectedImage?._id)}
                  />
                </div>
              )}
              <div>
                <textarea
                  className="w-full max-w-[100%] border-[0.5px]  bg-[#EFF4FB] h-auto resize-none outline-none px-3 py-[5px] leading-5"
                  value={newMessage}
                  placeholder="Type your message..."
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <div className="flex justify-between items-center px-[10px] mt-[5px]">
                <div>
                  <p
                    className="cursor-pointer text-[30px] text-blue-500 pt-[7px]"
                    onClick={() =>
                      document.getElementById("image-input").click()
                    }
                  >
                    <FaPlusSquare />
                  </p>
                </div>
                <div className="flex gap-x-[5px] w-[175px] overflow-auto  ">
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
                            className="object-cover cursor-pointer rounded-sm blur-[1px]"
                          />
                        )}
                        {f?.type === "video" && (
                          <video
                            width="50"
                            onClick={() => handelselectedImage(f)}
                            src={f.url}
                            alt=""
                            className="object-cover h-[50px] cursor-pointer rounded-sm blur-[1px]"
                          />
                        )}
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
        <textarea
          className="w-full max-w-[80%] border-[0.5px] rounded-2xl bg-[#EFF4FB] h-auto resize-none outline-none px-3 py-[12px] leading-5"
          value={newMessage}
          placeholder="Type your message..."
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        {/* Conditionally render Send or Like button */}
        {newMessage.trim().length > 0 ? (
          <button type="button" onClick={sendMessage}>
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
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        ) : (
          <button type="button">
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
                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
              />
            </svg>
          </button>
        )}
      </div>
      <input
        id="image-input"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default MessageBox;
