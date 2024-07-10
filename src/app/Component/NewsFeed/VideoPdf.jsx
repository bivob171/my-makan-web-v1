import React, { useState, useRef, useEffect } from "react";
import { Tooltip } from "@mui/material";
import Image from "next/image";
import { CgClose } from "react-icons/cg";
import axios from "axios";

const VideoPdf = ({
  files,
  setFiles,
  media,
  setmedia,
  setImageUploading,
  setVideoUploading,
  setPdfUploading,
}) => {
  const generateRandomCode = () => {
    const randomNum = Math.floor(Math.random() * 10000);
    const code = String(randomNum).padStart(4, "0");
    return code;
  };

  const handleVideoChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => file.size < 30 * 1024 * 1024);
    if (validFiles.length < files.length) {
      alert("Some video files are too large. Please upload files under 30 MB.");
    }
    const fileDetails = validFiles.map((file) => ({
      _id: generateRandomCode(), // Generate a random code for each file and use it as the ID
      type: "video",
      url: URL.createObjectURL(file),
    }));

    setFiles((prevFiles) => [...prevFiles, ...fileDetails]);
    if (validFiles.length > 0) {
      handleVideoUpload(validFiles, fileDetails);
    }
  };
  const handleVideoUpload = async (files, fileDetails) => {
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    try {
      const response = await axios.post(
        "https://q4m0gph5-4000.asse.devtunnels.ms/file-upload/upload",
        formData,
        {
          onUploadProgress: (data) => {
            setVideoUploading(Math.round((data.loaded / data.total) * 100));
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const links = response.data.map((item, index) => ({
        _id: fileDetails[index]._id, // Access the _id of the current file detail
        type: fileDetails[index].type, // Access the type of the current file detail
        url: item.Location,
      }));
      console.log(links);
      setmedia((prevVideos) => [...prevVideos, ...links]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setVideoUploading(null);
    }
  };

  const handlePdfChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = [];
    const fileDetails = files.map((file) => ({
      _id: generateRandomCode(),
      type: "pdf",
      url: URL.createObjectURL(file),
    }));

    setFiles((prevFiles) => [...prevFiles, ...fileDetails]);
    for (let file of files) {
      validFiles.push(file);
    }

    if (validFiles.length > 0) {
      handleDocumentUpload(validFiles, fileDetails);
    }
  };
  const handleDocumentUpload = async (files, fileDetails) => {
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    try {
      const response = await axios.post(
        "https://q4m0gph5-4000.asse.devtunnels.ms/file-upload/upload",
        formData,
        {
          onUploadProgress: (data) => {
            setPdfUploading(Math.round((data.loaded / data.total) * 100));
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const links = response.data.map((item, index) => ({
        _id: fileDetails[index]._id, // Access the _id of the current file detail
        type: fileDetails[index].type, // Access the type of the current file detail
        url: item.Location,
      }));
      setmedia((prevDocuments) => [...prevDocuments, ...links]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setPdfUploading(null);
    }
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);

    const fileDetails = files.map((file) => ({
      _id: generateRandomCode(), // Generate a random code for each file and use it as the ID
      type: "image",
      url: URL.createObjectURL(file),
    }));

    setFiles((prevFiles) => [...prevFiles, ...fileDetails]);

    handleUpload(files, fileDetails);
  };
  const handleUpload = async (files, fileDetails) => {
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    try {
      const response = await axios.post(
        "https://q4m0gph5-4000.asse.devtunnels.ms/file-upload/upload",
        formData,
        {
          onUploadProgress: (data) => {
            setImageUploading(Math.round((data.loaded / data.total) * 100));
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const links = response.data.map((item, index) => ({
        _id: fileDetails[index]._id, // Access the _id of the current file detail
        type: fileDetails[index].type, // Access the type of the current file detail
        url: item.Location,
      }));
      setmedia((prevImages) => [...prevImages, ...links]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setImageUploading(null);
    }
  };

  return (
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
  );
};

export default VideoPdf;
