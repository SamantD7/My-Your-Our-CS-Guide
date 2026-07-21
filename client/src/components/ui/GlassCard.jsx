import React from 'react';
import { motion } from 'framer-motion';

const GlassCard = ({ children, className = '', hover = true, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={`glass-panel rounded-2xl p-6 transition-all duration-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
