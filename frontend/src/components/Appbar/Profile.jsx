import React, { useState, useEffect } from 'react';
import auth from '../../services/auth';
import { NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoIosCloseCircle } from "react-icons/io";

const Profile = ({ onClose }) => {
  const currentUser = auth.getCurrentUser();

  return (
    <div style={modalStyles}>
      <div style={modalContentStyles}>
        <p><IoIosCloseCircle onClick={onClose} style={{marginLeft:"89%", fontSize:"30px", color:"red"}}/></p>
        <h1>Profile</h1>
        {currentUser ? (
          <div>
            <h3>{currentUser.username}</h3>
            <p>{currentUser.email}</p>
            <NavLink to="/logout" onClick={() => {
              auth.logout();
              onClose(); // Close the modal on logout
            }}>
              Logout
            </NavLink>
          </div>
        ) : (
          <NavLink to="/login">Please log in to see your profile.</NavLink>
          
        )}
        <button onClick={onClose} style={{border:"0", backgroundColor:"transparent", color:"red", fontWeight:"900", marginTop:"20px"}}>Close</button>
      </div>
    </div>
  );
};

const modalStyles = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  backdropFilter: 'blur(5px)', // Blur background content
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex:'1000'
  
};

const modalContentStyles = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '15px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)', // Add a shadow
  width: '90%',
  maxWidth: '400px',
  textAlign: 'center',
};

export default Profile;
