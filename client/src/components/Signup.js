import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate();
    const [creds, setcreds] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handlechange = (e) => {
        const { name, value } = e.target;
        setcreds({ ...creds, [name]: value });
    };

    const handlesubmit = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                name: creds.name,
                email: creds.email,
                password: creds.password
            })
        });
        const json = await response.json();
        if (json.success === true) {
            navigate("/login");
            alert("Signed up successfully");
        } else {
            alert("Invalid details");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-purple-600 text-center mb-6">Sign Up</h2>
                <form onSubmit={handlesubmit} >
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-600 text-sm font-medium mb-1">Name</label>
                        <input
                            onChange={handlechange}
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={creds.name}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-600 text-sm font-medium mb-1">Email address</label>
                        <input
                            onChange={handlechange}
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={creds.email}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-600 text-sm font-medium mb-1">Password</label>
                        <input
                            onChange={handlechange}
                            type="password"
                            id="password"
                            name="password"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={creds.password}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
