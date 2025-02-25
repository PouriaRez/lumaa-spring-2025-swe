import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authServices";
import React from "react";
import AuthComponent from "../components/AuthComponent";

const Login = () => {
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handleLogin = async (username: string, password: string) => {
    try {
      await login(username, password);
      nav("/");
    } catch (err) {
      setErr("Invalid username or password.");
      console.error(err);
    }
  };

  const handleRedirectRegister = () => {
    nav("/register");
  };

  return (
    <>
      <div className="bg-gray-500/20 rounded-md h-130">
        <AuthComponent title="Login" onSubmit={handleLogin} err={err} />
        <button
          className=" -m-5 bg-gradient-to-r from-cyan-500 to-teal-400 text-black"
          onClick={handleRedirectRegister}
        >
          Create an Account
        </button>
      </div>
    </>
  );
};

export default Login;
