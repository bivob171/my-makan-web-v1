"use client";
import React from "react";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { BuyerMyTimeLine } from "../../_component/BuyerMyTimeLine";
import { AgentMyTimeLine } from "../../_component/AgentMyTimeLine";
export default function Timeline() {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();
  if (user?.role === "buyer") {
    return (
      <div>
        <BuyerMyTimeLine />
      </div>
    );
  } else {
    return (
      <div>
        <AgentMyTimeLine />
      </div>
    );
  }
}
