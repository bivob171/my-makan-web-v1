import React from "react";
import Icofont from "react-icofont";

const Menu = () => {
  return (
    <>
      <li className="header-nav-item">
        <a href="/" className="menu-link !font-[500] active">
          Home
        </a>
      </li>
      <li className="hide-on-mobile-menu">
        <a href="#" className="menu-link !font-[500] have-sub">
          Community
        </a>
        <ul className="mega-menu mega-menu-col-2">
          <li>
            <ul className="sub-menu">
              <li>
                <a href="newsfeed.html">NewsFeed</a>
              </li>
              <li>
                <a href="user-timeline.html">Profile Timeline</a>
              </li>
              <li>
                <a href="user-about.html">Profile About</a>
              </li>
              <li>
                <a href="user-friends.html">Profile Friends</a>
              </li>
              <li>
                <a href="user-groups.html">Profile Group</a>
              </li>
              <li>
                <a href="user-photo.html">Profile Photo</a>
              </li>
              <li>
                <a href="user-video.html">Profile Video</a>
              </li>
            </ul>
          </li>
          <li>
            <ul className="sub-menu">
              <li>
                <a href="user-badges.html">Profile Badges</a>
              </li>
              <li>
                <a href="forums.html">Forums</a>
              </li>
              <li>
                <a href="forums-forum.html">Forums Topic</a>
              </li>
              <li>
                <a href="forums-timeline.html">Forums Timeline</a>
              </li>
              <li>
                <a href="forums-info.html">Forums Info</a>
              </li>
              <li>
                <a href="forums-members.html">Forums Members</a>
              </li>
              <li>
                <a href="forums-media.html">Forums Media</a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li className="header-nav-item hide-on-desktop-menu">
        <a href="#" className="menu-link !font-[500] have-sub">
          Community
        </a>
        <ul className="sub-menu">
          <li>
            <a href="newsfeed.html">NewsFeed</a>
          </li>
          <li>
            <a href="user-timeline.html">Profile Timeline</a>
          </li>
          <li>
            <a href="user-about.html">Profile About</a>
          </li>
          <li>
            <a href="user-friends.html">Profile Friends</a>
          </li>
          <li>
            <a href="user-groups.html">Profile Group</a>
          </li>
          <li>
            <a href="user-photo.html">Profile Photo</a>
          </li>
          <li>
            <a href="user-video.html">Profile Video</a>
          </li>
          <li>
            <a href="user-badges.html">Profile Badges</a>
          </li>
          <li>
            <a href="forums.html">Forums</a>
          </li>
          <li>
            <a href="forums-forum.html">Forums Topic</a>
          </li>
          <li>
            <a href="forums-timeline.html">Forums Timeline</a>
          </li>
          <li>
            <a href="forums-info.html">Forums Info</a>
          </li>
          <li>
            <a href="forums-members.html">Forums Members</a>
          </li>
          <li>
            <a href="forums-media.html">Forums Media</a>
          </li>
        </ul>
      </li>
      <li className="header-nav-item">
        <a href="#" className="menu-link !font-[500] have-sub">
          Blog
        </a>
        <ul className="sub-menu">
          <li>
            <a href="user-blog.html">Blog Grid</a>
          </li>
          <li>
            <a href="single-blog.html">Blog Details</a>
          </li>
        </ul>
      </li>
      <li className="header-nav-item">
        <a href="#" className="menu-link !font-[500] have-sub">
          Pages
        </a>
        <ul className="sub-menu">
          <li>
            <a href="about-us.html">About</a>
          </li>
          <li>
            <a href="contact.html">Contact Us</a>
          </li>
        </ul>
      </li>
      <li className="header-nav-item">
        <a href="#" className="menu-link !font-[500] have-sub">
          Shop
        </a>
        <ul className="sub-menu">
          <li>
            <a href="shop.html">Shop</a>
          </li>
          <li>
            <a href="single-shop.html">Shop Details</a>
          </li>
        </ul>
      </li>
      <li className="header-nav-item">
        <a href="contact.html" className="menu-link !font-[500]">
          Contact Us
        </a>
      </li>
    </>
  );
};

export default Menu;

// <section className="bg-[#4A46FB] border-b-[1px] border-[#ebebeb4b]">
// <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-2xl">
//   <div className="relative flex items-center justify-between">

//     <div className="flex items-center hidden space-x-2 lg:flex">
//       <Menu />
//     </div>

//     {isMenuOpen && (
//       <div class="absolute top-0 left-20 w-full z-50">
//         <div class="p-5 bg-white border rounded shadow-sm">
//           <div class="flex items-center justify-between mb-4">
//             <div>
//               <a
//                 href="/"
//                 aria-label="Company"
//                 title="Company"
//                 class="inline-flex items-center"
//               >
//                 <svg
//                   class="w-8 text-deep-purple-accent-400"
//                   viewBox="0 0 24 24"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeMiterlimit="10"
//                   stroke="currentColor"
//                   fill="none"
//                 >
//                   <rect x="3" y="1" width="7" height="12" />
//                   <rect x="3" y="17" width="7" height="6" />
//                   <rect x="14" y="1" width="7" height="6" />
//                   <rect x="14" y="11" width="7" height="12" />
//                 </svg>
//                 <span class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
//                   Company
//                 </span>
//               </a>
//             </div>
//             <div>
//               <button
//                 aria-label="Close Menu"
//                 title="Close Menu"
//                 class="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
//                   <path
//                     fill="currentColor"
//                     d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
//                   />
//                 </svg>
//               </button>
//             </div>
//           </div>
//           <nav>
//             <ul class="space-y-4">
//               <li>
//                 <a
//                   href="/"
//                   aria-label="Our product"
//                   title="Our product"
//                   class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
//                 >
//                   Product
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/"
//                   aria-label="Our product"
//                   title="Our product"
//                   class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
//                 >
//                   Features
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/"
//                   aria-label="Product pricing"
//                   title="Product pricing"
//                   class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
//                 >
//                   Pricing
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/"
//                   aria-label="About us"
//                   title="About us"
//                   class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
//                 >
//                   About us
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/"
//                   aria-label="Sign in"
//                   title="Sign in"
//                   class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-deep-purple-accent-400"
//                 >
//                   Sign in
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="/"
//                   class="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-deep-purple-accent-400 hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none"
//                   aria-label="Sign up"
//                   title="Sign up"
//                 >
//                   Sign up
//                 </a>
//               </li>
//             </ul>
//           </nav>
//         </div>
//       </div>
//     )}
//   </div>
// </div>
// </section>
