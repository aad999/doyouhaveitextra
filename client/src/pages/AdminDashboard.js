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
                `${"https://do-you-have-it-extra-backend.onrender.com"}/ngo/verify?id=${ngoId}`
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
            <div className="bg-[hsla(0,0%,100%,0.55)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] p-6 rounded-sm mb-3">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            </div>
            {isLoading ? (
                <div>
                    <Loading />
                </div>
            ) : (
                <div>
                    <div className="bg-[hsla(0,0%,100%,0.55)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] p-6 rounded-sm mb-3">
                        <h2 className="text-xl font-bold">NGOs</h2>
                    </div>
                    {ngos.map(ngo => (
                        <div key={ngo._id} className="bg-[hsla(0,0%,100%,0.55)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] p-9 rounded-sm mb-3 flex flex-col">
                            <h3 className="text-lg font-semibold mb-3">{ngo.name}</h3>
                            <p className="text-md mb-3">Email: <a href={`mailto:${ngo.emailId}`} className="underline">{ngo.emailId}</a></p>
                            <p className="text-md mb-3">Phone Number: <a href={`tel:${ngo.phoneNum}`} className="underline">{ngo.phoneNum}</a></p>
                            <p className="text-md mb-4">Verification Document: <a href={ngo.verificationDoc} target="_blank" rel="noopener noreferrer" class="font-bold underline text-blue-700">{ngo.verificationDoc}</a></p>
                            {ngo.verified ? (
                                <button
                                    className="bg-red-500 text-white px-3 py-1 rounded-full w-fit"
                                    onClick={() => handleCancelVerification(ngo._id)}
                                >
                                    Cancel Verification
                                </button>
                            ) : (
                                <button
                                    className="bg-green-500 text-white px-3 py-1 rounded-full w-fit"
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