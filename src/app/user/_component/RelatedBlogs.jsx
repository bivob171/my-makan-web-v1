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
import { PostLodaing } from "@/app/Component/NewsFeed/PostLodaing/PostLodaing";

const RelatedBlogs = ({ item }) => {
  const { newsFeedRender } = useContext(PostLocationValueContext);
  const { user } = PrivateRouteContext();
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [limit, setLimit] = useState(4);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
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

  useEffect(() => {
    setSelectedType(item?.postType);
    setPostType(item?.type);
    setForPost(item?.for);
    setTowersorBuildingName(item?.location?.towersorBuildingName);
    setCountry(item?.location?.country);
    setState(item?.location?.state);
    setCity(item?.location?.city);
    setSellType(item?.sellType);
    setTags(item?.tags);
    setParking(item?.parking);
    setPropertyType(item?.propertyType);
    setPropertyCategory(item?.propertyCategory);
  }, [item]);

  const getAllPosts = async (token) => {
    try {
      setIsFetching(true);
      let url = `http://3.28.239.173:4000/allposts/get?`;
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
    newsFeedRender,
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

  const myId = user?._id;
  return (
    <div className="realated-blog bg-[#EFF4FB] py-4  rounded-md">
      <div className="">
        <h2 className="px-4 pb-2">Related Posts</h2>
      </div>
      <div className="row">
        <div className="pb-[50px] ">
          <div className="">
            <div className="">
              <div>
                {loading && (
                  <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-4">
                    {[0, 1, 2, 3].map((i) => {
                      return (
                        <div key={i} className="text-center mb-[12px]">
                          <div class="p-4 bg-white rounded  w-full">
                            <div class=" flex space-x-4">
                              <div class="rounded-full bg-gray-300 h-12 w-12"></div>
                              <div class="flex-1 space-y-4 py-1">
                                <div class="h-4 bg-gray-300 rounded w-3/4"></div>
                                <div class="space-y-2">
                                  <div class="h-4 bg-gray-300 rounded"></div>
                                  <div class="h-4 bg-gray-300 rounded w-5/6"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                {!loading && allPosts?.length === 0 && (
                  <div className="text-center text-gray-500 mt-4">
                    No related posts available.
                  </div>
                )}
                {!loading && allPosts.length > 0 && (
                  <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 grid-cols-1 gap-4 ">
                    {allPosts?.map((item, i) => {
                      if (allPosts.length === i + 1) {
                        return (
                          <div key={i}>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedBlogs;
