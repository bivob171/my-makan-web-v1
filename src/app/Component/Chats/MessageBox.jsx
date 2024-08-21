"use client";

import Image from "next/image";
import React, { useState, useRef } from "react";
import { MdVideoCall } from "react-icons/md";

const MessageBox = ({ onProfileClick }) => {
  const [rows, setRows] = useState(1);
  const [message, setMessage] = useState("");
  const textareaRef = useRef(null);

  const handleInput = (event) => {
    const textareaLineHeight = 24;
    const previousRows = textareaRef.current.rows;
    textareaRef.current.rows = 1;
    const currentRows = Math.floor(
      textareaRef.current.scrollHeight / textareaLineHeight
    );

    if (currentRows === previousRows) {
      textareaRef.current.rows = currentRows;
    }

    if (currentRows >= 5) {
      textareaRef.current.rows = 5;
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    } else {
      textareaRef.current.rows = currentRows;
    }

    setRows(currentRows < 5 ? currentRows : 5);
    setMessage(event.target.value);
  };

  return (
    <div className="">
      <div className="sticky top-0 h-[65px] bg-white border-b flex items-center justify-between px-3">
        {/* click this button then open profile details section  */}
        <button
          onClick={onProfileClick}
          className="flex justify-start items-center gap-2 hover:bg-[#f5f8fd] rounded"
        >
          <Image
            src="/media/figure/author_4.jpg"
            alt=""
            width={500}
            height={500}
            className="w-[50px] h-[50px] object-cover rounded-full object-top"
          />

          <div className="flex flex-col items-start">
            <h3 className="text-[16px] font-bold leading-4"> Md Muzahidul</h3>
            <p className="text-center leading-3 text-[12px] m-0">
              Active 46m ago
            </p>
          </div>
        </button>
        <button>
          <MdVideoCall className="w-6 h-6 text-[#615DFA]" />
        </button>
      </div>
      <div className="overflow-y-auto"></div>
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
          onInput={handleInput}
          value={message}
        />
        {/* Conditionally render Send or Like button */}
        {message.trim().length > 0 ? (
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
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        ) : (
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
