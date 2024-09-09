"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PrivateRouteContext from "@/Context/PrivetRouteContext";

export const MatchCardData = ({ item }) => {
  // match posts

  const [allPosts, setAllPosts] = useState();
  const [matchingPosts, setmatchingPosts] = useState([]);
  const { user } = PrivateRouteContext();

  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  const [postType, setPostType] = useState("");
  const [selectedType, setSelectedType] = useState("");
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
  const getAllMatchPosts = async (token) => {
    try {
      setIsFetching(true);
      let url = `https://api.mymakan.ae/allposts/match-post?`;
      url += `sortBy=${sortBy}&`;
      url += `sortOrder=${sortOrder}&`;
      url += `page=${page}&`;
      url += `limit=${limit}`;

      if (postType !== "") url += `&postType=${postType}`;
      if (user?.role === "buyer") url += `&role=${"agent"}`;
      if (forPost !== "") url += `&for=${encodeURIComponent(forPost)}`;
      if (state !== "") url += `&state=${encodeURIComponent(state)}`;
      if (city !== "") url += `&city=${encodeURIComponent(city)}`;
      if (country !== "") url += `&country=${encodeURIComponent(country)}`;
      if (selectedType !== "")
        url += `&type=${encodeURIComponent(selectedType)}`;
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
      console.log(url);

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
      const postData = await response.json();
      setAllPosts(postData);
      const allPostsList = postData.posts;
      setHasMore(allPostsList.length === limit);
      setmatchingPosts((prevPost) =>
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
    getAllMatchPosts(token);
  }, [
    sortOrder,
    sortBy,
    limit,
    page,
    postType,
    forPost,
    state,
    city,
    country,
    towersorBuildingName,
    propertyCategoryName,
    propertyTypeName,
    sellType,
    tags,
  ]);

  useEffect(() => {
    const parking = item?.parking;
    const postType = item?.postType;
    const selectedType = item?.type;
    const forPost = item?.for;
    const towersorBuildingName = item?.location?.towersorBuildingName;
    const city = item?.location?.city;
    const state = item?.location?.state;
    const country = item?.location?.country;
    const propertyCategoryName = item?.propertyCategory;
    const propertyTypeName = item?.propertyType;
    const sellType = item?.sellType;
    const tags = item?.tags;
    setCity(city);
    setState(state);
    setCountry(country);
    setSelectedType(selectedType);
    setPostType(postType);
    setForPost(forPost);
    setTowersorBuildingName(towersorBuildingName);
    setPropertyCategory(propertyCategoryName);
    setPropertyType(propertyTypeName);
    setParking(parking);
    setSellType(sellType);
    setTags(tags);
  }, [item]);

  const matchPlusMore = allPosts?.total - 4;

  //   match post page
  const matchpostId = item?._id;

  return (
    <div>
      {" "}
      {loading ? (
        <div className="flex flex-wrap items-center gap-x-[10px]">
          <div className="flex">
            {[0, 1, 2, 3].map((i) => {
              return (
                <div
                  key={i}
                  className={`flex object-cover shadow-md items-center justify-center bg-slate-100 motion-safe:animate-pulse dark:bg-slate-800 w-[18px] md:w-[28px] md:h-[28px] h-[18px] rounded-full border-2 border-blueGray-50  ${
                    i > 0 ? "-ml-[6px]" : ""
                  } hover:z-50 hover:-mt-[2.5px]`}
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    class="size-2 fill-slate-700/10 dark:fill-slate-300/10"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
              );
            })}
          </div>
          <div>
            <div class="w-[50px] h-3 bg-gray-200 rounded-full motion-safe:animate-pulse dark:bg-slate-800"></div>
          </div>
        </div>
      ) : (
        <>
          {allPosts?.total === 0 ? (
            <div className="flex flex-wrap items-center gap-x-[10px]">
              <div className="flex">
                {[0, 1, 2, 3].map((i) => {
                  return (
                    <div
                      key={i}
                      className={`flex object-cover shadow-md items-center justify-center bg-slate-100  dark:bg-slate-800 w-[18px] md:w-[28px] md:h-[28px] h-[18px] rounded-full border-2 border-blueGray-50  ${
                        i > 0 ? "-ml-[6px]" : ""
                      } hover:z-50 hover:-mt-[2.5px]`}
                      aria-hidden="true"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        class="size-2 fill-slate-700/10 dark:fill-slate-300/10"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  );
                })}
              </div>
              <div>
                <p className="-mb-0 text-[12px] md:text-[14px] font-medium">
                  No Matched
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-x-[10px]">
              {matchingPosts?.length > 0 ? (
                <div className="flex">
                  {matchingPosts?.map((data, i) => {
                    const { role, _id } = data;

                    const userMatchinfo =
                      role === "agent" ? data?.agentId : data?.userId;
                    const image = userMatchinfo?.image;
                    return (
                      <Link
                        key={i}
                        href={`${"/user/post-details"}/${_id}`}
                        className={`inline-block ${i > 0 ? "-ml-[6px]" : ""}`}
                      >
                        <Image
                          width={18}
                          height={18}
                          src={image} // Adjust this according to your data structure
                          alt="img" // Adjust this according to your data structure
                          className="w-[18px] md:w-[28px] md:h-[28px] h-[18px] rounded-full border-2 border-blueGray-50 shadow hover:z-50 hover:-mt-[2.5px]"
                        />
                      </Link>
                    );
                  })}
                  {allPosts?.total <= 4 ? null : (
                    <div className="w-[18px] md:w-[28px] md:h-[28px] h-[18px] rounded-full bg-[#845ADF]  -ml-[6px] hover:z-50 hover:-mt-[2.5px] flex items-center justify-center">
                      <Link href={`${"/user/matched-post"}/${matchpostId}`}>
                        <p className="text-[8px] -mb-[1px] text-white font-normal">
                          +{matchPlusMore}
                        </p>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {allPosts?.total <= 4 ? (
                    <Link href={`${"/user/matched-post"}/${matchpostId}`}>
                      <p className="-mb-0 text-[12px] md:text-[14px] font-medium">
                        {allPosts?.total} Matched
                      </p>
                    </Link>
                  ) : (
                    <Link href={`${"/user/matched-post"}/${matchpostId}`}>
                      <p className="-mb-0 text-[12px] md:text-[14px] font-medium">
                        +{allPosts?.total} Matched
                      </p>
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};
