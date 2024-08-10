import React, { useCallback, useEffect, useRef, useState } from "react";
import { format, formatDistanceToNow } from "date-fns";
import Image from "next/image";
export const PostReplySection = ({ id, replyRerander, setReplyRerander }) => {
  const [commentDa, setReplys] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  console.log(commentDa);

  const getAllComment = async (token) => {
    try {
      let url = `https://api.mymakan.ae/all-post-comment-reply/${id}?`;

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
      const allCommentsList = await response.json();
      setHasMore(allCommentsList.length === limit);
      setReplys((prevPost) =>
        page === 1 ? allCommentsList : [...prevPost, ...allCommentsList]
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
    getAllComment(token);
  }, [sortOrder, sortBy, limit, page, id, replyRerander]);
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

  if (loading) {
    return (
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
    );
  }

  return (
    <div className="w-auto h-auto overflow-y-auto">
      {commentDa?.length > 0 ? (
        <>
          {commentDa?.map((data, i) => {
            const comonUser =
              data?.role === "agent" ? data?.agentId : data?.userId;

            const formatDate = (isoString) => {
              if (!isoString) return "Invalid date";

              const date = new Date(isoString);
              if (isNaN(date.getTime())) return "Invalid date";

              const now = new Date();
              const timeDifference = now - date;

              const options = {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              };

              // If the time difference is less than 24 hours, show relative time
              if (timeDifference < 24 * 60 * 60 * 1000) {
                return formatDistanceToNow(date, { addSuffix: true });
              }

              // Otherwise, show the formatted date
              return format(date, "d MMMM yyyy h:mm a");
            };
            return (
              <div
                ref={lastPostElementRef}
                key={i}
                className={`flex text-start mb-2`}
              >
                <div className={`flex w-[70%] gap-[8px]`}>
                  <Image
                    width={40}
                    height={40}
                    alt="img"
                    src={comonUser?.image}
                    className="w-[45px] h-[45px] rounded-full border-2 border-[#EDF2F9]"
                  />
                  <div>
                    <div className="bg-[#EDF2F9] px-3 py-[6px] rounded-[15px] w-full !min-w-[220px]">
                      <h4 className="text-[12px] font-bold text-[#222] m-0 leading-4">
                        {comonUser?.fullName}
                      </h4>
                      <p className="text-[#444] m-0 leading-4 !text-[17px]">{data?.reply}</p>
                    </div>
                    <div className="flex justify-start items-center gap-1 mt-1">
                      <span className="text-[12px]">
                        {" "}
                        {formatDate(data?.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <h4 className="text-[16px] font-semibold text-[#222] m-0">No Reply</h4>
      )}
    </div>
  );
};
