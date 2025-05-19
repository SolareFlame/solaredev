import React, { useState } from "react";
import SolareLogo from "../assets/solare.svg?react";
import DarkMode from "./DarkMode.jsx";

const MenuItem = ({ label, target, onClick }) => {
    const handleClick = () => {
        const element = document.getElementById(target);
        const offset = -200;
        window.scrollTo({ top: element.offsetTop + offset, behavior: "smooth" });
        if (onClick) onClick();
    };

    return (
        <li className="group relative mx-10">
            <span
                className="transition-all ease-in-out text-[20px] hover:text-[#7C49D6] cursor-pointer"
                onClick={handleClick}
            >
                {label}
            </span>
            <span className="absolute inset-x-0 bottom-[-6px] h-1 bg-[#7C49D6] scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </li>
    );
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-background bg-opacity-80 dark:bg-background_dark dark:bg-opacity-80 backdrop-blur-lg text-textday dark:text-[#BBB9BE]">
            <div className="flex items-center justify-between max-w-6xl mx-auto px-4 py-4">
                <div className="md:hidden cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                    {!isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                </div>

                <div className="absolute top-2 right-2">
                    <DarkMode />
                </div>

                <ul className="hidden md:grid grid-cols-5 items-center w-full text-center">
                    <MenuItem label="Home" target="home" />
                    <MenuItem label="About" target="about" />

                    <li className="w-[75px] h-[75px] bg-[#7C49D6] flex items-center justify-center rounded mx-auto">
                        <SolareLogo
                            className="w-[32px] h-[32px] text-white cursor-pointer"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        />
                    </li>

                    <MenuItem label="Projects" target="projects" />
                    <MenuItem label="Contact" target="contact" />
                </ul>
            </div>

            {isOpen && (
                <ul className="md:hidden flex flex-col items-center gap-6 pt-4 pb-6">
                    <MenuItem label="Home" target="home" onClick={() => setIsOpen(false)} />
                    <MenuItem label="About" target="about" onClick={() => setIsOpen(false)} />
                    <MenuItem label="Projects" target="projects" onClick={() => setIsOpen(false)} />
                    <MenuItem label="Contact" target="contact" onClick={() => setIsOpen(false)} />
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
