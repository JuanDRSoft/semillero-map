import React from "react";
import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [authUser, setAuthUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        // El usuario ha iniciado sesión
        setAuthUser(user);
      } else {
        // No hay usuario logueado
        navigate("/");
      }
    });
  }, []);

  const cerrarSesionAuth = () => {
    auth
      .signOut()
      .then(function () {
        // Cierre de sesión exitoso
        navigate("/");
        setAuth({});
        toast.success("Cierre de sesión exitoso");
      })
      .catch(function (error) {
        // Manejar errores al cerrar sesión
        console.error("Error al cerrar sesión:", error.code, error.message);
      });
  };

  return (
    <AuthContext.Provider value={{ cargando, cerrarSesionAuth, authUser }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };

export default AuthContext;
