"use client";
import React from "react";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { BuyerMyAllPostPage } from "../../_component/BuyerMyAllPost/BuyerMyAllPostPage";
import { AgentMyAllPostPage } from "../../_component/AgentMyAllPost/AgentMyAllPostPage";

export default function Posts() {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();
  if (user?.role === "buyer") {
    return (
      <div>
        <BuyerMyAllPostPage />
      </div>
    );
  } else {
    return (
      <div>
        <AgentMyAllPostPage />
      </div>
    );
  }
}
