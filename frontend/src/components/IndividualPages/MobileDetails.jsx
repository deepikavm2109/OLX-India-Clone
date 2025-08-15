import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Container, Row, Col, Carousel } from "react-bootstrap";

const MobileDetails = () => {
  const { pk } = useParams(); // Extract the mobile pk from the URL
  const [mobileDetails, setMobileDetails] = useState(null); // State to hold mobile details

  useEffect(() => {
    axios
      .get(`/olxapi/mobilelist/${pk}/`) // Fetch mobile details by pk
      .then((response) => {
        setMobileDetails(response.data); // Set the response data to the state
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pk]); // Dependency on the mobile pk to refetch on pk change

  if (!mobileDetails) return <p>Loading...</p>; // Show a loading state while data is being fetched

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card style={{ margin: "20px", padding: "20px" }}>
            {/* mobile Images Carousel */}
            {mobileDetails.images.length > 0 ? (
              <Carousel>
                {mobileDetails.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={img.image}
                      alt={`mobile ${index + 1}`}
                      style={{ height: "400px", objectFit: "cover" }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <p>No images available</p>
            )}

            {/* mobile Information */}
            <Card.Body>
              <Card.Title>{mobileDetails.mobileTitle}</Card.Title>
              <Card.Text>
                <strong>Description:</strong> {mobileDetails.mobileDescription}
              </Card.Text>
              <Card.Text>
                <strong>Price:</strong> ₹{mobileDetails.mobilePrice}
              </Card.Text>
              <Card.Text>
                <strong>Location:</strong> {mobileDetails.mobileState}
              </Card.Text>
              <Card.Text>
                <strong>Posted on:</strong> {new Date(mobileDetails.created_date).toDateString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MobileDetails;
