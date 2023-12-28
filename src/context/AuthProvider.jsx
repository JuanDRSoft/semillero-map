import React from "react";
import { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [cargando, setCargando] = useState(true);
  const [authUser, setAuthUser] = useState({});
  const [usuarioData, setUsuarioData] = useState({});
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

  useEffect(() => {
    const data = db.collection("usuarios").doc(authUser.uid);

    data
      .get()
      .then((doc) => {
        if (doc.exists) {
          setUsuarioData(doc.data());
        } else {
          console.log("El documento no existe.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener el documento:", error);
      });

    data.onSnapshot(
      (doc) => {
        if (doc.exists) {
          setUsuarioData(doc.data());
        } else {
          console.log("El documento ya no existe.");
        }
      },
      (error) => {
        console.error("Error al escuchar cambios en el documento:", error);
      }
    );
  }, [authUser]);

  const cerrarSesionAuth = () => {
    auth
      .signOut()
      .then(function () {
        // Cierre de sesión exitoso
        toast.success("Cierre de sesión exitoso");
        navigate("/");
        setAuth({});
      })
      .catch(function (error) {
        // Manejar errores al cerrar sesión
        console.error("Error al cerrar sesión:", error.code, error.message);
      });
  };

  return (
    <AuthContext.Provider
      value={{ cargando, cerrarSesionAuth, authUser, usuarioData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthProvider };

export default AuthContext;
