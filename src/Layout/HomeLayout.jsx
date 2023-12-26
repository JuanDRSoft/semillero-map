import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import ProfileMenu from "../components/ProfileMenu";

const HomeLayout = () => {
  const { authUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/");
    }
  }, [authUser]);

  const openMenu = () => {
    document.getElementById("menu").classList.toggle("-translate-x-[130%]");
  };

  return (
    <div className="w-screen h-screen">
      <div
        onClick={openMenu}
        className="fixed cursor-pointer hover:bg-gray-100 bg-white p-5 flex justify-center items-center w-5 h-5 left-5 top-5 z-40 rounded-xl"
      >
        <i class="fas fa-bars"></i>
      </div>
      <div
        id="menu"
        className="fixed bg-white w-[280px] p-5 left-5 top-5 z-40 rounded-xl duration-500 -translate-x-[130%]"
      >
        <div className="relative">
          <h1 className="font-bold text-3xl">Menu</h1>
          <i
            onClick={openMenu}
            class="fas fa-arrow-circle-left absolute -right-9 top-0 text-4xl cursor-pointer hover:text-red-500"
          ></i>
        </div>

        <hr className="mt-5 mb-5" />

        <div>
          <ul>
            <li>
              <Link className="font-bold w-full flex items-center rounded-xl text-xl gap-10 p-2 hover:bg-gray-100">
                <i class="fas fa-home"></i> Mi ubicación
              </Link>
            </li>

            <li className="mt-5">
              <Link className="font-bold w-full flex items-center rounded-xl text-xl gap-10 p-2 hover:bg-gray-100">
                <i class="fas fa-map-marker-alt text-red-500"></i> Medellín
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <ProfileMenu />

      {/* <div
        onClick={cerrarSesionAuth}
        className="fixed font-bold text-lg cursor-pointer hover:bg-gray-100 bg-white p-2 px-5 flex justify-center items-center right-5 top-5 z-40 rounded-xl"
      >
        <i class="fas fa-sign-out-alt mr-2"></i>
        Cerrar Sesión
      </div> */}
      <Outlet />
    </div>
  );
};

export default HomeLayout;
