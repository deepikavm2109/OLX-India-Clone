import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Container, Row, Col, Carousel, Button } from "react-bootstrap";
import auth from "../../services/auth";
import Chat from "../Appbar/Chat";

const FurnitureDetails = ({ sellerId, buyerId }) => {
  const { pk } = useParams(); // Extract the furniture pk from the URL
  const [furnitureDetails, setFurnitureDetails] = useState(null); // State to hold furniture details
  const currentUser = auth.getCurrentUser();
  const [showChat, setShowChat] = useState(false);

  const handleChatClick = () => {
    setShowChat(true);  // Show the chat interface
  };

  useEffect(() => {
    axios
      .get(`/olxapi/furniturelist/${pk}/`) // Fetch furniture details by pk
      .then((response) => {
        setFurnitureDetails(response.data); // Set the response data to the state
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pk]); // Dependency on the furniture pk to refetch on pk change

  if (!furnitureDetails) return <p>Loading...</p>; // Show a loading state while data is being fetched

  return (
    <Container>
     
      <Row className="justify-content-center">
        <Col md={8}>
          <Card style={{ margin: "20px", padding: "20px" }}>
            {/* furniture Images Carousel */}
            {furnitureDetails.images.length > 0 ? (
              <Carousel>
                {furnitureDetails.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={img.image}
                      alt={`furniture ${index + 1}`}
                      style={{ height: "400px", objectFit: "cover" }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <p>No images available</p>
            )}

            {/* furniture Information */}
            <Card.Body>
              <Card.Title>{furnitureDetails.furnitureTitle}</Card.Title>
              <Card.Text>
                <strong>Description:</strong> {furnitureDetails.furnitureDescription}
              </Card.Text>
              <Card.Text>
                <strong>Price:</strong> ₹{furnitureDetails.furniturePrice}
              </Card.Text>
              <Card.Text>
                <strong>Location:</strong> {furnitureDetails.furnitureState}
              </Card.Text>
              <Card.Text>
                <strong>Posted on:</strong> {new Date(furnitureDetails.created_date).toDateString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
        <Card style={{ margin: "20px", padding: "20px" }}>
          <h6>{currentUser.username.toUpperCase()}</h6>
          <Button onClick={handleChatClick}>Chat with Seller</Button>
          {showChat && <Chat buyerId={buyerId} sellerId={sellerId} />}
        </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FurnitureDetails;
