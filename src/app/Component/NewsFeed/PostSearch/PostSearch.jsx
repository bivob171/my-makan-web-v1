"use client";

import Image from "next/image";
import React from "react";

export const PostSearch = ({ open, user, setVerifyPopup, userName }) => {
  return (
    <div>
      {" "}
      <div className="bg-white mb-0 !rounded-t-md !rounded-b-none !grid !grid-cols-12 gap-2 py-2">
        <div className="col-span-2 flex justify-center items-center w-full">
          {user?.image === undefined ? (
            <div
              class="flex w-[55px] h-[55px] object-cover  rounded-full shadow-md items-center justify-center bg-slate-100 motion-safe:animate-pulse dark:bg-slate-800"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                class="size-4 fill-slate-700/10 dark:fill-slate-300/10"
              >
                <path
                  fill-rule="evenodd"
                  d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          ) : (
            <Image
              width={40}
              height={40}
              alt="img"
              src={user?.image}
              className="w-[55px] h-[55px] object-cover rounded-full border-2"
            />
          )}
        </div>
        <ul className="member-list col-span-8  flex justify-center items-center">
          <li className="!w-full">
            {user?.role === "agent" ? (
              <>
                {user?.verified === false ? (
                  <>
                    <button
                      className="cursor-pointer !w-full"
                      onClick={() => setVerifyPopup(true)}
                    >
                      <div className="!w-full bg-[#EEF3FA] border-[1px] h-[45px] rounded-full flex justify-start items-center pl-4">
                        <span className="text-[16px] text-start font-mono font-medium">
                          what are you looking for, {userName}?
                        </span>
                      </div>
                    </button>
                  </>
                ) : (
                  <>
                    <button className="cursor-pointer w-full" onClick={open}>
                      <div className="!w-full bg-[#EEF3FA] border-[1px] h-[45px] rounded-full flex justify-start items-center pl-4">
                        <span className="text-[16px] text-start font-mono font-medium">
                          what are you looking for, {userName}?
                        </span>
                      </div>
                    </button>
                  </>
                )}
              </>
            ) : (
              <button className="cursor-pointer !w-full" onClick={open}>
                <div className="!w-full bg-[#EEF3FA] border-[1px] h-[45px] rounded-full flex justify-start items-center pl-4">
                  <span className="text-[16px] text-start font-mono font-medium">
                    what are you looking for, {userName}?
                  </span>
                </div>
              </button>
            )}
          </li>
        </ul>
        <button
          className="col-span-2  flex justify-center items-center"
          type="button"
        >
          <i className="icofont-abacus-alt" />
        </button>
      </div>
    </div>
  );
};
