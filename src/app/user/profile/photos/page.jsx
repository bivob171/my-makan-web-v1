import Image from "next/image";
import React from "react";

export default function Photos() {
  return (
    <>
      {/* Page Content */}
      <div className="page-conten">
        <div className="container">
          <div className="row gutters-20 zoom-gallery">
            <div className="col-lg-3 col-md-4 col-6">
              <div className="user-group-photo">
                <a href="media/figure/photo_lg1.jpg" className="popup-zoom">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/user_photo1.jpg"
                    alt="Gallery"
                  />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <div className="user-group-photo">
                <a href="media/figure/photo_lg2.jpg" className="popup-zoom">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/user_photo2.jpg"
                    alt="Gallery"
                  />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <div className="user-group-photo">
                <a href="media/figure/photo_lg3.jpg" className="popup-zoom">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/user_photo3.jpg"
                    alt="Gallery"
                  />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <div className="user-group-photo">
                <a href="media/figure/photo_lg4.jpg" className="popup-zoom">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/user_photo4.jpg"
                    alt="Gallery"
                  />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <div className="user-group-photo">
                <a href="media/figure/photo_lg6.jpg" className="popup-zoom">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/user_photo6.jpg"
                    alt="Gallery"
                  />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <div className="user-group-photo">
                <a href="media/figure/photo_lg5.jpg" className="popup-zoom">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/user_photo5.jpg"
                    alt="Gallery"
                  />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <div className="user-group-photo">
                <a href="media/figure/photo_lg7.jpg" className="popup-zoom">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/user_photo7.jpg"
                    alt="Gallery"
                  />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <div className="user-group-photo">
                <a href="media/figure/photo_lg8.jpg" className="popup-zoom">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/user_photo8.jpg"
                    alt="Gallery"
                  />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <div className="user-group-photo">
                <a href="media/figure/photo_lg9.jpg" className="popup-zoom">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/user_photo9.jpg"
                    alt="Gallery"
                  />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <div className="user-group-photo">
                <a href="media/figure/photo_lg10.jpg" className="popup-zoom">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/user_photo10.jpg"
                    alt="Gallery"
                  />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <div className="user-group-photo">
                <a href="media/figure/photo_lg11.jpg" className="popup-zoom">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/user_photo11.jpg"
                    alt="Gallery"
                  />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-6">
              <div className="user-group-photo">
                <a href="media/figure/photo_lg12.jpg" className="popup-zoom">
                  <Image
                    width={1000}
                    height={100}
                    className="w-auto h-auto"
                    src="/media/figure/user_photo12.jpg"
                    alt="Gallery"
                  />
                </a>
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
