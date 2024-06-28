"use client";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IoIosStar, IoMdTimer } from "react-icons/io";
import { FaCheckCircle, FaUser } from "react-icons/fa";
import { FaLocationDot, FaStarHalfStroke } from "react-icons/fa6";

import { BiCommentDetail, BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import { ProfileCard } from "../ProfileCard/ProfileCard";
export const NewsFeedPage = () => {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();
  const dateStr = user?.createdAt;

  const dateObj = new Date(dateStr);

  const options = { year: "numeric", month: "short" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);
  const data = [
    {
      rol: "Buyer",
      sell: "Sale",
      btn: "Urgent",
    },
    {
      rol: "Buyer",
      sell: "Sale",
      btn: "Urgent",
    },
    {
      rol: "Agent",
      sell: "Rent",
      btn: "Urgent",
    },
    {
      rol: "Agent",
      sell: "Rent",
      btn: "Sponsored",
    },
    {
      rol: "Agent",
      sell: "Sale",
      btn: "Sponsored",
    },
    {
      rol: "Agent",
      sell: "Sale",
      btn: "Urgent",
    },
    {
      rol: "Agent",
      sell: "Rent",
      btn: "Urgent",
    },
    {
      rol: "Buyer",
      sell: "Sale",
      btn: "Urgent",
    },
    {
      rol: "Buyer",
      sell: "Sale",
      btn: "Urgent",
    },
    {
      rol: "Agent",
      sell: "Rent",
      btn: "Urgent",
    },
    {
      rol: "Agent",
      sell: "Rent",
      btn: "Sponsored",
    },
    {
      rol: "Agent",
      sell: "Sale",
      btn: "Sponsored",
    },
    {
      rol: "Agent",
      sell: "Sale",
      btn: "Urgent",
    },
    {
      rol: "Agent",
      sell: "Rent",
      btn: "Urgent",
    },
    {
      rol: "Buyer",
      sell: "Sale",
      btn: "Urgent",
    },
    {
      rol: "Buyer",
      sell: "Sale",
      btn: "Urgent",
    },
    {
      rol: "Agent",
      sell: "Rent",
      btn: "Urgent",
    },
    {
      rol: "Agent",
      sell: "Rent",
      btn: "Sponsored",
    },
    {
      rol: "Agent",
      sell: "Sale",
      btn: "Sponsored",
    },
    {
      rol: "Agent",
      sell: "Sale",
      btn: "Urgent",
    },
    {
      rol: "Agent",
      sell: "Rent",
      btn: "Urgent",
    },
  ];
  return (
    <>
      <div className="page-content">
        <div className="container">
          {/* Banner Area Start */}
          <div className="newsfeed-banner">
            <div className="media">
              <div className="item-icon">
                <i className="icofont-megaphone-alt" />
              </div>
              <div className="media-body">
                <h3 className="item-title">MY Makan Newsfeed</h3>
                <p>All Realtors and Buyers Latest post</p>
              </div>
            </div>
            <ul className="animation-img">
              <li
                data-sal="slide-down"
                data-sal-duration={800}
                data-sal-delay={400}
              >
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto"
                  src="/media/banner/shape_7.png"
                  alt="shape"
                />
              </li>
              <li>
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto"
                  src="/media/banner/people_2.png"
                  alt="shape"
                />
              </li>
            </ul>
          </div>
          <div className="newsfeed-search">
            <ul className="member-list">
              <li className="active-member">
                <a href="#">
                  <span className="member-icon">
                    <i className="icofont-users" />
                  </span>
                  <span className="member-text">Total Members:</span>
                  <span className="member-count">12208</span>
                </a>
              </li>
            </ul>
            <ul className="search-list">
              <li className="search-filter">
                <button className="drop-btn" type="button">
                  <i className="icofont-abacus-alt" />
                </button>
                <div className="drop-menu">
                  <select className="select2">
                    <option>--Everything--</option>
                    <option>Status</option>
                    <option>Quotes</option>
                    <option>Photos</option>
                    <option>Videos</option>
                    <option>Audios</option>
                    <option>slideshows</option>
                    <option>files</option>
                    <option>Updates</option>
                    <option>New Members</option>
                    <option>Posts</option>
                    <option>New Groups</option>
                  </select>
                </div>
              </li>
              <li className="search-input">
                <button className="drop-btn" type="button">
                  <i className="icofont-search" />
                </button>
                <div className="drop-menu">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search...."
                    />
                    <div className="input-group-append">
                      <button className="search-btn" type="button">
                        <i className="icofont-search-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="row">
            <div className="col-lg-8">
              <div className="block-box post-input-tab">
                <ul className="nav nav-tabs" role="tablist">
                  <li
                    className="nav-item"
                    role="presentation"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="STATUS"
                  >
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#post-status"
                      role="tab"
                      aria-selected="true"
                    >
                      <i className="icofont-copy" />
                      All Posts
                    </a>
                  </li>
                  <li
                    className="nav-item"
                    role="presentation"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="MEDIA"
                  >
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#post-media"
                      role="tab"
                      aria-selected="false"
                    >
                      <i className="icofont-image" />
                      Add Post
                    </a>
                  </li>
                  <li
                    className="nav-item"
                    role="presentation"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="BLOG"
                  >
                    <Link
                      className="nav-link"
                      data-toggle="tab"
                      href="/user/profile/blogs"
                      role="tab"
                      aria-selected="false"
                    >
                      <i className="icofont-list" />
                      Blog
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="grid xl:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 custom:grid-cols-3 gap-5">
                {data.map((item, i) => {
                  return (
                    <div
                      key={i}
                      className="mb-[10px] w-[350px] h-auto bg-white  border-[0.1px] border-[#F5B849]  rounded-[15px] py-[25px] "
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
                              Required Two Bedroom Hall open or Close kitchen
                              For Rent in City Tower, Ready to Move, for
                              Family...
                              <span className="hover:underline underline-offset-1 text-[#49B6F5] text-[14px] font-medium cursor-pointer font-inter">
                                see more
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="px-[20px] flex items-center justify-between">
                          <div className="flex flex-wrap gap-x-[5px]">
                            <button className="bg-[#F3F6F8] h-[17px] px-[7px] rounded flex items-center">
                              <p className="text-[10px]  font-medium font-inter pt-[16px]  text-[#F5B849]">
                                {" "}
                                Ajman
                              </p>
                            </button>

                            <button className="bg-[#FCEDEB] h-[17px] px-[7px] rounded flex items-center">
                              <p className="text-[10px] font-medium font-inter pt-[16px]  text-[#E6533C]">
                                {" "}
                                Ganden City
                              </p>
                            </button>
                            <button className="bg-[#EEEBF8] h-[17px] px-[7px] rounded flex items-center">
                              <p className="text-[10px] font-medium font-inter pt-[16px]  text-[#23B7E5]">
                                {" "}
                                Urgent
                              </p>
                            </button>
                            <button className="bg-[#F2EEFC] h-[17px] px-[7px] rounded flex items-center">
                              <p className="text-[10px] font-medium font-inter pt-[16px]  text-[#26BF94]">
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

              <div className="block-box load-more-btn">
                <a href="#" className="item-btn">
                  <i className="icofont-refresh" />
                  Load More Posts
                </a>
              </div>
            </div>
            <div className="col-lg-4 widget-block widget-break-lg">
              <div>
                <ProfileCard />
              </div>
              <div className="widget widget-memebers">
                <div className="widget-heading">
                  <h3 className="widget-title">Agents</h3>
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      ...
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">
                        Close
                      </a>
                      <a className="dropdown-item" href="#">
                        Edit
                      </a>
                      <a className="dropdown-item" href="#">
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#newest-member"
                      role="tab"
                      aria-selected="true"
                    >
                      Top Agents
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#popular-member"
                      role="tab"
                      aria-selected="false"
                    >
                      NEWEST
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#active-member"
                      role="tab"
                      aria-selected="false"
                    >
                      POPULAR
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="newest-member"
                    role="tabpanel"
                  >
                    <div className="members-list">
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/chat_1.jpg"
                              alt="Chat"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">Aahat Akter</a>
                          </h4>
                          <div className="item-username">
                            <a href="#">
                              <b>Rapid Properties</b>
                            </a>{" "}
                          </div>
                          <div className="member-status online">
                            <i className="icofont-speech-comments" />
                          </div>
                        </div>
                      </div>
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/chat_2.jpg"
                              alt="Chat"
                            />
                            <span className="chat-status online" />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">Kazi Rahman</a>
                          </h4>
                          <span className="chat-status online" />
                          <div className="item-username">
                            <a href="#">
                              <b>Fam Properties</b>
                            </a>
                          </div>
                          <div className="member-status online">
                            <i className="icofont-speech-comments" />
                          </div>
                        </div>
                      </div>
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/chat_3.jpg"
                              alt="Chat"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">Alia Karon</a>
                          </h4>
                          <div className="item-username">
                            <a href="#">
                              <b>Fam Properties</b>
                            </a>
                          </div>
                          <div className="member-status online">
                            <i className="icofont-speech-comments" />
                          </div>
                        </div>
                      </div>
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/chat_4.jpg"
                              alt="Chat"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">Masterero</a>
                          </h4>
                          <div className="item-username">
                            <a href="#">
                              <b>Fam Properties</b>
                            </a>
                          </div>
                          <div className="member-status offline">
                            <i className="icofont-speech-comments" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="popular-member"
                    role="tabpanel"
                  >
                    <div className="members-list">
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/chat_1.jpg"
                              alt="Chat"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">Aahat Akter</a>
                          </h4>
                          <div className="item-username">@Aahat </div>
                          <div className="member-status online">
                            <i className="icofont-check" />
                          </div>
                        </div>
                      </div>
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/chat_2.jpg"
                              alt="Chat"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">Kazi Rahman</a>
                          </h4>
                          <div className="item-username">@Rahman</div>
                          <div className="member-status online">
                            <i className="icofont-check" />
                          </div>
                        </div>
                      </div>
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/chat_3.jpg"
                              alt="Chat"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">Alia Karon</a>
                          </h4>
                          <div className="item-username">@Alia</div>
                          <div className="member-status online">
                            <i className="icofont-check" />
                          </div>
                        </div>
                      </div>
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/chat_4.jpg"
                              alt="Chat"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">Masterero</a>
                          </h4>
                          <div className="item-username">@Master</div>
                          <div className="member-status offline">
                            <i className="icofont-check" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="active-member"
                    role="tabpanel"
                  >
                    <div className="members-list">
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/chat_1.jpg"
                              alt="Chat"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">Aahat Akter</a>
                          </h4>
                          <div className="item-username">@Aahat </div>
                          <div className="member-status online">
                            <i className="icofont-check" />
                          </div>
                        </div>
                      </div>
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/chat_2.jpg"
                              alt="Chat"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">Kazi Rahman</a>
                          </h4>
                          <div className="item-username">@Rahman</div>
                          <div className="member-status online">
                            <i className="icofont-check" />
                          </div>
                        </div>
                      </div>
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/chat_3.jpg"
                              alt="Chat"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">Alia Karon</a>
                          </h4>
                          <div className="item-username">@Alia</div>
                          <div className="member-status online">
                            <i className="icofont-check" />
                          </div>
                        </div>
                      </div>
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/chat_4.jpg"
                              alt="Chat"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">Masterero</a>
                          </h4>
                          <div className="item-username">@Master</div>
                          <div className="member-status offline">
                            <i className="icofont-check" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="widget widget-groups">
                <div className="widget-heading">
                  <h3 className="widget-title">Categories</h3>
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      ...
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">
                        Close
                      </a>
                      <a className="dropdown-item" href="#">
                        Edit
                      </a>
                      <a className="dropdown-item" href="#">
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#active-group"
                      role="tab"
                      aria-selected="true"
                    >
                      ACTIVE
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#popular-group"
                      role="tab"
                      aria-selected="false"
                    >
                      POPULAR
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#newest-group"
                      role="tab"
                      aria-selected="false"
                    >
                      NEWEST
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="active-group"
                    role="tabpanel"
                  >
                    <div className="group-list">
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/groups/groups_9.png"
                              alt="group"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">Horizon Tower</a>{" "}
                            <a href="#">
                              <i className="icofont-location-pin" />
                            </a>
                          </h4>
                          <div className="item-member">
                            265 Realtors | 3.5k Posts | 200 Buyers
                          </div>
                        </div>
                      </div>
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/groups/groups_9.png"
                              alt="group"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">City Tower</a>{" "}
                            <a href="#">
                              <i className="icofont-location-pin" />
                            </a>
                          </h4>
                          <div className="item-member">
                            265 Realtors | 3.5k Posts | 200 Buyers
                          </div>
                        </div>
                      </div>
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/groups/groups_9.png"
                              alt="group"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">Corninch Tower</a>{" "}
                            <a href="#">
                              <i className="icofont-location-pin" />
                            </a>
                          </h4>
                          <div className="item-member">
                            265 Realtors | 3.5k Posts | 200 Buyers
                          </div>
                        </div>
                      </div>
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/groups/groups_9.png"
                              alt="group"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">Twin Tower</a>{" "}
                            <a href="#">
                              <i className="icofont-location-pin" />
                            </a>
                          </h4>
                          <div className="item-member">
                            265 Realtors | 3.5k Posts | 200 Buyers
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="popular-group"
                    role="tabpanel"
                  >
                    <div className="group-list">
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/groups/groups_9.jpg"
                              alt="group"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">Kito Development</a>
                          </h4>
                          <div className="item-member">265 Members</div>
                        </div>
                      </div>
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/groups/groups_10.jpg"
                              alt="group"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">Chef Express</a>
                          </h4>
                          <div className="item-member">4,265 Members</div>
                        </div>
                      </div>
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/groups/groups_11.jpg"
                              alt="group"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">Photo Contest</a>
                          </h4>
                          <div className="item-member">1,265 Members</div>
                        </div>
                      </div>
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/groups/groups_12.jpg"
                              alt="group"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">WP Developers</a>
                          </h4>
                          <div className="item-member">265 Members</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="newest-group"
                    role="tabpanel"
                  >
                    <div className="group-list">
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/groups/groups_9.jpg"
                              alt="group"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">Kito Development</a>
                          </h4>
                          <div className="item-member">265 Members</div>
                        </div>
                      </div>
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/groups/groups_10.jpg"
                              alt="group"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">Chef Express</a>
                          </h4>
                          <div className="item-member">4,265 Members</div>
                        </div>
                      </div>
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/groups/groups_11.jpg"
                              alt="group"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">Photo Contest</a>
                          </h4>
                          <div className="item-member">1,265 Members</div>
                        </div>
                      </div>
                      <div className="media">
                        <div className="item-img">
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/groups/groups_12.jpg"
                              alt="group"
                            />
                          </a>
                        </div>
                        <div className="media-body">
                          <h4 className="item-title">
                            <a href="#">WP Developers</a>
                          </h4>
                          <div className="item-member">265 Members</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="widget widget-banner">
                <h3 className="item-title">Most Popular</h3>
                <div className="item-subtitle">MyMakan Application</div>
                <a href="#" className="item-btn">
                  <span className="btn-text">Download Now</span>
                  <span className="btn-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      width="21px"
                      height="10px"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.671,9.998 L12.997,9.998 L16.462,6.000 L5.000,6.000 L5.000,4.000 L16.462,4.000 L12.997,0.002 L16.671,0.002 L21.003,5.000 L16.671,9.998 ZM17.000,5.379 L17.328,5.000 L17.000,4.621 L17.000,5.379 ZM-0.000,4.000 L3.000,4.000 L3.000,6.000 L-0.000,6.000 L-0.000,4.000 Z"
                      />
                    </svg>
                  </span>
                </a>
                <div className="item-img">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/widget_banner_1.png"
                    alt="banner"
                  />
                </div>
              </div>
              <div className="widget widget-memebers widget-activity">
                <div className="widget-heading">
                  <h3 className="widget-title">My Connect Activity</h3>
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      ...
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">
                        Close
                      </a>
                      <a className="dropdown-item" href="#">
                        Edit
                      </a>
                      <a className="dropdown-item" href="#">
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
                <div className="activity-list">
                  <div className="media">
                    <div className="item-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/chat_10.jpg"
                          alt="Chat"
                        />
                      </a>
                    </div>
                    <div className="media-body">
                      <h4 className="item-title">
                        <a href="#" className="author-name">
                          Aahat Akter
                        </a>
                        commented on Destroy Dex&apos;&s
                        <a href="#" className="activity-link">
                          Photo
                        </a>
                      </h4>
                      <div className="activity-time">20 minutes ago</div>
                    </div>
                  </div>
                  <div className="media">
                    <div className="item-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/chat_8.jpg"
                          alt="Chat"
                        />
                      </a>
                    </div>
                    <div className="media-body">
                      <h4 className="item-title">
                        <a href="#" className="author-name">
                          Neko Bebop
                        </a>
                        liked Marina
                        <a href="#" className="activity-link">
                          Status
                        </a>
                      </h4>
                      <div className="activity-time">15 minutes ago</div>
                    </div>
                  </div>
                  <div className="media">
                    <div className="item-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/chat_1.jpg"
                          alt="Chat"
                        />
                      </a>
                    </div>
                    <div className="media-body">
                      <h4 className="item-title">
                        <a href="#" className="author-name">
                          Neko Bebop
                        </a>
                        commented on Destroy Dex&apos;s
                        <a href="#" className="activity-link">
                          Photo
                        </a>
                      </h4>
                      <div className="activity-time">20 minutes ago</div>
                    </div>
                  </div>
                  <div className="media">
                    <div className="item-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/chat_6.jpg"
                          alt="Chat"
                        />
                      </a>
                    </div>
                    <div className="media-body">
                      <h4 className="item-title">
                        <a href="#" className="author-name">
                          Neko Bebop
                        </a>
                        commented on Destroy Dex&apos;s
                        <a href="#" className="activity-link">
                          Photo
                        </a>
                      </h4>
                      <div className="activity-time">20 minutes ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Chat Modal Here */}
      <div
        className="chat-conversion-box"
        id="chat-box-modal"
        tabIndex={-1}
        aria-labelledby="chat-modal-label"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title" id="chat-modal-label">
                Fahim Rahman <span className="online"></span>
              </h6>
              <div className="action-icon">
                <button className="chat-shrink">
                  <i className="icofont-minus"></i>
                </button>
                <button
                  type="button"
                  className="close chat-close chat-open"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
            <div className="modal-body">
              <ul className="chat-conversion">
                <li className="chat-others">
                  <div className="author-img">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/figure/chat_12.jpg"
                      alt="Chat"
                    />
                  </div>
                  <div className="author-text">
                    <span>
                      How are you Fahim vai ? Tommorow office will be your last
                      day of Bachelor life.
                    </span>
                  </div>
                </li>
                <li className="chat-you">
                  <div className="author-img">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/figure/chat_11.jpg"
                      alt="Chat"
                    />
                  </div>
                  <div className="author-text">
                    <span>hmm That&apos;s great</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="modal-footer">
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Write your text here....."
                  />
                  <div className="chat-plus-icon">
                    <i className="icofont-plus-circle"></i>
                  </div>
                  <div className="file-attach-icon">
                    <a href="#">
                      <i className="icofont-slightly-smile"></i>
                    </a>
                    <a href="#">
                      <i className="icofont-camera"></i>
                    </a>
                    <a href="#">
                      <i className="icofont-image"></i>
                    </a>
                    <a href="#">
                      <i className="icofont-mic"></i>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className="chat-conversion-box"
        id="chat-box-modal"
        tabIndex={-1}
        aria-labelledby="chat-modal-label"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title" id="chat-modal-label">
                Fahim Rahman <span className="online" />
              </h6>
              <div className="action-icon">
                <button className="chat-shrink">
                  <i className="icofont-minus" />
                </button>
                <button
                  type="button"
                  className="close chat-close chat-open"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
            <div className="modal-body">
              <ul className="chat-conversion">
                <li className="chat-others">
                  <div className="author-img">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/figure/chat_12.jpg"
                      alt="Chat"
                    />
                  </div>
                  <div className="author-text">
                    <span>
                      How are you Fahim vai ? Tommorow office will be your last
                      day of Bachelor life.
                    </span>
                  </div>
                </li>
                <li className="chat-you">
                  <div className="author-img">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/figure/chat_11.jpg"
                      alt="Chat"
                    />
                  </div>
                  <div className="author-text">
                    <span>hmm That&apos;s great</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="modal-footer">
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Write your text here....."
                  />
                  <div className="chat-plus-icon">
                    <i className="icofont-plus-circle" />
                  </div>
                  <div className="file-attach-icon">
                    <a href="#">
                      <i className="icofont-slightly-smile" />
                    </a>
                    <a href="#">
                      <i className="icofont-camera" />
                    </a>
                    <a href="#">
                      <i className="icofont-image" />
                    </a>
                    <a href="#">
                      <i className="icofont-mic" />
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
