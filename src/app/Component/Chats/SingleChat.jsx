import { cx } from "class-variance-authority";
import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";
import { LuCheck, LuCheckCheck } from "react-icons/lu";
import LightGallery from 'lightgallery/react';

import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';

import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';

export const SingleChat = ({
  showDateHeader,
  msg,
  isSent,
  formattedDate,
  formattedTime,
  participantImage,
  user,
  status,
  uploadingProssing,
}) => {
  const msg_status = msg?.seen ? 'seen' : msg.status;
  return (
    <div>
      {showDateHeader && (
        <div className="text-center text-gray-500 text-[15px] font-medium my-[14px] border-b border-b-gray-200">
          {formattedDate}
        </div>
      )}
      <div
        className={`col-start-${isSent ? "6" : "1"} col-end-${isSent ? "13" : "8"
          } p-3 rounded-lg`}
      >
        <div
          className={`flex items-end ${isSent ? "justify-start flex-row-reverse" : "flex-row"
            }`}
        >
          {isSent ? (
            <>
              {/* <Image
               alt=""
               src={user?.image}
               width={500}
               height={500}
               className="w-[30px] h-[30px] rounded-full"
             /> */}
            </>
          ) : (
            <Image
              alt=""
              src={participantImage}
              width={500}
              height={500}
              className="w-[30px] h-[30px] rounded-full"
            />
          )}
          {/* MESSAGE CAPSULE */}
          <div className={cx("flex items-end gap-1 relative", isSent ? 'mr-0' : 'ml-2.5')}>
            <div className={cx('relative text-sm  p-2 pb-1 rounded-md min-w-[130px] max-w-[300px] shadow-sm shadow-gray-50/50', {
              'bg-white rounded-bl-none': !isSent,
              'bg-gradient-to-br from-blue-400 to-blue-400': isSent
            })}
            >
              {/* Display content or image */}
              <ImageGrid images={msg?.media} />
              {/* {msg?.media?.length > 0 ? (
                <div className="flex gap-x-1">
                  {msg.media.map((m, i) => {
                    const progressItem = uploadingProssing.find(
                      (item) => item._id === m._id
                    );

                    return (
                      <div key={i}>
                        <Image
                          alt="Message image"
                          src={m?.url}
                          width={300}
                          height={300}
                          className={cx(`object-cover rounded-md`, `opacity-[${(progressItem?.progress || 100) / 100}]`)}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : null} */}
              {msg.content ? (
                <div className={cx("mt-1 text-base font-medium", isSent ? 'text-white' : 'text-gray-900')}>{msg?.content}</div>
              ) : null}
              <div className="flex justify-end gap-x-[3px] items-center">
                <p className={cx("text-[10px] font-semibold tracking-wider mb-0", isSent ? 'text-gray-100' : 'text-gray-500')}>{formattedTime}</p>
              </div>
            </div>
            {
              isSent ? (
                msg_status === 'seen' ? (
                  <Image
                    alt=""
                    src={participantImage}
                    width={30}
                    height={30}
                    className="size-[16px] rounded-full mb-1"
                  />
                ) : (
                  <div className={cx("size-4 rounded-full border-2 border-blue-400 inline-flex justify-center items-center", {
                    'text-blue-500': msg_status === 'sent'
                  })}>
                    {msg_status === 'sending' ? null : <LuCheck className="size-[10px] font-black" strokeWidth={3} />}
                  </div>
                )
              ) : null
            }
            <div className={cx("w-0 h-0 border-t-[10px] border-r-[10px] border-r-white shadow-sm border-t-transparent border-b-transparent absolute bottom-0 left-0 -translate-x-full", isSent ? 'hidden' : '')} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ImageGrid = ({ images = [] }) => {
  const lightbox = useRef(null);
  const imageCount = images?.length || 0;
  if (!imageCount) return null;
  return (
    <LightGallery onInit={(ref) => {
      if (ref) {
        lightbox.current = ref.instance;
      }
    }}
      dynamic
      dynamicEl={images.map((image) => ({
        src: image?.url,
        thumb: image?.url,
        width: "1406-1390",
        alt: 'images',
      }))}
      mode="lg-fade" speed={500} plugins={[lgThumbnail]}>
      {imageCount <= 4 ? (
        <div className={cx(`grid gap-1 grid-cols-${imageCount === 4 ? 2 : imageCount}`)}>
          {images.map((image, index) => (
            <a
              key={index}
              data-lg-size="1406-1390"
              className="gallery-item"
              data-src={image?.url}
              onClick={() => {
                lightbox.current?.openGallery(index)
              }}
            >
              <Image
                src={image?.url}
                width={500}
                height={500}
                alt={`image${index + 1}`}
                className={cx("w-full rounded-sm", imageCount === 1 ? 'object-cover aspect-auto' : 'aspect-square object-cover')}
              />
            </a>
          ))}
        </div>
      ) : (
        <div>
          <div className={cx(`grid gap-1 mb-1 grid-cols-2`)}>
            {images.slice(0, 2).map((image, index) => (
              <a key={index}
                data-lg-size="1406-1390"
                className="gallery-item"
                data-src={image?.url}
                onClick={() => {
                  lightbox.current?.openGallery(index)
                }}>
                <Image
                  src={image?.url}
                  width={500}
                  height={500}
                  alt={`image${index + 1}`}
                  className={cx("w-full rounded-sm", imageCount === 1 ? 'object-cover aspect-auto' : 'aspect-square object-cover')}
                />
              </a>
            ))}
          </div>
          <div className={cx(`grid gap-1 grid-cols-3`)}>
            {images.slice(2).map((image, index) => (
              <a key={index}
                data-lg-size="1406-1390"
                className="gallery-item"
                data-src={image?.url}
                onClick={() => {
                  lightbox.current?.openGallery(index+2)
                }} >
                <Image
                  src={image?.url}
                  width={500}
                  height={500}
                  alt={`image${index + 1}`}
                  className="w-full aspect-square object-cover rounded-sm"
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </LightGallery>
  );
}