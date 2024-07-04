import Image from "next/image";
import React from "react";

export default function Followers() {
  return (
    <>
      {/* Page Content */}
      <div className="page-conten">
        <div className="container">
          <div className="block-box user-search-bar">
            <div className="box-item search-box">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Member"
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
                  Newest Member
                </button>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">
                    All Member
                  </a>
                  <a className="dropdown-item" href="#">
                    Newest Member
                  </a>
                  <a className="dropdown-item" href="#">
                    Oldest Member
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
                <div className="widget-author">
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
                          src="/media/figure/author_1.jpg"
                          alt="author"
                        />
                      </a>
                    </div>
                    <div className="profile-name">
                      <h4 className="author-name">
                        <a href="user-timeline.html">Rebeca Powel</a>
                      </h4>
                      <div className="author-location">@ahat akter</div>
                    </div>
                  </div>
                  <ul className="author-badge">
                    <li>
                      <a href="#" className="bg-salmon-gradient">
                        <i className="icofont-star" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-amethyst-gradient">
                        <i className="icofont-ui-play" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-sun-gradient">
                        <i className="icofont-squirrel" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-jungle-gradient">
                        <i className="icofont-rocket-alt-1" />
                      </a>
                    </li>
                  </ul>
                  <ul className="author-statistics">
                    <li>
                      <a href="#">
                        <span className="item-number">30</span>{" "}
                        <span className="item-text">POSTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">12</span>{" "}
                        <span className="item-text">COMMENTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">1,125</span>{" "}
                        <span className="item-text">VIEWS</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="widget-author">
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
                          src="/media/figure/author_3.jpg"
                          alt="author"
                        />
                      </a>
                    </div>
                    <div className="profile-name">
                      <h4 className="author-name">
                        <a href="user-timeline.html">Julia Zessy</a>
                      </h4>
                      <div className="author-location">@zessyr</div>
                    </div>
                  </div>
                  <ul className="author-badge">
                    <li>
                      <a href="#" className="bg-salmon-gradient">
                        <i className="icofont-star" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-amethyst-gradient">
                        <i className="icofont-ui-play" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-sun-gradient">
                        <i className="icofont-squirrel" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-jungle-gradient">
                        <i className="icofont-rocket-alt-1" />
                      </a>
                    </li>
                  </ul>
                  <ul className="author-statistics">
                    <li>
                      <a href="#">
                        <span className="item-number">30</span>{" "}
                        <span className="item-text">POSTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">12</span>{" "}
                        <span className="item-text">COMMENTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">1,125</span>{" "}
                        <span className="item-text">VIEWS</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="widget-author">
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
                          src="/media/figure/author_4.jpg"
                          alt="author"
                        />
                      </a>
                    </div>
                    <div className="profile-name">
                      <h4 className="author-name">
                        <a href="user-timeline.html">Fahim Rahman</a>
                      </h4>
                      <div className="author-location">@rahman</div>
                    </div>
                  </div>
                  <ul className="author-badge">
                    <li>
                      <a href="#" className="bg-salmon-gradient">
                        <i className="icofont-star" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-amethyst-gradient">
                        <i className="icofont-ui-play" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-sun-gradient">
                        <i className="icofont-squirrel" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-jungle-gradient">
                        <i className="icofont-rocket-alt-1" />
                      </a>
                    </li>
                  </ul>
                  <ul className="author-statistics">
                    <li>
                      <a href="#">
                        <span className="item-number">30</span>{" "}
                        <span className="item-text">POSTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">12</span>{" "}
                        <span className="item-text">COMMENTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">1,125</span>{" "}
                        <span className="item-text">VIEWS</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="widget-author">
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
                          src="/media/figure/author_5.jpg"
                          alt="author"
                        />
                      </a>
                    </div>
                    <div className="profile-name">
                      <h4 className="author-name">
                        <a href="user-timeline.html">Aahat Akter</a>
                      </h4>
                      <div className="author-location">@aahat</div>
                    </div>
                  </div>
                  <ul className="author-badge">
                    <li>
                      <a href="#" className="bg-salmon-gradient">
                        <i className="icofont-star" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-amethyst-gradient">
                        <i className="icofont-ui-play" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-sun-gradient">
                        <i className="icofont-squirrel" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-jungle-gradient">
                        <i className="icofont-rocket-alt-1" />
                      </a>
                    </li>
                  </ul>
                  <ul className="author-statistics">
                    <li>
                      <a href="#">
                        <span className="item-number">30</span>{" "}
                        <span className="item-text">POSTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">12</span>{" "}
                        <span className="item-text">COMMENTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">1,125</span>{" "}
                        <span className="item-text">VIEWS</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="widget-author">
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
                          src="/media/figure/author_6.jpg"
                          alt="author"
                        />
                      </a>
                    </div>
                    <div className="profile-name">
                      <h4 className="author-name">
                        <a href="user-timeline.html">Aahat Akter</a>
                      </h4>
                      <div className="author-location">@aahat</div>
                    </div>
                  </div>
                  <ul className="author-badge">
                    <li>
                      <a href="#" className="bg-salmon-gradient">
                        <i className="icofont-star" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-amethyst-gradient">
                        <i className="icofont-ui-play" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-sun-gradient">
                        <i className="icofont-squirrel" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-jungle-gradient">
                        <i className="icofont-rocket-alt-1" />
                      </a>
                    </li>
                  </ul>
                  <ul className="author-statistics">
                    <li>
                      <a href="#">
                        <span className="item-number">30</span>{" "}
                        <span className="item-text">POSTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">12</span>{" "}
                        <span className="item-text">COMMENTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">1,125</span>{" "}
                        <span className="item-text">VIEWS</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
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
                          className="w-auto h-auto"
                          src="/media/figure/author_7.jpg"
                          alt="author"
                        />
                      </a>
                    </div>
                    <div className="profile-name">
                      <h4 className="author-name">
                        <a href="user-timeline.html">Aahat Akter</a>
                      </h4>
                      <div className="author-location">@aahat</div>
                    </div>
                  </div>
                  <ul className="author-badge">
                    <li>
                      <a href="#" className="bg-salmon-gradient">
                        <i className="icofont-star" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-amethyst-gradient">
                        <i className="icofont-ui-play" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-sun-gradient">
                        <i className="icofont-squirrel" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-jungle-gradient">
                        <i className="icofont-rocket-alt-1" />
                      </a>
                    </li>
                  </ul>
                  <ul className="author-statistics">
                    <li>
                      <a href="#">
                        <span className="item-number">30</span>{" "}
                        <span className="item-text">POSTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">12</span>{" "}
                        <span className="item-text">COMMENTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">1,125</span>{" "}
                        <span className="item-text">VIEWS</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="widget-author">
                  <div className="author-heading">
                    <div className="cover-img">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/cover_7.jpg"
                        alt="cover"
                      />
                    </div>
                    <div className="profile-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/author_8.jpg"
                          alt="author"
                        />
                      </a>
                    </div>
                    <div className="profile-name">
                      <h4 className="author-name">
                        <a href="user-timeline.html">Aahat Akter</a>
                      </h4>
                      <div className="author-location">@aahat</div>
                    </div>
                  </div>
                  <ul className="author-badge">
                    <li>
                      <a href="#" className="bg-salmon-gradient">
                        <i className="icofont-star" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-amethyst-gradient">
                        <i className="icofont-ui-play" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-sun-gradient">
                        <i className="icofont-squirrel" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-jungle-gradient">
                        <i className="icofont-rocket-alt-1" />
                      </a>
                    </li>
                  </ul>
                  <ul className="author-statistics">
                    <li>
                      <a href="#">
                        <span className="item-number">30</span>{" "}
                        <span className="item-text">POSTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">12</span>{" "}
                        <span className="item-text">COMMENTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">1,125</span>{" "}
                        <span className="item-text">VIEWS</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="widget-author">
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
                          src="/media/figure/author_9.jpg"
                          alt="author"
                        />
                      </a>
                    </div>
                    <div className="profile-name">
                      <h4 className="author-name">
                        <a href="user-timeline.html">Aahat Akter</a>
                      </h4>
                      <div className="author-location">@aahat</div>
                    </div>
                  </div>
                  <ul className="author-badge">
                    <li>
                      <a href="#" className="bg-salmon-gradient">
                        <i className="icofont-star" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-amethyst-gradient">
                        <i className="icofont-ui-play" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-sun-gradient">
                        <i className="icofont-squirrel" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-jungle-gradient">
                        <i className="icofont-rocket-alt-1" />
                      </a>
                    </li>
                  </ul>
                  <ul className="author-statistics">
                    <li>
                      <a href="#">
                        <span className="item-number">30</span>{" "}
                        <span className="item-text">POSTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">12</span>{" "}
                        <span className="item-text">COMMENTS</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <span className="item-number">1,125</span>{" "}
                        <span className="item-text">VIEWS</span>
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
