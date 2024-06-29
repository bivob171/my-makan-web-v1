"use client";

import { Footer } from "../Component/Footer/Footer";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { redirect } from "next/navigation";
import { HeaderTop } from "./_component/HeaderTop";
import { HeaderLeft } from "./_component/HeaderLeft";
import { HeaderRight } from "./_component/HeaderRight";

export default function Layout({ children }) {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();

  if (loading === true) {
    return (
      <div className="flex justify-center items-center h-screen">
        <iframe
          className="w-[500px]"
          src="https://lottie.host/embed/e836fc2d-38e5-40a5-b157-cb62e48bdc7b/DWQtJZ0Yfn.json"
        ></iframe>
      </div>
    );
  } else if (isAuthenticated === true) {
    return (
      <div className="bg-[#EFF4FB]">
        <div>
          <HeaderTop></HeaderTop>
          <div className="">
            <div>
              <HeaderLeft />{" "}
            </div>
            <div>{children}</div>
            <div>
              {" "}
              <HeaderRight />{" "}
            </div>
          </div>
          <div className="mt-[40px]">
            <Footer />
          </div>
        </div>
      </div>
    );
  } else {
    redirect("/login");
  }
}
