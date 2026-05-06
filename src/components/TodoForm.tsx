import { useState } from "react";

interface Props { onAdd: (title: string, description: string) => void; }

export const TodoForm = ({ onAdd }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input className="input" placeholder="Título de la tarea"
        value={title} onChange={e => setTitle(e.target.value)} />
      <input className="input" placeholder="Descripción"
        value={description} onChange={e => setDescription(e.target.value)} />
      <button type="submit" className="btn btn-primary">Agregar</button>
    </form>
  );
};