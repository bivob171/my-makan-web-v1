"use client";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";
const generateRandomRoomId = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const length = 6;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
};
export default function VideoCall() {
  const roomId = generateRandomRoomId();
  const [massage, setMassage] = useState("");
  const handleJoinRoom = () => {
    const encodedRoomId = encodeURIComponent(roomId);
    setMassage(`https://mymakan.ae/user/video-room?roomID=${encodedRoomId}`);
  };

  return (
    <div className="mx-[300px] my-[100px]">
      <button type="button" onClick={handleJoinRoom}>
        join
      </button>
      <br />
      <a href={massage}>{massage}</a>
    </div>
  );
}
