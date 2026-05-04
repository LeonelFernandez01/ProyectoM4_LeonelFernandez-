//este componente se encarga de mostrar el formulario para agregar una nueva tarea, este componente recibe una función onAdd como props, esta función es utilizada para agregar una nueva tarea a la base de datos, esta función es llamada cuando el usuario envía el formulario, esta función recibe el título y la descripción de la tarea como argumentos, luego de agregar la tarea a la base de datos, esta función obtiene las tareas actualizadas del usuario para actualizar el estado de las tareas en la aplicación.
import { useState } from "react";
//este componente se encarga de mostrar el formulario para agregar una nueva tarea, este componente recibe una función onAdd como props, esta función es utilizada para agregar una nueva tarea a la base de datos, esta función es llamada cuando el usuario envía el formulario, esta función recibe el título y la descripción de la tarea como argumentos, luego de agregar la tarea a la base de datos, esta función obtiene las tareas actualizadas del usuario para actualizar el estado de las tareas en la aplicación.
interface Props { onAdd: (title: string, description: string) => void; }

export const TodoForm = ({ onAdd }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
   //esta función se encarga de manejar el envío del formulario para agregar una nueva tarea, esta función es llamada cuando el usuario envía el formulario, esta función recibe el evento de envío como argumento, esta función evita que la página se recargue al enviar el formulario, luego verifica si el título de la tarea no está vacío, si el título está vacío, la función no hace nada, si el título no está vacío, la función llama a la función onAdd para agregar la nueva tarea a la base de datos y luego limpia los campos de entrada del formulario. 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title, description);
    setTitle("");
    setDescription("");
  };
//este componente se encarga de mostrar el formulario para agregar una nueva tarea, este componente recibe una función onAdd como props, esta función es utilizada para agregar una nueva tarea a la base de datos, esta función es llamada cuando el usuario envía el formulario, esta función recibe el título y la descripción de la tarea como argumentos, luego de agregar la tarea a la base de datos, esta función obtiene las tareas actualizadas del usuario para actualizar el estado de las tareas en la aplicación.
  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 24 }}>
      <input placeholder="Título de la tarea" value={title}
        onChange={e => setTitle(e.target.value)} style={{ marginRight: 8 }} />
      <input placeholder="Descripción" value={description}
        onChange={e => setDescription(e.target.value)} style={{ marginRight: 8 }} />
      <button type="submit">Agregar</button>
    </form>
  );
};