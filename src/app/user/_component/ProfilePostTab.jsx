import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { FaCheckCircle, FaUser } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdTimer } from "react-icons/io";
import Image from "next/image";
import PackageCard from "./Card/PackageCard";
import PrivateRouteContext from "@/Context/PrivetRouteContext";
import { PostLodaing } from "@/app/Component/NewsFeed/PostLodaing/PostLodaing";
import { PostLocationValueContext } from "@/Context/postValueContext";
import EditPostCard from "./Card/EditPostCard";
import { EditPostLocationValueContext } from "@/Context/EditpostValueContext";
import { AccountVerifyModal } from "@/app/Component/NewsFeed/AccountVerifyModal";
import { EditPostSection } from "./PostEdit/EditPostSection";
import { PostHiddenModal } from "@/app/Component/NewsFeed/PostDeleteAndHiddenModal/PostHidden";
import { PostDeleteModal } from "@/app/Component/NewsFeed/PostDeleteAndHiddenModal/PostDeleteMOdal";
import PostSection from "@/app/Component/NewsFeed/PostSection";
import { PostSearch } from "@/app/Component/NewsFeed/PostSearch/PostSearch";

const ProfilePostTab = ({
  profileId,
  profile,
  followRerander,
  setFollowRerander,
}) => {
  const { user } = PrivateRouteContext();
  const userName = user?.fullName?.split(" ")[0];
  const { setPostId } = useContext(EditPostLocationValueContext);
  const { newsFeedRender } = useContext(PostLocationValueContext);
  const profileRole = profile?.role;
  const myId = user?._id;
  const [activeTab, setActiveTab] = useState("allPosts");
  const [verifyPopup, setVerifyPopup] = useState(false);
  const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");
  const [sortBy, setSortBy] = useState("createdAt");
  const [postType, setPostType] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const containerRefPost = useRef(null);
  const [like, setlike] = useState(true);
  const [saveRerander, setSaveRerander] = useState(false);

  const getAllPosts = async (token, profileId, profileRole) => {
    try {
      setIsFetching(true);
      let url = `https://api.mymakan.ae/allposts/get?`;
      if (profileRole === "agent") {
        url += `agentId=${profileId}&`;
      } else {
        url += `userId=${profileId}&`;
      }
      url += `role=${profileRole}&`;
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
    getAllPosts(token, profileId, profileRole);
  }, [
    sortOrder,
    sortBy,
    limit,
    page,
    like,
    profileId,
    newsFeedRender,
    saveRerander,
    profileRole,
    postType,
    followRerander,
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

  const [isOpen, setIsOpen] = useState(false);
  function open(id) {
    setIsOpen(true);
    setPostId(id);
  }
  const [isOpenHideen, setIsOpenHidden] = useState(false);
  function openHiden(id) {
    setIsOpenHidden(true);
    setPostId(id);
  }
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  function openDelete(id) {
    setIsOpenDelete(true);
    setPostId(id);
  }

  const dateStr = profile?.createdAt;

  const dateObj = new Date(dateStr);

  const options = { year: "numeric", month: "short" };
  const formattedDate = dateObj.toLocaleDateString("en-US", options);
  const totalAdsPost = profile?.totalSponsoredPost + profile?.totalUrgentPost;

  const [isOpenPost, setIsOpenPost] = useState(false);
  function openPost() {
    setIsOpenPost(true);
  }
  function taballPosts() {
    setAllPosts([]),
      setActiveTab("allPosts"),
      setPostType(""),
      setSaveRerander(!saveRerander);
  }
  function tabavailablePosts() {
    setAllPosts([]),
      setActiveTab("availablePosts"),
      setPostType("Available"),
      setSaveRerander(!saveRerander);
  }
  function tabrequiredPosts() {
    setAllPosts([]),
      setActiveTab("required"),
      setPostType("Required"),
      setSaveRerander(!saveRerander);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-11 gap-y-10 lg:gap-10">
      <div className="lg:col-span-5">
        {" "}
        <div className="widget widget-author !pb-2 !pl-2 !pr-2">
          <div className="author-heading">
            <ul className="author-statistics flex justify-around text-center mt-[5px] mb-4">
              <li>
                <a href="#">
                  <span className="text-[16px] text-[#525252] font-bold ">
                    {profile?.totalPost}
                  </span>{" "}
                  <br />
                  <span className=" text-[#9e9faf] font-semibold text-[14px]">
                    Posts
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="text-[16px] text-[#525252] font-bold ">
                    2.4k
                  </span>{" "}
                  <br />
                  <span className=" text-[#9e9faf] font-semibold text-[14px]">
                    Matched
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="text-[16px] text-[#525252] font-bold">
                    {" "}
                    {totalAdsPost}
                  </span>

                  <br />
                  <span className=" whitespace-nowrap text-[#9e9faf] font-semibold text-[14px]">
                    Ads Posts
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="text-[16px] text-[#525252] font-bold">
                    1,125
                  </span>
                  <br />
                  <span className="whitespace-nowrap text-[#9e9faf] font-semibold text-[14px]">
                    My Connect
                  </span>
                </a>
              </li>
            </ul>
            {profile?.role === "agent" && (
              <div className="mt-[4px] mb-[12px]">
                <div className="h-[0.5px] w-full bg-[#5EDFFF] " />
                <div className="mt-[15px] px-[10px]">
                  <p className="-mb-0 text-start text-[16px] text-[#323232CC] text-opacity-80 font-semibold leading-[20px]">
                    Verified By My-Makan in
                  </p>
                  <div className="flex gap-x-2 items-center mt-[10px] ">
                    <div>
                      <p className="-mb-0 text-[11px] text-[#5EDFFF]">
                        <FaCheckCircle className="w-4 h-4" />
                      </p>
                    </div>
                    <div>
                      <p className="-mb-0 text-[16px] leading-[20px] text-[#323232CC] text-opacity-80 font-medium uppercase">
                        {profile?.companyName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="">
              <div className="h-[0.5px] w-full bg-[#5EDFFF] " />
              <div className="mt-[15px] px-[10px]">
                <div className="flex justify-between items-center mb-[10px]">
                  <div className="flex gap-x-2 items-center">
                    <div>
                      <p className="-mb-0 text-[16px] text-[#5EDFFF]">
                        <FaLocationDot className="w-4 h-4" />
                      </p>
                    </div>
                    <div>
                      <p className="-mb-0 text-[16px] text-[#323232CC] text-opacity-80 font-medium">
                        From
                      </p>
                    </div>
                  </div>
                  <div>
                    {profile?.country === null ? (
                      <>
                        {profile?._id === myId ? (
                          <Link href="/user/profile/about">
                            <p className="-mb-0 text-[14px] text-blue-500 text-opacity-80 font-semibold">
                              Add Country
                            </p>
                          </Link>
                        ) : (
                          <p className="-mb-0 text-[14px] text-blue-500 text-opacity-80 font-semibold">
                            Country
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="-mb-0 text-[14px] text-[#323232CC] text-opacity-80 font-semibold">
                        {profile?.country}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center mb-[10px]">
                  <div className="flex gap-x-2 items-center">
                    <div>
                      <p className="-mb-0 text-[16px] text-[#5EDFFF]">
                        <FaUser className="w-4 h-4" />
                      </p>
                    </div>
                    <div>
                      <p className="-mb-0 text-[16px] text-[#323232CC] text-opacity-80 font-medium">
                        Member Since
                      </p>
                    </div>
                  </div>
                  <div>
                    {" "}
                    <p className="-mb-0 text-[14px] text-[#323232CC] text-opacity-80 font-semibold">
                      {formattedDate}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex gap-x-2 items-center">
                    <div>
                      <p className="-mb-0 text-[14px] text-[#5EDFFF]">
                        <IoMdTimer className="w-4 h-4" />
                      </p>
                    </div>
                    <div>
                      <p className="-mb-0 text-[16px] text-[#323232CC] text-opacity-80 font-medium">
                        Avg Response Time
                      </p>
                    </div>
                  </div>
                  <div>
                    {" "}
                    <p className="-mb-0 text-[14px] text-[#323232CC] text-opacity-80 font-semibold">
                      1 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-6">
        {" "}
        {isOpenPost === true && (
          <PostSection isOpen={isOpenPost} setIsOpen={setIsOpenPost} />
        )}
        <div className="lg:!sticky top-[100px] bg-[#EFF4FB] z-10">
          <PostSearch
            open={openPost}
            user={user}
            setVerifyPopup={setVerifyPopup}
            userName={userName}
          />

          <div className="block-box post-input-tab !rounded-none border-t">
            <ul className="nav nav-tabs" role="tablist">
              <li
                className="nav-item"
                role="presentation"
                data-toggle="tooltip"
                data-placement="top"
                title="STATUS"
              >
                <a
                  className={`nav-link ${
                    activeTab === "allPosts" ? "active" : ""
                  }`}
                  onClick={taballPosts}
                  role="tab"
                  aria-selected={activeTab === "allPosts"}
                >
                  <i className="icofont-copy" />
                  All Posts
                </a>
              </li>
              <li
                className="nav-item"
                role="presentation"
                data-toggle="tooltip"
                data-placement="top"
                title="MEDIA"
              >
                <a
                  className={`nav-link ${
                    activeTab === "availablePosts" ? "active" : ""
                  }`}
                  onClick={tabavailablePosts}
                  role="tab"
                  aria-selected={activeTab === "availablePosts"}
                >
                  <i className="icofont-image" />
                  Available Posts
                </a>
              </li>
              <li
                className="nav-item"
                role="presentation"
                data-toggle="tooltip"
                data-placement="top"
                title="BLOG"
              >
                <a
                  className={`nav-link ${
                    activeTab === "required" ? "active" : ""
                  }`}
                  onClick={tabrequiredPosts}
                  role="tab"
                  aria-selected={activeTab === "required"}
                >
                  <i className="icofont-list" />
                  Required Posts
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* news feed card  */}
        <div className="h-screen pb-[50px] -mt-[25px]">
          <EditPostSection isOpen={isOpen} setIsOpen={setIsOpen} />
          <PostHiddenModal
            visible={isOpenHideen}
            closePopUp={setIsOpenHidden}
          />
          <PostDeleteModal
            visible={isOpenDelete}
            closePopUp={setIsOpenDelete}
          />
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
                    {profileId === myId ? (
                      <EditPostCard
                        item={item}
                        myId={myId}
                        setlike={setlike}
                        like={like}
                        open={open}
                        openHiden={openHiden}
                        openDelete={openDelete}
                        saveRerander={saveRerander}
                        setSaveRerander={setSaveRerander}
                      />
                    ) : (
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
                    )}
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
      <AccountVerifyModal visible={verifyPopup} closePopUp={setVerifyPopup} />
    </div>
  );
};

export default ProfilePostTab;
