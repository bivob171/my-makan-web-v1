import React from "react";

import { BiCommentDetail, BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import Image from "next/image";
import houseData from "@/data/houseData";
const Blogs = () => {
  return (
    <div className="">
      <div className="grid grid-cols-1 gap-4 ">
        {houseData.map((item, i) => {
          return (
            <div
              key={i}
              className="w-full h-auto bg-white rounded-[15px] py-[25px] "
            >
              <div>
                <div className="flex justify-between px-[15px]">
                  <div className="flex gap-x-[15px] items-center h-[45px] ">
                    <div className="mb-[17px]">
                      <div className=" relative w-[40px] h-[40px]">
                        <div>
                          <Image
                            width={40}
                            height={40}
                            alt="img"
                            src="https://spruko.com/demo/tailwind/ynex/dist/assets/images/faces/11.jpg"
                            className="w-[40px] h-[40px] rounded-full"
                          />
                        </div>
                        <div className="absolute bottom-[2px] right-0 bg-white w-[10px] h-[10px] rounded-full flex items-center justify-center">
                          <Image
                            width={8}
                            height={8}
                            alt=""
                            className="pl-[]"
                            src="/homeCard/active.png"
                          />
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className=" -mb-[20px] ">
                        <div className="flex gap-x-[8px] items-center">
                          {item.rol === "Buyer" ? (
                            <p className="text-[0.875rem] text-[#8F8F8F] font-semibold">
                              Hidden Name{" "}
                            </p>
                          ) : (
                            <p className="text-[0.875rem] text-[#333335] font-semibold">
                              Jamshed Rony{" "}
                            </p>
                          )}
                          <div className="mb-[5px]">
                            <Image
                              width={15}
                              height={15}
                              alt=""
                              src="/homeCard/verified.png"
                            />
                          </div>
                          <div className="flex items-center gap-x-[5px] mt-[5px]">
                            <p className="text-[#F5B849] text-[0.875rem] font-semibold">
                              4.8
                            </p>
                            <p className="text-[#F5B849] text-[0.875rem] font-semibold">
                              <GoStarFill />
                            </p>
                          </div>
                        </div>
                      </div>
                      {item.rol === "Buyer" ? (
                        <p className="hover:underline underline-offset-4 text-[#8920AD] text-[13px] font-medium -mb-[10px]">
                          Buyer From{" "}
                          <span className="text-[#E6533C]">India</span>
                        </p>
                      ) : (
                        <p className="hover:underline underline-offset-4 text-[#8920AD] text-[13px] font-medium -mb-[10px]">
                          Rapid Properties
                        </p>
                      )}
                      <div className="flex flex-wrap items-center mt-[8px] ">
                        <div>
                          <p className="text-[#8C9097] text-[0.625rem]">
                            14 February at 19:07
                          </p>
                        </div>
                        <div className="w-[10px] h-[5px] mb-[13px]">
                          <Image
                            width={40}
                            height={2}
                            alt=""
                            className=""
                            src="/homeCard/full-stop.png"
                          />
                        </div>
                        <div>
                          <p className="hover:underline underline-offset-1 text-[#49B6F5] text-[12px] font-medium">
                            Dubai
                          </p>
                        </div>
                        <div className="w-[10px] h-[5px] mb-[16px] ml-[4px]">
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
                  <div>
                    <p className="leading-normal text-[0.825rem] text-red  ps-4 font-semibold -mb-[1px]">
                      Required
                    </p>
                    <span className="leading-normal text-[0.755rem] sm:block align-right text-end text-black font-medium">
                      For {item.sell}
                    </span>
                  </div>
                </div>
                <div className="h-[0.5px] w-full bg-[#F0F1F7] mt-[20px]"></div>
                <div className="px-[15px] mt-[7px]">
                  <div>
                    <p className="font-inter text-[0.875rem] text-[#333335] font-semibold -mb-[0px] leading-[40px]">
                      Urgent Required 2BHK For Family.
                    </p>
                    <p className="font-inter text-[#333335] text-[14px] font-normal  leading-[20px]">
                      Required Two Bedroom Hall open or Close kitchen For Rent
                      in City Tower, Ready to Move, for Family...
                      <span className="hover:underline underline-offset-1 text-[#49B6F5] text-[14px] font-medium cursor-pointer font-inter">
                        see more
                      </span>
                    </p>
                  </div>
                </div>
                <div className="px-[20px] flex items-center justify-between">
                  <div className="flex flex-wrap gap-x-[5px]">
                    <button className="bg-[#F3F6F8] h-[17px] px-[7px] rounded flex items-center">
                      <p className="text-[10px]  font-medium font-inter pt-[9px]  text-[#F5B849]">
                        {" "}
                        Ajman
                      </p>
                    </button>

                    <button className="bg-[#FCEDEB] h-[17px] px-[7px] rounded flex items-center">
                      <p className="text-[10px] font-medium font-inter pt-[9px]  text-[#E6533C]">
                        {" "}
                        Ganden City
                      </p>
                    </button>
                    <button className="bg-[#EEEBF8] h-[17px] px-[7px] rounded flex items-center">
                      <p className="text-[10px] font-medium font-inter pt-[9px]  text-[#23B7E5]">
                        {" "}
                        Urgent
                      </p>
                    </button>
                    <button className="bg-[#F2EEFC] h-[17px] px-[7px] rounded flex items-center">
                      <p className="text-[10px] font-medium font-inter pt-[9px]  text-[#26BF94]">
                        {" "}
                        Flat
                      </p>
                    </button>
                  </div>
                  <div>
                    <button className="bg-[#F2EEFC] h-[25px] px-[13px] rounded flex items-center">
                      <p className="text-[15px] font-medium font-inter h-[17px]  text-[#26BF94] -mb-[1px]">
                        {" "}
                        <FaRegComment />
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
                        className="w-[18px] h-[18px] rounded-full border-2 border-blueGray-50 shadow hover:z-50 hover:-mt-[2.5px]"
                      ></Image>
                      <Image
                        width={18}
                        height={18}
                        src="https://spruko.com/demo/tailwind/ynex/dist/assets/images/faces/11.jpg"
                        alt="..."
                        className="w-[18px] h-[18px] rounded-full border-2 border-blueGray-50 shadow -ml-[6px] hover:z-50 hover:-mt-[2.5px]"
                      ></Image>
                      <Image
                        width={18}
                        height={18}
                        src="https://spruko.com/demo/tailwind/ynex/dist/assets/images/faces/11.jpg"
                        alt="..."
                        className="w-[18px] h-[18px] rounded-full border-2 border-blueGray-50 hover:z-50 hover:-mt-[2.5px] shadow -ml-[6px]"
                      ></Image>
                      <Image
                        width={18}
                        height={18}
                        src="https://spruko.com/demo/tailwind/ynex/dist/assets/images/faces/11.jpg"
                        alt="..."
                        className="w-[18px] h-[18px] rounded-full border-2 border-blueGray-50 shadow -ml-[6px] hover:z-50 hover:-mt-[2.5px]"
                      ></Image>
                      <div className="w-[18px] h-[18px] rounded-full bg-[#845ADF]  -ml-[6px] hover:z-50 hover:-mt-[2.5px] flex items-center justify-center">
                        <p className="text-[8px] -mb-[1px] text-white font-normal">
                          +2
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="-mb-0 text-[11px]">+65 Matched</p>
                    </div>
                  </div>
                  <div className="flex gap-x-[7px] items-center flex-wrap">
                    <div className="flex items-center">
                      <p className="text-[#845ADF] text-[11px] -mb-0">
                        {" "}
                        <BiSolidLike />
                      </p>
                      <p className="text-[#845ADF] font-medium text-[11px] -mb-0">
                        1200
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-[#AFB2B7] text-[11px] -mb-0">
                        {" "}
                        <BiCommentDetail />
                      </p>
                      <p className="text-[#AFB2B7] font-medium text-[11px] mb-[2px]">
                        1200
                      </p>
                    </div>
                    <div>
                      {item.btn === "Urgent" ? (
                        <button className="rounded-[5px] w-[45px] h-[23px] hover:bg-[#E6533C] bg-[#FCEDEB] mb-[5px] flex justify-center gap-x-[2px] text-[5px] items-center">
                          <p className="-mb-0 text-[#E6533C] hover:text-white text-[8px] font-semibold">
                            {item.btn}
                          </p>
                        </button>
                      ) : (
                        <button className="rounded-[5px] w-[70px] h-[23px] hover:bg-[#845ADF] bg-[#EEEBF8] mb-[5px] flex justify-center gap-x-[2px] text-[5px] items-center">
                          <p className="-mb-0 text-[#845ADF] hover:text-white text-[8px] font-semibold">
                            {item.btn}
                          </p>
                          <p className="text-[#F5B849] text-[8px] font-semibold -mb-0">
                            <GoStarFill />
                          </p>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <footer className="">
        <div className="block-box load-more-btn mt-10 w-full">
          <a href="#" className="item-btn">
            <i className="icofont-refresh" />
            Load More Posts
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Blogs;
