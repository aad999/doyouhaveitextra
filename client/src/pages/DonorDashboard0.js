import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sess from '../functions/sessionHandler';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


const DonorDashboard0 = () => {
    const navigate = useNavigate();

    const [donor, setDonor] = useState(null);
    const [donations, setDonations] = useState([]);
    const [selectedDonationId, setSelectedDonationId] = useState(null);
    const [selectedNgoData, setSelectedNgoData] = useState([]);
    const [donationData, setDonationData] = useState(null);

    useEffect(() => {
        if (sess.getNGO()) {
            navigate('/ngo/dashboard');
        }
        if (!sess.getDonor()) {
            alert('Please Log In First');
            navigate('/home');
        }
        const fetchDonorData = async () => {
            try {
                const donorId = sess.getDonor();
                const response = await axios.get(`${"https://do-you-have-it-extra-backend.onrender.com"}/api/donor/search?id=${donorId}`);
                setDonor(response.data);
                const donationIds = response.data.donations;
                fetchDonations(donationIds);
            } catch (err) {
                if (err.response && err.response.data && err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert("Something went wrong");
                }
            }
        };
        fetchDonorData();
    }, []);

    const fetchDonations = async (donationIds) => {
        try {
            const donationData = await Promise.all(donationIds.map(donationId => (
                axios.get(`${"https://do-you-have-it-extra-backend.onrender.com"}/api/donation/search?id=${donationId}`)
            )));
            const donations = donationData.map(d => d.data);
            setDonations(donations);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert("Something went wrong");
            }
        }
    };

    const fetchNgoData = async (ngoIds) => {
        try {
            const ngoData = await Promise.all(ngoIds.map(ngoId => (
                axios.get(`${"https://do-you-have-it-extra-backend.onrender.com"}/api/ngo/search?id=${ngoId}`)
            )));
            const ngos = ngoData.map(d => d.data);
            setSelectedNgoData(ngos);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert("Something went wrong");
            }
        }
    };

    const toggleAccordion = async (donationId, refresh) => {
        if ((donationId === selectedDonationId) && refresh === false) {
            setSelectedDonationId(null);
            setSelectedNgoData([]);
        } else {
            setSelectedDonationId(donationId);
            const selectedDonation = donations.find(d => d._id === donationId);
            const ngoIds = [...selectedDonation.received, ...selectedDonation.sent];
            fetchNgoData(ngoIds);
        }
    };

    const isRequestAccepted = (donation, ngoId) => {
        if (donation && donation.sent && donation.sent.includes(ngoId)) {
            return true;
        }
        return false;
    }

    const handleButtonClick = (donationId, ngoId) => {
        const isConfirmed = window.confirm('Are you sure to accept the request?');
        if (isConfirmed) {
            const endpoint = `${"https://do-you-have-it-extra-backend.onrender.com"}/request/accept`;
            const data = {
                ngoId: ngoId,
                donationId: donationId,
            };
            axios.post(endpoint, data)
                .then((response) => {
                    navigate('/donor/dashboard1');
                    // Refresh data after submission
                })
                .catch((error) => {
                    console.error('Error submitting post request:', error);
                    if (error.response && error.response.data && error.response.data.error) {
                        // Show an alert with the error message from the server
                        alert(error.response.data.error);
                    } else {
                        // Show a generic error alert
                        alert('Something went wrong. Please try again.');
                    }
                });
        }
    }

    return (
        <div className="h-screen">
            {sess.getDonor() && (
                <div className="p-3">
                    <Navbar />
                    <div className="bg-[hsla(0,0%,100%,0.55)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] p-9 rounded-sm mb-3 flex flex-col">
                        <h3 className="text-2xl md:text-4xl font-bold truncate">
                            Donor Dashboard
                        </h3>
                    </div>
                    <div className="bg-[hsla(0,0%,100%,0.55)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] p-9 rounded-sm mb-3 flex flex-col">
                        <h3 className="text-xl md:text-2xl font-bold truncate mb-4">
                            Donor Details
                        </h3>
                        <table className="border-collapse w-full">
                            <tbody>
                                <tr>
                                    <td className="font-bold border-2 border-black p-2 min-w-[200px] truncate">Full Name:</td>
                                    <td className="border-2 border-black p-2 truncate">{donor && donor.name}</td>
                                </tr>
                                <tr>
                                    <td className="font-bold border-2 border-black p-2 min-w-[200px] truncate">Email Id:</td>
                                    <td className="border-2 border-black p-2 truncate">
                                        {donor && (
                                            <a className="underline" href={`mailto:${donor.emailId}`}>
                                                {donor.emailId}
                                            </a>
                                        )}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="font-bold border-2 border-black p-2 min-w-[200px] truncate">Phone Number:</td>
                                    <td className="border-2 border-black p-2 truncate">
                                        {donor && (
                                            <a className="underline" href={`tel:${donor.phoneNum}`}>
                                                {donor.phoneNum}
                                            </a>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    {donor ? (
                        <div className="bg-[hsla(0,0%,100%,0.55)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] p-9 rounded-sm">
                            <h2 className="text-xl md:text-2xl font-bold mb-8 truncate">Donations</h2>
                            {donations.sort((a, b) => new Date(b.date) - new Date(a.date)).map((donation) => (
                                <div className="p-3 rounded-sm outline outline-2 mb-3 cursor-pointer" onClick={() => toggleAccordion(donation._id, false)} key={donation._id}>
                                    <h3 className="text-lg font-semibold mb-2 truncate">
                                        {donation.heading}
                                    </h3>
                                    <div className="ml-5 mb-2 text-sm font-normal italic truncate">
                                        {donation.description}
                                    </div>
                                    <h3 className="mb-3">
                                        <span className={`ml-5 text-xs rounded-full text-white p-1 ${donation.received.length ? "bg-lime-600" : "bg-gray-400 truncate"}`}>
                                            {donation.received.length} pending requests
                                        </span>
                                        <span className={`ml-2 text-xs rounded-full text-white p-1 ${donation.sent.length ? "bg-blue-600" : "bg-gray-400 truncate"}`}>
                                            {donation.sent.length} accepted requests
                                        </span>
                                    </h3>
                                    {selectedDonationId === donation._id && (
                                        <div className="ml-4">
                                            <div className="border-b-2 w-full border-black mb-5"></div>
                                            {selectedNgoData.sort((a, b) => new Date(b.date) - new Date(a.date)).map((ngo) => (
                                                <div className="mb-2 flex space-x-3" key={ngo._id}>
                                                    <Link className="cursor-pointer hover:bg-neutral-200 text-sm font-semibold truncate px-4 py-1 outline outline-2 rounded-sm" to={`/ngo/search/${ngo._id}`}>
                                                        {ngo.name}
                                                    </Link>
                                                    {isRequestAccepted(donation, ngo._id) ? (
                                                        <button className="text-xs px-4 py-1 bg-gray-400 text-white rounded-full transition-all duration-500 truncate cursor-not-allowed" disabled>
                                                            Accepted
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="text-xs px-4 py-1 bg-lime-600 text-white rounded-full hover:bg-lime-700 transition-all duration-500 truncate"
                                                            onClick={() => handleButtonClick(donation._id, ngo._id)}
                                                        >
                                                            Accept
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-xl font-bold"></div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DonorDashboard0;
