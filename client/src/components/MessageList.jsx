import React from "react";

const MessageList = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto space-y-3">
      {messages.map((message) => (
        <div key={message.id} className="bg-gray-900 p-3 rounded-2xl">
          <p className="font-semibold">name : {message.username}</p>
          <p className="text-gray-300">message : {message.text}</p>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
