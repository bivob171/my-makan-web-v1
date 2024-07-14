import Image from "next/image";
import React from "react";

const RelatedBlogs = () => {
  return (
    <div className="realated-blog bg-white py-4 mb-10 rounded-md">
      <div className="">
        <h2 className="px-4 pb-2">Related Blog Posts</h2>
      </div>
      <div className="row">
        <div className="col-lg-4">
          <div className="block-box user-blog ">
            <div className="blog-Image">
              <a href="#" className="w-full">
                <Image
                  width={1000}
                  height={500}
                  className="!w-full !h-full"
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
                <a href="#">Spoke with the developer sety 2020 Gaming Area</a>
              </h3>
              <div className="blog-date">
                <i className="icofont-calendar" /> 15 October, 2020
              </div>
              <p>
                when ann unknown printer took galley type and scrambled it to
                make aretype specimen book has survived not only.
              </p>
            </div>
            <div className="blog-meta">
              <ul>
                <li className="blog-reaction">
                  <div className="reaction-icon !flex justify-start">
                    <Image
                      width={500}
                      height={500}
                      className="w-auto h-auto"
                      src="/media/figure/reaction_1.png"
                      alt="icon"
                    />
                    <Image
                      width={500}
                      height={500}
                      className="w-auto h-auto"
                      src="/media/figure/reaction_2.png"
                      alt="icon"
                    />
                    <Image
                      width={500}
                      height={500}
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
        <div className="col-lg-4">
          <div className="block-box user-blog">
            <div className="blog-Image ">
              <a href="#" className="w-full">
                <Image
                  width={500}
                  height={500}
                  className="w-full h-auto"
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
                <a href="#">Spoke with the developer sety 2020 Gaming Area</a>
              </h3>
              <div className="blog-date">
                <i className="icofont-calendar" /> 15 October, 2020
              </div>
              <p>
                when ann unknown printer took galley type and scrambled it to
                make aretype specimen book has survived not only.
              </p>
            </div>
            <div className="blog-meta">
              <ul>
                <li className="blog-reaction">
                  <div className="reaction-icon !flex justify-start">
                    <Image
                      width={500}
                      height={500}
                      className="w-auto h-auto"
                      src="/media/figure/reaction_1.png"
                      alt="icon"
                    />
                    <Image
                      width={500}
                      height={500}
                      className="w-auto h-auto"
                      src="/media/figure/reaction_2.png"
                      alt="icon"
                    />
                    <Image
                      width={500}
                      height={500}
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
        <div className="col-lg-4">
          <div className="block-box user-blog">
            <div className="blog-Image ">
              <a href="#" className="w-full">
                <Image
                  width={500}
                  height={500}
                  className="w-full h-auto"
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
                <a href="#">Spoke with the developer sety 2020 Gaming Area</a>
              </h3>
              <div className="blog-date">
                <i className="icofont-calendar" /> 15 October, 2020
              </div>
              <p>
                when ann unknown printer took galley type and scrambled it to
                make aretype specimen book has survived not only.
              </p>
            </div>
            <div className="blog-meta">
              <ul>
                <li className="blog-reaction">
                  <div className="reaction-icon !flex justify-start">
                    <Image
                      width={500}
                      height={500}
                      className="w-auto h-auto"
                      src="/media/figure/reaction_1.png"
                      alt="icon"
                    />
                    <Image
                      width={500}
                      height={500}
                      className="w-auto h-auto"
                      src="/media/figure/reaction_2.png"
                      alt="icon"
                    />
                    <Image
                      width={500}
                      height={500}
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
    </div>
  );
};

export default RelatedBlogs;
