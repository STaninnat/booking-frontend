import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiFunctions from "../ApiFunctions";
import "./SignAuth.css";

function SignUpAuth() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const clearMessages = () => {
    setError("");
    setSuccessMessage("");
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    const requestBody = {
      firstname: firstName,
      lastname: lastName,
      username,
      email,
      password,
    };

    await ApiFunctions.handleCreateUserSubmit(
      requestBody,
      setSuccessMessage,
      setError,
      navigate
    );
  };

  return (
    <div className="signup-content">
      <h2>Sign Up</h2>
      <p>Join us by creating an account</p>
      <form className="form-container" onSubmit={handleCreateSubmit}>
        <div className="form-elements">
          <h3>First Name:</h3>
          <input
            type="text"
            name="firstname"
            placeholder="first name"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              clearMessages();
            }}
            required
          />
        </div>
        <div className="form-elements">
          <h3>Last Name:</h3>
          <input
            type="text"
            name="lastname"
            placeholder="last name"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              clearMessages();
            }}
            required
          />
        </div>
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
          <h3>Email:</h3>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
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

        <div className="terms-conditions">
          <input
            type="checkbox"
            checked={termsChecked}
            onChange={() => {
              setTermsChecked(!termsChecked);
              clearMessages();
            }}
          />
          <span>
            I agree to the <a href="#">Terms of Service</a>,{" "}
            <a href="#">Conditions</a> and <a href="#">Privacy Policy</a>.
          </span>
        </div>

        <div className="form-create-message">
          {error && <p className="error-message">{error}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={
            !firstName || !lastName || !username || !password || !termsChecked
          }
        >
          Create account
        </button>
      </form>
    </div>
  );
}
export default SignUpAuth;
