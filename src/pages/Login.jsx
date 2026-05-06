import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    const savedUsername = localStorage.getItem("username");
    const savedPassword = localStorage.getItem("password");

    if (!savedUsername || !savedPassword) {
      setMessage("No account found. Please register first.");
      return;
    }

    if (username === savedUsername && password === savedPassword) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/game");
    } else {
      setMessage("Wrong username or password.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>

        <p className="login-text">
          Enter your details to play the Joke Guess Game.
        </p>

        <form onSubmit={handleLogin}>
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

          <button type="submit">Login</button>
        </form>

        {message && <p className="error-message">{message}</p>}

        <p className="register-link">
          Do not have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;