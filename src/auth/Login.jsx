import React, { useState } from "react";
import Logo from "/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, googleProvider } from "../../firebase";
import { toast } from "react-toastify";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const createUser = (email, name, lastname, phone, image, userId) => {
    console.log(userId);
    db.collection("usuarios").doc(userId).set({
      email: email,
      name: name,
      lastname: lastname,
      phone: phone,
      image: image,
    });
  };

  function onLogin(e) {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(function (userCredential) {
        var user = userCredential.user;
        if (user) {
          navigate("/app");
          toast.success("Login exitoso");
        }
      })
      .catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        toast.error("Verifica los datos ingresados");
      });
  }

  function onLoginGoogle() {
    auth
      .signInWithPopup(googleProvider)
      .then(function (result) {
        // Inicio de sesión con Google exitoso
        var user = result.user._delegate;
        console.log(user);
        db.collection("usuarios").doc(user.uid).set({
          email: user.email,
          name: user.displayName,
          lastname: "",
          phone: user.phoneNumber,
          image: user.photoURL,
        });
        navigate("/app");
        toast.success("Login exitoso");
      })
      .catch(function (error) {
        // Manejar errores de inicio de sesión con Google
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error(
          "Error en el inicio de sesión con Google:",
          errorCode,
          errorMessage
        );
      });
  }

  return (
    <div className="bg-white container shadow-xl rounded-xl md:w-[50%] lg:w-[30%] w-[90%] p-10 pt-14">
      <div className="flex items-center gap-3 justify-center">
        <img className="w-12" src={Logo} />
        <h1 className="font-bold text-4xl">MAPLogin</h1>
      </div>

      <p className="text-center mt-10">Ingresa los datos correspondientes</p>
      <form className="px-10 mt-5 grid gap-5" onSubmit={onLogin}>
        <input
          type="email"
          className="border border-black focus:outline-red-500 w-full p-1 rounded-full px-5"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="relative">
          <input
            type={showPass ? "text" : "password"}
            className="border border-black focus:outline-red-500 w-full p-1 rounded-full px-5"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <div
            className="absolute top-1 right-3 cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? (
              <i class="fas fa-eye-slash"></i>
            ) : (
              <i class="fas fa-eye"></i>
            )}
          </div>
        </div>

        <button className="bg-red-500 hover:bg-red-700 duration-200 text-white p-1 rounded-full mt-5 font-bold">
          Iniciar Sesión
        </button>
      </form>

      <div className="mt-5 px-10">
        <Link className="text-center" to="/register">
          <p className="mb-3 font-semibold hover:text-red-500">Registrate</p>
        </Link>

        <div className="flex justify-center gap-4 items-center">
          <hr className="w-[90%]" />
          O
          <hr className="w-[90%]" />
        </div>
      </div>

      <div className="mt-3 px-10">
        <button
          onClick={onLoginGoogle}
          type="submit"
          className="p-1 border w-full gap-3 hover:bg-red-700 font-semibold text-white relative rounded-full bg-red-500"
        >
          Iniciar Sesión Con Google
          <i class="fab fa-google text-white left-3 top-2 absolute"></i>
        </button>
      </div>
    </div>
  );
};

export default Login;
