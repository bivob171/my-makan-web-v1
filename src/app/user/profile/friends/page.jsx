"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FollowCard } from "../../_component/Card/FollowCard";
import { FollowingAgentPage } from "../../_component/FollowComponent/FollowingAgentPage";
import { FollowingUserPage } from "../../_component/FollowComponent/FollowingUserPage";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { FollowerAgentPage } from "../../_component/FollowComponent/FollowerAgentPage";
import { FollowerUserPage } from "../../_component/FollowComponent/FollowerUserPage";
import { FriendList } from "../../_component/FriendList/FriendList";

export default function Followers() {
  const [activeTab, setActiveTab] = useState("Agent");
  return (
    <>
      {/* Page Content */}
      <div className="page-conten">
        <div className="container">
          <FriendList />
        </div>
      </div>
    </>
  );
}
