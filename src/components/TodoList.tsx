import type { Task } from "../types";
import { TodoItem } from "./TodoItem";

interface Props {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
}

export const TodoList = ({ tasks, onToggle, onDelete, onEdit }: Props) => {
  if (tasks.length === 0) return (
    <div className="empty-state">
      <p>No tenés tareas todavía. ¡Agregá una!</p>
    </div>
  );
  return (
    <div>
      {tasks.map(task => (
        <TodoItem key={task.id} task={task}
          onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};