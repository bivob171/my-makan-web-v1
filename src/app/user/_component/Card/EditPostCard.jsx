import Image from "next/image";
import Link from "next/link";

import { BiCommentDetail, BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { format, formatDistanceToNow } from "date-fns";

import { useEffect, useState } from "react";
import { BookmarkIcon, BookmarkSlashIcon } from "@heroicons/react/20/solid";
import toast from "react-hot-toast";
import { SiImessage } from "react-icons/si";
import axios from "axios";
import { MatchCardData } from "./MatchCardData";
import { usePathname } from "next/navigation";
const EditPostCard = ({
  item,
  myId,
  open,
  openHiden,
  openDelete,
  setlike,
  like,
  setSaveRerander,
  saveRerander,
}) => {
  const {
    role,
    userId,
    agentId,
    createdAt,
    location,
    tags,
    _id,
    likeCount,
    comment,
    likedBy,
  } = item;
  const savePostId = _id;
  const [isHeartRed, setIsHeartRed] = useState(false);
  const [saveloading, setSaveLoading] = useState(true);
  const [error, setError] = useState(null);
  const userinfo = role === "agent" ? agentId : userId;
  const [hasId, setHasId] = useState(false);
  useEffect(() => {
    const userHasId = likedBy?.some((user) => user._id === myId);
    setHasId(userHasId);
  }, [likedBy, myId]);
  const formatDate = (isoString) => {
    const date = new Date(isoString);
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

  const getTagStyles = (index) => {
    const styles = [
      { bgColor: "#F2EEFC", textColor: "#26BF94" },
      { bgColor: "#EEEBF8", textColor: "#23B7E5" },
      { bgColor: "#FCEDEB", textColor: "#E6533C" },
      { bgColor: "#F3F6F8", textColor: "#F5B849" },
      { bgColor: "#FCEFF1", textColor: "#AAB800" },
    ];

    // Use modulo to cycle through styles if index exceeds predefined styles length
    const styleIndex = index % styles.length;

    return styles[styleIndex];
  };

  const giveLike = async (id) => {
    const url = `https://api.mymakan.ae/allposts/${id}/like`;
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem(`${userRole}AccessToken`);

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
    const url = `https://api.mymakan.ae/allposts/${id}/unlike`;
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem(`${userRole}AccessToken`);
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
      const apiUrl = `https://api.mymakan.ae/save-post/${role}/${_id}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
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
      const apiUrl = `https://api.mymakan.ae/save-post/delete-post-exist/${_id}`;

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
          `https://api.mymakan.ae/save-post/save-post-exist/${savePostId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include your JWT token if needed
            },
            params: {
              userId,
              role,
            },
          }
        );
        setIsHeartRed(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setSaveLoading(false);
      }
    };
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem(`${userRole}AccessToken`);
    checkSavePost(token);
  }, [savePostId, saveRerander]);

  // get path name
  const pathname = usePathname();
  const basePath = pathname.substring(0, pathname.lastIndexOf("/") + 1);

  return (
    <div className="w-full h-auto bg-white rounded-[15px] py-[25px] ">
      <div className="pt-2">
        <div className="flex justify-between px-[15px] ">
          <div className="flex gap-x-[15px] items-center h-[45px] ">
            <div className="mb-[17px]">
              <div className=" relative w-[40px] h-[40px] md:w-[60px] md:h-[60px]">
                <div>
                  <Image
                    width={40}
                    height={40}
                    alt="img"
                    src={userinfo?.image}
                    className="w-[40px] h-[40px] md:w-[60px] md:h-[60px] rounded-full"
                  />
                </div>
                <div className="absolute bottom-[2px] md:bottom-1 right-0 bg-white w-[10px] h-[10px] md:w-[14px] md:h-[14px] rounded-full flex items-center justify-center">
                  <Image
                    width={8}
                    height={8}
                    alt=""
                    className="pl-[] w-full h-full"
                    src="/homeCard/active.png"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className=" -mb-[20px] md:-mb-[15px]">
                <div className="flex justify-start items-center">
                  {item.role === "buyer" ? (
                    <>
                      {userinfo?._id === myId ? (
                        <Link
                          href={`${"/user/buyer-profile"}/${userinfo?._id}`}
                        >
                          <p className="text-[0.875rem] md:!text-[1.3rem] text-[#333335] font-semibold">
                            {userinfo?.fullName}
                          </p>
                        </Link>
                      ) : (
                        <Link
                          href={`${"/user/buyer-profile"}/${userinfo?._id}`}
                        >
                          <p className="text-[0.875rem] md:!text-[1.3rem] text-[#8F8F8F] font-semibold">
                            Hidden Name{" "}
                          </p>
                        </Link>
                      )}
                    </>
                  ) : (
                    <Link href={`${"/user/agent-profile"}/${userinfo?._id}`}>
                      <p className="text-[0.875rem] md:!text-[1.3rem] text-[#333335] font-semibold mr-[2px]">
                        {userinfo?.fullName}
                      </p>
                    </Link>
                  )}
                  <div className="mb-[5px] mr-2">
                    <Image
                      width={15}
                      height={15}
                      alt=""
                      src="/homeCard/verified.png"
                    />
                  </div>
                  <div className="flex items-center gap-x-[5px] mt-[5px]">
                    <p className="text-[#F5B849] text-[0.875rem] font-semibold">
                      {userinfo?.avgrating}
                    </p>
                    <p className="text-[#F5B849] text-[0.875rem] font-semibold">
                      <GoStarFill />
                    </p>
                  </div>
                </div>
              </div>
              {item.role === "buyer" ? (
                <p className="hover:underline underline-offset-4 text-[#8920AD] text-[13px] md:text-[16px] font-medium -mb-[10px] md:-mb-1">
                  Buyer From{" "}
                  <span className="text-[#E6533C]">
                    {userinfo?.state}
                    {userinfo?.country !== null && ", "}
                    {userinfo?.country}
                  </span>
                </p>
              ) : (
                <p className="hover:underline underline-offset-4 text-[#8920AD] text-[13px] md:text-[16px] font-medium -mb-[10px] md:-mb-1">
                  {userinfo?.companyName}
                </p>
              )}
              <div className="flex flex-wrap items-center">
                <div>
                  <p className="text-[#8C9097] text-[10px] md:text-[0.8rem]">
                    {formatDate(createdAt)}
                  </p>
                </div>
                <div>
                  <p className="hover:underline underline-offset-1 text-[#49B6F5] text-[12px] font-medium ml-1">
                    {location?.city}

                    {location?.country !== null && ", "}
                    {location?.country}
                  </p>
                </div>
                <div className="w-full max-w-[14px] h-auto mb-[16px] ml-[4px]">
                  <Image
                    width={40}
                    height={2}
                    alt=""
                    className=""
                    src="/homeCard/location.png"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="text-end relative ">
            <div className="absolute -top-[20px] right-0">
              <div className=" text-right">
                <Menu>
                  <MenuButton className=" ">
                    <Image alt="" width={20} height={5} src="/more.png" />
                  </MenuButton>

                  <MenuItems
                    transition
                    anchor="bottom end"
                    className="w-[200px] origin-top-right rounded-xl border border-white/5 bg-white p-1 text-sm/6 text-black transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
                  >
                    {isHeartRed === true ? (
                      <button
                        onClick={() => handleUnSaveClick(_id)}
                        className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10"
                      >
                        <BookmarkSlashIcon className="size-4 fill-black" />
                        Unsave
                      </button>
                    ) : (
                      <button
                        onClick={handleSaveClick}
                        className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-black/10"
                      >
                        <BookmarkIcon className="size-4 fill-black" />
                        Save
                      </button>
                    )}

                    <MenuItem>
                      <button
                        onClick={() => open(item)}
                        className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3  data-[focus]:bg-black/10"
                      >
                        <ArchiveBoxXMarkIcon className="size-4 fill-black" />
                        Edit
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => openHiden(item)}
                        className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3  data-[focus]:bg-black/10"
                      >
                        <ArchiveBoxXMarkIcon className="size-4 fill-black" />
                        Hide
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={() => openDelete(item)}
                        className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3  data-[focus]:bg-black/10"
                      >
                        <TrashIcon className="size-4 fill-black" />
                        Delete
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </div>

            <p className="leading-normal text-[0.825rem] md:text-[1rem] text-red-500 ps-4 font-semibold -mb-[1px]">
              {item?.postType}
            </p>
            <span className="leading-normal text-[0.755rem] md:text-[0.8rem] sm:block align-right text-end text-black font-medium">
              For {item?.for}
            </span>
          </div>
        </div>
        <div className="h-[0.5px] w-full bg-[#F0F1F7] mt-[20px]"></div>
        <div className="px-[15px] mt-[7px]">
          <div>
            <p className="font-inter text-[0.875rem] md:text-[1.5rem] text-[#333335] font-semibold mb-2 leading-[40px]">
              {item?.title}
            </p>
            {item?.description?.length > 132 ? (
              <p className="font-inter text-[#333335] text-[14px] md:!text-[17px] font-normal leading-[20px]">
                {item?.description.slice(0, 133)}...
                <Link href={`${"/user/post-details"}/${_id}`}>
                  <span className="hover:underline underline-offset-1 text-[#49B6F5] text-[14px] md:!text-[17px] font-medium cursor-pointer font-inter">
                    see more
                  </span>
                </Link>
              </p>
            ) : (
              <p className="font-inter text-[#333335] text-[14px] md:!text-[17px] font-normal  leading-[20px]">
                {item?.description}...
                <Link href={`${"/user/post-details"}/${_id}`}>
                  <span className="hover:underline underline-offset-1 text-[#49B6F5] text-[14px] md:!text-[17px] font-medium cursor-pointer font-inter">
                    see more
                  </span>
                </Link>
              </p>
            )}
          </div>
        </div>
        <div className="px-[15px] flex items-center justify-between">
          <div className="flex flex-wrap gap-x-[8px] mt-2">
            {item.tags?.map((tag, index) => {
              const { bgColor, textColor } = getTagStyles(index);
              return (
                <button
                  key={index}
                  className="!py-[0px] px-[7px] md:px-4 rounded "
                  style={{ backgroundColor: bgColor }}
                >
                  <span
                    className="text-[10px] md:text-[14px] font-medium font-inter"
                    style={{ color: textColor }}
                  >
                    {tag}
                  </span>
                </button>
              );
            })}
          </div>
          <div>
            <button className="">
              <SiImessage className="text-[#1DFF00] w-8 h-8" />
            </button>
          </div>
        </div>
        <div className="h-[0.5px] w-full bg-[#F0F1F7] my-[15px]"></div>
        <div className=" flex items-center justify-between px-[15px]">
          {basePath === "/user/matched-post/" ? (
            <p className="-mb-0 text-[12px] md:text-[14px] font-medium">
              Matched Post
            </p>
          ) : (
            <MatchCardData item={item} />
          )}
          <div className="flex gap-x-[7px] items-center flex-wrap">
            <div className="flex items-center">
              {hasId === true ? (
                <p
                  onClick={() => giveUnLike(item._id)}
                  className="text-[#845ADF] cursor-pointer text-[12px] md:text-[14px] -mb-0 mr-[2px]"
                >
                  {" "}
                  <BiSolidLike />
                </p>
              ) : (
                <p
                  onClick={() => giveLike(item._id)}
                  className=" cursor-pointer text-[12px] md:text-[14px] -mb-0 mr-[2px]"
                >
                  {" "}
                  <BiSolidLike />
                </p>
              )}
              <p className="text-[#845ADF] font-medium text-[12px] md:text-[14px] -mb-0">
                {item.likeCount === 0 ? "00" : item.likeCount}
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-[#AFB2B7] text-[12px] md:text-[14px] -mb-0 mr-[2px]">
                {" "}
                <BiCommentDetail />
              </p>
              <p className="text-[#AFB2B7] font-medium text-[12px] md:text-[14px] mb-[1px]">
                {item.comment?.length === 0 ? "00" : item.comment?.length}{" "}
              </p>
            </div>
            <div>
              {item.type === "Urgent" ? (
                <button className="rounded-[5px] w-[70px] h-[30px] hover:bg-[#E6533C] bg-[#FCEDEB] flex justify-center gap-x-[2px] items-center !text-[#E6533C] hover:!text-white text-[12px] font-semibold">
                  {item.type}
                </button>
              ) : item.type === "Sponsored" ? (
                <button className="rounded-[5px] !w-[90px] h-[30px] px-2 hover:bg-[#845ADF] bg-[#EEEBF8] flex justify-center gap-x-[2px] items-center text-[#845ADF] hover:text-white text-[12px] font-semibold">
                  <span>{item.type}</span>
                  <GoStarFill className="text-[#F5B849] text-[12px] md:text-[12px] font-semibold" />
                </button>
              ) : (
                <button className="rounded-[5px] w-[70px] h-[30px] hover:bg-[#845ADF] bg-[#EEEBF8] flex justify-center gap-x-[2px] text-[10px] md:text-[12px] items-center">
                  <p className="-mb-[1px] text-[#845ADF] hover:text-white text-[12px] font-semibold">
                    {item.type}
                  </p>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPostCard;
