import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Plus, Hash } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getRooms, createRoom, subscribeToRooms } from "@/lib/db/chat";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";

interface ChatRoom {
  id: string;
  name: string;
  unreadCount?: number;
}

interface ChatSidebarProps {
  onRoomSelect?: (roomId: string) => void;
  selectedRoomId?: string;
}

export default function ChatSidebar({
  onRoomSelect = () => {},
  selectedRoomId = "1",
}: ChatSidebarProps) {
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [showNewRoom, setShowNewRoom] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load initial rooms
    const loadRooms = async () => {
      try {
        const data = await getRooms();
        setRooms(data || []);
      } catch (error) {
        console.error("Error loading rooms:", error);
      } finally {
        setLoading(false);
      }
    };

    loadRooms();

    // Subscribe to room changes
    const subscription = subscribeToRooms((newRoom) => {
      setRooms((prev) => {
        const exists = prev.some((room) => room.id === newRoom.id);
        if (exists) {
          return prev.map((room) => (room.id === newRoom.id ? newRoom : room));
        }
        return [...prev, newRoom];
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;

    try {
      await createRoom(newRoomName.trim());
      setNewRoomName("");
      setShowNewRoom(false);
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-[600px] flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Button
          variant="outline"
          className="w-full justify-start gap-2"
          onClick={() => setShowNewRoom(true)}
        >
          <Plus className="h-4 w-4" />
          New Chat Room
        </Button>
      </div>

      <ScrollArea className="flex-1 p-2">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : (
          <AnimatePresence>
            {rooms.map((room) => (
              <motion.button
                key={room.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={() => onRoomSelect(room.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm ${selectedRoomId === room.id ? "bg-gray-200" : "hover:bg-gray-100"}`}
              >
                <Hash className="h-4 w-4 text-gray-500" />
                <span className="flex-1 text-left">{room.name}</span>
                {room.unreadCount > 0 && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {room.unreadCount}
                  </span>
                )}
              </motion.button>
            ))}
          </AnimatePresence>
        )}
      </ScrollArea>

      <Dialog open={showNewRoom} onOpenChange={setShowNewRoom}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Chat Room</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleCreateRoom}>
            <div className="space-y-4 py-4">
              <Input
                value={newRoomName}
                onChange={(e) => setNewRoomName(e.target.value)}
                placeholder="Enter room name"
              />
            </div>
            <DialogFooter>
              <Button type="submit">Create Room</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
