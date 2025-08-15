import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, NavLink, Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import auth from '../../services/auth.js';
import "../style/Authentication.css"

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    useEffect(() => {
        // Open the modal as soon as the page loads
        setIsLoginModalOpen(true);
    }, []);

    const handleCloseModal = () => {
        setIsLoginModalOpen(false);
        navigate("/"); // Redirect to home page after closing the modal
    };

    useEffect(() => {
        // Reset error when the component mounts
        setError('');
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await auth.login(username, password);
            const from = location.state?.from?.pathname || '/'; 
            navigate(from);
        } catch (error) {
            setError(error.detail || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <>
            <Modal show={isLoginModalOpen} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleLogin}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                            />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" style={{marginTop:"10px"}}>
                            Login
                        </Button>
                        <NavLink to="/register">
              <Button variant="link" className="linkclick">
                Register
              </Button>
            </NavLink>
                    </Form>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Login;
