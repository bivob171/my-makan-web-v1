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

const RelatedBlogs = () => {
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

  const getAllPosts = async (token) => {
    try {
      setIsFetching(true);
      let url = `https://api.mymakan.ae/allposts/get?`;
      url += `sortBy=${sortBy}&`;
      url += `sortOrder=${sortOrder}&`;
      url += `page=${page}&`;
      url += `limit=${limit}`;

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
  ]);

  const myId = user?._id;
  return (
    <div className="realated-blog bg-[#EFF4FB] py-4 mb-10 rounded-md">
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
                    No posts available.
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
