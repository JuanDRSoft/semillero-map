import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import useAuth from "../hooks/useAuth";

export default function ProfileMenu() {
  const { usuarioData, cerrarSesionAuth } = useAuth();

  return (
    <div className="fixed top-5 right-5 text-right z-30">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="w-full justify-center flex items-center gap-2 font-semibold rounded-xl bg-white px-4 py-1 text-sm  duration-300 hover:bg-gray-100">
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img src={usuarioData.image} className="w-full h-full" />
            </div>
            <p className="md:block hidden">
              {usuarioData.name} {usuarioData.lastname}
            </p>
            <i class="fas fa-chevron-down"></i>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-red-500 text-white" : "text-gray-900"
                    } group flex w-full justify-between items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Profile <i class="fas fa-user"></i>
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={cerrarSesionAuth}
                    className={`${
                      active ? "bg-red-500 text-white" : "text-gray-900"
                    } group flex w-full justify-between items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Cerrar Sesión <i class="fas fa-sign-out-alt"></i>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
