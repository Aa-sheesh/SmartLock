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

function App() {
  const [count, setCount] = useState(0);
  const { user, checkAuth,checkingAuth } = useUserStore();
  // const checkingAuth=true;
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return <Loading />;

  return (
    <>
      <Routes>
        <Route path="/" element={!user ? <Landing /> : <User />} />
        <Route path="/register" element={!user ? <Register /> : <User />} />
        <Route path="/login" element={!user ? <Login /> : <User />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
