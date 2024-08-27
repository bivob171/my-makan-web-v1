import React, { useState } from "react";
import PhotoAlbum from "react-photo-album";
import photos from "./photos";
import Image from "next/image";

const GallerySection = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handlePhotoClick = (photo) => {
    setSelectedPhoto(photo);
  };

  const handleCloseFullScreen = () => {
    setSelectedPhoto(null);
  };

  const renderPhoto = ({ photo, onClick }) => {
    return (
      <img
        src={photo.src}
        alt={photo.alt}
        style={{ cursor: "pointer" }}
        onClick={() => onClick(photo)}
        className="border-b-[10px] border-[#fefefe] rounded-lg"
      />
    );
  };

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
          <Image
            width={50}
            height={50}
            src={selectedPhoto.src}
            alt=""
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
