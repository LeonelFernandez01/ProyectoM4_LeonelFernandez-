//este archivo se encarga de mostrar la página de inicio de sesión, este componente permite al usuario iniciar sesión con su email y contraseña o con Google, este componente también muestra un enlace para ir a la página de registro, este componente es utilizado en el archivo App.tsx para mostrar la página de inicio de sesión.
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, loginWithGoogle } from "../services/authService";

//este componente muestra la página de inicio de sesión, este componente permite al usuario iniciar sesión con su email y contraseña o con Google, este componente también muestra un enlace para ir a la página de registro, este componente es utilizado en el archivo App.tsx para mostrar la página de inicio de sesión.
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
//esta función se encarga de iniciar sesión con un usuario existente, esta función es utilizada en el componente Login para iniciar sesión con un usuario existente, esta función utiliza el correo electrónico y la contraseña del usuario para iniciar sesión en el servicio de autenticación de Firebase, si el inicio de sesión es exitoso redirige al usuario a la página de tareas, si el inicio de sesión falla muestra un mensaje de error.
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      navigate("/tasks");
    } catch {
      setError("Email o contraseña incorrectos");
    }
  };
//esta función se encarga de iniciar sesión con Google, esta función es utilizada en el componente Login para iniciar sesión con Google, esta función utiliza el proveedor de autenticación de Google para iniciar sesión en el servicio de autenticación de Firebase, si el inicio de sesión es exitoso redirige al usuario a la página de tareas, si el inicio de sesión falla muestra un mensaje de error.
  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      navigate("/tasks");
    } catch {
      setError("Error al iniciar con Google");
    }
  };
 
//este componente muestra la página de inicio de sesión, este componente permite al usuario iniciar sesión con su email y contraseña o con Google, este componente también muestra un enlace para ir a la página de registro, este componente es utilizado en el archivo App.tsx para mostrar la página de inicio de sesión.
  return (
    <div style={{ maxWidth: 400, margin: "100px auto", padding: 24 }}>
      <h2>Iniciar sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} style={{ display: "block", width: "100%", marginBottom: 8 }} />
        <input placeholder="Contraseña" type="password" value={password}
          onChange={e => setPassword(e.target.value)} style={{ display: "block", width: "100%", marginBottom: 8 }} />
        <button type="submit" style={{ width: "100%", marginBottom: 8 }}>Entrar</button>
      </form>
      <button onClick={handleGoogle} style={{ width: "100%", marginBottom: 8 }}>
        Entrar con Google
      </button>
      <p>¿No tenés cuenta? <Link to="/register">Registrate</Link></p>
    </div>
  );
};