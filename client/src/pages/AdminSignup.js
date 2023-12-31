import React, { useState } from "react";
import axios from "axios";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";

const AdminSignup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post(
                `${"https://do-you-have-it-extra-backend.onrender.com"}/admin/signup`,
                {
                    name: name,
                    password: password,
                }
            );
            navigate('/admin/dashboard');
            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert("Something went wrong");
            }
        }
    };

    return (
        <div>
            {isLoading ? (
                <div>
                    <Loading />
                </div>
            ) : (
                <div className="flex items-center justify-center h-full min-h-screen p-3">
                    <div className="block rounded-lg bg-white shadow-lg w-[36rem] p-10">
                        <div className="text-center">
                            <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                                Sign Up as Admin
                            </h4>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="relative mb-4" data-te-input-wrapper-init>
                                <input
                                    type="text"
                                    className="outline outline-neutral-300 focus:outline-lime-600 focus:placeholder:text-lime-600 outline-2 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 h-10 leading-[1.6] transition-all duration-500"
                                    id="exampleFormControlInput1"
                                    placeholder="Admin Name"
                                    onChange={(e) => {
                                        setName(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="relative mb-4" data-te-input-wrapper-init>
                                <input
                                    type="password"
                                    className="outline outline-neutral-300 focus:outline-lime-600 focus:placeholder:text-lime-600 outline-2 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 h-10 leading-[1.6] transition-all duration-500"
                                    id="exampleFormControlInput11"
                                    placeholder="Password"
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="pb-1 pt-1 text-center">
                                <button
                                    className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-500 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus: focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-lime-600"
                                    type="submit"
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSignup;