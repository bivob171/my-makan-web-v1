import Image from "next/image";
import React from "react";

export default function Blogs() {
  return (
    <>
      <div className="page-conten">
        <div className="container">
          <div className="block-box user-search-bar justify-content-between">
            <div className="box-item">
              <div className="item-show-title">Total 20 Posts</div>
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
                  Newest Post
                </button>
                <div className="dropdown-menu dropdown-menu-right">
                  <a className="dropdown-item" href="#">
                    All Post
                  </a>
                  <a className="dropdown-item" href="#">
                    Newest Post
                  </a>
                  <a className="dropdown-item" href="#">
                    Oldest Post
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="row gutters-20">
            <div className="col-lg-4 col-md-6">
              <div className="block-box user-blog">
                <div className="blog-img">
                  <a href="#">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/blog/blog_4.jpg"
                      alt="Blog"
                    />
                  </a>
                </div>
                <div className="blog-content">
                  <div className="blog-category">
                    <a href="#">Community</a>
                    <a href="#">Inspiration</a>
                  </div>
                  <h3 className="blog-title">
                    <a href="#">
                      Spoke with the developer sety 2020 Gaming Area
                    </a>
                  </h3>
                  <div className="blog-date">
                    <i className="icofont-calendar" /> 15 October, 2020
                  </div>
                  <p>
                    when ann unknown printer took galley type and scrambled it
                    to make aretype specimen book has survived not only.
                  </p>
                </div>
                <div className="blog-meta">
                  <ul>
                    <li className="blog-reaction">
                      <div className="reaction-icon  flex">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/reaction_1.png"
                          alt="icon"
                        />
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/reaction_2.png"
                          alt="icon"
                        />
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/reaction_3.png"
                          alt="icon"
                        />
                      </div>
                      <div className="meta-text">+ 15 others</div>
                    </li>
                    <li>
                      <i className="icofont-comment" /> 05
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="block-box user-blog">
                <div className="blog-img">
                  <a href="#">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/blog/blog_5.jpg"
                      alt="Blog"
                    />
                  </a>
                </div>
                <div className="blog-content">
                  <div className="blog-category">
                    <a href="#">Sporty</a>
                  </div>
                  <h3 className="blog-title">
                    <a href="#">
                      Spoke with the developer sety 2020 Gaming Area
                    </a>
                  </h3>
                  <div className="blog-date">
                    <i className="icofont-calendar" /> 15 October, 2020
                  </div>
                  <p>
                    when ann unknown printer took galley type and scrambled it
                    to make aretype specimen book has survived not only.
                  </p>
                </div>
                <div className="blog-meta">
                  <ul>
                    <li className="blog-reaction">
                      <div className="reaction-icon  flex">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/reaction_1.png"
                          alt="icon"
                        />
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/reaction_2.png"
                          alt="icon"
                        />
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/reaction_3.png"
                          alt="icon"
                        />
                      </div>
                      <div className="meta-text">+ 15 others</div>
                    </li>
                    <li>
                      <i className="icofont-comment" /> 05
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="block-box user-blog">
                <div className="blog-img">
                  <a href="#">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/blog/blog_6.jpg"
                      alt="Blog"
                    />
                  </a>
                </div>
                <div className="blog-content">
                  <div className="blog-category">
                    <a href="#">Community</a>
                    <a href="#">Inspiration</a>
                  </div>
                  <h3 className="blog-title">
                    <a href="#">
                      Spoke with the developer sety 2020 Gaming Area
                    </a>
                  </h3>
                  <div className="blog-date">
                    <i className="icofont-calendar" /> 15 October, 2020
                  </div>
                  <p>
                    when ann unknown printer took galley type and scrambled it
                    to make aretype specimen book has survived not only.
                  </p>
                </div>
                <div className="blog-meta">
                  <ul>
                    <li className="blog-reaction">
                      <div className="reaction-icon  flex">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/reaction_1.png"
                          alt="icon"
                        />
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/reaction_2.png"
                          alt="icon"
                        />
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/reaction_3.png"
                          alt="icon"
                        />
                      </div>
                      <div className="meta-text">+ 15 others</div>
                    </li>
                    <li>
                      <i className="icofont-comment" /> 05
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="block-box user-blog">
                <div className="blog-img">
                  <a href="#">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/blog/blog_7.jpg"
                      alt="Blog"
                    />
                  </a>
                </div>
                <div className="blog-content">
                  <div className="blog-category">
                    <a href="#">Community</a>
                    <a href="#">Inspiration</a>
                  </div>
                  <h3 className="blog-title">
                    <a href="#">
                      Spoke with the developer sety 2020 Gaming Area
                    </a>
                  </h3>
                  <div className="blog-date">
                    <i className="icofont-calendar" /> 15 October, 2020
                  </div>
                  <p>
                    when ann unknown printer took galley type and scrambled it
                    to make aretype specimen book has survived not only.
                  </p>
                </div>
                <div className="blog-meta">
                  <ul>
                    <li className="blog-reaction">
                      <div className="reaction-icon  flex">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/reaction_1.png"
                          alt="icon"
                        />
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/reaction_2.png"
                          alt="icon"
                        />
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/reaction_3.png"
                          alt="icon"
                        />
                      </div>
                      <div className="meta-text">+ 15 others</div>
                    </li>
                    <li>
                      <i className="icofont-comment" /> 05
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="block-box user-blog">
                <div className="blog-img">
                  <a href="#">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/blog/blog_8.jpg"
                      alt="Blog"
                    />
                  </a>
                </div>
                <div className="blog-content">
                  <div className="blog-category">
                    <a href="#">Community</a>
                    <a href="#">Inspiration</a>
                  </div>
                  <h3 className="blog-title">
                    <a href="#">
                      Spoke with the developer sety 2020 Gaming Area
                    </a>
                  </h3>
                  <div className="blog-date">
                    <i className="icofont-calendar" /> 15 October, 2020
                  </div>
                  <p>
                    when ann unknown printer took galley type and scrambled it
                    to make aretype specimen book has survived not only.
                  </p>
                </div>
                <div className="blog-meta">
                  <ul>
                    <li className="blog-reaction">
                      <div className="reaction-icon  flex">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/reaction_1.png"
                          alt="icon"
                        />
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/reaction_2.png"
                          alt="icon"
                        />
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/reaction_3.png"
                          alt="icon"
                        />
                      </div>
                      <div className="meta-text">+ 15 others</div>
                    </li>
                    <li>
                      <i className="icofont-comment" /> 05
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="block-box user-blog">
                <div className="blog-img">
                  <a href="#">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/blog/blog_9.jpg"
                      alt="Blog"
                    />
                  </a>
                </div>
                <div className="blog-content">
                  <div className="blog-category">
                    <a href="#">Community</a>
                    <a href="#">Inspiration</a>
                  </div>
                  <h3 className="blog-title">
                    <a href="#">
                      Spoke with the developer sety 2020 Gaming Area
                    </a>
                  </h3>
                  <div className="blog-date">
                    <i className="icofont-calendar" /> 15 October, 2020
                  </div>
                  <p>
                    when ann unknown printer took galley type and scrambled it
                    to make aretype specimen book has survived not only.
                  </p>
                </div>
                <div className="blog-meta">
                  <ul>
                    <li className="blog-reaction">
                      <div className="reaction-icon  flex">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/reaction_1.png"
                          alt="icon"
                        />
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/reaction_2.png"
                          alt="icon"
                        />
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/reaction_3.png"
                          alt="icon"
                        />
                      </div>
                      <div className="meta-text">+ 15 others</div>
                    </li>
                    <li>
                      <i className="icofont-comment" /> 05
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="load-more-post">
            <a href="#" className="item-btn">
              <i className="icofont-refresh" />
              Load More Posts
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
