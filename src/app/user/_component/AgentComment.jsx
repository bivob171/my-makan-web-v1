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
import io from "socket.io-client";
import { MentionsInput, Mention } from "react-mentions";
import { useRouter, useSearchParams } from "next/navigation";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
const socket = io("https://api.mymakan.ae", {
  path: "/socket.io",
  transports: ["websocket"],
});

const AgentComment = ({ _id, setAllPosts }) => {
  const { user } = PrivateRouteContext();
  const [commentRole, setCommentRole] = useState("");
  useEffect(() => {
    const userRole = localStorage.getItem("role");
    const myId = localStorage.getItem(`${userRole}Id`);
    setCommentRole(myId);
  }, []);
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
  const [replyView, setReplyView] = useState("");
  const [replyText, setReplyText] = useState("");
  const [replyRerander, setReplyRerander] = useState(false);
  const replyInputRef = useRef(null);
  const [comment, setComment] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [replies, setReplies] = useState({});
  const [mentionRole, setMentionRole] = useState([]);
  const [mentionUserId, setMentionUserId] = useState([]);
  const [mentionAgentId, setMentionAgentId] = useState([]);
  const [mentionName, setMentionName] = useState([]);

  const [mentionReplyRole, setMentionReplyRole] = useState([]);
  const [mentionReplyUserId, setMentionReplyUserId] = useState([]);
  const [mentionReplyAgentId, setMentionReplyAgentId] = useState([]);
  const [mentionReplyName, setMentionReplyName] = useState([]);

  const fetchReplies = async (commentId) => {
    const id =
      typeof commentId === "object" && commentId !== null
        ? commentId._id
        : commentId;
    if (id) {
      try {
        let url = `https://api.mymakan.ae/all-post-comment-reply/${id}`;
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
    }
  };

  useEffect(() => {
    commentDa?.forEach((comment) => fetchReplies(comment._id));
  }, [commentDa]);

  const handleReplyDisplay = (repliesList, commentId) => {
    if (repliesList.length === 1) {
      const reply = repliesList[0];
      const userIn = reply?.role === "agent" ? reply?.agentId : reply?.userId;

      return (
        <div className="reply-details">
          {replyView === commentId ? null : (
            <button
              className="flex justify-start"
              onClick={() =>
                setReplyView(replyView === commentId ? null : commentId)
              }
            >
              <span className="text-[12px] hover:underline leading-3">
                <div className="flex justify-start items-center gap-1">
                  <Image
                    width={40}
                    height={40}
                    alt="img"
                    src={userIn?.image}
                    className="w-[20px] h-[20px] rounded-full border-2 border-[#EDF2F9]"
                  />
                  <h4 className="text-[14px] font-bold text-[#222] m-0 leading-none">
                    {userIn?.fullName} -
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
          )}
        </div>
      );
    } else if (repliesList?.length > 1) {
      return (
        <>
          {replyView === commentId ? null : (
            <button
              className="view-more-replies"
              onClick={() =>
                setReplyView(replyView === commentId ? null : commentId)
              }
            >
              {`View Previous ${repliesList?.length} Replies`}
            </button>
          )}
        </>
      );
    } else {
      return null;
    }
  };

  const onEmojiClick = (emoji) => {
    setComment((prevComment) => prevComment + emoji.native);
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
      setHasMore(allCommentsList?.length === limit);
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
    if (_id) {
      getAllComment(token);
    }
  }, [commentRerander, sortOrder, sortBy, limit, page, _id]);

  useEffect(() => {
    const handleNewComment = (newComment) => {
      if (newComment.postId?._id === _id) {
        setComments((prevComments) => [newComment, ...prevComments]);
      }
    };

    const handleUpdatedComment = (updatedComment) => {
      if (updatedComment.postId._id === _id) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === updatedComment._id ? updatedComment : comment
          )
        );
      }
    };

    socket.on("newCommentCreate", handleNewComment);
    socket.on("commentUpdate", handleUpdatedComment);

    return () => {
      socket.off("newCommentCreate", handleNewComment);
      socket.off("commentUpdate", handleUpdatedComment);
    };
  }, [_id, socket]);

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

  const playNotificationSound = () => {
    const notificationSound = new Audio("/audio/postNotify.mp3");
    notificationSound.volume = 1.0;
    notificationSound.addEventListener("canplaythrough", () => {
      notificationSound.play();
    });
  };

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
      playNotificationSound();
      setComment("");

      setAllPosts((prevState) => ({
        ...prevState,
        commentTotalLength: prevState.commentTotalLength + 1,
      }));
      let commentData;
      if (mentionRole.length > 0) {
        commentData = {
          postId: _id,
          comment: comment,
          mention: true,
          mentionRole: mentionRole,
          mentionAgentId: mentionAgentId,
          mentionUserId: mentionUserId,
        };
      } else {
        commentData = {
          postId: _id,
          comment: comment,
        };
      }

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
        const responseData = await response.json();
        // setComments((prevPost) => [responseData, ...prevPost]);

        setMentionAgentId([]);
        setMentionName([]);
        setMentionUserId([]);
        setMentionRole([]);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const [replyDatas, setReplyDatas] = useState([]);

  useEffect(() => {
    const handleNewReplyCreate = (newReply) => {
      fetchReplies(newReply.postCommentId?._id);
    };
    socket.on("newReplyCreate", handleNewReplyCreate);
    return () => {
      socket.off("newReplyCreate");
    };
  }, [socket]);

  const handleSubmitReply = async (comment) => {
    try {
      let hasError = false;

      if (replyText === "") {
        toast.error("Reply is required.");
        hasError = true;
      }

      if (hasError) {
        return;
      }
      setReplyText("");
      playNotificationSound();
      const _id = comment._id;
      const postId = comment.postId;

      let replyData;
      if (mentionReplyRole.length > 0) {
        replyData = {
          postId: postId._id,
          postCommentId: _id,
          reply: replyText,
          mention: true,
          mentionRole: mentionReplyRole,
          mentionAgentId: mentionReplyAgentId,
          mentionUserId: mentionReplyUserId,
        };
      } else {
        replyData = {
          postId: postId._id,
          postCommentId: _id,
          reply: replyText,
          mention: false,
          mentionRole: [],
          mentionAgentId: [],
          mentionUserId: [],
        };
      }

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
      // Parse the JSON response

      if (!response.ok) {
        toast.error(`HTTP error! Status: ${response.status}`);
      } else {
        setReplyText("");
        const responseData = await response.json();

        setMentionReplyAgentId([]);
        setMentionReplyName([]);
        setMentionReplyUserId([]);
        setMentionReplyRole([]);
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

  const [inputValue, setInputValue] = useState("");
  const [inputValuerReply, setInputValueReply] = useState("");
  const [allMentionUsers, setAllMentionUsers] = useState([]);
  const [loadingM, setLoadingM] = useState(true);
  const [sortByM, setSortByM] = useState("createdAt");
  const [sortOrderM, setSortOrderM] = useState("asc");
  const [searchName, setSearchName] = useState("");
  const [limitM, setLimitM] = useState(20);
  const [pageM, setPageM] = useState(1);
  const [hasMoreM, setHasMoreM] = useState(true);
  const [isFetchingM, setIsFetchingM] = useState(false);
  const [selectedMentionDropdown, setSelectedMentionDropdown] = useState(false);
  const [selectedMentionReplyDropdown, setSelectedMentionReplyDropdown] =
    useState("");

  const inputRef = useRef(null);

  const getAllMentionUser = async (token) => {
    setIsFetchingM(true);
    try {
      let url = `https://api.mymakan.ae/follow/friend-list?`;

      url += `sortBy=${sortByM}&`;
      url += `sortOrder=${sortOrderM}&`;
      url += `page=${pageM}&`;
      url += `limit=${limitM}`;

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

      const allMentionUsers = await response.json();
      const allMentionUser = allMentionUsers?.friends;
      setHasMoreM(allMentionUser.length === limitM);
      setAllMentionUsers((prevPosts) =>
        pageM === 1 ? allMentionUser : [...prevPosts, ...allMentionUser]
      );
      setLoadingM(false);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setIsFetchingM(false);
    }
  };

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem(`${userRole}AccessToken`);
    getAllMentionUser(token);
  }, [sortOrderM, sortByM, limitM, pageM, searchName]);

  const lastPostElementRefMention = useCallback(
    (node) => {
      if (isFetchingM) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreM) {
          setPageM((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetchingM, hasMoreM]
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setComment(value);

    if (value.includes("@")) {
      setSelectedMentionDropdown(true);
      const searchTerm = value.split("@").pop();
      setSearchName(searchTerm);
    } else {
      setSelectedMentionDropdown(false);
    }
  };
  const handleChangeReply = (e, id) => {
    const value = e.target.value;
    setInputValueReply(value);
    setReplyText(value);

    if (value.includes("@")) {
      setSelectedMentionReplyDropdown(id);
      const searchTerm = value.split("@").pop();
      setSearchName(searchTerm);
    } else {
      setSelectedMentionReplyDropdown("");
    }
  };

  const handleSelectUser = (user) => {
    const mention = `${user.fullName} `;
    const newValue = inputValue.replace(/@\w*$/, mention);
    setInputValue(newValue);
    setComment(newValue);
    setSelectedMentionDropdown(false);
    inputRef.current.focus();
    setMentionRole((prev) => [...prev, user.role]);
    setMentionName((prev) => [...prev, user.fullName]);
    if (user.role === "agent") {
      setMentionAgentId((prev) => [...prev, user._id]);
    } else {
      setMentionUserId((prev) => [...prev, user._id]);
    }
  };
  const handleSelectReplyUser = (user) => {
    const mention = `${user.fullName} `;
    const newValue = inputValuerReply.replace(/@\w*$/, mention);
    setInputValueReply(newValue);
    setReplyText(newValue);
    setSelectedMentionReplyDropdown("");
    inputRef.current.focus();
    setMentionReplyRole((prev) => [...prev, user.role]);
    setMentionReplyName((prev) => [...prev, user.fullName]);
    if (user.role === "agent") {
      setMentionReplyAgentId((prev) => [...prev, user._id]);
    } else {
      setMentionReplyUserId((prev) => [...prev, user._id]);
    }
  };

  const searchParams = useSearchParams();
  const commentId = searchParams.get("commentId");
  const reply = searchParams.get("reply");

  useEffect(() => {
    const scrollToElement = (id) => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        element.classList.add("highlight");
      } else {
      }
    };

    if (commentId) {
      scrollToElement(commentId);
    }

    if (reply) {
      scrollToElement(reply);
    }
  }, [commentId, reply]);

  return (
    <div className="blog-comment-form">
      <div className="">
        <div className="w-full">
          <div className="flex justify-between items-end">
            <h3 className="w-full !mb-0">Leave a Comment</h3>
            {commentDa?.length > 1 ? (
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
            ) : null}
          </div>
          <div
            className={`${
              showAllComments === false
                ? " my-2 flex flex-col-reverse"
                : "overflow-y-auto max-h-[600px] my-2 flex flex-col-reverse"
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
                {commentDa
                  ?.slice(0, showAllComments ? commentDa.length : 1)
                  .map((comment) => {
                    const reply =
                      comment?.role === "agent"
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

                        distance = distance
                          .replace("about ", "")
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
                        id={comment?._id}
                        className={`flex ${
                          reply?._id === commentRole
                            ? "justify-end"
                            : "justify-start"
                        } text-start mb-1 w-full`}
                      >
                        <div
                          className={`flex ${
                            reply?._id === commentRole
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
                              <span className="text-[10px] font-bold">
                                Like
                              </span>
                              <span
                                onClick={() => setReplyInput(comment._id)}
                                className="text-[10px] font-bold cursor-pointer"
                              >
                                Reply
                              </span>
                            </div>

                            {/* reply section */}
                            {replyView === comment?._id ? (
                              <div className="my-[10px]">
                                <PostReplySection
                                  id={comment?._id}
                                  replyRerander={replyRerander}
                                  setReplyRerander={setReplyRerander}
                                  replyDatas={replyDatas}
                                  setReplyDatas={setReplyDatas}
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
                                  <div className="relative">
                                    <div>
                                      {selectedMentionReplyDropdown ===
                                        comment?._id && (
                                        <div
                                          onMouseLeave={() =>
                                            setSelectedMentionReplyDropdown("")
                                          }
                                          className="font-noto absolute bottom-[45px] -left-[0px] bg-white border shadow-md max:w-[280px] pb-[11px] rounded-b-[10px] mt-[40px] py-[10px] transition-all ease-in-out duration-500 opacity-100 z-50 rounded-[7px] h-[200px] overflow-auto"
                                        >
                                          <div>
                                            {allMentionUsers.length > 0 ? (
                                              allMentionUsers.map((user, i) => {
                                                return (
                                                  <div
                                                    ref={
                                                      lastPostElementRefMention
                                                    }
                                                    key={i}
                                                  >
                                                    <div
                                                      onClick={() =>
                                                        handleSelectReplyUser(
                                                          user?.followingAgent
                                                        )
                                                      }
                                                      className="flex items-center gap-x-2 w-full h-[40px] cursor-pointer hover:bg-[#EBEBEB] mb-[5px] px-[15px] hover:py-[7px]"
                                                    >
                                                      <div>
                                                        <Image
                                                          src={
                                                            user?.followingAgent
                                                              .image
                                                          }
                                                          alt=""
                                                          width={30}
                                                          height={30}
                                                          className="rounded-full w-[25px] h-[25px]"
                                                        />
                                                      </div>
                                                      <div>
                                                        <p className="font-noto font-normal  text-[#95004A] text-[12px] leading-[36px] pt-[10px]">
                                                          {
                                                            user?.followingAgent
                                                              .fullName
                                                          }
                                                        </p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                );
                                              })
                                            ) : (
                                              <p className="font-noto font-normal text-[#95004A] text-[12px] leading-[36px] w-[332px] h-[30px] flex items-center pt-[6px] pl-[20px] mb-[3px]">
                                                No user found
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                    <div>
                                      <input
                                        className="appearance-none border rounded w-full  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        type="text"
                                        placeholder="Reply"
                                        onChange={(e) =>
                                          handleChangeReply(e, comment._id)
                                        }
                                        value={replyText}
                                        onKeyDown={(e) => {
                                          if (
                                            e.key === "Enter" &&
                                            !e.shiftKey
                                          ) {
                                            e.preventDefault();
                                            handleSubmitReply(comment);
                                          }
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="flex justify-center items-center">
                                  <Tooltip
                                    title="Submit Reply"
                                    arrow
                                    placement="top-start"
                                  >
                                    <button
                                      type="button"
                                      onClick={() => handleSubmitReply(comment)}
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
                              handleReplyDisplay(
                                replies[comment._id],
                                comment?._id
                              )}
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
      <form action="" className="z-10">
        <div className="w-full ">
          <div className="relative">
            <textarea
              type="text"
              className="bg-[#EDF2F9] w-full text-[#666] outline-none rounded-t-2xl p-6 placeholder:text-[20px] text-[20px] resize-none -mb-[10px]"
              placeholder={`Type your comment and mention someone with @..., ${user?.fullName}`}
              rows={4}
              ref={inputRef}
              value={comment}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit();
                }
              }}
            />

            {selectedMentionDropdown && (
              <div
                onMouseLeave={() => setSelectedMentionDropdown(false)}
                className="font-noto absolute top-[15px] -left-[0px] bg-white border shadow-lg w-[360px] pb-[11px] rounded-b-[10px] mt-[40px] py-[10px] transition-all ease-in-out duration-500 opacity-100 z-50 rounded-[7px] h-[250px] overflow-auto"
              >
                <div>
                  {allMentionUsers.length > 0 ? (
                    allMentionUsers.map((user, i) => {
                      return (
                        <div ref={lastPostElementRefMention} key={i}>
                          <div
                            onClick={() =>
                              handleSelectUser(user?.followingAgent)
                            }
                            className="flex items-center gap-x-2 w-full h-[40px] cursor-pointer hover:bg-[#EBEBEB] mb-[5px] px-[15px] hover:py-[10px]"
                          >
                            <div>
                              <Image
                                src={user?.followingAgent.image}
                                alt=""
                                width={30}
                                height={30}
                                className="rounded-full w-[30px] h-[30px]"
                              />
                            </div>
                            <div>
                              <p className="font-noto font-normal  text-[#95004A] text-[14px] leading-[36px] pt-[10px]">
                                {user?.followingAgent.fullName}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="font-noto font-normal text-[#95004A] text-[14px] leading-[36px] w-[332px] h-[30px] flex items-center pt-[6px] pl-[20px] mb-[3px]">
                      No friend found
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between items-center w-full px-6 pb-2 bg-[#EDF2F9] rounded-b-2xl">
            <div className="relative ">
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
                <div className="absolute bottom-0 z-10">
                  <Picker data={data} onEmojiSelect={onEmojiClick} />
                </div>
              )}

              {/* <Tooltip title="Photo and video" arrow placement="top-start">
                <button className="hover:bg-[#fff] p-2 rounded-full">
                  <TbPhotoHexagon className="w-8 h-8" />
                </button>
              </Tooltip> */}
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
