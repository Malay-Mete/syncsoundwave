
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from 'lucide-react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MusicPlayerProps {
  className?: string;
  onPlayChange?: (isPlaying: boolean) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ className, onPlayChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(80);
  const [activeBars, setActiveBars] = useState<number[]>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const dataArray = useRef<Uint8Array | null>(null);
  const animationFrameId = useRef<number | null>(null);
  
  // Create initial audio element
  useEffect(() => {
    audioRef.current = new Audio('https://assets.codepen.io/296057/fem-bombshell.mp3');
    
    audioRef.current.addEventListener('loadedmetadata', () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration);
      }
    });
    
    audioRef.current.addEventListener('timeupdate', () => {
      if (audioRef.current) {
        setCurrentTime(audioRef.current.currentTime);
      }
    });
    
    audioRef.current.addEventListener('ended', () => {
      setIsPlaying(false);
      if (onPlayChange) onPlayChange(false);
    });
    
    // Set the initial volume
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);
  
  // Initialize audio visualizer
  useEffect(() => {
    if (!audioContext.current && audioRef.current) {
      try {
        audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        analyser.current = audioContext.current.createAnalyser();
        
        const source = audioContext.current.createMediaElementSource(audioRef.current);
        source.connect(analyser.current);
        analyser.current.connect(audioContext.current.destination);
        
        analyser.current.fftSize = 256;
        const bufferLength = analyser.current.frequencyBinCount;
        dataArray.current = new Uint8Array(bufferLength);
      } catch (error) {
        console.error("Web Audio API is not supported or blocked:", error);
      }
    }
    
    return () => {
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, []);
  
  // Animation function for the visualizer
  const animate = () => {
    if (analyser.current && dataArray.current && isPlaying) {
      analyser.current.getByteFrequencyData(dataArray.current);
      
      // Use specific frequency bands for visualization
      const bass = Math.floor(dataArray.current[2] / 255 * 100);
      const mid = Math.floor(dataArray.current[10] / 255 * 100);
      const treble = Math.floor(dataArray.current[20] / 255 * 100);
      const presence = Math.floor(dataArray.current[30] / 255 * 100);
      
      setActiveBars([bass, mid, treble, presence]);
      
      animationFrameId.current = requestAnimationFrame(animate);
    } else if (!isPlaying) {
      setActiveBars([0, 0, 0, 0]);
    }
  };
  
  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
          if (onPlayChange) onPlayChange(false);
        });
        animate();
      } else {
        audioRef.current.pause();
        if (animationFrameId.current) {
          cancelAnimationFrame(animationFrameId.current);
        }
      }
    }
    
    if (onPlayChange) onPlayChange(isPlaying);
  }, [isPlaying]);
  
  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  const handleSeek = (newValue: number[]) => {
    if (audioRef.current) {
      const newTime = newValue[0];
      audioRef.current.currentTime = (newTime / 100) * duration;
      setCurrentTime((newTime / 100) * duration);
    }
  };
  
  const handleVolumeChange = (newValue: number[]) => {
    setVolume(newValue[0]);
  };
  
  return (
    <div className={cn("p-6 rounded-xl bg-card shadow-lg w-full max-w-2xl mx-auto", className)}>
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-white mb-1">Synced Music Stream</h2>
        <p className="text-muted-foreground">Listen together in perfect harmony</p>
      </div>
      
      {/* Visualizer */}
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
      
      {/* Progress bar */}
      <div className="mb-2">
        <Slider
          value={[currentTime > 0 ? (currentTime / duration) * 100 : 0]}
          min={0}
          max={100}
          step={0.1}
          onValueChange={handleSeek}
          className="cursor-pointer"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
          <Shuffle className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-white">
          <SkipBack className="h-5 w-5" />
        </Button>
        <Button 
          onClick={() => setIsPlaying(!isPlaying)} 
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
      
      {/* Volume control */}
      <div className="flex items-center gap-2">
        <Volume2 className="h-5 w-5 text-muted-foreground" />
        <Slider
          value={[volume]}
          min={0}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
          className="cursor-pointer"
        />
      </div>
      
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
