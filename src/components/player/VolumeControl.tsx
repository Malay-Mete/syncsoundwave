
import React from 'react';
import { Volume2 } from 'lucide-react';
import { Slider } from "@/components/ui/slider";

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (newValue: number[]) => void;
}

const VolumeControl: React.FC<VolumeControlProps> = ({ volume, onVolumeChange }) => {
  return (
    <div className="flex items-center gap-2">
      <Volume2 className="h-5 w-5 text-muted-foreground" />
      <Slider
        value={[volume]}
        min={0}
        max={100}
        step={1}
        onValueChange={onVolumeChange}
        className="cursor-pointer"
      />
    </div>
  );
};

export default VolumeControl;
