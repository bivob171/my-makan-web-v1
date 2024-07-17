import Image from "next/image";
import React from "react";

const RelatedBlogs = () => {
  return (
    <div className="realated-blog py-4 rounded-md">
      <div className="">
        <h2 className="px-4 pb-2">Related Posts</h2>
      </div>
      <div className="mt-5">
        <div className="w-full">
          <div className="block-box user-blog flex items-center justify-center gap-4 border">
              <a href="#" className="w-full p-1">
                <Image
                  width={1000}
                  height={500}
                  className="!w-[950px] h-full rounded-l-md"
                  src="/media/blog/blog_4.jpg"
                  alt="Blog"
                />
              </a>
            <div className="blog-content p-0">
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
              <div className="blog-meta p-2">
                <ul className="pr-4 pt-1">
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
        <div className="w-full">
          <div className="block-box user-blog flex items-center justify-center gap-4 border">
              <a href="#" className="w-full p-1">
                <Image
                  width={1000}
                  height={500}
                  className="!w-[950px] h-full rounded-l-md"
                  src="/media/blog/blog_6.jpg"
                  alt="Blog"
                />
              </a>
            <div className="blog-content p-0">
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
              <div className="blog-meta p-2">
                <ul className="pr-4 pt-1">
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
        <div className="w-full">
          <div className="block-box user-blog flex items-center justify-center gap-4 border">
              <a href="#" className="w-full p-1">
                <Image
                  width={1000}
                  height={500}
                  className="!w-[950px] h-full rounded-l-md"
                  src="/media/blog/blog_5.jpg"
                  alt="Blog"
                />
              </a>
            <div className="blog-content p-0">
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
              <div className="blog-meta p-2">
                <ul className="pr-4 pt-1">
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
    </div>
  );
};

export default RelatedBlogs;
