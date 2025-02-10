import React from "react";
import TodoContainer from "./TodoContainer";
import Header from "./Header";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 p-8"
    >
      <div className="max-w-4xl mx-auto pt-8">
        <Header />
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <TodoContainer />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;
