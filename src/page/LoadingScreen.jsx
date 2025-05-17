import React from 'react';
import SolareLogo from "../assets/solare.svg?react";

const LoadingScreen = ({ isVisible }) => {
    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-purple-600 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[-100%] pointer-events-none'
            }`}
        >
            <div className="flex flex-col items-center">
                <SolareLogo className="w-32 h-32 mb-4 text-white" />
            </div>
        </div>
    );
};

export default LoadingScreen;
