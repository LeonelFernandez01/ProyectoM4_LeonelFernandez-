//este archivo se encarga de definir los tipos de datos que se van a usar en el proyecto, esto es importante para evitar errores de tipo y para tener una mejor organización del código.
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createdAt: number;
  priority?: 'low' | 'medium' | 'high';
  category?: string;
  dueDate?: string;
}
//esto sirve para definir el tipo de dato que se va a usar en el proyecto, en este caso se define el tipo de dato Task y User, esto es importante para evitar errores de tipo y para tener una mejor organización del código.
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}