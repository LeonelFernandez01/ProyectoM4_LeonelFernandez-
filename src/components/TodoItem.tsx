import { useState } from "react";
import type { Task } from "../types";

interface Props {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
}

export const TodoItem = ({ task, onToggle, onDelete, onEdit }: Props) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleEdit = () => {
    onEdit(task.id, title, description);
    setEditing(false);
  };

  return (
    <div className="task-item">
      {editing ? (
        <div className="task-edit-inputs">
          <input className="input" value={title} onChange={e => setTitle(e.target.value)} />
          <input className="input" value={description} onChange={e => setDescription(e.target.value)} />
          <div className="task-buttons">
            <button className="btn btn-primary btn-sm" onClick={handleEdit}>Guardar</button>
            <button className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}>Cancelar</button>
          </div>
        </div>
      ) : (
        <>
          <div className="task-item-header">
            <input type="checkbox" className="task-checkbox"
              checked={task.completed} onChange={() => onToggle(task)} />
            <span className={`task-title ${task.completed ? "completed" : ""}`}>
              {task.title}
            </span>
          </div>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
          <div className="task-buttons">
            <button className="btn btn-secondary btn-sm" onClick={() => setEditing(true)}>Editar</button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(task.id)}>Eliminar</button>
          </div>
        </>
      )}
    </div>
  );
};