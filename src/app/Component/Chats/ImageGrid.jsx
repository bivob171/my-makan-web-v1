import React, { useRef } from "react";
import Image from "next/image";
import LightGallery from "lightgallery/react";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgFullscreen from "lightgallery/plugins/fullscreen";
import lgVideo from "lightgallery/plugins/video";
import clsx from "clsx";

const ImageGrid = ({ images: mediaList = [] }) => {
  const lightbox = useRef(null);
  const imageCount = mediaList?.length || 0;

  if (!imageCount) return null;

  const dynamicElements = mediaList.map((media) => {
    if (media?.type === "video") {
      console.log(media?.url);
      return {
        src: media?.url,
        thumb: media?.url,
        html: `
          <video class="lg-video-object lg-html5" controls>
            <source src="${media?.url}" type="video/mp4">
            Your browser does not support HTML5 video.
          </video>
        `,
      };
    } else {
      return {
        src: media?.url,
        thumb: media?.url,
        alt: `image-${media?._id}`,
      };
    }
  });

  return (
    <LightGallery
      onInit={(ref) => {
        if (ref) {
          lightbox.current = ref.instance;
        }
      }}
      dynamic
      dynamicEl={dynamicElements}
      mode="lg-fade"
      speed={500}
      plugins={[lgThumbnail, lgFullscreen, lgVideo]}
    >
      {imageCount <= 4 ? (
        <div
          className={clsx(
            `grid gap-1 grid-cols-${imageCount === 4 ? 2 : imageCount}`
          )}
        >
          {mediaList?.map((media, index) => {
            const isVideo = media?.type === "video";

            return (
              <a
                key={index}
                className={clsx("gallery-item", isVideo ? "lg-video" : "")}
                data-src={isVideo ? "" : media?.url}
                data-html={
                  isVideo
                    ? `
                      <video class="lg-video-object lg-html5" controls>
                        <source src="${media?.url}" type="video/mp4">
                        Your browser does not support HTML5 video.
                      </video>`
                    : ""
                }
                onClick={() => {
                  if (!isVideo) {
                    lightbox.current?.openGallery(index);
                  }
                }}
              >
                {isVideo ? (
                  <video
                    src={media?.url}
                    poster={media?.url}
                    className={clsx(
                      "w-full rounded-md",
                      imageCount === 1
                        ? "object-cover aspect-auto"
                        : "aspect-square object-cover"
                    )}
                    controls
                  ></video>
                ) : (
                  <Image
                    src={media?.url}
                    width={500}
                    height={500}
                    alt={`media${index + 1}`}
                    className={clsx(
                      "w-full rounded-sm",
                      imageCount === 1
                        ? "object-cover aspect-auto"
                        : "aspect-square object-cover"
                    )}
                  />
                )}
              </a>
            );
          })}
        </div>
      ) : (
        <div>
          <div className="grid gap-1 mb-1 grid-cols-2">
            {mediaList?.slice(0, 2).map((media, index) => (
              <a
                key={index}
                className="gallery-item"
                data-src={media?.url}
                data-html={
                  media?.type === "video"
                    ? `
                    <video class="lg-video-object lg-html5" controls>
                      <source src="${media?.url}" type="video/mp4">
                      Your browser does not support HTML5 video.
                    </video>`
                    : ""
                }
                onClick={() => {
                  lightbox.current?.openGallery(index);
                }}
              >
                <Image
                  src={media?.url}
                  width={500}
                  height={500}
                  alt={`media${index + 1}`}
                  className={clsx(
                    "w-full rounded-sm",
                    imageCount === 1
                      ? "object-cover aspect-auto"
                      : "aspect-square object-cover"
                  )}
                />
              </a>
            ))}
          </div>
          <div className="grid gap-1 grid-cols-3">
            {mediaList?.slice(2).map((media, index) => (
              <a
                key={index}
                className="gallery-item"
                data-src={media?.url}
                data-html={
                  media?.type === "video"
                    ? `
                    <video class="lg-video-object lg-html5" controls>
                      <source src="${media?.url}" type="video/mp4">
                      Your browser does not support HTML5 video.
                    </video>`
                    : ""
                }
                onClick={() => {
                  lightbox.current?.openGallery(index + 2);
                }}
              >
                <Image
                  src={media?.url}
                  width={500}
                  height={500}
                  alt={`media${index + 1}`}
                  className="w-full aspect-square object-cover rounded-sm"
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </LightGallery>
  );
};

export default ImageGrid;
