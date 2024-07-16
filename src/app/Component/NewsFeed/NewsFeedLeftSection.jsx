import React from "react";
import PropertyCard2 from "./PropertyCard2";
import Image from "next/image";

const NewsFeedLeftSection = () => {
  return (
    <div >
      <div >
        <div>
          <PropertyCard2 />
        </div>
        <div className="widget widget-banner mt-[25px]">
          <h3 className="item-title">Most Popular</h3>
          <div className="item-subtitle">MyMakan Application</div>
          <a
            href="#"
            className="item-btn !inline-flex justify-center items-center gap-1"
          >
            <span className="btn-text">Download Now</span>
            <span className="btn-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                width="21px"
                height="10px"
              >
                <path
                  fillRule="evenodd"
                  d="M16.671,9.998 L12.997,9.998 L16.462,6.000 L5.000,6.000 L5.000,4.000 L16.462,4.000 L12.997,0.002 L16.671,0.002 L21.003,5.000 L16.671,9.998 ZM17.000,5.379 L17.328,5.000 L17.000,4.621 L17.000,5.379 ZM-0.000,4.000 L3.000,4.000 L3.000,6.000 L-0.000,6.000 L-0.000,4.000 Z"
                />
              </svg>
            </span>
          </a>
          <div className="item-img">
            <Image
              width={1000}
              height={100}
              className="w-auto h-auto"
              src="/media/figure/widget_banner_1.png"
              alt="banner"
            />
          </div>
        </div>
        {/* sponsored section  */}
      </div>
    </div>
  );
};

export default NewsFeedLeftSection;
