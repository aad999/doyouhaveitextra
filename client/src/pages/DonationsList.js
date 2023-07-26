import React, { useState, useEffect } from "react";
import axios from "axios";
import sess from "../functions/sessionHandler";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "./Navbar";


const DonationsList = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [ngoData, setNgoData] = useState(null);

    useEffect(() => {
        if (sess.getDonor()) {
            navigate("/donor/dashboard");
        }
        if(!sess.getNGO()) {
            alert("Please Log In First");
            navigate('/home');
        }
    }, []);

    const handleInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearch = async () => {
        try {
            const encodedQuery = encodeURIComponent(searchQuery);
            const response = await axios.get(
                `${"https://do-you-have-it-extra-backend.onrender.com"}/api/donations/search?query=${encodedQuery}`
            );
            setSearchResults(response.data);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert("Something went wrong");
            }
        }
    };

    useEffect(() => {
        handleSearch();
        fetchNgoData();
    }, []);

    const fetchNgoData = async () => {
        try {
            const response = await axios.get(
                `${"https://do-you-have-it-extra-backend.onrender.com"}/api/ngo/search?id=${sess.getNGO()}`
            );
            setNgoData(response.data);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert("Something went wrong");
            }
            setNgoData(null);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleButtonClick = (donationId) => {
        const endpoint = `${"https://do-you-have-it-extra-backend.onrender.com"}/request/submit`;
        const data = {
            ngoId: sess.getNGO(),
            donationId: donationId,
        };
        axios
            .post(endpoint, data)
            .then((response) => {
                handleSearch();
                fetchNgoData();
                // Refresh data after submission
            })
            .catch((error) => {
                console.error("Error submitting post request:", error);
                if (error.response && error.response.data && error.response.data.error) {
                    // Show an alert with the error message from the server
                    alert(error.response.data.error);
                } else {
                    // Show a generic error alert
                    alert("Something went wrong. Please try again.");
                }
            });
    };

    const isDonationSubmitted = (donationId) => {
        if (ngoData && ngoData.sent && ngoData.sent.includes(donationId)) {
            return true;
        }
        if (ngoData && ngoData.received && ngoData.received.includes(donationId)) {
            return true;
        }
        return false;
    };

    return (
        <div className="p-3 h-full min-h-screen">
            <Navbar />
            <div className="bg-[hsla(0,0%,100%,0.55)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] p-9 rounded-sm mb-3 flex flex-col">
                <h3 className="text-2xl md:text-4xl font-bold truncate">
                    Browse Donations
                </h3>
            </div>
            <div className="bg-[hsla(0,0%,100%,0.55)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] py-3 px-6 flex items-center justify-between mb-3 rounded-sm">
                {sess.getNGO() ? (
                    <div className="w-full">
                        <div className="mb-4">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={handleInputChange}
                                onKeyDown={handleSearch}
                                onKeyUp={handleSearch}
                                className="p-2 rounded-sm w-64 focus:outline-1"
                                placeholder="Search for donations"
                            />
                            <button
                                onClick={handleSearch}
                                className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-sm"
                            >
                                Search
                            </button>
                        </div>

                        {(
                            searchResults
                                .sort((a, b) => new Date(b.date) - new Date(a.date))
                                .map((result) => (
                                    <div
                                        key={result._id}
                                        className="border-2 border-black rounded-sm p-4 mb-4"
                                    >
                                        <div className="text-sm text-gray-500 mb-2">
                                            {formatDate(result.date)}
                                        </div>
                                        <h2 className="text-lg font-semibold mb-2 truncate">
                                            {result.heading}
                                        </h2>
                                        <div className="mb-2 text-sm text-gray-700 truncate">
                                            {result.description}
                                        </div>
                                        <div className="text-sm font-semibold text-blue-500 truncate mb-2">
                                            {result.tag}
                                        </div>
                                        <div className="mb-2 flex space-x-3 items-center" key={result._id}>
                                            <Link className="cursor-pointer hover:bg-neutral-200 text-sm font-semibold truncate px-4 py-1 outline outline-2 rounded-sm" to={`/donor/search/${result.donor._id}`}>
                                                {result.donor.name}
                                            </Link>
                                            {isDonationSubmitted(result._id) ? (
                                                <button
                                                    disabled
                                                    className="px-4 py-1 text-sm text-bold rounded-full bg-gray-300 text-white cursor-not-allowed"
                                                >
                                                    Submitted
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleButtonClick(result._id)}
                                                    className="px-4 py-1 text-sm text-bold rounded-full bg-blue-600 text-white hover:bg-blue-700"
                                                >
                                                    Submit
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>
                ) : (
                    <div className="text-center">You are not logged in as NGO.</div>
                )}
            </div>
        </div>
    );
};

export default DonationsList;
