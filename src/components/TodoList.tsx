import React from "react";
import { ScrollArea } from "./ui/scroll-area";
import TodoItem from "./TodoItem";
import { AnimatePresence } from "framer-motion";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos?: Todo[];
  onToggleTodo?: (id: string) => void;
  onDeleteTodo?: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos = [
    { id: "1", text: "Learn React", completed: false },
    { id: "2", text: "Build a todo app", completed: true },
    { id: "3", text: "Master TypeScript", completed: false },
  ],
  onToggleTodo = () => {},
  onDeleteTodo = () => {},
}) => {
  // Sort todos to move completed items to the bottom
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  return (
    <div className="w-full h-[400px] bg-gray-50 rounded-lg p-4 border border-gray-200">
      <ScrollArea className="h-full pr-4">
        <AnimatePresence>
          {sortedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              text={todo.text}
              completed={todo.completed}
              onToggle={onToggleTodo}
              onDelete={onDeleteTodo}
            />
          ))}
        </AnimatePresence>
      </ScrollArea>
    </div>
  );
};

export default TodoList;
