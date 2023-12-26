import React, { useState } from "react";
import Logo from "/logo.png";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastame] = useState("");
  const [phone, setPhone] = useState("");
  const [img, setImg] = useState("");

  const navigate = useNavigate();

  function registrarUsuario(e) {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(function (userCredential) {
        // Registro exitoso
        var user = userCredential.user._delegate;
        console.log("Usuario registrado exitosamente:", user);
        db.collection("usuarios").doc(user.uid).set({
          email: user.email,
          name: name,
          lastname: lastname,
          phone: phone,
          image: img,
        });
        toast.success("Usuario registrado correctamente");
        navigate("/app");
      })
      .catch(function (error) {
        // Error en el registro
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorMessage.includes("email address is already")) {
          toast.error("El email ya se encuentra registrado");
        }
        console.error("Error en el registro:", errorCode, errorMessage);
      });
  }

  return (
    <div className="bg-white container shadow-xl rounded-xl md:w-[50%] lg:w-[30%] w-[90%] p-10 pt-14">
      <div className="flex items-center gap-3 justify-center">
        <img className="w-12" src={Logo} />
        <h1 className="font-bold text-4xl">MAPRegister</h1>
      </div>

      <p className="text-center mt-10">Ingresa los datos correspondientes</p>

      <form className="px-10 mt-5 grid gap-5" onSubmit={registrarUsuario}>
        <div className="grid md:grid-cols-2 gap-2">
          <input
            type="text"
            className="border border-black focus:outline-red-500 w-full p-1 rounded-full px-5"
            placeholder="Nombre"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            className="border border-black focus:outline-red-500 w-full p-1 rounded-full px-5"
            placeholder="Apellido"
            required
            value={lastname}
            onChange={(e) => setLastame(e.target.value)}
          />
        </div>

        <input
          type="tel"
          className="border border-black focus:outline-red-500 w-full p-1 rounded-full px-5"
          placeholder="Número telefonico"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

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
            required
            value={password}
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
          Registrar
        </button>

        <Link to="/" className="text-center font-semibold hover:text-red-500">
          Ya tengo una cuenta
        </Link>
      </form>
    </div>
  );
};

export default Register;
