import React from "react";

const Login = () => {
    return (
        <div className=" bg-zinc-900 px-12 py-8 flex items-center justify-center h-screen">
            <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6">
                <p className="text-zinc-200 text-xl">Log in</p>
                <div className="mt-4">
                    <div>
                        <label htmlFor="username" className="text-zinc-400">
                            Username
                        </label>
                        <input
                            type="text"
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                            placeholder="username"
                            name="username"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="password" className="text-zinc-400">
                            Password
                        </label>
                        <input
                            type="password"
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                            placeholder="password"
                            name="password"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600">
                            Login
                        </button>
                    </div>
                </div>
                {/* Placing the login prompt with spacing */}
                <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
                    New User?
                </p>
                <p className="flex items-center justify-center mt-2">
                    <a href="/signup" className="text-blue-400">SignUp</a>
                </p>
            </div>
        </div>
    );
};

export default Login;

