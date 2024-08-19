"use client";

import React, {
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { PostLocationValueContext } from "@/Context/postValueContext";
import PackageCard from "@/app/user/_component/Card/PackageCard";
import { PostLodaing } from "../PostLodaing/PostLodaing";
import { FilterRenderContext } from "@/Context/filterRenderContext";

export const AllTotalPost = () => {
  const { newsFeedRender } = useContext(PostLocationValueContext);
  const { user } = PrivateRouteContext();
  const myRole = user?.role;
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
  const [filterRender, setfilterRender] = useState(false);

  const { filterRenderAllPost, setfilterRenderAllPost } =
    useContext(FilterRenderContext);

  // Load the city value based on the current route
  useEffect(() => {
    const newsfeedFilterValue = localStorage.getItem("newsfeedFilterValue");
    setCity(newsfeedFilterValue ? JSON.parse(newsfeedFilterValue).city : "");
    setState(newsfeedFilterValue ? JSON.parse(newsfeedFilterValue).state : "");
    setCountry(
      newsfeedFilterValue ? JSON.parse(newsfeedFilterValue).country : ""
    );
    setSelectedType(
      newsfeedFilterValue ? JSON.parse(newsfeedFilterValue).selectedType : ""
    );
    setPostType(
      newsfeedFilterValue ? JSON.parse(newsfeedFilterValue).postType : ""
    );
    setForPost(
      newsfeedFilterValue ? JSON.parse(newsfeedFilterValue).forPost : ""
    );
    setTowersorBuildingName(
      newsfeedFilterValue
        ? JSON.parse(newsfeedFilterValue).towersorBuildingName
        : ""
    );
    setPropertyCategory(
      newsfeedFilterValue
        ? JSON.parse(newsfeedFilterValue).propertyCategoryName
        : ""
    );
    setPropertyType(
      newsfeedFilterValue
        ? JSON.parse(newsfeedFilterValue).propertyTypeName
        : ""
    );
    setParking(
      newsfeedFilterValue ? JSON.parse(newsfeedFilterValue).parking : ""
    );
    setSellType(
      newsfeedFilterValue ? JSON.parse(newsfeedFilterValue).sellType : ""
    );
    setTags(newsfeedFilterValue ? JSON.parse(newsfeedFilterValue).tags : "");
    setfilterRender(
      newsfeedFilterValue ? JSON.parse(newsfeedFilterValue).filterRender : false
    );
  }, [filterRenderAllPost]);

  const getAllPosts = async (token) => {
    try {
      setIsFetching(true);
      if (filterRender) {
        setLoading(true);
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
    filterRender,
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

  return (
    <div className="pb-[50px] ">
      <div className="">
        <div className="">
          <div>
            {loading && (
              <div>
                <PostLodaing />
              </div>
            )}
            {!loading && allPosts?.length === 0 && (
              <div className="text-center text-gray-500 mt-4">
                No posts available.
              </div>
            )}
            {!loading && allPosts.length > 0 && (
              <div className="grid grid-cols-1 gap-4 ">
                {allPosts?.map((item, i) => {
                  if (allPosts.length === i + 1) {
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
            )}

            {isFetching && (
              <div className="mb-[20px] mt-[20px] text-center">
                <PostLodaing />
              </div>
            )}
            {!hasMore && allPosts?.length !== 0 && (
              <div className="mb-[20px] mt-[40px] text-center">
                <p>No more Post to load.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
