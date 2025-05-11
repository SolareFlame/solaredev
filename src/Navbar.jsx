import React from "react";
import SolareLogo from "./assets/solare.svg";

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-[#100E15] text-white py-4">
            <ul className="flex items-center justify-center gap-12 font-medium text-[16px]">
                <li className="hover:text-[#7C49D6] cursor-pointer transition text-[20px]">Home</li>
                <li className="hover:text-[#7C49D6] cursor-pointer transition text-[20px]">About</li>

                <li className="w-[75px] h-[75px] bg-[#7C49D6] flex items-center justify-center rounded">
                    <img src={SolareLogo} alt="Logo" className="w-[32px] h-[32px]" />
                </li>

                <li className="hover:text-[#7C49D6] cursor-pointer transition text-[20px]">Projects</li>
                <li className="hover:text-[#7C49D6] cursor-pointer transition text-[20px]">Contact</li>
            </ul>
        </nav>
    );
};

export default Navbar;