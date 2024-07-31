"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { MdAddAPhoto } from "react-icons/md";
import { GoStarFill } from "react-icons/go";
import { useParams } from "next/navigation";
import ProfilePostTab from "../../_component/ProfilePostTab";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import toast from "react-hot-toast";
import axios from "axios";
import { PostLocationValueContext } from "@/Context/postValueContext";
import { BsJournalBookmarkFill } from "react-icons/bs";
import { SiImessage } from "react-icons/si";

export default function AgentProfile() {
  const { user, setRender, render } = PrivateRouteContext();
  const { setNewsFeedRender, newsFeedRender } = useContext(
    PostLocationValueContext
  );
  const myId = user?._id;
  const params = useParams();
  const [activeTab, setActiveTab] = useState("Posts");
  const userId = params.profileId;
  const [profile, setProfile] = useState();
  const [isFollow, setIsFollow] = useState(false);
  const [followRerander, setFollowRerander] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case "Posts":
        return (
          <ProfilePostTab
            profileId={params.profileId}
            profile={profile}
            followRerander={followRerander}
            setFollowRerander={setFollowRerander}
          />
        );
      case "About":
        return <div>About Tab</div>;
      case "Photos":
        return <div>Photos Tab</div>;
      case "Videos":
        return <div>Videos Tab</div>;
      default:
        return null;
    }
  };

  const fetchUserProfile = async (userId) => {
    if (!userId) return;
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem(`${userRole}AccessToken`);
    const endpoint = `https://api.mymakan.ae/agent/${userId}`;
    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      } else {
        const profile = await response.json();
        setProfile(profile);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile(userId);
  }, [userId, followRerander]);
  useEffect(() => {
    setIsFollow(profile?.following);
  }, [profile, followRerander]);
  // image update
  const [error, setError] = useState("");
  console.log(error);
  const [uploading, setUploading] = useState(false);
  const [uploadingP, setUploadingP] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedCoverImage, setSelectedCoverImage] = useState("");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    handleUpload(files);
  };
  const handleCoverFileChange = (e) => {
    const files = Array.from(e.target.files);
    handleUploadCover(files);
  };

  const handleUpload = async (files) => {
    setUploadingP(true);
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    try {
      const response = await axios.post(
        `https://api.mymakan.ae/file-upload/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const links = response.data.map((item) => item.Location);
      setSelectedImage(links[0]);
      const profilePhoto = links[0];
      updateProfilePhoto(profilePhoto);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploadingP(false); // Reset uploading state after upload attempt (whether success or failure)
    }
  };
  const handleUploadCover = async (files) => {
    setUploading(true);
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    try {
      const response = await axios.post(
        `https://api.mymakan.ae/file-upload/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const links = response.data.map((item) => item.Location);
      setSelectedCoverImage(links[0]);
      const coverPhoto = links[0];
      updateProfileCoverPhoto(coverPhoto);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false); // Reset uploading state after upload attempt (whether success or failure)
    }
  };

  const updateProfilePhoto = async (profilePhoto) => {
    try {
      const userUpdateData = {
        image: profilePhoto,
      };
      const userRole = localStorage.getItem("role");
      const token = localStorage.getItem(`${userRole}AccessToken`);
      const endpoint =
        userRole === "buyer"
          ? `https://api.mymakan.ae/user/update-profile`
          : `https://api.mymakan.ae/agent/update-profile`;

      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userUpdateData),
      });

      if (!response.ok) {
        setError(` ${response.status}`);
      } else {
        const data = await response.json();
        console.log(data);
        toast.success("Profile Photo updated successfully.", {
          style: {
            whiteSpace: "nowrap",
          },
        });
        setRender(!render);
        setNewsFeedRender(!newsFeedRender);
      }
    } catch (error) {
      setError(` ${error}`);
    }
  };
  const updateProfileCoverPhoto = async (coverPhoto) => {
    try {
      const userUpdateData = {
        coverImage: coverPhoto,
      };

      const userRole = localStorage.getItem("role");
      const token = localStorage.getItem(`${userRole}AccessToken`);
      const endpoint =
        userRole === "buyer"
          ? `https://api.mymakan.ae/user/update-profile`
          : `https://api.mymakan.ae/agent/update-profile`;

      const response = await fetch(endpoint, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userUpdateData),
      });

      if (!response.ok) {
        toast.error(` ${response.status}`);
      } else {
        const data = await response.json();
        console.log(data);
        toast.success("Cover Photo updated successfully.", {
          style: {
            whiteSpace: "nowrap",
          },
        });
        setRender(!render);
        setNewsFeedRender(!newsFeedRender);
      }
    } catch (error) {
      toast.error(` ${error}`);
    }
  };

  useEffect(() => {
    setSelectedImage(
      profile?.image === null
        ? "  https://i.ibb.co/7298VDJ/user.png"
        : profile?.image
    );
    setSelectedCoverImage(
      profile?.coverImage === null
        ? "  https://i.ibb.co/7298VDJ/user.png"
        : profile?.coverImage
    );
  }, [profile]);

  // follow funtion

  const handleFollowClick = async (profile) => {
    try {
      const _id = profile?._id;
      const role = profile?.role;
      setIsFollow(true);
      let token;
      const userRole = localStorage.getItem("role");
      if (userRole === "agent") {
        token = localStorage.getItem("agentAccessToken");
      } else {
        token = localStorage.getItem("buyerAccessToken");
      }
      const apiUrl = `https://api.mymakan.ae/follow/follow/${role}/${_id}`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        toast.error(`${response.status}`);
      } else {
        toast.success(`Successful following ${user?.fullName}`);
        setFollowRerander(!followRerander);
      }
    } catch (error) {
      toast.error(` ${error.message}`);
    }
  };
  const handleUnFollowClick = async (profile) => {
    try {
      const _id = profile?._id;
      const role = profile?.role;
      setIsFollow(false);
      const userRole = localStorage.getItem("role");
      const token = localStorage.getItem(`${userRole}AccessToken`);
      const apiUrl = `https://api.mymakan.ae/follow/unfollow/${role}/${_id}`;

      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        toast.error(`${response.status}`);
      } else {
        toast.success(`Successful Unfollowing ${user?.fullName}`);
        setFollowRerander(!followRerander);
      }
    } catch (error) {
      toast.error(`${error.message}`);
    }
  };

  return (
    <div className="">
      <div className="bg-[white] shadow-sm !pt-[100px]">
        <div className="container">
          <input
            id="upload-cover"
            type="file"
            onChange={handleCoverFileChange}
            style={{ display: "none" }}
          />
          <input
            id="upload-profile"
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <div className="relative">
            <div className="relative">
              {selectedCoverImage === undefined || uploading === true ? (
                <div
                  class="flex w-full h-[180px] md:h-[350px] object-cover object-top rounded-b-lg items-center justify-center bg-slate-100 motion-safe:animate-pulse dark:bg-slate-800"
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    class="size-12 fill-slate-700/10 dark:fill-slate-300/10"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              ) : (
                <Image
                  src={selectedCoverImage}
                  width={1000}
                  height={1000}
                  alt="cover image"
                  loading="lazy"
                  className="w-full h-[180px] md:h-[350px] object-cover object-top rounded-b-lg"
                />
              )}
              {profile?._id === myId && (
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("upload-cover").click()
                  }
                  className="bg-[white] hover:bg-[#fefefef1] py-1 px-3 flex justify-center items-center gap-2 absolute bottom-4 right-4 rounded-md shadow-md"
                >
                  <MdAddAPhoto className="w-5 h-5" />
                  <span className="text-[16px] font-bold">
                    Edit Cover Photo
                  </span>
                </button>
              )}
            </div>
            <div className="flex flex-col md:flex-row justify-center md:justify-start items-center md:items-end gap-3 -mt-8 px-10">
              <div className="relative w-[140px] h-[140px] md:w-[180px] md:h-[180px] border-4 border-[#dbdbdb] rounded-full">
                {selectedImage === undefined || uploadingP === true ? (
                  <div
                    class="flex w-full h-full object-cover object-top rounded-full shadow-md items-center justify-center bg-slate-100 motion-safe:animate-pulse dark:bg-slate-800"
                    aria-hidden="true"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      class="size-12 fill-slate-700/10 dark:fill-slate-300/10"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                ) : (
                  <Image
                    src={selectedImage}
                    width={1000}
                    height={1000}
                    alt="profile image"
                    loading="lazy"
                    className="w-full h-full object-cover object-top rounded-full shadow-md"
                  />
                )}
                <button
                  type="button"
                  onClick={() =>
                    document.getElementById("upload-profile").click()
                  }
                  className="absolute bottom-1 right-0 bg-[#dbdbdb] p-[6px] rounded-full flex justify-center items-center"
                >
                  <MdAddAPhoto className="w-5 h-5" />
                </button>
              </div>
              <div className="flex md:block flex-col justify-center items-center">
                <div className="flex justify-start items-center gap-4">
                  <div className="flex justify-start items-start gap-2">
                    <h1 className="text-[36px] md:text-[38px] leading-none">
                      {profile?.fullName}
                    </h1>
                    <Image
                      src="/homeCard/verified.png"
                      width={100}
                      height={100}
                      alt="cover image"
                      className="w-5 h-5"
                    />
                  </div>
                  <p className="text-[#F5B849]  md:text-[18px] font-semibold flex justify-start items-center gap-1 !m-0">
                    <span>{profile?.avgrating}</span>
                    <GoStarFill className="w-5 h-5" />
                  </p>
                </div>
                {profile?.role === "agent" && (
                  <h1 className="text-[26px] font-semibold leading-none hover:underline underline-offset-4 text-[#8920AD] uppercase">
                    {profile?.companyName}
                  </h1>
                )}
                {profile?._id !== myId && (
                  <div className="flex justify-start items-center gap-3 mt-2">
                    {isFollow === true ? (
                      <button
                        type="button"
                        onClick={() => handleUnFollowClick(profile)}
                        className="bg-[#615DFA] text-white !w-[100px] py-[6px] rounded-md text-[14px] font-medium hover:bg-[#615DFA]/70 flex justify-center items-center gap-2"
                      >
                        <BsJournalBookmarkFill className="w-5 h-5" /> Unfollow
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleFollowClick(profile)}
                        className="bg-[#615DFA] text-white !w-[100px] py-[6px] rounded-md text-[14px] font-medium hover:bg-[#615DFA]/70 flex justify-center items-center gap-2"
                      >
                        <BsJournalBookmarkFill className="w-5 h-5" /> Follow
                      </button>
                    )}
                    <button className="bg-[#615DFA] text-white !w-[100px] py-[6px] rounded-md text-[14px] font-medium hover:bg-[#615DFA]/70 flex justify-center items-center gap-2">
                      {" "}
                      <SiImessage className="w-5 h-5" /> Massage
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* tab menu  */}
          <div className="h-[60px] mt-4 border-t-[1px] border-b-[1px]">
            <ul className="flex justify-center md:justify-start h-full">
              {["Posts", "About", "Photos", "Videos"].map((tab) => (
                <li
                  key={tab}
                  className={`cursor-pointer flex justify-center items-center px-4 text-[14px] font-bold ${
                    activeTab === tab
                      ? "border-b-2 border-b-[#615DFA] transition duration-300"
                      : "hover:bg-[#ecececc2] transition duration-300"
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-[#EFF4FB] py-10 px-[5px]">
        <div className="container">{renderTabContent()}</div>
      </div>
    </div>
  );
}
