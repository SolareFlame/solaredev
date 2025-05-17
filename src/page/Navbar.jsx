import React from "react";
import SolareLogo from "../assets/solare.svg?react";
import DarkMode from "./DarkMode.jsx";

const MenuItem = ({ label, target }) => {
    const handleClick = () => {
        const element = document.getElementById(target);
        const offset = -200;

        window.scrollTo({
            top: element.offsetTop + offset,
            behavior: "smooth",
        });
    };

    return (
        <li className="group relative">
            <span
                className="transition-all ease-in-out text-[20px] hover:text-[#7C49D6] cursor-pointer"
                onClick={handleClick}
            >
                {label}
            </span>
            <span className="absolute inset-x-0 bottom-[-6px] h-1 bg-[#7C49D6] scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
        </li>
    );
};

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-background dark:bg-background_dark bg-opacity-80 dark:bg-opacity-80 backdrop-blur-lg text-textday dark:text-[#BBB9BE] py-4">
            <ul className="flex items-center justify-center gap-12 font-medium text-[16px]">
                <MenuItem label="Home" target="home" />
                <MenuItem label="About" target="about" />
                <li className="w-[75px] h-[75px] bg-[#7C49D6] flex items-center rounded justify-center transition-transform transform hover:scale-110">
                    <SolareLogo className="w-[32px] h-[32px] text-white" />
                </li>
                <MenuItem label="Projects" target="projects" />
                <MenuItem label="Contact" target="contact" />
            </ul>

            <div className="absolute top-4 right-4">
                <DarkMode />
            </div>
        </nav>

    );
};

export default Navbar;
