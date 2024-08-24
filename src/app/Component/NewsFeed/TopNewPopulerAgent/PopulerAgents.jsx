"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { SiImessage } from "react-icons/si";

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
      let url = `http://api.mymakan.ae/agent/all-get?`;

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
                      className="media grid grid-cols-7 gap-2 !my-4"
                    >
                      <div className="col-span-2 flex items-center">
                        <Link
                          href={`${"/user/agent-profile"}/${agent?._id}`}
                          className="w-full h-full relative flex justify-center items-center group"
                        >
                          <Image
                            width={1000}
                            height={100}
                            className="w-[58px] h-[58px] object-cover rounded-full"
                            src={agent?.image}
                            alt="Chat"
                          />
                          <Image
                            width={1000}
                            height={100}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 group-hover:hidden"
                            src="/media/figure/chat_round_shape.png"
                            alt="Chat"
                          />
                          <Image
                            width={1000}
                            height={100}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden group-hover:block hover:-rotate-12 transition duration-100 ease-in-out"
                            src="/media/figure/chat_round_shape2.png"
                            alt="Chat"
                          />
                        </Link>
                      </div>
                      <div className="media-body col-span-4 !w-full">
                        <h4 className="item-title">
                          <Link href={`${"/user/agent-profile"}/${agent?._id}`}>
                            {agent?.fullName}
                          </Link>
                        </h4>
                        <div className="item-username -mt-[6px]">
                          <a href="#">
                            <b>{agent?.companyName}</b>
                          </a>{" "}
                        </div>
                      </div>
                      <div className="col-span-1">
                        <SiImessage className="text-[#1DFF00] w-6 h-6" />
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
