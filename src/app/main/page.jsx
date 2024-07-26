"use client";
import Head from "next/head";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import HouseCard from "../Component/HouseCard/HouseCard";

export default function HomePage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve(script);
        script.onerror = () =>
          reject(new Error(`Failed to load script ${src}`));
        document.head.appendChild(script);
      });
    };

    const loadSlickCarousel = async () => {
      try {
        await loadScript("https://code.jquery.com/jquery-3.6.0.min.js");
        await loadScript("dependencies/slick-carousel/js/slick.min.js");

        $(document).ready(() => {
          $(".slick-slider").slick({
            arrows: false,
            slidesToShow: 1,
            fade: true,
            asNavFor: ".slick-nav",
          });

          $(".slick-nav").slick({
            arrows: false,
            slidesToShow: 3,
            centerMode: true,
            asNavFor: ".slick-slider",
            focusOnSelect: true,
          });
        });
      } catch (error) {
        console.error("Error loading scripts: ", error);
      }
    };
    const loadSal = async () => {
      try {
        await loadScript("/dependencies/sal.js/sal.js");
        sal();
      } catch (error) {
        console.error("Error loading sal.js: ", error);
      }
    };

    loadSlickCarousel();
    loadSal();
  }, []);

  return (
    <>
      <a href="#wrapper" data-type="section-switch" className="scrollup">
        <i className="icofont-bubble-up" />
      </a>

      <div id="wrapper" className="wrapper overflow-hidden ">
        <section className="hero-banner">
          <div className="container">
            <div
              className="hero-content"
              data-sal="zoom-out"
              data-sal-duration={1000}
            >
              <h1 className="item-title">MY Makan Community</h1>
              <p>
                Having real social contacts can sometimes be difficult FUN,
                everything becomes much simpler!
              </p>
              <div className="item-number">10,95,219</div>
              <div className="conn-people">Connected People</div>
              <a href="newsfeed.html" className="button-slide">
                <span className="btn-text">Discover Now</span>
                <span className="btn-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="21px"
                    height="10px"
                  >
                    <path
                      fillRule="evenodd"
                      fill="rgb(255, 255, 255)"
                      d="M16.671,9.998 L12.997,9.998 L16.462,6.000 L5.000,6.000 L5.000,4.000 L16.462,4.000 L12.997,0.002 L16.671,0.002 L21.003,5.000 L16.671,9.998 ZM17.000,5.379 L17.328,5.000 L17.000,4.621 L17.000,5.379 ZM-0.000,4.000 L3.000,4.000 L3.000,6.000 L-0.000,6.000 L-0.000,4.000 Z"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
          <div className="leftside-image">
            <div
              className="cartoon-image"
              data-sal="slide-down"
              data-sal-duration={1000}
              data-sal-delay={100}
            >
              <Image
                width={700}
                height={100}
                className="w-auto h-auto"
                src="/media/banner/people_1.png"
                alt="People"
              />
            </div>
            <div
              className="shape-image"
              data-sal="slide-down"
              data-sal-duration={500}
              data-sal-delay={700}
            >
              <Image
                width={1000}
                height={100}
                className="w-auto h-auto"
                src="/media/banner/shape_1.png"
                alt="shape"
              />
            </div>
          </div>
          <div className="map-line">
            <Image
              width={1000}
              height={100}
              className="w-auto h-auto"
              src="/media/banner/map_line.png"
              alt="map"
              data-sal="slide-up"
              data-sal-duration={500}
              data-sal-delay={800}
            />
            <ul className="map-marker">
              <li
                data-sal="slide-up"
                data-sal-duration={700}
                data-sal-delay={1000}
              >
                <Image
                  width={1000}
                  height={10}
                  className="w-auto h-auto"
                  src="/media/banner/marker_1.png"
                  alt="marker"
                />
              </li>
              <li
                data-sal="slide-up"
                data-sal-duration={800}
                data-sal-delay={1000}
              >
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto"
                  src="/media/banner/marker_2.png"
                  alt="marker"
                />
              </li>
              <li
                data-sal="slide-up"
                data-sal-duration={900}
                data-sal-delay={1000}
              >
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto"
                  src="/media/banner/marker_3.png"
                  alt="marker"
                />
              </li>
              <li
                data-sal="slide-up"
                data-sal-duration={1000}
                data-sal-delay={1000}
              >
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto"
                  src="/media/banner/marker_4.png"
                  alt="marker"
                />
              </li>{" "}
            </ul>
          </div>
        </section>

        <section>
          <HouseCard />
        </section>

        <section className="why-choose-us">
          <div className="px-4 md:!px-24 lg:px-8 mx-auto sm:max-w-full md:max-w-full lg:max-w-screen-xl">
            <div className="grid lg:grid-cols-2 gap-10 justify-center items-center">
              <div className="">
                <div className="why-choose-box">
                  <div className="item-subtitle">What We Do</div>
                  <h2 className="item-title">
                    <span>Why Join Our</span> My Makan from Social Network ?
                  </h2>
                  <p>
                    Social hen an unknown printer took a galley of type and
                    scrambled make type specimen book. It has survived not only
                    five centuries but also the leap into electronic
                    typesetting, remaining essentialunchanged they popularised
                    with release.
                  </p>
                  <a href="login.html" className="button-slide">
                    <span className="btn-text">Join Our Community</span>
                    <span className="btn-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="21px"
                        height="10px"
                      >
                        <path
                          fillRule="evenodd"
                          fill="rgb(255, 255, 255)"
                          d="M16.671,9.998 L12.997,9.998 L16.462,6.000 L5.000,6.000 L5.000,4.000 L16.462,4.000 L12.997,0.002 L16.671,0.002 L21.003,5.000 L16.671,9.998 ZM17.000,5.379 L17.328,5.000 L17.000,4.621 L17.000,5.379 ZM-0.000,4.000 L3.000,4.000 L3.000,6.000 L-0.000,6.000 L-0.000,4.000 Z"
                        />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
              <div className="">
                <div className="why-choose-box">
                  <ul className="features-list">
                    <li>
                      <div className="media flex items-center">
                        <div>
                          <div className="item-icon ">
                            <i className="icofont-wechat" />
                          </div>
                        </div>
                        <div className="media-body">
                          <p className="item-title">Meet Great People</p>
                          <p>
                            when an unknown printer took a galley of scrambled
                            it to make a type specimen It has survived not only.
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="media flex items-center">
                      <div>
                        <div className="item-icon">
                          <i className="icofont-users" />
                        </div>
                        </div>
                        <div className="media-body">
                          <p className="item-title">Forum Discussion</p>
                          <p>
                            when an unknown printer took a galley of scrambled
                            it to make a type specimen It has survived not only.
                          </p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="media flex items-center">
                      <div>
                        <div className="item-icon">
                          <i className="icofont-paper" />
                        </div>
                        </div>
                        <div className="media-body">
                          <p className="item-title">Active Groups</p>
                          <p>
                            when an unknown printer took a galley of scrambled
                            it to make a type specimen It has survived not only.
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*=====================================*/}
        {/*=         Community Start       	=*/}
        {/*=====================================*/}
        <section className="community-network">
          <ul className="map-marker">
            <li>
              <Image
                width={1000}
                height={100}
                className="w-auto h-auto"
                src="/media/banner/marker_1.png"
                alt="marker"
              />
            </li>
            <li>
              <Image
                width={1000}
                height={100}
                className="w-auto h-auto"
                src="/media/banner/marker_2.png"
                alt="marker"
              />
            </li>
            <li>
              <Image
                width={1000}
                height={100}
                className="w-auto h-auto"
                src="/media/banner/marker_3.png"
                alt="marker"
              />
            </li>
            <li>
              <Image
                width={1000}
                height={100}
                className="w-auto h-auto"
                src="/media/banner/marker_4.png"
                alt="marker"
              />
            </li>
            <li>
              <Image
                width={1000}
                height={100}
                className="w-auto h-auto"
                src="/media/banner/marker_5.png"
                alt="marker"
              />
            </li>
          </ul>
          <div className="container">
            <div className="row justify-content-end">
              <div className="col-lg-6">
                <div className="community-content">
                  <h2 className="item-title">
                    129 Countries We Build Our Largest Community in{" "}
                    <span>My Makan Network</span>
                  </h2>
                  <p>
                    when an unknown printer took a galley of type and scrambled
                    it to make a type specimen book. It has survived not only
                    five centuries, but also leap electronic typesetting,
                    remaining essentially.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="bg-shape"
            data-sal="slide-left"
            data-sal-duration={500}
            data-sal-delay={500}
          >
            <Image
              width={1000}
              height={100}
              className="w-auto h-auto"
              src="/media/figure/shape_7.png"
              alt="bg"
            />
          </div>
        </section>
        {/*=====================================*/}
        {/*=         Team Area  Start       	=*/}
        {/*=====================================*/}
        <section className="section team-circle">
          <div className="container position-relative">
            <div className="section-heading">
              <h2 className="item-title">Our Active Members</h2>
              <p>
                when an unknown printer took a galley of type and meeting fari
                scrambled it to make a type specimen book.
              </p>
            </div>
            <div className="row justify-content-center">
              <div className="col-xl-11">
                <div className="row no-gutters">
                  <div className="col-lg-4 col-sm-6">
                    <ul className="nav nav-tabs nav-tabs-left" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link active"
                          data-toggle="tab"
                          href="#team1"
                          role="tab"
                          aria-selected="true"
                        >
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/team/team_1.jpg"
                            alt="team"
                          />
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#team2"
                          role="tab"
                          aria-selected="false"
                        >
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/team/team_5.jpg"
                            alt="team"
                          />
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#team3"
                          role="tab"
                          aria-selected="false"
                        >
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/team/team_6.jpg"
                            alt="team"
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-4 col-sm-6 order-lg-3">
                    <ul className="nav nav-tabs nav-tabs-right" role="tablist">
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#team4"
                          role="tab"
                          aria-selected="false"
                        >
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/team/team_3.jpg"
                            alt="team"
                          />
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#team5"
                          role="tab"
                          aria-selected="false"
                        >
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/team/team_4.jpg"
                            alt="team"
                          />
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link"
                          data-toggle="tab"
                          href="#team6"
                          role="tab"
                          aria-selected="false"
                        >
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/team/team_7.jpg"
                            alt="team"
                          />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-4 order-lg-2">
                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="team1"
                        role="tabpanel"
                      >
                        <div className="team-box">
                          <div className="item-img">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/team/team_1.jpg"
                              alt="team"
                            />
                          </div>
                          <div className="item-content">
                            <p className="item-title">
                              <a href="user-timeline.html">Ketty Rio</a>
                            </p>
                            <div className="group-count">
                              <span>25</span> - Fashion
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="team2" role="tabpanel">
                        <div className="team-box">
                          <div className="item-img">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/team/team_5.jpg"
                              alt="team"
                            />
                          </div>
                          <div className="item-content">
                            <p className="item-title">
                              <a href="user-timeline.html">Johnson John</a>
                            </p>
                            <div className="group-count">
                              <span>25</span> - Fashion
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="team3" role="tabpanel">
                        <div className="team-box">
                          <div className="item-img">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/team/team_6.jpg"
                              alt="team"
                            />
                          </div>
                          <div className="item-content">
                            <p className="item-title">
                              <a href="user-timeline.html">Fahim Rahman</a>
                            </p>
                            <div className="group-count">
                              <span>25</span> - Fashion
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="team4" role="tabpanel">
                        <div className="team-box">
                          <div className="item-img">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/team/team_3.jpg"
                              alt="team"
                            />
                          </div>
                          <div className="item-content">
                            <p className="item-title">
                              <a href="user-timeline.html">Mamunur Rashid</a>
                            </p>
                            <div className="group-count">
                              <span>25</span> - Fashion
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="team5" role="tabpanel">
                        <div className="team-box">
                          <div className="item-img">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/team/team_4.jpg"
                              alt="team"
                            />
                          </div>
                          <div className="item-content">
                            <p className="item-title">
                              <a href="user-timeline.html">Ketty Rio</a>
                            </p>
                            <div className="group-count">
                              <span>25</span> - Fashion
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-pane fade" id="team6" role="tabpanel">
                        <div className="team-box">
                          <div className="item-img">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/team/team_7.jpg"
                              alt="team"
                            />
                          </div>
                          <div className="item-content">
                            <p className="item-title">
                              <a href="user-timeline.html">Ketty Rio</a>
                            </p>
                            <div className="group-count">
                              <span>25</span> - Fashion
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ul className="shape-wrap">
                  <li>
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/figure/shape_9.png"
                      alt="shape"
                    />
                  </li>
                  <li>
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/team/shape_1.png"
                      alt="shape"
                    />
                  </li>
                  <li>
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/team/shape_2.png"
                      alt="shape"
                    />
                  </li>
                  <li>
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/team/shape_circle_1.png"
                      alt="shape"
                    />
                  </li>
                  <li>
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/team/shape_circle_2.png"
                      alt="shape"
                    />
                  </li>
                  <li>
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/team/shape_circle_3.png"
                      alt="shape"
                    />
                  </li>
                  <li>
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/team/shape_3.png"
                      alt="shape"
                    />
                  </li>
                  <li>
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/team/shape_4.png"
                      alt="shape"
                    />
                  </li>
                </ul>
              </div>
            </div>
            <div className="see-all-btn">
              <a href="forums-members.html" className="button-slide">
                <span className="btn-text">Discover All Member</span>
                <span className="btn-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="21px"
                    height="10px"
                  >
                    <path
                      fillRule="evenodd"
                      fill="rgb(255, 255, 255)"
                      d="M16.671,9.998 L12.997,9.998 L16.462,6.000 L5.000,6.000 L5.000,4.000 L16.462,4.000 L12.997,0.002 L16.671,0.002 L21.003,5.000 L16.671,9.998 ZM17.000,5.379 L17.328,5.000 L17.000,4.621 L17.000,5.379 ZM-0.000,4.000 L3.000,4.000 L3.000,6.000 L-0.000,6.000 L-0.000,4.000 Z"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </section>
        {/*=====================================*/}
        {/*=         Why Choose  Start       	=*/}
        {/*=====================================*/}
        <section className="why-choose-fluid">
          <div className="container-fluid full-width">
            <div className="row no-gutters">
              <div className="col-lg-6">
                <div className="why-choose-content">
                  <div className="content-box">
                    <h2 className="item-title">
                      My Makan Makes Your Life Easier &amp; Simple
                    </h2>
                    <p>
                      Aliquam lorem ante dapibus in viverra quis feugiat atellu
                      Peaselus vierra nullaut metus varius laoreet unknown
                      printer took scrambled make.
                    </p>
                    <a href="about-us.html" className="button-slide">
                      <span className="btn-text">Read More</span>
                      <span className="btn-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          width="21px"
                          height="10px"
                        >
                          <path
                            fillRule="evenodd"
                            fill="rgb(255, 255, 255)"
                            d="M16.671,9.998 L12.997,9.998 L16.462,6.000 L5.000,6.000 L5.000,4.000 L16.462,4.000 L12.997,0.002 L16.671,0.002 L21.003,5.000 L16.671,9.998 ZM17.000,5.379 L17.328,5.000 L17.000,4.621 L17.000,5.379 ZM-0.000,4.000 L3.000,4.000 L3.000,6.000 L-0.000,6.000 L-0.000,4.000 Z"
                          />
                        </svg>
                      </span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="why-choose-img">
                  <div className="image-box">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/figure/why_choose_1.jpg"
                      alt="image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*=====================================*/}
        {/*=         Location Find Start       =*/}
        {/*=====================================*/}
        <section className="section location-find">
          <div className="container">
            <div className="section-heading">
              <h2 className="heading-title">Find People Near You</h2>
              <p>
                when an unknown printer took a galley of type and meeting fari
                scrambled it to make a type specimen book.{" "}
              </p>
            </div>
            <div className="row gutters-20">
              <div className="col-lg-6">
                <div className="location-box">
                  <div className="item-img">
                    <a href="user-friends.html">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/location/location_1.jpg"
                        alt="Newyork City"
                      />
                    </a>
                  </div>
                  <div className="item-content">
                    <p className="item-title">
                      <a href="user-friends.html">Newyork City</a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row gutters-20">
                  <div className="col-sm-6">
                    <div className="location-box">
                      <div className="item-img">
                        <a href="user-friends.html">
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/location/location_2.jpg"
                            alt="Newyork City"
                          />
                        </a>
                      </div>
                      <div className="item-content">
                        <p className="item-title">
                          <a href="user-friends.html">Boston</a>
                        </p>
                      </div>
                    </div>
                    <div className="location-box">
                      <div className="item-img">
                        <a href="user-friends.html">
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/location/location_3.jpg"
                            alt="Newyork City"
                          />
                        </a>
                      </div>
                      <div className="item-content">
                        <p className="item-title">
                          <a href="user-friends.html">California</a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="location-box">
                      <div className="item-img">
                        <a href="user-friends.html">
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/location/location_2.jpg"
                            alt="Newyork City"
                          />
                        </a>
                      </div>
                      <div className="item-content">
                        <p className="item-title">
                          <a href="user-friends.html">Kancas City</a>
                        </p>
                      </div>
                    </div>
                    <div className="location-box">
                      <div className="item-img">
                        <a href="user-friends.html">
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/location/location_4.jpg"
                            alt="Newyork City"
                          />
                        </a>
                      </div>
                      <div className="item-content">
                        <p className="item-title">
                          <a href="user-friends.html">Los Angeles</a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*=====================================*/}
        {/*=         Banner Apps  Start       	=*/}
        {/*=====================================*/}
        <section className="banner-apps">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 d-flex align-items-center">
                <div className="banner-content">
                  <h2 className="item-title">
                    Fully Responsive My Makan WordPress Theme
                  </h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation.
                  </p>
                  <a
                    href="https://themeforest.net/user/radiustheme/portfolio"
                    className="button-slide"
                  >
                    <span className="btn-text">Purchase Now</span>
                    <span className="btn-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        width="21px"
                        height="10px"
                      >
                        <path
                          fillRule="evenodd"
                          fill="rgb(255, 255, 255)"
                          d="M16.671,9.998 L12.997,9.998 L16.462,6.000 L5.000,6.000 L5.000,4.000 L16.462,4.000 L12.997,0.002 L16.671,0.002 L21.003,5.000 L16.671,9.998 ZM17.000,5.379 L17.328,5.000 L17.000,4.621 L17.000,5.379 ZM-0.000,4.000 L3.000,4.000 L3.000,6.000 L-0.000,6.000 L-0.000,4.000 Z"
                        />
                      </svg>
                    </span>
                  </a>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="banner-img">
                  <div className="apps-view">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/banner/apps.png"
                      alt="Apps"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*=====================================*/}
        {/*=         Groups Area  Start       	=*/}
        {/*=====================================*/}
        <section className="section groups-popular">
          <div className="container">
            <div className="section-heading">
              <h2 className="heading-title">Most Popular Groups</h2>
              <p>
                when an unknown printer took a galley of type and meeting fari
                scrambled it to make a type specimen book.{" "}
              </p>
            </div>
            <div className="row gutters-15 justify-content-center">
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="groups-box">
                  <div className="item-img">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/groups/groups_1.jpg"
                      alt="Groups"
                    />
                  </div>
                  <div className="item-content">
                    <p className="item-title">
                      <a href="user-single-group.html">Photography</a>
                    </p>
                    <div className="groups-member">11,250 Members</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="groups-box">
                  <div className="item-img">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/groups/groups_2.jpg"
                      alt="Groups"
                    />
                  </div>
                  <div className="item-content">
                    <p p className="item-title">
                      <a href="user-single-group.html">Break Fast</a>
                    </p>
                    <div className="groups-member">11,250 Members</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="groups-box">
                  <div className="item-img">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/groups/groups_3.jpg"
                      alt="Groups"
                    />
                  </div>
                  <div className="item-content">
                    <p className="item-title">
                      <a href="user-single-group.html">Adventrue</a>
                    </p>
                    <div className="groups-member">11,250 Members</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="groups-box">
                  <div className="item-img">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/groups/groups_4.jpg"
                      alt="Groups"
                    />
                  </div>
                  <div className="item-content">
                    <p className="item-title">
                      <a href="user-single-group.html">Restaurant</a>
                    </p>
                    <div className="groups-member">11,250 Members</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="groups-box">
                  <div className="item-img">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/groups/groups_5.jpg"
                      alt="Groups"
                    />
                  </div>
                  <div className="item-content">
                    <p className="item-title">
                      <a href="user-single-group.html">Gaming</a>
                    </p>
                    <div className="groups-member">11,250 Members</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="groups-box">
                  <div className="item-img">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/groups/groups_6.jpg"
                      alt="Groups"
                    />
                  </div>
                  <div className="item-content">
                    <p className="item-title">
                      <a href="user-single-group.html">Tatoo</a>
                    </p>
                    <div className="groups-member">11,250 Members</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="groups-box">
                  <div className="item-img">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/groups/groups_7.jpg"
                      alt="Groups"
                    />
                  </div>
                  <div className="item-content">
                    <p className="item-title">
                      <a href="user-single-group.html">Music</a>
                    </p>
                    <div className="groups-member">11,250 Members</div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-4 col-sm-6">
                <div className="groups-box">
                  <div className="item-img">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/groups/groups_8.jpg"
                      alt="Groups"
                    />
                  </div>
                  <div className="item-content">
                    <p className="item-title">
                      <a href="user-single-group.html">Sports</a>
                    </p>
                    <div className="groups-member">11,250 Members</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="see-all-btn">
              <a href="user-groups.html" className="button-slide">
                <span className="btn-text">See All Groups</span>
                <span className="btn-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="21px"
                    height="10px"
                  >
                    <path
                      fillRule="evenodd"
                      fill="rgb(255, 255, 255)"
                      d="M16.671,9.998 L12.997,9.998 L16.462,6.000 L5.000,6.000 L5.000,4.000 L16.462,4.000 L12.997,0.002 L16.671,0.002 L21.003,5.000 L16.671,9.998 ZM17.000,5.379 L17.328,5.000 L17.000,4.621 L17.000,5.379 ZM-0.000,4.000 L3.000,4.000 L3.000,6.000 L-0.000,6.000 L-0.000,4.000 Z"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </section>
        {/*=====================================*/}
        {/*=         Testimonial Start       	=*/}
        {/*=====================================*/}
        {isClient && (
          <section className="testimonial-carousel">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-7">
                  <div className="testimonial-box">
                    <div className="slick-carousel slick-slider">
                      <div className="slick-slide">
                        <div className="testimonial-content">
                          <h3 className="item-title">Zinia Jessy</h3>
                          <div className="item-subtitle">
                            CEO, Khadai R Ghumai
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elitsed do eiusmod tempor utlabore et dolore magna
                            aliqua enim miniectetur adipisicing eliteiusmod
                            dolore magna aliqua Ut enim ad minim veniam.
                          </p>
                        </div>
                      </div>
                      <div className="slick-slide">
                        <div className="testimonial-content">
                          <h3 className="item-title">Fahim Rahman</h3>
                          <div className="item-subtitle">
                            CEO, Khadai R Ghumai
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elitsed do eiusmod tempor utlabore et dolore magna
                            aliqua enim miniectetur adipisicing eliteiusmod
                            dolore magna aliqua Ut enim ad minim veniam.
                          </p>
                        </div>
                      </div>
                      <div className="slick-slide">
                        <div className="testimonial-content">
                          <h3 className="item-title">Tasfiq Al Rashid</h3>
                          <div className="item-subtitle">
                            CEO, Khadai R Ghumai
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elitsed do eiusmod tempor utlabore et dolore magna
                            aliqua enim miniectetur adipisicing eliteiusmod
                            dolore magna aliqua Ut enim ad minim veniam.
                          </p>
                        </div>
                      </div>
                      <div className="slick-slide">
                        <div className="testimonial-content">
                          <h3 className="item-title">Mamunur Rahman</h3>
                          <div className="item-subtitle">
                            CEO, Khadai R Ghumai
                          </div>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elitsed do eiusmod tempor utlabore et dolore magna
                            aliqua enim miniectetur adipisicing eliteiusmod
                            dolore magna aliqua Ut enim ad minim veniam.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="slick-nav slick-carousel">
                      <div className="nav-item">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/testimonial/nav_1.jpg"
                          alt="Product"
                        />
                      </div>
                      <div className="nav-item">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/testimonial/nav_2.jpg"
                          alt="Product"
                        />
                      </div>
                      <div className="nav-item">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/testimonial/nav_3.jpg"
                          alt="Product"
                        />
                      </div>
                      <div className="nav-item">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/testimonial/nav_1.jpg"
                          alt="Product"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ul className="shape-wrap">
              <li>
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto"
                  src="/media/figure/shape_4.png"
                  alt="shape"
                />
              </li>
              <li>
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto"
                  src="/media/figure/shape_8.png"
                  alt="shape"
                />
              </li>
              <li>
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto"
                  src="/media/figure/shape_2.png"
                  alt="shape"
                />
              </li>
              <li>
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto"
                  src="/media/figure/shape_9.png"
                  alt="shape"
                />
              </li>
              <li>
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto"
                  src="/media/figure/shape_10.png"
                  alt="shape"
                />
              </li>
              <li>
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto"
                  src="/media/figure/shape_11.png"
                  alt="shape"
                />
              </li>
              <li>
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto"
                  src="/media/figure/shape_8.png"
                  alt="shape"
                />
              </li>
            </ul>
          </section>
        )}
        {/*=====================================*/}
        {/*=         Blog Area Start       	=*/}
        {/*=====================================*/}
        <section className="section blog-grid">
          <div className="container">
            <div className="section-heading flex-heading">
              <div className="row">
                <div className="col-lg-5">
                  <h2 className="heading-title">
                    Discover Our Awesome Blogs &amp; Stories
                  </h2>
                </div>
                <div className="col-lg-7">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elitsed
                    do eiusmod tempor utlabore et dolore magna aliqua enim
                    miniectetur adipisicing eliteiusmod dolore magna aliqua Ut
                    enim ad minim veniam.
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="blog-box">
                  <div className="blog-img">
                    <a href="single-blog.html">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/blog/blog_1.jpg"
                        alt="Blog"
                      />
                    </a>
                    <div className="blog-date">
                      <i className="icofont-calendar" />
                      24 Jun
                    </div>
                  </div>
                  <div className="blog-content">
                    <p className="blog-title">
                      <a href="single-blog.html">
                        Our 10 Steps to successful video for blogging &amp;
                        Challanging
                      </a>
                    </p>
                    <ul className="entry-meta">
                      <li>
                        <i className="icofont-ui-user" />
                        by <a href="#">Admin</a>
                      </li>
                      <li>
                        <i className="icofont-tag" />
                        <a href="#">Social</a>, <a href="#">Live</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="blog-box">
                  <div className="blog-img">
                    <a href="single-blog.html">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/blog/blog_2.jpg"
                        alt="Blog"
                      />
                    </a>
                    <div className="blog-date">
                      <i className="icofont-calendar" />
                      22 Jun
                    </div>
                  </div>
                  <div className="blog-content">
                    <p className="blog-title">
                      <a href="single-blog.html">
                        Our 10 Steps to successful video for blogging &amp;
                        Challanging
                      </a>
                    </p>
                    <ul className="entry-meta">
                      <li>
                        <i className="icofont-ui-user" />
                        by <a href="#">Admin</a>
                      </li>
                      <li>
                        <i className="icofont-tag" />
                        <a href="#">Social</a>, <a href="#">Live</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="blog-box">
                  <div className="blog-img">
                    <a href="single-blog.html">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/blog/blog_3.jpg"
                        alt="Blog"
                      />
                    </a>
                    <div className="blog-date">
                      <i className="icofont-calendar" />
                      20 Jun
                    </div>
                  </div>
                  <div className="blog-content">
                    <p className="blog-title">
                      <a href="single-blog.html">
                        Our 10 Steps to successful video for blogging &amp;
                        Challanging
                      </a>
                    </p>
                    <ul className="entry-meta">
                      <li>
                        <i className="icofont-ui-user" />
                        by <a href="#">Admin</a>
                      </li>
                      <li>
                        <i className="icofont-tag" />
                        <a href="#">Social</a>, <a href="#">Live</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*=====================================*/}
        {/*=          NewsLetter Start       		=*/}
        {/*=====================================*/}
        <section className="banner-newsletter">
          <ul className="section-cloud">
            <li>
              <Image
                width={1000}
                height={100}
                className="w-auto h-auto"
                src="/media/figure/cloud_1.png"
                alt="shape"
              />
            </li>
            <li>
              <Image
                width={1000}
                height={100}
                className="w-auto h-auto"
                src="/media/figure/cloud_2.png"
                alt="shape"
              />
            </li>
            <li>
              <Image
                width={1000}
                height={100}
                className="w-auto h-auto"
                src="/media/figure/cloud_2.png"
                alt="shape"
              />
            </li>
            <li>
              <Image
                width={1000}
                height={100}
                className="w-auto h-auto"
                src="/media/figure/cloud_1.png"
                alt="shape"
              />
            </li>
          </ul>
          <div className="container">
            <ul className="section-shape">
              <li>
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto"
                  src="/media/figure/shape_1.png"
                  alt="shape"
                />
              </li>
              <li>
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto"
                  src="/media/figure/shape_2.png"
                  alt="shape"
                />
              </li>
              <li>
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto"
                  src="/media/figure/shape_3.png"
                  alt="shape"
                />
              </li>
              <li>
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto"
                  src="/media/figure/shape_4.png"
                  alt="shape"
                />
              </li>
              <li>
                <Image
                  width={1000}
                  height={100}
                  className="w-auto h-auto"
                  src="/media/figure/shape_5.png"
                  alt="shape"
                />
              </li>
            </ul>
            <div className="row justify-content-center">
              <div className="col-lg-8">
                <div className="newsletter-box">
                  <h2 className="item-title">Subscribe My Makan Newsletter</h2>
                  <p>
                    Subscribe to be the first one to know about updates, new
                    features and much more! Enter your email
                  </p>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your e-mail"
                    />
                    <div className="input-group-append">
                      <button className="button-slide" type="button">
                        <span className="btn-text">Subscribe Now</span>
                        <span className="btn-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            width="21px"
                            height="10px"
                          >
                            <path
                              fillRule="evenodd"
                              fill="#ffffff"
                              d="M16.671,9.998 L12.997,9.998 L16.462,6.000 L5.000,6.000 L5.000,4.000 L16.462,4.000 L12.997,0.002 L16.671,0.002 L21.003,5.000 L16.671,9.998 ZM17.000,5.379 L17.328,5.000 L17.000,4.621 L17.000,5.379 ZM-0.000,4.000 L3.000,4.000 L3.000,6.000 L-0.000,6.000 L-0.000,4.000 Z"
                            />
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
