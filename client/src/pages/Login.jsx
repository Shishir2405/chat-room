import React from "react";
import { useState } from "react";
import api from "../services/api";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");

  const login = async () => {
    if (!username) {
      return;
    }

    try {
      const res = await api.post("/login", {
        username,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-4 text-center">Login</h1>

        <div className="bg-gray-800 p-6 flex flex-col w-[400px] rounded-xl shadow-2xl">
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-500/20 border border-gray-700 mb-4"
          />
          <button
            onClick={login}
            className="w-full h-10 bg-blue-600 hover:bg-blue-700 font-semibold rounded-2xl"
          >
            Login Now
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
