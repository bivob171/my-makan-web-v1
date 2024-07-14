import React, { useRef, useState, useEffect } from "react";

const VideoSection = () => {
  const videoRefs = useRef([]);
  const [currentVideo, setCurrentVideo] = useState(0);

  const videos = [
    {
      id: 1,
      url: "https://raw.githubusercontent.com/juanpablocs/react-vplayer/master/demo/video/720p.mp4",
      type: "video/mp4",
      quality: 720,
    },
    {
      id: 2,
      url: "https://raw.githubusercontent.com/juanpablocs/react-vplayer/master/demo/video/1080p.mp4",
      type: "video/mp4",
      quality: 1080,
    },
    {
      id: 3,
      url: "https://raw.githubusercontent.com/juanpablocs/react-vplayer/master/demo/video/480p.mp4",
      type: "video/mp4",
      quality: 480,
    },
    {
      id: 4,
      url: "https://raw.githubusercontent.com/juanpablocs/react-vplayer/master/demo/video/360p.mp4",
      type: "video/mp4",
      quality: 360,
    },
  ];

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
        {videos.map(({ id, url }) => (
          <div
            key={id}
            className={`video-slide ${currentVideo === id - 1 ? "active" : ""}`}
          >
            <video
              src={url}
              width="640"
              height="360"
              muted
              controls
              className="rounded-md w-full"
              ref={(el) => (videoRefs.current[id - 1] = el)}
              onEnded={handleVideoEnd}
            />
          </div>
        ))}
      </div>
      <div className="video-navigation">
        {videos.map(({ id, url }) => (
          <button
            key={id}
            className={`nav-button ${currentVideo === id - 1 ? "active" : ""}`}
            onClick={() => setCurrentVideo(id - 1)}
          >
            <video
              src={url}
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
