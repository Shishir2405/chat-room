import React, { useState, useEffect } from "react";
import api from "../services/api";
import { socket } from "../services/socket";
import MessageInput from "../components/MessageInput";
import MessageList from "../components/MessageList";
import TypingIndicator from "../components/TypingIndicator";

const Chat = ({ user, onLogout }) => {
  const [messages, setMessages] = useState(() => {
    try {
      const storedMessage = localStorage.getItem("messages");
      return storedMessage ? JSON.parse(storedMessage) : [];
    } catch {
      return [];
    }
  });
  const [typing, setTyping] = useState("");

  useEffect(() => {
    socket.connect();

    const handleNewMessage = (message) => {
      setMessages((prev) => {
        const updated = [...prev, message];
        localStorage.setItem("messages", JSON.stringify(updated));
        return updated;
      });
    };

    const handleTypingStart = (username) => {
      setTyping(`${username} is typing...`);
    };

    const handleTypingStop = () => {
      setTyping("");
    };

    socket.on("message:new", handleNewMessage);
    socket.on("typing:start", handleTypingStart);
    socket.on("typing:stop", handleTypingStop);

    fetchMessages();

    return () => {
      socket.off("message:new", handleNewMessage);
      socket.off("typing:start", handleTypingStart);
      socket.off("typing:stop", handleTypingStop);
      socket.disconnect();
    };
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get("/messages?limit=20");
      setMessages(res.data);
      localStorage.setItem("messages", JSON.stringify(res.data));
    } catch (err) {
      console.log("Failed to fetch messages", err);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4 gap-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Chat Room</h1>
        <button
          onClick={onLogout}
          className="text-sm text-gray-300 hover:text-white"
        >
          Logout
        </button>
      </div>

      <p className="text-gray-300">Welcome {user.username}</p>

      <MessageList messages={messages} />

      <TypingIndicator typing={typing} />

      <MessageInput user={user} />
    </div>
  );
};

export default Chat;
