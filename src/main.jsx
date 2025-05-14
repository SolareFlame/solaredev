import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './assets/css/index.css';
import Navbar from './page/Navbar.jsx';
import LoadingScreen from './page/LoadingScreen.jsx';

function Root() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <React.StrictMode>
            <LoadingScreen isVisible={loading} />
            <div className={`${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}>
                <Navbar />
                <div className="pt-[200px]">
                    <App />
                </div>
            </div>
        </React.StrictMode>
    );
}

createRoot(document.getElementById('root')).render(<Root />);
