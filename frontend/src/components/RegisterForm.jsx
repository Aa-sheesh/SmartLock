import React from "react";

function RegisterForm() {
  return (
    <>
      <div className="flex flex-col  items-center justify-center">
        <div className="text-3xl font-extrabold mt-10 ">Register</div>
        <div className="p-4 text-xl ">
          <form className="flex flex-col items-center justify-center">
            <input
              type="text"
              placeholder="username"
              className="p-2 m-2 border border-gray-300"
            />
            <input
              type="text"
              placeholder="xyz@mail.com"
              className="p-2 m-2 border border-gray-300"
            />
            <input
              type="password"
              placeholder="password"
              className="p-2 m-2 border border-gray-300"
            />
            <button className="p-3 m-2 bg-blue-500 hover:bg-blue-600 rounded-md cursor-pointer text-white">
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default RegisterForm;
