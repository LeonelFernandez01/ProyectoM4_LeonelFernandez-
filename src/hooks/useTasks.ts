//este archivo se encarga de manejar la lógica relacionada con las tareas, este hook personalizado se encarga de obtener las tareas del usuario, agregar nuevas tareas, marcar tareas como completadas, editar tareas y eliminar tareas, este hook utiliza los servicios de tareas para interactuar con la base de datos y actualizar el estado de las tareas en la aplicación, este hook es utilizado en el componente TaskList para mostrar las tareas del usuario y permitirle interactuar con ellas.
import { useState, useEffect } from "react";
import type { Task } from "../types";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";
//este hook personalizado se encarga de obtener las tareas del usuario, agregar nuevas tareas, marcar tareas como completadas, editar tareas y eliminar tareas, este hook utiliza los servicios de tareas para interactuar con la base de datos y actualizar el estado de las tareas en la aplicación, este hook es utilizado en el componente TaskList para mostrar las tareas del usuario y permitirle interactuar con ellas.
export const useTasks = (userId: string | undefined) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
//esta función se encarga de obtener las tareas del usuario, esta función es utilizada en el hook useTasks para obtener las tareas del usuario, esta función utiliza el servicio de tareas para obtener las tareas del usuario desde la base de datos y actualizar el estado de las tareas en la aplicación.
  const fetchTasks = async () => {
    if (!userId) return;
    setLoading(true);
    const data = await getTasks(userId);
    setTasks(data);
    setLoading(false);
  };
//este efecto se encarga de obtener las tareas del usuario cada vez que el userId cambia, esto es importante para asegurarse de que se muestren las tareas correctas cuando el usuario inicia sesión o cierra sesión, este efecto utiliza la función fetchTasks para obtener las tareas del usuario desde la base de datos y actualizar el estado de las tareas en la aplicación.
  useEffect(() => { fetchTasks(); }, [userId]);
//esta función se encarga de agregar una nueva tarea, esta función es utilizada en el componente TaskList para agregar una nueva tarea, esta función utiliza el servicio de tareas para crear una nueva tarea en la base de datos y luego obtiene las tareas actualizadas del usuario para actualizar el estado de las tareas en la aplicación.
  const addTask = async (title: string, description: string) => {
    await createTask({
      title, description, completed: false,
      userId: userId!, createdAt: Date.now()
    });
    fetchTasks();
  };
//esta función se encarga de marcar una tarea como completada o no completada, esta función es utilizada en el componente TaskItem para marcar una tarea como completada o no completada, esta función utiliza el servicio de tareas para actualizar la tarea en la base de datos y luego obtiene las tareas actualizadas del usuario para actualizar el estado de las tareas en la aplicación.
  const toggleTask = async (task: Task) => {
    await updateTask(task.id, { completed: !task.completed });
    fetchTasks();
  };
//esta función se encarga de editar una tarea, esta función es utilizada en el componente TaskItem para editar el título o la descripción de una tarea, esta función utiliza el servicio de tareas para actualizar la tarea en la base de datos y luego obtiene las tareas actualizadas del usuario para actualizar el estado de las tareas en la aplicación.
  const editTask = async (id: string, title: string, description: string) => {
    await updateTask(id, { title, description });
    fetchTasks();
  };
//esta función se encarga de eliminar una tarea, esta función es utilizada en el componente TaskItem para eliminar una tarea, esta función utiliza el servicio de tareas para eliminar la tarea de la base de datos y luego obtiene las tareas actualizadas del usuario para actualizar el estado de las tareas en la aplicación.
  const removeTask = async (id: string) => {
    await deleteTask(id);
    fetchTasks();
  };
//este hook personalizado se encarga de obtener las tareas del usuario, agregar nuevas tareas, marcar tareas como completadas, editar tareas y eliminar tareas, este hook utiliza los servicios de tareas para interactuar con la base de datos y actualizar el estado de las tareas en la aplicación, este hook es utilizado en el componente TaskList para mostrar las tareas del usuario y permitirle interactuar con ellas.
  return { tasks, loading, addTask, toggleTask, editTask, removeTask };
};