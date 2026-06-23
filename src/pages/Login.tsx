import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, loginWithGoogle } from "../services/authService";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Cargar el tema guardado en localstorage para coherencia visual
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const themeToApply = saved === "light" || saved === "dark" 
      ? saved 
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", themeToApply);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Por favor completa todos los campos");
      return;
    }
    try {
      await loginUser(email, password);
      navigate("/tasks");
    } catch (err) {
      setError("Email o contraseña incorrectos");
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate("/tasks");
    } catch (err) {
      setError("Error al iniciar con Google");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">Gestor Estratégico</div>
          <h2 className="auth-title">¡Bienvenido de nuevo!</h2>
          <p className="auth-subtitle">Inicia sesión para gestionar tus tareas diarias</p>
        </div>

        {error && (
          <div className="alert alert-error">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label className="input-label">Correo Electrónico</label>
            <input
              type="email"
              className="input"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="input-label">Contraseña</label>
            <input
              className="input"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ marginTop: 8 }}>
            Entrar
          </button>
        </form>

        <div className="auth-divider">o continuar con</div>

        <div className="auth-social">
          <button onClick={handleGoogle} className="btn btn-secondary">
            <span>🌐</span> Iniciar con Google
          </button>
        </div>

        <div className="auth-link">
          ¿No tienes una cuenta? <Link to="/register">Regístrate gratis</Link>
        </div>
      </div>
    </div>
  );
};