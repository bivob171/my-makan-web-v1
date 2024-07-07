"use client";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import Image from "next/image";
import React, { useState } from "react";
import { IoIosStar, IoMdTimer } from "react-icons/io";
import { FaCheckCircle, FaUser } from "react-icons/fa";
import { FaLocationDot, FaStarHalfStroke } from "react-icons/fa6";
import Link from "next/link";
import { AboutPage } from "../../_component/AboutPage";
import { ProfileCard } from "@/app/Component/ProfileCard/ProfileCard";

export default function About() {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();
  const dateStr = user?.createdAt;

  const dateObj = new Date(dateStr);

  const options = { year: "numeric", month: "short" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);

  return (
    <>
      <div className="page-conten">
        <div className="container">
          <div className="row">
            <AboutPage />
            <div className="col-lg-4 widget-block widget-break-lg">
              <div>
                <ProfileCard />
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
