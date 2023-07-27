import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sess from '../functions/sessionHandler';
import { useNavigate } from 'react-router-dom';

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
                `${"https://do-you-have-it-extra-backend.onrender.com"}/api/ngo/verify/search?id=${ngoId}`
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
                `${"https://do-you-have-it-extra-backend.onrender.com"}/api/ngo/cancelverification/search?id=${ngoId}`
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
            {/* Rest of the code for the admin dashboard */}
            {/* ... */}
        </div>
    );
};

export default AdminDashboard;
