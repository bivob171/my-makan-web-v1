import React, { useState } from "react";
import PhotoAlbum from "react-photo-album";

const GallerySection = ({ data }) => {
  const breakpoints = [1080, 640, 384, 256, 128, 96, 64, 48];

  function getImageDimensions(url) {
    // Mocked dimensions, replace with actual dimensions retrieval logic
    return { width: 1080, height: 720 };
  }
  const photos = data?.map(({ url }) => {
    const { width, height } = getImageDimensions(url);
    return {
      src: url,
      width,
      height,
      srcSet: breakpoints.map((breakpoint) => ({
        src: url,
        width: breakpoint,
        height: Math.round((height / width) * breakpoint),
      })),
    };
  });
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseFullScreen = () => {
    setSelectedPhoto(null);
  };

  const renderPhoto = ({ photo, onClick }) => (
    <img
      src={photo?.src}
      alt={photo?.alt || "Image"}
      style={{ cursor: "pointer" }}
      onClick={() => onClick(photo)}
      className="border-b-[10px] border-[#fefefe] rounded-lg"
    />
  );

  return (
    <div className="gallery-section">
      <PhotoAlbum
        layout="columns"
        photos={photos}
        renderPhoto={(props) =>
          renderPhoto({ ...props, onClick: handlePhotoClick })
        }
      />
      {selectedPhoto && (
        <div className="full-screen-overlay" onClick={handleCloseFullScreen}>
          <img
            src={selectedPhoto?.src}
            alt="Full-screen"
            className="full-screen-image border-8 border-[#fefefe]"
          />
        </div>
      )}

      <style jsx>{`
        .full-screen-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          z-index: 1000;
        }

        .full-screen-image {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
        }
      `}</style>
    </div>
  );
};

export default GallerySection;
