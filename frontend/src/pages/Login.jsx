import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {authActions} from "../store/auth";
import { useDispatch } from "react-redux";

const Login = () => {
    const [Values, setValues] = useState({ username: "", password: "",
        
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const change = (e) => {
        const { name, value } = e.target;
        setValues({...Values, [name]: value});
    }
    const submit = async () => {
        try {
            if(Values.username === "" || Values.password === "") {
                alert("Please fill all the fields");
                return;
            }
            else {
                const response = await axios.post("http://localhost:3000/api/v1/signin", Values);
                dispatch(authActions.login());
                dispatch(authActions.changeRole(response.data.role));
                localStorage.setItem("id", response.data.id);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);
                navigate("/profile");
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };
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
                            value = {Values.username}
                            onChange={change}
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
                            value = {Values.password}
                            onChange={change}
                        />
                    </div>
                    <div className="mt-4">
                        <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300" onClick={submit}>
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

