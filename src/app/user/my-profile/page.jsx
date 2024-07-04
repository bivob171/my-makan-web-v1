"use client";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import React from "react";
import { BuyerProfile } from "../_component/BuyerProfile";
import { AgentProfile } from "../_component/AgentProfile";

export default function MyProfile() {
  const { isAuthenticated, loading, user, setRender, render, logOut } =
    PrivateRouteContext();
  if (user?.role === "buyer") {
    return (
      <div>
        <BuyerProfile />
      </div>
    );
  } else {
    return (
      <div>
        <AgentProfile />
      </div>
    );
  }
}
