import React from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  isCurrentUser?: boolean;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const isSystem = message.sender === "System";
  const isCurrentUser = message.sender === "You";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`flex gap-2 mb-4 ${isCurrentUser ? "justify-end" : "justify-start"}`}
    >
      {!isSystem && (
        <div
          className={`max-w-[80%] p-3 rounded-lg ${
            isCurrentUser
              ? "bg-blue-500 text-white"
              : isSystem
                ? "bg-gray-100 text-gray-500 italic text-sm"
                : "bg-gray-100 text-gray-800"
          }`}
        >
          <div className="flex flex-col">
            {!isCurrentUser && (
              <span className="text-xs font-medium text-gray-500 mb-1">
                {message.sender}
              </span>
            )}
            <p>{message.text}</p>
            <span className="text-xs opacity-70 mt-1">
              {format(message.timestamp, "HH:mm")}
            </span>
          </div>
        </div>
      )}

      {isSystem && (
        <div className="w-full text-center text-sm text-gray-500 my-2">
          {message.text}
        </div>
      )}
    </motion.div>
  );
}
