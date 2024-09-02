import PrivateRouteContext from "@/Context/PrivetRouteContext";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
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
} from "../../../../firebase";

export const NewsFeedChatCard = ({
  chatId,
  setSelectedChatId,
  setSelectedChat,
  selectedChat,
  setActiveChatId,
  activeChatId,
}) => {
  if (chatId === null && selectedChat === null && activeChatId === null) {
    return null;
  }
  console.log(selectedChat);

  const { user, activeUsers } = PrivateRouteContext();
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
  const participantImage = selectedChat?.participantsInfo?.image;
  const participantName = selectedChat?.participantsInfo?.name;
  const participantId = selectedChat?.participantsInfo?.id;

  const isActive = activeUsers.includes(participantId);

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

  return (
    <div>
      <div className="bg-white  rounded-lg max-w-lg w-full">
        <div className="px-3 py-[10px] border-b bg-[#615DFA] text-white rounded-t-lg flex justify-between items-center">
          <div className="flex items-center">
            <Image
              alt=""
              width={1000}
              height={100}
              className="rounded-full w-[30px] h-[30px]"
              src={participantImage}
            />
            <div className="pl-2 flex gap-x-[6px] items-center">
              <p className="text-[14px] text-white font-semibold -mb-0">
                {participantName}
              </p>
              {isActive ? (
                <div className="bg-[#17DD17] h-[6px] w-[6px] mt-[3px] rounded-full"></div>
              ) : (
                <div className="bg-red-500 h-[6px] w-[6px] mt-[3px] rounded-full"></div>
              )}
            </div>
          </div>
          <button
            onClick={() => {
              setActiveChatId(null);
              setSelectedChatId(null);
              setSelectedChat(null);
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
  );
};
