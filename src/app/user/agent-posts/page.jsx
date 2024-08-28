"use client";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { FilterRenderContext } from "@/Context/filterRenderContext";
import NewsFeedLeftSection from "@/app/Component/NewsFeed/NewsFeedLeftSection";
import { PostLodaing } from "@/app/Component/NewsFeed/PostLodaing/PostLodaing";
import Filter from "@/app/Component/NewsFeed/PostSearch/Filter";

import PropertyCard2 from "@/app/Component/NewsFeed/PropertyCard2";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import PackageCard from "../_component/Card/PackageCard";

export default function AgentPosts() {
  const { user } = PrivateRouteContext();
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [role, setRole] = useState("agent");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const containerRefPost = useRef(null);
  const [like, setlike] = useState(true);
  const [saveRerander, setSaveRerander] = useState(false);
  const [followRerander, setFollowRerander] = useState(false);

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

  const getAllPosts = async (token, reset = false) => {
    try {
      setIsFetching(true);
      if (filterRender || reset) {
        setLoading(true);
        setPage(1); // Reset to first page
      }
      let url = `https://api.mymakan.ae/allposts/get?`;
      // Constructing the URL with query parameters based on state variables
      url += `role=${encodeURIComponent(role)}&`;
      url += `sortBy=${encodeURIComponent(sortBy)}&`;
      url += `sortOrder=${encodeURIComponent(sortOrder)}&`;
      url += `page=${encodeURIComponent(page)}&`;
      url += `limit=${encodeURIComponent(limit)}`;
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

  const [filterVisible, setFilterVisible] = useState(false);
  const [filterCount, setFilterCount] = useState(0);
  const filterRef = useRef(null);
  return (
    <div className="mx-auto container pt-[120px] text-[#222]">
      <div className="flex justify-between items-start">
        <div className="bg-[#fdeaeae1] rounded-3xl mb-3 px-7 py-[16px] w-full max-w-[400px] inline-block">
          <h3 className="text-[22px] font-black text-[#666] leading-none m-0">
            Agent - Posts
          </h3>
        </div>
        <div className="relative">
          {" "}
          <button
            className="col-span-1 flex justify-center !items-center hover:bg-[#dfdfdf6e] hover:rounded-full p-1 relative"
            type="button"
            onClick={() => setFilterVisible(!filterVisible)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-[#615DFA]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
              />
            </svg>
            {/* select filter number  */}
            {filterCount > 0 && (
              <div className="absolute -top-[5px] right-0">
                <div className="bg-[#ff3333bd] rounded-full w-4 h-4 relative">
                  <span className="text-[10px] text-[#fefefe] font-mono font-bold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    {filterCount}
                  </span>
                </div>
              </div>
            )}
          </button>
          {filterVisible && (
            <div ref={filterRef} className="absolute top-[65px] right-0 z-50">
              <Filter
                setFilterCount={setFilterCount}
                filterCount={filterCount}
                filterVisible={filterVisible}
                setFilterVisible={setFilterVisible}
              />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-9">
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
          <div className="grid grid-cols-2 gap-3">
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

          {isFetching && loading === false && (
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
    </div>
  );
}
