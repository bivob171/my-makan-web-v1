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
  const renderTabContent = () => {
    switch (activeTab) {
      case "Posts":
        return (
          <ProfilePostTab profileId={params.profileId} profile={profile} />
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
    const endpoint = `https://q4m0gph5-4000.asse.devtunnels.ms/agent/${userId}`;
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
  }, [userId]);
  // image update
  const [error, setError] = useState("");
  console.log(error);
  const [uploading, setUploading] = useState(false);
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
    setUploading(true);
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    try {
      const response = await axios.post(
        `https://q4m0gph5-4000.asse.devtunnels.ms/file-upload/upload`,
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
      setUploading(false); // Reset uploading state after upload attempt (whether success or failure)
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
        `https://q4m0gph5-4000.asse.devtunnels.ms/file-upload/upload`,
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
          ? `https://q4m0gph5-4000.asse.devtunnels.ms/user/update-profile`
          : `https://q4m0gph5-4000.asse.devtunnels.ms/agent/update-profile`;

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
      console.error("", error);
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
          ? `https://q4m0gph5-4000.asse.devtunnels.ms/user/update-profile`
          : `https://q4m0gph5-4000.asse.devtunnels.ms/agent/update-profile`;

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
      lo;
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

  return (
    <div>
      <div className="page-content bg-[white] shadow-sm !pt-[100px]">
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
              <Image
                src={selectedCoverImage}
                width={1000}
                height={1000}
                alt="cover image"
                className="w-full h-[350px] object-cover object-top rounded-b-lg"
              />
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
            <div className="flex justify-start items-end gap-3 -mt-10 px-10">
              <div className="relative w-[180px] h-[180px] border-4 border-[#dbdbdb] rounded-full">
                <Image
                  src={selectedImage}
                  width={1000}
                  height={1000}
                  alt="profile image"
                  className="w-full h-full object-cover object-top rounded-full shadow-md"
                />
                {profile?._id === myId && (
                  <button
                    type="button"
                    onClick={() =>
                      document.getElementById("upload-profile").click()
                    }
                    className="absolute bottom-1 right-0 bg-[#dbdbdb] p-[6px] rounded-full flex justify-center items-center"
                  >
                    <MdAddAPhoto className="w-5 h-5" />
                  </button>
                )}
              </div>
              <div>
                <div className="flex justify-start items-center gap-4">
                  <div className="flex justify-start items-start gap-2">
                    <h1 className="text-[42px] leading-none">
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
                  <p className="text-[#F5B849] text-[18px] font-semibold flex justify-start items-center gap-1 !m-0">
                    <span>{profile?.avgrating}</span>
                    <GoStarFill className="w-5 h-5" />
                  </p>
                </div>
                <h1 className="text-[28px] font-semibold leading-none hover:underline underline-offset-4 text-[#8920AD] uppercase">
                  {profile?.companyName}
                </h1>
              </div>
            </div>
          </div>
          {/* tab menu  */}
          <div className="h-[60px] mt-4 border-t-[1px] border-b-[1px]">
            <ul className="flex h-full">
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
      <div className="bg-[#EFF4FB] my-10">
        <div className="page-content !pt-0">
          <div className="container">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
}
