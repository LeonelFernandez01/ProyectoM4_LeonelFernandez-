//este archivo se encarga de mostrar la página de registro, este componente permite al usuario registrarse con su email y contraseña, este componente también muestra un enlace para ir a la página de inicio de sesión, este componente es utilizado en el archivo App.tsx para mostrar la página de registro.
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
//este componente muestra la página de registro, este componente permite al usuario registrarse con su email y contraseña, este componente también muestra un enlace para ir a la página de inicio de sesión, este componente es utilizado en el archivo App.tsx para mostrar la página de registro.
export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
//esta función se encarga de registrar un nuevo usuario, esta función es utilizada en el componente Register para registrar un nuevo usuario, esta función utiliza el correo electrónico y la contraseña del usuario para registrarse en el servicio de autenticación de Firebase, si el registro es exitoso redirige al usuario a la página de tareas, si el registro falla muestra un mensaje de error.
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      navigate("/tasks");
    } catch {
      setError("Error al registrarse. Probá con otro email.");
    }
  };
//este componente muestra la página de registro, este componente permite al usuario registrarse con su email y contraseña, este componente también muestra un enlace para ir a la página de inicio de sesión, este componente es utilizado en el archivo App.tsx para mostrar la página de registro.
  return (
    <div style={{ maxWidth: 400, margin: "100px auto", padding: 24 }}>
      <h2>Registrarse</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} style={{ display: "block", width: "100%", marginBottom: 8 }} />
        <input placeholder="Contraseña" type="password" value={password}
          onChange={e => setPassword(e.target.value)} style={{ display: "block", width: "100%", marginBottom: 8 }} />
        <button type="submit" style={{ width: "100%" }}>Registrarse</button>
      </form>
      <p>¿Ya tenés cuenta? <Link to="/login">Iniciá sesión</Link></p>
    </div>
  );
};