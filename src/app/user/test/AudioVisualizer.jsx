// src/components/AudioVisualizer.js
import React, { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";

const AudioVisualizer = ({ audioUrl }) => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);

  useEffect(() => {
    if (audioUrl && waveformRef.current) {
      wavesurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: "#ddd",
        progressColor: "#f00",
        cursorColor: "#f00",
        height: 200,
        barWidth: 2,
      });

      wavesurferRef.current.load(audioUrl);

      return () => wavesurferRef.current.destroy();
    }
  }, [audioUrl]);

  return <div ref={waveformRef} />;
};

export default AudioVisualizer;
