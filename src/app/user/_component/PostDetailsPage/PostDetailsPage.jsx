import PrivateRouteContext from "@/Context/PrivetRouteContext";
import React, { useEffect, useState } from "react";
import ShareModal from "./ShareModal";
import GallerySection from "./GallerySection";
import VideoSection from "./VideoSection";
import PropertyInformation from "./PropertyInformation";
import MyGoogleMap from "./GoogleMap";
import AgentComment from "../AgentComment";
import SellTypeSection from "./SellTypeSection";
import TagsSection from "./TagsSection";
import { BsHeartFill } from "react-icons/bs";
import { CiShare1 } from "react-icons/ci";
import { Description, Dialog } from "@headlessui/react";
import { Title } from "@mui/icons-material";
import File from "./File";
import Image from "next/image";
import Link from "next/link";
import { BiSolidLike } from "react-icons/bi";
import toast from "react-hot-toast";
import axios from "axios";
import NewsFeedLeftSection from "@/app/Component/NewsFeed/NewsFeedLeftSection";
import PropertyCard2 from "@/app/Component/NewsFeed/PropertyCard2";
import RelatedPosts from "../RelatedBlogs";

export const PostDetailsPage = ({ postid }) => {
  const { user } = PrivateRouteContext();
  const myId = user?._id;
  const [isHeartRed, setIsHeartRed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [saveloading, setSaveLoading] = useState(true);
  const [error, setError] = useState(null);
  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  const [item, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [like, setlike] = useState(true);

  const getAllPosts = async (token) => {
    try {
      let url = `http://api.mymakan.ae/allposts/single-post/${postid}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } else {
        const allPostsList = await response.json();
        setAllPosts(allPostsList);
        setLoading(false);
      }
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
  }, [like]);
  const {
    role,
    userId,
    agentId,
    createdAt,
    location,
    tags,
    sellType,
    _id,
    likeCount,
    comment,
    likedBy,
    title,
    media,
    price,
    sqft,
  } = item;
  const userinfo = role === "agent" ? agentId : userId;
  const [hasId, setHasId] = useState(false);
  useEffect(() => {
    const userHasId = likedBy?.some((user) => user._id === myId);
    setHasId(userHasId);
  }, [likedBy, myId]);
  const savePostId = _id;

  const formatDate = (isoString) => {
    const date = new Date(isoString);

    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    return date.toLocaleDateString("en-GB", options);
  };

  const mediaArray = Array.isArray(media) ? media : [];

  const data = mediaArray.filter((file) => file.type === "image");
  const videos = mediaArray.filter((file) => file.type === "video");
  const files = mediaArray.filter((file) => file.type === "pdf");

  const [saveRerander, setSaveRerander] = useState(false);

  const handleSaveClick = async () => {
    try {
      setIsHeartRed(true);
      let token;
      const userRole = localStorage.getItem("role");
      if (userRole === "agent") {
        token = localStorage.getItem("agentAccessToken");
      } else {
        token = localStorage.getItem("buyerAccessToken");
      }
      const apiUrl = `http://api.mymakan.ae/save-post/${role}/${_id}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        toast.error(`HTTP error! Status: ${response.status}`);
      } else {
        toast.success("Post saved on your timeline");
        setSaveRerander(!saveRerander);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };
  const handleUnSaveClick = async (_id) => {
    try {
      setIsHeartRed(false);
      const userRole = localStorage.getItem("role");
      const token = localStorage.getItem(`${userRole}AccessToken`);
      const apiUrl = `http://api.mymakan.ae/save-post/delete-post-exist/${_id}`;

      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        toast.error(`HTTP error! Status: ${response.status}`);
      } else {
        toast.success("Post UnSave successfully!");
        setSaveRerander(!saveRerander);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    const checkSavePost = async (token) => {
      try {
        const response = await axios.get(
          `http://api.mymakan.ae/save-post/save-post-exist/${savePostId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              userId,
              role,
            },
          }
        );
        setIsHeartRed(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setSaveLoading(false);
      }
    };
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem(`${userRole}AccessToken`);
    // Check if savePostId is valid before calling checkSavePost
    if (savePostId) {
      checkSavePost(token);
    }
  }, [savePostId, saveRerander]);

  const giveLike = async (id) => {
    const url = `http://api.mymakan.ae/allposts/${id}/like`;
    const tokenKey = `${user?.role}AccessToken`;
    const token = localStorage.getItem(tokenKey);

    try {
      setHasId(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      setlike(!like);
      console.log("Like successful", data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  const giveUnLike = async (id) => {
    const url = `http://api.mymakan.ae/allposts/${id}/unlike`;
    const tokenKey = `${user?.role}AccessToken`;
    const token = localStorage.getItem(tokenKey);
    console.log(url, token);

    try {
      setHasId(false);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      setlike(!like);
      console.log("unLike successful", data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="page-content text-[#333] ">
      {" "}
      <div className="container">
        <div className="row">
          <div className="col-lg-3 widget-block widget-break-lg lg:block hidden">
            <div className="!sticky top-[110px]">
              <div className="h-[86vh] overflow-y-scroll">
                <NewsFeedLeftSection />
                <div className="space-y-6 mt-6">
                  <PropertyCard2 />
                  <PropertyCard2 />
                  <PropertyCard2 />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div>
              <div className="block-box user-single-blog ">
                <div className="blog-thumbnail">
                  <Image
                    src="/media/blog/blog_10.jpg"
                    width={1000}
                    height={1000}
                    alt="Blog"
                    className="w-full"
                  />
                </div>
                <div className="blog-content-wrap">
                  <div className="blog-entry-header">
                    <div className="flex justify-between items-center">
                      <div className="inline-flex items-center font-bold gap-2 mb-3">
                        <div className="">
                          {price !== null && (
                            <>
                              {" "}
                              <span className="text-[16px]">AED</span>{" "}
                              <span className="text-[22px] ">{price}</span>
                            </>
                          )}
                        </div>
                        {sqft !== null && (
                          <>
                            <span className="text-[24px] font-light leading-none">
                              |
                            </span>
                            <span className="text-[16px]">
                              {sqft} <span>sqft</span>
                            </span>
                          </>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        {isHeartRed === true ? (
                          <button
                            className={`px-3 py-2 rounded bg-[#625dfa99] text-[white] font-medium flex justify-center items-center gap-2 ${
                              isHeartRed === true ? "bg-[#625dfa]" : ""
                            }`}
                            onClick={() => handleUnSaveClick(_id)}
                          >
                            <BsHeartFill
                              className={`w-5 h-5 ${
                                isHeartRed === true ? "text-[red]" : ""
                              }`}
                            />{" "}
                            Save
                          </button>
                        ) : (
                          <button
                            className={`px-3 py-2 rounded bg-[#625dfa99] text-[white] font-medium flex justify-center items-center gap-2 `}
                            onClick={handleSaveClick}
                          >
                            <BsHeartFill className={`w-5 h-5 `} /> Save
                          </button>
                        )}
                        <button
                          className="px-3 py-2 rounded bg-[#625dfa99] text-[white] font-medium flex justify-center items-center gap-2"
                          onClick={() => setIsOpen(true)}
                        >
                          <CiShare1 className="w-5 h-5" />
                          Share
                        </button>
                      </div>
                      <ShareModal setIsOpen={setIsOpen} isOpen={isOpen} />
                    </div>
                    <h2 className="entry-title">
                      {capitalizeFirstLetter(title)}
                    </h2>
                    <div className="row align-items-start">
                      <div className="col-lg-9 flex justify-start ite gap-3">
                        <Image
                          src={userinfo?.image}
                          alt="Chat"
                          width={500}
                          height={500}
                          className="w-[50px] h-[50px] rounded-full"
                        />
                        <div className="mt-1">
                          <div className="!leading-4 !items-start mb-1">
                            <span className="!text-[#777] text-[14px] font-bold">
                              By
                            </span>{" "}
                            <span className="!text-[#222]">
                              {" "}
                              {item.role === "buyer" ? (
                                <>
                                  {userinfo?._id === myId ? (
                                    <Link href="#">{userinfo?.fullName}</Link>
                                  ) : (
                                    <Link href="#"> Hidden Name </Link>
                                  )}
                                </>
                              ) : (
                                <Link
                                  href="#"
                                  className="hover:!text-sky-400 hover:!underline"
                                >
                                  {userinfo?.fullName}
                                </Link>
                              )}
                            </span>
                          </div>
                          <ul className="entry-meta">
                            <li>
                              <i className="icofont-calendar" />{" "}
                              {formatDate(createdAt)}{" "}
                            </li>
                            <li>
                              <i className="icofont-like" /> Like:{" "}
                              {item.likeCount === 0 ? "00" : item.likeCount}
                            </li>
                            <li>
                              <i className="icofont-comment" /> Comments:{" "}
                              {item.comment?.length === 0
                                ? "00"
                                : item.comment?.length}{" "}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-3">
                        <ul className="blog-share">
                          <li>
                            <a href="#" className="bg-fb">
                              <i className="icofont-facebook" />
                            </a>
                          </li>
                          <li>
                            <a href="#" className="bg-twitter">
                              <i className="icofont-twitter" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="blog-content">
                    <blockquote>
                      <p>{item?.description}</p>
                    </blockquote>
                    {data?.length > 0 && (
                      <div className="">
                        <center>
                          <h2 className="mt-3 !mb-6 text-[#444] underline">
                            Images
                          </h2>
                        </center>
                        <GallerySection data={data} />
                      </div>
                    )}
                    {videos?.length > 0 && (
                      <div className="">
                        <center>
                          <h2 className="mt-3 !mb-6 text-[#444] underline">
                            Videos
                          </h2>
                        </center>
                        <VideoSection videos={videos} />
                      </div>
                    )}
                    {files?.length > 0 && (
                      <div className="">
                        <center>
                          <h2 className="mt-3 !mb-6 text-[#444] underline">
                            File
                          </h2>
                        </center>
                        <File files={files} />
                      </div>
                    )}
                  </div>
                  {/* Property Information */}
                  <div>
                    <PropertyInformation item={item} />
                  </div>
                  <div className="">
                    <center>
                      <h2 className="mt-3 !mb-6 text-[#444] underline">
                        Location
                      </h2>
                    </center>
                    <MyGoogleMap location={location} />
                  </div>
                  {/* <div className="blog-footer">
              <div className="item-label">
                Choose your <span>Reaction!</span>
              </div>
              <div className="reaction-icon">
                {hasId === true ? (
                  <p
                    onClick={() => giveUnLike(item?._id)}
                    className="text-[#845ADF] cursor-pointer text-[12px] md:text-[14px] -mb-0 mr-[2px] text-center"
                  >
                    {" "}
                    <BiSolidLike />
                  </p>
                ) : (
                  <p
                    onClick={() => giveLike(item?._id)}
                    className=" cursor-pointer text-[12px] md:text-[14px] -mb-0 mr-[2px] text-center"
                  >
                    {" "}
                    <BiSolidLike />
                  </p>
                )}
                <a href="#">
                  <Image
                    width={500}
                    height={500}
                    className="w-auto h-auto"
                    src="/media/figure/reaction_1.png"
                    alt="Like"
                  />
                </a>
              </div>
            </div> */}
                  <div className="mt-[45px]">
                    <hr className="mb-[20px]" />
                    <AgentComment _id={_id} />
                  </div>
                </div>
              </div>
              {/* blogs  */}
              <RelatedPosts item={item} />
              <div className="mb-[20px]">
                {/* sell type  */}
                <SellTypeSection sellType={sellType} />
              </div>
              {/* tags  */}
              <TagsSection tags={tags} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
