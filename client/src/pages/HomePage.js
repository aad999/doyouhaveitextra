import { Link } from 'react-router-dom';
import sess from "../functions/sessionHandler";
import Navbar from "./Navbar";


function HomePage() {

    return (
        <div className="p-3">
            <Navbar />
            <div className="h-screen">
                <div className="px-6 py-12 text-center md:px-12 lg:text-left">
                    <div className="w-100 mx-auto sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-7xl xl:px-32">
                        <div className="grid items-center lg:grid-cols-2">
                            <div className="mb-12 md:mt-12 lg:mt-0 lg:mb-0">
                                <div
                                    className="block rounded-lg bg-[hsla(0,0%,100%,0.55)] px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] md:px-12 lg:-mr-14 backdrop-blur-[30px]">
                                    <h1 className="mt-2 mb-4 text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl">
                                        do you have it <br /><span className="text-lime text-shadow-lg text-lime-600">extra?</span>
                                    </h1>
                                    <p className="mt-8 mb-16 text-xl font-semibold tracking-tight">
                                        Embark on a compassionate journey with us, bridging the gap between certified NGOs and generous individuals. Through our interface, you can donate your surplus goods, which will be channeled by NGOs to those in need. Embracing the power of equitable resource distribution, together, let's create a more socially just world. Join us on our impactful mission today.
                                    </p>
                                    <Link className="mb-2 inline-block rounded px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-bold shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-lime-600 hover:text-white hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-lime-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-lime-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] md:mr-2 md:mb-0"
                                        data-te-ripple-init data-te-ripple-color="light" to="/joinUs" role="button">{sess.getDonor() || sess.getNGO() ? "Enter" : "Join Us"}</Link>
                                    <Link className="inline-block rounded px-12 pt-4 pb-3.5 text-sm font-medium uppercase leading-normal text-lime transition duration-150 ease-in-out hover:bg-neutral-500 hover:bg-opacity-10 hover:text-lime-600 focus:text-lime-600 focus:outline-none focus:ring-0 active:text-lime-700"
                                        data-te-ripple-init data-te-ripple-color="light" to="/aboutUs" role="button">About Us</Link>
                                </div>
                            </div>
                            <div className="md:mb-12 lg:mb-0">
                                <img
                                    src="Elements/Thumbnail.png"
                                    className="w-full rounded-lg shadow-2xl"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;