import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Login from "./pages/Login";
import User from "./pages/User";
import Admin from "./pages/Admin";
import Loading from "./components/Loading";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";

function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return <Loading />;

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            !user ? <Landing /> : user.role === "admin" ? <Admin /> : <User />
          }
        />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
