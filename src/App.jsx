import "mapbox-gl/dist/mapbox-gl.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import AuthLayout from "./Layout/AuthLayout";
import HomeLayout from "./Layout/HomeLayout";
import { AuthProvider } from "./context/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Register from "./auth/Register";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          <Route path="/app" element={<HomeLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </AuthProvider>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
