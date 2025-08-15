import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Container, Row, Col, Carousel } from "react-bootstrap";

const ElectronicApplianceDetails = () => {
  const { pk } = useParams(); // Extract the electronicAppliance pk from the URL
  const [electronicApplianceDetails, setelectronicApplianceDetails] = useState(null); // State to hold electronicAppliance details

  useEffect(() => {
    axios
      .get(`/olxapi/electronicappliancelist/${pk}/`) // Fetch electronicAppliance details by pk
      .then((response) => {
        setelectronicApplianceDetails(response.data); // Set the response data to the state
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pk]); // Dependency on the electronicAppliance pk to refetch on pk change

  if (!electronicApplianceDetails) return <p>Loading...</p>; // Show a loading state while data is being fetched

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card style={{ margin: "20px", padding: "20px" }}>
            {/* electronicAppliance Images Carousel */}
            {electronicApplianceDetails.images.length > 0 ? (
              <Carousel>
                {electronicApplianceDetails.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={img.image}
                      alt={`electronicAppliance ${index + 1}`}
                      style={{ height: "400px", objectFit: "cover" }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <p>No images available</p>
            )}

            {/* electronicAppliance Information */}
            <Card.Body>
              <Card.Title>{electronicApplianceDetails.electronicApplianceTitle}</Card.Title>
              <Card.Text>
                <strong>Description:</strong> {electronicApplianceDetails.electronicApplianceDescription}
              </Card.Text>
              <Card.Text>
                <strong>Price:</strong> ₹{electronicApplianceDetails.electronicAppliancePrice}
              </Card.Text>
              <Card.Text>
                <strong>Location:</strong> {electronicApplianceDetails.electronicApplianceState}
              </Card.Text>
              <Card.Text>
                <strong>Posted on:</strong> {new Date(electronicApplianceDetails.created_date).toDateString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ElectronicApplianceDetails;
