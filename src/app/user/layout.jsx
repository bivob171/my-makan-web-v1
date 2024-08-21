"use client";

import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { redirect, usePathname } from "next/navigation";
import { HeaderTop } from "./_component/HeaderTop";
import PostLocationValueProvider from "@/Context/postValueContext";
import { Nunito } from "next/font/google";
import EditPostLocationValueProvider from "@/Context/EditpostValueContext";
import { HeaderLeft } from "./_component/HeaderLeft";
import { HeaderRight } from "./_component/HeaderRight";
import FilterRenderProvider from "@/Context/filterRenderContext";

const nunito = Nunito({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  subsets: ["latin"],
  display: "swap",
});

export default function Layout({ children }) {
  const { isAuthenticated, loading } = PrivateRouteContext();
  const pathname = usePathname();

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
        <HeaderTop />
        {pathname !== "/user/chats" && <HeaderLeft />}
        <PostLocationValueProvider>
          <EditPostLocationValueProvider>
            <div className={nunito.className}>{children}</div>
          </EditPostLocationValueProvider>
        </PostLocationValueProvider>
        {pathname !== "/user/chats" && <HeaderRight />}
      </div>
    );
  } else {
    redirect("/login");
  }
}
