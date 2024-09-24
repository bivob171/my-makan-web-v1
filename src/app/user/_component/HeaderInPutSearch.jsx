"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDebounce } from "react-haiku";

export const HeaderInPutSearch = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("totalPost");
  const [sortOrder, setSortOrder] = useState("desc");
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedValue = useDebounce(searchTerm, 1000);
  const [selectedAgentDropdown, setSelectedAgentDropdown] = useState(false);
  const observer = useRef();
  const dropdown = useRef(null);

  const getAllPosts = async (token) => {
    try {
      setIsFetching(true);
      if (searchTerm) {
        setLoading(true);
      }
      let url = `https://api.mymakan.ae/agent/all-get?`;

      url += `sortBy=${sortBy}&`;
      url += `sortOrder=${sortOrder}&`;
      url += `page=${page}&`;
      url += `limit=${limit}&`;
      if (debouncedValue) {
        url += `fullName=${encodeURIComponent(debouncedValue)}&`; // Add search query
      }

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
      setAllPosts((prevPost) =>
        page === 1 ? allPostsList : [...prevPost, ...allPostsList]
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
  }, [sortOrder, sortBy, limit, page, debouncedValue]); // Add searchTerm to dependencies

  const router = useRouter();
  const handleSuggestionClick = (agent) => {
    setSearchTerm(agent?.fullName);
    setPage(1);
    router.push(`https://mymakan.ae/user/agent-profile/${agent?._id}`);
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    setPage(1);
    setHasMore(true);
  };

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setSelectedAgentDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdown]);

  return (
    <div>
      <div className="input-group relative">
        <input
          type="text"
          className="form-control"
          placeholder="Search here......."
          value={searchTerm}
          onChange={handleInputChange} // Update search term
          onClick={() => setSelectedAgentDropdown(true)}
        />
        <div className="input-group-append">
          <button
            className="submit-btn"
            type="button"
            onClick={() => setPage(1)}
          >
            <i className="icofont-search" />
          </button>
        </div>
        {/* Dropdown for search suggestions */}
        {selectedAgentDropdown && (
          <div
            ref={dropdown}
            onMouseLeave={() => setSelectedAgentDropdown(false)}
            className="font-noto absolute top-[5px] -left-[0px] bg-white border shadow-lg w-[360px] pb-[11px] rounded-[10px] mt-[40px] py-[10px] transition-all ease-in-out duration-500 opacity-100 z-50  h-[250px] overflow-auto"
          >
            <div>
              {loading ? (
                <>
                  {[1, 2, 3].map((i) => {
                    return (
                      <div key={i} class="h-14  rounded-md w-60 ml-[9px]">
                        <div class="flex flex-row items-center justify-cente h-full space-x-5 animate ">
                          <div class="w-10 h-10 bg-gray-300 rounded-full "></div>
                          <div class="flex flex-col space-y-3 mt-1">
                            <div class="h-2 bg-gray-300 rounded-md w-36 "></div>
                            <div class="w-24 h-[6px] bg-gray-300 rounded-md "></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  {allPosts?.length > 0 ? (
                    allPosts?.map((agent, i) => (
                      <div
                        ref={lastPostElementRef}
                        key={agent._id}
                        onClick={() => handleSuggestionClick(agent)}
                        className="flex items-center gap-x-1 cursor-pointer hover:bg-gray-200 p-2"
                      >
                        <div className="w-[43px]">
                          <Image
                            alt=""
                            src={agent?.image}
                            width={40}
                            height={40}
                            className="rounded-full w-[40px] h-[40px]"
                          />
                        </div>
                        <div className="w-full">
                          <p className="  text-[#333333] font-medium leading-3 -m-0 text-[16px]">
                            {agent?.fullName}
                          </p>
                          <p className=" text-[#666666] leading-3 mt-[5px] -m-0 text-[12px]">
                            {agent?.companyName}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="font-noto font-normal text-[#95004A] text-[14px] leading-[36px] w-[332px] h-[30px] flex items-center pt-[6px] pl-[20px] mb-[3px]">
                      No Agent found
                    </p>
                  )}
                </>
              )}

              {isFetching && (
                <>
                  {[1, 2, 3].map((i) => {
                    return (
                      <div key={i} class="h-14  rounded-md w-60 ml-[9px]">
                        <div class="flex flex-row items-center justify-cente h-full space-x-5 animate ">
                          <div class="w-10 h-10 bg-gray-300 rounded-full "></div>
                          <div class="flex flex-col space-y-3 mt-1">
                            <div class="h-2 bg-gray-300 rounded-md w-36 "></div>
                            <div class="w-24 h-[6px] bg-gray-300 rounded-md "></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
