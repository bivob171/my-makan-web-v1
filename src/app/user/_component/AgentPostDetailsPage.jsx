"use client";

import Image from "next/image";
import React from "react";
import AgentComment from "./AgentComment";
import GallerySection from "./GallerySection";
import VideoSection from "./VideoSection";
import File from "./File";
import GoogleMap from "./GoogleMap";
import TagsSection from "./TagsSection";
import SellTypeSection from "./SellTypeSection";
import PropertyInformation from "./PropertyInformation";
import RelatedBlogs from "./RelatedBlogs";

export const AgentPostDetailsPage = () => {
  return (
    <div className="page-content text-[#333]">
      {" "}
      <div className="container">
        <div className="block-box user-single-blog mt-4">
          <div className="blog-thumbnail">
            <Image
              src="/media/blog/blog_10.jpg"
              width={1000}
              height={1000}
              alt="Blog"
              className="w-full"
            />
          </div>
          <div className="blog-content-wrap">
            <div className="blog-entry-header">
              <div className="inline-flex items-center font-bold gap-2 mb-3">
                <div className="">
                  <span className="text-[16px]">AED</span>{" "}
                  <span className="text-[22px] ">2,750,000</span>
                </div>
                <span className="text-[24px] font-light leading-none">|</span>
                <span className="text-[16px]">
                  1,900 <span>sqft</span>
                </span>
              </div>
              <h2 className="entry-title">
                Spoke with the developer sety make atype specimen book has
                survived not only five centuries
              </h2>
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <ul className="entry-meta">
                    <li>
                      <Image
                        src="/media/figure/chat_7.jpg"
                        alt="Chat"
                        width={500}
                        height={500}
                        className="w-10 h-auto"
                      />
                      By <a href="#">Fahim Rahman</a>
                    </li>
                    <li>
                      <i className="icofont-calendar" /> 15 October, 2020
                    </li>
                    <li>
                      <i className="icofont-like" /> Like: 505
                    </li>
                    <li>
                      <i className="icofont-comment" /> Comments: 05
                    </li>
                  </ul>
                </div>
                <div className="col-lg-4">
                  <ul className="blog-share">
                    <li>
                      <a href="#" className="bg-fb">
                        <i className="icofont-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-twitter">
                        <i className="icofont-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-dribble">
                        <i className="icofont-dribbble" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-youtube">
                        <i className="icofont-youtube" />
                      </a>
                    </li>
                    <li>
                      <a href="#" className="bg-behance">
                        <i className="icofont-behance" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="blog-content">
              <p>
                Seohen an unknown printer took a galley of type and scrambled it
                to make a type specimen book. It has survived not only five
                centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised in the 1960s
                with the release of Letraset sheets strickcontainingwhen an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting.{" "}
              </p>
              <blockquote>
                <p>
                  Blog estibulum diam metus, varius quis eleifend eget,
                  tincidunt sit amet ante. Etiam quisaccu msan vamus
                  efeliselconvallis, ultrices commodo nisety ncidunt odio, ut
                  varius mi justo. Blog estibulum diam metuultrices commodo
                  erisque et orci convallis, ultrices commodo nisety ncidunt
                  odio, ut varius mi ex quis justo.{" "}
                </p>
              </blockquote>
              <p>
                Seohen an unknown printer took a galley of type and scrambled it
                to make a type specimen book. It has survived not only five
                centuries, but also the leap into electronic typesetting,
                remaining essentially unchanged. It was popularised in the 1960s
                with the release of Letraset sheets strickcontainingwhen an
                unknown printer took a galley of type and scrambled it to make a
                type specimen book. It has survived not only five centuries, but
                also the leap into electronic typesetting.{" "}
              </p>
              <div className="">
                <center>
                  <h2 className="text-[3vw] mt-3 !mb-6 text-[#444] underline">
                    Images
                  </h2>
                </center>
                <GallerySection />
              </div>
              <div className="">
                <center>
                  <h2 className="text-[3vw] mt-3 !mb-6 text-[#444] underline">
                    Videos
                  </h2>
                </center>
                <VideoSection />
              </div>
              <div className="">
                <center>
                  <h2 className="text-[3vw] mt-3 !mb-6 text-[#444] underline">
                    File
                  </h2>
                </center>
                <File />
              </div>
              <h3 className="item-title">What’s In Your Mind?</h3>
              <p>
                Seohen an unknown printer tok a galley of type and scrambled it
                to maketypspecimen book. It has survived not only five
                centuries, but also the leapremaining essentially
                unchanged.ook.Seohen an unknown printer tok a galley of type and
                scrambled it to maketypspecimen bs survive but also the leap
                into electronic typesetting, remaining essentially unchanged. It
                was popularised in the 1960s with the release of Letraset shee
                Ipsum passages, and more recently with desktop publishing.
              </p>
            </div>
            {/* Property Information */}
            <div>
              <PropertyInformation />
            </div>
            <div className="">
              <center>
                <h2 className="text-[3vw] mt-3 !mb-6 text-[#444] underline">
                  Location
                </h2>
              </center>
              <GoogleMap />
            </div>
            <div className="blog-footer">
              <div className="item-label">
                Choose your <span>Reaction!</span>
              </div>
              <div className="reaction-icon">
                <a href="#">
                  <Image
                    width={500}
                    height={500}
                    className="w-auto h-auto"
                    src="/media/figure/reaction_1.png"
                    alt="Like"
                  />
                </a>
                <a href="#">
                  <Image
                    width={500}
                    height={500}
                    className="w-auto h-auto"
                    src="/media/figure/reaction_6.png"
                    alt="Like"
                  />
                </a>
                <a href="#">
                  <Image
                    width={500}
                    height={500}
                    className="w-auto h-auto"
                    src="/media/figure/reaction_2.png"
                    alt="Like"
                  />
                </a>
                <a href="#">
                  <Image
                    width={500}
                    height={500}
                    className="w-auto h-auto"
                    src="/media/figure/reaction_7.png"
                    alt="Like"
                  />
                </a>
                <a href="#">
                  <Image
                    width={500}
                    height={500}
                    className="w-auto h-auto"
                    src="/media/figure/reaction_3.png"
                    alt="Like"
                  />
                </a>
                <a href="#">
                  <Image
                    width={500}
                    height={500}
                    className="w-auto h-auto"
                    src="/media/figure/reaction_5.png"
                    alt="Like"
                  />
                </a>
              </div>
            </div>
            <AgentComment />
          </div>
        </div>
        {/* blogs  */}
        <RelatedBlogs />
        <div className="mb-[20px]">
          {/* sell type  */}
          <SellTypeSection />
        </div>
        {/* tags  */}
        <TagsSection />
      </div>
    </div>
  );
};
