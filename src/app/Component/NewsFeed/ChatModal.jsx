import Image from "next/image";
import React from "react";

const ChatModal = () => {
  return (
    <>
      <div
        className="chat-conversion-box"
        id="chat-box-modal"
        tabIndex={-1}
        aria-labelledby="chat-modal-label"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title" id="chat-modal-label">
                Fahim Rahman <span className="online"></span>
              </h6>
              <div className="action-icon">
                <button className="chat-shrink">
                  <i className="icofont-minus"></i>
                </button>
                <button
                  type="button"
                  className="close chat-close chat-open"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
            <div className="modal-body">
              <ul className="chat-conversion">
                <li className="chat-others">
                  <div className="author-img">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/figure/chat_12.jpg"
                      alt="Chat"
                    />
                  </div>
                  <div className="author-text">
                    <span>
                      How are you Fahim vai ? Tommorow office will be your last
                      day of Bachelor life.
                    </span>
                  </div>
                </li>
                <li className="chat-you">
                  <div className="author-img">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/figure/chat_11.jpg"
                      alt="Chat"
                    />
                  </div>
                  <div className="author-text">
                    <span>hmm That&apos;s great</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="modal-footer">
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Write your text here....."
                  />
                  <div className="chat-plus-icon">
                    <i className="icofont-plus-circle"></i>
                  </div>
                  <div className="file-attach-icon">
                    <a href="#">
                      <i className="icofont-slightly-smile"></i>
                    </a>
                    <a href="#">
                      <i className="icofont-camera"></i>
                    </a>
                    <a href="#">
                      <i className="icofont-image"></i>
                    </a>
                    <a href="#">
                      <i className="icofont-mic"></i>
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div
        className="chat-conversion-box"
        id="chat-box-modal"
        tabIndex={-1}
        aria-labelledby="chat-modal-label"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h6 className="modal-title" id="chat-modal-label">
                Fahim Rahman <span className="online" />
              </h6>
              <div className="action-icon">
                <button className="chat-shrink">
                  <i className="icofont-minus" />
                </button>
                <button
                  type="button"
                  className="close chat-close chat-open"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
            </div>
            <div className="modal-body">
              <ul className="chat-conversion">
                <li className="chat-others">
                  <div className="author-img">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/figure/chat_12.jpg"
                      alt="Chat"
                    />
                  </div>
                  <div className="author-text">
                    <span>
                      How are you Fahim vai ? Tommorow office will be your last
                      day of Bachelor life.
                    </span>
                  </div>
                </li>
                <li className="chat-you">
                  <div className="author-img">
                    <Image
                      width={1000}
                      height={100}
                      className="w-auto h-auto"
                      src="/media/figure/chat_11.jpg"
                      alt="Chat"
                    />
                  </div>
                  <div className="author-text">
                    <span>hmm That&apos;s great</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="modal-footer">
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Write your text here....."
                  />
                  <div className="chat-plus-icon">
                    <i className="icofont-plus-circle" />
                  </div>
                  <div className="file-attach-icon">
                    <a href="#">
                      <i className="icofont-slightly-smile" />
                    </a>
                    <a href="#">
                      <i className="icofont-camera" />
                    </a>
                    <a href="#">
                      <i className="icofont-image" />
                    </a>
                    <a href="#">
                      <i className="icofont-mic" />
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatModal;
