import { Tooltip } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { BsEmojiSunglasses } from "react-icons/bs";
import { TbPhotoHexagon } from "react-icons/tb";
import { VscSend } from "react-icons/vsc";
import Image from "next/image";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import toast from "react-hot-toast";
import { format, formatDistanceToNow } from "date-fns";
const AgentComment = ({ _id }) => {
  const { user } = PrivateRouteContext();
  const [commentDa, setComments] = useState(false);
  const [commentRerander, setCommentRerander] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");

  const getAllComment = async (token) => {
    try {
      let url = `https://q4m0gph5-4000.asse.devtunnels.ms/all-post-comment/${_id}?`;

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
      setComments((prevPost) =>
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
  }, [sortOrder, sortBy, limit, page, _id, commentRerander]);
  const containerRefPost = useRef(null);
  const handleScrollPostResult = () => {
    const containerM = containerRefPost.current;
    if (
      containerM.scrollTop + containerM.clientHeight >=
        containerM.scrollHeight - 2 &&
      !isFetching &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const containerM = containerRefPost.current;
    containerM.addEventListener("scroll", handleScrollPostResult);
    return () =>
      containerM.removeEventListener("scroll", handleScrollPostResult);
  }, [isFetching, hasMore]);

  const [showAllComments, setShowAllComments] = useState(false);

  const sortedComments = Array.isArray(commentDa)
    ? commentDa.sort((a, b) => b._id - a._id)
    : [];

  const displayedComments = showAllComments
    ? sortedComments
    : [sortedComments[0]];

  // add coment
  const [comment, setComment] = useState("");
  const [commentError, setCommentError] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      let hasError = false;

      if (comment === "") {
        setCommentError("Comment is required.");
        hasError = true;
      } else {
        setCommentError("");
      }

      if (hasError) {
        return;
      }
      const commentData = {
        postId: _id,
        comment: comment,
      };

      let token;
      const userRole = localStorage.getItem("role");
      if (userRole === "agent") {
        token = localStorage.getItem("agentAccessToken");
      } else {
        token = localStorage.getItem("buyerAccessToken");
      }
      const apiUrl =
        "https://q4m0gph5-4000.asse.devtunnels.ms/all-post-comment/post";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        toast.error(`HTTP error! Status: ${response.status}`);
      } else {
        toast.success("Add Comment successfully!");
        setComment("");
        setCommentRerander(!commentRerander);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="blog-comment-form">
      <div className="grid grid-cols-3">
        <h3 className="item-title">Leave a Comment</h3>
        <div className="w-full col-span-2">
          <button
            className="w-full text-end mt-4"
            onClick={() => setShowAllComments(!showAllComments)}
          >
            {commentDa.length > 0 && (
              <p className="text-[14px] font-medium hover:underline">
                {showAllComments ? "View less comments" : "View more comments"}
              </p>
            )}
          </button>
          <div
            ref={containerRefPost}
            className={`${
              showAllComments === false
                ? " my-2 flex flex-col-reverse"
                : "overflow-y-auto h-[500px] my-2 flex flex-col-reverse"
            }`}
          >
            {commentDa?.length === 0 ? (
              <>
                <p className="text-[14px] text-center font-medium hover:underline">
                  No comment in the post!
                </p>
              </>
            ) : (
              <>
                {displayedComments?.map((comment) => {
                  const comonUser =
                    comment?.commentBy === "agent"
                      ? comment?.agentId
                      : comment?.userId;

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
                      key={comment?._id}
                      className={`flex ${
                        comonUser?._id === user?._id
                          ? "justify-end"
                          : "justify-start"
                      } text-start mb-4`}
                    >
                      <div
                        className={`flex w-[70%] ${
                          comonUser?._id === user?._id
                            ? "justify-end"
                            : "justify-start"
                        } gap-[8px]`}
                      >
                        <Image
                          width={40}
                          height={40}
                          alt="img"
                          src={comonUser?.image}
                          className="w-[55px] h-[55px] rounded-full border-2 border-[#EDF2F9]"
                        />
                        <div>
                          <div className="bg-[#EDF2F9] px-3 py-[10px] rounded-[20px]">
                            <h4 className="text-[18px] font-semibold text-[#222] m-0">
                              {comonUser?.fullName}
                            </h4>
                            <p className="text-[#444] m-0">
                              {comment?.comment}
                            </p>
                          </div>
                          <div className="flex justify-around items-center gap-1 mt-1">
                            <span className="text-[12px]">
                              {" "}
                              {formatDate(comment?.createdAt)}
                            </span>
                            <span className="text-[12px] font-bold">Like</span>
                            <span className="text-[12px] font-bold">Reply</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
      <form action="">
        <div className="w-full">
          <textarea
            type="text"
            className="bg-[#EDF2F9] w-full text-[#666] outline-none rounded-t-2xl p-6 placeholder:text-[20px] text-[20px] resize-none -mb-[10px]"
            placeholder={
              commentError === ""
                ? `Comment add, ${user?.fullName}`
                : commentError
            }
            rows={4}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
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
              <button
                type="button"
                onClick={handleSubmit}
                className="hover:bg-[#fff] p-2 rounded-full"
              >
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
