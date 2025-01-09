import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import { Button, Input, Text } from "@mantine/core";
import "./LoginForm.css"; // Import the custom CSS file

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // State to store error message
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset any previous errors before attempting login
    try {
      await login(email, password);
      navigate("/launches");
    } catch (error) {
      setError("Invalid credentials, please try again."); // Set error message if login fails
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="login-form space-y-4 w-full max-w-md"
    >
      <div className="space-y-2">
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input-field"
        />
      </div>
      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-field"
        />
      </div>

      {/* Display error message if there is any */}
      {error && (
        <Text color="red" className="error-message">
          {error}
        </Text>
      )}

      <Button type="submit" className="login-button">
        Login
      </Button>
    </form>
  );
};
