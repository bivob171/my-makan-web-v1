import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiCommentDetail, BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa6";
import { GoStarFill } from "react-icons/go";

const PackageCard = ({ item, hasId, formatDate, getTagStyles }) => {
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
                    // src={agentId?.image}
                    src="/media/figure/author_5.jpg"
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
              <div className=" -mb-[20px] md:-mb-2">
                <div className="flex justify-start items-center">
                  {item.role === "buyer" ? (
                    <p className="hover:underline underline-offset-4 text-[#8920AD] text-[13px] md:text-[16px] font-medium mb-2 md:mb-2 mr-2">
                      Buyer From{" "}
                      <span className="text-[#E6533C]">
                        {" "}
                        Mohammed Bin Rashid City, Dubai
                      </span>
                    </p>
                  ) : (
                    <p className="hover:underline underline-offset-4 text-[#8920AD] text-[13px] md:text-[18px] font-medium mb-2 md:mb-2 mr-2">
                      Rapid Properties
                    </p>
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
                      4.5
                    </p>
                    <p className="text-[#F5B849] text-[0.875rem] font-semibold">
                      <GoStarFill />
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center mt-[2px] ">
                <div>
                  <p className="text-[#8C9097] text-[10px] md:text-[0.8rem]">
                    {/* {formatDate(createdAt)} */}5 July 2024 at 11:46 am
                  </p>
                </div>
                <div>
                  <p className="hover:underline underline-offset-1 text-[#49B6F5] text-[12px] font-medium ml-1">
                    {/* {location?.city} */}
                    Mohammed Bin Rashid City, Dubai
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
          <div className="text-end">
            <p className="leading-normal text-[0.825rem] md:text-[1rem] text-red-500 ps-4 font-semibold -mb-[1px]">
              {/* {item?.postType} */}
              Required
            </p>
            <span className="leading-normal text-[0.755rem] md:text-[0.8rem] sm:block align-right text-end text-black font-medium">
              For
              {/* {item?.for} */}
              Rent
            </span>
          </div>
        </div>
        <div className="h-[0.5px] w-full bg-[#F0F1F7] mt-[20px]"></div>
        <div className="px-[15px] mt-[7px]">
          <div>
            <p className="font-inter text-[0.875rem] md:text-[1.5rem] text-[#333335] font-semibold mb-2 leading-[40px]">
              {/* {item?.title} */}
              MAG City
            </p>
            {item?.description?.length > 132 ? (
              <p className="font-inter text-[#333335] text-[14px] md:!text-[17px] font-normal leading-[20px]">
                {item?.description.slice(0, 133)}...
                <Link
                  href={`${
                    item.role === "agent"
                      ? "/user/agent-post-details"
                      : "/user/buyer-post-details"
                  }/${item._id}`}
                >
                  <span className="hover:underline underline-offset-1 text-[#49B6F5] text-[14px] md:!text-[17px] font-medium cursor-pointer font-inter">
                    see more
                  </span>
                </Link>
              </p>
            ) : (
              <p className="font-inter text-[#333335] text-[14px] md:!text-[17px] font-normal  leading-[20px]">
                {item?.description}...
                <Link
                  href={`${
                    item.role === "agent"
                      ? "/user/agent-post-details"
                      : "/user/buyer-post-details"
                  }/${item._id}`}
                >
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
            <button className="bg-[#F2EEFC] p-[13px] rounded flex items-center">
              <p className="text-[15px] font-medium font-inter text-[#26BF94] -mb-[1px]">
                {" "}
                <FaRegComment className="w-4 h-4 md:w-5 md:h-5" />
              </p>
            </button>
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

export default PackageCard;
