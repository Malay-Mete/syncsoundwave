
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { searchYouTubeVideos, YouTubeVideo } from '@/utils/youtubeApi';
import { useToast } from '@/hooks/use-toast';

interface SearchSongsProps {
  onSelectSong: (video: YouTubeVideo) => void;
}

const SearchSongs: React.FC<SearchSongsProps> = ({ onSelectSong }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    try {
      const videos = await searchYouTubeVideos(query);
      setResults(videos);
      
      if (videos.length === 0) {
        toast({
          title: "No results found",
          description: "Try a different search term",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Search failed",
        description: "Please check your API key configuration or try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Search for songs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          className="flex-1"
        />
        <Button onClick={handleSearch} disabled={isLoading}>
          {isLoading ? "Searching..." : <Search className="h-4 w-4" />}
        </Button>
      </div>
      
      {results.length > 0 && (
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2 spotify-card p-2">
          {results.map((video) => (
            <div
              key={video.id}
              className="flex items-center gap-3 p-2 hover:bg-card/60 rounded-md cursor-pointer"
              onClick={() => onSelectSong(video)}
            >
              <img 
                src={video.thumbnailUrl} 
                alt={video.title}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="overflow-hidden">
                <p className="text-sm font-medium truncate">{video.title}</p>
                <p className="text-xs text-muted-foreground truncate">{video.channelTitle}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchSongs;
