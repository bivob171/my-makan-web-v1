import React from "react";

export const BuyerPostDetailsPage = () => {
  return (
    <div className="page-content">
      {" "}
      <div className="container">
        <div className="block-box user-single-blog">
          <div className="blog-thumbnail">
            <img src="media/blog/blog_10.jpg" alt="Blog" />
          </div>
          <div className="blog-content-wrap">
            <div className="blog-entry-header">
              <div className="entry-category">
                <a href="#">Community</a>
                <a href="#">Inspiration</a>
              </div>
              <h2 className="entry-title">
                Spoke with the developer sety make atype specimen book has
                survived not only five centuries
              </h2>
              <div className="row align-items-center">
                <div className="col-lg-8">
                  <ul className="entry-meta">
                    <li>
                      <img src="media/figure/chat_7.jpg" alt="Chat" />
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
              <div className="row">
                <div className="col-md-6">
                  <div className="content-img">
                    <img src="media/blog/blog_11.jpg" alt="Blog" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="content-img">
                    <img src="media/blog/blog_12.jpg" alt="Blog" />
                  </div>
                </div>
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
            <div className="blog-footer">
              <div className="item-label">
                Choose your <span>Reaction!</span>
              </div>
              <div className="reaction-icon">
                <a href="#">
                  <img src="media/figure/reaction_1.png" alt="Like" />
                </a>
                <a href="#">
                  <img src="media/figure/reaction_6.png" alt="Like" />
                </a>
                <a href="#">
                  <img src="media/figure/reaction_2.png" alt="Like" />
                </a>
                <a href="#">
                  <img src="media/figure/reaction_7.png" alt="Like" />
                </a>
                <a href="#">
                  <img src="media/figure/reaction_3.png" alt="Like" />
                </a>
                <a href="#">
                  <img src="media/figure/reaction_5.png" alt="Like" />
                </a>
              </div>
            </div>
            <div className="blog-comment-form">
              <h3 className="item-title">Leave a Comment</h3>
              <form>
                <div className="row gutters-20">
                  <div className="col-lg-4 form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                  <div className="col-lg-4 form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="E-mail"
                      style={{
                        backgroundImage: 'url("data:image/png',
                        backgroundRepeat: "no-repeat",
                        backgroundSize: 20,
                        backgroundPosition: "97% center",
                        cursor: "auto",
                      }}
                      data-temp-mail-org={0}
                    />
                  </div>
                  <div className="col-lg-4 form-group">
                    <input
                      type="text"
                      name="website"
                      className="form-control"
                      placeholder="website"
                    />
                  </div>
                  <div className="col-lg-12 form-group">
                    <textarea
                      name="message"
                      id="message"
                      className="form-control textarea"
                      placeholder="Comments"
                      cols={30}
                      rows={7}
                      defaultValue={""}
                    />
                  </div>
                  <div className="col-lg-12 form-group">
                    <input
                      type="submit"
                      className="submit-btn"
                      name="post-comment"
                      defaultValue="Post Comment"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="realated-blog">
          <div className="block-box blog-heading">
            <h3 className="heading-title">Related Blog Posts</h3>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="block-box user-blog">
                <div className="blog-img">
                  <a href="#">
                    <img src="media/blog/blog_4.jpg" alt="Blog" />
                  </a>
                </div>
                <div className="blog-content">
                  <div className="blog-category">
                    <a href="#">Community</a>
                    <a href="#">Inspiration</a>
                  </div>
                  <h3 className="blog-title">
                    <a href="#">
                      Spoke with the developer sety 2020 Gaming Area
                    </a>
                  </h3>
                  <div className="blog-date">
                    <i className="icofont-calendar" /> 15 October, 2020
                  </div>
                  <p>
                    when ann unknown printer took galley type and scrambled it
                    to make aretype specimen book has survived not only.
                  </p>
                </div>
                <div className="blog-meta">
                  <ul>
                    <li className="blog-reaction">
                      <div className="reaction-icon">
                        <img src="media/figure/reaction_1.png" alt="icon" />
                        <img src="media/figure/reaction_2.png" alt="icon" />
                        <img src="media/figure/reaction_3.png" alt="icon" />
                      </div>
                      <div className="meta-text">+ 15 others</div>
                    </li>
                    <li>
                      <i className="icofont-comment" /> 05
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="block-box user-blog">
                <div className="blog-img">
                  <a href="#">
                    <img src="media/blog/blog_5.jpg" alt="Blog" />
                  </a>
                </div>
                <div className="blog-content">
                  <div className="blog-category">
                    <a href="#">Sporty</a>
                  </div>
                  <h3 className="blog-title">
                    <a href="#">
                      Spoke with the developer sety 2020 Gaming Area
                    </a>
                  </h3>
                  <div className="blog-date">
                    <i className="icofont-calendar" /> 15 October, 2020
                  </div>
                  <p>
                    when ann unknown printer took galley type and scrambled it
                    to make aretype specimen book has survived not only.
                  </p>
                </div>
                <div className="blog-meta">
                  <ul>
                    <li className="blog-reaction">
                      <div className="reaction-icon">
                        <img src="media/figure/reaction_1.png" alt="icon" />
                        <img src="media/figure/reaction_2.png" alt="icon" />
                        <img src="media/figure/reaction_3.png" alt="icon" />
                      </div>
                      <div className="meta-text">+ 15 others</div>
                    </li>
                    <li>
                      <i className="icofont-comment" /> 05
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="block-box user-blog">
                <div className="blog-img">
                  <a href="#">
                    <img src="media/blog/blog_6.jpg" alt="Blog" />
                  </a>
                </div>
                <div className="blog-content">
                  <div className="blog-category">
                    <a href="#">Community</a>
                    <a href="#">Inspiration</a>
                  </div>
                  <h3 className="blog-title">
                    <a href="#">
                      Spoke with the developer sety 2020 Gaming Area
                    </a>
                  </h3>
                  <div className="blog-date">
                    <i className="icofont-calendar" /> 15 October, 2020
                  </div>
                  <p>
                    when ann unknown printer took galley type and scrambled it
                    to make aretype specimen book has survived not only.
                  </p>
                </div>
                <div className="blog-meta">
                  <ul>
                    <li className="blog-reaction">
                      <div className="reaction-icon">
                        <img src="media/figure/reaction_1.png" alt="icon" />
                        <img src="media/figure/reaction_2.png" alt="icon" />
                        <img src="media/figure/reaction_3.png" alt="icon" />
                      </div>
                      <div className="meta-text">+ 15 others</div>
                    </li>
                    <li>
                      <i className="icofont-comment" /> 05
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
