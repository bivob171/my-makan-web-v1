"use client";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { FollowCard } from "../Card/FollowCard";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
export const FollowerUserPage = () => {
  const { user } = PrivateRouteContext();
  const myRole = user?.role;
  const myId = user?._id;
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchName, setSearchName] = useState("");
  const [limit, setLimit] = useState(30);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const getAllPosts = async (token) => {
    setIsFetching(true);
    try {
      let url = `http://api.mymakan.ae/follow/follower-buyer?`;

      url += `sortBy=${sortBy}&`;
      url += `sortOrder=${sortOrder}&`;
      url += `page=${page}&`;
      url += `limit=${limit}`;
      1;
      if (searchName !== "") url += `&search=${searchName}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const allPostsList = await response.json();
      setHasMore(allPostsList.length === limit);
      setAllPosts((prevPosts) =>
        page === 1 ? allPostsList : [...prevPosts, ...allPostsList]
      );
      setLoading(false);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem(`${userRole}AccessToken`);
    getAllPosts(token);
  }, [sortOrder, sortBy, limit, page, searchName]);

  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore]
  );

  const handleSearchInputChange = (event) => {
    setSearchName(event.target.value);
    setPage(1);
  };
  return (
    <div id="user-view" className="user-grid-view h-screen overflow-y-auto ">
      <div className="block-box user-search-bar">
        <div className="box-item search-box">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search Member"
              value={searchName}
              onChange={handleSearchInputChange}
            />
            <div className="input-group-append">
              <button className="search-btn" type="button">
                <i className="icofont-search" />
              </button>
            </div>
          </div>
        </div>
        <div className="box-item search-filter">
          <div className="dropdown">
            <label className="mr-1">Order By:</label>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white py-2 text-sm font-semibold text-gray-900   ring-gray-300 hover:bg-gray-50">
                  {sortOrder === "asc" ? "Oldest Member" : "Newest Member"}
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="-mr-1 h-5 w-5 text-gray-400"
                  />
                </MenuButton>
              </div>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className=" pt-3">
                  <MenuItem onClick={() => setSortOrder("desc")}>
                    <p className="block cursor-pointer px-4 py-2 -mb-0 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                      Newest Member
                    </p>
                  </MenuItem>
                </div>
                <div className="">
                  <MenuItem onClick={() => setSortOrder("asc")}>
                    <p className="block  cursor-pointer px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
                      Oldest Member
                    </p>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
      {loading && (
        <div className="row gutters-20">
          {[1, 2, 3, 4].map((i) => {
            return (
              <div
                key={i}
                class="pb-10 rounded shadow-md w-[280px] bg-gray-50 mr-[15px]"
              >
                <div className="relative mb-[50px] h-20">
                  <div class=" w-full h-20 rounded bg-gray-300 relative"></div>
                  <div className="absolute inset-x-0 flex justify-center z-10  -bottom-[27px]">
                    <div class=" w-20  h-20 rounded-full bg-gray-400"></div>
                  </div>
                </div>

                <div class=" px-8 flex justify-center gap-x-[20px] mb-[15px]">
                  <div class="w-[150px] h-4 rounded bg-gray-300"></div>
                </div>
                <div class=" px-8 flex justify-center gap-x-[20px]">
                  <div class="w-[100px] h-4 rounded bg-gray-300"></div>
                </div>
                <div class=" px-8 flex gap-x-[20px] mt-[30px]">
                  <div class="w-[70px] h-4 rounded bg-gray-300"></div>
                  <div class="w-[70px] h-4 rounded bg-gray-300"></div>
                  <div class="w-[70px] h-4 rounded bg-gray-300"></div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {!loading && allPosts?.length === 0 && (
        <div className="text-center text-gray-500 mt-4">
          No posts available.
        </div>
      )}
      {!loading && allPosts.length > 0 && (
        <div className="row gutters-20">
          {allPosts?.map((item, i) => {
            return (
              <div ref={lastPostElementRef} key={i}>
                <FollowCard item={item} />;
              </div>
            );
          })}
        </div>
      )}

      <div className="pagination">
        {isFetching && (
          <div className="mb-[20px] mt-[40px] text-center">
            <p>Loading more Post...</p>
          </div>
        )}
        {!hasMore && allPosts?.length !== 0 && (
          <div className="mb-[20px] mt-[40px] text-center">
            <p>No more Post to load.</p>
          </div>
        )}
      </div>
    </div>
  );
};
