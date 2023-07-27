import React from "react";
import Navbar from "./Navbar";

const WaitingForVerification = () => {
    return (
        <div>
            <div className="p-3 h-full min-h-screen flex items-center justify-center">
                <div className="bg-[hsla(0,0%,100%,0.55)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] p-9 rounded-sm max-w-sm">
                    <h2 className="text-xl md:text-2xl font-bold mb-4">Account Under Review</h2>
                    <p className="text-gray-600">
                        Thank you for registering as an NGO. Your account is currently under
                        review. Please regularly visit the site to check for updates on your
                        account verification status. Once the verification process is
                        complete, you will be able to access your NGO Dashboard and start
                        accepting donation requests.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WaitingForVerification;