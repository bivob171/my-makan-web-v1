import Image from "next/image";
import Link from "next/link";

import { BiCommentDetail, BiMessageDetail, BiSolidLike } from "react-icons/bi";
import { GoStarFill } from "react-icons/go";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { BookmarkIcon } from "@heroicons/react/16/solid";
import { format, formatDistanceToNow } from "date-fns";
import { SiImessage } from "react-icons/si";

import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BookmarkSlashIcon } from "@heroicons/react/20/solid";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { MdFavorite } from "react-icons/md";
const PackageCard = ({
  item,
  myId,
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
  const [isHovered, setIsHovered] = useState(false);
  const [isHeartRed, setIsHeartRed] = useState(false);
  const [saveloading, setSaveLoading] = useState(true);
  const [error, setError] = useState(null);
  const userinfo = role === "agent" ? agentId : userId;
  const [hasId, setHasId] = useState(false);

  const [openModalIndex, setOpenModalIndex] = useState(null);
  const modalRefs = useRef([]);

  const handleCommentBtnClick = (index) => {
    setOpenModalIndex(openModalIndex === index ? null : index);
  };

  const handleClickOutside = (event) => {
    if (openModalIndex !== null) {
      const modalRef = modalRefs.current[openModalIndex];
      if (modalRef && !modalRef.contains(event.target)) {
        setOpenModalIndex(null);
      }
    }
  };

  useEffect(() => {
    if (openModalIndex !== null) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openModalIndex]);

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
    const url = `https://q4m0gph5-4000.asse.devtunnels.ms/allposts/${id}/like`;
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
    const url = `https://q4m0gph5-4000.asse.devtunnels.ms/allposts/${id}/unlike`;
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem(`${userRole}AccessToken`);

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
      const apiUrl = `https://q4m0gph5-4000.asse.devtunnels.ms/save-post/${role}/${_id}`;

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
      const apiUrl = `https://q4m0gph5-4000.asse.devtunnels.ms/save-post/delete-post-exist/${_id}`;

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
          `https://q4m0gph5-4000.asse.devtunnels.ms/save-post/save-post-exist/${savePostId}`,
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

  return (
    <div className="w-full h-auto bg-white rounded-[15px] py-[25px] relative">
      <div className="pt-1">
        <div className="flex justify-between items-start px-[12px] md:px-[15px]">
          <div className="flex gap-x-[15px] items-start w-full">
            <div className="">
              <div
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="cursor-pointer !w-[60px] !h-[60px] md:!w-[90px] md:!h-[90px] border-4 p-[2px] hover:border-[#0033ffd4] rounded-full relative ">
                  <Image
                    width={400}
                    height={400}
                    alt="img"
                    src={userinfo?.image}
                    className="w-full h-full rounded-full transform transition duration-500 hover:scale-110 overflow-hidden"
                  />
                  <div className="absolute bottom-0 right-0 md:right-2 bg-white w-[12px] h-[12px] md:w-[16px] md:h-[16px] rounded-full flex items-center justify-center ">
                    <Image
                      width={10}
                      height={10}
                      alt=""
                      className="pl-[] w-full h-full"
                      src="/homeCard/active.png"
                    />
                  </div>
                </div>
                {/* hover dropdown  */}
                {isHovered && (
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 bg-white border-[1px] shadow-sm rounded-md p-3 z-10">
                    <div className="!w-80 md:!w-96">
                      <div className="flex gap-2">
                        <div className="!w-[60px] !h-[60px] md:!w-[85px] md:!h-[85px] cursor-pointer border-4 p-[2px] hover:border-[#0033ffd4] rounded-full">
                          <Image
                            width={40}
                            height={40}
                            alt="img"
                            src={userinfo?.image}
                            className="w-full h-full rounded-full"
                          />
                        </div>
                        <div>
                          <div className=" -mb-[20px] md:-mb-[15px]">
                            <div className="flex justify-start items-center">
                              {item.role === "buyer" ? (
                                <>
                                  {userinfo?._id === myId ? (
                                    <Link
                                      href={`${"/user/buyer-profile"}/${
                                        userinfo?._id
                                      }`}
                                    >
                                      <p className="text-[0.875rem] md:!text-[1.3rem] text-[#333335] font-semibold">
                                        {userinfo?.fullName}
                                      </p>
                                    </Link>
                                  ) : (
                                    <Link
                                      href={`${"/user/buyer-profile"}/${
                                        userinfo?._id
                                      }`}
                                    >
                                      <p className="text-[0.875rem] md:!text-[1.3rem] text-[#8F8F8F] font-semibold">
                                        Hidden Name{" "}
                                      </p>
                                    </Link>
                                  )}
                                </>
                              ) : (
                                <Link
                                  href={`${"/user/agent-profile"}/${
                                    userinfo?._id
                                  }`}
                                >
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
                          <div>
                            <p className="text-[#8C9097] text-[10px] md:text-[0.8rem] mb-0">
                              {formatDate(createdAt)}
                            </p>
                          </div>
                          <div className="flex gap-1 items-start leading-none">
                            <div className="w-full max-w-[14px] h-auto mb-[16px] ml-[4px]">
                              <Image
                                width={40}
                                height={2}
                                alt=""
                                className=""
                                src="/homeCard/location.png"
                              />
                            </div>
                            <p className="hover:underline underline-offset-1 text-[#49B6F5] text-[12px] font-medium">
                              {location?.city}

                              {location?.country !== null && ", "}
                              {location?.country}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between gap-3 mt-2">
                        <button className="bg-[#0066ff] text-white w-full py-2 rounded-md text-[18px] font-bold hover:bg-[#0066ff]/70 flex justify-center items-center gap-2">
                          <BsJournalBookmarkFill className="w-5 h-5" /> Follow
                        </button>
                        <button className="bg-[#0066ff] text-white w-full py-2 rounded-md text-[18px] font-bold hover:bg-[#0066ff]/70 flex justify-center items-center gap-2">
                          {" "}
                          <MdFavorite className="w-5 h-5" /> Save
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between items-start !w-full">
              <div>
                <div className=" -mb-[20px] md:-mb-[15px]">
                  <div className="flex justify-start items-center leading-none mb-1">
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
                <div className="leading-3 md:leading-4">
                  <p className="text-[#8C9097] text-[10px] md:text-[12px] !m-0 pt-[4px]">
                    {formatDate(createdAt)}
                  </p>

                    <p className="hover:underline underline-offset-1 text-[#49B6F5] text-[12px] font-medium !m-0 md:ml-1 flex justify-start items-center gap-x-1">
                      {location?.city}

                      {location?.country !== null && ", "}
                      {location?.country}
                    <Image
                      width={40}
                      height={2}
                      alt=""
                      className="w-full max-w-[14px] h-auto"
                      src="/homeCard/location.png"
                    />
                    </p>
                </div>
              </div>
              <div className="text-end">
                <p className="text-[0.825rem] md:text-[1rem] text-red-500 ps-4 font-semibold -mb-[1px] md:mb-2 leading-3">
                  {item?.postType}
                </p>
                <span className="leading-3 text-[0.755rem] md:text-[0.8rem] sm:block align-right text-end font-medium">
                  For {""}
                  {item?.for}
                </span>
              </div>
            </div>
          </div>
          <div className="absolute top-1 right-4">
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
                  <MenuItem>
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
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
        <div className="h-[0.5px] w-full bg-[#e9e9e9] my-3"></div>
        <div className="px-[15px]">
          <div>
            <p className="font-inter text-[22px] md:text-[28px] text-[#222] font-semibold mb-2 leading-[40px]">
              {item?.title}
            </p>
            {item?.description?.length > 132 ? (
              <p className="font-inter text-[#333] !text-[14px] md:!text-[16px] font-normal leading-[20px]">
                {item?.description.slice(0, 133)}...
                <Link href={`${"/user/post-details"}/${_id}`}>
                  <span className="hover:underline underline-offset-1 text-[#49B6F5] text-[14px] md:!text-[17px] font-medium cursor-pointer font-inter">
                    see more
                  </span>
                </Link>
              </p>
            ) : (
              <p className="font-inter text-[#333] text-[14px] md:!text-[17px] font-normal  leading-[20px]">
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
        <div className="px-[15px] flex items-start justify-between !mt-4">
          <div className="flex flex-wrap gap-[8px]">
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
          <div className="relative inline-flex">
            {/* handle comment button  */}
            <button
              className="hover:shadow-lg"
              onClick={() => handleCommentBtnClick(userinfo?._id)}
            >
              <SiImessage className="text-[#2ff328] w-8 h-8" />
            </button>
            {/* modal  */}
            {openModalIndex === userinfo?._id && (
              <div
                className="absolute right-0 top-9 z-30"
                ref={(el) => (modalRefs.current[userinfo?._id] = el)}
              >
                <div className="w-[220px] px-2 py-1 bg-[#f7f7f7fb] rounded-md shadow-md">
                  <ul className="!text-[13px]">
                    <button>
                      <li className="flex justify-start items-center gap-2 hover:text-sky-400">
                        <BiMessageDetail className="w-[14px] h-[14px]" />{" "}
                        <span>I am Interstate!</span>
                      </li>
                    </button>
                    <button>
                      <li className="flex justify-start items-center gap-2 hover:text-sky-400">
                        <BiMessageDetail className="w-[14px] h-[14px]" />{" "}
                        <span>Schedule For a Meeting.</span>
                      </li>
                    </button>
                    <button>
                      <li className="flex justify-start items-center gap-2 hover:text-sky-400">
                        <BiMessageDetail className="w-[14px] h-[14px]" />{" "}
                        <span>Give me more details.</span>
                      </li>
                    </button>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="h-[0.5px] w-full bg-[#F0F1F7] my-[15px]"></div>
        <div className=" flex items-center justify-between px-[15px]">
          <div className="flex flex-wrap items-center gap-x-[10px]">
            <div className="flex">
              <Image
                width={18}
                height={18}
                src="https://spruko.com/demo/tailwind/ynex/dist/assets/images/faces/11.jpg"
                alt="..."
                className="w-[18px] md:w-[28px] md:h-[28px] h-[18px] rounded-full border-2 border-blueGray-50 shadow hover:z-50 hover:-mt-[2.5px]"
              ></Image>
              <Image
                width={18}
                height={18}
                src="https://spruko.com/demo/tailwind/ynex/dist/assets/images/faces/11.jpg"
                alt="..."
                className="w-[18px] md:w-[28px] md:h-[28px] h-[18px] rounded-full border-2 border-blueGray-50 shadow -ml-[6px] hover:z-50 hover:-mt-[2.5px]"
              ></Image>
              <Image
                width={18}
                height={18}
                src="https://spruko.com/demo/tailwind/ynex/dist/assets/images/faces/11.jpg"
                alt="..."
                className="w-[18px] md:w-[28px] md:h-[28px] h-[18px] rounded-full border-2 border-blueGray-50 hover:z-50 hover:-mt-[2.5px] shadow -ml-[6px]"
              ></Image>
              <Image
                width={18}
                height={18}
                src="https://spruko.com/demo/tailwind/ynex/dist/assets/images/faces/11.jpg"
                alt="..."
                className="w-[18px] md:w-[28px] md:h-[28px] h-[18px] rounded-full border-2 border-blueGray-50 shadow -ml-[6px] hover:z-50 hover:-mt-[2.5px]"
              ></Image>
              <div className="w-[18px] md:w-[28px] md:h-[28px] h-[18px] rounded-full bg-[#845ADF]  -ml-[6px] hover:z-50 hover:-mt-[2.5px] flex items-center justify-center">
                <p className="text-[8px] -mb-[1px] text-white font-normal">
                  +2
                </p>
              </div>
            </div>
            <div>
              <p className="-mb-0 text-[12px] md:text-[14px] font-medium">
                +65 Matched
              </p>
            </div>
          </div>
          <div className="flex gap-x-[7px] items-center flex-wrap">
            <div className="flex items-center">
              {hasId === true ? (
                <p
                  onClick={() => giveUnLike(item?._id)}
                  className="text-[#845ADF] cursor-pointer text-[12px] md:text-[14px] -mb-0 mr-[2px]"
                >
                  {" "}
                  <BiSolidLike />
                </p>
              ) : (
                <p
                  onClick={() => giveLike(item?._id)}
                  className=" cursor-pointer text-[12px] md:text-[14px] -mb-0 mr-[2px]"
                >
                  {" "}
                  <BiSolidLike />
                </p>
              )}
              <p className="text-[#845ADF] font-medium text-[12px] md:text-[14px] -mb-0">
                {item?.likeCount === 0 ? "00" : item?.likeCount}
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
                  {item?.type}
                </button>
              ) : item?.type === "Sponsored" ? (
                <button className="rounded-[5px] !w-[90px] h-[30px] px-2 hover:bg-[#845ADF] bg-[#EEEBF8] flex justify-center gap-x-[2px] items-center text-[#845ADF] hover:text-white text-[12px] font-semibold">
                  <span>{item?.type}</span>
                  <GoStarFill className="text-[#F5B849] text-[12px] md:text-[12px] font-semibold" />
                </button>
              ) : (
                <button className="rounded-[5px] w-[70px] h-[30px] hover:bg-[#845ADF] bg-[#EEEBF8] flex justify-center gap-x-[2px] text-[10px] md:text-[12px] items-center">
                  <p className="-mb-[1px] text-[#845ADF] hover:text-white text-[12px] font-semibold">
                    {item?.type}
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

export default PackageCard;
