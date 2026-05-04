//este componente se encarga de mostrar la lista de tareas del usuario, este componente recibe las tareas del usuario como props y también recibe funciones para marcar una tarea como completada, eliminar una tarea y editar una tarea, este componente utiliza el componente TodoItem para mostrar cada tarea individualmente, si no hay tareas para mostrar, este componente muestra un mensaje indicando que no hay tareas todavía.
import { TodoItem } from "./TodoItem";
import type { Task } from "../types";
interface Props {
  tasks: Task[];
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
}
//este componente se encarga de mostrar la lista de tareas del usuario, este componente recibe las tareas del usuario como props y también recibe funciones para marcar una tarea como completada, eliminar una tarea y editar una tarea, este componente utiliza el componente TodoItem para mostrar cada tarea individualmente, si no hay tareas para mostrar, este componente muestra un mensaje indicando que no hay tareas todavía.
export const TodoList = ({ tasks, onToggle, onDelete, onEdit }: Props) => {
  if (tasks.length === 0) return <p>No tenés tareas todavía.</p>;
  return (
    <div>
      {tasks.map(task => (
        <TodoItem key={task.id} task={task}
          onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      ))}
    </div>
  );
};