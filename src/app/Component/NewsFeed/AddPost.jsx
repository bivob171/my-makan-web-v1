import React, { useState, useEffect } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import TagSelect from "./TagSelect";
import Image from "next/image";
import { CgClose } from "react-icons/cg";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Sell");
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState("");
  const [agent, setAgent] = useState("Buyer");

  const myApiKeys = "AIzaSyDMnw0V0OP91tvU6QpGlBouSV1WoSKrty8";

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

  return (
    <div className="bg-white rounded-lg">
      <center>
        <h1 className="text-[26px] font-semibold text-[#555] leading-3 tracking-normal p-4 bg-[#fff] border-b-[1px] rounded-t-lg">
          Create a Post
        </h1>
      </center>
      <form onSubmit={handleSubmit} className="space-y-2 pt-1 p-8">
        <div>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full outline-[#999] outline-1 border-none bg-none px-3 h-[45px] text-[14px] placeholder:text-[14px] text-[#555] font-medium rounded-lg"
            placeholder="Post title"
          />
        </div>
        <div>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            className="w-full outline-[#999] outline-1 border-none bg-none px-3 py-3 text-[22px] placeholder:text-[22px] text-[#444] font-normal rounded-lg !resize-none"
            placeholder="Write your thoughts!"
            rows="4"
          />
        </div>
        {/* select image show here  */}
        {image ? (
          <div className="relative">
            <Image
              width={1000}
              height={120}
              className="w-auto h-[120px] rounded-lg mb-2"
              src={image}
              alt="Selected"
            />
            <CgClose
              className="bg-red-500 text-white p-[2px] rounded-full absolute top-0 left-0 cursor-pointer"
              onClick={handleImageDelete}
            />
          </div>
        ) : (
          ""
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
          id="image-input"
        />

        <div className="grid grid-cols-5 gap-3">
          <div className="col-span-2">
            <GooglePlacesAutocomplete
              placeholder="Location"
              selectProps={{
                styles: {
                  input: (provided) => ({
                    ...provided,
                    color: "gray",
                    borderRadius: "20px",
                  }),
                  option: (provided) => ({
                    ...provided,
                    color: "gray",
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "gray",
                  }),
                },
              }}
              apiKey={myApiKeys}
              onPlaceSelected={(place) => {
                setLocation(place.formatted_address);
              }}
            />
          </div>
          <div className="relative">
            <Select
              onChange={(e) => setCategory(e.target.value)}
              className={clsx(
                "block w-full appearance-none rounded-lg border-none bg-[#ededed] h-[45px] px-3 text-sm/6 text-[#444] cursor-pointer",
                "focus:outline-none data-[focus]:outline-none",
                "*:text-[#444]"
              )}
            >
              <option value="sell">Sell</option>
              <option value="rent">Rent</option>
            </Select>

            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
              aria-hidden="true"
            />
          </div>
          <div className="relative">
            <Select
              onChange={(e) => setAgent(e.target.value)}
              className={clsx(
                "block w-full appearance-none rounded-lg border-none bg-[#edededf6] h-[45px] px-3 text-sm/6 text-[#444] cursor-pointer",
                "focus:outline-none data-[focus]:outline-none",
                "*:text-[#444]"
              )}
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </Select>
            <ChevronDownIcon
              className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black/60"
              aria-hidden="true"
            />
          </div>
          <div className="col flex justify-between items-center gap-0">
            {/* image icon  */}
            <button
              type="button"
              onClick={() => document.getElementById("image-input").click()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-blue-400 hover:drop-shadow-lg hover:shadow-blue-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </button>
            {/* GIF icon  */}
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-green-400 hover:drop-shadow-lg hover:shadow-blue-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12.75 8.25v7.5m6-7.5h-3V12m0 0v3.75m0-3.75H18M9.75 9.348c-1.03-1.464-2.698-1.464-3.728 0-1.03 1.465-1.03 3.84 0 5.304 1.03 1.464 2.699 1.464 3.728 0V12h-1.5M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                />
              </svg>
            </button>
            {/* Emoji icon  */}
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-yellow-400 hover:drop-shadow-lg hover:shadow-blue-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                />
              </svg>
            </button>
            <button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-5 items-center gap-3 mt-4">
          <div className="w-full col-span-4">
            <TagSelect tags={tags} setTags={setTags} />
          </div>
          <button
            type="submit"
            className="h-[45px] px-10 text-[#fefefe] bg-[#615DFA] hover:bg-[#625dfadc] rounded-lg font-semibold text-[16px]"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
