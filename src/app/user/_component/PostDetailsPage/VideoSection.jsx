import React, { useRef, useState, useEffect } from "react";

const VideoSection = ({ videos }) => {
  const videoRefs = useRef([]);
  const [currentVideo, setCurrentVideo] = useState(0);

  const handleVideoEnd = () => {
    const nextVideo = (currentVideo + 1) % videos.length;
    setCurrentVideo(nextVideo);
  };

  useEffect(() => {
    videoRefs.current.forEach((videoRef, index) => {
      if (videoRef) {
        if (index === currentVideo) {
          videoRef.play();
        } else {
          videoRef.pause();
        }
      }
    });
  }, [currentVideo]);

  return (
    <div className="video-section">
      <div className="video-slider">
        {videos?.map((video, index) => (
          <div
            key={video?._id}
            className={`video-slide ${currentVideo === index ? "active" : ""}`}
          >
            <video
              src={video?.url}
              width="640"
              height="360"
              muted
              controls
              className="rounded-md w-full"
              ref={(el) => (videoRefs.current[index] = el)}
              onEnded={handleVideoEnd}
            />
          </div>
        ))}
      </div>
      <div className="video-navigation">
        {videos?.map((video, index) => (
          <button
            key={video?._id}
            className={`nav-button ${currentVideo === index ? "active" : ""}`}
            onClick={() => setCurrentVideo(index)}
          >
            <video
              src={video?.url}
              width="200"
              className="rounded-md cursor-pointer w-full h-[80px]"
            />
          </button>
        ))}
      </div>
      <style jsx>{`
        .video-section {
          text-align: center;
        }
        .video-slider {
          display: flex;
          overflow: hidden;
          justify-content: center;
        }
        .video-slide {
          display: none;
        }
        .video-slide.active {
          display: block;
        }
        .video-navigation {
          display: flex;
          justify-content: center;
          margin-top: 10px;
        }
        .nav-button {
          padding: 2px;
          margin: 0 5px;
          border-radius: 5px;
          cursor: pointer;
        }
        .nav-button.active {
          border: 1px solid #5854ef;
        }
      `}</style>
    </div>
  );
};

export default VideoSection;
