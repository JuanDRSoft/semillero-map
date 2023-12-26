import React, { useState } from "react";
import Logo from "/logo.png";
import { auth, db, storage } from "../../firebase";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import PROFILE from "/profile-placeholder.jpg";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastame] = useState("");
  const [phone, setPhone] = useState("");
  const [img, setImg] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  function registrarUsuario(e) {
    e.preventDefault();
    setLoading(true);

    if ([image].includes("")) {
      toast.warning("Agrega una foto de perfil");
      setLoading(false);
      return;
    }

    auth
      .createUserWithEmailAndPassword(email, password)
      .then(function (userCredential) {
        // Registro exitoso
        var user = userCredential.user._delegate;

        const uploadTask = storage.ref(`usuarios/${image.name}`).put(image);
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("usuarios")
              .child(image.name)
              .getDownloadURL()
              .then((url) => {
                db.collection("usuarios").doc(user.uid).set({
                  email: user.email,
                  name: name,
                  lastname: lastname,
                  phone: phone,
                  image: url,
                });
                toast.success("Usuario registrado correctamente");
                navigate("/app");
                setLoading(false);
              });
          }
        );
      })
      .catch(function (error) {
        // Error en el registro
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorMessage.includes("email address is already")) {
          toast.error("El email ya se encuentra registrado");
        }

        if (errorMessage.includes("Password should be at least 6 characters")) {
          toast.error("La contraseña debe tener al menos 6 caracteres");
        }
        console.error("Error en el registro:", errorCode, errorMessage);
        setLoading(false);
      });
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white container shadow-xl rounded-xl md:w-[50%] lg:w-[30%] w-[90%] p-10 pt-14">
      <div className="flex items-center gap-3 justify-center">
        <img className="w-12" src={Logo} />
        <h1 className="font-bold text-4xl">MAPRegister</h1>
      </div>

      <form className="px-10 mt-5 grid gap-5" onSubmit={registrarUsuario}>
        <div className="flex justify-center mt-10">
          <label htmlFor="image" className="cursor-pointer">
            <div className="w-20 h-20 rounded-full overflow-hidden">
              <img src={img ? img : PROFILE} className="w-full h-full" />
            </div>
          </label>
          <input
            id="image"
            type="file"
            className="hidden"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => handleImageChange(e)}
          />
        </div>

        <p className="text-center">Ingresa los datos correspondientes</p>

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

        <button
          disabled={loading}
          className="bg-red-500 hover:bg-red-700 duration-200 text-white p-1 rounded-full mt-5 font-bold"
        >
          {loading ? <i class="fas fa-spinner animate-spin"></i> : "Registrar"}
        </button>

        <Link to="/" className="text-center font-semibold hover:text-red-500">
          Ya tengo una cuenta
        </Link>
      </form>
    </div>
  );
};

export default Register;
