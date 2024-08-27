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

export default function PostDetailsPhotoModal({
  closePhotoModal,
  isPhotoModalOpen,
  allImages,
  allVideos,
}) {
  const categories = [
    {
      name: "Photos",
      photos: allImages,
    },
    {
      name: "Videos",
      video: allVideos,
    },
  ];
  console.log(allVideos);

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
              <div className="flex justify-center p-4">
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
                    <TabPanels className="mt-3 h-[70vh] overflow-y-auto">
                      {categories.map(({ name, photos, video }) => (
                        <TabPanel
                          key={name}
                          className="rounded-xl bg-white/5 p-3"
                        >
                          {photos && (
                            <div className="grid grid-cols-2 gap-3">
                              {photos.map((photo, index) => (
                                <Image
                                  width={1000}
                                  height={1000}
                                  key={index}
                                  src={photo?.url}
                                  alt={`Photo ${index + 1}`}
                                  className="w-full h-[200px] object-cover rounded-md cursor-pointer"
                                  onClick={() => handleImageClick(photo?.url)}
                                />
                              ))}
                            </div>
                          )}
                          {video?.length > 0 ? (
                            <div className="aspect-w-16 aspect-h-9">
                              {video.map((video, index) => (
                                <video
                                  key={index}
                                  controls
                                  src={video?.url}
                                  className="w-full h-auto rounded-md cursor-pointer mb-[15px]"
                                  onClick={() => handleVideoClick(video?.url)}
                                  muted
                                />
                              ))}
                            </div>
                          ) : (
                            <p className="text-[20px] text-white">No video</p>
                          )}
                        </TabPanel>
                      ))}
                    </TabPanels>
                  </TabGroup>
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
