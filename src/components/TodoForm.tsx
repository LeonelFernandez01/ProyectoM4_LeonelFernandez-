import { useState } from "react";

interface Props {
  onAdd: (
    title: string,
    description: string,
    priority?: 'low' | 'medium' | 'high',
    category?: string,
    dueDate?: string
  ) => void;
}

export const TodoForm = ({ onAdd }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>("medium");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, description, priority, category.trim() || undefined, dueDate || undefined);
    setTitle("");
    setDescription("");
    setPriority("medium");
    setCategory("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <div className="form-row-main">
        <input
          className="input"
          placeholder="Título de la tarea..."
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          className="input"
          placeholder="Descripción (opcional)..."
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>
      <div className="form-row-details">
        <div className="input-group" style={{ margin: 0 }}>
          <label className="input-label" style={{ fontSize: '0.75rem' }}>Prioridad</label>
          <select
            className="input select"
            value={priority}
            onChange={e => setPriority(e.target.value as 'low' | 'medium' | 'high')}
            style={{ padding: '10px 14px' }}
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
            placeholder="Ej: Trabajo"
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{ padding: '10px 14px' }}
          />
        </div>

        <div className="input-group" style={{ margin: 0 }}>
          <label className="input-label" style={{ fontSize: '0.75rem' }}>Vence el</label>
          <input
            type="date"
            className="input"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            style={{ padding: '10px 14px' }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          <span>+</span> Agregar
        </button>
      </div>
    </form>
  );
};