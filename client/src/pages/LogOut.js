import React, { useState, useEffect } from "react";
import sess from "../functions/sessionHandler";
import { useNavigate, Link } from "react-router-dom";


function LogOut(){
    const navigate = useNavigate();
    sess.rem();
    useEffect(() => navigate('/'), [])
    return (
        <div className='h-full min-h-screen'>Redirecting...</div>
    );
}

export default LogOut;