import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { PARTNER_NAME } from '../constants';

interface Props {
  onStart: () => void;
}

const Landing: React.FC<Props> = ({ onStart }) => {
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning";
    if (hours < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 1.5 }}
      className="text-center max-w-2xl px-6"
    >
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="mb-6 text-rose-400 font-medium tracking-widest uppercase text-sm"
      >
        {getGreeting()}, {PARTNER_NAME}
      </motion.div>

      <motion.h1 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 1.2 }}
        className="text-5xl md:text-7xl mb-8 leading-tight serif-font text-rose-950"
      >
        Some stories aren't written...<br />
        <span className="italic text-rose-600">they're felt.</span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="flex justify-center"
      >
        <button 
          onClick={onStart}
          className="group relative px-8 py-4 bg-rose-500 text-white rounded-full text-lg font-medium shadow-xl hover:bg-rose-600 transition-all transform hover:scale-105 overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            Begin Journey <ArrowRight size={18} />
          </span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        </button>
      </motion.div>

      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="mt-12 text-rose-300/60"
      >
        <Heart size={24} className="mx-auto fill-current" />
      </motion.div>
    </motion.div>
  );
};

export default Landing;