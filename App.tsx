import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppStage } from './types';
import Landing from './components/Landing';
import StoryLine from './components/StoryLine';
import MiniGame from './components/MiniGame';
import LoveLetter from './components/LoveLetter';
import Proposal from './components/Proposal';
import Celebration from './components/Celebration';
import BackgroundEffect from './components/BackgroundEffect';
import AudioControl from './components/AudioControl';

export default function App() {
  const [stage, setStage] = useState<AppStage>(AppStage.LANDING);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Scroll to top on stage change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [stage]);

  const nextStage = () => {
    switch (stage) {
      case AppStage.LANDING: setStage(AppStage.STORY); break;
      case AppStage.STORY: setStage(AppStage.GAME); break;
      case AppStage.GAME: setStage(AppStage.LETTER); break;
      case AppStage.LETTER: setStage(AppStage.PROPOSAL); break;
      case AppStage.PROPOSAL: setStage(AppStage.ACCEPTED); break;
      default: break;
    }
  };

  return (
    <div className="relative min-h-screen w-full text-rose-900 overflow-hidden">
      {/* Dynamic Background */}
      <BackgroundEffect active={stage !== AppStage.ACCEPTED} />
      
      {/* Audio Controller */}
      <AudioControl isPlaying={isMusicPlaying} setIsPlaying={setIsMusicPlaying} />

      {/* Main Content Area */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4 md:p-8">
        <AnimatePresence mode="wait">
          {stage === AppStage.LANDING && (
            <Landing key="landing" onStart={() => {
              setIsMusicPlaying(true);
              nextStage();
            }} />
          )}

          {stage === AppStage.STORY && (
            <StoryLine key="story" onComplete={nextStage} />
          )}

          {stage === AppStage.GAME && (
            <MiniGame key="game" onComplete={nextStage} />
          )}

          {stage === AppStage.LETTER && (
            <LoveLetter key="letter" onComplete={nextStage} />
          )}

          {stage === AppStage.PROPOSAL && (
            <Proposal key="proposal" onYes={nextStage} />
          )}

          {stage === AppStage.ACCEPTED && (
            <Celebration key="celebration" />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}