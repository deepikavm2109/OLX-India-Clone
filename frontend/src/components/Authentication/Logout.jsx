import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../services/auth.js';

const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        auth.logout();
        navigate('/login'); // Redirect to login or any other page after logout
    }, [navigate]);

    return null; // Optionally, return a loading spinner or message if needed
};

export default Logout;