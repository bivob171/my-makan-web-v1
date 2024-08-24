"use client";

import { useSearchParams } from "next/navigation";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import PrivateRouteContext from "@/Context/PrivetRouteContext";

export default function RelatedPost() {
  const searchParams = useSearchParams();
  const location = searchParams.get("location");
  const tag = searchParams.get("tag");
  const forPos = searchParams.get("for");
  const type = searchParams.get("type");

  const { user } = PrivateRouteContext();
  // state
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [like, setlike] = useState(true);
  const [saveRerander, setSaveRerander] = useState(false);
  const [followRerander, setFollowRerander] = useState(false);
  const observer = useRef();

  const [selectedType, setSelectedType] = useState("");
  const [postType, setPostType] = useState("");
  const [forPost, setForPost] = useState("");
  const [towersorBuildingName, setTowersorBuildingName] = useState("");
  const [propertyCategoryName, setPropertyCategory] = useState("");
  const [propertyTypeName, setPropertyType] = useState("");
  const [parking, setParking] = useState("");
  const [sellType, setSellType] = useState([]);
  const [tags, setTags] = useState([]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    if (location) {
      const [city, country] = location.split(",");
      setCity(city);
      setCountry(country);
    }

    if (tag) {
      setTags([tag]);
    }

    if (forPos) {
      setForPost(forPos);
    }
  }, [location, tag, forPos, type]);

  const getAllPosts = async (token, reset = false) => {
    try {
      setIsFetching(true);
      if (filterRender || reset) {
        setLoading(true);
        setPage(1); // Reset to first page
      }
      let url = `https://api.mymakan.ae/allposts/get?`;
      url += `sortBy=${sortBy}&`;
      url += `sortOrder=${sortOrder}&`;
      url += `page=${page}&`;
      url += `limit=${limit}`;

      if (forPost !== "") url += `&for=${encodeURIComponent(forPost)}`;
      if (state !== "") url += `&state=${encodeURIComponent(state)}`;
      if (city !== "") url += `&city=${encodeURIComponent(city)}`;
      if (country !== "") url += `&country=${encodeURIComponent(country)}`;
      if (selectedType !== "")
        url += `&postType=${encodeURIComponent(selectedType)}`;
      if (postType !== "") url += `&type=${encodeURIComponent(postType)}`;
      if (propertyCategoryName !== "")
        url += `&propertyCategory=${encodeURIComponent(propertyCategoryName)}`;
      if (propertyTypeName !== "")
        url += `&propertyType=${encodeURIComponent(propertyTypeName)}`;
      if (towersorBuildingName !== "")
        url += `&towersorBuildingName=${encodeURIComponent(
          towersorBuildingName
        )}`;
      if (parking !== "") url += `&parking=${encodeURIComponent(parking)}`;
      if (tags.length !== 0)
        url += `&tags=${encodeURIComponent(tags.join(","))}`;
      if (sellType.length !== 0)
        url += `&sellType=${encodeURIComponent(sellType.join(","))}`;

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
      setHasMore(allPostsList.length === limit);
      setAllPosts((prevPost) =>
        page === 1 ? allPostsList : [...prevPost, ...allPostsList]
      );
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
  }, [
    sortOrder,
    sortBy,
    limit,
    page,
    like,
    saveRerander,
    followRerander,
    selectedType,
    forPost,
    state,
    country,
    postType,
    propertyCategoryName,
    propertyTypeName,
    towersorBuildingName,
    parking,
    sellType,
    tags,
  ]);

  const lastPostElementRef = useCallback(
    (node) => {
      if (isFetching) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isFetching, hasMore]
  );

  const myId = user?._id;

  return <div></div>;
}
