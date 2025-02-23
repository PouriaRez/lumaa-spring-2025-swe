import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/authServices";

import AuthComponent from "../components/AuthComponent";

const Register = () => {
  const [error, setError] = useState("");
  const nav = useNavigate();

  const handleAccountCreation = async (username: string, password: string) => {
    if (!username || !password) {
      setError("Username and password are required.");
      return;
    }

    try {
      await register(username, password);
      nav("/");
    } catch (err) {
      setError("Username already exists");
      console.error(err);
    }
  };

  const handleRedirectLogin = () => {
    nav("/login");
  };

  return (
    <>
      <div className="bg-gray-500/20 rounded-md h-130">
        <AuthComponent
          title="Register"
          onSubmit={handleAccountCreation}
          err={error}
        />
        <button
          className=" -m-5 bg-gradient-to-r from-cyan-500 to-teal-400 text-black"
          onClick={handleRedirectLogin}
        >
          Already have an account?
        </button>
      </div>
    </>
  );
};

export default Register;
