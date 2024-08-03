"use client";

import React, { useState, useEffect, useRef } from "react";
import { GoStarFill } from "react-icons/go";
import { BiCommentDetail, BiMessageDetail, BiSolidLike } from "react-icons/bi";
import Image from "next/image";

import houseData from "../../../data/houseData";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";

import { Keyboard, FreeMode, Autoplay } from "swiper/modules";
import { SiImessage } from "react-icons/si";
import Link from "next/link";
import { BsJournalBookmarkFill } from "react-icons/bs";

export default function HouseCard() {
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

  return (
    <div className="m-4">
      <div className="px-4 mx-auto sm:max-w-full md:max-w-full lg:max-w-screen-2xl">
        <Swiper
          slidesPerView={1}
          spaceBetween={60}
          breakpoints={{
            805: {
              slidesPerView: 2,
              spaceBetween: 50,
            },
            1150: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1534: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
          }}
          loop={true}
          freeMode={true}
          // autoplay={{
          //   delay: 1000,
          //   disableOnInteraction: false,
          // }}
          keyboard={{
            enabled: true,
          }}
          modules={[Autoplay, FreeMode, Keyboard]}
          className="mySwiper"
        >
          {houseData.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="w-auto lg:max-w-full h-auto border-[1px] border-[#F5B849] rounded-[15px] py-[10px] mb-4">
                  <div className="flex justify-between items-start gap-1 px-[12px] md:px-[10px] pt-1">
                    <div className="flex gap-x-[10px] justify-start items-start w-full">
                      <div className="">
                        <div className="relative">
                          <div className="cursor-pointer !w-[40px] !h-[40px] md:!w-[60px] md:!h-[60px] border-[3px] p-[2px] hover:border-[#0033ffd4] rounded-full relative ">
                            <Image
                              width={400}
                              height={400}
                              alt="img"
                              src="https://spruko.com/demo/tailwind/ynex/dist/assets/images/faces/11.jpg"
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
                        </div>
                      </div>

                      <div>
                        <div className=" ">
                          <div className="flex gap-x-[8px] items-center">
                            {item.rol === "Buyer" ? (
                              <p className="text-[14px] leading-3 m-0 text-[#8F8F8F] font-semibold">
                                Hidden Name{" "}
                              </p>
                            ) : (
                              <p className="text-[14px] leading-3 m-0 text-[#333335] font-semibold">
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
                            <div className="flex items-center gap-x-[5px]">
                              <p className="text-[#F5B849] text-[14px] font-semibold leading-3 m-0">
                                4.8
                              </p>
                              <p className="text-[#F5B849] text-[14px] font-semibold">
                                <GoStarFill />
                              </p>
                            </div>
                          </div>
                        </div>
                        {item.rol === "Buyer" ? (
                          <p className="hover:underline underline-offset-4 text-[#8920AD] text-[14px] font-medium leading-3 m-0">
                            Buyer From{" "}
                            <span className="text-[#E6533C]">India</span>
                          </p>
                        ) : (
                          <p className="hover:underline underline-offset-4 text-[#8920AD] text-[12px] font-medium leading-3 m-0">
                            Rapid Properties
                          </p>
                        )}
                        <div className="flex flex-wrap items-center ">
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
                      <p className="leading-normal text-[12px] text-red-500 font-semibold m-0">
                        Required
                      </p>
                      <span className="leading-normal text-[12px] sm:block align-right text-end text-black font-medium">
                        For {item.sell}
                      </span>
                    </div>
                  </div>
                  <div className="h-[0.5px] w-full bg-[#dbdbdbb4] my-1" />
                  <div className="px-[15px]">
                    <div>
                      <p className="font-inter text-[18px] text-[#666] font-bold mb-[0px] leading-[40px] mt-1">
                        Urgent Required 2BHK For Family.
                      </p>
                      <p className="font-inter text-[#222] text-[14px] font-normal leading-[20px]">
                        Required Two Bedroom Hall open or Close kitchen For Rent
                        in City Tower, Ready to Move, for Family...
                        <span className="hover:underline underline-offset-1 text-[#49B6F5] text-[14px] font-medium cursor-pointer font-inter">
                          see more
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="px-[10px] flex items-start justify-between !mt-4">
                    <div className="flex flex-wrap gap-x-[5px]">
                      <button className="bg-[#F3F6F8] h-[17px] px-[7px] rounded flex items-center">
                        <p className="text-[10px] font-medium font-inter h-[17px] text-[#F5B849]">
                          {" "}
                          Ajman
                        </p>
                      </button>

                      <button className="bg-[#FCEDEB] h-[17px] px-[7px] rounded flex items-center">
                        <p className="text-[10px] font-medium font-inter h-[17px]  text-[#E6533C]">
                          {" "}
                          Ganden City
                        </p>
                      </button>
                      <button className="bg-[#EEEBF8] h-[17px] px-[7px] rounded flex items-center">
                        <p className="text-[10px] font-medium font-inter h-[17px]  text-[#23B7E5]">
                          {" "}
                          Urgent
                        </p>
                      </button>
                      <button className="bg-[#F2EEFC] h-[17px] px-[7px] rounded flex items-center">
                        <p className="text-[10px] font-medium font-inter h-[17px]  text-[#26BF94]">
                          {" "}
                          Flat
                        </p>
                      </button>
                    </div>
                    <div className="relative inline-flex">
                      {/* handle comment button  */}
                      <button
                        className=""
                        onClick={() => handleCommentBtnClick(index)}
                      >
                        <SiImessage className="text-[rgb(68,164,110)] w-6 h-6" />
                      </button>
                      {/* modal  */}
                      {openModalIndex === index && (
                        <div
                          className="absolute right-0 top-9 z-30"
                          ref={(el) => (modalRefs.current[index] = el)}
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
                  <div className="h-[0.5px] w-full bg-[#dbdbdbb4] my-3" />
                  <div className=" flex items-center justify-between px-[10px]">
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
                          <button className="rounded-[5px] w-[55px] h-[25px] hover:bg-[#E6533C] bg-[#FCEDEB] mb-[5px] flex justify-center gap-x-[2px] items-center">
                            <p className="-mb-0 text-[#E6533C] hover:text-white text-[10px] font-semibold">
                              {item.btn}
                            </p>
                          </button>
                        ) : (
                          <button className="rounded-[5px] w-[65px] h-[25px] hover:bg-[#845ADF] bg-[#EEEBF8] mb-[5px] flex justify-center gap-x-[2px] items-center">
                            <p className="-mb-0 text-[#845ADF] hover:text-white text-[10px] font-semibold">
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
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}
