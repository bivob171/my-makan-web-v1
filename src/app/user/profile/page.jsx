import Image from "next/image";
import React from "react";

export default function Profile() {
  return (
    <>
      <div className="page-conten">
        <div className="container">
          {" "}
          <div className="row">
            <div className="col-lg-8">
              <div className="block-box post-input-tab">
                <ul className="nav nav-tabs" role="tablist">
                  <li
                    className="nav-item"
                    role="presentation"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="STATUS"
                  >
                    <a
                      className="nav-link active"
                      data-toggle="tab"
                      href="#post-status"
                      role="tab"
                      aria-selected="true"
                    >
                      <i className="icofont-copy" />
                      Status
                    </a>
                  </li>
                  <li
                    className="nav-item"
                    role="presentation"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="MEDIA"
                  >
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#post-media"
                      role="tab"
                      aria-selected="false"
                    >
                      <i className="icofont-image" />
                      Photo/ Video Album
                    </a>
                  </li>
                  <li
                    className="nav-item"
                    role="presentation"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="BLOG"
                  >
                    <a
                      className="nav-link"
                      data-toggle="tab"
                      href="#post-blog"
                      role="tab"
                      aria-selected="false"
                    >
                      <i className="icofont-list" />
                      Blog
                    </a>
                  </li>
                </ul>
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="post-status"
                    role="tabpanel"
                  >
                    <textarea
                      name="status-input"
                      id="status-input1"
                      className="form-control textarea"
                      placeholder="Share what are you thinking . . ."
                      cols={30}
                      rows={6}
                      defaultValue={""}
                    />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="post-media"
                    role="tabpanel"
                  >
                    {/* <label>Media Gallery</label>
  	<a href="#" class="media-insert"><i class="icofont-upload-alt"></i>Upload</a> */}
                    <textarea
                      name="status-input"
                      id="status-input2"
                      className="form-control textarea"
                      placeholder="Share what are you thinking . . ."
                      cols={30}
                      rows={6}
                      defaultValue={""}
                    />
                  </div>
                  <div className="tab-pane fade" id="post-blog" role="tabpanel">
                    <textarea
                      name="status-input"
                      id="status-input3"
                      className="form-control textarea"
                      placeholder="Share what are you thinking . . ."
                      cols={30}
                      rows={6}
                      defaultValue={""}
                    />
                  </div>
                </div>
                <div className="post-footer">
                  <div className="insert-btn">
                    <a href="#">
                      <i className="icofont-photobucket" />
                    </a>
                    <a href="#">
                      <i className="icofont-tags" />
                    </a>
                    <a href="#">
                      <i className="icofont-location-pin" />
                    </a>
                  </div>
                  <div className="submit-btn">
                    <a href="#">Post Submit</a>
                  </div>
                </div>
              </div>
              <div className="block-box user-timeline-header">
                <ul className="menu-list d-none d-md-block">
                  <li>
                    <a href="#" className="active">
                      All Updates
                    </a>
                  </li>
                  <li>
                    <a href="#">Mentions</a>
                  </li>
                  <li>
                    <a href="#">Favorities</a>
                  </li>
                  <li>
                    <a href="#">Friends</a>
                  </li>
                  <li>
                    <a href="#">Groups</a>
                  </li>
                </ul>
                <div className="header-dropdown d-md-none">
                  <label>Show:</label>
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      All Updates
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">
                        All Updates
                      </a>
                      <a className="dropdown-item" href="#">
                        Mentions
                      </a>
                      <a className="dropdown-item" href="#">
                        Favorities
                      </a>
                      <a className="dropdown-item" href="#">
                        Friends
                      </a>
                      <a className="dropdown-item" href="#">
                        Groups
                      </a>
                    </div>
                  </div>
                </div>
                <div className="header-dropdown">
                  <label>Show:</label>
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Everything
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">
                        Everything
                      </a>
                      <a className="dropdown-item" href="#">
                        Status
                      </a>
                      <a className="dropdown-item" href="#">
                        Photo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="block-box post-view">
                <div className="post-header">
                  <div className="media">
                    <div className="user-img">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_5.jpg"
                        alt="Aahat"
                      />
                    </div>
                    <div className="media-body">
                      <div className="user-title">
                        <a href="user-timeline.html">Rebeca Powel</a>
                      </div>
                      <ul className="entry-meta">
                        <li className="meta-privacy">
                          <i className="icofont-world" />
                          Public
                        </li>
                        <li className="meta-time">2 mins ago</li>
                      </ul>
                    </div>
                  </div>
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      ...
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">
                        Close
                      </a>
                      <a className="dropdown-item" href="#">
                        Edit
                      </a>
                      <a className="dropdown-item" href="#">
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
                <div className="post-body">
                  <p>
                    Dhaka is wonderful no matter what!{" "}
                    <i className="icofont-wink-smile" />
                  </p>
                  <div className="post-img">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/figure/post_10.jpg"
                      alt="Post"
                    />
                  </div>
                  <div className="post-meta-wrap">
                    <div className="post-meta">
                      <div className="post-reaction">
                        <div className="reaction-icon">
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/figure/reaction_1.png"
                            alt="icon"
                          />
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/figure/reaction_2.png"
                            alt="icon"
                          />
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/figure/reaction_3.png"
                            alt="icon"
                          />
                        </div>
                        <div className="meta-text">15</div>
                      </div>
                    </div>
                    <div className="post-meta">
                      <div className="meta-text">2 Comments</div>
                      <div className="meta-text">05 Share</div>
                    </div>
                  </div>
                </div>
                <div className="post-footer">
                  <ul>
                    <li className="post-react">
                      <a href="#">
                        <i className="icofont-thumbs-up" />
                        React!
                      </a>
                      <ul className="react-list">
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_1.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_3.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_4.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_2.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_7.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_6.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_5.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icofont-comment" />
                        Comment
                      </a>
                    </li>
                    <li className="post-share">
                      <a href="javascript:void(0);" className="share-btn">
                        <i className="icofont-share" />
                        Share
                      </a>
                      <ul className="share-list">
                        <li>
                          <a href="#" className="color-fb">
                            <i className="icofont-facebook" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-messenger">
                            <i className="icofont-facebook-messenger" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-instagram">
                            <i className="icofont-instagram" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-whatsapp">
                            <i className="icofont-brand-whatsapp" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-twitter">
                            <i className="icofont-twitter" />
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="block-box post-view">
                <div className="post-header">
                  <div className="media">
                    <div className="user-img">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_5.jpg"
                        alt="Aahat"
                      />
                    </div>
                    <div className="media-body">
                      <div className="user-title">
                        <a href="user-timeline.html">Rebeca Powel</a>
                      </div>
                      <ul className="entry-meta">
                        <li className="meta-privacy">
                          <i className="icofont-users-alt-4" />
                          Friends
                        </li>
                        <li className="meta-time">2 mins ago</li>
                      </ul>
                    </div>
                  </div>
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      ...
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">
                        Close
                      </a>
                      <a className="dropdown-item" href="#">
                        Edit
                      </a>
                      <a className="dropdown-item" href="#">
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
                <div className="post-body">
                  <div className="post-no-thumbnail">
                    <p>
                      I have great news to share with you all! I&rsquo;ve been
                      officially made a game streaming verified partner by
                      Streamy http://radiustheme.com/ What does this mean?
                      I&rsquo;ll be uploading new content every day, improving
                      the quality and I&rsquo;m gonna have access to games a
                      month before the official release.
                    </p>
                    <p>
                      This is a dream come true, thanks to all for the
                      support!!!
                    </p>
                  </div>
                  <div className="post-meta-wrap">
                    <div className="post-meta">
                      <div className="post-reaction">
                        <div className="reaction-icon">
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/figure/reaction_1.png"
                            alt="icon"
                          />
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/figure/reaction_2.png"
                            alt="icon"
                          />
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/figure/reaction_3.png"
                            alt="icon"
                          />
                        </div>
                        <div className="meta-text">25</div>
                      </div>
                    </div>
                    <div className="post-meta">
                      <div className="meta-text">2 Comments</div>
                      <div className="meta-text">05 Share</div>
                    </div>
                  </div>
                </div>
                <div className="post-footer">
                  <ul>
                    <li className="post-react">
                      <a href="#">
                        <i className="icofont-thumbs-up" />
                        React!
                      </a>
                      <ul className="react-list">
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_1.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_3.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_4.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_2.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_7.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_6.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_5.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icofont-comment" />
                        Comment
                      </a>
                    </li>
                    <li className="post-share">
                      <a href="javascript:void(0);" className="share-btn">
                        <i className="icofont-share" />
                        Share
                      </a>
                      <ul className="share-list">
                        <li>
                          <a href="#" className="color-fb">
                            <i className="icofont-facebook" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-messenger">
                            <i className="icofont-facebook-messenger" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-instagram">
                            <i className="icofont-instagram" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-whatsapp">
                            <i className="icofont-brand-whatsapp" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-twitter">
                            <i className="icofont-twitter" />
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div className="post-comment">
                  <ul className="comment-list">
                    <li className="main-comments">
                      <div className="each-comment">
                        <div className="post-header">
                          <div className="media">
                            <div className="user-img">
                              <Image
                                width={1000}
                                height={100}
                                className="w-auto h-auto"
                                src="/media/figure/chat_14.jpg"
                                alt="Aahat"
                              />
                            </div>
                            <div className="media-body">
                              <div className="user-title">
                                <a href="user-timeline.html">Aahat Akter</a>
                              </div>
                              <ul className="entry-meta">
                                <li className="meta-privacy">
                                  <i className="icofont-world" />
                                  Friends
                                </li>
                                <li className="meta-time">5 mins ago</li>
                              </ul>
                            </div>
                          </div>
                          <div className="dropdown">
                            <button
                              className="dropdown-toggle"
                              type="button"
                              data-toggle="dropdown"
                              aria-expanded="false"
                            >
                              ...
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a className="dropdown-item" href="#">
                                Close
                              </a>
                              <a className="dropdown-item" href="#">
                                Edit
                              </a>
                              <a className="dropdown-item" href="#">
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="post-body">
                          <p>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium der doloremque laudantiumSed
                            ut perspicia tisery..
                          </p>
                        </div>
                        <div className="post-footer">
                          <ul>
                            <li className="react-icon">
                              <Image
                                width={1000}
                                height={100}
                                className="w-auto h-auto"
                                src="/media/figure/reaction_1.png"
                                alt="icon"
                              />
                              <Image
                                width={1000}
                                height={100}
                                className="w-auto h-auto"
                                src="/media/figure/reaction_2.png"
                                alt="icon"
                              />
                            </li>
                            <li className="post-react">
                              <a href="#">
                                <i className="icofont-thumbs-up" />
                                React!
                              </a>
                              <ul className="react-list">
                                <li>
                                  <a href="#">
                                    <Image
                                      width={1000}
                                      height={100}
                                      className="w-auto h-auto"
                                      src="/media/figure/reaction_1.png"
                                      alt="Like"
                                    />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <Image
                                      width={1000}
                                      height={100}
                                      className="w-auto h-auto"
                                      src="/media/figure/reaction_3.png"
                                      alt="Like"
                                    />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <Image
                                      width={1000}
                                      height={100}
                                      className="w-auto h-auto"
                                      src="/media/figure/reaction_4.png"
                                      alt="Like"
                                    />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <Image
                                      width={1000}
                                      height={100}
                                      className="w-auto h-auto"
                                      src="/media/figure/reaction_2.png"
                                      alt="Like"
                                    />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <Image
                                      width={1000}
                                      height={100}
                                      className="w-auto h-auto"
                                      src="/media/figure/reaction_7.png"
                                      alt="Like"
                                    />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <Image
                                      width={1000}
                                      height={100}
                                      className="w-auto h-auto"
                                      src="/media/figure/reaction_6.png"
                                      alt="Like"
                                    />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <Image
                                      width={1000}
                                      height={100}
                                      className="w-auto h-auto"
                                      src="/media/figure/reaction_5.png"
                                      alt="Like"
                                    />
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a href="#">
                                <i className="icofont-reply" />
                                Reply
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <ul className="children">
                        <li className="main-comments">
                          <div className="each-comment">
                            <div className="post-header">
                              <div className="media">
                                <div className="user-img">
                                  <Image
                                    width={1000}
                                    height={100}
                                    className="w-auto h-auto"
                                    src="/media/figure/notifiy_1.png"
                                    alt="Aahat"
                                  />
                                </div>
                                <div className="media-body">
                                  <div className="user-title">
                                    <a href="user-timeline.html">Neko Bebo</a>
                                  </div>
                                  <ul className="entry-meta">
                                    <li className="meta-time">5 mins ago</li>
                                  </ul>
                                </div>
                              </div>
                              <div className="dropdown">
                                <button
                                  className="dropdown-toggle"
                                  type="button"
                                  data-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  ...
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a className="dropdown-item" href="#">
                                    Close
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Edit
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="post-body">
                              <p>
                                Sed ut perspiciatis unde omnis iste natus error
                                sit voluptatem..
                              </p>
                            </div>
                            <div className="post-footer">
                              <ul>
                                <li className="react-icon">
                                  <Image
                                    width={1000}
                                    height={100}
                                    className="w-auto h-auto"
                                    src="/media/figure/reaction_1.png"
                                    alt="icon"
                                  />
                                  <Image
                                    width={1000}
                                    height={100}
                                    className="w-auto h-auto"
                                    src="/media/figure/reaction_3.png"
                                    alt="icon"
                                  />
                                </li>
                                <li className="post-react">
                                  <a href="#">
                                    <i className="icofont-thumbs-up" />
                                    React!
                                  </a>
                                  <ul className="react-list">
                                    <li>
                                      <a href="#">
                                        <Image
                                          width={1000}
                                          height={100}
                                          className="w-auto h-auto"
                                          src="/media/figure/reaction_1.png"
                                          alt="Like"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <Image
                                          width={1000}
                                          height={100}
                                          className="w-auto h-auto"
                                          src="/media/figure/reaction_3.png"
                                          alt="Like"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <Image
                                          width={1000}
                                          height={100}
                                          className="w-auto h-auto"
                                          src="/media/figure/reaction_4.png"
                                          alt="Like"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <Image
                                          width={1000}
                                          height={100}
                                          className="w-auto h-auto"
                                          src="/media/figure/reaction_2.png"
                                          alt="Like"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <Image
                                          width={1000}
                                          height={100}
                                          className="w-auto h-auto"
                                          src="/media/figure/reaction_7.png"
                                          alt="Like"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <Image
                                          width={1000}
                                          height={100}
                                          className="w-auto h-auto"
                                          src="/media/figure/reaction_6.png"
                                          alt="Like"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <Image
                                          width={1000}
                                          height={100}
                                          className="w-auto h-auto"
                                          src="/media/figure/reaction_5.png"
                                          alt="Like"
                                        />
                                      </a>
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <a href="#">
                                    <i className="icofont-reply" />
                                    Reply
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>
                        <li className="main-comments">
                          <div className="each-comment">
                            <div className="post-header">
                              <div className="media">
                                <div className="user-img">
                                  <Image
                                    width={1000}
                                    height={100}
                                    className="w-auto h-auto"
                                    src="/media/figure/notifiy_1.png"
                                    alt="Aahat"
                                  />
                                </div>
                                <div className="media-body">
                                  <div className="user-title">
                                    <a href="user-timeline.html">Neko Bebo</a>
                                  </div>
                                  <ul className="entry-meta">
                                    <li className="meta-time">5 mins ago</li>
                                  </ul>
                                </div>
                              </div>
                              <div className="dropdown">
                                <button
                                  className="dropdown-toggle"
                                  type="button"
                                  data-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  ...
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <a className="dropdown-item" href="#">
                                    Close
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Edit
                                  </a>
                                  <a className="dropdown-item" href="#">
                                    Delete
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="post-body">
                              <p>
                                Sed ut perspiciatis unde omnis iste natus error
                                sit voluptatem accusantium der doloremque..
                              </p>
                            </div>
                            <div className="post-footer">
                              <ul>
                                <li className="react-icon">
                                  <Image
                                    width={1000}
                                    height={100}
                                    className="w-auto h-auto"
                                    src="/media/figure/reaction_1.png"
                                    alt="icon"
                                  />
                                  <Image
                                    width={1000}
                                    height={100}
                                    className="w-auto h-auto"
                                    src="/media/figure/reaction_2.png"
                                    alt="icon"
                                  />
                                </li>
                                <li className="post-react">
                                  <a href="#">
                                    <i className="icofont-thumbs-up" />
                                    React!
                                  </a>
                                  <ul className="react-list">
                                    <li>
                                      <a href="#">
                                        <Image
                                          width={1000}
                                          height={100}
                                          className="w-auto h-auto"
                                          src="/media/figure/reaction_1.png"
                                          alt="Like"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <Image
                                          width={1000}
                                          height={100}
                                          className="w-auto h-auto"
                                          src="/media/figure/reaction_3.png"
                                          alt="Like"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <Image
                                          width={1000}
                                          height={100}
                                          className="w-auto h-auto"
                                          src="/media/figure/reaction_4.png"
                                          alt="Like"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <Image
                                          width={1000}
                                          height={100}
                                          className="w-auto h-auto"
                                          src="/media/figure/reaction_2.png"
                                          alt="Like"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <Image
                                          width={1000}
                                          height={100}
                                          className="w-auto h-auto"
                                          src="/media/figure/reaction_7.png"
                                          alt="Like"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <Image
                                          width={1000}
                                          height={100}
                                          className="w-auto h-auto"
                                          src="/media/figure/reaction_6.png"
                                          alt="Like"
                                        />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <Image
                                          width={1000}
                                          height={100}
                                          className="w-auto h-auto"
                                          src="/media/figure/reaction_5.png"
                                          alt="Like"
                                        />
                                      </a>
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <a href="#">
                                    <i className="icofont-reply" />
                                    Reply
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </li>
                    <li className="main-comments">
                      <div className="each-comment">
                        <div className="post-header">
                          <div className="media">
                            <div className="user-img">
                              <Image
                                width={1000}
                                height={100}
                                className="w-auto h-auto"
                                src="/media/figure/chat_14.jpg"
                                alt="Aahat"
                              />
                            </div>
                            <div className="media-body">
                              <div className="user-title">
                                <a href="#">Rebeca Powel</a>
                              </div>
                              <ul className="entry-meta">
                                <li className="meta-privacy">
                                  <i className="icofont-world" />
                                  Friends
                                </li>
                                <li className="meta-time">5 minutes ago</li>
                              </ul>
                            </div>
                          </div>
                          <div className="dropdown">
                            <button
                              className="dropdown-toggle"
                              type="button"
                              data-toggle="dropdown"
                              aria-expanded="false"
                            >
                              ...
                            </button>
                            <div className="dropdown-menu dropdown-menu-right">
                              <a className="dropdown-item" href="#">
                                Close
                              </a>
                              <a className="dropdown-item" href="#">
                                Edit
                              </a>
                              <a className="dropdown-item" href="#">
                                Delete
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="post-body">
                          <p>
                            Sed ut perspiciatis unde omnis iste natus error sit
                            voluptatem accusantium der doloremque laudantiumSed
                            ..
                          </p>
                        </div>
                        <div className="post-footer">
                          <ul>
                            <li className="react-icon">
                              <Image
                                width={1000}
                                height={100}
                                className="w-auto h-auto"
                                src="/media/figure/reaction_1.png"
                                alt="icon"
                              />
                              <Image
                                width={1000}
                                height={100}
                                className="w-auto h-auto"
                                src="/media/figure/reaction_2.png"
                                alt="icon"
                              />
                            </li>
                            <li className="post-react">
                              <a href="#">
                                <i className="icofont-thumbs-up" />
                                React!
                              </a>
                              <ul className="react-list">
                                <li>
                                  <a href="#">
                                    <Image
                                      width={1000}
                                      height={100}
                                      className="w-auto h-auto"
                                      src="/media/figure/reaction_1.png"
                                      alt="Like"
                                    />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <Image
                                      width={1000}
                                      height={100}
                                      className="w-auto h-auto"
                                      src="/media/figure/reaction_3.png"
                                      alt="Like"
                                    />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <Image
                                      width={1000}
                                      height={100}
                                      className="w-auto h-auto"
                                      src="/media/figure/reaction_4.png"
                                      alt="Like"
                                    />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <Image
                                      width={1000}
                                      height={100}
                                      className="w-auto h-auto"
                                      src="/media/figure/reaction_2.png"
                                      alt="Like"
                                    />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <Image
                                      width={1000}
                                      height={100}
                                      className="w-auto h-auto"
                                      src="/media/figure/reaction_7.png"
                                      alt="Like"
                                    />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <Image
                                      width={1000}
                                      height={100}
                                      className="w-auto h-auto"
                                      src="/media/figure/reaction_6.png"
                                      alt="Like"
                                    />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <Image
                                      width={1000}
                                      height={100}
                                      className="w-auto h-auto"
                                      src="/media/figure/reaction_5.png"
                                      alt="Like"
                                    />
                                  </a>
                                </li>
                              </ul>
                            </li>
                            <li>
                              <a href="#">
                                <i className="icofont-reply" />
                                Reply
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <div className="load-more-btn">
                    <a href="#" className="item-btn">
                      Load More Comments <span>4+</span>
                    </a>
                  </div>
                  <div className="comment-reply">
                    <div className="user-img">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_15.jpg"
                        alt="Aahat"
                      />
                    </div>
                    <div className="input-box">
                      <input
                        type="text"
                        name="comment"
                        className="form-control"
                        placeholder="Your Reply...."
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="block-box post-view">
                <div className="post-header">
                  <div className="media">
                    <div className="user-img">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_5.jpg"
                        alt="Aahat"
                      />
                    </div>
                    <div className="media-body">
                      <div className="user-title">
                        <a href="user-timeline.html">Rebeca Powel</a>
                      </div>
                      <ul className="entry-meta">
                        <li className="meta-privacy">
                          <i className="icofont-user-alt-3" />
                          Personal
                        </li>
                        <li className="meta-time">8 mins ago</li>
                      </ul>
                    </div>
                  </div>
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      ...
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">
                        Close
                      </a>
                      <a className="dropdown-item" href="#">
                        Edit
                      </a>
                      <a className="dropdown-item" href="#">
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
                <div className="post-body">
                  <div className="post-no-thumbnail">
                    <p>
                      I have great news to share with you all! I&rsquo;ve been
                      officially made a game streaming verified partner by
                      Streamy http://radiustheme.com/ What does this mean?
                      I&rsquo;ll be uploading new content every day, improving
                      the quality and I&rsquo;m gonna have access to games a
                      month before the official release.
                    </p>
                    <p>
                      This is a dream come true, thanks to all for the
                      support!!!
                    </p>
                  </div>
                  <div className="post-meta-wrap">
                    <div className="post-meta">
                      <div className="post-reaction">
                        <div className="reaction-icon">
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/figure/reaction_1.png"
                            alt="icon"
                          />
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/figure/reaction_2.png"
                            alt="icon"
                          />
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/figure/reaction_3.png"
                            alt="icon"
                          />
                        </div>
                        <div className="meta-text">35</div>
                      </div>
                    </div>
                    <div className="post-meta">
                      <div className="meta-text">2 Comments</div>
                      <div className="meta-text">05 Share</div>
                    </div>
                  </div>
                </div>
                <div className="post-footer">
                  <ul>
                    <li className="post-react">
                      <a href="#">
                        <i className="icofont-thumbs-up" />
                        React!
                      </a>
                      <ul className="react-list">
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_1.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_3.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_4.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_2.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_7.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_6.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_5.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icofont-comment" />
                        Comment
                      </a>
                    </li>
                    <li className="post-share">
                      <a href="javascript:void(0);" className="share-btn">
                        <i className="icofont-share" />
                        Share
                      </a>
                      <ul className="share-list">
                        <li>
                          <a href="#" className="color-fb">
                            <i className="icofont-facebook" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-messenger">
                            <i className="icofont-facebook-messenger" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-instagram">
                            <i className="icofont-instagram" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-whatsapp">
                            <i className="icofont-brand-whatsapp" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-twitter">
                            <i className="icofont-twitter" />
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="block-box post-view">
                <div className="post-header">
                  <div className="media">
                    <div className="user-img">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/chat_5.jpg"
                        alt="Aahat"
                      />
                    </div>
                    <div className="media-body">
                      <div className="user-title">
                        <a href="user-timeline.html">Rebeca Powel</a>
                      </div>
                      <ul className="entry-meta">
                        <li className="meta-privacy">
                          <i className="icofont-world" />
                          Public
                        </li>
                        <li className="meta-time">10 mins ago</li>
                      </ul>
                    </div>
                  </div>
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      ...
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">
                        Close
                      </a>
                      <a className="dropdown-item" href="#">
                        Edit
                      </a>
                      <a className="dropdown-item" href="#">
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
                <div className="post-body">
                  <p>
                    This is a dream come true, thanks to all for the support!!!
                  </p>
                  <div className="post-video">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/figure/post_11.jpg"
                      alt="Post"
                    />
                    <a href="#" className="video-btn">
                      <i className="icofont-ui-play" />
                    </a>
                  </div>
                  <div className="post-meta-wrap">
                    <div className="post-meta">
                      <div className="post-reaction">
                        <div className="reaction-icon">
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/figure/reaction_1.png"
                            alt="icon"
                          />
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/figure/reaction_2.png"
                            alt="icon"
                          />
                          <Image
                            width={1000}
                            height={100}
                            className="w-auto h-auto"
                            src="/media/figure/reaction_3.png"
                            alt="icon"
                          />
                        </div>
                        <div className="meta-text">55</div>
                      </div>
                    </div>
                    <div className="post-meta">
                      <div className="meta-text">05 Comments</div>
                      <div className="meta-text">02 Share</div>
                    </div>
                  </div>
                </div>
                <div className="post-footer">
                  <ul>
                    <li className="post-react">
                      <a href="#">
                        <i className="icofont-thumbs-up" />
                        React!
                      </a>
                      <ul className="react-list">
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_1.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_3.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_4.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_2.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_7.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_6.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <Image
                              width={1000}
                              height={100}
                              className="w-auto h-auto"
                              src="/media/figure/reaction_5.png"
                              alt="Like"
                            />
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icofont-comment" />
                        Comment
                      </a>
                    </li>
                    <li className="post-share">
                      <a href="javascript:void(0);" className="share-btn">
                        <i className="icofont-share" />
                        Share
                      </a>
                      <ul className="share-list">
                        <li>
                          <a href="#" className="color-fb">
                            <i className="icofont-facebook" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-messenger">
                            <i className="icofont-facebook-messenger" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-instagram">
                            <i className="icofont-instagram" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-whatsapp">
                            <i className="icofont-brand-whatsapp" />
                          </a>
                        </li>
                        <li>
                          <a href="#" className="color-twitter">
                            <i className="icofont-twitter" />
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="block-box load-more-btn">
                <a href="#" className="item-btn">
                  <i className="icofont-refresh" />
                  Load More Posts
                </a>
              </div>
            </div>
            <div className="col-lg-4 widget-block widget-break-lg">
              <div className="widget widget-user-about">
                <div className="widget-heading">
                  <h3 className="widget-title">About Me</h3>
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      ...
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">
                        Close
                      </a>
                      <a className="dropdown-item" href="#">
                        Edit
                      </a>
                      <a className="dropdown-item" href="#">
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
                <div className="user-info">
                  <p>
                    Hi! My name is Rebeca Powel but some people may know me
                    asserty GamePagla! I have a Newbike channel where I stream.
                  </p>
                  <ul className="info-list">
                    <li>
                      <span>Joined:</span>24/12/2020
                    </li>
                    <li>
                      <span>E-mail:</span>info@gmail.com
                    </li>
                    <li>
                      <span>Address:</span>59 Street Neworkcity
                    </li>
                    <li>
                      <span>Phone:</span>+123 9856836
                    </li>
                    <li>
                      <span>Country:</span>USA
                    </li>
                    <li>
                      <span>Web:</span>
                      <a href="#">www.rebeca.com</a>
                    </li>
                    <li className="social-share">
                      <span>Social:</span>
                      <div className="social-icon">
                        <a href="#">
                          <i className="icofont-facebook" />
                        </a>
                        <a href="#">
                          <i className="icofont-twitter" />
                        </a>
                        <a href="#">
                          <i className="icofont-dribbble" />
                        </a>
                        <a href="#">
                          <i className="icofont-whatsapp" />
                        </a>
                        <a href="#">
                          <i className="icofont-instagram" />
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="widget widget-gallery">
                <div className="widget-heading">
                  <h3 className="widget-title">Photo Gallery</h3>
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      ...
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">
                        Close
                      </a>
                      <a className="dropdown-item" href="#">
                        Edit
                      </a>
                      <a className="dropdown-item" href="#">
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
                <ul className="photo-list">
                  <li>
                    <a href="#">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/widget_gallery1.jpg"
                        alt="Gallery"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/widget_gallery2.jpg"
                        alt="Gallery"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/widget_gallery3.jpg"
                        alt="Gallery"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/widget_gallery4.jpg"
                        alt="Gallery"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/widget_gallery5.jpg"
                        alt="Gallery"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/widget_gallery6.jpg"
                        alt="Gallery"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/widget_gallery2.jpg"
                        alt="Gallery"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/widget_gallery4.jpg"
                        alt="Gallery"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#" data-photo="20+">
                      <Image
                        width={1000}
                        height={100}
                        className="w-auto h-auto"
                        src="/media/figure/widget_gallery1.jpg"
                        alt="Gallery"
                      />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="widget widget-badges">
                <div className="widget-heading">
                  <h3 className="widget-title">My Badges</h3>
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      ...
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">
                        Close
                      </a>
                      <a className="dropdown-item" href="#">
                        Edit
                      </a>
                      <a className="dropdown-item" href="#">
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
                <ul className="badge-list">
                  <li>
                    <a href="#" className="bg-tagerine-gradient">
                      <i className="icofont-crown-queen" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="bg-amethyst-gradient">
                      <i className="icofont-ui-play" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="bg-picton-gradient">
                      <i className="icofont-simple-smile" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="bg-sun-gradient">
                      <i className="icofont-squirrel" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="bg-jungle-gradient">
                      <i className="icofont-rocket-alt-1" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="bg-dodger-gradient">
                      <i className="icofont-fire-burn" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="bg-pink-gradient">
                      <i className="icofont-dart" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="bg-spring-gradient">
                      <i className="icofont-flash" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="bg-gray-gradient">
                      <i className="icofont-panda-face" />
                    </a>
                  </li>
                  <li>
                    <a href="#" className="bg-salmon-gradient">
                      <i className="icofont-star" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="widget widget-memebers">
                <div className="widget-heading">
                  <h3 className="widget-title">My Friends</h3>
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      ...
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">
                        Close
                      </a>
                      <a className="dropdown-item" href="#">
                        Edit
                      </a>
                      <a className="dropdown-item" href="#">
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
                <div className="members-list">
                  <div className="media">
                    <div className="item-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/chat_1.jpg"
                          alt="Chat"
                        />
                      </a>
                    </div>
                    <div className="media-body">
                      <h4 className="item-title">
                        <a href="#">Aahat Akter</a>
                      </h4>
                      <div className="item-username">@Aahat </div>
                      <div className="member-status online">
                        <i className="icofont-check" />
                      </div>
                    </div>
                  </div>
                  <div className="media">
                    <div className="item-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/chat_2.jpg"
                          alt="Chat"
                        />
                      </a>
                    </div>
                    <div className="media-body">
                      <h4 className="item-title">
                        <a href="#">Kazi Rahman</a>
                      </h4>
                      <div className="item-username">@Rahman</div>
                      <div className="member-status online">
                        <i className="icofont-check" />
                      </div>
                    </div>
                  </div>
                  <div className="media">
                    <div className="item-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/chat_3.jpg"
                          alt="Chat"
                        />
                      </a>
                    </div>
                    <div className="media-body">
                      <h4 className="item-title">
                        <a href="#">Alia Karon</a>
                      </h4>
                      <div className="item-username">@Alia</div>
                      <div className="member-status online">
                        <i className="icofont-check" />
                      </div>
                    </div>
                  </div>
                  <div className="media">
                    <div className="item-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/chat_4.jpg"
                          alt="Chat"
                        />
                      </a>
                    </div>
                    <div className="media-body">
                      <h4 className="item-title">
                        <a href="#">Masterero</a>
                      </h4>
                      <div className="item-username">@Master</div>
                      <div className="member-status offline">
                        <i className="icofont-check" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="see-all-btn">
                  <a href="#" className="item-btn">
                    See All Friends
                  </a>
                </div>
              </div>
              <div className="widget widget-groups">
                <div className="widget-heading">
                  <h3 className="widget-title">My Groups</h3>
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      ...
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">
                        Close
                      </a>
                      <a className="dropdown-item" href="#">
                        Edit
                      </a>
                      <a className="dropdown-item" href="#">
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
                <div className="group-list">
                  <div className="media">
                    <div className="item-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/groups/groups_9.jpg"
                          alt="group"
                        />
                      </a>
                    </div>
                    <div className="media-body">
                      <h4 className="item-title">
                        <a href="#">Kito Development</a>
                      </h4>
                      <div className="item-member">265 Members</div>
                    </div>
                  </div>
                  <div className="media">
                    <div className="item-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/groups/groups_10.jpg"
                          alt="group"
                        />
                      </a>
                    </div>
                    <div className="media-body">
                      <h4 className="item-title">
                        <a href="#">Chef Express</a>
                      </h4>
                      <div className="item-member">4,265 Members</div>
                    </div>
                  </div>
                  <div className="media">
                    <div className="item-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/groups/groups_11.jpg"
                          alt="group"
                        />
                      </a>
                    </div>
                    <div className="media-body">
                      <h4 className="item-title">
                        <a href="#">Photo Contest</a>
                      </h4>
                      <div className="item-member">1,265 Members</div>
                    </div>
                  </div>
                  <div className="media">
                    <div className="item-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/groups/groups_12.jpg"
                          alt="group"
                        />
                      </a>
                    </div>
                    <div className="media-body">
                      <h4 className="item-title">
                        <a href="#">WP Developers</a>
                      </h4>
                      <div className="item-member">265 Members</div>
                    </div>
                  </div>
                </div>
                <div className="see-all-btn">
                  <a href="#" className="item-btn">
                    See All Groups
                  </a>
                </div>
              </div>
              <div className="widget widget-comment">
                <div className="widget-heading">
                  <h3 className="widget-title">Recent Comments</h3>
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      type="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                    >
                      ...
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <a className="dropdown-item" href="#">
                        Close
                      </a>
                      <a className="dropdown-item" href="#">
                        Edit
                      </a>
                      <a className="dropdown-item" href="#">
                        Delete
                      </a>
                    </div>
                  </div>
                </div>
                <div className="group-list">
                  <div className="media">
                    <div className="item-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/widget_comment1.jpg"
                          alt="post"
                        />
                      </a>
                    </div>
                    <div className="media-body">
                      <div className="post-date">JULY 24, 2020</div>
                      <h4 className="item-title">
                        <a href="#">Seohen anunown printer took.</a>
                      </h4>
                    </div>
                  </div>
                  <div className="media">
                    <div className="item-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/widget_comment2.jpg"
                          alt="post"
                        />
                      </a>
                    </div>
                    <div className="media-body">
                      <div className="post-date">JULY 24, 2020</div>
                      <h4 className="item-title">
                        <a href="#">Seohen anunown printer took.</a>
                      </h4>
                    </div>
                  </div>
                  <div className="media">
                    <div className="item-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/widget_comment3.jpg"
                          alt="post"
                        />
                      </a>
                    </div>
                    <div className="media-body">
                      <div className="post-date">JULY 24, 2020</div>
                      <h4 className="item-title">
                        <a href="#">Seohen anunown printer took.</a>
                      </h4>
                    </div>
                  </div>
                  <div className="media">
                    <div className="item-img">
                      <a href="#">
                        <Image
                          width={1000}
                          height={100}
                          className="w-auto h-auto"
                          src="/media/figure/widget_comment4.jpg"
                          alt="post"
                        />
                      </a>
                    </div>
                    <div className="media-body">
                      <div className="post-date">JULY 24, 2020</div>
                      <h4 className="item-title">
                        <a href="#">Seohen anunown printer took.</a>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="widget widget-banner">
                <h3 className="item-title">Most Popular</h3>
                <div className="item-subtitle">Circle Application</div>
                <a href="#" className="item-btn">
                  <span className="btn-text">Register Now</span>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
