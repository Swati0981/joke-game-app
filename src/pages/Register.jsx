import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();

    if (username.trim() === "") {
      setMessage("Username is required.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    if (!password.includes("@") && !password.includes("#") && !password.includes("!")) {
      setMessage("Password must contain at least one symbol: @, #, or !");
      return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    setMessage("Registration successful!");

    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Create Account</h1>

        <p className="register-text">
          Register first to play the Joke Guess Game.
        </p>

        <form onSubmit={handleRegister}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <p className="password-info">
            Password must be at least 8 characters and contain @, #, or !
          </p>

          <button type="submit">Register</button>
        </form>

        {message && <p className="message">{message}</p>}

        <p className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;