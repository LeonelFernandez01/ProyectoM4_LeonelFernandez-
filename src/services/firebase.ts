//este archivo se encarga de configurar la conexión con Firebase, aquí se inicializa la aplicación de Firebase y se exportan los servicios de autenticación y base de datos para ser utilizados en el resto del proyecto.
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//estas variables de entorno se utilizan para configurar la conexión con Firebase, estas variables se deben definir en un archivo .env en la raíz del proyecto, estas variables se utilizan para evitar exponer información sensible en el código y para tener una mejor organización del código.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};
//aquí se inicializa la aplicación de Firebase y se exportan los servicios de autenticación y base de datos para ser utilizados en el resto del proyecto.
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);