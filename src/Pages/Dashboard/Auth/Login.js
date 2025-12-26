import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("admin123");

  const handleLogin = (e) => {
    e.preventDefault();

    // TEMP DEMO (Replace with backend auth later)
    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("auth", "true");
      navigate("/dashboard");
    } else {
      alert("Incorrect Email or Password");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>SYSTEM WALLET </h2>
        <p>Please login to continue</p>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>

        <span className="forgot">Forgot Password?</span>
      </form>
    </div>
  );
};

export default Login;
