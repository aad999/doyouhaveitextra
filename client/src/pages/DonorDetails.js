import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import sess from '../functions/sessionHandler';


function DonorDetails(props) {

    const navigate = useNavigate();
    const params = useParams();
    const donorId = params.donorId;
    const [donor, setDonor] = useState(null);

    useEffect(() => {
        if (sess.getDonor() === false && sess.getNGO() === false) {
            alert("Please Log In First");
            navigate('/home');
        }
        const fetchDonorData = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8080/api/donor/search?id=${donorId}`
                );
                setDonor(response.data);
            } catch (err) {
                if (err.response && err.response.data && err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert("Something went wrong");
                }
            }
        };
        fetchDonorData();
    }, [donorId]);

    return (
        <div className="p-3">
            <Navbar />
            {donor ? (
                <div className="bg-[hsla(0,0%,100%,0.55)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] p-9 rounded-sm mb-3 flex flex-col">
                    <h3 className="text-xl md:text-2xl font-bold truncate mb-4">
                        Donor Details
                    </h3>
                    <table className="border-collapse w-full">
                        <tbody>
                            <tr>
                                <td className="font-bold border-2 border-black p-2 min-w-[200px] truncate">
                                    Full Name:
                                </td>
                                <td className="border-2 border-black p-2 truncate">
                                    {donor?.name}
                                </td>
                            </tr>
                            <tr>
                                <td className="font-bold border-2 border-black p-2 min-w-[200px] truncate">
                                    Email Id:
                                </td>
                                <td className="border-2 border-black p-2 underline truncate">
                                    <a href={`mailto:${donor?.emailId}`}>{donor?.emailId}</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-bold border-2 border-black p-2 min-w-[200px] truncate">
                                    Phone Number:
                                </td>
                                <td className="border-2 border-black p-2 underline truncate">
                                    <a href={`tel:${donor?.phoneNum}`}>{donor?.phoneNum}</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}

export default DonorDetails;