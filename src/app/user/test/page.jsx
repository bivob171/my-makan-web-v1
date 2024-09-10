"use client";
import { AudioRecorder, useAudioRecorder } from "react-audio-voice-recorder";

export default function Test({ setNewVoice, setVoiceRecord }) {
  const recorderControls = useAudioRecorder();

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setNewVoice(url);
  };

  const handleStartRecording = () => {
    recorderControls.startRecording();
    setVoiceRecord(true); // Set voice recording state to true when recording starts
  };

  return (
    <div>
      <div className="">
        <AudioRecorder
          onRecordingComplete={(blob) => {
            addAudioElement(blob);
            setVoiceRecord(false); // Set voice recording state to false when recording stops
          }}
          recorderControls={{
            ...recorderControls,
            startRecording: handleStartRecording, // Override startRecording to set voice record state
          }}
        />
      </div>
    </div>
  );
}
