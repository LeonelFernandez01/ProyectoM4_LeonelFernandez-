//este archivo se encarga de proteger las rutas que requieren autenticación, este componente verifica si el usuario está autenticado, si el usuario está autenticado renderiza el componente hijo, si el usuario no está autenticado redirige al usuario a la página de inicio de sesión, este componente es utilizado en el archivo App.tsx para proteger las rutas que requieren autenticación.
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
//esta función es un componente de orden superior que recibe un componente hijo como prop, este componente verifica si el usuario está autenticado, si el usuario está autenticado renderiza el componente hijo, si el usuario no está autenticado redirige al usuario a la página de inicio de sesión, este componente es utilizado en el archivo App.tsx para proteger las rutas que requieren autenticación.
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  if (loading) return <p>Cargando...</p>;
  return user ? children : <Navigate to="/login" />;
};