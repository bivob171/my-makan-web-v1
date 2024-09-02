"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRouteContext from "@/Context/PrivetRouteContext";

const Footer = dynamic(() => import("../Component/Footer/Footer"), {
  ssr: false,
});
const Navbar = dynamic(() => import("../Component/Navbar/Navbar"), {
  ssr: false,
});
const Preloader = dynamic(() => import("../Component/Preloder/Preloader"), {
  ssr: false,
});

export default function Layout({ children }) {
  const { user, setIsConnected, setCustomEventData } = PrivateRouteContext();
  const [isSticky, setIsSticky] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0.8) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading === true ? (
        <Preloader />
      ) : (
        <div>
          <div
            className={`${
              isSticky
                ? "bg-[#625dfaf3] sticky top-0 z-[200] py-4 lg:!py-0 backdrop-blur shadow"
                : "relative z-[200] bg-[#4A46FB] py-4 lg:!py-2 border-b-[1px] border-[#e6e6e6c2]"
            }`}
          >
            <Navbar />
          </div>
          <div>{children}</div>
          <Footer />
        </div>
      )}
      <ToastContainer position="top-right" />
    </div>
  );
}
