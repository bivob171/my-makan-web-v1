"use client";

import Image from "next/image";
import React, { useState } from "react";
import AgentComment from "./AgentComment";
import NewsFeedLeftSection from "@/app/Component/NewsFeed/NewsFeedLeftSection";
import PropertyCard2 from "@/app/Component/NewsFeed/PropertyCard2";
import { BsHeartFill } from "react-icons/bs";
import { CiShare1 } from "react-icons/ci";
import ShareModal from "./PostDetailsPage/ShareModal";
import GallerySection from "./GallerySection";
import VideoSection from "./VideoSection";
import File from "./File";
import PropertyInformation from "./PropertyInformation";
import MyGoogleMap from "./GoogleMap";
import RelatedBlogs from "./RelatedBlogs";
import SellTypeSection from "./SellTypeSection";
import TagsSection from "./TagsSection";

export const AgentPostDetailsPage = () => {
  const [isHeartRed, setIsHeartRed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSaveClick = () => {
    setIsHeartRed(!isHeartRed);
  };

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }
  return (
    <div className="page-content">
      <div className="container">
        <div className="row ">
          <div className="col-lg-3 widget-block widget-break-lg">
            <div className="!sticky top-[110px]">
              <div className="h-[86vh] overflow-y-scroll">
                <NewsFeedLeftSection />
                <div className="space-y-5">
                  <PropertyCard2 />
                  <PropertyCard2 />
                  <PropertyCard2 />
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            <div className="">
              <div className="block-box user-single-blog ">
                <div className="blog-thumbnail">
                  <Image
                    src="/media/blog/blog_10.jpg"
                    width={1000}
                    height={1000}
                    alt="Blog"
                    className="w-full"
                  />
                </div>
                <div className="blog-content-wrap !p-[35px]">
                  <div className="blog-entry-header">
                    <div className="flex justify-between items-center">
                      <div className="inline-flex items-center font-bold gap-2 mb-3">
                        <div className="">
                          <span className="text-[16px]">AED</span>{" "}
                          <span className="text-[22px] ">2,750,000</span>
                        </div>
                        <span className="text-[24px] font-light leading-none">
                          |
                        </span>
                        <span className="text-[16px]">
                          1,900 <span>sqft</span>
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <button
                          className={`px-3 py-[6px] rounded bg-[#625dfa99] text-[white] font-medium flex justify-center items-center gap-2 ${
                            isHeartRed ? "bg-[#625dfa]" : ""
                          }`}
                          onClick={handleSaveClick}
                        >
                          <BsHeartFill
                            className={`w-4 h-4 ${
                              isHeartRed ? "text-[red]" : ""
                            }`}
                          />{" "}
                          Save
                        </button>
                        <button
                          className="px-3 py-[6px] rounded bg-[#625dfa99] text-[white] font-medium flex justify-center items-center gap-2"
                          onClick={() => setIsOpen(true)}
                        >
                          <CiShare1 className="w-4 h-4" />
                          Share
                        </button>
                      </div>
                      <ShareModal setIsOpen={setIsOpen} isOpen={isOpen} />
                    </div>
                    <h2 className="entry-title">
                      Spoke with the developer sety make atype specimen book has
                      survived not only five centuries
                    </h2>
                    <div className="row align-items-center">
                      <div className="col-lg-10">
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
                            <i className="icofont-comment" /> Comments: 05
                          </li>
                          <li>
                            <i className="icofont-share" /> Share: 02
                          </li>
                        </ul>
                      </div>
                      <div className="col-lg-2">
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
                            <a href="#" className="bg-youtube">
                              <i className="icofont-youtube" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="blog-content">
                    <p>
                      Seohen an unknown printer took a galley of type and
                      scrambled it to make a type specimen book. It has survived
                      not only five centuries, but also the leap into electronic
                      typesetting, remaining essentially unchanged. It was
                      popularised in the 1960s with the release of Letraset
                      sheets strickcontainingwhen an unknown printer took a
                      galley of type and scrambled it to make a type specimen
                      book. It has survived not only five centuries, but also
                      the leap into electronic typesetting.{" "}
                    </p>
                    <blockquote>
                      <p>
                        Blog estibulum diam metus, varius quis eleifend eget,
                        tincidunt sit amet ante. Etiam quisaccu msan vamus
                        efeliselconvallis, ultrices commodo nisety ncidunt odio,
                        ut varius mi justo. Blog estibulum diam metuultrices
                        commodo erisque et orci convallis, ultrices commodo
                        nisety ncidunt odio, ut varius mi ex quis justo.{" "}
                      </p>
                    </blockquote>
                    <p>
                      Seohen an unknown printer took a galley of type and
                      scrambled it to make a type specimen book. It has survived
                      not only five centuries, but also the leap into electronic
                      typesetting, remaining essentially unchanged. It was
                      popularised in the 1960s with the release of Letraset
                      sheets strickcontainingwhen an unknown printer took a
                      galley of type and scrambled it to make a type specimen
                      book. It has survived not only five centuries, but also
                      the leap into electronic typesetting.{" "}
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
                    <MyGoogleMap />
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
        </div>
      </div>
    </div>
  );
};
