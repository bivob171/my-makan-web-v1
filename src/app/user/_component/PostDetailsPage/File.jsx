import React, { useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const File = ({ files }) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [error, setError] = useState(null);

  const handleViewClick = (file) => {
    setError(null);
    setSelectedPdf(file.url);
  };

  const handleDownloadClick = (file) => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.url.substring(file?.url.lastIndexOf("/") + 1);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePdfError = (error) => {
    console.error("Error loading PDF:", error);
    setError(
      "Failed to load PDF. Please check the URL or your network connection."
    );
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {files?.map((file) => (
          <div
            key={file?._id}
            onMouseEnter={() => setHoveredId(file?._id)}
            onMouseLeave={() => setHoveredId(null)}
            className="p-4 border rounded-md"
          >
            <p>File {file?._id}</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleViewClick(file)}
                className="mr-2 p-2 bg-blue-500 text-white rounded"
              >
                View
              </button>
              <button
                onClick={() => handleDownloadClick(file)}
                className="p-2 bg-green-500 text-white rounded"
              >
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="relative w-4/5 h-4/5 bg-white rounded shadow-lg">
            <button
              onClick={() => setSelectedPdf(null)}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded"
            >
              Close
            </button>
            <Worker
              workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
            >
              <Viewer fileUrl={selectedPdf} onError={handlePdfError} />
            </Worker>
            {error && (
              <div className="absolute bottom-4 left-4 p-2 bg-red-500 text-white rounded">
                {error}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default File;
