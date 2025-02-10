import React from "react";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface TodoItemProps {
  id?: string;
  text?: string;
  completed?: boolean;
  onToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id = "1",
  text = "Sample todo item",
  completed = false,
  onToggle = () => {},
  onDelete = () => {},
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex items-center justify-between p-4 mb-2 bg-white rounded-lg shadow-sm border border-gray-200"
    >
      <div className="flex items-center space-x-4">
        <Checkbox
          checked={completed}
          onCheckedChange={() => onToggle(id)}
          className="h-5 w-5"
        />
        <span
          className={`text-gray-700 ${completed ? "line-through text-gray-400" : ""}`}
        >
          {text}
        </span>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(id)}
        className="text-gray-400 hover:text-red-500 transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </motion.div>
  );
};

export default TodoItem;
