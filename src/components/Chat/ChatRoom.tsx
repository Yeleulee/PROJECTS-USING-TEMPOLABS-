import React, { useState, useEffect } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Send, Plus, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ChatMessage from "./ChatMessage";
import InviteDialog from "./InviteDialog";
import { getMessages, sendMessage, subscribeToMessages } from "@/lib/db/chat";
import { useAuth } from "@/lib/hooks/useAuth";

interface ChatRoomProps {
  roomId?: string;
  roomName?: string;
}

export default function ChatRoom({
  roomId = "1",
  roomName = "General",
}: ChatRoomProps) {
  const { user } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [showInvite, setShowInvite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!roomId) return;

    // Load initial messages
    const loadMessages = async () => {
      try {
        const data = await getMessages(roomId);
        setMessages(data || []);
      } catch (error) {
        console.error("Error loading messages:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMessages();

    // Subscribe to new messages
    const subscription = subscribeToMessages(roomId, (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [roomId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user) return;

    try {
      await sendMessage(roomId, input.trim());
      setInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-gray-500" />
          <h2 className="font-semibold text-gray-800">{roomName}</h2>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowInvite(true)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Invite Members
        </Button>
      </div>

      <ScrollArea className="flex-1 p-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={{
                  ...message,
                  sender: message.profiles?.username || "Unknown",
                  isCurrentUser: message.user_id === user?.id,
                }}
              />
            ))}
          </AnimatePresence>
        )}
      </ScrollArea>

      <form
        onSubmit={handleSendMessage}
        className="p-4 border-t border-gray-200"
      >
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>

      <InviteDialog
        open={showInvite}
        onOpenChange={setShowInvite}
        roomId={roomId}
      />
    </div>
  );
}
