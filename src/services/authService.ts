//este archivo se encarga de definir las funciones que se van a usar para interactuar con el servicio de autenticación de Firebase, estas funciones se encargan de registrar un nuevo usuario, iniciar sesión con un usuario existente, iniciar sesión con Google y cerrar sesión, estas funciones son utilizadas en los componentes para realizar las operaciones correspondientes en el servicio de autenticación de Firebase.
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
import { auth } from "./firebase";
//esto sirve para definir el proveedor de autenticación de Google, esto es importante para evitar errores de tipo y para tener una mejor organización del código.
const googleProvider = new GoogleAuthProvider();
//estas funciones se encargan de realizar las operaciones correspondientes en el servicio de autenticación de Firebase, estas funciones son utilizadas en los componentes para realizar las operaciones correspondientes en el servicio de autenticación de Firebase.
export const registerUser = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);
//esta función se encarga de iniciar sesión con un usuario existente, esta función es utilizada en el componente Login para iniciar sesión con un usuario existente, esta función utiliza el correo electrónico y la contraseña del usuario para iniciar sesión en el servicio de autenticación de Firebase.
export const loginUser = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);
//esta función se encarga de iniciar sesión con Google, esta función es utilizada en el componente Login para iniciar sesión con Google, esta función utiliza el proveedor de autenticación de Google para iniciar sesión en el servicio de autenticación de Firebase.
export const loginWithGoogle = () =>
  signInWithPopup(auth, googleProvider);
//esta función se encarga de cerrar sesión, esta función es utilizada en el componente Header para cerrar sesión, esta función utiliza el servicio de autenticación de Firebase para cerrar sesión.
export const logoutUser = () => signOut(auth);