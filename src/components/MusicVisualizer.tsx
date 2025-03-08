
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface MusicVisualizerProps {
  className?: string;
  isPlaying: boolean;
}

const MusicVisualizer: React.FC<MusicVisualizerProps> = ({ className, isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      velocity: { x: number; y: number };
      alpha: number;
    }> = [];
    
    const colors = ['#1DB954', '#8A2BE2', '#4A90E2', '#9B59B6']; // Spotify green and purples/blues
    
    const createParticles = () => {
      if (!isPlaying) return;
      
      // Create new particles
      if (Math.random() > 0.92 && particles.length < 50) {
        const radius = Math.random() * 2 + 1;
        const x = Math.random() * canvas.width;
        const y = canvas.height + radius;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const velocity = {
          x: (Math.random() - 0.5) * 1,
          y: Math.random() * -2 - 1
        };
        
        particles.push({
          x,
          y,
          radius,
          color,
          velocity,
          alpha: 1
        });
      }
    };
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      createParticles();
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        p.x += p.velocity.x;
        p.y += p.velocity.y;
        p.alpha -= 0.005;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0');
        ctx.fill();
        
        // Remove particles that are off-screen or faded out
        if (p.y + p.radius < 0 || p.alpha <= 0) {
          particles.splice(i, 1);
          i--;
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying]);
  
  return (
    <div className={cn("relative w-full h-40 bg-card rounded-lg overflow-hidden", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-music-primary/30 via-music-accent/20 to-music-secondary/30"></div>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
      
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background to-transparent"></div>
      
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <div className="text-white/90 font-medium">
          <h3 className="text-lg">Now Playing</h3>
          <p className="text-sm text-white/70">{isPlaying ? "Music is playing..." : "Ready to play"}</p>
        </div>
        
        {isPlaying && (
          <div className="flex space-x-1 mr-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div 
                key={index} 
                className={cn(
                  "w-1 bg-white/80 rounded-t-md h-6",
                  `animate-equalizer-bar-${index + 1}`
                )}
                style={{
                  transformOrigin: 'bottom',
                  transitionDelay: `${index * 0.1}s`
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MusicVisualizer;
