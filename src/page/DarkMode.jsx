import { useEffect, useState } from 'react';

import MoonIcon from '../assets/icons/moon.svg?react';
import SunIcon from '../assets/icons/sun.svg?react';

const DarkMode = () => {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (
            localStorage.theme === 'dark' ||
            (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark');
            setDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        const isDark = !darkMode;
        setDarkMode(isDark);
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full text-textday dark:text-white transition-colors duration-300 focus:outline-none"
            aria-label="Toggle dark mode"
        >
            {darkMode ? (
                <MoonIcon className="w-6 h-6" />
            ) : (
                <SunIcon className="w-6 h-6" />
            )}
        </button>
    );
}

export default DarkMode;
