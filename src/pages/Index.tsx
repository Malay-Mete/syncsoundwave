
import React, { useState } from 'react';
import MusicPlayer from '@/components/MusicPlayer';
import MusicVisualizer from '@/components/MusicVisualizer';
import SyncStatus from '@/components/SyncStatus';
import { Button } from '@/components/ui/button';
import { Share2, Info, Github, Home, Search, Library, Heart, PlusCircle, User } from 'lucide-react';

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSynced, setIsSynced] = useState(false);
  
  const toggleSync = () => {
    setIsSynced(!isSynced);
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Navbar - Mobile only */}
      <nav className="lg:hidden bg-card/90 backdrop-blur-md py-4 px-6 border-b border-border sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold bg-clip-text text-transparent music-gradient-bg">
            SyncSound
          </h1>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </nav>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Desktop only */}
        <aside className="hidden lg:flex lg:w-64 flex-col bg-black/30 h-screen sticky top-0 p-4 gap-6">
          <div className="pt-2 px-4">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent music-gradient-bg">
              SyncSound
            </h1>
          </div>
          
          <div className="space-y-1">
            <a href="#" className="flex items-center gap-3 text-white/90 hover:text-white p-3 rounded-md hover:bg-white/10 transition-all">
              <Home className="h-5 w-5" />
              <span className="font-medium">Home</span>
            </a>
            <a href="#" className="flex items-center gap-3 text-white/90 hover:text-white p-3 rounded-md hover:bg-white/10 transition-all">
              <Search className="h-5 w-5" />
              <span className="font-medium">Search</span>
            </a>
            <a href="#" className="flex items-center gap-3 text-white/90 hover:text-white p-3 rounded-md hover:bg-white/10 transition-all">
              <Library className="h-5 w-5" />
              <span className="font-medium">Your Library</span>
            </a>
          </div>
          
          <div className="mt-4 space-y-1">
            <a href="#" className="flex items-center gap-3 text-white/90 hover:text-white p-3 rounded-md hover:bg-white/10 transition-all">
              <PlusCircle className="h-5 w-5" />
              <span className="font-medium">Create Playlist</span>
            </a>
            <a href="#" className="flex items-center gap-3 text-white/90 hover:text-white p-3 rounded-md hover:bg-white/10 transition-all">
              <Heart className="h-5 w-5" />
              <span className="font-medium">Liked Songs</span>
            </a>
          </div>
          
          <div className="mt-auto">
            <div className="p-4 bg-card/50 rounded-lg">
              <h3 className="text-sm font-semibold mb-1">Sync with Friends</h3>
              <p className="text-xs text-muted-foreground mb-3">Share music with friends in real-time</p>
              <Button 
                onClick={toggleSync}
                size="sm"
                className={isSynced ? "w-full bg-music-primary text-white" : "w-full bg-muted text-muted-foreground"}
              >
                {isSynced ? "Disconnect" : "Connect"}
              </Button>
            </div>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="px-4 py-6 md:p-8 max-w-6xl mx-auto">
            <div className="lg:hidden flex items-center justify-between mb-6">
              <div className="flex space-x-1">
                <Button variant="ghost" size="sm" className="px-3 py-2 rounded-full bg-card text-muted-foreground">
                  <Home className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="px-3 py-2 rounded-full bg-card text-muted-foreground">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="px-3 py-2 rounded-full bg-card text-muted-foreground">
                  <Library className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                onClick={toggleSync}
                size="sm"
                className={isSynced ? "bg-music-primary text-white rounded-full" : "bg-muted text-muted-foreground rounded-full"}
              >
                {isSynced ? "Synced" : "Sync"}
              </Button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <MusicVisualizer isPlaying={isPlaying} className="spotify-card" />
                
                <MusicPlayer 
                  className="spotify-card"
                  onPlayChange={(playing: boolean) => setIsPlaying(playing)}
                />
                
                <div className="flex flex-col sm:flex-row gap-4 lg:hidden">
                  <Button 
                    onClick={toggleSync}
                    variant="outline"
                    className={isSynced ? "bg-music-primary text-white" : "bg-card text-muted-foreground"}
                  >
                    {isSynced ? "Disconnect Sync" : "Connect to Sync"}
                  </Button>
                  
                  <Button variant="outline" className="flex items-center gap-2 bg-card text-muted-foreground">
                    <Share2 className="h-4 w-4" />
                    Share Link
                  </Button>
                </div>
              </div>
              
              <div className="space-y-6">
                <SyncStatus isSynced={isSynced} listeners={isSynced ? 1 : 0} className="spotify-card" />
                
                <div className="spotify-card p-4">
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
                
                <div className="hidden lg:flex spotify-card p-4 gap-2">
                  <Button variant="outline" className="flex-1 flex items-center justify-center gap-2 bg-card text-muted-foreground">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                  <Button variant="ghost" size="icon" className="bg-card text-muted-foreground">
                    <Github className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="bg-card text-muted-foreground">
                    <Info className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      
      {/* Mobile navigation bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-md border-t border-border py-3 px-6">
        <div className="flex items-center justify-around">
          <a href="#" className="flex flex-col items-center text-white/70 hover:text-white">
            <Home className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </a>
          <a href="#" className="flex flex-col items-center text-white/70 hover:text-white">
            <Search className="h-5 w-5" />
            <span className="text-xs mt-1">Search</span>
          </a>
          <a href="#" className="flex flex-col items-center text-white/70 hover:text-white">
            <Library className="h-5 w-5" />
            <span className="text-xs mt-1">Library</span>
          </a>
        </div>
      </div>
      
      <footer className="hidden lg:block container mx-auto mt-12 py-6 border-t border-border text-center text-sm text-muted-foreground">
        <p>SyncSoundWave &copy; {new Date().getFullYear()} - Sync music across devices</p>
      </footer>
    </div>
  );
};

export default Index;
