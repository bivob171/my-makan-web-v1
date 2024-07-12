"use client";
import { useParams } from "next/navigation";
import React from "react";
import { PostDetailsPage } from "../../_component/PostDetailsPage/PostDetailsPage";

export default function PostDetails() {
  const params = useParams();
  return (
    <div>
      <PostDetailsPage postid={params.postid} />
    </div>
  );
}
