import React, { useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { motion } from "framer-motion";
import PomodoroTimer from "./PomodoroTimer";
import CalendarView from "./Calendar/CalendarView";
import ChatInterface from "./AiChat/ChatInterface";
import NotesEditor from "./Notes/NotesEditor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoContainerProps {
  initialTodos?: Todo[];
}

const TodoContainer: React.FC<TodoContainerProps> = ({
  initialTodos = [
    { id: "1", text: "Learn React", completed: false },
    { id: "2", text: "Build a todo app", completed: true },
    { id: "3", text: "Master TypeScript", completed: false },
  ],
}) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const handleAddTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleToggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDeleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleScheduleTask = (task: {
    title: string;
    date: Date;
    time: string;
  }) => {
    // TODO: Implement task scheduling
    console.log("Scheduling task:", task);
  };

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden bg-white/80 backdrop-blur-sm shadow-xl border border-gray-200/50"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <PomodoroTimer />
          </motion.div>

          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="space-y-4">
              <TodoInput onAdd={handleAddTodo} />
              <TodoList
                todos={todos}
                onToggleTodo={handleToggleTodo}
                onDeleteTodo={handleDeleteTodo}
              />
            </div>
          </motion.div>
        </div>

        <Tabs defaultValue="calendar" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="chat">AI Assistant</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="calendar">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <CalendarView />
            </motion.div>
          </TabsContent>

          <TabsContent value="chat">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <ChatInterface onScheduleTask={handleScheduleTask} />
            </motion.div>
          </TabsContent>

          <TabsContent value="notes">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <NotesEditor />
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default TodoContainer;
