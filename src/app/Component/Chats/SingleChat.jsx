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
export const SingleChat = ({
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
              <ImageGrid images={msg?.media} />
              {msg.content ? (
                <div
                  className={cx(
                    "mt-1 text-base font-medium",
                    isSent ? "text-white" : "text-gray-900"
                  )}
                >
                  {msg?.content}
                </div>
              ) : (
                msg?.voice !== null && (
                  <audio controls className="w-[250px] h-[35px]">
                    <source src={msg?.voice} type="audio/wav" />
                  </audio>
                )
              )}
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

          {/* Message Actions */}
          <div className={clsx("relative self-center")}>
            <div
              className={clsx(
                " flex gap-1.5",
                isSent ? "flex-row-reverse" : ""
              )}
            >
              <button
                className={clsx(
                  "size-7 inline-flex justify-center items-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600",
                  isSent && !msg?.reactions?.[msg.senderId] ? "hidden" : ""
                )}
                onClick={toggleEmojiMenu}
              >
                {msg?.reactions?.[isSent ? msg.senderId : userId] ? (
                  <span>{msg?.reactions?.[userId]}</span>
                ) : (
                  <MdOutlineEmojiEmotions className="size-4" />
                )}
              </button>
              <button
                className="size-7 inline-flex justify-center items-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600"
                onClick={toggleMenu}
              >
                <BsThreeDotsVertical className="size-4" />
              </button>
            </div>
            <div
              ref={emojiRef}
              className={clsx(
                "absolute mb-1 bottom-full flex p-1 bg-white shadow-md rounded-full",
                isEmojiOpen ? "flex" : "hidden",
                isSent
                  ? "right-4 translate-x-1/2 hidden"
                  : "left-3 -translate-x-1/2"
              )}
            >
              <button
                type="button"
                onClick={() => reactToMessage("👍")}
                className="hover:bg-gray-100 size-8 rounded-full"
              >
                👍
              </button>
              <button
                type="button"
                onClick={() => reactToMessage("💖")}
                className="hover:bg-gray-100 size-8 rounded-full"
              >
                💖
              </button>
              <button
                type="button"
                onClick={() => reactToMessage("👍")}
                className="hover:bg-gray-100 size-8 rounded-full rotate-180"
              >
                👍
              </button>
            </div>
            <div
              ref={menuRef}
              className={clsx(
                "absolute mb-1 bottom-full flex p-1 bg-white shadow-md rounded-full",
                isMenuOpen ? "flex" : "hidden",
                isSent ? "left-4 -translate-x-1/2" : "right-4 translate-x-1/2"
              )}
            >
              {/* <button className="hover:bg-gray-100 size-8 rounded-full inline-flex justify-center items-center">
                <MdDeleteOutline className="size-4" />
              </button> */}
              <button
                type="button"
                onClick={deleteMessageForEveryone}
                className="hover:bg-gray-100 size-8 rounded-full inline-flex justify-center items-center"
              >
                <MdDeleteOutline className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageGrid = ({ images: mediaList = [] }) => {
  const lightbox = useRef(null);
  const imageCount = mediaList?.length || 0;
  if (!imageCount) return null;

  return (
    <LightGallery
      onInit={(ref) => {
        if (ref) {
          lightbox.current = ref.instance;
        }
      }}
      dynamic
      dynamicEl={mediaList?.map((media) => {
        if (media?.type === "video") {
          return {
            src: "",
            thumb: media?.poster || media?.url,
            html: `
              <video class="lg-video-object lg-html5" controls>
                <source src="${media?.url}" type="video/mp4">
                Your browser does not support HTML5 video.
              </video>
            `,
          };
        } else {
          return {
            src: media?.url,
            thumb: media?.url,
            alt: `image-${media?.id}`,
          };
        }
      })}
      mode="lg-fade"
      speed={500}
      plugins={[lgThumbnail, lgFullscreen, lgVideo]}
    >
      {imageCount <= 4 ? (
        <div
          className={cx(
            `grid gap-1 grid-cols-${imageCount === 4 ? 2 : imageCount}`
          )}
        >
          {mediaList.map((media, index) => {
            const isVideo = media?.type === "video";
            return (
              <a
                key={index}
                className={clsx("gallery-item", isVideo ? "" : "")}
                data-src={isVideo ? "" : media.url}
                data-poster={isVideo ? media.poster : ""}
                data-html={
                  isVideo
                    ? `
                  <video class="lg-video-object lg-html5" controls>
                    <source src="${media.url}" type="video/mp4">
                    Your browser does not support HTML5 video.
                  </video>`
                    : ""
                }
                onClick={() => {
                  if (media?.type === "vide") return;
                  lightbox.current?.openGallery(index);
                }}
              >
                {isVideo ? (
                  <video
                    src={media?.url}
                    poster={media?.poster}
                    className={cx(
                      "w-full rounded-md",
                      imageCount === 1
                        ? "object-cover aspect-auto"
                        : "aspect-square object-cover"
                    )}
                    controls
                  ></video>
                ) : (
                  <Image
                    src={media?.url}
                    width={500}
                    height={500}
                    alt={`media${index + 1}`}
                    className={cx(
                      "w-full rounded-sm",
                      imageCount === 1
                        ? "object-cover aspect-auto"
                        : "aspect-square object-cover"
                    )}
                  />
                )}
              </a>
            );
          })}
        </div>
      ) : (
        <div>
          <div className={cx(`grid gap-1 mb-1 grid-cols-2`)}>
            {mediaList.slice(0, 2).map((media, index) => (
              <a
                key={index}
                className="gallery-item"
                data-src={media?.url}
                data-poster={media?.poster || ""}
                data-html={
                  media?.type === "video"
                    ? `
                  <video class="lg-video-object lg-html5" controls>
                    <source src="${media?.url}" type="video/mp4">
                    Your browser does not support HTML5 video.
                  </video>`
                    : ""
                }
                onClick={() => {
                  lightbox.current?.openGallery(index);
                }}
              >
                <Image
                  src={media?.url}
                  width={500}
                  height={500}
                  alt={`media${index + 1}`}
                  className={cx(
                    "w-full rounded-sm",
                    imageCount === 1
                      ? "object-cover aspect-auto"
                      : "aspect-square object-cover"
                  )}
                />
              </a>
            ))}
          </div>
          <div className={cx(`grid gap-1 grid-cols-3`)}>
            {mediaList.slice(2).map((media, index) => (
              <a
                key={index}
                className="gallery-item"
                data-src={media?.url}
                data-poster={media?.poster || ""}
                data-html={
                  media?.type === "video"
                    ? `
                  <video class="lg-video-object lg-html5" controls>
                    <source src="${media?.url}" type="video/mp4">
                    Your browser does not support HTML5 video.
                  </video>`
                    : ""
                }
                onClick={() => {
                  lightbox.current?.openGallery(index + 2);
                }}
              >
                <Image
                  src={media?.url}
                  width={500}
                  height={500}
                  alt={`media${index + 1}`}
                  className="w-full aspect-square object-cover rounded-sm"
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </LightGallery>
  );
};
