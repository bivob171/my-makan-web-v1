"use client";
import React, { useEffect, useState } from "react";
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
import { CheckIcon } from "lucide-react";
import Image from "next/image";

export default function Chat({ chatId, userId }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatOpened, setChatOpened] = useState(false);

  // Function to send a new message

  const sendMessage = async (messageContent) => {
    try {
      if (!messageContent.trim()) return;

      // Reference to the 'messages' sub-collection within the chat document
      const messagesRef = collection(db, `chats/${chatId}/messages`);
      const chatDocRef = doc(db, `chats/${chatId}`);

      // Create a new message document with a timestamp
      const newMessageRef = await addDoc(messagesRef, {
        senderId: userId,
        content: messageContent,
        createdAt: serverTimestamp(),
        seen: false,
      });

      // Get the chat document to update unseen messages
      const chatDocSnapshot = await getDoc(chatDocRef);
      if (!chatDocSnapshot.exists()) {
        throw new Error("Chat document not found.");
      }
      const chatData = chatDocSnapshot.data();
      const participants = chatData.participants || [];

      // Get the timestamp of the newly created message
      const messageSnapshot = await getDoc(newMessageRef);
      const messageData = messageSnapshot.data();
      const messageTimestamp = messageData?.createdAt?.toMillis(); // Safely access the timestamp

      // Prepare unseen messages updates
      const unseenMessagesUpdate = {};
      participants.forEach((participant) => {
        if (participant.id !== userId) {
          unseenMessagesUpdate[participant.id] = increment(1); // Increment unseen messages for other participants
        }
      });

      // Update the chat document with the latest message and timestamp
      await updateDoc(chatDocRef, {
        latestMessage: messageContent,
        latestMessageTimestamp: Timestamp.fromMillis(messageTimestamp),
        unseenMessages: {
          [userId]: 0, // Reset sender's unseen messages count
          ...unseenMessagesUpdate, // Increment unseen messages count for other participants
        },
      });

      setNewMessage(""); // Clear the input field or state
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Function to mark unseen messages as seen when opening the chat
  const markMessagesAsSeen = async () => {
    try {
      const messagesRef = collection(db, `chats/${chatId}/messages`);
      const q = query(messagesRef, where("seen", "==", false));

      const querySnapshot = await getDocs(q);
      const batch = writeBatch(db);

      querySnapshot.forEach((doc) => {
        if (doc.data().senderId !== userId) {
          batch.update(doc.ref, { seen: true });
        }
      });

      await batch.commit();

      const chatRef = doc(db, "chats", chatId);
      await updateDoc(chatRef, { unseenMessagesCount: 0 });
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
      markMessagesAsSeen(); // Mark messages as seen when chat is opened
    }

    return () => {
      setChatOpened(false); // Reset chat open state on unmount or chatId change
    };
  }, [chatId]);

  return (
    <div className="flex flex-col h-full max-w-md mx-auto border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto bg-gray-100 h-[300px]">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-3 p-3 max-w-xs rounded-xl flex items-start ${
                msg.senderId === userId ? "ml-auto" : "mr-auto"
              } ${
                msg.seen
                  ? "bg-white border border-gray-300"
                  : "bg-yellow-100 border border-yellow-300"
              }`}
            >
              {msg.senderId !== userId && msg.seen && (
                <div className="mr-2">
                  <Image
                    width={50}
                    height={50}
                    src="https://mymakan-image.s3.eu-north-1.amazonaws.com/1721841554930-bayzid.png"
                    alt="Receiver"
                    className="h-8 w-8 rounded-full"
                  />
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm">{msg.content}</p>
                <small className="text-xs text-gray-500">
                  {msg.createdAt?.toDate().toLocaleString()}
                </small>
              </div>
              <div className="ml-2 flex items-center">
                {msg.seen && <CheckIcon className="h-5 w-5 text-green-500" />}
              </div>
              {msg.senderId === userId && (
                <div className="ml-2 flex items-center">
                  {msg.seen && <CheckIcon className="h-5 w-5 text-green-500" />}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No messages yet.</p>
        )}
      </div>
      <div className="flex items-center p-4 bg-white border-t border-gray-300">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full mr-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          onKeyPress={(e) => e.key === "Enter" && sendMessage(newMessage)}
        />
        <button
          onClick={() => sendMessage(newMessage)}
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Send
        </button>
      </div>
    </div>
  );
}
