import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";
import app from "../../firebaseConfig";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("Login successful: ", user);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error: ", error.message);
        alert("Invalid credentials. Please try again.");
      });
  };
  const handleRegisterClick = () => {
    setIsRegisterOpen(true);
  };

  return (
    <div className="login-container">
      {/* <button onClick={() => navigate("/register")} className="register-link">
        Register Here
      </button> */}
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-title">Admin Login</h2>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <div className="register-link-container">
        <p>
          {/* Don't have an account?{" "} */}
          <button
            onClick={() => navigate("/register")}
            className="register-button"
          >
            Register Here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
