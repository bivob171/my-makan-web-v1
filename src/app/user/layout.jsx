"use client";

import { Footer } from "../Component/Footer/Footer";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { redirect } from "next/navigation";
import { HeaderTop } from "./_component/HeaderTop";
import { HeaderLeft } from "./_component/HeaderLeft";
import { HeaderRight } from "./_component/HeaderRight";
import PostLocationValueProvider from "@/Context/postValueContext";
import { Nunito } from "next/font/google";
const nunito = Nunito({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  subsets: ["latin"],
  display: "swap",
});
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
            <PostLocationValueProvider>
              <div className={nunito.className}>{children}</div>
            </PostLocationValueProvider>
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
