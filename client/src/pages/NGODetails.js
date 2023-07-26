import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import sess from '../functions/sessionHandler';
import backend from '../functions/backend.js';


function NGODetails(props) {
    const navigate = useNavigate();
    const params = useParams();
    const ngoId = params.ngoId;
    const [ngo, setNGO] = useState(null);

    useEffect(() => {
        if(sess.getDonor() === false && sess.getNGO() === false){
            alert("Please Log In First");
            navigate('/home');
        }
        const fetchNGOData = async () => {
            try {
                const response = await axios.get(
                    `${backend.getBackendUrl()}/api/ngo/search?id=${ngoId}`
                );
                setNGO(response.data);
            } catch (err) {
                if (err.response && err.response.data && err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert("Something went wrong");
                }
            }
        };
        fetchNGOData();
    }, [ngoId]);

    return (
        <div className="p-3">
            <Navbar/>
            {ngo ? (
                <div className="bg-[hsla(0,0%,100%,0.55)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] p-9 rounded-sm mb-3 flex flex-col">
                    <h3 className="text-xl md:text-2xl font-bold truncate mb-4">
                        NGO Details
                    </h3>
                    <table className="border-collapse w-full">
                        <tbody>
                            <tr>
                                <td className="font-bold border-2 border-black p-2 min-w-[200px] truncate">
                                    Full Name:
                                </td>
                                <td className="border-2 border-black p-2 truncate">
                                    {ngo?.name}
                                </td>
                            </tr>
                            <tr>
                                <td className="font-bold border-2 border-black p-2 min-w-[200px] truncate">
                                    Email Id:
                                </td>
                                <td className="border-2 border-black p-2 underline truncate">
                                    <a href={`mailto:${ngo?.emailId}`}>{ngo?.emailId}</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-bold border-2 border-black p-2 min-w-[200px] truncate">
                                    Phone Number:
                                </td>
                                <td className="border-2 border-black p-2 underline truncate">
                                    <a href={`tel:${ngo?.phoneNum}`}>{ngo?.phoneNum}</a>
                                </td>
                            </tr>
                            <tr>
                                <td className="font-bold border-2 border-black p-2 min-w-[200px] truncate">
                                    Verification Documents Merged Link:
                                </td>
                                <td className="border-2 border-black p-2 underline truncate">
                                    <a href={`${ngo?.verificationDoc}`}>{ngo?.verificationDoc}</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}

export default NGODetails;
