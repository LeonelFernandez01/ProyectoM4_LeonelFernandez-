import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      navigate("/tasks");
    } catch {
      setError("Error al registrarse. Probá con otro email.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Crear cuenta</h2>
        <p className="auth-subtitle">Registrate para empezar a gestionar tus tareas</p>
        {error && <div className="alert alert-error">{error}</div>}
        <form onSubmit={handleRegister}>
          <input className="input" placeholder="Email" value={email}
            onChange={e => setEmail(e.target.value)} />
          <input className="input" placeholder="Contraseña" type="password"
            value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit" className="btn btn-primary">Registrarse</button>
        </form>
        <div className="auth-link">
          ¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link>
        </div>
      </div>
    </div>
  );
};