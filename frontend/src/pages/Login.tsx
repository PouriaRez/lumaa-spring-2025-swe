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
      <AuthComponent title="Login" onSubmit={handleLogin} err={err} />
      <button
        className="mt-3 bg-gradient-to-r from-cyan-500 to-teal-400"
        onClick={handleRedirectRegister}
      >
        Create an Account
      </button>
    </>
  );
};

export default Login;
