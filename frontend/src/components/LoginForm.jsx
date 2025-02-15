import React from 'react'

function LoginForm() {
  return (
    <>
        <div className="flex flex-col  items-center justify-center">
            <div className="text-3xl font-extrabold mt-10 ">
            Login
            </div>
            <div className="p-4 text-xl ">
            <form className="flex flex-col items-center justify-center">
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
                <button className="p-3 m-2 bg-blue-500 hover:bg-blue-600 rounded-md cursor-pointer text-white">Login</button>
            </form>
            </div>
        </div>
    </>
  )
}

export default LoginForm