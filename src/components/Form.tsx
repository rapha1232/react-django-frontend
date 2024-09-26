import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../styles/Form.css";
type Props = {
  route: string;
  method: string;
};

const Form = (props: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const name = props.method === "login" ? "Login" : "Register";
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post(
        `${import.meta.env.VITE_API_URL}${props.route}`,
        { username, password }
      );
      if (props.method === "login") {
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (e) {
      alert(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="form-input"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="form-input"
      />
      <button type="submit" className="form-button" disabled={loading}>
        {name}
      </button>
      {props.method === "register" ? (
        <>
          <p>Already have an account?</p>
          <a href="/login">Login</a>
        </>
      ) : (
        <>
          <p>Don't have an account?</p>
          <a href="/register">Register</a>
        </>
      )}
    </form>
  );
};

export default Form;
