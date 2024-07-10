import React, { useState, useRef, useEffect } from "react";
import { Tooltip } from "@mui/material";
import Image from "next/image";
import { CgClose } from "react-icons/cg";

const VideoPdfImage = () => {
  const elementRef = useRef(null);
  const videoRefs = useRef([]);
  const [files, setFiles] = useState([]);

  const handleVideoChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => file.size < 30 * 1024 * 1024);
    if (validFiles.length < files.length) {
      alert("Some video files are too large. Please upload files under 30 MB.");
    }
    setFiles((prevFiles) => [
      ...prevFiles,
      ...validFiles.map((file) => ({
        type: "video",
        url: URL.createObjectURL(file),
      })),
    ]);
  };

  const handlePdfChange = (event) => {
    const files = Array.from(event.target.files);
    setFiles((prevFiles) => [
      ...prevFiles,
      ...files.map((file) => ({ type: "pdf", url: URL.createObjectURL(file) })),
    ]);
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setFiles((prevFiles) => [
      ...prevFiles,
      ...files.map((file) => ({
        type: "image",
        url: URL.createObjectURL(file),
      })),
    ]);
  };

  const handleVideoClick = (index) => {
    if (videoRefs.current[index]) {
      if (videoRefs.current[index].paused) {
        videoRefs.current[index].play();
      } else {
        videoRefs.current[index].pause();
      }
    }
  };

  const handleFileDelete = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const sortedFiles = [
    ...files.filter((file) => file.type === "image"),
    ...files.filter((file) => file.type === "video"),
    ...files.filter((file) => file.type === "pdf"),
  ];

  return (
    <div className="w-full h-[800px] bg-white">
      <div className="flex justify-between items-center gap-2">
        <Tooltip title="Image" arrow placement="top-start">
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
        </Tooltip>
        <Tooltip title="Upload Video Under 30 MB" arrow placement="top-end">
          <button
            type="button"
            onClick={() => document.getElementById("video-input").click()}
          >
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
                d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
          </button>
        </Tooltip>
        <Tooltip title="Upload pdf File" arrow placement="top-end">
          <button
            type="button"
            onClick={() => document.getElementById("document-input").click()}
          >
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
                d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13"
              />
            </svg>
          </button>
        </Tooltip>
        <input
          id="image-input"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
        <input
          id="video-input"
          type="file"
          accept="video/*"
          multiple
          onChange={handleVideoChange}
          style={{ display: "none" }}
        />
        <input
          id="document-input"
          type="file"
          accept="application/pdf"
          multiple
          onChange={handlePdfChange}
          style={{ display: "none" }}
        />
      </div>

      <div
        className="mt-10 p-10 flex justify-start items-center gap-2 overflow-x-auto scrollbar scrollbar-thumb-blue-500 scrollbar-track-blue-200"
        ref={elementRef}
      >
        {sortedFiles.map((file, index) => (
          <div key={index} className="relative flex-shrink-0">
            {file.type === "image" && (
              <div className="relative flex-shrink-0">
                <Image
                  width={1000}
                  height={120}
                  className="w-auto h-[80px] rounded-"
                  src={file.url}
                  alt={`Uploaded ${index}`}
                />
                <CgClose
                  className="bg-red-500 text-white p-[2px] rounded-full absolute -top-1 -left-1 cursor-pointer"
                  onClick={() => handleFileDelete(index)}
                />
              </div>
            )}
            {file.type === "video" && (
              <div className="relative flex-shrink-0">
                <video
                  width="200"
                  className="rounded-md cursor-pointer w-auto h-[80px]"
                  ref={(el) => (videoRefs.current[index] = el)}
                  onClick={() => handleVideoClick(index)}
                >
                  <source src={file.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <CgClose
                  className="bg-red-500 text-white p-[2px] rounded-full absolute -top-1 -left-1 cursor-pointer"
                  onClick={() => handleFileDelete(index)}
                />
              </div>
            )}
            {file.type === "pdf" && (
              <div className="relative flex-shrink-0">
                <iframe
                  width={100}
                  height={80}
                  src={file.url}
                  title={`PDF Viewer ${index}`}
                  className="scroll-mr-0 rounded-md w-[110px] h-[80px]"
                ></iframe>
                <CgClose
                  className="bg-red-500 text-white p-[2px] rounded-full absolute -top-1 -left-1 cursor-pointer"
                  onClick={() => handleFileDelete(index)}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoPdfImage;
