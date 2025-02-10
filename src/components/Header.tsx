import { motion } from "framer-motion";
import { CheckCircle2, Clock, Calendar } from "lucide-react";

const Header = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-8"
    >
      <motion.h1
        className="text-4xl font-bold text-gray-900 mb-4"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        Focus Flow
      </motion.h1>
      <motion.div
        className="flex justify-center gap-6 text-gray-600"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <span>Task Management</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-500" />
          <span>Pomodoro Timer</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-purple-500" />
          <span>Calendar Sync</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Header;
