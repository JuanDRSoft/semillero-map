import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { auth, credential, db, storage } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ProfileEdit({ isOpen, closeModal }) {
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastame] = useState("");
  const [phone, setPhone] = useState("");
  const [img, setImg] = useState("");
  const [image, setImage] = useState("");

  const { usuarioData } = useAuth();
  const navigate = useNavigate();
  const user = auth.currentUser;
  const credits = credential.credential(user?.email, password);

  useEffect(() => {
    if (usuarioData.name) {
      setName(usuarioData.name);
      setLastame(usuarioData.lastname);
      setPhone(usuarioData.phone);
      setEmail(user.email);
      setImage(usuarioData.image);
    }
  }, [isOpen]);

  const updateEmailPass = (e) => {
    e.preventDefault();

    user
      .reauthenticateWithCredential(credits)
      .then(() => {
        if (email !== user.email) {
          return user.verifyBeforeUpdateEmail(email).then(() => {
            toast.info(
              `Por favor revisa la bandeja de entrada de ${email} y verifica tu nuevo correo electronico`,
              { autoClose: 4000 }
            );
          });
        }
      })
      .then(() => {
        if (newPassword !== "") {
          return user.updatePassword(newPassword).then(() => {
            toast.success("Contraseña actualizados correctamente.");
          });
        }
      })
      .then(() => {
        closeModal();
      })
      .catch((error) => {
        console.error(
          "Error al actualizar correo electrónico y contraseña:",
          error.message
        );

        if (error.message.includes("auth credential is incorrect")) {
          toast.error(
            `Error al actualizar correo electrónico y contraseña: Las credenciales actuales son incorrectas`
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const updateData = () => {
    setLoading(true);
    if (usuarioData.image === image) {
      db.collection("usuarios")
        .doc(user.uid)
        .update({
          name,
          lastname,
          phone,
        })
        .then(() => {
          toast.success("Datos actualizados correctamente");
          setLoading(false);
        });
    } else {
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
              db.collection("usuarios")
                .doc(user.uid)
                .update({
                  name,
                  lastname,
                  phone,
                  image: url,
                })
                .then(() => {
                  toast.success("Datos actualizados correctamente");
                  setLoading(false);
                });
            });
        }
      );
    }
  };

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
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-medium leading-6 text-gray-900"
                  >
                    {usuarioData.name} {usuarioData.lastname}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 text-center">
                      Modifica los datos que quieres editar
                    </p>
                  </div>

                  <form className="mt-5">
                    <div>
                      <label
                        htmlFor="img-edit"
                        className="flex justify-center cursor-pointer"
                      >
                        <div className="w-20 h-20 rounded-full overflow-hidden">
                          <img src={img || image} className="w-full h-full" />
                        </div>

                        <input
                          type="file"
                          id="img-edit"
                          className="hidden"
                          accept=".jpg, .jpge, .png"
                          onChange={(e) => handleImageChange(e)}
                        />
                      </label>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="pl-3 text-sm">Nombre</label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="w-full border rounded-full border-black p-1 outline-red-500 pl-3"
                        />
                      </div>

                      <div>
                        <label className="pl-3 text-sm">Apellido</label>
                        <input
                          value={lastname}
                          onChange={(e) => setLastame(e.target.value)}
                          required
                          className="w-full border rounded-full border-black p-1 outline-red-500 pl-3"
                        />
                      </div>
                    </div>

                    <div className="mt-2">
                      <label className="pl-3 text-sm">Número telefonico</label>
                      <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full border rounded-full border-black p-1 outline-red-500 pl-3"
                      />
                    </div>
                  </form>

                  <div className="flex justify-center mt-5">
                    <button
                      type="button"
                      disabled={loading}
                      className="rounded-md bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-700"
                      onClick={updateData}
                    >
                      {loading ? (
                        <i class="fas fa-spinner animate-spin"></i>
                      ) : (
                        "Guardar"
                      )}
                    </button>
                  </div>

                  <hr className="mt-5 mx-5" />

                  <div className="mt-5">
                    <h1 className="text-lg text-center font-medium leading-6 text-gray-900">
                      Reestablecer contraseña o email
                    </h1>
                    <p className="text-sm text-gray-500 text-center mt-2">
                      Modifica tu contraseña o email para reestablecerlos
                    </p>

                    <form onSubmit={updateEmailPass}>
                      <div className="mt-2">
                        <label className="pl-3 text-sm">Email</label>
                        <input
                          value={email}
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="w-full border rounded-full border-black p-1 outline-red-500 pl-3"
                        />
                      </div>

                      <div className="mt-2">
                        <label className="pl-3 text-sm">Password Actual</label>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="w-full border rounded-full border-black p-1 outline-red-500 pl-3"
                        />
                      </div>

                      <div className="mt-2">
                        <label className="pl-3 text-sm">Nueva Password</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full border rounded-full border-black p-1 outline-red-500 pl-3"
                        />
                      </div>

                      <div className="flex justify-center mt-5">
                        <button
                          type="submit"
                          className="rounded-md bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-700"
                        >
                          Reestablecer
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
