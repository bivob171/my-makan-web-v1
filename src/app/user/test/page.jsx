"use client";
import React, { useState } from "react";
import { ReactMic } from "react-mic";

export default function Test() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [voiceFile, setVoiceFile] = useState(null);
  console.log(recordedBlob);

  // Start/Stop recording
  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  // Handle the recorded audio blob
  const onStop = (blob) => {
    setRecordedBlob(blob);
    uploadVoice(blob.blob); // Upload the recorded audio
  };

  // Handle manual voice file upload
  const handleVoiceFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setVoiceFile(file);
      uploadVoice(file); // Upload the selected file
    }
  };

  // Simulate the voice file upload process
  const uploadVoice = async (file) => {
    try {
      console.log("Uploading voice file:", file);

      // Here you can add the actual upload logic (e.g., to Firebase or your server)
      // For example:
      // const storageRef = firebase.storage().ref();
      // const fileRef = storageRef.child(`audio/${file.name}`);
      // await fileRef.put(file);
      // const fileUrl = await fileRef.getDownloadURL();
      // console.log("File uploaded! URL:", fileUrl);

      console.log("Voice file uploaded successfully!");
    } catch (error) {
      console.error("Error uploading voice file:", error);
    }
  };

  return (
    <div className="m-[300px]">
      {/* Voice Recording Section */}
      <h3>Record Voice Message</h3>
      <div>
        <ReactMic
          record={isRecording}
          onStop={onStop}
          strokeColor="#000000"
          backgroundColor="#FF4081"
        />
        <button onClick={toggleRecording}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>

      {/* File Upload Section */}
      <h3>Or Upload Pre-recorded Voice File</h3>
      <input type="file" accept="audio/*" onChange={handleVoiceFileUpload} />

      {/* Preview recorded audio */}
      {recordedBlob && (
        <div>
          <h4>Preview Recorded Voice</h4>
          <audio controls src={URL.createObjectURL(recordedBlob.blob)} />
        </div>
      )}

      {/* Preview uploaded voice file */}
      {voiceFile && (
        <div>
          <h4>Preview Uploaded Voice File</h4>
          <audio controls src={URL.createObjectURL(voiceFile)} />
        </div>
      )}
    </div>
  );
}
