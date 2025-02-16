import { useEffect, useState } from "react";
// import { useUserStore } from './stores/useUserStore.js'
import Navbar from "./components/Navbar.jsx";
import "./App.css";
import Landing from "./pages/Landing";
import { Navigate, Route, Routes } from "react-router-dom";
// import RegisterForm from './components/RegisterForm.jsx'
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import User from "./pages/User.jsx";
import Loading from "./components/Loading.jsx";
import Admin from "./pages/Admin.jsx";

function App() {
  const [count, setCount] = useState(0);
  const { user, checkAuth, checkingAuth } = useUserStore();
  // const checkingAuth=true;
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return <Loading />;

  // console.log(user.role)
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            !user ? <Landing /> : user.role === "user" ? <User /> : <Admin />
          }
        />
        <Route
          path="/register"
          element={
            !user ? <Register /> : user.role === "user" ? <User /> : <Admin />
          }
        />
        <Route
          path="/login"
          element={
            !user ? <Login /> : user.role === "user" ? <User /> : <Admin />
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
