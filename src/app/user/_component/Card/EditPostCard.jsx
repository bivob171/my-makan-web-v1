import Image from "next/image";
import Link from "next/link";

import { BiCommentDetail, BiLike, BiSolidLike } from "react-icons/bi";
import clsx from "clsx";
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
import { usePathname, useRouter } from "next/navigation";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import CommentCard from "./CommentCard";
export default function EditPostCard({
  item,
  myId,
  open,
  openHiden,
  openDelete,
  setlike,
  like,
  setSaveRerander,
  saveRerander,
  setAllPosts,
}) {
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
    saveByMe,
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
    const url = `http://localhost:4000/allposts/${id}/like`;
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem(`${userRole}AccessToken`);

    try {
      setHasId(true);
      setAllPosts((prevData) =>
        prevData.map((item) =>
          item._id === _id ? { ...item, likeCount: item.likeCount + 1 } : item
        )
      );
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
      // setlike(!like);
      console.log("Like successful", data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  const giveUnLike = async (id) => {
    const url = `http://localhost:4000/allposts/${id}/unlike`;
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem(`${userRole}AccessToken`);
    console.log(url, token);

    try {
      setHasId(false);
      setAllPosts((prevData) =>
        prevData.map((item) =>
          item._id === _id ? { ...item, likeCount: item.likeCount - 1 } : item
        )
      );
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
      // setlike(!like);
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
      const apiUrl = `http://localhost:4000/save-post/${role}/${_id}`;

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
      const apiUrl = `http://localhost:4000/save-post/delete-post-exist/${_id}`;

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
    setIsHeartRed(saveByMe);
  }, [saveByMe, saveRerander]);

  // get path name
  const pathname = usePathname();
  const basePath = pathname.substring(0, pathname.lastIndexOf("/") + 1);

  const router = useRouter();
  function handleRelatedPosts({ type, value }) {
    let queryParam = "";
    switch (type) {
      case "location":
        queryParam = `location=` + value.city + `,` + value.country;
        break;
      case "tag":
        queryParam = `tag=${value}`;
        break;
      case "for":
        queryParam = `for=${value}`;
        break;
      case "type":
        queryParam = `type=${value}`;
        break;
      case "company":
        queryParam = `company=${value.company}`;
        break;

        return;
    }

    router.push(`/user/related-posts?${queryParam}`);
  }
  const { activeUsers } = PrivateRouteContext();
  const isActive = activeUsers.includes(userinfo?._id);
  const [commentDropdown, setCommentDropdown] = useState("");

  return (
    <div className="w-full h-auto bg-white rounded-[15px] py-[25px] ">
      <div className="pt-2">
        <div className="flex justify-between px-[15px] ">
          <div className="flex gap-x-[15px] items-center h-[45px] ">
            <div className="mb-[17px]">
              <Link
                href={
                  userinfo?.role === "agent"
                    ? `/user/agent-profile/${userinfo?._id}`
                    : `/user/buyer-profile/${userinfo?._id}`
                }
              >
                <div className="cursor-pointer !w-[50px] !h-[50px] md:!w-[70px] md:!h-[70px] border-[3px] p-[2px] hover:border-[#0033ffd4] rounded-full relative ">
                  <Image
                    width={400}
                    height={400}
                    alt="img"
                    src={userinfo?.image}
                    className="w-full h-full rounded-full transform transition duration-500 hover:scale-110 overflow-hidden"
                  />
                  <div className="absolute -bottom-1 right-0 md:right-2 bg-white w-[12px] h-[12px] md:w-[16px] md:h-[16px] rounded-full flex items-center justify-center ">
                    <Image
                      width={10}
                      height={10}
                      alt=""
                      className="pl-[] w-full h-full"
                      src="/homeCard/active.png"
                    />
                  </div>
                </div>
              </Link>
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
                <p
                  onClick={() =>
                    handleRelatedPosts({
                      type: "location",
                      value: {
                        city: userinfo?.state,
                        country: userinfo?.country,
                      },
                    })
                  }
                  className=" cursor-pointer hover:underline underline-offset-4 text-[#8920AD] text-[13px] md:text-[16px] font-medium -mb-[10px] md:-mb-1"
                >
                  Buyer From{" "}
                  <span className="text-[#E6533C]">
                    {userinfo?.state}
                    {userinfo?.country !== null && ", "}
                    {userinfo?.country}
                  </span>
                </p>
              ) : (
                <p
                  onClick={() =>
                    handleRelatedPosts({
                      type: "company",
                      value: {
                        company: userinfo?.companyName,
                      },
                    })
                  }
                  className="hover:underline cursor-pointer underline-offset-4 text-[#8920AD] text-[13px] md:text-[16px] font-medium -mb-[10px] md:-mb-1"
                >
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
                  <p
                    onClick={() =>
                      handleRelatedPosts({
                        type: "location",
                        value: {
                          city: location?.city,
                          country: location?.country,
                        },
                      })
                    }
                    className="cursor-pointer hover:underline underline-offset-1 text-[#49B6F5] text-[12px] font-medium ml-1"
                  >
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

            <p
              className={` ${
                item?.postType === "Required"
                  ? "text-red-500"
                  : "text-green-500"
              } "text-[0.825rem] md:text-[1rem]  ps-4 font-semibold -mb-[1px] md:mb-2 leading-3"`}
            >
              {item?.postType}
            </p>
            <span
              onClick={() =>
                handleRelatedPosts({
                  type: "for",
                  value: item?.for,
                })
              }
              className="cursor-pointer leading-normal text-[0.755rem] md:text-[0.8rem] sm:block align-right text-end text-black font-medium"
            >
              For {item?.for}
            </span>
          </div>
        </div>
        <div className="h-[0.5px] w-full bg-[#F0F1F7] mt-[20px]"></div>
        <div className="px-[15px] w-full">
          <Link href={`/user/post-details/${_id}`} className="w-full">
            <div>
              <p className="font-inter text-[18px] text-[#666] font-bold mb-2 leading-[22px]">
                {item?.title?.length > 63
                  ? `${item?.title?.slice(0, 63)}...`
                  : item?.title}
              </p>
              <p className="font-inter text-[#333] !text-[14px] font-normal leading-[20px] text-justify h-auto mb-[7px]">
                {item?.description?.length > 133 ? (
                  <>
                    {item?.description.slice(0, 133)}...
                    <Link href={`/user/post-details/${_id}`}>
                      <span className="hover:underline underline-offset-1 text-[#49B6F5] text-[14px] md:!text-[17px] font-medium cursor-pointer font-inter">
                        see more
                      </span>
                    </Link>
                  </>
                ) : (
                  item?.description
                )}
              </p>
              {Array.isArray(item?.media) ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5">
                  {item.media.slice(0, 3).map((item, key) => (
                    <div key={`POST_${key}`}>
                      <Image
                        src={item?.url}
                        width={300}
                        height={300}
                        alt=""
                        className="aspect-square w-full rounded-md"
                      />
                    </div>
                  ))}
                  {item?.media?.length >= 4 ? (
                    <div
                      className="aspect-square bg-gray-300/50 rounded-md text-gray-600/30 flex justify-center items-center text-lg bg-blend-multiply"
                      style={{
                        backgroundImage: `url(${item?.media?.[3]?.url})`,
                      }}
                    >
                      {String(item?.media?.length - 3 || 0).padStart(2, 0)}+
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </Link>
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
                  onClick={() => handelRelatedTags(tag)}
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
        <footer className=" flex items-center justify-between px-[15px] gap-2">
          {/* match post */}
          <div className="flex-shrink-0">
            {basePath === "/user/matched-post/" ? (
              <p className="-mb-0 text-[12px] md:text-[14px] font-medium">
                <span className="text-blue-500">{item?.matchPercentage}%</span>{" "}
                Matched on the selected Post
              </p>
            ) : (
              <MatchCardData item={item} />
            )}
          </div>

          <div className="flex gap-x-[7px] items-center flex-wrap flex-grow">
            <button
              onClick={hasId ? giveUnLike : giveLike}
              className={clsx(
                "flex justify-center items-center gap-1.5 font-bold flex-grow hover:bg-gray-100 py-1 px-2.5 rounded-md",
                {
                  "text-blue-500": hasId === true,
                }
              )}
            >
              {hasId ? (
                <BiSolidLike className="size-5" />
              ) : (
                <BiLike className="size-5" />
              )}
              <span className="hidden md:inline">
                {hasId === true ? "Liked" : "Like"}
              </span>
              <span className={clsx({ hidden: !item?.likeCount })}>
                ({String(item?.likeCount || "0").padStart(2, "0")})
              </span>
            </button>
            <button
              onClick={() =>
                !commentDropdown
                  ? setCommentDropdown(_id)
                  : setCommentDropdown(null)
              }
              className={clsx(
                "flex justify-center items-center gap-1.5 font-bold flex-grow hover:bg-gray-100 py-1 px-2.5 rounded-md",
                {
                  "text-blue-500": commentDropdown,
                }
              )}
            >
              <BiCommentDetail className="size-5" />
              <span className="hidden md:inline">Comment</span>
              <span className={clsx({ hidden: !item?.commentTotalLength })}>
                ({String(item?.commentTotalLength || "0").padStart(2, "0")})
              </span>
            </button>
            <div className="flex-shrink-0">
              {item.type === "Urgent" ? (
                <button
                  type="button"
                  onClick={() =>
                    handleRelatedPosts({
                      type: "type",
                      value: item?.type,
                    })
                  }
                  className="rounded-[5px] w-[70px] h-[30px] hover:bg-[#E6533C] bg-[#FCEDEB] flex justify-center gap-x-[2px] items-center !text-[#E6533C] hover:!text-white text-[12px] font-semibold"
                >
                  {item?.type}
                </button>
              ) : item?.type === "Sponsored" ? (
                <button
                  type="button"
                  onClick={() =>
                    handleRelatedPosts({
                      type: "type",
                      value: item?.type,
                    })
                  }
                  className="rounded-[5px] !w-[90px] h-[30px] px-2 hover:bg-[#845ADF] bg-[#EEEBF8] flex justify-center gap-x-[2px] items-center text-[#845ADF] hover:text-white text-[12px] font-semibold"
                >
                  <span>{item?.type}</span>
                  <GoStarFill className="text-[#F5B849] text-[12px] md:text-[12px] font-semibold" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() =>
                    handleRelatedPosts({
                      type: "type",
                      value: item?.type,
                    })
                  }
                  className="rounded-[5px] w-[70px] h-[30px] hover:bg-[#845ADF] bg-[#EEEBF8] hover:text-white flex justify-center gap-x-[2px] text-[12px] md:text-[12px] items-center -mb-[1px] font-semibold"
                >
                  {item?.type}
                </button>
              )}
            </div>
          </div>
        </footer>
        {commentDropdown === _id ? (
          <div>
            <div className="h-[0.5px] w-full bg-[#F0F1F7] my-[15px]"></div>
            <div>
              <CommentCard _id={_id} setAllPosts={setAllPosts} />
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
