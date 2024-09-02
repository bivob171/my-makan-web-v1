import React from "react";

export const BuyerPostDetailsPage = () => {
  const { user, setRender, render, activeUsers, lastActiveTime } =
    PrivateRouteContext();

  const isActive = activeUsers.includes(profileId);
  return <div>DETAIL</div>;
};
