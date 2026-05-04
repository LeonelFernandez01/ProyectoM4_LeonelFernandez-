//este componente se encarga de mostrar una tarea individualmente, este componente recibe una tarea como props y también recibe funciones para marcar una tarea como completada, eliminar una tarea y editar una tarea, este componente muestra el título y la descripción de la tarea, si la tarea está marcada como completada, el título se muestra con un estilo de tachado, este componente también muestra botones para editar y eliminar la tarea, si el usuario hace clic en el botón de editar, se muestran campos de entrada para editar el título y la descripción de la tarea, si el usuario hace clic en el botón de guardar, se llama a la función onEdit para actualizar la tarea con los nuevos valores ingresados por el usuario.
import { useState } from "react";
import type { Task } from "../types";

//este componente se encarga de mostrar una tarea individualmente, este componente recibe una tarea como props y también recibe funciones para marcar una tarea como completada, eliminar una tarea y editar una tarea, este componente muestra el título y la descripción de la tarea, si la tarea está marcada como completada, el título se muestra con un estilo de tachado, este componente también muestra botones para editar y eliminar la tarea, si el usuario hace clic en el botón de editar, se muestran campos de entrada para editar el título y la descripción de la tarea, si el usuario hace clic en el botón de guardar, se llama a la función onEdit para actualizar la tarea con los nuevos valores ingresados por el usuario.
interface Props {
  task: Task;
  onToggle: (task: Task) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, description: string) => void;
}
//este componente se encarga de mostrar una tarea individualmente, este componente recibe una tarea como props y también recibe funciones para marcar una tarea como completada, eliminar una tarea y editar una tarea, este componente muestra el título y la descripción de la tarea, si la tarea está marcada como completada, el título se muestra con un estilo de tachado, este componente también muestra botones para editar y eliminar la tarea, si el usuario hace clic en el botón de editar, se muestran campos de entrada para editar el título y la descripción de la tarea, si el usuario hace clic en el botón de guardar, se llama a la función onEdit para actualizar la tarea con los nuevos valores ingresados por el usuario.
export const TodoItem = ({ task, onToggle, onDelete, onEdit }: Props) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
//esta función se encarga de manejar la edición de una tarea, esta función es utilizada en el componente TodoItem para editar el título o la descripción de una tarea, esta función utiliza la función onEdit para actualizar la tarea en la base de datos y luego obtiene las tareas actualizadas del usuario para actualizar el estado de las tareas en la aplicación.
  const handleEdit = () => {
    onEdit(task.id, title, description);
    setEditing(false);
  };
//este componente se encarga de mostrar una tarea individualmente, este componente recibe una tarea como props y también recibe funciones para marcar una tarea como completada, eliminar una tarea y editar una tarea, este componente muestra el título y la descripción de la tarea, si la tarea está marcada como completada, el título se muestra con un estilo de tachado, este componente también muestra botones para editar y eliminar la tarea, si el usuario hace clic en el botón de editar, se muestran campos de entrada para editar el título y la descripción de la tarea, si el usuario hace clic en el botón de guardar, se llama a la función onEdit para actualizar la tarea con los nuevos valores ingresados por el usuario.
  return (
    <div style={{ border: "1px solid #ccc", padding: 12, marginBottom: 8, borderRadius: 8 }}>
      {editing ? (
        <>
          <input value={title} onChange={e => setTitle(e.target.value)} />
          <input value={description} onChange={e => setDescription(e.target.value)} />
          <button onClick={handleEdit}>Guardar</button>
          <button onClick={() => setEditing(false)}>Cancelar</button>
        </>
      ) : (
        <>
          <input type="checkbox" checked={task.completed} onChange={() => onToggle(task)} />
          <strong style={{ textDecoration: task.completed ? "line-through" : "none", marginLeft: 8 }}>
            {task.title}
          </strong>
          <p>{task.description}</p>
          <button onClick={() => setEditing(true)}>Editar</button>
          <button onClick={() => onDelete(task.id)} style={{ marginLeft: 8 }}>Eliminar</button>
        </>
      )}
    </div>
  );
};
