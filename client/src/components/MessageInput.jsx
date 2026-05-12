import React from "react";
import { useState } from "react";
import { socket } from "../services/socket";

const MessageInput = ({ user }) => {
  const [text, setText] = useState("");
  const sendMessage = () => {
    if (!text) {
      return;
    }

    socket.emit("message:send", {
      text,
      username: user.username,
    });

    setText("");
  };

  const handleTyping = (e) => {
    setText(e.target.value);

    socket.emit("typing:start", user.username);

    setTimeout(() => {
      socket.emit("typing:stop");
    }, 1000);
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Type message..."
        value={text}
        onChange={handleTyping}
        className="flex-1 bg-gray-900 border border-gray-700 rounded-xl p-3"
      />

      <button
        onClick={sendMessage}
        className="bg-blue-500 hover:bg-blue-600 font-semibold px-5 rounded-xl"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
