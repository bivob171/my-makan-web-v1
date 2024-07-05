import React, { useEffect, useState } from "react";
import { Input, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import TagSelect from "./TagSelect";
import Image from "next/image";
import { CgClose } from "react-icons/cg";
import { Tooltip } from "@mui/material";
import PropertyCategory from "./PropartyCategory";
import SaleTypeTag from "./SaleTypeTag";
import PropertyType from "./PropertyType";
import Parking from "./Parking";
import { FaMapLocationDot } from "react-icons/fa6";
import { TbCurrencyTaka } from "react-icons/tb";
import { MdOutlineSquareFoot } from "react-icons/md";
import { GiTowerBridge } from "react-icons/gi";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
const AddPost = ({
  setTitle,
  title,
  setDescription,
  description,
  handleImageDelete,
  handleImageChange,
  image,
  setPropertyCategory,
  propertyCategoryName,
  setPropertyType,
  propertyTypeName,
  setParking,
  parking,
  setForPost,
  forPost,
  setPrice,
  price,
  setSqft,
  sqft,
  setPostType,
  tags,
  setTags,
  sellType,
  setSellType,
  nextPanel,
  setTowersorBuildingName,
  formatted_address,
  video,
  propertyDocument,
  titleError,
  postType,
  towersorBuildingName,
  descriptionError,
  locationError,
  towersorBuildingNameError,
  propertyCategoryError,
  propertyTypeError,
  tagsError,
  imageUploading,
  handleVideoChange,
  handleVideoDelete,
  handleDocumentChange,
  handleDocumentDelete,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const towerNames = [
    "Empire State Building",
    "Burj Khalifa",
    "Shanghai Tower",
    "Eiffel Tower",
    "CN Tower",
  ];

  useEffect(() => {
    const filtered = towersorBuildingName
      ? towerNames.filter((name) =>
          name.toLowerCase().includes(towersorBuildingName.toLowerCase())
        )
      : [];
    setFilteredSuggestions(filtered);
    setShowSuggestions(filtered.length > 0);
    setActiveSuggestionIndex(0);
  }, [towersorBuildingName]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      if (activeSuggestionIndex < filteredSuggestions.length - 1) {
        setActiveSuggestionIndex(activeSuggestionIndex + 1);
      }
    } else if (e.key === "ArrowUp") {
      if (activeSuggestionIndex > 0) {
        setActiveSuggestionIndex(activeSuggestionIndex - 1);
      }
    } else if (e.key === "Enter") {
      setTowersorBuildingName(filteredSuggestions[activeSuggestionIndex]);
      setShowSuggestions(false);
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={
            titleError === ""
              ? "w-full outline-[#999] outline-1 border-none bg-none px-3 h-[45px] text-[14px] placeholder:text-[14px] text-[#555] font-medium rounded-md"
              : "border-[1px] border-rose-600 w-full outline-[#999] outline-1 bg-none px-3 h-[45px] text-[14px] placeholder:text-[14px] placeholder:text-rose-600 font-medium rounded-md"
          }
          placeholder={titleError === "" ? "Post title" : titleError}
        />
      </div>
      <div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={
            descriptionError === ""
              ? "w-full outline-[#999] outline-1 border-none bg-none px-3 py-3 text-[22px] placeholder:text-[22px] text-[#444] font-normal rounded-md !resize-none"
              : "w-full outline-[#999] outline-1 border-[1px] border-rose-600 bg-none px-3 py-3 text-[22px] placeholder:text-[20px] mt-[4px] placeholder:text-rose-600 font-normal rounded-md !resize-none"
          }
          placeholder={
            descriptionError === "" ? "Write your thoughts!" : descriptionError
          }
          rows="4"
        />
      </div>
      <div className="w-full  flex gap-x-[20px] overflow-x-scroll">
        <div>
          {image?.length > 0 && (
            <div className="w-full flex gap-x-[10px] overflow-x-auto">
              {image.map((img, i) => {
                return (
                  <div key={i} className="relative">
                    <Image
                      width={1000}
                      height={120}
                      className="w-auto h-[80px] rounded-md mb-2"
                      src={img}
                      alt="Selected"
                    />
                    <CgClose
                      className="bg-red-500 text-white p-[2px] rounded-full absolute -top-0 -left-[0px] cursor-pointer"
                      onClick={() => handleImageDelete(i)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div>
          {video?.length > 0 && (
            <div className="w-full flex gap-x-[10px] overflow-x-auto">
              {video.map((vdo, i) => {
                return (
                  <div key={i} className="relative">
                    <video width={80} height={80} controls="">
                      <source src={vdo} type="video/mp4" />
                      <source src={vdo} type="video/ogg" />
                    </video>
                    <CgClose
                      className="bg-red-500 text-white p-[2px] rounded-full absolute -top-0 -left-[0px] cursor-pointer"
                      onClick={() => handleVideoDelete(i)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div>
          {propertyDocument?.length > 0 && (
            <div className="w-full flex gap-x-[10px] overflow-x-auto">
              {propertyDocument.map((doc, i) => {
                return (
                  <div key={i} className="relative">
                    <iframe
                      className="object-cover w-[80px] h-[80px] rounded-sm"
                      width="70"
                      height="70"
                      src={doc}
                    ></iframe>
                    <CgClose
                      className="bg-red-500 text-white p-[2px] rounded-full absolute -top-0 -left-[0px] cursor-pointer"
                      onClick={() => handleDocumentDelete(i)}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {imageUploading !== null && (
        <div className="w-full ">
          <div className="mb-8">
            <div className="bg-stroke dark:bg-dark-3 relative h-4 w-full rounded-2xl">
              <div
                className="bg-primary absolute top-0 left-0 flex h-full items-center justify-center rounded-2xl text-xs font-semibold text-white"
                style={{ width: `${imageUploading}%` }}
              >
                {imageUploading}%
              </div>
            </div>
          </div>
        </div>
      )}

      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        style={{ display: "none" }}
        id="image-input"
      />
      <input
        type="file"
        accept="video/*"
        onChange={handleVideoChange}
        style={{ display: "none" }}
        id="video-input"
      />
      <input
        type="file"
        accept=".pdf"
        onChange={handleDocumentChange}
        style={{ display: "none" }}
        id="document-input"
      />

      <div className="grid grid-cols-7">
        <div className="col-span-2 grid grid-cols-2 gap-3">
          <div className="relative">
            <Input
              className={clsx(
                "block w-full rounded-md border-[1px] outline-1 outline-[#999] bg-white py-1.5 px-3 text-sm/6 text-[#444]"
              )}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              value={price}
            />
            <TbCurrencyTaka className="absolute top-1/2 right-2 transform -translate-y-1/2" />
          </div>
          <div className="relative">
            <Input
              className={clsx(
                "block w-full rounded-md border-[1px] outline-1 outline-[#999] bg-white py-1.5 px-3 text-sm/6 text-[#444]"
              )}
              onChange={(e) => setSqft(e.target.value)}
              placeholder="Sqft"
              value={sqft}
            />
            <MdOutlineSquareFoot className="absolute top-1/2 right-2 transform -translate-y-1/2" />
          </div>
        </div>
        <div className="col-span-5 flex items-center gap-3 ml-3">
          <div className="relative w-full !max-w-[180px]">
            <>
              <Menu>
                <MenuButton className="inline-flex justify-between items-center gap-1 rounded-md bg-[#ededed] py-1.5 px-3 text-[14px] placeholder:text-[14px] font-medium text-[#333] shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#ededed] data-[open]:bg-[#ededed] data-[focus]:outline-1 data-[focus]:outline-white w-full">
                  {postType}

                  <ChevronDownIcon className="size-3 fill-[#333]" />
                </MenuButton>

                <MenuItems
                  transition
                  anchor="bottom start"
                  className="w-full !max-w-[180px] origin-top-left rounded-md border bg-[#ededed] text-[#444] mt-[2px] text-[14px] placeholder:text-[14px] font-medium transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 relative z-50 "
                >
                  <MenuItem>
                    <button
                      className="group flex w-full items-center gap-2 rounded-md py-[3px] px-2 data-[focus]:bg-white/10"
                      onClick={() => setPostType("Available")}
                    >
                      Available
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      className="group flex w-full items-center gap-2 rounded-md py-[3px] px-2 data-[focus]:bg-white/10"
                      onClick={() => setPostType("Required")}
                    >
                      Required
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </>
          </div>
          <span>for</span>
          <div className="relative  w-full !max-w-[180px]">
            <>
              <Menu>
                <MenuButton className="inline-flex justify-between items-center gap-1 rounded-md bg-[#ededed] py-1.5 px-3 text-[14px] placeholder:text-[14px] font-medium text-[#333] shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#ededed] data-[open]:bg-[#ededed] data-[focus]:outline-1 data-[focus]:outline-white w-full">
                  {forPost}

                  <ChevronDownIcon className="size-3 fill-[#333]" />
                </MenuButton>

                <MenuItems
                  transition
                  anchor="bottom start"
                  className="w-full !max-w-[180px] origin-top-left rounded-md border bg-[#ededed] text-[#444] mt-[2px] text-[14px] placeholder:text-[14px] font-medium transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 relative z-50 "
                >
                  <MenuItem>
                    <button
                      className="group flex w-full items-center gap-2 rounded-md py-[3px] px-2 data-[focus]:bg-white/10"
                      onClick={() => setForPost("Sell")}
                    >
                      Sell
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      className="group flex w-full items-center gap-2 rounded-md py-[3px] px-2 data-[focus]:bg-white/10"
                      onClick={() => setForPost("Rent")}
                    >
                      Required
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </>
          </div>
          <div className="col flex justify-between items-center gap-2">
            <Tooltip title="Image" arrow placement="top-start">
              <button
                type="button"
                onClick={() => document.getElementById("image-input").click()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-blue-400 hover:drop-shadow-lg hover:shadow-blue-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
              </button>
            </Tooltip>
            <Tooltip title="Upload Video Under 30 MB" arrow placement="top-end">
              <button
                type="button"
                onClick={() => document.getElementById("video-input").click()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-yellow-400 hover:drop-shadow-lg hover:shadow-blue-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </button>
            </Tooltip>
            <Tooltip title="Upload pdf File" arrow placement="top-end">
              <button
                type="button"
                onClick={() =>
                  document.getElementById("document-input").click()
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 text-green-400 hover:drop-shadow-lg hover:shadow-blue-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
                  />
                </svg>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="mt-3 ">
          <label htmlFor="" className="font-semibold">
            Select Location from map
          </label>
          <div className="relative">
            {/* select map location show field  */}
            <Input
              className={clsx(
                locationError === ""
                  ? "block w-full rounded-md border-[1px] outline-1 outline-[#999] bg-white py-1.5 px-3 text-sm/6 text-[#444]"
                  : "block w-full rounded-md border-[1px] border-rose-600 outline-1 outline-[#999] bg-white py-1.5 px-3 text-sm/6 placeholder:text-rose-600"
              )}
              placeholder={
                locationError === "" ? "Click on map" : locationError
              }
              value={formatted_address}
              readOnly
            />
            {/* click on map button  */}
            <Tooltip title="Click me" arrow placement="top-start">
              <button
                onClick={nextPanel}
                className="absolute top-1/2 right-2 z-30 transform -translate-y-1/2"
              >
                <FaMapLocationDot className="text-red-600 w-6 h-6" />
              </button>
            </Tooltip>
          </div>
        </div>
        <div className="my-3">
          <label htmlFor="" className="font-semibold">
            Building/Tower name
          </label>
          <div className="relative">
            <Input
              className={clsx(
                towersorBuildingNameError === ""
                  ? "block w-full rounded-md border-[1px] outline-1 outline-[#999] bg-white py-1.5 px-3 text-sm/6 text-[#444]"
                  : "block w-full rounded-md border-[1px] border-rose-600  outline-1 outline-[#999] bg-white py-1.5 px-3 text-sm/6 placeholder:text-rose-600"
              )}
              onChange={(e) => setTowersorBuildingName(e.target.value)}
              value={towersorBuildingName}
              placeholder={
                towersorBuildingNameError === ""
                  ? "Building/Tower name..."
                  : towersorBuildingNameError
              }
              onKeyDown={handleKeyDown}
            />
            <Tooltip title="Tower" arrow placement="top-start">
              <button className="absolute top-1/2 right-2 z-30 transform -translate-y-1/2">
                <GiTowerBridge className="text-blue-600 w-6 h-6" />
              </button>
            </Tooltip>
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 z-20">
                {filteredSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={clsx(
                      "px-3 py-1 cursor-pointer",
                      index === activeSuggestionIndex ? "bg-gray-200" : ""
                    )}
                    onMouseDown={() => {
                      setTowersorBuildingName(suggestion);
                      setShowSuggestions(false);
                    }}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <PropertyCategory
          setPropertyCategory={setPropertyCategory}
          propertyCategoryName={propertyCategoryName}
          propertyCategoryError={propertyCategoryError}
        />
        <PropertyType
          setPropertyType={setPropertyType}
          propertyTypeName={propertyTypeName}
          propertyTypeError={propertyTypeError}
        />
        <Parking setParking={setParking} parking={parking} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <SaleTypeTag setSellType={setSellType} sellType={sellType} />
        <TagSelect
          setSelectedTags={setTags}
          selectedTags={tags}
          tagsError={tagsError}
        />
      </div>
    </>
  );
};

export default AddPost;
