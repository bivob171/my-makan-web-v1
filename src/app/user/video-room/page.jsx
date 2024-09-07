"use client";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function VideoRoom() {
  const searchParams = useSearchParams();
  const roomID = searchParams.get("roomID");
  const { user } = PrivateRouteContext();
  const myName = user?.fullName;
  const [name, setName] = useState("");
  const containerRef = useRef(null);
  useEffect(() => {
    setName(user?.fullName);
  }, [myName]);

  useEffect(() => {
    if (!roomID) {
      console.error("roomID is required.");
      return;
    }

    const appID = 58754218;
    const serverSecret = "601ee71b13afb61ff60c95664adda3b0";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      Date.now().toString(),
      name
    );

    const zc = ZegoUIKitPrebuilt.create(kitToken);

    if (zc && containerRef.current) {
      zc.joinRoom({
        container: containerRef.current,

        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
        },
        showScreenSharingButton: false,
      });
    } else {
      console.error(
        "Failed to create Zego UI Kit instance or container reference."
      );
    }
  }, [roomID, name]);

  return (
    <div className="mx-[300px] my-[100px]">
      <div ref={containerRef} />
    </div>
  );
}
