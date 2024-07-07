import Image from "next/image";
import React from "react";

export default function Groups() {
  return (
    <>
      <div className="page-conten">
        <div className="container">
          <div className="block-box user-search-bar">
            <div className="box-item search-box">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Groups"
                />
                <div className="input-group-append">
                  <button className="search-btn" type="button">
                    <i className="icofont-search" />
                  </button>
                </div>
              </div>
            </div>
            <div className="box-item search-filter">
              <div className="dropdown">
                <label>Order By:</label>
                <button
                  className="dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                  aria-expanded="false"
                >
                  Newest Groups
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    All Groups
                  </a>
                  <a className="dropdown-item" href="#">
                    Newest Groups
                  </a>
                  <a className="dropdown-item" href="#">
                    Oldest Groups
                  </a>
                </div>
              </div>
            </div>
            <div className="box-item search-switcher">
              <ul className="user-view-switcher">
                <li className="active">
                  <a
                    className="user-view-trigger"
                    href="#"
                    data-type="user-grid-view"
                  >
                    <i className="icofont-layout" />
                  </a>
                </li>
                <li>
                  <a
                    className="user-view-trigger"
                    href="#"
                    data-type="user-list-view"
                  >
                    <i className="icofont-listine-dots" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div id="user-view" className="user-grid-view">
            <div className="row gutters-20">
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="widget-author user-group">
                  <div className="author-heading">
                    <div className="cover-img">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/cover_1.jpg"
                        alt="cover"
                      />
                    </div>
                    <div className="profile-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/groups/user_group1.jpg"
                          alt="author"
                        />
                      </a>
                    </div>
                    <div className="profile-name">
                      <h4 className="author-name">
                        <a href="user-single-group.html">Tourist Ways</a>
                      </h4>
                      <div className="author-location">@tourist</div>
                    </div>
                  </div>
                  <ul className="member-thumb">
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_1.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_2.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_3.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_5.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <i className="icofont-plus" />
                    </li>
                  </ul>
                  <ul className="author-statistics">
                    <li>
                      <a href="#">
                        <span className="item-number">25</span>{" "}
                        <span className="item-text">GROUP POSTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">230</span>{" "}
                        <span className="item-text">ALL MEMBERS</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="widget-author user-group">
                  <div className="author-heading">
                    <div className="cover-img">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/cover_2.jpg"
                        alt="cover"
                      />
                    </div>
                    <div className="profile-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/groups/user_group2.jpg"
                          alt="author"
                        />
                      </a>
                    </div>
                    <div className="profile-name">
                      <h4 className="author-name">
                        <a href="user-single-group.html">Music Manila</a>
                      </h4>
                      <div className="author-location">@music</div>
                    </div>
                  </div>
                  <ul className="member-thumb">
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_1.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_2.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_3.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_5.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <i className="icofont-plus" />
                    </li>
                  </ul>
                  <ul className="author-statistics">
                    <li>
                      <a href="#">
                        <span className="item-number">25</span>{" "}
                        <span className="item-text">GROUP POSTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">230</span>{" "}
                        <span className="item-text">ALL MEMBERS</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="widget-author user-group">
                  <div className="author-heading">
                    <div className="cover-img">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/cover_3.jpg"
                        alt="cover"
                      />
                    </div>
                    <div className="profile-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/groups/user_group3.jpg"
                          alt="author"
                        />
                      </a>
                    </div>
                    <div className="profile-name">
                      <h4 className="author-name">
                        <a href="user-single-group.html">Sports Zone</a>
                      </h4>
                      <div className="author-location">@sports</div>
                    </div>
                  </div>
                  <ul className="member-thumb">
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_1.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_2.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_3.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_5.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <i className="icofont-plus" />
                    </li>
                  </ul>
                  <ul className="author-statistics">
                    <li>
                      <a href="#">
                        <span className="item-number">25</span>{" "}
                        <span className="item-text">GROUP POSTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">230</span>{" "}
                        <span className="item-text">ALL MEMBERS</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="widget-author user-group">
                  <div className="author-heading">
                    <div className="cover-img">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/cover_4.jpg"
                        alt="cover"
                      />
                    </div>
                    <div className="profile-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/groups/user_group4.jpg"
                          alt="author"
                        />
                      </a>
                    </div>
                    <div className="profile-name">
                      <h4 className="author-name">
                        <a href="user-single-group.html">Nature Jungle</a>
                      </h4>
                      <div className="author-location">@nature</div>
                    </div>
                  </div>
                  <ul className="member-thumb">
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_1.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_2.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_3.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_5.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <i className="icofont-plus" />
                    </li>
                  </ul>
                  <ul className="author-statistics">
                    <li>
                      <a href="#">
                        <span className="item-number">25</span>{" "}
                        <span className="item-text">GROUP POSTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">230</span>{" "}
                        <span className="item-text">ALL MEMBERS</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="widget-author user-group">
                  <div className="author-heading">
                    <div className="cover-img">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/cover_5.jpg"
                        alt="cover"
                      />
                    </div>
                    <div className="profile-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/groups/user_group5.jpg"
                          alt="author"
                        />
                      </a>
                    </div>
                    <div className="profile-name">
                      <h4 className="author-name">
                        <a href="user-single-group.html">Electronics Taxi</a>
                      </h4>
                      <div className="author-location">@electronics</div>
                    </div>
                  </div>
                  <ul className="member-thumb">
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_1.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_2.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_3.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_5.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <i className="icofont-plus" />
                    </li>
                  </ul>
                  <ul className="author-statistics">
                    <li>
                      <a href="#">
                        <span className="item-number">25</span>{" "}
                        <span className="item-text">GROUP POSTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">230</span>{" "}
                        <span className="item-text">ALL MEMBERS</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="widget-author user-group">
                  <div className="author-heading">
                    <div className="cover-img">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/cover_3.jpg"
                        alt="cover"
                      />
                    </div>
                    <div className="profile-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/groups/user_group6.jpg"
                          alt="author"
                        />
                      </a>
                    </div>
                    <div className="profile-name">
                      <h4 className="author-name">
                        <a href="user-single-group.html">Kids Sports</a>
                      </h4>
                      <div className="author-location">@kids</div>
                    </div>
                  </div>
                  <ul className="member-thumb">
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_1.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_2.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_3.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_5.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <i className="icofont-plus" />
                    </li>
                  </ul>
                  <ul className="author-statistics">
                    <li>
                      <a href="#">
                        <span className="item-number">25</span>{" "}
                        <span className="item-text">GROUP POSTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">230</span>{" "}
                        <span className="item-text">ALL MEMBERS</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="widget-author user-group">
                  <div className="author-heading">
                    <div className="cover-img">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/cover_8.jpg"
                        alt="cover"
                      />
                    </div>
                    <div className="profile-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/groups/user_group7.jpg"
                          alt="author"
                        />
                      </a>
                    </div>
                    <div className="profile-name">
                      <h4 className="author-name">
                        <a href="user-single-group.html">Food Lovers</a>
                      </h4>
                      <div className="author-location">@food</div>
                    </div>
                  </div>
                  <ul className="member-thumb">
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_1.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_2.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_3.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_5.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <i className="icofont-plus" />
                    </li>
                  </ul>
                  <ul className="author-statistics">
                    <li>
                      <a href="#">
                        <span className="item-number">25</span>{" "}
                        <span className="item-text">GROUP POSTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">230</span>{" "}
                        <span className="item-text">ALL MEMBERS</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="widget-author user-group">
                  <div className="author-heading">
                    <div className="cover-img">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/cover_2.jpg"
                        alt="cover"
                      />
                    </div>
                    <div className="profile-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/groups/user_group8.jpg"
                          alt="author"
                        />
                      </a>
                    </div>
                    <div className="profile-name">
                      <h4 className="author-name">
                        <a href="user-single-group.html">Fashion Craze</a>
                      </h4>
                      <div className="author-location">@fashion</div>
                    </div>
                  </div>
                  <ul className="member-thumb">
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_1.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_2.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_3.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_5.jpg"
                        alt="member"
                      />
                    </li>
                    <li>
                      <i className="icofont-plus" />
                    </li>
                  </ul>
                  <ul className="author-statistics">
                    <li>
                      <a href="#">
                        <span className="item-number">25</span>{" "}
                        <span className="item-text">GROUP POSTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">230</span>{" "}
                        <span className="item-text">ALL MEMBERS</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="pagination">
              <ul>
                <li>
                  <a href="#" className="active">
                    1
                  </a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
