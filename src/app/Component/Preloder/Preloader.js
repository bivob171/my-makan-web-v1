"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Preloader() {
  return (
    <div
      className={`preloader bg-[#5F5EFA] w-full h-screen flex items-center justify-center`}
    >
      <Image
        width={1000}
        height={100}
        id="myDIV"
        className="w-[280px] h-[50px] "
        alt=""
        src="/media/logo.png"
      />
    </div>
  );
}
