"use client";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { BiCommentDetail, BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { PostLodaing } from "../PostLodaing/PostLodaing";
import PackageCard from "@/app/user/_component/Card/PackageCard";
import { FilterRenderContext } from "@/Context/filterRenderContext";

const AvailablePostsAgent = () => {
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
  const containerRefPost = useRef(null);
  const [like, setlike] = useState(true);
  const [postType, setPostType] = useState("Available");
  const [role, setRole] = useState("agent");
  const [saveRerander, setSaveRerander] = useState(false);
  const [followRerander, setFollowRerander] = useState(false);

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
  const [filterRender, setfilterRender] = useState(false);

  const { filterRenderAgentPost, setfilterRenderAgentPost } =
    useContext(FilterRenderContext);

  // Load the city value based on the current route
  useEffect(() => {
    const agentPostFilterValue = localStorage.getItem("agentPostFilterValue");
    setCity(agentPostFilterValue ? JSON.parse(agentPostFilterValue).city : "");
    setState(
      agentPostFilterValue ? JSON.parse(agentPostFilterValue).state : ""
    );
    setCountry(
      agentPostFilterValue ? JSON.parse(agentPostFilterValue).country : ""
    );
    setSelectedType(
      agentPostFilterValue ? JSON.parse(agentPostFilterValue).selectedType : ""
    );
    setPostType(
      agentPostFilterValue ? JSON.parse(agentPostFilterValue).postType : ""
    );
    setForPost(
      agentPostFilterValue ? JSON.parse(agentPostFilterValue).forPost : ""
    );
    setTowersorBuildingName(
      agentPostFilterValue
        ? JSON.parse(agentPostFilterValue).towersorBuildingName
        : ""
    );
    setPropertyCategory(
      agentPostFilterValue
        ? JSON.parse(agentPostFilterValue).propertyCategoryName
        : ""
    );
    setPropertyType(
      agentPostFilterValue
        ? JSON.parse(agentPostFilterValue).propertyTypeName
        : ""
    );
    setParking(
      agentPostFilterValue ? JSON.parse(agentPostFilterValue).parking : ""
    );
    setSellType(
      agentPostFilterValue ? JSON.parse(agentPostFilterValue).sellType : ""
    );
    setTags(agentPostFilterValue ? JSON.parse(agentPostFilterValue).tags : "");
    setfilterRender(
      agentPostFilterValue
        ? JSON.parse(agentPostFilterValue).filterRender
        : false
    );
  }, [filterRenderAgentPost]);

  const getAllPosts = async (token) => {
    try {
      setIsFetching(true);
      if (filterRender) {
        setLoading(true);
      }
      let url = `http://localhost:4000/allposts/get?`;
      // Constructing the URL with query parameters based on state variables
      url += `role=${role}&`;
      url += `postType=${postType}&`;
      url += `sortBy=${sortBy}&`;
      url += `sortOrder=${sortOrder}&`;
      url += `page=${page}&`;
      url += `limit=${limit}`;
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

  const observer = useRef();
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
    <div className=" pb-[50px]">
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
                })}
              </div>
            )}

            {isFetching && (
              <div className="mb-[20px] mt-[20px] text-center">
                <PostLodaing />
              </div>
            )}
            {!hasMore && allPosts.length !== 0 && (
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

export default AvailablePostsAgent;
