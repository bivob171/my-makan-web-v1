import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Filter from "./Filter";
import Link from "next/link";

const PostSearch = ({ open, user, setVerifyPopup, userName }) => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const filterRef = useRef(null);

  const userImage = user?.image;
  const userRole = user?.role;
  const userVerified = user?.verified;

  const PlaceholderIcon = () => (
    <div
      className="flex w-[50px] h-[50px] object-cover rounded-full shadow-md items-center justify-center bg-slate-100 motion-safe:animate-pulse dark:bg-slate-800"
      aria-hidden="true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        className="size-4 fill-slate-700/10 dark:fill-slate-300/10"
      >
        <path
          fillRule="evenodd"
          d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );

  const SearchBox = ({ onClick }) => (
    <button className="cursor-pointer w-full" onClick={onClick}>
      <div className="w-full bg-[#EEF3FA] border-[1px] h-[45px] rounded-full flex justify-start items-center pl-4">
        <span className="text-[16px] text-start font-mono font-medium leading-5">
          what are you looking for, {userName}?
        </span>
      </div>
    </button>
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setFilterVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef]);

  return (
    <div className="bg-white mb-0 rounded-t-md grid grid-cols-12 md:grid-cols-10 items-center p-2 relative">
      <div className="col-span-2 md:col-span-1 flex justify-start items-center w-full">
        {userImage ? (
          <Link
            href={
              userRole === "agent"
                ? `/user/agent-profile/${user?._id}`
                : `/user/buyer-profile/${user?._id}`
            }
          >
            <Image
              width={40}
              height={40}
              alt="User Image"
              src={userImage}
              className="w-[50px] h-[50px] object-cover rounded-full border-2"
            />
          </Link>
        ) : (
          <PlaceholderIcon />
        )}
      </div>
      <ul className="member-list col-span-8 flex justify-center items-center mx-1">
        <li className="w-full">
          {userRole === "agent" && userVerified === false ? (
            <SearchBox onClick={() => setVerifyPopup(true)} />
          ) : (
            <SearchBox onClick={open} />
          )}
        </li>
      </ul>
      {/* filter dropdown button */}
      <button
        className="col-span-1 flex justify-center !items-center hover:bg-[#dfdfdf6e] hover:rounded-full p-1 relative"
        type="button"
        onClick={() => setFilterVisible(!filterVisible)}
      >
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
            d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
          />
        </svg>
        {/* select filter number  */}
        {filterCount > 0 && (
          <div className="absolute -top-[5px] right-0">
            <div className="bg-[#ff3333bd] rounded-full w-4 h-4 relative">
              <span className="text-[10px] text-[#fefefe] font-mono font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                {filterCount}
              </span>
            </div>
          </div>
        )}
      </button>
      {filterVisible && (
        <div ref={filterRef} className="absolute top-[65px] right-0 z-40">
          <Filter
            onClose={() => setFilterVisible(false)}
            setFilterCount={setFilterCount}
            filterVisible={filterVisible}
            setFilterVisible={setFilterVisible}
          />
        </div>
      )}
    </div>
  );
};

export default PostSearch;
