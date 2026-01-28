import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MEMORIES } from '../constants';
import { ChevronRight } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const StoryLine: React.FC<Props> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextMemory = () => {
    if (currentIndex < MEMORIES.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="w-full max-w-4xl h-[80vh] flex flex-col items-center justify-center">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl serif-font mb-8 text-rose-800"
      >
        Do you remember?
      </motion.h2>

      <div className="relative w-full max-w-md aspect-[3/4] md:aspect-video">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -50, rotate: -5 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="absolute inset-0 bg-white p-4 pb-8 rounded-2xl shadow-2xl border border-rose-100 flex flex-col"
          >
            <div className="relative flex-grow overflow-hidden rounded-xl bg-rose-100">
               <img 
                 src={MEMORIES[currentIndex].image} 
                 alt={MEMORIES[currentIndex].title}
                 className="w-full h-full object-cover"
               />
               <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4 text-white">
                 <span className="text-sm font-medium tracking-wider uppercase opacity-90">
                   {MEMORIES[currentIndex].date}
                 </span>
               </div>
            </div>
            
            <div className="mt-6 text-center px-4">
              <h3 className="text-2xl serif-font mb-2 text-rose-900">
                {MEMORIES[currentIndex].title}
              </h3>
              <p className="text-rose-700/80 leading-relaxed font-light">
                {MEMORIES[currentIndex].description}
              </p>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={nextMemory}
                className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-lg hover:bg-rose-600 transition-colors"
              >
                <ChevronRight />
              </button>
            </div>
            
            <div className="absolute -bottom-10 left-0 w-full flex justify-center gap-2">
              {MEMORIES.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-rose-500' : 'w-2 bg-rose-200'}`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StoryLine;