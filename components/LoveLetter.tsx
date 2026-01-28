import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const LETTER_CONTENT = [
  "My Dearest,",
  "There comes a time in life when you realize that home isn't a place, but a person.",
  "With you, I found my safe harbor, my greatest adventure, and my best friend.",
  "Every smile you give me lights up my darkest days. Every laugh is my favorite melody.",
  "I don't just want to be part of your history...",
  "I want to be your future."
];

const LoveLetter: React.FC<Props> = ({ onComplete }) => {
  const [paragraphIndex, setParagraphIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (paragraphIndex >= LETTER_CONTENT.length) {
      setIsTyping(false);
      return;
    }

    const currentParagraph = LETTER_CONTENT[paragraphIndex];

    if (charIndex < currentParagraph.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + currentParagraph[charIndex]);
        setCharIndex(prev => prev + 1);
      }, 50); // Typing speed
      return () => clearTimeout(timeout);
    } else {
      // Pause between paragraphs
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + "\n\n");
        setCharIndex(0);
        setParagraphIndex(prev => prev + 1);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [charIndex, paragraphIndex]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-2xl w-full bg-white/60 backdrop-blur-sm p-8 md:p-12 rounded-lg shadow-xl border border-rose-100"
    >
      <div className="min-h-[400px] handwritten text-2xl md:text-3xl leading-relaxed text-rose-900 whitespace-pre-wrap">
        {displayedText}
        {isTyping && (
          <motion.span 
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-1 h-6 bg-rose-400 ml-1 translate-y-1"
          />
        )}
      </div>

      {!isTyping && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex justify-center"
        >
          <button 
            onClick={onComplete}
            className="flex flex-col items-center gap-2 text-rose-500 hover:text-rose-700 transition-colors"
          >
            <span className="uppercase tracking-widest text-sm font-semibold">One Last Thing</span>
            <ChevronDown className="animate-bounce" />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default LoveLetter;