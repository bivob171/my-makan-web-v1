import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { classNames } from "@react-pdf-viewer/core";

const Testimonial = ({ isClient }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  const testimonialData = [
    {
      id: 1,
      name: "Zinia Jessy",
      position: "CEO, Khadai R Ghumai",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmod tempor utlabore et dolore magna aliqua enim miniectetur adipisicing eliteiusmod dolore magna aliqua Ut enim ad minim veniam.",
      profile: "/media/testimonial/nav_1.jpg",
    },
    {
      id: 2,
      name: "Fahim Rahman",
      position: "CTO, Khadai R Ghumai",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmod tempor utlabore et dolore magna aliqua enim miniectetur adipisicing eliteiusmod dolore magna aliqua Ut enim ad minim veniam.",
      profile: "/media/testimonial/nav_3.jpg",
    },
    {
      id: 3,
      name: "Tasfiq Al Rashid",
      position: "Product Manager, Khadai R Ghumai",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elitsed do eiusmod tempor utlabore et dolore magna aliqua enim miniectetur adipisicing eliteiusmod dolore magna aliqua Ut enim ad minim veniam.",
      profile: "/media/testimonial/nav_2.jpg",
    },
  ];

  const settings = {
    fade: true,
    waitForAnimate: false,
    infinite: true,
    customPaging: function (i) {
      return (
        <div className="">
          <Image
            src={testimonialData[i].profile}
            alt={testimonialData[i].name}
            width={200}
            height={100}
            className="rounded-full"
          />
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
  };

  return (
    <>
      <section className="testimonial-carousel ">
        <div className="slider-container">
          <div className="text-center mx-auto lg:w-[35%] md:w-[70%] w-[90%] pb-10">
            <Slider {...settings} ref={(slider) => (sliderRef1 = slider)}>
              {testimonialData.map((testimonial) => (
                <div key={testimonial.id}>
                  <h3 className="text-[#fefefe] !text-[22px]">{testimonial.name}</h3>
                  <p className="text-[#e2e2e2] !text-[14px] leading-none mb-4">{testimonial.position}</p>
                  <p className="text-[#fefefe] !text-[17px]">{testimonial.description}</p>
                </div>
              ))}
            </Slider>
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
    </>
  );
};

export default Testimonial;
