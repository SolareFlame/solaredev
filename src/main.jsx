import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Navbar from "./Navbar.jsx";

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Navbar />
        <div className="pt-[200px]">
            <App />
        </div>
    </React.StrictMode>
);
