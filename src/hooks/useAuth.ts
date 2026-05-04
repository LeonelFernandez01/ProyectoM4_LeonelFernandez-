//este archivo se encarga de manejar la lógica relacionada con la autenticación del usuario, este hook personalizado se encarga de obtener el estado de autenticación del usuario, es decir, si el usuario ha iniciado sesión o no, y también proporciona información sobre el usuario autenticado, como su ID y correo electrónico, este hook utiliza los servicios de autenticación de Firebase para interactuar con la base de datos y actualizar el estado de autenticación en la aplicación, este hook es utilizado en el componente App para mostrar diferentes vistas dependiendo de si el usuario ha iniciado sesión o no.
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../services/firebase";
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  //esta función se encarga de escuchar los cambios en el estado de autenticación del usuario, esta función es utilizada en el hook useAuth para obtener el estado de autenticación del usuario, esta función utiliza el servicio de autenticación de Firebase para escuchar los cambios en el estado de autenticación del usuario y actualizar el estado de autenticación en la aplicación.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);
  //este hook personalizado se encarga de obtener el estado de autenticación del usuario, es decir, si el usuario ha iniciado sesión o no, y también proporciona información sobre el usuario autenticado, como su ID y correo electrónico, este hook utiliza los servicios de autenticación de Firebase para interactuar con la base de datos y actualizar el estado de autenticación en la aplicación, este hook es utilizado en el componente App para mostrar diferentes vistas dependiendo de si el usuario ha iniciado sesión o no.    
  return { user, loading };
};