"use client";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const UserHeaderPage = () => {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();
  const pathName = usePathname();
  const totalAdsPost = user?.totalUrgentPost + user?.totalSponsoredPost;
  return (
    <div>
      <div className="">
        <div className="container">
          <div className="banner-user">
            <div className="banner-content">
              <div className="media">
                <div className="flex gap-x-[10px] items-center">
                  <div className="item-img">
                    {isAuthenticated ? (
                      <Link href="">
                        {user?.image ? (
                          <Image
                            width={113}
                            height={113}
                            className="w-[113px] h-[113px] rounded-full"
                            src={user?.image}
                            alt="User"
                          />
                        ) : (
                          <Image
                            width={110}
                            height={110}
                            className="w-[110px] h-[110px] rounded-full"
                            src="https://i.ibb.co/7298VDJ/user.png"
                            alt="User"
                          />
                        )}
                      </Link>
                    ) : (
                      <Image
                        width={110}
                        height={110}
                        className="w-[110px] h-[110px] rounded-full"
                        src="https://i.ibb.co/7298VDJ/user.png"
                        alt="User"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="item-title">{user?.fullName}</h3>
                    <p className="text-white">
                      {user?.state}
                      {user?.country && ","}
                      {user?.country}
                    </p>
                    {user?.role === "agent" ? (
                      <p className="text-white leading-[12px]">
                        {user?.companyName}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="media-body">
                  <ul className="user-meta">
                    <li>
                      Total Posts: <span>{user?.totalPost}</span>
                    </li>
                    <li>
                      Ads Posts: <span>{totalAdsPost}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="block-box user-top-header">
            <ul className="menu-list">
              <li
                className={
                  pathName === "/user/profile/timeline" ? "active" : ""
                }
              >
                <Link href="/user/profile/timeline">Timeline</Link>
              </li>
              <li
                className={
                  pathName === "/user/profile/following" ? "active" : ""
                }
              >
                <Link href="/user/profile/following">Following</Link>
              </li>
              <li
                className={
                  pathName === "/user/profile/followers" ? "active" : ""
                }
              >
                <Link href="/user/profile/followers">Followers</Link>
              </li>
              <li
                className={pathName === "/user/profile/photos" ? "active" : ""}
              >
                <Link href="/user/profile/photos">Photos</Link>
              </li>
              <li
                className={pathName === "/user/profile/videos" ? "active" : ""}
              >
                <Link href="/user/profile/videos">Videos</Link>
              </li>
              <li
                className={pathName === "/user/profile/posts" ? "active" : ""}
              >
                <Link href="/user/profile/posts">Posts</Link>
              </li>
              <li
                className={pathName === "/user/profile/blogs" ? "active" : ""}
              >
                <Link href="/user/profile/blogs">Blogs</Link>
              </li>
              <li
                className={pathName === "/user/profile/about" ? "active" : ""}
              >
                <Link href="/user/profile/about">About</Link>
              </li>
              <li
                className={
                  pathName === "/user/profile/settings" ? "active" : ""
                }
              >
                <Link href="/user/profile/settings">Settings</Link>
              </li>
              <li>
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
                      Shop
                    </a>
                    <a className="dropdown-item" href="#">
                      Blog
                    </a>
                    <a className="dropdown-item" href="#">
                      Others
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
