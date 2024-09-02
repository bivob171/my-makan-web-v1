"use client";

import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { PostLodaing } from "@/app/Component/NewsFeed/PostLodaing/PostLodaing";
import { PostLocationValueContext } from "@/Context/postValueContext";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import PackageCard from "../Card/PackageCard";
import NewsFeedLeftSection from "@/app/Component/NewsFeed/NewsFeedLeftSection";
import PropertyCard2 from "@/app/Component/NewsFeed/PropertyCard2";

export const MachedPostPage = ({
  item,
  saveRerander,
  setSaveRerander,
  minMatchPercentage,
  setAllPosts,
}) => {
  const { newsFeedRender } = useContext(PostLocationValueContext);
  const { user } = PrivateRouteContext();
  const myRole = user?.role;
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [like, setlike] = useState(true);
  const [followRerander, setFollowRerander] = useState(false);
  const observer = useRef();

  const [postType, setPostType] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [forPost, setForPost] = useState("");
  const [towersorBuildingName, setTowersorBuildingName] = useState("");
  const [propertyCategoryName, setPropertyCategory] = useState("");
  const [propertyTypeName, setPropertyType] = useState("");
  const [parking, setParking] = useState(item.parking);
  const [sellType, setSellType] = useState([]);
  const [tags, setTags] = useState([]);
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");

  const [matchingPosts, setmatchingPosts] = useState([]);

  const getAllPosts = async (token) => {
    try {
      setIsFetching(true);
      let url = `http://localhost:4000/allposts/match-post?`;

      url += `sortBy=${sortBy}&`;
      url += `sortOrder=${sortOrder}&`;
      url += `page=${page}&`;
      url += `limit=${limit}`;
      if (postType !== "") url += `&postType=${postType}`;
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
      // Filter posts by matchPercentage
      const filteredPosts = allPostsList.filter(
        (post) => Number(post.matchPercentage) >= minMatchPercentage
      );
      setHasMore(filteredPosts.length === limit);
      setmatchingPosts((prevPost) =>
        page === 1 ? filteredPosts : [...prevPost, ...filteredPosts]
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
    newsFeedRender,
    saveRerander,
    followRerander,
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
    minMatchPercentage,
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

  return (
    <div className="grid grid-cols-12 gap-3">
      <div className="col-span-9">
        <div className="grid grid-cols-2 gap-3">
          {matchingPosts?.map((item, i) => {
            if (matchingPosts.length === i + 1) {
              return (
                <div ref={lastPostElementRef} key={i}>
                  <PackageCard
                    item={item}
                    myId={myId}
                    setlike={setlike}
                    like={like}
                    saveRerander={saveRerander}
                    setSaveRerander={setSaveRerander}
                    followRerander={followRerander}
                    setFollowRerander={setFollowRerander}
                  />
                </div>
              );
            } else {
              return (
                <PackageCard
                  item={item}
                  key={i}
                  myId={myId}
                  setlike={setlike}
                  like={like}
                  saveRerander={saveRerander}
                  setSaveRerander={setSaveRerander}
                  followRerander={followRerander}
                  setFollowRerander={setFollowRerander}
                />
              );
            }
          })}
        </div>

        {isFetching && (
          <div className="mb-[20px] mt-[20px] text-center">
            <PostLodaing />
          </div>
        )}
        {!hasMore && matchingPosts?.length !== 0 && (
          <div className="mb-[20px] mt-[40px] text-center">
            <p>No more Post to load.</p>
          </div>
        )}
      </div>
      <div className="col-span-3">
        <div className="!sticky top-[110px]">
          <div className="h-[86vh] overflow-y-scroll">
            <NewsFeedLeftSection />
            <div className="space-y-5">
              <PropertyCard2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
