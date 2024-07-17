import React, { useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const File = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const files = [
    {
      id: 1,
      url: "/pdf/bs-interview-step.pdf",
    },
    {
      id: 2,
      url: "/pdf/bs-interview-step.pdf",
    },
    {
      id: 3,
      url: "/pdf/bs-interview-step.pdf",
    },
    {
      id: 4,
      url: "/pdf/bs-interview-step.pdf",
    },
  ];

  const handleViewClick = (file) => {
    setSelectedPdf(file.url);
  };

  const handleDownloadClick = (file) => {
    const link = document.createElement("a");
    link.href = file.url;
    link.download = file.url.substring(file.url.lastIndexOf("/") + 1);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {files.map((file) => (
          <div
            key={file.id}
            onMouseEnter={() => setHoveredId(file.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="p-4 border rounded-md"
          >
            <p>File {file.id}</p>
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
              workerUrl={`https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js`}
            >
              <Viewer fileUrl={selectedPdf} />
            </Worker>
          </div>
        </div>
      )}
    </div>
  );
};

export default File;

{
  /* 
<div
            key={id}
            className="bg-[#EDF2F9] rounded-lg p-4 relative"
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            <PDFViewer style={{ width: "100%", height: "100%" }}>
              <Document file={url}>
                <div
                  className={`flex justify-center items-center gap-1 absolute inset-0 transition-opacity ${
                    hoveredId === id ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Page pageNumber={1} style={styles.page} />
                  <button className="bg-[#615DFA] hover:bg-[#625dfae3] text-white rounded px-2 py-[4px] text-[12px] leading-none">
                    View
                  </button>
                  <button className="bg-[#615DFA] hover:bg-[#625dfae3] text-white rounded px-2 py-[4px] text-[12px] leading-none">
                    Download
                  </button>
                </div>
              </Document>
            </PDFViewer>
          </div>

          */
}
