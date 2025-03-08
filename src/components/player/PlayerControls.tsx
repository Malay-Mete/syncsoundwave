
import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Shuffle, Repeat } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface PlayerControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({ isPlaying, onPlayPause }) => {
  return (
    <div className="flex items-center justify-center gap-4 mb-6">
      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
        <Shuffle className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
        <SkipBack className="h-5 w-5" />
      </Button>
      <Button 
        onClick={onPlayPause} 
        className="bg-primary hover:bg-primary/80 text-white rounded-full p-3 h-14 w-14 flex items-center justify-center"
      >
        {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
      </Button>
      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
        <SkipForward className="h-5 w-5" />
      </Button>
      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
        <Repeat className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default PlayerControls;
