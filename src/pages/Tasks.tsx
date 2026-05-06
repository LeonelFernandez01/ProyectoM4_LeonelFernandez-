import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useTasks } from "../hooks/useTasks";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import { logoutUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

export const Tasks = () => {
  const { user } = useAuth();
  const { tasks, loading, addTask, toggleTask, editTask, removeTask } = useTasks(user?.uid);
  const navigate = useNavigate();
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "success" | "error">("idle");

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  const handleSendEmail = async () => {
    if (!user?.email) return;
    if (tasks.length === 0) {
      alert("No tenés tareas para enviar!");
      return;
    }
    setEmailLoading(true);
    setEmailStatus("idle");
    const summary = tasks.map(t =>
      `${t.completed ? "✅" : "⏳"} ${t.title}: ${t.description}`
    ).join("\n");
    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user.email, summary }),
      });
      if (!res.ok) throw new Error("Error en el servidor");
      setEmailStatus("success");
      setTimeout(() => setEmailStatus("idle"), 3000);
    } catch {
      setEmailStatus("error");
      setTimeout(() => setEmailStatus("idle"), 3000);
    } finally {
      setEmailLoading(false);
    }
  };

 return (
    <div className="tasks-container">
      <div className="tasks-header">
        <h2 className="tasks-title">Mis Tareas</h2>
        <div className="tasks-actions">
          <button onClick={handleSendEmail} disabled={emailLoading}
            className="btn btn-secondary btn-sm">
            {emailLoading ? "Enviando..." : "📧 Resumen"}
          </button>
          <button onClick={handleLogout} className="btn btn-primary btn-sm">
            Cerrar sesión
          </button>
        </div>
      </div>
      {emailStatus === "success" && <div className="alert alert-success">✅ Email enviado!</div>}
      {emailStatus === "error" && <div className="alert alert-error">❌ Error al enviar!</div>}
      <TodoForm onAdd={addTask} />
      {loading ? <p>Cargando...</p> : (
        <TodoList tasks={tasks} onToggle={toggleTask}
          onDelete={removeTask} onEdit={editTask} />
      )}
    </div>
  );
};