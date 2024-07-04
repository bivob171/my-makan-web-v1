import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import AddPost from "./AddPost";
import { IoMdCloseCircle } from "react-icons/io";
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import MapPage from "./MapPage";

const PostSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Sell");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState(null);
  const [agent, setAgent] = useState("Buyer");
  const [selectedType, setSelectedType] = useState("Post Type");
  const [currentPanel, setCurrentPanel] = useState(1);

  useEffect(() => {
    const storedImage = localStorage.getItem("selectedImage");
    if (storedImage) {
      setImage(storedImage);
    }
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      localStorage.setItem("selectedImage", imageUrl);
    }
  };

  const handleImageDelete = () => {
    setImage(null);
    localStorage.removeItem("selectedImage");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ title, description, category, image, tags, location, agent });
  };

  const nextPanel = () => {
    setCurrentPanel(currentPanel + 1);
  };

  const previousPanel = () => {
    setCurrentPanel(currentPanel - 1);
  };

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
    setCurrentPanel(1);
  }

  return (
    <div className="newsfeed-search">
      <ul className="member-list gap-2">
        <li className="active-member">
          <Image
            width={40}
            height={40}
            alt="img"
            src="https://spruko.com/demo/tailwind/ynex/dist/assets/images/faces/11.jpg"
            className="w-[45px] h-[45px] rounded-full border-2"
          />
        </li>
        <li>
          <button className="cursor-pointer" onClick={open}>
            <div className="w-[500px] bg-[#EEF3FA] border-[1px] h-[45px] rounded-full flex justify-start items-center px-3">
              <span className="text-[16px] font-mono font-medium">
                What&apos;s on your mind, Baizid?
              </span>
            </div>
          </button>
        </li>
      </ul>
      <ul className="search-list">
        <li className="search-filter">
          <button className="drop-btn" type="button">
            <i className="icofont-abacus-alt" />
          </button>
          <div className="drop-menu">
            <select className="select2">
              <option>--Everything--</option>
              <option>Status</option>
              <option>Quotes</option>
              <option>Photos</option>
              <option>Videos</option>
              <option>Audios</option>
              <option>slideshows</option>
              <option>files</option>
              <option>Updates</option>
              <option>New Members</option>
              <option>Posts</option>
              <option>New Groups</option>
            </select>
          </div>
        </li>
      </ul>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={close}
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50 backdrop-blur-sm duration-150 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel
              transition
              className="w-full max-w-3xl rounded-xl bg-[#fff] backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
            >
              <DialogTitle
                as="h3"
                className="text-[24px] font-semibold text-[#444] text-center border-b-[1.5px] py-3"
              >
                {currentPanel === 1 ? (<span>Create Post</span>) : (<span>Select Location</span>)}

              </DialogTitle>
              <button
                className="absolute top-2 right-2 text-[#c7c7c7] z-30"
                onClick={close}
              >
                <IoMdCloseCircle className="hover:drop-shadow-md w-8 h-8" />
              </button>
              <div className="flex justify-start gap-[6px] mb-3 px-6 pt-1">
                <Image
                  width={40}
                  height={40}
                  alt="img"
                  src="https://spruko.com/demo/tailwind/ynex/dist/assets/images/faces/11.jpg"
                  className="w-[45px] h-[45px] rounded-full border-2"
                />
                <div>
                  <h4 className="text-[14px] text-[#666] m-0 leading-4">
                    Bizid Hassan
                  </h4>
                  <div className="">
                    <Menu>
                      <MenuButton className="inline-flex justify-center items-center gap-1 rounded-sm bg-[#ededed] py-[2px] leading-4 px-2 text-[12px] font-medium text-[#333] shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#ededed] data-[open]:bg-[#ededed] data-[focus]:outline-1 data-[focus]:outline-white">
                        {selectedType}
                        <ChevronDownIcon className="size-3 fill-[#333]" />
                      </MenuButton>

                      <MenuItems
                        transition
                        anchor="bottom start"
                        className="w-auto origin-top-left rounded-md border bg-[#ededed] text-[#444] mt-[2px] text-[12px] font-medium transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0 relative z-50 "
                      >
                        <MenuItem>
                          <button
                            className="group flex w-full items-center gap-2 rounded-md py-[3px] px-2 leading-4 data-[focus]:bg-white/10"
                            onClick={() => setSelectedType("Normal")}
                          >
                            Normal
                          </button>
                        </MenuItem>
                        <MenuItem>
                          <button
                            className="group flex w-full items-center gap-2 rounded-md py-[3px] px-2 leading-4 data-[focus]:bg-white/10"
                            onClick={() => setSelectedType("Urgent")}
                          >
                            Urgent
                          </button>
                        </MenuItem>
                        <MenuItem>
                          <button
                            className="group flex w-full items-center gap-2 rounded-md py-[3px] px-2 leading-4 data-[focus]:bg-white/10"
                            onClick={() => setSelectedType("Sponsored")}
                          >
                            Sponsored
                          </button>
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-2 px-6 pb-6">
                {currentPanel === 1 && (
                  <div>
                    <AddPost
                      setTitle={setTitle}
                      setDescription={setDescription}
                      handleImageDelete={handleImageDelete}
                      handleImageChange={handleImageChange}
                      image={image}
                      setLocation={setLocation}
                      tags={tags}
                      setTags={setTags}
                      setCategory={setCategory}
                      setAgent={setAgent}
                      nextPanel={nextPanel}
                    />
                  </div>
                )}
                {currentPanel === 2 && (
                  <div>
                    <MapPage />
                  </div>
                )}
                <div className="mt-2">
                  {currentPanel === 1 ? (
                    <Button
                      type="submit"
                      className="w-full text-[18px] font-semibold rounded-md bg-[#5854EF] py-1.5 px-6 text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#5954efef] data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-[#5854EF]"
                    >
                      Post Now
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={previousPanel}
                      className="w-full text-[18px] font-semibold rounded-md bg-[#5854EF] py-1.5 px-6 text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-[#5954efef] data-[focus]:outline-1 data-[focus]:outline-white data-[open]:bg-[#5854EF]"
                    >
                      Previous
                    </Button>
                  )}
                </div>
              </form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default PostSection;
