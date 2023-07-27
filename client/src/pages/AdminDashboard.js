import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sess from '../functions/sessionHandler';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [ngos, setNgos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!sess.getAdmin()) {
            navigate('/admin/login');
        } else {
            fetchNgos();
        }
    }, [navigate]);

    const fetchNgos = async () => {
        try {
            const response = await axios.get(
                `${"https://do-you-have-it-extra-backend.onrender.com"}/api/ngos/getall`
            );
            setNgos(response.data.ngos);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching NGOs:', error);
            setIsLoading(false); // Set isLoading to false even on error
        }
    };

    const handleVerifyNgo = async (ngoId) => {
        try {
            const response = await axios.post(
                `${"https://do-you-have-it-extra-backend.onrender.com"}/ngo/verify/search?id=${ngoId}`
            );
            // Update the state to mark the NGO as verified
            setNgos(prevNgos =>
                prevNgos.map(ngo => (ngo._id === ngoId ? { ...ngo, verified: true } : ngo))
            );
            alert(response.data.message);
        } catch (error) {
            console.error('Error verifying NGO:', error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Something went wrong. Please try again.');
            }
        }
    };

    const handleCancelVerification = async (ngoId) => {
        try {
            const response = await axios.post(
                `${"https://do-you-have-it-extra-backend.onrender.com"}/ngo/cancelVerification?id=${ngoId}`
            );
            // Update the state to mark the NGO as not verified
            setNgos(prevNgos =>
                prevNgos.map(ngo => (ngo._id === ngoId ? { ...ngo, verified: false } : ngo))
            );
            alert(response.data.message);
        } catch (error) {
            console.error('Error canceling verification:', error);
            if (error.response && error.response.data && error.response.data.message) {
                alert(error.response.data.message);
            } else {
                alert('Something went wrong. Please try again.');
            }
        }
    };

    return (
        <div className="h-screen p-3">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            {isLoading ? (
                <div>
                    <Loading />
                </div>
            ) : (
                <div>
                    <h2 className="text-xl font-bold mb-4">NGOs</h2>
                    {ngos.map(ngo => (
                        <div key={ngo._id} className="border border-gray-300 rounded p-4 mb-4">
                            <h3 className="text-lg font-semibold mb-2">{ngo.name}</h3>
                            <p className="text-sm mb-2">Email: {ngo.emailId}</p>
                            <p className="text-sm mb-2">Phone Number: {ngo.phoneNum}</p>
                            <p className="text-sm mb-2">Verification Document: <a href={ngo.verificationDoc} target="_blank" rel="noopener noreferrer">{ngo.verificationDoc}</a></p>
                            {ngo.verified ? (
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded"
                                    onClick={() => handleCancelVerification(ngo._id)}
                                >
                                    Cancel Verification
                                </button>
                            ) : (
                                <button
                                    className="bg-green-500 text-white px-3 py-1 rounded"
                                    onClick={() => handleVerifyNgo(ngo._id)}
                                >
                                    Verify
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;