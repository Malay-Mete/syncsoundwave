
import React from 'react';
import { cn } from "@/lib/utils";
import { useAudioPlayer } from '@/hooks/useAudioPlayer';
import AudioVisualizer from './player/AudioVisualizer';
import PlayerControls from './player/PlayerControls';
import ProgressSlider from './player/ProgressSlider';
import VolumeControl from './player/VolumeControl';
import { YouTubeVideo } from '@/utils/youtubeApi';

interface MusicPlayerProps {
  className?: string;
  onPlayChange?: (isPlaying: boolean) => void;
  onTimeUpdate?: (currentTime: number) => void;
  currentSong?: YouTubeVideo | null;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ 
  className, 
  onPlayChange,
  onTimeUpdate,
  currentSong
}) => {
  const [state, controls] = useAudioPlayer(onPlayChange, onTimeUpdate);
  const { isPlaying, currentTime, duration, volume, activeBars } = state;
  const { togglePlay, seek, setVolume } = controls;
  
  return (
    <div className={cn("p-6 rounded-xl bg-card shadow-lg w-full max-w-2xl mx-auto", className)}>
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-4">
          {currentSong && (
            <img 
              src={currentSong.thumbnailUrl} 
              alt={currentSong.title}
              className="w-16 h-16 object-cover rounded-md"
            />
          )}
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold text-white truncate">
              {currentSong ? currentSong.title : "Synced Music Stream"}
            </h2>
            <p className="text-muted-foreground truncate">
              {currentSong ? currentSong.channelTitle : "Listen together in perfect harmony"}
            </p>
          </div>
        </div>
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
