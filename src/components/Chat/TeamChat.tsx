import React, { useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatRoom from "./ChatRoom";

export default function TeamChat() {
  const [selectedRoomId, setSelectedRoomId] = useState("1");

  return (
    <div className="flex bg-white rounded-lg shadow-lg overflow-hidden">
      <ChatSidebar
        selectedRoomId={selectedRoomId}
        onRoomSelect={setSelectedRoomId}
      />
      <div className="flex-1">
        <ChatRoom
          roomId={selectedRoomId}
          roomName={selectedRoomId === "1" ? "General" : "Chat Room"}
        />
      </div>
    </div>
  );
}
