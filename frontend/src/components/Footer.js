import React from 'react';
import { useLocation } from 'react-router-dom';


const Footer = () => {
    const location = useLocation();
    return (

        <footer className="footer">
            {location.pathname === '/' && (
                <p className="footer__copyright">&copy;{new Date().getFullYear()} Mesto Russia</p>
            )}
        </footer>

    )
};

export default Footer;