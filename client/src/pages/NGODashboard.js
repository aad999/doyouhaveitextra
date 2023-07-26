import React, { useState, useEffect } from "react";
import axios from "axios";
import sess from "../functions/sessionHandler";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";


const NGODashboard = () => {
    const navigate = useNavigate();
    const [donationsData, setDonationsData] = useState([]);
    const [ngoData, setNgoData] = useState(null);

    useEffect(() => {
        if (sess.getDonor()) {
            navigate('/donor/dashboard');
        }
        if (!sess.getNGO()) {
            alert('Please Log In First');
            navigate('/home');
        }
        fetchDonationsData();
        fetchNgoData();
    }, []);

    const fetchDonationsData = async () => {
        try {
            const response = await axios.get(
                `${"https://do-you-have-it-extra-backend.onrender.com"}/api/ngo/received/search?id=${sess.getNGO()}`
            );
            const populatedData = await populateDonorData(response.data);
            setDonationsData(populatedData);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert("Something went wrong");
            }
            setDonationsData([]);
        }
    };

    const fetchNgoData = async () => {
        try {
            const response = await axios.get(
                `${"https://do-you-have-it-extra-backend.onrender.com"}/api/ngo/search?id=${sess.getNGO()}`
            );
            setNgoData(response.data);
        } catch (error) {
            console.error("Error fetching NGO data:", error);
            setNgoData(null);
        }
    };

    const populateDonorData = async (donations) => {
        const populatedDonations = [];
        for (const donation of donations) {
            try {
                const response = await axios.get(
                    `${"https://do-you-have-it-extra-backend.onrender.com"}/api/donor/search?id=${donation.donor}`
                );
                const donorData = response.data;
                donation.donor = donorData;
                populatedDonations.push(donation);
            } catch (error) {
                console.error(
                    `Error fetching donor data for donation with ID ${donation._id}:`,
                    error.message
                );
            }
        }
        return populatedDonations;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="p-3 h-full min-h-screen">
            <Navbar />
            <div className="bg-[hsla(0,0%,100%,0.55)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] p-9 rounded-sm mb-3 flex flex-col">
                <h3 className="text-2xl md:text-4xl font-bold truncate">
                    NGO Dashboard
                </h3>
            </div>
            <div className="bg-[hsla(0,0%,100%,0.55)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] p-9 rounded-sm mb-3 flex flex-col">
                <h3 className="text-xl md:text-2xl font-bold truncate mb-4">
                    NGO Details
                </h3>
                <table className="border-collapse">
                    <tbody>
                        <tr>
                            <td className="font-bold border-2 border-black p-2 min-w-[200px] truncate">Name:</td>
                            <td className="border-2 border-black p-2 truncate">{ngoData && ngoData.name}</td>
                        </tr>
                        <tr>
                            <td className="font-bold border-2 border-black p-2 min-w-[200px] truncate">Email Id:</td>
                            <td className="border-2 border-black p-2 truncate">
                                {ngoData && (
                                    <a className="underline" href={`mailto:${ngoData.emailId}`}>
                                        {ngoData.emailId}
                                    </a>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-bold border-2 border-black p-2 min-w-[200px] truncate">Phone Number:</td>
                            <td className="border-2 border-black p-2 truncate">
                                {ngoData && (
                                    <a className="underline" href={`tel:${ngoData.phoneNum}`}>
                                        {ngoData.phoneNum}
                                    </a>
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td className="font-bold border-2 border-black p-2 min-w-[200px] truncate">Verification Documents:</td>
                            <td className="border-2 border-black p-2 truncate">
                                {ngoData && (
                                    <a className="underline" href={`${ngoData.verificationDoc}`}>
                                        {ngoData.verificationDoc}
                                    </a>
                                )}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="bg-[hsla(0,0%,100%,0.55)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] p-5 rounded-sm mb-5 flex flex-col">
                <h2 className="text-xl md:text-2xl font-bold pt-2 mb-5 truncate">Accepted Requests</h2>
                {sess.getNGO() ? (
                    <div className="w-full">
                        {donationsData.length > 0 ? (
                            donationsData.slice().reverse().map((donation) => (
                                <div key={donation._id} className="border-2 border-black rounded-sm p-4 mb-4">
                                    <div className="text-sm text-gray-500 mb-2">{formatDate(donation.date)}</div>
                                    <h2 className="text-lg font-semibold mb-2 truncate">{donation.heading}</h2>
                                    <div className="mb-2 text-sm text-gray-700 truncate">{donation.description}</div>
                                    <div className="text-sm font-semibold text-blue-500 truncate mb-2">
                                        {donation.tag}
                                    </div>
                                    {donation.donor && (
                                        <Link
                                            className="cursor-pointer hover:bg-neutral-200 text-sm font-semibold truncate px-4 py-1 outline outline-2 rounded-sm"
                                            to={`/donor/search/${donation.donor._id}`}
                                        >
                                            {donation.donor.name}
                                        </Link>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div></div>
                        )}
                    </div>
                ) : (
                    <div className="text-center">You are not logged in as NGO.</div>
                )}
            </div>
        </div>
    );
};

export default NGODashboard;
