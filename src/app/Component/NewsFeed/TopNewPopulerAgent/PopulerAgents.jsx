"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";

export const PopulerAgents = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("totalPost");
  const [sortOrder, setSortOrder] = useState("desc");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const containerRefPost = useRef(null);

  const getAllPosts = async (token) => {
    try {
      let url = `https://api.mymakan.ae/agent/all-get?`;

      url += `sortBy=${sortBy}&`;
      url += `sortOrder=${sortOrder}&`;
      url += `page=${page}&`;
      url += `limit=${limit}`;

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
  }, [sortOrder, sortBy, limit, page]);

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
  return (
    <div>
      <div className="tab-content h-[350px] overflow-y-auto pb-[15px]">
        <div
          className="tab-pane fade show active"
          id="newest-member"
          role="tabpanel"
        >
          <div className="members-list">
            {loading && (
              <div>
                {[1, 2, 3].map((i) => {
                  return (
                    <div key={i} class="h-14  rounded-md w-60">
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
              </div>
            )}
            {!loading && allPosts?.length === 0 && (
              <div className="text-center text-gray-500 mt-4">
                No Agent available.
              </div>
            )}
            {!loading && allPosts.length > 0 && (
              <div>
                {allPosts?.map((agent, i) => {
                  return (
                    <div
                      ref={lastPostElementRef}
                      key={i}
                      className="media grid grid-cols-5 !items-center  pl-[6px]  mt-[6px]"
                    >
                      <div className="item-img col-span-1">
                        <a href="#">
                          <Image
                            width={1000}
                            height={100}
                            className="w-full h-full"
                            src={agent?.image}
                            alt="Chat"
                          />
                        </a>
                      </div>
                      <div className="media-body col-span-4 !w-full">
                        <h4 className="item-title">
                          <a href="#">{agent?.fullName}</a>
                        </h4>
                        <div className="item-username">
                          <a href="#">
                            <b>{agent?.companyName}</b>
                          </a>{" "}
                        </div>
                        <div className="member-status online">
                          <i className="icofont-speech-comments" />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            {isFetching && (
              <div className="mb-[20px] mt-[40px] text-center">
                <p>Loading more agent...</p>
              </div>
            )}
            {!hasMore && allPosts.length !== 0 && (
              <div className="mb-[20px] mt-[40px] text-center">
                <p>No more Agents to load.</p>
              </div>
            )}
          </div>
        </div>
        <div className="tab-pane fade" id="popular-member" role="tabpanel">
          <div className="members-list">
            <div className="media">
              <div className="item-img">
                <a href="#">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/chat_1.jpg"
                    alt="Chat"
                  />
                </a>
              </div>
              <div className="media-body">
                <h4 className="item-title">
                  <a href="#">Aahat Akter</a>
                </h4>
                <div className="item-username">@Aahat </div>
                <div className="member-status online">
                  <i className="icofont-check" />
                </div>
              </div>
            </div>
            <div className="media">
              <div className="item-img">
                <a href="#">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/chat_2.jpg"
                    alt="Chat"
                  />
                </a>
              </div>
              <div className="media-body">
                <h4 className="item-title">
                  <a href="#">Kazi Rahman</a>
                </h4>
                <div className="item-username">@Rahman</div>
                <div className="member-status online">
                  <i className="icofont-check" />
                </div>
              </div>
            </div>
            <div className="media">
              <div className="item-img">
                <a href="#">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/chat_3.jpg"
                    alt="Chat"
                  />
                </a>
              </div>
              <div className="media-body">
                <h4 className="item-title">
                  <a href="#">Alia Karon</a>
                </h4>
                <div className="item-username">@Alia</div>
                <div className="member-status online">
                  <i className="icofont-check" />
                </div>
              </div>
            </div>
            <div className="media">
              <div className="item-img">
                <a href="#">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/chat_4.jpg"
                    alt="Chat"
                  />
                </a>
              </div>
              <div className="media-body">
                <h4 className="item-title">
                  <a href="#">Masterero</a>
                </h4>
                <div className="item-username">@Master</div>
                <div className="member-status offline">
                  <i className="icofont-check" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tab-pane fade" id="active-member" role="tabpanel">
          <div className="members-list">
            <div className="media">
              <div className="item-img">
                <a href="#">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/chat_1.jpg"
                    alt="Chat"
                  />
                </a>
              </div>
              <div className="media-body">
                <h4 className="item-title">
                  <a href="#">Aahat Akter</a>
                </h4>
                <div className="item-username">@Aahat </div>
                <div className="member-status online">
                  <i className="icofont-check" />
                </div>
              </div>
            </div>
            <div className="media">
              <div className="item-img">
                <a href="#">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/chat_2.jpg"
                    alt="Chat"
                  />
                </a>
              </div>
              <div className="media-body">
                <h4 className="item-title">
                  <a href="#">Kazi Rahman</a>
                </h4>
                <div className="item-username">@Rahman</div>
                <div className="member-status online">
                  <i className="icofont-check" />
                </div>
              </div>
            </div>
            <div className="media">
              <div className="item-img">
                <a href="#">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/chat_3.jpg"
                    alt="Chat"
                  />
                </a>
              </div>
              <div className="media-body">
                <h4 className="item-title">
                  <a href="#">Alia Karon</a>
                </h4>
                <div className="item-username">@Alia</div>
                <div className="member-status online">
                  <i className="icofont-check" />
                </div>
              </div>
            </div>
            <div className="media">
              <div className="item-img">
                <a href="#">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/chat_4.jpg"
                    alt="Chat"
                  />
                </a>
              </div>
              <div className="media-body">
                <h4 className="item-title">
                  <a href="#">Masterero</a>
                </h4>
                <div className="item-username">@Master</div>
                <div className="member-status offline">
                  <i className="icofont-check" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
