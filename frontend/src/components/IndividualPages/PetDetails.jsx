import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Container, Row, Col, Carousel } from "react-bootstrap";

const PetDetailsPage = () => {
  const { pk } = useParams(); // Extract the pet pk from the URL
  const [petDetails, setPetDetails] = useState(null); // State to hold pet details

  useEffect(() => {
    axios
      .get(`/olxapi/petlist/${pk}/`) // Fetch pet details by pk
      .then((response) => {
        setPetDetails(response.data); // Set the response data to the state
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pk]); // Dependency on the pet pk to refetch on pk change

  if (!petDetails) return <p>Loading...</p>; // Show a loading state while data is being fetched

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card style={{ margin: "20px", padding: "20px" }}>
            {/* Pet Images Carousel */}
            {petDetails.images.length > 0 ? (
              <Carousel>
                {petDetails.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={img.image}
                      alt={`Pet ${index + 1}`}
                      style={{ height: "400px", objectFit: "cover" }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <p>No images available</p>
            )}

            {/* Pet Information */}
            <Card.Body>
              <Card.Title>{petDetails.petTitle}</Card.Title>
              <Card.Text>
                <strong>Description:</strong> {petDetails.petDescription}
              </Card.Text>
              <Card.Text>
                <strong>Price:</strong> ₹{petDetails.petPrice}
              </Card.Text>
              <Card.Text>
                <strong>Location:</strong> {petDetails.petState}
              </Card.Text>
              <Card.Text>
                <strong>Posted on:</strong> {new Date(petDetails.created_date).toDateString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PetDetailsPage;
