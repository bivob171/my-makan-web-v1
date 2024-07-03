import React from "react";
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

const AddPost = ({
  setTitle,
  setDescription,
  handleImageDelete,
  handleImageChange,
  image,
  setLocation,
  setCategory,
  setAgent,
  tags,
  setTags,
  nextPanel,
}) => {
  return (
    <>
      <div>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          className="w-full outline-[#999] outline-1 border-none bg-none px-3 h-[45px] text-[14px] placeholder:text-[14px] text-[#555] font-medium rounded-md"
          placeholder="Post title"
        />
      </div>
      <div>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          className="w-full outline-[#999] outline-1 border-none bg-none px-3 py-3 text-[22px] placeholder:text-[22px] text-[#444] font-normal rounded-md !resize-none"
          placeholder="Write your thoughts!"
          rows="4"
        />
      </div>
      {image ? (
        <div className="relative">
          <Image
            width={1000}
            height={120}
            className="w-auto h-[80px] rounded-md mb-2"
            src={image}
            alt="Selected"
          />
          <CgClose
            className="bg-red-500 text-white p-[2px] rounded-full absolute -top-1 -left-1 cursor-pointer"
            onClick={handleImageDelete}
          />
        </div>
      ) : (
        ""
      )}
      <Input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
        id="image-input"
      />

      <div className="grid grid-cols-7">
        <div className="col-span-2 grid grid-cols-2 gap-3">
          <div className="relative">
            <Input
              className={clsx(
                "block w-full rounded-md border-[1px] outline-1 outline-[#999] bg-white py-1.5 px-3 text-sm/6 text-[#444]"
              )}
              placeholder="Price"
            />
            <TbCurrencyTaka className="absolute top-1/2 right-2 transform -translate-y-1/2" />
          </div>
          <div className="relative">
            <Input
              className={clsx(
                "block w-full rounded-md border-[1px] outline-1 outline-[#999] bg-white py-1.5 px-3 text-sm/6 text-[#444]"
              )}
              placeholder="Sqft"
            />
            <MdOutlineSquareFoot className="absolute top-1/2 right-2 transform -translate-y-1/2" />
          </div>
        </div>
        <div className="col-span-5 flex items-center gap-3 ml-3">
          <div className="relative w-full !max-w-[180px]">
            <Select
              onChange={(e) => setCategory(e.target.value)}
              className={clsx(
                "block w-full appearance-none rounded-md border-none bg-[#ededed] py-1.5 px-3 text-sm/6 text-[#444] cursor-pointer",
                "focus:outline-none data-[focus]:outline-none",
                "*:text-[#444]"
              )}
            >
              <option value="sell">Required</option>
              <option value="rent">Available</option>
            </Select>

            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
              aria-hidden="true"
            />
          </div>
          <span>for</span>
          <div className="relative  w-full !max-w-[180px]">
            <Select
              onChange={(e) => setAgent(e.target.value)}
              className={clsx(
                "block w-full appearance-none rounded-md border-none bg-[#ededed] py-1.5 px-3 text-sm/6 text-[#444] cursor-pointer",
                "focus:outline-none data-[focus]:outline-none",
                "*:text-[#444]"
              )}
            >
              <option value="buyer">Sale</option>
              <option value="seller">Rent</option>
            </Select>
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
              aria-hidden="true"
            />
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
            <Tooltip title="Video" arrow placement="top-start">
              <button>
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
            <Tooltip title="File" arrow placement="top-start">
              <button>
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
                "block w-full rounded-md border-[1px] outline-1 outline-[#999] bg-white py-1.5 px-3 text-sm/6 text-[#444]"
              )}
              placeholder="Click on map"
              disabled
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
        <div className="my-3 ">
          <label htmlFor="" className="font-semibold">
            Building/Tower name
          </label>
          <div className="relative">
            <Input
              className={clsx(
                "block w-full rounded-md border-[1px] outline-1 outline-[#999] bg-white py-1.5 px-3 text-sm/6 text-[#444]"
              )}
              placeholder="Building/Tower name..."
            />
            <Tooltip title="Tower" arrow placement="top-start">
              <button className="absolute top-1/2 right-2 z-30 transform -translate-y-1/2">
                <GiTowerBridge className="text-blue-600 w-6 h-6" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <PropertyCategory />
        <PropertyType />
        <Parking />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <SaleTypeTag />
        <TagSelect />
      </div>
    </>
  );
};

export default AddPost;
