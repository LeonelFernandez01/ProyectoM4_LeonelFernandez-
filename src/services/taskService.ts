//este archivo se encarga de definir las funciones que se van a usar para interactuar con la base de datos de Firebase, estas funciones se encargan de crear, obtener, actualizar y eliminar tareas, estas funciones son utilizadas en los componentes para realizar las operaciones correspondientes en la base de datos.
import {
  collection, addDoc, getDocs, updateDoc,
  deleteDoc, doc, query, where, orderBy
} from "firebase/firestore";
import { db } from "./firebase";
import type { Task } from "../types";
//esto sirve para definir la colección de tareas en la base de datos, esto es importante para evitar errores de tipo y para tener una mejor organización del código.
const COLLECTION = "tasks";
//estas funciones se encargan de realizar las operaciones correspondientes en la base de datos, estas funciones son utilizadas en los componentes para realizar las operaciones correspondientes en la base de datos.
export const createTask = (task: Omit<Task, "id">) =>
  addDoc(collection(db, COLLECTION), task);
//esta función se encarga de obtener las tareas de un usuario específico, esta función es utilizada en el componente TaskList para mostrar las tareas del usuario, esta función utiliza una consulta para obtener solo las tareas del usuario y ordenarlas por fecha de creación.
export const getTasks = async (userId: string): Promise<Task[]> => {
  const q = query(
    collection(db, COLLECTION),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
};
//esta función se encarga de actualizar una tarea, esta función es utilizada en el componente TaskItem para marcar una tarea como completada o para editar el título o la descripción de la tarea, esta función utiliza el id de la tarea para actualizarla en la base de datos.
export const updateTask = (id: string, data: Partial<Task>) =>
  updateDoc(doc(db, COLLECTION, id), data);

export const deleteTask = (id: string) =>
  deleteDoc(doc(db, COLLECTION, id));