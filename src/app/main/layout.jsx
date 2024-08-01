"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic"; // Import dynamic from next/dynamic

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
  const [isSticky, setIsSticky] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
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
    </div>
  );
}
