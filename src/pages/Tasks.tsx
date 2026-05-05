import { useState, useEffect } from "react";
import type { Task } from "../types";
import { createTask, updateTask, deleteTask } from "../services/taskService";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

export const useTasks = (userId: string | undefined) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, "tasks"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Task));
      setTasks(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const addTask = async (title: string, description: string) => {
    await createTask({
      title, description, completed: false,
      userId: userId!, createdAt: Date.now()
    });
  };

  const toggleTask = async (task: Task) => {
    await updateTask(task.id, { completed: !task.completed });
  };

  const editTask = async (id: string, title: string, description: string) => {
    await updateTask(id, { title, description });
  };

  const removeTask = async (id: string) => {
    await deleteTask(id);
  };

  return { tasks, loading, addTask, toggleTask, editTask, removeTask };
};