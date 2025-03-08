
import React from 'react';
import { cn } from "@/lib/utils";
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import AudioVisualizer from './player/AudioVisualizer';
import PlayerControls from './player/PlayerControls';
import ProgressSlider from './player/ProgressSlider';
import VolumeControl from './player/VolumeControl';

interface MusicPlayerProps {
  className?: string;
  onPlayChange?: (isPlaying: boolean) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ className, onPlayChange }) => {
  const [state, controls] = useAudioPlayer(onPlayChange);
  const { isPlaying, currentTime, duration, volume, activeBars } = state;
  const { togglePlay, seek, setVolume } = controls;
  
  return (
    <div className={cn("p-6 rounded-xl bg-card shadow-lg w-full max-w-2xl mx-auto", className)}>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-1">Synced Music Stream</h2>
        <p className="text-muted-foreground">Listen together in perfect harmony</p>
      </div>
      
      {/* Visualizer */}
      <AudioVisualizer activeBars={activeBars} />
      
      {/* Progress bar */}
      <ProgressSlider currentTime={currentTime} duration={duration} onSeek={seek} />
      
      {/* Controls */}
      <PlayerControls isPlaying={isPlaying} onPlayPause={togglePlay} />
      
      {/* Volume control */}
      <VolumeControl volume={volume} onVolumeChange={setVolume} />
      
      {/* Sync status indicator */}
      <div className="mt-4 flex items-center justify-center">
        <div className="bg-muted py-1 px-3 rounded-full text-xs flex items-center">
          <div className="h-2 w-2 rounded-full bg-music-secondary mr-2 animate-pulse-opacity"></div>
          <span className="text-muted-foreground">Ready for sync</span>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
