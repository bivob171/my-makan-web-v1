import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import { CgStudio } from "react-icons/cg";
import { LuBath } from "react-icons/lu";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineSquareFoot,
} from "react-icons/md";
import {
  IoCallOutline,
  IoLocationOutline,
  IoLogoWhatsapp,
} from "react-icons/io5";
import Link from "next/link";
import { CiImageOn } from "react-icons/ci";

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
};

const PropertyCard2 = () => {
  const text = "Great Deal | 3 Bed Villa | Open Kitchen";
  const text2 = "Mimosa, DAMAC Hills 2 (Akoya by DAMAC), Dubai";
  const truncatedText = truncateText(text, 35);
  const truncatedText2 = truncateText(text2, 28);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  const sliderImg = [
    { id: 1, src: "/media/blog/blog_5.jpg" },
    { id: 2, src: "/media/blog/blog_4.jpg" },
    { id: 3, src: "/media/blog/blog_3.jpg" },
    { id: 4, src: "/media/blog/blog_2.jpg" },
    { id: 5, src: "/media/blog/blog_1.jpg" },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const NextArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 right-3 transform -translate-y-1/2 bg-[#ffffffab] rounded-full cursor-pointer z-20 w-6 h-6 flex justify-center items-center"
      onClick={onClick}
    >
      <MdOutlineKeyboardArrowRight className="w-5 h-5 text-[#7c29e9]" />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 left-3 transform -translate-y-1/2 bg-[#ffffffab] rounded-full cursor-pointer z-20 w-6 h-6 flex justify-center items-center"
      onClick={onClick}
    >
      <MdOutlineKeyboardArrowLeft className="w-5 h-5 text-[#7c29e9]" />
    </div>
  );

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (current) => setCurrentSlide(current),
  };

  return (
    <div className="max-w-full flex lg:flex-col sm:flex-row gap-2 bg-[white] shadow-md !rounded-md !text-[#222]">
      <div className="relative">
        <Slider {...settings} ref={(slider) => (sliderRef1 = slider)}>
          {sliderImg.map((image, index) => (
            <div key={image.id} className="!rounded-md p-1">
              <Image
                src={image.src}
                alt=""
                width={500}
                height={500}
                className="!rounded-md sm:w-[220px] lg:w-full sm:h-auto lg:h-[165px] object-cover object-top"
              />
            </div>
          ))}
        </Slider>
        <div className="px-2 text-[11px] py-[3px] leading-none !font-light rounded bg-[#000000b4] text-white flex justify-center items-center gap-1 absolute bottom-5 left-3 z-10">
          <CiImageOn className="w-4 h-4" />
          <span>
            {currentSlide + 1}/{sliderImg.length}
          </span>
        </div>
      </div>
      <div className="p-3 !pt-0 !text-[14px] font-normal">
        <h3 className="text-[20px] font-bold mb-0">
          <span className="font-semibold text-[16px]">AED</span> 60,000{" "}
          <span className="text-[14px] font-normal">Yearly</span>
        </h3>
        <p className="mb-0 leading-none">Apartment</p>
        <div className="flex justify-start items-center gap-3">
          <p className="flex justify-start items-center gap-[3px] font-semibold text-[12px]">
            <CgStudio className="w-4 h-4" /> Studio
          </p>
          <p className="flex justify-start items-center gap-[3px] font-semibold text-[12px]">
            <LuBath className="w-4 h-4" /> Bath
          </p>
          <p className="flex justify-start items-center gap-[3px] font-semibold text-[12px]">
            <MdOutlineSquareFoot className="w-4 h-4" /> Sqft
          </p>
        </div>
        <Link href="/" className="space-x-1 font-semibold">
          {truncatedText}
        </Link>
        <Link href="/" className="space-x-1 flex items-center font-semibold">
          <IoLocationOutline className="w-4 h-4 mr-1 " />
          {truncatedText2}
        </Link>
        <div className="grid grid-cols-2 gap-3 mt-2">
          <button className="w-full flex justify-center items-center gap-[3px] font-bold text-[15px] hover:text-[#fff] bg-[#dd17171e] hover:bg-[#dd1717] py-[5px] rounded">
            <IoCallOutline className="w-5 h-5" /> Call
          </button>
          <button className="w-full flex justify-center items-center gap-[3px] font-bold text-[15px] hover:text-[#fff] bg-[#17dd171e] hover:bg-[#17DD17] py-[5px] rounded">
            <IoLogoWhatsapp className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard2;
