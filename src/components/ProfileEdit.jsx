import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import useAuth from "../hooks/useAuth";

export default function ProfileEdit({ isOpen, closeModal }) {
  const { usuarioData } = useAuth();

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
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="pl-3">Nombre</label>
                        <input className="w-full border rounded-full border-black p-1 outline-red-500 pl-3" />
                      </div>

                      <div>
                        <label className="pl-3">Apellido</label>
                        <input className="w-full border rounded-full border-black p-1 outline-red-500 pl-3" />
                      </div>
                    </div>

                    <div className="mt-2">
                      <label className="pl-3">Número telefonico</label>
                      <input className="w-full border rounded-full border-black p-1 outline-red-500 pl-3" />
                    </div>

                    <div className="mt-2">
                      <label className="pl-3">Email</label>
                      <input className="w-full border rounded-full border-black p-1 outline-red-500 pl-3" />
                    </div>

                    <div className="mt-2">
                      <label className="pl-3">Password</label>
                      <input className="w-full border rounded-full border-black p-1 outline-red-500 pl-3" />
                    </div>
                  </form>

                  <div className="flex justify-center mt-10">
                    <button
                      type="button"
                      className="rounded-md bg-red-500 px-4 py-2 font-medium text-white hover:bg-red-700"
                      onClick={closeModal}
                    >
                      Guardar
                    </button>
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
