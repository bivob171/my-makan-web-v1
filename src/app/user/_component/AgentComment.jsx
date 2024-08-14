import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import toast from "react-hot-toast";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { Tooltip } from "@mui/material";
import { VscSend } from "react-icons/vsc";
import { TbPhotoHexagon } from "react-icons/tb";
import { BsEmojiSunglasses } from "react-icons/bs";
import { PostReplySection } from "./PostReplySection";
import { format, formatDistanceToNow } from "date-fns";
import EmojiPicker from "emoji-picker-react";

const AgentComment = ({ _id }) => {
  const { user } = PrivateRouteContext();
  const [commentDa, setComments] = useState([]);
  const [commentRerander, setCommentRerander] = useState(false);
  const [showAllComments, setShowAllComments] = useState(false);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [commentError, setCommentError] = useState("");
  const [replyInput, setReplyInput] = useState(false);
  const [replyView, setReplyView] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyRerander, setReplyRerander] = useState(false);
  const replyInputRef = useRef(null);
  const [comment, setComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [replies, setReplies] = useState({});

  const fetchReplies = async (commentId) => {
    try {
      let url = `https://api.mymakan.ae/all-post-comment-reply/${commentId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const replyData = await response.json();
      setReplies((prevReplies) => ({
        ...prevReplies,
        [commentId]: replyData,
      }));
    } catch (error) {
      console.error("Error fetching replies:", error);
    }
  };

  useEffect(() => {
    commentDa?.forEach((comment) => fetchReplies(comment._id));
  }, [commentDa]);

  const handleReplyDisplay = (repliesList) => {
    if (repliesList.length === 1) {
      const reply = repliesList[0];
      return (
        <div className="reply-details">
          <button
            className="flex justify-start"
            onClick={() => setReplyView(!replyView)}
          >
            <span className="text-[12px] hover:underline leading-3">
              <div className="flex justify-start items-center gap-1">
                <Image
                  width={40}
                  height={40}
                  alt="img"
                  src={reply?.image}
                  className="w-[20px] h-[20px] rounded-full border-2 border-[#EDF2F9]"
                />
                <h4 className="text-[14px] font-bold text-[#222] m-0 leading-none">
                  {reply?.fullName} -
                </h4>
                <span className="text-[14px] font-bold text-[#777] m-0 leading-none">
                  replied
                </span>
                <span className="text-[10px]">
                  {/* {formatDate(comment?.createdAt)} */}
                </span>
              </div>
            </span>
          </button>
        </div>
      );
    } else if (repliesList?.length > 1) {
      return (
        <button
          className="view-more-replies"
          onClick={() => setReplyView((prev) => !prev)}
        >
          {`View Previous ${repliesList?.length - 1} Replies`}
        </button>
      );
    } else {
      return null;
    }
  };

  const onEmojiClick = (emoji) => {
    setComment((prevComment) => prevComment + emoji.emoji);
    setShowEmojiPicker(false);
  };

  const handleEmojiButtonClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const getAllComment = async (token) => {
    try {
      let url = `https://api.mymakan.ae/all-post-comment/${_id}?`;

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

  const sortedComments = Array.isArray(commentDa)
    ? commentDa.sort((a, b) => b._id - a._id)
    : [];

  const displayedComments = showAllComments
    ? sortedComments
    : [sortedComments[0]];

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }

    try {
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
      const apiUrl = "https://api.mymakan.ae/all-post-comment/post";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
// error 
      if (comment.trim()) {
        postComment(comment)
          .then((newComment) => {
            setComments((prevComments) => [...prevComments, newComment]);
            setComment("");
          })
          .catch((error) => {
            console.error("Error posting comment:", error);
          });
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleSubmitReply = async (_id) => {
    try {
      let hasError = false;

      if (replyText === "") {
        toast.error("Comment is required.");
        hasError = true;
      }

      if (hasError) {
        return;
      }
      const replyData = {
        postCommentId: _id,
        reply: replyText,
      };

      let token;
      const userRole = localStorage.getItem("role");
      if (userRole === "agent") {
        token = localStorage.getItem("agentAccessToken");
      } else {
        token = localStorage.getItem("buyerAccessToken");
      }
      const apiUrl = "https://api.mymakan.ae/all-post-comment-reply/post";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(replyData),
      });

      if (!response.ok) {
        toast.error(`HTTP error! Status: ${response.status}`);
      } else {
        toast.success("Add Reply successfully!");
        setReplyText("");
        setReplyRerander(!commentRerander);
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        replyInputRef.current &&
        !replyInputRef.current.contains(event.target)
      ) {
        setReplyInput(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [replyInputRef]);

  return (
    <div className="blog-comment-form">
      <div className="">
        <div className="w-full">
          <div className="flex justify-between items-end">
            <h3 className="w-full !mb-0">Leave a Comment</h3>
            <button
              className="w-full text-end !mb-0"
              onClick={() => setShowAllComments(!showAllComments)}
            >
              {commentDa.length > 0 && (
                <p className="text-[14px] font-medium hover:underline mb-0">
                  {showAllComments
                    ? "View less comments"
                    : "View more comments"}
                </p>
              )}
            </button>
          </div>
          <div
            className={`${
              showAllComments === false
                ? " my-2 flex flex-col-reverse"
                : "overflow-y-auto h-[600px] my-2 flex flex-col-reverse"
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
                  const reply =
                    comment?.commentBy === "agent"
                      ? comment?.agentId
                      : comment?.userId;

                  const formatDate = (isoString) => {
                    if (!isoString) return "Invalid";

                    const date = new Date(isoString);
                    if (isNaN(date.getTime())) return "Invalid";

                    const now = new Date();
                    const timeDifference = now - date;

                    if (timeDifference < 24 * 60 * 60 * 1000) {
                      let distance = formatDistanceToNow(date, {
                        addSuffix: true,
                      });

                      // Replace time units with desired format
                      distance = distance
                        .replace("minute", "m")
                        .replace("hour", "h")
                        .replace("second", "s");

                      return distance;
                    }

                    return format(date, "d MMMM yyyy h:mm a");
                  };

                  return (
                    <div
                      ref={lastPostElementRef}
                      key={comment?._id}
                      className={`flex ${
                        reply?._id === user?._id
                          ? "justify-end"
                          : "justify-start"
                      } text-start mb-1 w-full`}
                    >
                      <div
                        className={`flex ${
                          reply?._id === user?._id
                            ? "justify-end"
                            : "justify-start"
                        } gap-[8px]`}
                      >
                        <Image
                          width={40}
                          height={40}
                          alt="img"
                          src={reply?.image}
                          className="w-[45px] h-[45px] rounded-full border-2 border-[#EDF2F9]"
                        />
                        <div>
                          <div className="bg-[#EDF2F9] px-3 py-[6px] rounded-[15px] w-full !min-w-[220px] !max-w-[420px]">
                            <h4 className="text-[12px] font-bold text-[#222] m-0 leading-4">
                              {reply?.fullName}
                            </h4>
                            <p className="text-[#444] m-0 leading-4 !text-[17px]">
                              {comment?.comment}
                            </p>
                          </div>
                          {/* reply click button  */}
                          <div className="flex justify-around items-center gap-1 mt-[1px]">
                            <span className="text-[12px]">
                              {formatDate(comment?.createdAt)}
                            </span>
                            <span className="text-[10px] font-bold">Like</span>
                            <span
                              onClick={() => setReplyInput(comment._id)}
                              className="text-[10px] font-bold cursor-pointer"
                            >
                              Reply
                            </span>
                          </div>

                          {/* reply section */}
                          {replyView === true ? (
                            <div className="my-[10px]">
                              <PostReplySection
                                id={comment?._id}
                                replyRerander={replyRerander}
                                setReplyRerander={setReplyRerander}
                              />
                            </div>
                          ) : null}

                          {/* reply input */}
                          {replyInput === comment?._id && (
                            <div
                              ref={replyInputRef}
                              className="flex items-center gap-x-2 my-[10px]"
                            >
                              <div>
                                <Image
                                  src={user?.image}
                                  alt="Chat"
                                  width={500}
                                  height={500}
                                  className="w-7 h-auto rounded-full"
                                />
                              </div>
                              <div>
                                <input
                                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                  type="text"
                                  placeholder="Reply"
                                  onChange={(e) => setReplyText(e.target.value)}
                                  value={replyText}
                                />
                              </div>
                              <div className="flex justify-center items-center">
                                <Tooltip
                                  title="Submit Reply"
                                  arrow
                                  placement="top-start"
                                >
                                  <button
                                    type="button"
                                    onClick={() =>
                                      handleSubmitReply(comment?._id)
                                    }
                                    className="hover:bg-[#fff] rounded-full"
                                  >
                                    <VscSend className="w-[20px] h-[20px]" />
                                  </button>
                                </Tooltip>
                              </div>
                            </div>
                          )}
                          {/* Replied comment area */}
                          {replies[comment?._id] &&
                            handleReplyDisplay(replies[comment._id])}
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
            placeholder={`Comment add, ${user?.fullName}`}
            rows={4}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <div className="flex justify-between items-center w-full px-6 pb-2 bg-[#EDF2F9] rounded-b-2xl">
            <div className="flex">
              <Tooltip title="Emoji" arrow placement="top-start">
                <button
                  type="button"
                  onClick={handleEmojiButtonClick}
                  className="hover:bg-[#fff] p-2 rounded-full"
                >
                  <BsEmojiSunglasses className="w-8 h-8" />
                </button>
              </Tooltip>

              {showEmojiPicker && (
                <div className="absolute z-10 mt-2">
                  <EmojiPicker
                    onEmojiClick={(event, emoji) => onEmojiClick(emoji)}
                  />
                </div>
              )}

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