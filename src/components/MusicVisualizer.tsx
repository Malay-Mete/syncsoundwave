
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";

interface MusicVisualizerProps {
  className?: string;
  isPlaying: boolean;
}

const MusicVisualizer: React.FC<MusicVisualizerProps> = ({ className, isPlaying }) => {
  return (
    <div className={cn("relative w-full h-40 music-gradient-bg rounded-lg overflow-hidden", className)}>
      <div className="absolute inset-0 bg-black/30"></div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex space-x-1">
          {Array.from({ length: 4 }).map((_, index) => (
            <div 
              key={index} 
              className={cn(
                "w-1.5 bg-white rounded-t-md h-6",
                isPlaying && `animate-equalizer-bar-${index + 1}`,
                !isPlaying && "h-2"
              )}
              style={{
                transformOrigin: 'bottom',
                transitionDelay: `${index * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-4 left-4 text-white/90 text-sm font-medium">
        {isPlaying ? "Music is playing..." : "Ready to play"}
      </div>
    </div>
  );
};

export default MusicVisualizer;
