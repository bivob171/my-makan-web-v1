"use client";

import React, { useRef, useState } from "react";
import { AudioRecorder as ReactAudioRecorder } from "react-audio-voice-recorder";

export default function AudioRecorderComponent() {
  const audioContainerRef = useRef(null);
  const [isRecording, setIsRecording] = useState(false);

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;

    if (audioContainerRef.current) {
      audioContainerRef.current.appendChild(audio);
    }
    setIsRecording(false); // Stop recording when the recording is complete
  };

  // We handle recording start manually
  const handleStartRecording = () => {
    setIsRecording(true); // Set recording state to true
  };

  return (
    <div className="flex flex-col items-center justify-center m-[100px]">
      <div className="p-4 bg-gray-100 rounded-lg shadow-lg">
        <ReactAudioRecorder
          onRecordingComplete={addAudioElement}
          audioTrackConstraints={{
            noiseSuppression: true,
            echoCancellation: true,
          }}
          downloadOnSavePress={true}
          downloadFileExtension="webm"
          onStart={handleStartRecording} // Triggered when recording starts
        />
      </div>

      {/* Show recording state */}
      <div className="mt-4">
        {isRecording ? (
          <p className="text-red-500 font-bold">Recording in progress...</p>
        ) : (
          <p className="text-green-500 font-bold">Not recording</p>
        )}
      </div>

      {/* Container for recorded audio */}
      <div
        ref={audioContainerRef}
        className="mt-4 w-full max-w-lg bg-white p-4 rounded-lg shadow-md"
      ></div>
    </div>
  );
}
