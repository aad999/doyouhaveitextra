import React, { useState, useEffect } from "react";
import axios from "axios";
import sess from "../functions/sessionHandler";
import { useNavigate, Link } from "react-router-dom";


const JoinUs = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (sess.getDonor()) {
            navigate('/donor/dashboard');
        }
        if (sess.getNGO()) {
            navigate('/ngo/dashboard');
        }
    }, []);

    return (
        <div>
            {sess.getNGO() && (
                <div>
                    redirecting to ngo/dashboard...
                </div>
            )}
            {sess.getNGO() && (
                <div>
                    redirecting to ngo/dahsboard...
                </div>
            )}
            {(!sess.getNGO() && !sess.getNGO()) && (
                <div className="flex items-center justify-center h-full min-h-screen p-3">
                    <div className="block rounded-lg bg-white shadow-lg w-[36rem] p-10">
                            <div className="pb-1 pt-1 text-center">
                                <Link
                                    className="h-104mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-500 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus: focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-lime-600"
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                    to='/donor/login'
                                >
                                    Join as Donor
                                </Link>
                            </div>
                            <div className="pb-1 pt-1 text-center">
                                <Link
                                    className="h-104mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-500 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus: focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-lime-600"
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                    to='/ngo/login'
                                >
                                    Join as NGO
                                </Link>
                            </div>
                            <div className="mb-1 pb-1 pt-1 text-center">
                                <Link
                                    className="h-104mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-500 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus: focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-neutral-400"
                                    type="submit"
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                    role="button"
                                    to="/"
                                >
                                    Home
                                </Link>
                            </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default JoinUs;