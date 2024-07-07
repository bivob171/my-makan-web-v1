import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <>
      <a href="#wrapper" data-type="section-switch" className="scrollup">
        <i className="icofont-bubble-up" />
      </a>

      <div id="wrapper" className="wrapper overflow-hidden">
        <footer className="footer-wrap">
          <div className="main-footer">
            <div className="container">
              <div className="row row-cols-lg-4 row-cols-sm-2 row-cols-1">
                <div className="col">
                  <div className="footer-box">
                    <div className="footer-logo">
                      <Link href="/">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/logo2.png"
                          alt="Mymakan"
                        />
                      </Link>
                    </div>
                    <p>
                      Dorem ipsum dolor sit amet consec adipisicing elit sed do
                      eiusmod por incidiut labore et loreLorem ipsum kelly amieo
                      dolorey.
                    </p>
                  </div>
                </div>
                <div className="col d-flex justify-content-lg-center">
                  <div className="footer-box">
                    <h3 className="footer-title">Important Links</h3>
                    <div className="footer-link">
                      <ul>
                        <li>
                          <a href="index-2.html">Home</a>
                        </li>
                        <li>
                          <a href="about-us.html">About us</a>
                        </li>
                        <li>
                          <a href="shop.html">Shop</a>
                        </li>
                        <li>
                          <a href="contact.html">Contacts</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col d-flex justify-content-lg-center">
                  <div className="footer-box">
                    <h3 className="footer-title">Community</h3>
                    <div className="footer-link">
                      <ul>
                        <li>
                          <a href="newsfeed.html">NewsFeed</a>
                        </li>
                        <li>
                          <a href="user-timeline.html">Profile</a>
                        </li>
                        <li>
                          <a href="user-friends.html">Friends</a>
                        </li>
                        <li>
                          <a href="user-groups.html">Groups</a>
                        </li>
                        <li>
                          <a href="forums.html">Forums</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col d-flex justify-content-lg-center">
                  <div className="footer-box">
                    <h3 className="footer-title">Followers</h3>
                    <div className="footer-link">
                      <ul>
                        <li>
                          <a href="https://www.facebook.com/">facebook</a>
                        </li>
                        <li>
                          <a href="https://twitter.com/">twitter</a>
                        </li>
                        <li>
                          <a href="https://www.instagram.com/">instagram</a>
                        </li>
                        <li>
                          <a href="https://www.youtube.com/">Youtube</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copyright">
              Copy© My Makan 2021. All Rights Reserved
            </div>
          </div>
        </footer>
        {/*=====================================*/}
        {/*=      Header Search Start          =*/}
        {/*=====================================*/}
        <div id="header-search" className="header-search">
          <button type="button" className="close">
            ×
          </button>
          <form className="header-search-form">
            <input type="search" defaultValue="" placeholder="Search here..." />
            <button type="submit" className="search-btn">
              <i className="flaticon-search" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
