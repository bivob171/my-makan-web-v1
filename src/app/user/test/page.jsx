"use client";

import React, { useState, useEffect, useRef } from "react";
import { LiveAudioVisualizer } from "react-audio-visualize";

export default function AudioRecorder() {
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [stream, setStream] = useState(null);
  const [audioURL, setAudioURL] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    const setupMediaRecorder = async () => {
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        setStream(audioStream);

        const recorder = new MediaRecorder(audioStream);
        setMediaRecorder(recorder);

        recorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            const audioURL = URL.createObjectURL(event.data);
            setAudioURL(audioURL);
          }
        };

        recorder.onstart = () => setIsRecording(true);
        recorder.onstop = () => setIsRecording(false);
      } catch (error) {
        console.error("Error accessing the microphone", error);
      }
    };

    setupMediaRecorder();

    return () => {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [mediaRecorder, stream]);

  const startRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.start();
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
    }
  };

  return (
    <div className="m-[200px]">
      <button onClick={startRecording} disabled={isRecording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop Recording
      </button>

      {mediaRecorder && (
        <div style={{ marginTop: "20px" }}>
          <LiveAudioVisualizer
            mediaRecorder={mediaRecorder}
            width={200}
            height={75}
          />
        </div>
      )}

      {audioURL && (
        <div style={{ marginTop: "20px" }}>
          <h3>Playback</h3>
          <audio ref={audioRef} src={audioURL} controls />
        </div>
      )}
    </div>
  );
}
