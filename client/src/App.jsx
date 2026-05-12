import { useState } from "react";

import Login from "./pages/Login";
import Chat from "./pages/Chat";

import "./App.css";

function App() {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch {
      return null;
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("messages");
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-500 text-white">
      {user ? (
        <Chat user={user} onLogout={handleLogout} />
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
}

export default App;
