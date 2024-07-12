"use client";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import React, { useEffect, useState } from "react";

export const PostDetailsPage = ({ postid }) => {
  const { user } = PrivateRouteContext();
  const myId = user?._id;

  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [like, setlike] = useState(true);
  console.log(allPosts);

  const getAllPosts = async (token) => {
    try {
      let url = `https://q4m0gph5-4000.asse.devtunnels.ms/allposts/single-post/${postid}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const allPostsList = await response.json();
      setAllPosts(allPostsList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem(`${userRole}AccessToken`);
    getAllPosts(token);
  }, [like]);

  const giveLike = async (id) => {
    const url = `https://q4m0gph5-4000.asse.devtunnels.ms/allposts/${id}/like`;
    const tokenKey = `${user?.role}AccessToken`;
    const token = localStorage.getItem(tokenKey);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      setlike(!like);
      console.log("Like successful", data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  const giveUnLike = async (id) => {
    const url = `https://q4m0gph5-4000.asse.devtunnels.ms/allposts/${id}/unlike`;
    const tokenKey = `${user?.role}AccessToken`;
    const token = localStorage.getItem(tokenKey);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      setlike(!like);
      console.log("unLike successful", data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  return <div className="py-[500px]">PostDetails: {postid}</div>;
};
