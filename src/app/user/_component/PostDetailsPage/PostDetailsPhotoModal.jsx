import {
  Dialog,
  DialogPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import Image from "next/image";
import { useState } from "react";
import { MdOutlineReviews } from "react-icons/md";

const categories = [
  {
    name: "Photos",
    photos: [
      "/media/blog/blog_5.jpg",
      "/media/blog/blog_6.jpg",
      "/media/blog/blog_1.jpg",
      "/media/blog/blog_10.jpg",
      "/media/blog/blog_2.jpg",
      "/media/blog/blog_3.jpg",
      "/media/blog/blog_4.jpg",
      "/media/blog/blog_9.jpg",
    ],
  },
  {
    name: "Videos",
    video: ["https://media.w3.org/2010/05/sintel/trailer_hd.mp4"],
  },
];

export default function PostDetailsPhotoModal({
  closePhotoModal,
  isPhotoModalOpen,
}) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseFullscreen = () => {
    setSelectedImage(null);
    setSelectedVideo(null);
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  return (
    <>
      <Dialog
        open={isPhotoModalOpen}
        as="div"
        className="relative z-50 focus:outline-none "
        onClose={() => {
          closePhotoModal();
          handleCloseFullscreen();
        }}
      >
        <div
          className="fixed inset-0 bg-white/5 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-3xl rounded-xl bg-black/50 p-2 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 "
            >
              <div className="flex justify-center p-2">
                <div className="w-full max-w-3xl">
                  <TabGroup>
                    <TabList className="flex gap-4">
                      {categories.map(({ name }) => (
                        <Tab
                          key={name}
                          className="rounded-full py-1 px-3 text-sm/6 font-semibold text-white focus:outline-none data-[selected]:bg-black/10 data-[hover]:bg-white/5 data-[selected]:data-[hover]:bg-white/10 data-[focus]:outline-1 data-[focus]:outline-white"
                        >
                          {name}
                        </Tab>
                      ))}
                    </TabList>
                    <TabPanels className="mt-3">
                      {categories.map(({ name, photos, video }) => (
                        <TabPanel
                          key={name}
                          className="rounded-xl bg-white/5 p-3"
                        >
                          {photos && (
                            <div className="grid grid-cols-2 gap-3 h-[60vh] overflow-y-auto">
                              {photos.map((photo, index) => (
                                <Image
                                  width={1000}
                                  height={1000}
                                  key={index}
                                  src={photo}
                                  alt={`Photo ${index + 1}`}
                                  className="w-full h-[160px] object-cover rounded-md cursor-pointer"
                                  onClick={() => handleImageClick(photo)}
                                />
                              ))}
                            </div>
                          )}
                          {video && (
                            <div className="aspect-w-16 aspect-h-9">
                              <video
                                controls
                                src={video[0]}
                                className="w-full h-auto rounded-md cursor-pointer"
                                onClick={() => handleVideoClick(video[0])}
                                muted
                              />
                            </div>
                          )}
                        </TabPanel>
                      ))}
                    </TabPanels>
                  </TabGroup>
                  <div className="flex justify-start items-center gap-2 !text-[white] mt-3">
                    <Image
                      src="/media/figure/author_3.jpg"
                      alt=""
                      width={500}
                      height={500}
                      className="w-[50px] h-[50px] rounded-full"
                    />
                    <div>
                      <p className="m-0 text-[white] text-[14px] font-bold leading-4">
                        Listing by Md Bayzid
                      </p>
                      <div className="flex justify-start items-center gap-2 !text-[12px]">
                        <MdOutlineReviews className="text-yellow-500" />
                        <span className="text-yellow-500">0</span>
                        <span>reviews</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      {selectedImage && (
        <Dialog
          open={Boolean(selectedImage)}
          as="div"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur"
          onClose={handleCloseFullscreen}
        >
          <Image
            width={1000}
            height={1000}
            src={selectedImage}
            alt="Selected"
            className="max-w-full max-h-full"
            onClick={handleCloseFullscreen}
          />
        </Dialog>
      )}

      {selectedVideo && (
        <Dialog
          open={Boolean(selectedVideo)}
          as="div"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur"
          onClose={handleCloseFullscreen}
        >
          <video
            controls
            src={selectedVideo}
            onClick={handleCloseFullscreen}
            className="max-w-full max-h-full"
            muted
          />
        </Dialog>
      )}
    </>
  );
}
