
import React from 'react';
import { cn } from "@/lib/utils";

interface AudioVisualizerProps {
  activeBars: number[];
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ activeBars }) => {
  return (
    <div className="visualizer-container mb-4">
      {activeBars.map((height, index) => (
        <div
          key={index}
          className="visualizer-bar"
          style={{ 
            height: `${Math.max(5, height)}%`, 
            backgroundColor: index % 2 === 0 ? '#8a2be2' : '#1db954' 
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;
