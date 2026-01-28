import React, { useEffect, useRef } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { MUSIC_URL } from '../constants';

interface Props {
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
}

export default function AudioControl({ isPlaying, setIsPlaying }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.log("Audio play failed (interaction needed)", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <div className="fixed top-4 right-4 z-50">
      <audio ref={audioRef} loop>
        <source src={MUSIC_URL} type="audio/mp3" />
      </audio>
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="bg-white/50 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white/80 transition-all text-rose-600 border border-rose-200"
      >
        {isPlaying ? <Music size={20} /> : <VolumeX size={20} />}
      </button>
    </div>
  );
}