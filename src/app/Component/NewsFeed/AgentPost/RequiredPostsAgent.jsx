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
import { IoIosRefresh } from "react-icons/io";
import io from "socket.io-client";
const socket = io("http://localhost:4000", {
  path: "/socket.io", // Ensure this matches the path set in rewrites
  transports: ["websocket"], // Use WebSocket transport
});
const RequiredPostsAgent = () => {
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
  const [postType, setPostType] = useState("Required");
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

  const [newPostCount, setNewPostCount] = useState(5);

  // Function to load new posts and scroll to top
  function loadNewPost() {
    const userRole = localStorage.getItem("role");
    const token = localStorage.getItem(`${userRole}AccessToken`);

    // Show loading indicator
    setLoading(true);

    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scroll
    });

    // Reset the page to 1 to fetch new posts from the beginning
    setPage(1);

    // Refetch posts
    getAllPosts(token, true);
  }

  useEffect(() => {
    const handleNewPost = (newPost) => {
      if (newPost.postType === "Required" && newPost.role === "agent") {
        setNewPostCount((prevCount) => {
          prevCount + 1;
        });
      }
    };
    socket.on("newPostCreate", handleNewPost);
    return () => {
      socket.off("newPostCreate");
    };
  }, [socket]);

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > lastScrollTop && scrollTop > 300) {
        // Scrolling down
        setShowButton(true);
      } else {
        // Scrolling up
        setShowButton(false);
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleButtonClick = () => {
    loadNewPost();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className=" pb-[50px]">
      <div className="">
        <div className="">
          <div
            className={`fixed 2xl:top-[240px] xl:top-[240px] lg:top-[240px] md:top-[240px] sm:top-[120px] top-[120px] left-1/2 transform -translate-x-1/2 z-50 transition-opacity duration-300 ease-in-out ${
              showButton ? "opacity-100" : "opacity-0"
            }`}
          >
            {newPostCount > 0 && (
              <button
                type="button"
                onClick={handleButtonClick}
                className="inline-flex items-center rounded bg-primary px-4 py-2 text-[16px]   leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong font-semibold"
              >
                <IoIosRefresh className="text-[20px] mr-[7px]" />
                Refresh
              </button>
            )}
          </div>
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

export default RequiredPostsAgent;
