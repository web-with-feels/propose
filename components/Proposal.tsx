import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PARTNER_NAME } from '../constants';

interface Props {
  onYes: () => void;
}

const Proposal: React.FC<Props> = ({ onYes }) => {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const moveButton = () => {
    if (!containerRef.current) return;
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const btnWidth = 100; // Approx width
    const btnHeight = 50; // Approx height

    // Calculate available space relative to the container center
    // We want the button to stay within the viewport but jump around
    const newX = (Math.random() - 0.5) * (window.innerWidth - btnWidth * 2);
    const newY = (Math.random() - 0.5) * (window.innerHeight - btnHeight * 2);

    setNoBtnPosition({ x: newX, y: newY });
    setHasMoved(true);
  };

  return (
    <div ref={containerRef} className="relative w-full h-full flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-7xl serif-font text-rose-900 mb-6 drop-shadow-sm">
          Will you be mine forever?
        </h1>
        <p className="text-xl md:text-2xl text-rose-600 mb-12 font-light">
          {PARTNER_NAME}, make me the happiest person alive.
        </p>

        <div className="relative flex items-center justify-center gap-8 min-h-[100px]">
          {/* YES BUTTON */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onYes}
            className="px-12 py-4 bg-rose-600 text-white rounded-full text-xl font-bold shadow-lg hover:bg-rose-700 transition-colors z-10"
          >
            YES 💖
          </motion.button>

          {/* NO BUTTON (Runaway) */}
          <motion.button
            animate={hasMoved ? { x: noBtnPosition.x, y: noBtnPosition.y } : {}}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onMouseEnter={moveButton}
            onTouchStart={moveButton} // For mobile support
            className="absolute px-8 py-4 bg-stone-200 text-stone-500 rounded-full text-lg font-medium hover:bg-stone-300 transition-colors cursor-pointer"
            style={{ 
              position: hasMoved ? 'absolute' : 'relative',
              // Initially relative so it sits next to Yes, then absolute to move freely
            }}
          >
            No 😳
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Proposal;