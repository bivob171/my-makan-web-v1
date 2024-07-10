import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import { BsEmojiSunglasses } from "react-icons/bs";
import { TbPhotoHexagon } from "react-icons/tb";
import { VscSend } from "react-icons/vsc";
import Image from "next/image";

const AgentComment = () => {
  const commentData = [
    {
      id: 1,
      role: "user",
      name: "John Doe",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, libero",
      time: "5 min ago",
    },
    {
      id: 2,
      role: "me",
      name: "Musfiqur Rahman",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, libero",
      time: "4 min ago",
    },
    {
      id: 3,
      role: "user",
      name: "John Doe",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, libero",
      time: "3 min ago",
    },
    {
      id: 4,
      role: "user",
      name: "John Doe",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, libero",
      time: "2 min ago",
    },
    {
      id: 5,
      role: "me",
      name: "Musfiqur Rahman",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, libero",
      time: "1 min ago",
    },
    {
      id: 6,
      role: "me",
      name: "Musfiqur Rahman",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, libero",
      time: "29 sec ago",
    },
    {
      id: 7,
      role: "user",
      name: "Bayzid Hossan",
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, libero",
      time: "20 sec ago",
    },
  ];

  const [showAllComments, setShowAllComments] = useState(false);

  const sortedComments = commentData.sort((a, b) => b.id - a.id);

  const displayedComments = showAllComments
    ? sortedComments
    : [sortedComments[0]];

  return (
    <div className="blog-comment-form">
      <div className="grid grid-cols-3">
        <h3 className="item-title">Leave a Comment</h3>
        <div className="w-full col-span-2">
          <button
            className="w-full text-end mt-4"
            onClick={() => setShowAllComments(!showAllComments)}
          >
            <p className="text-[14px] font-medium hover:underline">
              {showAllComments ? "View less comments" : "View more comments"}
            </p>
          </button>
          <div className="my-2 flex flex-col-reverse">
            {displayedComments.map((comment) => (
              <div
                key={comment.id}
                className={`flex ${
                  comment.role === "me" ? "justify-end" : "justify-start"
                } text-start mb-4`}
              >
                <div
                  className={`flex w-[70%] ${
                    comment.role === "me" ? "justify-end" : "justify-start"
                  } gap-[8px]`}
                >
                  <Image
                    width={40}
                    height={40}
                    alt="img"
                    src="/media/figure/chat_7.jpg"
                    className="w-[55px] h-[55px] rounded-full border-2 border-[#EDF2F9]"
                  />
                  <div>
                    <div className="bg-[#EDF2F9] px-3 py-[10px] rounded-[20px]">
                      <h4 className="text-[18px] font-semibold text-[#222] m-0">
                        {comment.name}
                      </h4>
                      <p className="text-[#444] m-0">{comment.comment}</p>
                    </div>
                    <div className="flex justify-around items-center gap-1 mt-1">
                      <span className="text-[12px]">{comment.time}</span>
                      <span className="text-[12px] font-bold">Like</span>
                      <span className="text-[12px] font-bold">Reply</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <form action="">
        <div className="w-full">
          <textarea
            type="text"
            className="bg-[#EDF2F9] w-full text-[#666] outline-none rounded-t-2xl p-6 placeholder:text-[20px] text-[20px] resize-none -mb-[10px]"
            placeholder="Comment ad, Bayzid"
            rows={4}
          />
          <div className="flex justify-between items-center w-full px-6 pb-2 bg-[#EDF2F9] rounded-b-2xl">
            <div className="flex">
              <Tooltip title="Emoji" arrow placement="top-start">
                <button className="hover:bg-[#fff] p-2 rounded-full">
                  <BsEmojiSunglasses className="w-8 h-8" />
                </button>
              </Tooltip>
              <Tooltip title="Photo and video" arrow placement="top-start">
                <button className="hover:bg-[#fff] p-2 rounded-full">
                  <TbPhotoHexagon className="w-8 h-8" />
                </button>
              </Tooltip>
            </div>
            <Tooltip title="Send" arrow placement="top-start">
              <button className="hover:bg-[#fff] p-2 rounded-full">
                <VscSend className="w-8 h-8" />
              </button>
            </Tooltip>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AgentComment;
