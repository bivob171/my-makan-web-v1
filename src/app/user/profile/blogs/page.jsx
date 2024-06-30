import React from "react";
import Image from "next/image";
import blogsData from "./blogsData.json"; 

export default function Blogs() {
  const { posts } = blogsData;

  return (
    <>
      <div className="">
        <div className="container">
          <div className="block-box user-search-bar justify-content-between">
            <div className="box-item">
              <div className="item-show-title">Total {posts.length} Posts</div>
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
            {posts.map((post, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="block-box user-blog">
                  <div className="blog-img">
                    <a href="#">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src={post.image}
                        alt="Blog"
                      />
                    </a>
                  </div>
                  <div className="blog-content">
                    <div className="blog-category">
                      {post.categories.map((category, idx) => (
                        <a key={idx} href="#">{category}</a>
                      ))}
                    </div>
                    <h3 className="blog-title">
                      <a href="#">{post.title}</a>
                    </h3>
                    <div className="blog-date">
                      <i className="icofont-calendar" /> {post.date}
                    </div>
                    <p>{post.description}</p>
                  </div>
                  <div className="blog-meta">
                    <ul>
                      <li className="blog-reaction">
                        <div className="reaction-icon flex">
                          {post.reactions.map((reaction, idx) => (
                            <Image
                              key={idx}
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src={`/media/figure/${reaction}`}
                              alt="icon"
                            />
                          ))}
                        </div>
                        <div className="meta-text">+ {post.reactionCount} others</div>
                      </li>
                      <li>
                        <i className="icofont-comment" /> {post.commentsCount}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="load-more-post !w-full">
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
