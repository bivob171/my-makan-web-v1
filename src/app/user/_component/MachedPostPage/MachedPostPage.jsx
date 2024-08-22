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

export const MachedPostPage = ({
  item,
  postType,
  saveRerander,
  setSaveRerander,
  allPosts,
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

  const getAllPosts = async (token) => {
    try {
      setIsFetching(true);
      let url = `http://3.28.239.173:4000/allposts/get?`;

      url += `sortBy=${sortBy}&`;
      url += `sortOrder=${sortOrder}&`;
      url += `page=${page}&`;
      url += `limit=${limit}`;
      if (postType !== "") url += `&postType=${postType}`;
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
    postType,
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
    <div className="pb-[50px]">
      <div className="">
        <div className="">
          <div>
            {loading && (
              <div>
                <PostLodaing />
              </div>
            )}
            {isFetching === false && !loading && allPosts?.length === 0 && (
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
