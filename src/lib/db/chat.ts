import { supabase } from "../supabase";

export interface ChatMessage {
  id: string;
  text: string;
  sender_id: string;
  room_id: string;
  created_at: string;
}

export interface ChatRoom {
  id: string;
  name: string;
  created_by: string;
  created_at: string;
}

export interface ChatMember {
  room_id: string;
  user_id: string;
  joined_at: string;
}

export async function createRoom(name: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  // First create the room
  const { data: room, error: roomError } = await supabase
    .from("chat_rooms")
    .insert([{ name, created_by: user.id }])
    .select()
    .single();

  if (roomError) throw roomError;

  // Then add the creator as a member
  const { error: memberError } = await supabase
    .from("chat_members")
    .insert([{ room_id: room.id, user_id: user.id }]);

  if (memberError) throw memberError;

  return room;

  const { data, error } = await supabase
    .from("chat_rooms")
    .insert([{ name }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getRooms() {
  const { data, error } = await supabase
    .from("chat_rooms")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getMessages(roomId: string) {
  const { data, error } = await supabase
    .from("chat_messages")
    .select(
      `
      *,
      profiles:user_id (username, avatar_url)
    `,
    )
    .eq("room_id", roomId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

export async function sendMessage(roomId: string, text: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("chat_messages")
    .insert([{ room_id: roomId, text }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function inviteToRoom(roomId: string, email: string) {
  // First get user by email
  const { data: user, error: userError } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single();

  if (userError) throw userError;

  // Then add them to room
  const { error } = await supabase
    .from("chat_members")
    .insert([{ room_id: roomId, user_id: user.id }]);

  if (error) throw error;
}

export function subscribeToMessages(
  roomId: string,
  callback: (message: ChatMessage) => void,
) {
  return supabase
    .channel(`room:${roomId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "chat_messages",
        filter: `room_id=eq.${roomId}`,
      },
      (payload) => {
        callback(payload.new as ChatMessage);
      },
    )
    .subscribe();
}

export function subscribeToRooms(callback: (room: ChatRoom) => void) {
  return supabase
    .channel("rooms")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "chat_rooms",
      },
      (payload) => {
        callback(payload.new as ChatRoom);
      },
    )
    .subscribe();
}
