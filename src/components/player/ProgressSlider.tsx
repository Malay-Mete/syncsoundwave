
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { formatTime } from '@/utils/formatTime';

interface ProgressSliderProps {
  currentTime: number;
  duration: number;
  onSeek: (newValue: number[]) => void;
}

const ProgressSlider: React.FC<ProgressSliderProps> = ({ currentTime, duration, onSeek }) => {
  return (
    <div className="mb-2">
      <Slider
        value={[currentTime > 0 ? (currentTime / duration) * 100 : 0]}
        min={0}
        max={100}
        step={0.1}
        onValueChange={onSeek}
        className="cursor-pointer"
      />
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressSlider;
