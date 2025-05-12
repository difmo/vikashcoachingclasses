import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <motion.div
        className="flex space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-8 h-8 bg-white rounded-full animate-bounce"></div>
        <div className="w-8 h-8 bg-white rounded-full animate-bounce delay-150"></div>
        <div className="w-8 h-8 bg-white rounded-full animate-bounce delay-300"></div>
      </motion.div>
    </div>
  );
};

export default Loader;
