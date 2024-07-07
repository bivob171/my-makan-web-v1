"use client";
import React from "react";
import { BuyerMyAllPost } from "../../_component/BuyerMyAllPost";
import { AgentMyAllPost } from "../../_component/AgentMyAllPost";
import PrivateRouteContext from "@/Context/PrivetRouteContext";

export default function Posts() {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();
  if (user?.role === "buyer") {
    return (
      <div>
        <BuyerMyAllPost />
      </div>
    );
  } else {
    return (
      <div>
        <AgentMyAllPost />
      </div>
    );
  }
}
