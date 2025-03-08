
import { formatTime } from './formatTime';

export async function sharePlayback(
  songTitle: string = "Music Stream", 
  currentTime: number = 0
): Promise<boolean> {
  const shareData = {
    title: 'SyncSound Music',
    text: `I'm listening to ${songTitle} at ${formatTime(currentTime)}. Join me!`,
    url: window.location.href,
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
      return true;
    } else {
      // Fallback for browsers that don't support Web Share API
      await navigator.clipboard.writeText(
        `${shareData.text} ${shareData.url}`
      );
      return true;
    }
  } catch (error) {
    console.error('Error sharing:', error);
    return false;
  }
}
