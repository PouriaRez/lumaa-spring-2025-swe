import { useState } from "react";
import React from "react";

interface AuthProps {
  title: string;
  onSubmit: (username: string, password: string) => Promise<void>;
  err?: string;
}

const AuthComponent = ({ title, onSubmit, err }: AuthProps) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(username, password);
  };

  return (
    <>
      <div className="p-5">
        <p className="font-bold text-white text-3xl p-5">{title}</p>
        <form className="flex flex-col m-5" onSubmit={handleSubmit}>
          <input
            className="w-100 h-20 text-2xl p-2"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="w-100 h-20 text-2xl p-2"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {err && <p className="text-red-500">{err}</p>}
          <button
            className="bg-gradient-to-r from-cyan-500 to-teal-400 text-black m-4 mt-10"
            type="submit"
          >
            {title}
          </button>
        </form>
      </div>
    </>
  );
};

export default AuthComponent;
