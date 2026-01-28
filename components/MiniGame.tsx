import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const MiniGame: React.FC<Props> = ({ onComplete }) => {
  const [score, setScore] = useState(0);
  const TARGET_SCORE = 5;

  const handleHeartClick = () => {
    const newScore = score + 1;
    setScore(newScore);
    if (newScore >= TARGET_SCORE) {
      setTimeout(onComplete, 1000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center"
    >
      <h2 className="text-3xl md:text-4xl serif-font mb-2 text-rose-900">
        Catch my heart...
      </h2>
      <p className="text-rose-600 mb-12">
        Click the heart {TARGET_SCORE - score} more times
      </p>

      <div className="relative h-64 w-64 mx-auto flex items-center justify-center">
        {score < TARGET_SCORE ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleHeartClick}
            className="text-rose-500"
            animate={{
              // Random movement simulation
              x: [0, -20, 20, -10, 10, 0],
              y: [0, -10, 10, -5, 5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "mirror"
            }}
          >
            <Heart size={100} fill="currentColor" className="drop-shadow-xl" />
          </motion.button>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1.5 }}
            className="text-rose-600"
          >
            <Heart size={120} fill="currentColor" />
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-full left-1/2 -translate-x-1/2 w-48 mt-4 font-bold text-lg"
            >
              You caught it!
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default MiniGame;