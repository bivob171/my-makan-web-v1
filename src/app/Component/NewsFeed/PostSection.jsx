"use client";

import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import AddPost from "./AddPost";
import { IoMdCloseCircle } from "react-icons/io";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import MapPage from "./MapPage";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { PostLocationValueContext } from "@/Context/postValueContext";
import axios from "axios";
import toast from "react-hot-toast";

const PostSection = ({ isOpen, setIsOpen }) => {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();
  const userName = user?.fullName?.split(" ")[0];
  const {
    lata,
    setLata,
    lon,
    setLon,
    formatted_address,
    setFormatted_address,
    country,
    setCountry,
    state,
    setState,
    city,
    setCity,
    title,
    setTitle,
    titleError,
    setTitleError,
    description,
    setDescription,
    descriptionError,
    setDescriptionError,
    price,
    setPrice,
    sqft,
    setSqft,
    forPost,
    setForPost,
    towersorBuildingName,
    setTowersorBuildingName,
    towersorBuildingNameError,
    setTowersorBuildingNameError,
    postType,
    setPostType,
    selectedType,
    setSelectedType,
    propertyCategory,
    setPropertyCategory,
    propertyTypeError,
    setPropertyTypeError,
    propertyCategoryError,
    setPropertyCategoryError,
    propertyType,
    setPropertyType,
    parking,
    setParking,
    image,
    setImage,
    video,
    setVideo,
    propertyDocument,
    setPropertyDocument,
    tags,
    setTags,
    tagsError,
    setTagsError,
    locationError,
    setLocationError,
    sellType,
    setSellType,
  } = useContext(PostLocationValueContext);
  const [imageUploading, setImageUploading] = useState(null);
  const [currentPanel, setCurrentPanel] = useState(1);

  useEffect(() => {
    const storedImage = localStorage.getItem("selectedImage");
    if (storedImage) {
      setImage(storedImage);
    }
  }, []);

  const handleImageChange = (e) => {
    handleUpload([...e.target.files]);
  };
  const handleVideoChange = (e) => {
    const files = [...e.target.files];
    const validFiles = [];

    for (let file of files) {
      if (file.size <= 50 * 1024 * 1024) {
        // Check if the file size is under 30 MB
        validFiles.push(file);
      } else {
        toast.error(`${file.name} is larger than 30 MB`);
      }
    }

    if (validFiles.length > 0) {
      handleVideoUpload(validFiles);
    }
  };
  const handleDocumentChange = (e) => {
    const files = [...e.target.files];
    const validFiles = [];

    for (let file of files) {
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      handleDocumentUpload(validFiles);
    }
  };

  const handleUpload = async (files) => {
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/file-upload/upload",
        formData,
        {
          onUploadProgress: (data) => {
            setImageUploading(Math.round((data.loaded / data.total) * 100));
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const links = response.data.map((item) => item.Location);
      setImage((prevImages) => [...prevImages, ...links]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setImageUploading(null);
    }
  };
  const handleVideoUpload = async (files) => {
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/file-upload/upload",
        formData,
        {
          onUploadProgress: (data) => {
            setImageUploading(Math.round((data.loaded / data.total) * 100));
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const links = response.data.map((item) => item.Location);
      setVideo((prevVideos) => [...prevVideos, ...links]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setImageUploading(null);
    }
  };
  const handleDocumentUpload = async (files) => {
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/file-upload/upload",
        formData,
        {
          onUploadProgress: (data) => {
            setImageUploading(Math.round((data.loaded / data.total) * 100));
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const links = response.data.map((item) => item.Location);
      setPropertyDocument((prevDocuments) => [...prevDocuments, ...links]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setImageUploading(null);
    }
  };

  const handleImageDelete = (indexToDelete) => {
    setImage((prevImages) =>
      prevImages.filter((_, index) => index !== indexToDelete)
    );
  };
  const handleVideoDelete = (indexToDelete) => {
    setVideo((prevVideo) =>
      prevVideo.filter((_, index) => index !== indexToDelete)
    );
  };
  const handleDocumentDelete = (indexToDelete) => {
    setPropertyDocument((prevDoc) =>
      prevDoc.filter((_, index) => index !== indexToDelete)
    );
  };

  // live error manage
  useEffect(() => {
    if (title !== "") {
      setTitleError("");
    }
    if (description !== "") {
      setDescriptionError("");
    }
    if (towersorBuildingName !== "") {
      setTowersorBuildingNameError("");
    }
    if (formatted_address !== "") {
      setLocationError("");
    }
    if (tags.length !== 0) {
      setTagsError("");
    }
    if (propertyCategory !== "Property Category") {
      setPropertyCategoryError("");
    }
    if (propertyType !== "Property Type") {
      setPropertyTypeError("");
    }
  }, [
    title,
    description,
    towersorBuildingName,
    formatted_address,
    tags,
    propertyCategory,
    propertyType,
  ]);

  // post data
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      let hasError = false;

      if (title === "") {
        setTitleError("Title is required.");
        hasError = true;
      } else {
        setTitleError("");
      }
      if (description === "") {
        setDescriptionError("Description is required.");
        hasError = true;
      } else {
        setDescription("");
      }
      if (towersorBuildingName === "") {
        setTowersorBuildingNameError("Towers or Building Name is required.");
        hasError = true;
      } else {
        setTowersorBuildingNameError("");
      }
      if (formatted_address === "") {
        setLocationError("Location is required.");
        hasError = true;
      } else {
        setLocationError("");
      }
      if (tags.length === 0) {
        setTagsError("Tags is required.");
        hasError = true;
      } else {
        setTagsError("");
      }
      if (propertyCategory === "Property Category") {
        setPropertyCategoryError("Property Category required.");
        hasError = true;
      } else {
        setPropertyCategoryError("");
      }
      if (propertyType === "Property Type") {
        setPropertyTypeError("Property Type required.");
        hasError = true;
      } else {
        setPropertyTypeError("");
      }
      if (hasError) {
        return;
      }
      const postData = {
        title: title,
        description: description,
        for: forPost,
        image: image,
        video: video,
        doc: propertyDocument,
        tags: tags,
        location: {
          lat: lata,
          lng: lon,
          country: country,
          state: state,
          city: city,
          formatted_address: formatted_address,
          towersorBuildingName: towersorBuildingName,
        },
        type: selectedType,
        postType: postType,
        price: price === "" ? null : price,
        sqft: sqft === "" ? null : sqft,
        propertyCategory: propertyCategory,
        propertyType: propertyType,
        parking: parking,
        sellType: sellType,
      };

      let token;
      if (user.role === "agent") {
        token = localStorage.getItem("agentAccessToken");
      } else {
        token = localStorage.getItem("buyerAccessToken");
      }
      let apiUrl;
      if (user.role === "agent") {
        apiUrl = "http://localhost:4000/post-agent/post";
      } else {
        apiUrl = "http://localhost:4000/post-user/post";
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        toast.error(`HTTP error! Status: ${response.status}`);
      } else {
        toast.success("Post submitted successfully!");
        setIsOpen(false);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const nextPanel = () => {
    setCurrentPanel(currentPanel + 1);
  };

  const previousPanel = () => {
    setCurrentPanel(currentPanel - 1);
  };

  function close() {
    setIsOpen(false);
    setCurrentPanel(1);
  }

  return (
    <div className="newsfeed-search">
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50 backdrop-blur-sm duration-150 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel
              transition
              className="w-full max-w-3xl rounded-xl bg-[#fff] backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-[24px] font-semibold text-[#444] text-center border-b-[1.5px] py-3"
              >
                {currentPanel === 1 ? (
                  <span>Create Post</span>
                ) : (
                  <span>Select Location</span>
                )}
              </DialogTitle>
              <button
                className="absolute top-2 right-2 text-[#c7c7c7] z-30"
                onClick={close}
              >
                <IoMdCloseCircle className="hover:drop-shadow-md w-8 h-8" />
              </button>
              <div className="flex justify-start gap-[6px] mb-3 px-6 pt-1">
                <Image
                  width={40}
                  height={40}
                  alt="img"
                  src={user?.image}
                  className="w-[45px] h-[45px] rounded-full border-2"
                />
                <div>
                  <h4 className="text-[14px] text-[#666] m-0 leading-4">
                    {user?.fullName}
                  </h4>
                  <div className="">
                    <Menu>
                      <MenuButton className="inline-flex justify-center items-center gap-1 rounded-sm bg-[#ededed] py-[2px] leading-4 px-2 text-[12px] font-medium text-[#333] shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#ededed] data-[open]:bg-[#ededed] data-[focus]:outline-1 data-[focus]:outline-white">
                        {selectedType}
                        <ChevronDownIcon className="size-3 fill-[#333]" />
                      </MenuButton>

                      <MenuItems
                        transition
                        anchor="bottom start"
                        className="w-auto origin-top-left rounded-md border bg-[#ededed] text-[#444] mt-[2px] text-[12px] font-medium transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 relative z-50 "
                      >
                        <MenuItem>
                          <button
                            className="group flex w-full items-center gap-2 rounded-md py-[3px] px-2 leading-4 data-[focus]:bg-white/10"
                            onClick={() => setSelectedType("Normal")}
                          >
                            Normal
                          </button>
                        </MenuItem>
                        <MenuItem>
                          <button
                            className="group flex w-full items-center gap-2 rounded-md py-[3px] px-2 leading-4 data-[focus]:bg-white/10"
                            onClick={() => setSelectedType("Urgent")}
                          >
                            Urgent
                          </button>
                        </MenuItem>
                        <MenuItem>
                          <button
                            className="group flex w-full items-center gap-2 rounded-md py-[3px] px-2 leading-4 data-[focus]:bg-white/10"
                            onClick={() => setSelectedType("Sponsored")}
                          >
                            Sponsored
                          </button>
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                  </div>
                </div>
              </div>
              <div className="space-y-2 px-6 pb-6">
                {currentPanel === 1 && (
                  <div>
                    <AddPost
                      imageUploading={imageUploading}
                      setTitle={setTitle}
                      title={title}
                      setDescription={setDescription}
                      description={description}
                      setPrice={setPrice}
                      price={price}
                      setSqft={setSqft}
                      sqft={sqft}
                      setForPost={setForPost}
                      forPost={forPost}
                      setTowersorBuildingName={setTowersorBuildingName}
                      towersorBuildingName={towersorBuildingName}
                      setPostType={setPostType}
                      postType={postType}
                      setPropertyCategory={setPropertyCategory}
                      propertyCategoryName={propertyCategory}
                      setPropertyType={setPropertyType}
                      propertyTypeName={propertyType}
                      handleImageDelete={handleImageDelete}
                      handleImageChange={handleImageChange}
                      handleVideoChange={handleVideoChange}
                      handleVideoDelete={handleVideoDelete}
                      handleDocumentChange={handleDocumentChange}
                      handleDocumentDelete={handleDocumentDelete}
                      image={image}
                      tags={tags}
                      setTags={setTags}
                      setSellType={setSellType}
                      formatted_address={formatted_address}
                      sellType={sellType}
                      setParking={setParking}
                      parking={parking}
                      nextPanel={nextPanel}
                      video={video}
                      propertyDocument={document}
                      titleError={titleError}
                      descriptionError={descriptionError}
                      locationError={locationError}
                      towersorBuildingNameError={towersorBuildingNameError}
                      propertyCategoryError={propertyCategoryError}
                      propertyTypeError={propertyTypeError}
                      tagsError={tagsError}
                    />
                  </div>
                )}
                {currentPanel === 2 && (
                  <div>
                    <MapPage
                      setCurrentPanel={setCurrentPanel}
                      currentPanel={currentPanel}
                    />
                  </div>
                )}
                <div className="mt-2">
                  {currentPanel === 1 ? (
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      className="w-full text-[18px] font-semibold rounded-md bg-[#5854EF] py-1.5 px-6 text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#5954efef] data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-[#5854EF]"
                    >
                      Post Now
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={previousPanel}
                      className="w-full text-[18px] font-semibold rounded-md bg-[#5854EF] py-1.5 px-6 text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#5954efef] data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-[#5854EF]"
                    >
                      Previous
                    </Button>
                  )}
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PostSection;
