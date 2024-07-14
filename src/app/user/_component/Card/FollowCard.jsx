import Image from "next/image";
import Link from "next/link";
import React from "react";

export const FollowCard = ({ item }) => {
  const { followingBuyer, followerBuyer } = item;
  const common = followingBuyer ? followingBuyer : followerBuyer;
  return (
    <div className="col-xl-3 col-lg-4 col-md-6">
      <div className="widget-author">
        <div className="author-heading">
          <div className="cover-img">
            <Image
              width={1000}
              height={100}
              className="w-auto h-auto"
              src="/media/figure/cover_6.jpg"
              alt="cover"
            />
          </div>
          <div className="profile-img">
            <a href="#">
              <Image
                width={1000}
                height={100}
                className="w-[100px] h-auto"
                src={common?.image}
                alt="author"
              />
            </a>
          </div>
          <div className="profile-name">
            <h4 className="author-name">
              <Link href="user-timeline.html">{common?.fullName}</Link>
            </h4>
            <div className="author-location -mb-0">
              {" "}
              {common?.country === null ? "..." : common?.country}
            </div>
          </div>
        </div>

        <ul className="author-statistics">
          <li>
            <a href="#">
              <span className="item-number">{common?.totalPost}</span>{" "}
              <span className="item-text">POSTS</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="item-number">{common?.totalReview}</span>{" "}
              <span className="item-text">REVIEW</span>
            </a>
          </li>
          <li>
            <a href="#">
              <span className="item-number">{common?.avgrating}</span>{" "}
              <span className="item-text">RATING</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
