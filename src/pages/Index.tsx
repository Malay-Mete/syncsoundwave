
import React, { useState } from 'react';
import MusicPlayer from '@/components/MusicPlayer';
import MusicVisualizer from '@/components/MusicVisualizer';
import SyncStatus from '@/components/SyncStatus';
import { Button } from '@/components/ui/button';
import { Share2, Info, Github } from 'lucide-react';

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSynced, setIsSynced] = useState(false);
  
  const toggleSync = () => {
    setIsSynced(!isSynced);
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
      <header className="container mx-auto mb-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent music-gradient-bg">
            SyncSoundWave
          </h1>
          
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Github className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline">GitHub</span>
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Info className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline">Help</span>
            </Button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <MusicVisualizer isPlaying={isPlaying} />
            
            <MusicPlayer 
              className="bg-card/80 backdrop-blur-sm"
              onPlayChange={(playing: boolean) => setIsPlaying(playing)}
            />
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={toggleSync}
                className={isSynced ? "bg-music-primary text-white" : "bg-muted text-muted-foreground"}
              >
                {isSynced ? "Disconnect Sync" : "Connect to Sync"}
              </Button>
              
              <Button variant="outline" className="flex items-center gap-2">
                <Share2 className="h-4 w-4" />
                Share Sync Link
              </Button>
            </div>
          </div>
          
          <div className="space-y-6">
            <SyncStatus isSynced={isSynced} listeners={isSynced ? 1 : 0} />
            
            <div className="bg-card p-4 rounded-xl shadow-md">
              <h3 className="text-lg font-medium mb-3">How It Works</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-music-primary flex items-center justify-center text-white text-xs mr-2">1</div>
                  <p className="text-muted-foreground">Click "Connect to Sync" to join a synchronized room</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-music-primary flex items-center justify-center text-white text-xs mr-2">2</div>
                  <p className="text-muted-foreground">Share the sync link with friends to invite them</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-music-primary flex items-center justify-center text-white text-xs mr-2">3</div>
                  <p className="text-muted-foreground">Everyone hears the same part of the song at the same time</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="container mx-auto mt-12 py-6 border-t border-border text-center text-sm text-muted-foreground">
        <p>SyncSoundWave &copy; {new Date().getFullYear()} - Sync music across devices</p>
      </footer>
    </div>
  );
};

export default Index;
