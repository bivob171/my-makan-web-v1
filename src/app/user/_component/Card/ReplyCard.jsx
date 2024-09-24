import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { format, formatDistanceToNow } from "date-fns";
import io from "socket.io-client";

const socket = io("https://q2p08zg4-4000.asse.devtunnels.ms", {
  path: "/socket.io", // Ensure this matches the path set in rewrites
  transports: ["websocket"], // Use WebSocket transport
});
export const ReplyCard = ({
  id,
  replyRerander,
  setReplyRerander,
  setReplyDatas,
  replyDatas,
}) => {
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc"); // Changed to "asc"
  const [sortBy, setSortBy] = useState("createdAt");

  const getAllComment = async (token) => {
    try {
      let url = `https://q2p08zg4-4000.asse.devtunnels.ms/all-post-comment-reply/${id}?`;

      url += `sortBy=${sortBy}&`;
      url += `sortOrder=${sortOrder}&`; // Sorting in ascending order
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
      setReplyDatas((prevPost) =>
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
    if (id) {
      getAllComment(token);
    }
  }, [sortOrder, sortBy, limit, page, id, replyRerander]);

  useEffect(() => {
    const handleNewReply = (newComment) => {
      setReplyDatas((prevComments) => [...prevComments, newComment]);
      setReplyRerander(!replyRerander);
    };
    socket.on("newReplyCreate", handleNewReply);
    socket.on("replyUpdate", (updatedComment) => {
      setReplyDatas((prevComments) =>
        prevComments.map((comment) =>
          comment._id === updatedComment._id ? updatedComment : comment
        )
      );
      setReplyRerander(!replyRerander);
    });

    // Clean up the socket listener when the component unmounts
    return () => {
      socket.off("newReplyCreate");
      socket.off("replyUpdate");
    };
  }, [socket]);

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
            <div key={i} className="h-14 rounded-md w-60">
              <div className="flex flex-row items-center justify-center h-full space-x-5 animate ">
                <div className="w-10 h-10 bg-gray-300 rounded-full "></div>
                <div className="flex flex-col space-y-3 mt-1">
                  <div className="h-2 bg-gray-300 rounded-md w-36 "></div>
                  <div className="w-24 h-[6px] bg-gray-300 rounded-md "></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="w-auto max-h-[250px] overflow-y-auto">
      {replyDatas?.length > 0 ? (
        <>
          {replyDatas?.map((data, i) => {
            const comonUser =
              data?.role === "agent" ? data?.agentId : data?.userId;

            const formatDate = (isoString) => {
              if (!isoString) return "Invalid date";

              const date = new Date(isoString);
              if (isNaN(date.getTime())) return "Invalid date";

              const now = new Date();
              const timeDifference = now - date;

              if (timeDifference < 24 * 60 * 60 * 1000) {
                return formatDistanceToNow(date, { addSuffix: true });
              }
              return format(date, "d MMMM yyyy h:mm a");
            };
            return (
              <div
                ref={lastPostElementRef}
                id={data._id}
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
                    <div className="bg-[#EDF2F9] px-3 py-[6px] rounded-[15px] w-full !min-w-[220px] !max-w-[340px]">
                      <h4 className="text-[12px] font-bold text-[#222] m-0 leading-4">
                        {comonUser?.fullName}
                      </h4>
                      <p className="text-[#444] m-0 leading-4 !text-[17px]">
                        {data?.reply}
                      </p>
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
        <div className="hidden" />
      )}
    </div>
  );
};
