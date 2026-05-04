//este archivo se encarga de mostrar la lista de tareas del usuario, este componente utiliza el hook useTasks para obtener las tareas del usuario, este componente también permite agregar, editar, eliminar y marcar como completada una tarea, este componente también permite enviar un resumen de las tareas por correo electrónico y cerrar sesión, este componente es utilizado en el archivo App.tsx para mostrar la página de tareas protegida por autenticación.
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import { logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
//este componente muestra la lista de tareas del usuario, este componente utiliza el hook useTasks para obtener las tareas del usuario, este componente también permite agregar, editar, eliminar y marcar como completada una tarea, este componente también permite enviar un resumen de las tareas por correo electrónico y cerrar sesión, este componente es utilizado en el archivo App.tsx para mostrar la página de tareas protegida por autenticación.
export const Tasks = () => {
  const { user } = useAuth();
  const { tasks, loading, addTask, toggleTask, editTask, removeTask } = useTasks(user?.uid);
  const navigate = useNavigate();
  //esta función se encarga de cerrar sesión, esta función es utilizada en el componente Header para cerrar sesión, esta función utiliza el servicio de autenticación de Firebase para cerrar sesión.
  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };
//esta función se encarga de enviar un resumen de las tareas por correo electrónico, esta función es utilizada en el componente Header para enviar un resumen de las tareas por correo electrónico, esta función utiliza la API de envío de correos electrónicos para enviar el resumen de las tareas al correo electrónico del usuario.
  const handleSendEmail = async () => {
    const summary = tasks.map(t =>
      `${t.completed ? "✅" : "⏳"} ${t.title}`).join("\n");
    await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: user?.email, summary }),
    });
    alert("Email enviado!");
  };
//este componente muestra la lista de tareas del usuario, este componente utiliza el hook useTasks para obtener las tareas del usuario, este componente también permite agregar, editar, eliminar y marcar como completada una tarea, este componente también permite enviar un resumen de las tareas por correo electrónico y cerrar sesión, este componente es utilizado en el archivo App.tsx para mostrar la página de tareas protegida por autenticación.
  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2>Mis Tareas</h2>
        <div>
          <button onClick={handleSendEmail} style={{ marginRight: 8 }}>📧 Enviar resumen</button>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>
      <TodoForm onAdd={addTask} />
      {loading ? <p>Cargando...</p> : (
        <TodoList tasks={tasks} onToggle={toggleTask}
          onDelete={removeTask} onEdit={editTask} />
      )}
    </div>
  );
};
