"use client";
import React, { useState, useEffect, useContext } from "react";
import {
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  increment,
  onSnapshot,
  writeBatch,
  query,
  where,
  limit,
  Timestamp,
  getDoc,
} from "../../../firebase";
import Chat from "../chat/page";
import PrivateRouteContext from "@/Context/PrivetRouteContext";

export default function ChatList() {
  const { user, setRender, render } = PrivateRouteContext();
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchChatList = (user) => {
    setLoading(true);
    try {
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

        // Update the unseenMessagesCount based on the current user
        const updatedChats = searchFilteredChats.map((chat) => ({
          ...chat,
          unseenMessagesCount: chat.unseenMessages
            ? chat.unseenMessages[user._id] || 0
            : 0,
        }));

        // Sort chats by latestMessageTimestamp in descending order
        const sortedChats = updatedChats.sort(
          (a, b) =>
            (b.latestMessageTimestamp
              ? b.latestMessageTimestamp.toMillis()
              : 0) -
            (a.latestMessageTimestamp ? a.latestMessageTimestamp.toMillis() : 0)
        );

        setChats(sortedChats);
      });

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

  const handleChatSelection = async (chatId) => {
    setSelectedChatId(chatId);
    setActive(chatId);
    // Reset the unseen messages count when a chat is selected
    const chatRef = doc(db, "chats", chatId);
    const chatDoc = await getDoc(chatRef);
    console.log(chatDoc);

    if (!chatDoc.exists()) {
      console.error("Chat document not found.");
      return;
    }

    // Get the current unseenMessages
    const chatData = chatDoc.data();
    console.log(chatData);
    const currentUnseenMessages = chatData?.unseenMessages || {};
    // Update the unseen messages count
    await updateDoc(chatRef, {
      unseenMessages: {
        ...currentUnseenMessages,
        [user._id]: 0, // Reset unseen messages count for the current user
      },
    });
  };
  console.log(chats);

  return (
    <div className="p-4 px-[100px] mt-[100px] mx-[200px]">
      <h1 className="text-xl font-bold mb-4">My Chats</h1>

      <div className="search-bar mb-4">
        <input
          type="text"
          placeholder="Search chats by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border rounded w-full"
        />
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading chats...</p>
      ) : (
        <div className="chat-list">
          {chats.length > 0 ? (
            chats.map((chat) => {
              const unseenCount = chat.unseenMessages[user._id] || 0;
              return (
                <div key={chat.id}>
                  <button
                    onClick={() => handleChatSelection(chat.id)}
                    className={`${
                      chat.id === active ? "bg-blue-500" : "bg-red-500"
                    } block mb-2 p-2 text-white rounded flex justify-between items-center`}
                  >
                    <div className="flex-1">
                      <span className="font-semibold">
                        {chat.participants
                          .filter((p) => p.id !== user._id) // Exclude the current user
                          .map((p) => p.name) // Map to names
                          .join(", ")}
                        {chat.latestMessage}
                      </span>
                    </div>

                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                      {unseenCount}
                    </span>
                  </button>
                  {chat.latestMessage && (
                    <p className="text-sm text-gray-300">
                      {chat.latestMessage}
                    </p>
                  )}
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-500">No chats available.</p>
          )}
        </div>
      )}
      {selectedChatId && <Chat chatId={selectedChatId} userId={user._id} />}
    </div>
  );
}
