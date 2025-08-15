import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Container, Row, Col, Carousel } from "react-bootstrap";
import { act } from "react";

const ServiceDetailsPage = () => {
  const { pk } = useParams(); // Extract the service pk from the URL
  const [serviceDetails, setServiceDetails] = useState(null); // State to hold service details
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    axios
      .get(`/olxapi/servicelist/${pk}/`) // Fetch service details by pk
      .then((response) => {
        setServiceDetails(response.data); // Set the response data to the state
        console.log("image:",response.data.images[0].image)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pk]); // Dependency on the service pk to refetch on pk change

  if (!serviceDetails) return <p>Loading...</p>; // Show a loading state while data is being fetched
  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex); // Update the active index when a new slide is selected
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card style={{ margin: "20px", padding: "20px" }}>
            {/* service Images Carousel */}
            {serviceDetails.images.length > 1 ? (
              <Carousel
              activeIndex={activeIndex}
              onSelect={handleSelect}
              >
                {serviceDetails.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={img.image}
                      alt={`service ${index + 1}`}
                      style={{ height: "400px", objectFit: "cover" }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
    
              serviceDetails.images[0]?(
                <Card.Img
                  src={serviceDetails.images[0].image} // Access the first image directly
                  style={{ height: "400px", objectFit: "cover" }}
                  
                />
              ) : <></>
              
            )}

            {/* service Information */}
            <Card.Body>
              <Card.Title>{serviceDetails.serviceTitle}</Card.Title>
              <Card.Text>
                <strong>Description:</strong> {serviceDetails.serviceDescription}
              </Card.Text>
             
              <Card.Text>
                <strong>Location:</strong> {serviceDetails.serviceState}
              </Card.Text>
              <Card.Text>
                <strong>Posted on:</strong> {new Date(serviceDetails.created_date).toDateString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ServiceDetailsPage;
