import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Container, Row, Col, Carousel } from "react-bootstrap";

const FashionDetails = () => {
  const { pk } = useParams(); // Extract the fashion pk from the URL
  const [fashionDetails, setFashionDetails] = useState(null); // State to hold fashion details

  useEffect(() => {
    axios
      .get(`/olxapi/fashionlist/${pk}/`) // Fetch fashion details by pk
      .then((response) => {
        setFashionDetails(response.data); // Set the response data to the state
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pk]); // Dependency on the fashion pk to refetch on pk change

  if (!fashionDetails) return <p>Loading...</p>; // Show a loading state while data is being fetched

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card style={{ margin: "20px", padding: "20px" }}>
            {/* fashion Images Carousel */}
            {fashionDetails.images.length > 0 ? (
              <Carousel>
                {fashionDetails.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={img.image}
                      alt={`fashion ${index + 1}`}
                      style={{ height: "400px", objectFit: "cover" }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <p>No images available</p>
            )}

            {/* fashion Information */}
            <Card.Body>
              <Card.Title>{fashionDetails.fashionTitle}</Card.Title>
              <Card.Text>
                <strong>Description:</strong> {fashionDetails.fashionDescription}
              </Card.Text>
              <Card.Text>
                <strong>Price:</strong> ₹{fashionDetails.fashionPrice}
              </Card.Text>
              <Card.Text>
                <strong>Location:</strong> {fashionDetails.fashionState}
              </Card.Text>
              <Card.Text>
                <strong>Posted on:</strong> {new Date(fashionDetails.created_date).toDateString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default FashionDetails;
