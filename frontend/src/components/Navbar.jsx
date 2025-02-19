import React from "react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";

function Navbar() {
  const { user, logout } = useUserStore();
  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className="flex justify-between p-4">
      <Link to="/">
        <div className="flex items-center">
          <button className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="48px"
              fill="#75FB4C"
            >
              <path d="M220-80q-24.75 0-42.37-17.63Q160-115.25 160-140v-434q0-24.75 17.63-42.38Q195.25-634 220-634h70v-96q0-78.85 55.61-134.42Q401.21-920 480.11-920q78.89 0 134.39 55.58Q670-808.85 670-730v96h70q24.75 0 42.38 17.62Q800-598.75 800-574v434q0 24.75-17.62 42.37Q764.75-80 740-80H220Zm0-60h520v-434H220v434Zm260.17-140q31.83 0 54.33-22.03T557-355q0-30-22.67-54.5t-54.5-24.5q-31.83 0-54.33 24.5t-22.5 55q0 30.5 22.67 52.5t54.5 22ZM350-634h260v-96q0-54.17-37.88-92.08-37.88-37.92-92-37.92T388-822.08q-38 37.91-38 92.08v96ZM220-140v-434 434Z" />
            </svg>
          </button>
          <div className="text-3xl font-bold">SmartLock</div>
        </div>
      </Link>
      {!user ? (
        <div>
          <Link to="/login">
            <button className="text-xl cursor-pointer rounded-md px-3 py-2 mr-3 hover:bg-green-700">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="text-xl cursor-pointer hover:bg-red-700 rounded-md px-3 py-2">
              Register
            </button>
          </Link>
        </div>
      ) : (
        <button onClick={handleLogout} className="text-xl cursor-pointer hover:bg-red-800 rounded-md px-3 py-2">
          Logout
        </button>
      )}
    </div>
  );
}

export default Navbar;
