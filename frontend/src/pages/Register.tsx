import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authServices";
import React from "react";
import AuthComponent from "../components/AuthComponent";

const Register = () => {
  const [err, setErr] = useState("");
  const nav = useNavigate();

  const handleAccountCreation = async (username: string, password: string) => {
    try {
      await register(username, password);
      nav("/");
    } catch (err) {
      setErr("Invalid username or password.");
      console.error(err);
    }
  };

  return (
    <>
      <AuthComponent
        title="register"
        onSubmit={handleAccountCreation}
        err={err}
      />
    </>
  );
};

export default Register;
