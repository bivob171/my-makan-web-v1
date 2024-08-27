"use client";

import { createContext, useEffect, useState } from "react";

export const ChatValueContext = createContext();
import {
  db,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  increment,
  onSnapshot,
  writeBatch,
  query,
  where,
  limit,
  Timestamp,
  orderBy,
  startAfter,
} from "../firebase";
import PrivateRouteContext from "./PrivetRouteContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const ChatValueProvider = ({ children }) => {
  const { user } = PrivateRouteContext();
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [activeChatId, setActiveChatId] = useState(null);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchChatList = (user) => {
    setLoading(true);
    try {
      const chatRef = collection(db, "chats");

      // Real-time listener for chat updates
      const unsubscribe = onSnapshot(chatRef, async (querySnapshot) => {
        const chatList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Filter chats based on the user's id and role
        const filteredChats = chatList.filter((chat) => {
          return chat.participants.some((participant) => {
            return (
              participant.id === user._id && participant.role === user.role
            );
          });
        });

        // Filter chats based on search query
        const searchFilteredChats = filteredChats.filter((chat) => {
          const participantNames = chat.participants
            .filter((p) => p.id !== user._id) // Exclude the current user
            .map((p) => p.name.toLowerCase());
          return participantNames.some((name) =>
            name.includes(searchQuery.toLowerCase())
          );
        });

        // Fetch the latest message for each chat and update `latestMessageTimestamp` only if valid
        for (const chat of searchFilteredChats) {
          const messagesRef = collection(db, `chats/${chat.id}/messages`);
          const messagesSnapshot = await getDocs(messagesRef);

          const messages = messagesSnapshot.docs.map((msgDoc) => msgDoc.data());

          // Find the latest message
          const latestMessage = messages.sort(
            (a, b) => (b.timestamp || 0) - (a.timestamp || 0)
          )[0];

          // Get the latest message timestamp
          const latestMessageTimestamp = latestMessage
            ? latestMessage.timestamp
            : null;

          // Update chat document only if latestMessageTimestamp is a valid number
          if (
            latestMessageTimestamp &&
            chat.latestMessageTimestamp !== latestMessageTimestamp
          ) {
            const chatDocRef = doc(db, "chats", chat.id);
            await updateDoc(chatDocRef, {
              latestMessageTimestamp: Timestamp.fromMillis(
                latestMessageTimestamp
              ),
            });
          }
        }

        // Sort chats by latestMessageTimestamp in descending order
        const sortedChats = searchFilteredChats.sort(
          (a, b) =>
            (b.latestMessageTimestamp
              ? b.latestMessageTimestamp.toMillis()
              : 0) -
            (a.latestMessageTimestamp ? a.latestMessageTimestamp.toMillis() : 0)
        );

        setChats(sortedChats);
      });

      // Cleanup listener on component unmount
      return unsubscribe;
    } catch (error) {
      console.error("Error setting up chat listener:", error);
      setChats([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch chats on component mount
  useEffect(() => {
    if (user) {
      const unsubscribe = fetchChatList(user);
      return () => unsubscribe(); // Clean up the listener
    }
  }, [user, searchQuery]);

  const handleChatSelection = async (chatId, chat) => {
    setSelectedChatId(chatId);
    setActiveChatId(chatId);
    setSelectedChat(chat);

    // Reset the unseen messages count when a chat is selected
    const chatRef = doc(db, "chats", chatId);
    const chatDoc = await getDoc(chatRef);
    if (!chatDoc.exists()) {
      console.error("Chat document not found.");
      return;
    }

    // Get the current unseenMessages
    const chatData = chatDoc.data();
    const currentUnseenMessages = chatData?.unseenMessages || {};
    // Update the unseen messages count
    await updateDoc(chatRef, {
      unseenMessages: {
        ...currentUnseenMessages,
        [user._id]: 0, // Reset unseen messages count for the current user
      },
    });
  };

  // create chat
  const router = useRouter();
  const handleNewChatSelection = async (chatId, chat) => {
    setSelectedChatId(chatId);
    setActiveChatId(chatId);
    setSelectedChat(chat);

    // Reset the unseen messages count when a chat is selected
    const chatRef = doc(db, "chats", chatId);
    const chatDoc = await getDoc(chatRef);
    if (!chatDoc.exists()) {
      console.error("Chat document not found.");
      return;
    }

    // Get the current unseenMessages
    const chatData = chatDoc.data();
    const currentUnseenMessages = chatData?.unseenMessages || {};
    // Update the unseen messages count
    await updateDoc(chatRef, {
      unseenMessages: {
        ...currentUnseenMessages,
        [user._id]: 0, // Reset unseen messages count for the current user
      },
    });
  };

  const checkIdsInParticipants = (data, user, profile) => {
    const myId = user?._id;
    const profiled = profile?._id;
    const matchingConversation = data.find(
      (conversation) =>
        conversation.participants.some(
          (participant) => participant.id === myId
        ) &&
        conversation.participants.some(
          (participant) => participant.id === profiled
        )
    );

    const result = {
      result: Boolean(matchingConversation),
      matchingData: matchingConversation || null,
    };

    if (result.result === false) {
      handleCreateChat(user, profile);
    } else {
      const chatId = result.matchingData.id;
      const chatData = result.matchingData;
      handleNewChatSelection(chatId, chatData);
      router.push("/user/chats");
    }

    return result;
  };

  const fetchChatExist = (user, profile) => {
    const chatRef = collection(db, "chats");

    const unsubscribe = onSnapshot(chatRef, async (querySnapshot) => {
      const chatList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Filter chats based on the user's id and role
      const filteredChats = chatList.filter((chat) => {
        return chat.participants.some((participant) => {
          return (
            participant.id === user?._id && participant.role === user?.role
          );
        });
      });
      checkIdsInParticipants(filteredChats, user, profile);
    });

    return unsubscribe;
  };

  const createNewChat = async (user, profile) => {
    fetchChatExist(user, profile);
  };

  const handleCreateChat = async (user, profile) => {
    if (!user || !profile) return;
    const profileId = profile?._id;
    const myId = user?._id;

    try {
      const chatRef = collection(db, "chats"); // 'chats' is the collection name

      const docRef = await addDoc(chatRef, {
        participants: [
          {
            id: myId,
            name: user?.fullName,
            image: user?.image, // Assuming you have `image` in your `user` object
            role: user?.role, // Assuming you have `role` in your `user` object
          },
          {
            id: profile._id,
            name: profile.fullName,
            image: profile.image, // Assuming `image` is a field in the `profile` object
            role: profile.role, // Assuming `role` is a field in the `profile` object
          },
        ],
        createdAt: new Date(),
        latestMessage: "",
        unseenMessages: {
          [myId]: 0,
          [profileId]: 0,
        },
      });
      // Get the newly created chat's ID
      const chatId = docRef.id;
      const chatData = {
        id: chatId,
        participants: [
          {
            id: myId,
            name: user?.fullName,
            image: user?.image,
            role: user?.role,
          },
          {
            id: profileId,
            name: profile.fullName,
            image: profile.image,
            role: profile.role,
          },
        ],
        createdAt: new Date(),
        latestMessage: "",
        unseenMessages: {
          [myId]: 0,
          [profileId]: 0,
        },
      };
      console.log(chatData);
      console.log(docRef);

      handleNewChatSelection(chatId, chatData);
      router.push("/user/chats");
    } catch (error) {
      toast.error("Failed to create chat.");
    }
  };

  return (
    <ChatValueContext.Provider
      value={{
        handleChatSelection,
        selectedChatId,
        setSelectedChatId,
        activeChatId,
        setActiveChatId,
        chats,
        setChats,
        setLoading,
        loading,
        searchQuery,
        setSearchQuery,
        selectedChat,
        setSelectedChat,
        createNewChat,
      }}
    >
      {children}
    </ChatValueContext.Provider>
  );
};

export default ChatValueProvider;
