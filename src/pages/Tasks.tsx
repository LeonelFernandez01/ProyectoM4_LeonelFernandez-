import { useState, useEffect } from "react";
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

  // Estados de Email
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "success" | "error">("idle");

  // Estado del Tema (Oscuro/Claro)
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // Estados de Búsqueda y Filtros
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "completed">("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | "low" | "medium" | "high">("all");
  const [sortBy, setSortBy] = useState<"dateCreated" | "dueDate" | "priority">("dateCreated");

  // Aplicar tema en el documento
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

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

    // Construir un resumen detallado con prioridades, categorías y fechas de vencimiento
    const summaryLines = tasks.map(t => {
      const statusIcon = t.completed ? "✅ [Completada]" : "⏳ [Pendiente]";
      const priorityText = t.priority ? ` - Prioridad: ${t.priority.toUpperCase()}` : "";
      const categoryText = t.category ? ` (Cat: ${t.category})` : "";
      const dueText = t.dueDate ? ` - Vence: ${t.dueDate}` : "";
      const desc = t.description ? `: ${t.description}` : "";
      
      return `${statusIcon} ${t.title}${desc}${priorityText}${categoryText}${dueText}`;
    });

    const summary = `Hola ${user.displayName || user.email},\n\nAquí tienes el resumen estratégico de tus tareas:\n\n${summaryLines.join("\n")}\n\n¡Que tengas un excelente día!\nGestor de Tareas`;

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

  // Lógica de Estadísticas
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed).length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Parámetros para el anillo de progreso circular SVG
  const radius = 28;
  const strokeWidth = 5;
  const normalizedRadius = radius - strokeWidth;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (completionRate / 100) * circumference;

  // Filtrado y Ordenamiento de tareas en el cliente
  const filteredTasks = tasks
    .filter(t => {
      const matchesSearch =
        t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (t.category && t.category.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "completed" && t.completed) ||
        (statusFilter === "pending" && !t.completed);

      const matchesPriority =
        priorityFilter === "all" ||
        t.priority === priorityFilter ||
        (priorityFilter === "medium" && !t.priority); // Default a medium

      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      if (sortBy === "dateCreated") {
        return b.createdAt - a.createdAt; // Más nuevas primero
      }
      
      if (sortBy === "dueDate") {
        if (!a.dueDate) return 1; // Tareas sin fecha van al final
        if (!b.dueDate) return -1;
        return a.dueDate.localeCompare(b.dueDate); // Más cercanas primero
      }

      if (sortBy === "priority") {
        const priorityWeight = { high: 3, medium: 2, low: 1 };
        const weightA = priorityWeight[a.priority || "medium"];
        const weightB = priorityWeight[b.priority || "medium"];
        return weightB - weightA; // Alta a Baja
      }

      return 0;
    });

  return (
    <div className="app-container">
      {/* NAVBAR STICKY */}
      <nav className="tasks-navbar">
        <h1 className="nav-logo">Gestor Estratégico</h1>
        <div className="nav-actions">
          {user?.email && (
            <span className="user-info">
              👤 {user.displayName || user.email}
            </span>
          )}
          
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title="Cambiar tema"
            aria-label="Cambiar tema"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          
          <button onClick={handleSendEmail} disabled={emailLoading} className="btn btn-secondary btn-sm">
            {emailLoading ? "Enviando..." : "📧 Resumen"}
          </button>
          
          <button onClick={handleLogout} className="btn btn-primary btn-sm">
            Cerrar sesión
          </button>
        </div>
      </nav>

      <div className="tasks-layout">
        {/* ALERTAS DE EMAIL */}
        {emailStatus === "success" && (
          <div className="alert alert-success">
            <span>✅</span> Resumen de tareas enviado con éxito a tu email!
          </div>
        )}
        {emailStatus === "error" && (
          <div className="alert alert-error">
            <span>❌</span> Ocurrió un error al enviar el email. Verifica tus credenciales.
          </div>
        )}

        {/* DASHBOARD DE ESTADÍSTICAS */}
        <section className="dashboard-grid">
          <div className="stat-card progress-card">
            <div className="progress-info">
              <span className="stat-label">Progreso Total</span>
              <span className="stat-value">{completionRate}%</span>
            </div>
            <div className="progress-ring-container">
              <svg height={radius * 2} width={radius * 2}>
                <circle
                  stroke="var(--border)"
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                />
                <circle
                  stroke="var(--success)"
                  fill="transparent"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference + " " + circumference}
                  style={{ strokeDashoffset }}
                  r={normalizedRadius}
                  cx={radius}
                  cy={radius}
                  className="progress-ring-circle"
                />
              </svg>
              <div className="progress-text" style={{ color: "var(--text)" }}>🎯</div>
            </div>
          </div>

          <div className="stat-card">
            <span className="stat-label">Creadas</span>
            <span className="stat-value">{totalTasks}</span>
          </div>

          <div className="stat-card pending">
            <span className="stat-label">Pendientes</span>
            <span className="stat-value">{pendingTasks}</span>
          </div>

          <div className="stat-card completed">
            <span className="stat-label">Completadas</span>
            <span className="stat-value">{completedTasks}</span>
          </div>
        </section>

        {/* FORMULARIO DE AGREGAR TAREA */}
        <TodoForm onAdd={addTask} />

        {/* BARRA DE BÚSQUEDA Y FILTRADO */}
        <section className="toolbar">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Buscar por título, descripción o etiqueta..."
              className="search-input"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-actions">
            <select
              className="filter-select"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as any)}
            >
              <option value="all">Todos los estados</option>
              <option value="pending">Pendientes ⏳</option>
              <option value="completed">Completadas ✅</option>
            </select>

            <select
              className="filter-select"
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value as any)}
            >
              <option value="all">Todas las prioridades</option>
              <option value="low">Prioridad Baja 🔵</option>
              <option value="medium">Prioridad Media 🟡</option>
              <option value="high">Prioridad Alta 🔴</option>
            </select>

            <select
              className="filter-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
            >
              <option value="dateCreated">Más recientes primero 📅</option>
              <option value="dueDate">Fecha de vencimiento ⌛</option>
              <option value="priority">Mayor prioridad primero ⚡</option>
            </select>
          </div>
        </section>

        {/* LISTADO DE TAREAS */}
        {loading ? (
          <div className="empty-state">
            <p>Cargando tus tareas estratégicas...</p>
          </div>
        ) : (
          <TodoList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={removeTask}
            onEdit={editTask}
          />
        )}
      </div>
    </div>
  );
};