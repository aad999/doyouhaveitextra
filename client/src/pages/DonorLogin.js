import React, { useState, useEffect } from "react";
import axios from "axios";
import sess from "../functions/sessionHandler";
import { useNavigate, Link } from "react-router-dom";


const DonorLogin = () => {

    const navigate = useNavigate();

    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (sess.getDonor()) {
            navigate('/donor/dashboard');
        }
        if (sess.getNGO()) {
            navigate('/ngo/dashboard');
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:8080/donor/login", {
            emailId: emailId,
            password: password,
        })
            .then((res) => {
                sess.setDonor(res);
                navigate('/donor/dashboard');
            })
            .catch((err) => {
                if (err.response && err.response.data && err.response.data.message) {
                    alert(err.response.data.message);
                }
                else {
                    alert("Something went wrong");
                }
            });
    };

    return (
        <div>
            {sess.getDonor() && (
                <div>
                    redirecting to donor/dashboard...
                </div>
            )}
            {sess.getNGO() && (
                <div>
                    redirecting to ngo/dahsboard...
                </div>
            )}
            {(!sess.getDonor() && !sess.getNGO()) && (
                <div className="flex items-center justify-center h-full min-h-screen p-3">
                    <div className="block rounded-lg bg-white shadow-lg w-[36rem] p-10">
                        <div className="text-center">
                            <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                                Log In as Donor
                            </h4>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="relative mb-4" data-te-input-wrapper-init>
                                <input
                                    type="email"
                                    className="outline outline-neutral-300 focus:outline-lime-600 focus:placeholder:text-lime-600 outline-2 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 h-10 leading-[1.6] transition-all duration-500"
                                    id="exampleFormControlInput1"
                                    placeholder="Email Id"
                                    onChange={(e) => {
                                        setEmailId(e.target.value);
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
                                    Log in
                                </button>
                            </div>
                            <div className="mb-12 pb-1 pt-1 text-center">
                                <Link
                                    className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-500 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus: focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-neutral-400"
                                    type="submit"
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                    role="button"
                                    to="/"
                                >
                                    Home
                                </Link>
                            </div>
                            <div className="flex items-center justify-between pb-6">
                                <p className="mb-0 mr-2 text-sm sm:text-base">
                                    Don't have an account?
                                </p>
                                <Link
                                    type="button"
                                    className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-500 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus: focus:ring-0 active:border-danger-700 active:text-danger-700"
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                    to="/donor/signup"
                                >
                                    Register
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DonorLogin;

