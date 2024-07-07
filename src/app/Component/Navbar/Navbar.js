"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import Menu from "./Menu";
import { useRouter } from "next/navigation";
import { CgCloseR } from "react-icons/cg";

export const Navbar = () => {
  const { isAuthenticated, loading, user } = PrivateRouteContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const [animate, setAnimate] = useState(false);

  const handleMobileMenuClick = () => {
    setAnimate(true);
    setIsMenuOpen(true);
    setTimeout(() => setAnimate(false), 0);
  };

  const handleLoginClick = () => {
    window.location.assign("/login");
  };
  const handleUserClick = () => {
    window.location.assign("/user/newsfeed");
  };

  const handleSearchClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setIsModalOpen(false);
      // router.push(`/search?query=${searchQuery}`);
    }
  };

  return (
    <div className="">
      <div className="px-4 mx-auto sm:max-w-full md:max-w-full lg:max-w-screen-2xl">
        <div className="relative flex flex-row-reverse lg:!flex-row items-center justify-between">
          <div className="lg:hidden flex justify-between gap-4">
            <button className="text-white" onClick={handleSearchClick}>
              <i className="icofont-search"></i>
            </button>
            <button className="px-[30px] py-[8px] hover:bg- bg-white rounded-[4px]">
              <Link
                href="/login"
                onClick={handleLoginClick}
                className="item-btn"
              >
                <i className="fas fa-user" />
                Login
              </Link>
            </button>
          </div>
          <div className="flex items-center gap-28">
            <Link href="/">
              <Image
                width={1000}
                height={100}
                className="w-auto h-auto"
                src="/media/logo.png"
                alt="Mymakan"
              />
            </Link>
            <div className="flex items-center hidden space-x-8 lg:flex">
              <nav id="dropdown" className="template-main-menu">
                <ul className="menu-content">
                  <Menu />
                </ul>
              </nav>
            </div>
          </div>
          <div className="flex items-center hidden space-x-8 lg:flex">
            <div className="header-action">
              <ul className="relative">
                <li className="header-social">
                  <a href="#">
                    <i className="icofont-facebook" />
                  </a>
                  <a href="#">
                    <i className="icofont-twitter" />
                  </a>
                  <a href="#">
                    <i className="icofont-linkedin" />
                  </a>
                  <a href="#">
                    <i className="icofont-pinterest" />
                  </a>
                  <a href="#">
                    <i className="icofont-skype" />
                  </a>
                </li>
                {/* search icon  */}
                <li>
                  <button className="text-white" onClick={handleSearchClick}>
                    <i className="icofont-search"></i>
                  </button>
                </li>
                {isAuthenticated === true ? (
                  <li>
                    <Link href="/user/newsfeed" onClick={handleUserClick}>
                      {user?.image === null ? (
                        <Image
                          width={40}
                          height={40}
                          src="/loginuser.png"
                          alt=""
                          className=" w-10 h-10 border rounded-full cursor-pointer dark:bg-gray-500 dark:border-gray-700"
                        />
                      ) : (
                        <Image
                          width={40}
                          height={40}
                          src={user?.image}
                          alt=""
                          className=" w-10 h-10 border rounded-full cursor-pointer dark:bg-gray-500 dark:border-gray-700"
                        />
                      )}
                    </Link>
                  </li>
                ) : (
                  <li className="login-btn">
                    <Link
                      href="/login"
                      onClick={handleLoginClick}
                      className="item-btn"
                    >
                      <i className="fas fa-user" />
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              className="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
              onClick={handleMobileMenuClick}
            >
              <svg className="w-5 text-white" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute -top-10 -left-10">
                <div
                  className={`p-5 h-screen bg-white border shadow-sm relative w-[260px]`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="absolute top-6 right-2">
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        className="p-2 transition duration-200 rounded bg-[#f1f1f1bd] hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg className="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      <li>
                        <a
                          href="/"
                          aria-label="Our product"
                          title="Our product"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Product
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          aria-label="Our product"
                          title="Our product"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Features
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          aria-label="Product pricing"
                          title="Product pricing"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Pricing
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          aria-label="About us"
                          title="About us"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          About us
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          aria-label="Sign in"
                          title="Sign in"
                          className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
                        >
                          Sign in
                        </a>
                      </li>
                      <li>
                        <a
                          href="/"
                          className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
                          aria-label="Sign up"
                          title="Sign up"
                        >
                          Sign up
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gradient-to-l from-[#000000d2] flex items-center justify-center z-50 transition ease-in-out duration-300">
          <button
            className="text-white absolute top-5 right-5 z-50 shadow-md"
            onClick={handleCloseModal}
          >
            <CgCloseR className="w-10 h-10" />
          </button>
          <div className="bg-transparent relative w-screen h-screen">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchInputChange}
              onKeyDown={handleSearchSubmit}
              className="w-full px-4 py-3 border border-gray-300 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[400px] outline-none border-none shadow-lg"
              placeholder="Type and press Enter to search"
            />
          </div>
        </div>
      )}
    </div>
  );
};
