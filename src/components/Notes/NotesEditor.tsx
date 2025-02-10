import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import { Plus, Save, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Note {
  id: string;
  title: string;
  content: string;
  timestamp: Date;
}

export default function NotesEditor() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleCreateNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      timestamp: new Date(),
    };
    setNotes((prev) => [...prev, newNote]);
    setCurrentNote(newNote);
    setTitle(newNote.title);
    setContent(newNote.content);
  };

  const handleSaveNote = () => {
    if (!currentNote) return;

    const updatedNote = {
      ...currentNote,
      title,
      content,
      timestamp: new Date(),
    };

    setNotes((prev) =>
      prev.map((note) => (note.id === currentNote.id ? updatedNote : note)),
    );
    setCurrentNote(updatedNote);
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    if (currentNote?.id === id) {
      setCurrentNote(null);
      setTitle("");
      setContent("");
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 h-[400px] bg-white/50 backdrop-blur-sm rounded-lg border border-gray-200/50 p-4">
      <div className="col-span-1 border-r border-gray-200 pr-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium">Notes</h3>
          <Button variant="outline" size="icon" onClick={handleCreateNote}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <ScrollArea className="h-[320px]">
          <AnimatePresence>
            {notes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className={`p-3 rounded-lg mb-2 cursor-pointer ${currentNote?.id === note.id ? "bg-gray-100" : "hover:bg-gray-50"}`}
                onClick={() => {
                  setCurrentNote(note);
                  setTitle(note.title);
                  setContent(note.content);
                }}
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-medium truncate">{note.title}</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteNote(note.id);
                    }}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {note.timestamp.toLocaleDateString()}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>
      </div>

      <div className="col-span-2 pl-4">
        {currentNote ? (
          <div className="h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title"
                className="text-lg font-medium"
              />
              <Button variant="outline" size="icon" onClick={handleSaveNote}>
                <Save className="h-4 w-4" />
              </Button>
            </div>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start typing your note..."
              className="flex-1 resize-none"
            />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-500">
            Select or create a note to start writing
          </div>
        )}
      </div>
    </div>
  );
}
