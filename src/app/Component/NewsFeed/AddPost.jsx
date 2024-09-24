import React, { useEffect, useRef, useState } from "react";
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
import VideoPdf from "./VideoPdf";
import axios from "axios";
const AddPost = ({
  setTitle,
  title,
  setDescription,
  description,
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
  titleError,
  postType,
  towersorBuildingName,
  descriptionError,
  locationError,
  towersorBuildingNameError,
  propertyCategoryError,
  propertyTypeError,
  tagsError,
  media,
  setmedia,
  files,
  setFiles,
}) => {
  const elementRef = useRef(null);
  const videoRefs = useRef([]);
  const [imageUploading, setImageUploading] = useState({});
  const [videoUploading, setVideoUploading] = useState({});
  const [pdfUploading, setPdfUploading] = useState({});
  const sortedFiles = [
    ...files.filter((file) => file.type === "image"),
    ...files.filter((file) => file.type === "video"),
    ...files.filter((file) => file.type === "pdf"),
  ];
  console.log(sortedFiles);
  console.log(media);
  console.log(files);

  const handleVideoClick = (index) => {
    if (videoRefs.current[index]) {
      if (videoRefs.current[index].paused) {
        videoRefs.current[index].play();
      } else {
        videoRefs.current[index].pause();
      }
    }
  };

  const handleFileDelete = (fileId) => {
    console.log(fileId);
    // Filter out the file with the specified _id
    setFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
    setmedia((prevMedia) => prevMedia.filter((media) => media._id !== fileId));
  };

  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedTower, setSelectedTower] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;
  const containerRefTowerResult = useRef(null);
  useEffect(() => {
    fetchTower();
  }, [search, page]);
  const fetchTower = async () => {
    setIsFetching(true);
    try {
      const response = await axios.get(
        `https://q2p08zg4-4000.asse.devtunnels.ms/country/tower`,
        {
          params: {
            search,
            page,
            limit,
          },
        }
      );
      const newTower = response.data;
      setHasMore(newTower.length === limit);
      setFilteredSuggestions((prevTower) => {
        return page === 1 ? newTower : [...prevTower, ...newTower];
      });
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleInputTowerChange = (e) => {
    const searchTerm = e.target.value;
    setSearch(searchTerm);
    setSelectedTower(searchTerm);
    setTowersorBuildingName(searchTerm);
    setPage(1); // Reset to first page on search change
    setFilteredSuggestions([]); // Clear current companies
    setHasMore(true); // Reset hasMore when search changes
  };

  const handleTowerChange = (tower) => {
    setSelectedTower(tower.name);
    setTowersorBuildingName(tower.name);
    setShowSuggestions(false);
  };

  const handleScroll = () => {
    const container = containerRefTowerResult.current;
    if (
      container.scrollTop + container.clientHeight >=
        container.scrollHeight - 5 &&
      !isFetching &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1); // Increment page when user scrolls to the bottom
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
      <div>
        {sortedFiles.length > 0 && (
          <div
            className="mt-[10px] p-[10px] flex justify-start items-center gap-2 overflow-x-auto scrollbar scrollbar-thumb-blue-500 scrollbar-track-blue-200"
            ref={elementRef}
          >
            {sortedFiles.map((file, index) => {
              return (
                <div key={index} className="relative flex-shrink-0">
                  {file?.type === "image" && (
                    <div className="relative flex-shrink-0">
                      <Image
                        width={1000}
                        height={120}
                        className={`w-auto h-[80px] rounded- ${
                          Object.keys(imageUploading).length !== 0 &&
                          imageUploading[file?._id] < 100
                            ? "blur-sm"
                            : ""
                        }`}
                        src={file?.url}
                        alt={`Uploaded ${index}`}
                      />
                      <CgClose
                        className="bg-red-500 text-white p-[2px] rounded-full absolute -top-1 -left-1 cursor-pointer"
                        onClick={() => handleFileDelete(file?._id)}
                      />
                      {Object.keys(imageUploading).length !== 0 && (
                        <div class="absolute inset-0 flex items-center justify-center">
                          <div class="relative size-5">
                            <svg
                              class="size-full"
                              width="36"
                              height="36"
                              viewBox="0 0 36 36"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="18"
                                cy="18"
                                r="16"
                                fill="none"
                                class="stroke-current text-gray-200 dark:text-neutral-700"
                                stroke-width="2"
                              ></circle>
                              <g class="origin-center -rotate-90 transform">
                                <circle
                                  cx="18"
                                  cy="18"
                                  r="16"
                                  fill="none"
                                  class="stroke-current text-blue-600 dark:text-blue-500"
                                  stroke-width="2"
                                  stroke-dasharray="100"
                                  stroke-dashoffset={
                                    Object.keys(imageUploading).length !== 0 &&
                                    imageUploading[file?._id]
                                  }
                                ></circle>
                              </g>
                            </svg>
                            <div class="absolute top-[8.5px] start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                              {Object.keys(imageUploading).length !== 0 &&
                              imageUploading[file?._id] < 100 ? (
                                <span class="text-center text-[5.5px] font-bold text-blue-800 dark:text-white">
                                  {imageUploading[file?._id]}%
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {file.type === "video" && (
                    <div className="relative flex-shrink-0">
                      <video
                        width="200"
                        className={`rounded-md cursor-pointer w-auto h-[80px] ${
                          Object.keys(videoUploading).length !== 0 &&
                          videoUploading[file?._id] < 100
                            ? "blur-sm"
                            : ""
                        }`}
                        ref={(el) => (videoRefs.current[index] = el)}
                        onClick={() => handleVideoClick(index)}
                      >
                        <source src={file.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <CgClose
                        className="bg-red-500 text-white p-[2px] rounded-full absolute -top-1 -left-1 cursor-pointer"
                        onClick={() => handleFileDelete(file._id)}
                      />
                      {Object.keys(videoUploading).length !== 0 && (
                        <div class="absolute inset-0 flex items-center justify-center z-10">
                          <div class="relative size-5">
                            <svg
                              class="size-full"
                              width="36"
                              height="36"
                              viewBox="0 0 36 36"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="18"
                                cy="18"
                                r="16"
                                fill="none"
                                class="stroke-current text-gray-200 dark:text-neutral-700"
                                stroke-width="2"
                              ></circle>
                              <g class="origin-center -rotate-90 transform">
                                <circle
                                  cx="18"
                                  cy="18"
                                  r="16"
                                  fill="none"
                                  class="stroke-current text-blue-600 dark:text-blue-500"
                                  stroke-width="2"
                                  stroke-dasharray="100"
                                  stroke-dashoffset={
                                    Object.keys(videoUploading).length !== 0 &&
                                    videoUploading[file?._id]
                                  }
                                ></circle>
                              </g>
                            </svg>
                            <div class="absolute top-[8.5px] start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                              {Object.keys(videoUploading).length !== 0 &&
                              videoUploading[file?._id] < 100 ? (
                                <span class="text-center text-[5.5px] font-bold text-blue-800 dark:text-white">
                                  {videoUploading[file?._id]}%
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  {file.type === "pdf" && (
                    <div className="relative flex-shrink-0">
                      <iframe
                        width={100}
                        height={80}
                        src={file.url}
                        title={`PDF Viewer ${index}`}
                        className={`scroll-mr-0 rounded-md w-[110px] h-[80px] ${
                          Object.keys(pdfUploading).length !== 0 &&
                          pdfUploading[file?._id] < 100
                            ? "blur-sm"
                            : ""
                        }`}
                      ></iframe>
                      <CgClose
                        className="bg-red-500 text-white p-[2px] rounded-full absolute -top-1 -left-1 cursor-pointer"
                        onClick={() => handleFileDelete(file._id)}
                      />
                      {Object.keys(pdfUploading).length !== 0 && (
                        <div class="absolute inset-0 flex items-center justify-center">
                          <div class="relative size-5">
                            <svg
                              class="size-full"
                              width="36"
                              height="36"
                              viewBox="0 0 36 36"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle
                                cx="18"
                                cy="18"
                                r="16"
                                fill="none"
                                class="stroke-current text-gray-200 dark:text-neutral-700"
                                stroke-width="2"
                              ></circle>
                              <g class="origin-center -rotate-90 transform">
                                <circle
                                  cx="18"
                                  cy="18"
                                  r="16"
                                  fill="none"
                                  class="stroke-current text-blue-600 dark:text-blue-500"
                                  stroke-width="2"
                                  stroke-dasharray="100"
                                  stroke-dashoffset={
                                    Object.keys(pdfUploading).length !== 0 &&
                                    pdfUploading[file?._id]
                                  }
                                ></circle>
                              </g>
                            </svg>
                            <div class="absolute top-[8.5px] start-1/2 transform -translate-y-1/2 -translate-x-1/2">
                              {Object.keys(pdfUploading).length !== 0 &&
                              pdfUploading[file?._id] < 100 ? (
                                <span class="text-center text-[5.5px] font-bold text-blue-800 dark:text-white">
                                  {pdfUploading[file?._id]}%
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
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
                      Rent
                    </button>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </>
          </div>
          <div className="col-span-5 flex items-center gap-3 ml-3">
            <VideoPdf
              files={files}
              setFiles={setFiles}
              media={media}
              setmedia={setmedia}
              setImageUploading={setImageUploading}
              setVideoUploading={setVideoUploading}
              setPdfUploading={setPdfUploading}
            />
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
              onChange={handleInputTowerChange}
              onClick={() => setShowSuggestions(true)}
              value={towersorBuildingName}
              placeholder={
                towersorBuildingNameError === ""
                  ? "Building/Tower name..."
                  : towersorBuildingNameError
              }
            />
            <Tooltip title="Tower" arrow placement="top-start">
              <button className="absolute top-1/2 right-2 z-30 transform -translate-y-1/2">
                <GiTowerBridge className="text-blue-600 w-6 h-6" />
              </button>
            </Tooltip>
            {showSuggestions && (
              <div
                onMouseLeave={() => setShowSuggestions(false)}
                ref={containerRefTowerResult}
                onScroll={handleScroll}
                className="font-noto absolute top-full bg-white border shadow-lg max-w-[350px] pb-[11px] rounded-b-[10px] py-[10px] transition-all ease-in-out duration-500 opacity-100 z-50 rounded-[7px] h-[180px] overflow-auto"
              >
                <div>
                  {filteredSuggestions?.length > 0 &&
                    filteredSuggestions.map((tower, i) => (
                      <p
                        key={i}
                        onClick={() => handleTowerChange(tower)}
                        className="font-noto font-normal cursor-pointer text-[#95004A] text-[14px] leading-[36px] w-[360px] h-[30px] hover:bg-[#EBEBEB] flex items-center pt-[1px] pl-[20px] mb-[3px] left-0 right-0"
                      >
                        {tower.name}
                      </p>
                    ))}
                  {isFetching === false && filteredSuggestions.length === 0 && (
                    <p className="font-noto font-normal text-[#95004A] text-[14px] leading-[36px] w-[332px] h-[30px] flex items-center pt-[6px] pl-[20px] mb-[3px]">
                      No tower found
                    </p>
                  )}
                  {isFetching && (
                    <p className="font-noto font-normal text-[#95004A] text-[14px] leading-[36px] w-[332px] h-[30px] flex items-center pt-[6px] pl-[20px] mb-[3px]">
                      Loading...
                    </p>
                  )}
                </div>
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
