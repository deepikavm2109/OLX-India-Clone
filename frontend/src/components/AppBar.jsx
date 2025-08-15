// import React, { useEffect, useState } from "react";
// import { Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import auth from "../services/auth";
// import { RxAvatar } from "react-icons/rx";
// import Profile from "../components/Appbar/Profile"; // Import Profile component
// import iconimg from "./../images/olx-icon.png";
// import { CiSearch } from "react-icons/ci";
// import { IoChatbubbleOutline } from "react-icons/io5";
// import { IoMdNotificationsOutline } from "react-icons/io";
// import { CgProfile } from "react-icons/cg";
// import { FaPlus } from "react-icons/fa6";

// const AppBar = () => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const navigate = useNavigate()
//   const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

//   useEffect(() => {
//     const user = auth.getCurrentUser();
//     setCurrentUser(user);
//   }, []);

//   const handleOpenModal = () => {
//     setIsProfileModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsProfileModalOpen(false);
//   };
//   const handleLoginClick = () => {
//     navigate("/login");
//   }

//   return (
//     <>
//       <Navbar expand="lg" className="bg-body-tertiary">
//         <Container>
//           <Navbar.Toggle aria-controls="basic-navbar-nav" />
//           <Navbar.Collapse id="basic-navbar-nav">
//             <Nav className="me-auto">
//               <Navbar.Brand>
//                 <img
//                   src={iconimg}
//                   alt="iconimg"
//                   width={"60px"}
//                   height={"40px"}
//                 />
//               </Navbar.Brand>

//               <NavDropdown title="Location" id="basic-nav-dropdown">
//                 <NavDropdown.Item href="#">India</NavDropdown.Item>
//               </NavDropdown>
//               <Form className="d-flex">
//                 <Form.Control
//                   required
//                   type="search"
//                   placeholder="Find Cars, Mobile Phones and more..."
//                   style={{ width: "600px" }}
//                 />
//                 <button className="btn btn-outline-success" type="submit">
//                   <CiSearch />
//                 </button>
//               </Form>

//               <NavDropdown title="Language" id="basic-nav-dropdown">
//                 <NavDropdown.Item href="#action/3.1">English</NavDropdown.Item>
//               </NavDropdown>

//               {/* <NavLink to="#" onClick={onLoginClick}>
//         Login
//       </NavLink> */}

//               {/* <NavLink to="/profile">
//         <CgProfile />
        
//       </NavLink> */}
//               {!currentUser ? (
//                 <>
//                   <Nav.Link onClick={handleLoginClick}>Login</Nav.Link>
//                   {/* <NavLink to="/register">Register</NavLink> */}
//                 </>
//               ) : (
//                 <>
//                   {/* Avatar icon that triggers the profile modal */}
//                   <NavLink to="/chat">
//                     <IoChatbubbleOutline />
//                   </NavLink>
//                   <NavLink to="/notification">
//                     <IoMdNotificationsOutline />
//                   </NavLink>
//                   <NavLink to="/" onClick={handleOpenModal}>
//                     <RxAvatar />
//                   </NavLink>
//                 </>
//               )}

//               <button
//                 className="btn btn-outline-success"
//                 type="submit"
//                 style={{
//                   borderTop: "6px solid #23E5DB", // Top border with the first color
//                   borderLeft: "6px solid #23E5DB", //Left border with the first color
//                   borderBottom: "6px solid #FFCE32", // Bottom border with the second color
//                   borderRight: "6px solid #3A77FF", // Right border with the third color

//                   borderRadius: "20px",
//                 }}
//               >
//                 <Link to="/post">
//                   <FaPlus />
//                   SELL{" "}
//                 </Link>{" "}
//               </button>
//             </Nav>
//           </Navbar.Collapse>
//         </Container>
//       </Navbar>

//       {/* Render Profile Modal if isProfileModalOpen is true */}
//       {isProfileModalOpen && <Profile onClose={handleCloseModal} />}
//     </>
//   );
// };

// export default AppBar;

// <Navbar expand="lg" className="bg-body-tertiary"></Navbar>;

import React, { useEffect, useState } from "react";
import { Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import auth from "../services/auth";
import { RxAvatar } from "react-icons/rx";
import Profile from "../components/Appbar/Profile";
import iconimg from "./../images/olx-icon.png";
import { CiSearch } from "react-icons/ci";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";

const AppBar = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const [searchResults, setSearchResults] = useState([]); // New state for search results
  const navigate = useNavigate();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  useEffect(() => {
    const user = auth.getCurrentUser();
    setCurrentUser(user);
  }, []);

  const handleOpenModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsProfileModalOpen(false);
  };

  // New function to handle search submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://127.0.0.1:8000/olxapi/all-search/`, {
        params: { q: searchQuery },
      });
      setSearchResults(response.data);
      console.log(response.data); // Log search results for debugging
   
      navigate(`/search-results?q=${searchQuery}`); // Navigate to results page with data
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/">
              <Navbar.Brand>
                <img
                  src={iconimg}
                  alt="iconimg"
                  width={"60px"}
                  height={"40px"}
                />
              </Navbar.Brand>
              </NavLink>

              <NavDropdown title="Location" id="basic-nav-dropdown">
                <NavDropdown.Item href="#">India</NavDropdown.Item>
              </NavDropdown>
              
              {/* Updated form to handle search query */}
              <Form className="d-flex" onSubmit={handleSearchSubmit}>
                <Form.Control
                  type="search"
                  placeholder="Find Cars, Mobile Phones and more..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)} // Update query on change
                  style={{ width: "600px" }}
                />
               
                <button className="btn btn-outline-success" type="submit">
                  <CiSearch />
                </button>
              </Form>

              <NavDropdown title="Language" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">English</NavDropdown.Item>
              </NavDropdown>

              {!currentUser ? (
                <Nav.Link onClick={() => navigate("/login")}>Login</Nav.Link>
              ) : (
                <>
                  <NavLink to="/chat">
                    <IoChatbubbleOutline />
                  </NavLink>
                  <NavLink to="/notification">
                    <IoMdNotificationsOutline />
                  </NavLink>
                  <NavLink to="/" onClick={handleOpenModal}>
                    <RxAvatar />
                  </NavLink>
                </>
              )}

              <button
                className="btn btn-outline-success"
                style={{
                  borderTop: "6px solid #23E5DB",
                  borderLeft: "6px solid #23E5DB",
                  borderBottom: "6px solid #FFCE32",
                  borderRight: "6px solid #3A77FF",
                  borderRadius: "20px",
                }}
              >
                <Link to="/post">
                  <FaPlus />
                  SELL{" "}
                </Link>{" "}
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {isProfileModalOpen && <Profile onClose={handleCloseModal} />}
    </>
  );
};

export default AppBar;
