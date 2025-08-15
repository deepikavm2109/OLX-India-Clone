import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Modal, Button, Form } from "react-bootstrap";
import auth from "../../services/auth.js";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Open the modal when the component loads
    setIsRegisterModalOpen(true);
  }, []);

  const handleCloseModal = () => {
    setIsRegisterModalOpen(false);
    navigate("/"); // Redirect to the homepage after closing the modal
  };

  const handleRegister = (e) => {
    e.preventDefault();

    auth.register(username, email, password).then(
      (response) => {
        setMessage("Registration successful!");
        navigate("/login"); // Redirect to login after successful registration
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.detail) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
      }
    );
  };

  return (
    <>
      {/* Registration Modal */}
      <Modal show={isRegisterModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleRegister}>
            <div>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button
              variant="primary"
              type="submit"
              style={{ marginTop: "10px" }}
            >
              Register
            </Button>
            <NavLink to="/login">
              <Button variant="link" className="linkclick">
                Login
              </Button>
            </NavLink>
          </form>
          {message && <p style={{ color: "red" }}>{message}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Register;
