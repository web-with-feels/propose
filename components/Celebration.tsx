import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { YOUR_NAME } from '../constants';

const ConfettiParticle: React.FC<{ delay: number }> = ({ delay }) => {
  const randomColor = ['#f43f5e', '#ec4899', '#f59e0b', '#10b981', '#3b82f6'][Math.floor(Math.random() * 5)];
  const randomX = Math.random() * 100;
  
  return (
    <motion.div
      initial={{ y: -20, x: `${randomX}vw`, rotate: 0, opacity: 1 }}
      animate={{ 
        y: '100vh', 
        rotate: 360 + Math.random() * 360,
        x: `${randomX + (Math.random() * 20 - 10)}vw`
      }}
      transition={{ 
        duration: 3 + Math.random() * 2, 
        ease: "linear", 
        delay: delay,
        repeat: Infinity 
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '10px',
        height: '10px',
        backgroundColor: randomColor,
        borderRadius: Math.random() > 0.5 ? '50%' : '0',
      }}
    />
  );
};

const Celebration: React.FC = () => {
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    
    setParticles(Array.from({ length: 50 }, (_, i) => i));
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center text-center z-50">
      {/* Confetti Overlay */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {particles.map((i) => (
          <ConfettiParticle key={i} delay={Math.random() * 5} />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5 }}
        className="bg-white/80 backdrop-blur-md p-12 rounded-3xl shadow-2xl border-4 border-rose-200"
      >
        <motion.h1 
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-6xl md:text-8xl mb-6"
        >
          💍
        </motion.h1>
        
        <h2 className="text-4xl md:text-6xl serif-font text-rose-900 mb-6 font-bold">
          Omg You Said Yes!
        </h2>
        
        <p className="text-xl text-rose-700 mb-8 max-w-lg mx-auto leading-relaxed">
          Today marks the beginning of our forever. I love you more than words can say.
        </p>

        <div className="text-rose-400 text-sm tracking-widest uppercase font-semibold">
          Love, {YOUR_NAME}
        </div>
      </motion.div>
    </div>
  );
};

export default Celebration;