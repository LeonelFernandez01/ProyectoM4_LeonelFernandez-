import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, loginWithGoogle } from "../services/authService";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate("/tasks");
    } catch {
      setError("Email o contraseña incorrectos");
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate("/tasks");
    } catch {
      setError("Error al iniciar con Google");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Bienvenido</h2>
        <p className="auth-subtitle">Iniciá sesión para ver tus tareas</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleLogin}>
          <input className="input" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)} />
          <input className="input" placeholder="Contraseña" type="password"
            value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="btn btn-primary">Entrar</button>
        </form>
        <button onClick={handleGoogle} className="btn btn-secondary">
          Entrar con Google
        </button>
        <div className="auth-link">
          ¿No tenés cuenta? <Link to="/register">Registrate</Link>
        </div>
      </div>
    </div>
  );
};