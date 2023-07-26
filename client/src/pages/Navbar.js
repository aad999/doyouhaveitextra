import React from 'react';
import sess from '../functions/sessionHandler';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-[hsla(0,0%,100%,0.55)] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] backdrop-blur-[30px] py-3 px-6 flex items-center justify-between mb-3 rounded-sm">
            <div className="flex items-center">
                <Link to="/">
                    <img src="/Elements/Logo.png" alt="Logo" className="h-8 md:h-10" />
                </Link>
            </div>
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">

                <Link
                    to="/"
                    className="text-black px-1 py-2 rounded-md text-sm font-medium hover:decoration hover:underline transition-all duration-500"
                >
                    Home
                </Link>

                {sess.getDonor() && (
                    <>
                        <Link
                            to='/donor/dashboard'
                            className="text-black px-1 py-2 rounded-md text-sm font-medium hover:decoration hover:underline transition-all duration-500"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to='/addDonation'
                            className="text-black px-1 py-2 rounded-md text-sm font-medium hover:decoration hover:underline transition-all duration-500"
                        >
                            Add Donation
                        </Link>
                    </>
                )}

                {sess.getNGO() && (
                    <>
                        <Link
                            to='/ngo/dashboard'
                            className="text-black px-1 py-2 rounded-md text-sm font-medium hover:decoration hover:underline transition-all duration-500"
                        >
                            Dashboard
                        </Link>
                        <Link
                            to='/donationsList'
                            className="text-black px-1 py-2 rounded-md text-sm font-medium hover:decoration hover:underline transition-all duration-500"
                        >
                            Browse Donations
                        </Link>
                    </>
                )}

                {(sess.getDonor() || sess.getNGO()) && (
                    <Link
                        to="/logout"
                        className="text-black px-1 py-2 rounded-md text-sm font-medium hover:decoration hover:underline hover:text-red-500 transition-all duration-500"
                    >
                        Log Out
                    </Link>
                )}

            </div>
        </nav>
    );
}

export default Navbar;
