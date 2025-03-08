
import { useState, useRef, useEffect } from 'react';

interface AudioPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  activeBars: number[];
}

interface AudioPlayerControls {
  togglePlay: () => void;
  seek: (newValue: number[]) => void;
  setVolume: (newValue: number[]) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
}

export function useAudioPlayer(onPlayChange?: (isPlaying: boolean) => void): [AudioPlayerState, AudioPlayerControls] {
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

  // Initialize audio element
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

  const togglePlay = () => setIsPlaying(!isPlaying);

  const seek = (newValue: number[]) => {
    if (audioRef.current) {
      const newTime = newValue[0];
      audioRef.current.currentTime = (newTime / 100) * duration;
      setCurrentTime((newTime / 100) * duration);
    }
  };

  const handleVolumeChange = (newValue: number[]) => {
    setVolume(newValue[0]);
  };

  return [
    { isPlaying, currentTime, duration, volume, activeBars },
    { togglePlay, seek, setVolume: handleVolumeChange, audioRef }
  ];
}
