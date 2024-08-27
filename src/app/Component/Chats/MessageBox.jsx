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
} from "../../../firebase";
import Link from "next/link";
import { CheckIcon } from "lucide-react";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { AiOutlineCheck } from "react-icons/ai";
import { LuCheckCheck } from "react-icons/lu";
const MessageBox = ({ chatId, selectedChat, profileSideBar }) => {
  const { user } = PrivateRouteContext();
  const [rows, setRows] = useState(1);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatOpened, setChatOpened] = useState(false);
  const textareaRef = useRef(null);
  const messageContainerRef = useRef(null);
  const userId = user?._id;

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
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
    if (!newMessage.trim()) return;

    try {
      // Reference to the messages collection within the chat
      const messagesRef = collection(db, `chats/${chatId}/messages`);

      // Add the new message to Firestore
      const newMessageRef = await addDoc(messagesRef, {
        senderId: userId,
        content: newMessage,
        createdAt: serverTimestamp(),
        seen: false,
      });

      // Get the timestamp of the new message
      const messageSnapshot = await getDoc(newMessageRef);
      const messageData = messageSnapshot.data();
      const messageTimestamp = messageData?.createdAt?.toMillis();

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
        const chatRef = doc(db, "chats", chatId);
        await updateDoc(chatRef, {
          latestMessage: newMessage,
          latestMessageTimestamp: Timestamp.fromMillis(messageTimestamp),
          ...unseenMessagesUpdate, // Increment unseen messages count for other participants
        });
      } else {
        console.error("Error: Message timestamp is invalid or undefined.");
      }

      // Clear the input field and reset rows
      setNewMessage("");
      setRows(1);

      // Scroll to the bottom and play notification sound
      scrollToBottom();
      playNotificationSound();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleInput = async (event) => {
    const messageContent = event.target.value;
    setNewMessage(messageContent);

    // Handle textarea auto-resizing
    const textareaLineHeight = 24;
    textareaRef.current.rows = 1; // Reset rows to 1 to calculate the actual height
    const currentRows = Math.floor(
      textareaRef.current.scrollHeight / textareaLineHeight
    );

    if (currentRows >= 5) {
      textareaRef.current.rows = 5;
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight; // Scroll to the bottom if the content exceeds the height
    } else {
      textareaRef.current.rows = currentRows;
    }
    setRows(currentRows < 5 ? currentRows : 5);

    // Send message when Enter key is pressed without Shift
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!messageContent.trim()) return;

      try {
        sendMessage();
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  // Function to mark unseen messages as seen when opening the chat
  const markMessagesAsSeen = async (chatId, userId) => {
    if (!chatId || !userId) return; // Ensure chatId and userId are provided

    try {
      // Reference to the messages collection in the chat
      const messagesRef = collection(db, `chats/${chatId}/messages`);

      // Query to get unseen messages
      const q = query(messagesRef, where("seen", "==", false));

      // Get all unseen messages
      const querySnapshot = await getDocs(q);
      const batch = writeBatch(db);

      // Iterate over unseen messages and update their seen status
      querySnapshot.forEach((doc) => {
        if (doc.data().senderId !== userId) {
          batch.update(doc.ref, { seen: true });
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

  const participantImage = selectedChat?.participants
    .filter((p) => p.id !== userId) // Exclude the current user
    .map((p) => p.image)[0];
  const participantName = selectedChat?.participants
    .filter((p) => p.id !== userId) // Exclude the current user
    .map((p) => p.name)[0];

  const [isSent, setisSent] = useState(true);

  return (
    <div className="">
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

            <p className="text-center leading-3 text-[12px] m-0">
              Active 46m ago
            </p>
          </div>
        </button>
        <button>
          <MdVideoCall className="w-6 h-6 text-[#615DFA]" />
        </button>
      </div>
      <div
        ref={messageContainerRef}
        className="overflow-y-auto h-[480px] bg-[#F7FAFD] pb-[30px]"
      >
        {messages.length > 0 ? (
          messages.map((msg) => {
            const formatTimestamp = (timestamp) => {
              if (!timestamp) return "No Date";
              const date = timestamp.toDate(); // Convert Timestamp to Date object
              return date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }); // Format as 'HH:MM'
            };

            const isSent = msg.senderId === userId;

            const formattedTime = msg.createdAt
              ?.toDate()
              .toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true, // Ensure 12-hour format with AM/PM
              })
              .toLowerCase();
            return (
              <div key={msg.id}>
                <div
                  className={`col-start-${isSent ? "6" : "1"} col-end-${
                    isSent ? "13" : "8"
                  } p-3 rounded-lg `}
                >
                  <div
                    className={`flex items-end ${
                      isSent ? "justify-start flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {isSent ? (
                      <Image
                        alt=""
                        src={participantImage}
                        width={500}
                        height={500}
                        className="w-[30px] h-[30px] rounded-full"
                      />
                    ) : (
                      <Image
                        alt=""
                        src={user?.image}
                        width={500}
                        height={500}
                        className="w-[30px] h-[30px] rounded-full"
                      />
                    )}
                    <div
                      className={`relative ${
                        isSent ? "mr-3" : "ml-3"
                      } text-sm ${
                        isSent ? "bg-indigo-100" : "bg-white"
                      } py-2 px-4  rounded-xl min-w-[130px] max-w-[300px]`}
                    >
                      <div>{msg.content}</div>
                      <div className="flex justify-end gap-x-[3px] items-center -mb-3">
                        <p className="text-[10px]">{formattedTime}</p>
                        <div className="">
                          <p
                            className={`${
                              msg.seen === true
                                ? "text-blue-500"
                                : "text-green-500"
                            } "text-[13px]   font-bold"`}
                          >
                            <LuCheckCheck />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No messages yet.</p>
        )}
      </div>
      {/* bottom */}
      <div className="absolute bottom-0 h-auto min-h-[55px] max-h-[150px] bg-white border-t-[0.5px] w-full flex justify-around items-center gap-1 py-2 px-2">
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
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
        </button>
        <textarea
          ref={textareaRef}
          className="w-full max-w-[80%] border-[0.5px] rounded-2xl bg-[#EFF4FB] h-auto resize-none outline-none px-3 py-[12px] leading-5"
          rows={rows}
          onChange={handleInput}
          onKeyDown={handleInput}
          value={newMessage}
          placeholder="Type your message..."
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
    </div>
  );
};

export default MessageBox;
