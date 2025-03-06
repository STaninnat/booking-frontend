import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiFunctions from "../ApiFunctions";
import "./SignAuth.css";

function SigninAuth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const clearMessages = () => {
    setError("");
    setSuccessMessage("");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const requestBody = {
      username,
      password,
    };

    await ApiFunctions.handleLoginSubmit(
      requestBody,
      setSuccessMessage,
      setError,
      navigate
    );
  };

  return (
    <div className="signin-content">
      <h2>Sign In</h2>
      <p className="custom-paragraph">
        Welcome! Sign in to begin booking
        <br />
        and enjoy the best experience.
      </p>
      <form className="form-container" onSubmit={handleLoginSubmit}>
        <div className="form-elements">
          <h3>Username:</h3>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              clearMessages();
            }}
            required
          />
        </div>

        <div className="form-elements">
          <h3>Password:</h3>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              clearMessages();
            }}
            required
          />
        </div>

        <div className="rememberme-conditions">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => {
              setRememberMe(e.target.checked);
            }}
          />
          <span>Remember me?</span>
        </div>

        <div className="form-create-message">
          {error && <p className="error-message">{error}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </div>

        <button type="submit" disabled={!username || !password}>
          Sign In
        </button>
      </form>
    </div>
  );
}

export default SigninAuth;
