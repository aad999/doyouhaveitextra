import React, { useState, useEffect } from "react";


function Loading() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="loader-circle"></div>
        </div>
    );
}

export default Loading;