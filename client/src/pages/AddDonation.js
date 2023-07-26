import React, { useState, useEffect } from "react";
import axios from "axios";
import sess from "../functions/sessionHandler";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import backend from '../functions/backend.js';

function AddDonation() {
    const navigate = useNavigate();

    useEffect(() => {
        if (sess.getNGO()) {
            navigate('/ngo/dashboard');
        }
        if(!sess.getDonor()) {
            alert('Please Log In First');
            navigate('/home');
        }
    }, []);

    const [heading, setHeading] = useState("");
    const [description, setDescription] = useState("");
    const [tag, setTag] = useState("");

    const handleSubmit = async (e) => {
        const isConfirmed = window.confirm('Are you sure to add this donation?');
        if (isConfirmed) {
            e.preventDefault();
            // Get donor_id from localStorage
            const donor_id = sess.getDonor();

            if (!donor_id) {
                alert("Please login first to add a donation.");
                return;
            }

            // Get current date (today's date)
            const currentDate = new Date();

            try {
                const response = await axios.post(`${backend.getBackendUrl()}/addDonation`, {
                    heading: heading,
                    description: description,
                    tag: tag,
                    date: currentDate, // Include current date in the request
                    donor_id: donor_id,
                });
                window.location.reload();
            } catch (err) {
                if (err.response && err.response.data && err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert("Something went wrong");
                }
            }
        }
    };

    return (
        <div className=" h-full min-h-screen p-3">
            <Navbar />
            {sess.getDonor() && (
                <div className="flex items-center justify-center mt-40">
                    <div className="block rounded-lg bg-white shadow-lg w-[36rem] p-10">
                        <header className="text-center">
                            <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                                Add Donation
                            </h4>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="relative" data-te-input-wrapper-init>
                                <input
                                    type="text"
                                    className="outline outline-neutral-300 focus:outline-lime-600 focus:placeholder:text-lime-600 outline-2 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 h-10 leading-[1.6] transition-all duration-500"
                                    id="heading"
                                    placeholder="Heading"
                                    onChange={(e) => {
                                        setHeading(e.target.value);
                                    }}
                                    value={heading}
                                />
                            </div>
                            <div className="relative" data-te-input-wrapper-init>
                                <input
                                    type="text"
                                    className="outline outline-neutral-300 focus:outline-lime-600 focus:placeholder:text-lime-600 outline-2 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 h-10 leading-[1.6] transition-all duration-500"
                                    id="description"
                                    placeholder="Description"
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                    value={description}
                                />
                            </div>
                            <div className="relative" data-te-input-wrapper-init>
                                <input
                                    type="text"
                                    className="outline outline-neutral-300 focus:outline-lime-600 focus:placeholder:text-lime-600 outline-2 peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 h-10 leading-[1.6] transition-all duration-500"
                                    id="tag"
                                    placeholder="Tag"
                                    onChange={(e) => {
                                        setTag(e.target.value);
                                    }}
                                    value={tag}
                                />
                            </div>
                            <div className="pb-1 pt-1 text-center">
                                <button
                                    className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-500 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus: focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] bg-lime-600"
                                    type="submit"
                                    data-te-ripple-init
                                    data-te-ripple-color="light"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {!sess.getDonor() && (
                <div className="text-center text-xl font-bold mt-8">You are not logged in as a donor.</div>
            )}
        </div>
    );
}

export default AddDonation;
