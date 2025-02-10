import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

interface TodoInputProps {
  onAdd?: (text: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const TodoInput: React.FC<TodoInputProps> = ({
  onAdd = () => {},
  placeholder = "Add a new todo...",
  disabled = false,
}) => {
  const [text, setText] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText("");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-200"
    >
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={disabled || !text.trim()}
          variant="default"
          size="icon"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </form>
    </motion.div>
  );
};

export default TodoInput;
