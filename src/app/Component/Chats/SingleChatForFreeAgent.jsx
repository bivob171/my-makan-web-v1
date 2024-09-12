import { cx } from "class-variance-authority";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { LuCheck, LuCheckCheck } from "react-icons/lu";
import LightGallery from "lightgallery/react";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgVideo from "lightgallery/plugins/video";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-video.css";
import "lightgallery/css/lg-fullscreen.css";
import { MdDeleteOutline, MdOutlineEmojiEmotions } from "react-icons/md";
import clsx from "clsx";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useClickOutside } from "react-haiku";
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
} from "../../../firebase";
import Link from "next/link";
export const SingleChatForFreeAgent = ({
  showDateHeader,
  msg,
  isSent,
  formattedDate,
  formattedTime,
  participantImage,
  user,
  status,
  uploadingProssing,
}) => {
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const emojiRef = useRef(null);
  const menuRef = useRef(null);
  console.log(msg);

  useClickOutside(emojiRef, () => {
    if (isEmojiOpen) {
      setIsEmojiOpen(false);
    }
  });
  useClickOutside(menuRef, () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  });
  const toggleEmojiMenu = () => setIsEmojiOpen((e) => !e);
  const toggleMenu = () => setIsMenuOpen((e) => !e);
  const msg_status = msg?.seen ? "seen" : msg.status;

  // funtion for reaction or delete
  const chatId = msg?.chatId;
  const messageId = msg?.id;
  const userId = user?._id;

  async function reactToMessage(reaction) {
    const messageRef = doc(db, "chats", chatId, "messages", messageId);

    try {
      // Remove existing reaction for this user, if any, and then add the new one
      const userReactionField = `reactions.${userId}`;

      await updateDoc(messageRef, {
        [userReactionField]: reaction, // Updates the user's reaction
      });

      console.log(`User ${userId} reacted with ${reaction}`);
    } catch (error) {
      console.error("Error reacting to message: ", error);
    }
  }
  async function deleteMessageForMe() {
    const messageRef = doc(db, "chats", chatId, "messages", messageId);

    try {
      await updateDoc(messageRef, {
        deletedFor: arrayUnion(userId), // Adds userId to the deletedFor array
      });
      console.log(`User ${userId} deleted the message for themselves.`);
    } catch (error) {
      console.error("Error deleting message for me: ", error);
    }
  }
  async function deleteMessageForEveryone() {
    const messageRef = doc(db, "chats", chatId, "messages", messageId);

    try {
      await updateDoc(messageRef, {
        content: "This message was deleted", // Mark message as deleted
        media: [], // Clear any media associated with the message
        reactions: {}, // Clear reactions
      });
      console.log("Message deleted for everyone.");
    } catch (error) {
      console.error("Error deleting message for everyone: ", error);
    }
  }
  // console.log(msg);
  return (
    <div>
      {showDateHeader && (
        <div className="text-center text-gray-500 text-[15px] font-medium my-[14px] border-b border-b-gray-200">
          {formattedDate}
        </div>
      )}
      <div
        className={`col-start-${isSent ? "6" : "1"} col-end-${
          isSent ? "13" : "8"
        } p-3 rounded-lg`}
      >
        <div
          className={`flex items-end gap-2 ${
            isSent ? "justify-start flex-row-reverse" : "flex-row"
          }`}
        >
          {isSent ? (
            <>
              {/* <Image
               alt=""
               src={user?.image}
               width={500}
               height={500}
               className="w-[30px] h-[30px] rounded-full"
             /> */}
            </>
          ) : (
            <Image
              alt=""
              src={participantImage}
              width={500}
              height={500}
              className="w-[30px] h-[30px] rounded-full"
            />
          )}

          {/* MESSAGE CAPSULE */}
          <div
            className={cx(
              "flex items-end gap-1 relative",
              isSent ? "mr-0" : "ml-2.5"
            )}
          >
            <div
              className={cx(
                "relative text-sm  p-2 pb-1 rounded-md min-w-[130px] max-w-[300px] shadow-sm shadow-gray-50/50",
                {
                  "bg-white rounded-bl-none": !isSent,
                  "bg-gradient-to-br from-blue-400 to-blue-400": isSent,
                }
              )}
            >
              <div
                className={cx(
                  "mt-1 text-base font-medium",
                  isSent ? "text-white" : "text-gray-900"
                )}
              >
                <Link
                  href="/user/package"
                  className="hover:underline underline-offset-4 hover:text-[#8920AD]"
                >
                  For see the massage buy a package
                </Link>
              </div>
              <div className="flex justify-end gap-x-[3px] items-center">
                <p
                  className={cx(
                    "text-[10px] font-semibold tracking-wider mb-0",
                    isSent ? "text-gray-100" : "text-gray-500"
                  )}
                >
                  {formattedTime}
                </p>
              </div>
            </div>
            {isSent ? (
              msg_status === "seen" ? (
                <Image
                  alt=""
                  src={participantImage}
                  width={30}
                  height={30}
                  className="size-[16px] rounded-full mb-1"
                />
              ) : (
                <div
                  className={cx(
                    "size-4 rounded-full border-2 border-blue-400 inline-flex justify-center items-center",
                    {
                      "text-blue-500": msg_status === "sent",
                    }
                  )}
                >
                  {msg_status === "sending" ? null : (
                    <LuCheck
                      className="size-[10px] font-black"
                      strokeWidth={3}
                    />
                  )}
                </div>
              )
            ) : null}
            <div
              className={cx(
                "w-0 h-0 border-t-[10px] border-r-[10px] border-r-white shadow-sm border-t-transparent border-b-transparent absolute bottom-0 left-0 -translate-x-full",
                isSent ? "hidden" : ""
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
