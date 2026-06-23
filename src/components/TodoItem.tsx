import { useState } from "react";
import type { Task } from "../types";

interface Props {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
  onEdit: (
    id: string,
    title: string,
    description: string,
    priority?: 'low' | 'medium' | 'high',
    category?: string,
    dueDate?: string
  ) => void;
}

export const TodoItem = ({ task, onToggle, onDelete, onEdit }: Props) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(task.priority || "medium");
  const [category, setCategory] = useState(task.category || "");
  const [dueDate, setDueDate] = useState(task.dueDate || "");

  const handleEdit = () => {
    onEdit(task.id, title, description, priority, category.trim() || undefined, dueDate || undefined);
    setEditing(false);
  };

  const getDueDateInfo = (dateStr: string | undefined) => {
    if (!dateStr) return null;
    const todayStr = new Date().toISOString().split("T")[0];
    if (dateStr === todayStr) {
      return { label: "📅 Hoy", className: "badge-date today" };
    }
    if (dateStr < todayStr) {
      return { label: `⚠️ Vencido (${dateStr})`, className: "badge-date overdue" };
    }
    return { label: `📅 Vence: ${dateStr}`, className: "badge-date" };
  };

  const dateInfo = getDueDateInfo(task.dueDate);

  const getPriorityLabel = (p?: 'low' | 'medium' | 'high') => {
    switch (p) {
      case 'low': return { label: 'Baja', className: 'badge badge-priority-low' };
      case 'high': return { label: 'Alta', className: 'badge badge-priority-high' };
      case 'medium':
      default:
        return { label: 'Media', className: 'badge badge-priority-medium' };
    }
  };

  const priorityInfo = getPriorityLabel(task.priority);

  return (
    <div className={`task-item priority-${task.priority || 'medium'}`}>
      {editing ? (
        <div className="task-edit-inputs">
          <div className="input-group" style={{ marginBottom: 8 }}>
            <label className="input-label" style={{ fontSize: '0.75rem' }}>Título</label>
            <input className="input" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div className="input-group" style={{ marginBottom: 8 }}>
            <label className="input-label" style={{ fontSize: '0.75rem' }}>Descripción</label>
            <input className="input" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          
          <div className="task-edit-grid">
            <div className="input-group" style={{ margin: 0 }}>
              <label className="input-label" style={{ fontSize: '0.75rem' }}>Prioridad</label>
              <select
                className="input select"
                value={priority}
                onChange={e => setPriority(e.target.value as 'low' | 'medium' | 'high')}
                style={{ padding: '8px 12px' }}
              >
                <option value="low">Baja 🔵</option>
                <option value="medium">Media 🟡</option>
                <option value="high">Alta 🔴</option>
              </select>
            </div>

            <div className="input-group" style={{ margin: 0 }}>
              <label className="input-label" style={{ fontSize: '0.75rem' }}>Categoría</label>
              <input
                className="input"
                value={category}
                onChange={e => setCategory(e.target.value)}
                placeholder="Ej: Trabajo"
                style={{ padding: '8px 12px' }}
              />
            </div>

            <div className="input-group" style={{ margin: 0 }}>
              <label className="input-label" style={{ fontSize: '0.75rem' }}>Vencimiento</label>
              <input
                type="date"
                className="input"
                value={dueDate}
                onChange={e => setDueDate(e.target.value)}
                style={{ padding: '8px 12px' }}
              />
            </div>
          </div>

          <div className="task-buttons" style={{ marginLeft: 0, marginTop: 12 }}>
            <button className="btn btn-primary btn-sm" onClick={handleEdit}>Guardar</button>
            <button className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}>Cancelar</button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-item-header">
            <label className="task-checkbox-container">
              <input
                type="checkbox"
                className="task-checkbox"
                checked={task.completed}
                onChange={() => onToggle(task)}
              />
              <span className="custom-checkbox"></span>
            </label>
            
            <div className="task-title-wrapper">
              <span className={`task-title ${task.completed ? "completed" : ""}`}>
                {task.title}
              </span>
              
              <div className="task-meta-row">
                <span className={priorityInfo.className}>
                  {priorityInfo.label}
                </span>
                
                {task.category && (
                  <span className="badge badge-category">
                    🏷️ {task.category}
                  </span>
                )}
                
                {dateInfo && (
                  <span className={dateInfo.className}>
                    {dateInfo.label}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
          
          <div className="task-actions">
            <button className="btn btn-secondary btn-sm" onClick={() => setEditing(true)}>
              ✏️ Editar
            </button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(task.id)}>
              🗑️ Eliminar
            </button>
          </div>
        </>
      )}
    </div>
  );
};