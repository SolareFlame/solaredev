import {useEffect, useState} from "react";


const DarkMode = () => {
    const [darkMode, setDarkMode] = useState(
        () => localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    return (
        <div className="bg-background dark:bg-background_dark text-primary transition-colors duration-300">
            <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 border border-border rounded"
            >
                Toggle Mode
            </button>
        </div>
    );
}

export default DarkMode;
