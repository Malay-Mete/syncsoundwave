
import React from 'react';
import { cn } from "@/lib/utils";
import { Globe, Users } from 'lucide-react';

interface SyncStatusProps {
  className?: string;
  isSynced?: boolean;
  listeners?: number;
}

const SyncStatus: React.FC<SyncStatusProps> = ({ 
  className, 
  isSynced = false, 
  listeners = 0 
}) => {
  return (
    <div className={cn("bg-card p-4 rounded-xl shadow-md", className)}>
      <h3 className="text-lg font-medium mb-3">Sync Status</h3>
      
      <div className="flex items-center mb-4">
        <div className={cn(
          "h-3 w-3 rounded-full mr-2",
          isSynced ? "bg-music-secondary animate-pulse-opacity" : "bg-muted"
        )}></div>
        <span className={isSynced ? "text-music-secondary" : "text-muted-foreground"}>
          {isSynced ? "Synced" : "Ready to sync"}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-sm">
          <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-muted-foreground">Sync Room: <span className="text-foreground font-medium">Main Room</span></span>
        </div>
        
        <div className="flex items-center text-sm">
          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-muted-foreground">Listeners: <span className="text-foreground font-medium">{listeners}</span></span>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-muted-foreground">
        Sync technology powered by WebSockets
      </div>
    </div>
  );
};

export default SyncStatus;
