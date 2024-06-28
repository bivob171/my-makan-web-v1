"use client";

import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { redirect } from "next/navigation";
import { UserHearder } from "../_component/UserHearder";

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
      <div className="bg-[#EFF4FB] pt-[140px]">
        <div>
          <UserHearder />
        </div>
        <div>{children}</div>
      </div>
    );
  } else {
    redirect("/login");
  }
}
