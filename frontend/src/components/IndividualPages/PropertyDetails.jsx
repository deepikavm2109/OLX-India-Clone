import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Container, Row, Col, Carousel } from "react-bootstrap";

const PropertyDetails = () => {
  const { pk } = useParams(); // Extract the property pk from the URL
  const [propertyDetails, setPropertyDetails] = useState(null); // State to hold property details
  const [activeIndex, setActiveIndex] = useState(0); // State to manage the active carousel index

  useEffect(() => {
    axios
      .get(`/olxapi/propertylist/${pk}/`) // Fetch property details by pk
      .then((response) => {
        setPropertyDetails(response.data); // Set the response data to the state
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pk]); // Dependency on the property pk to refetch on pk change

  if (!propertyDetails) return <p>Loading...</p>; // Show a loading state while data is being fetched

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex); // Update the active index when a new slide is selected
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card style={{ margin: "20px", padding: "20px" }}>
            {/* Property Images Carousel with Custom Thumbnail Indicators */}
            {propertyDetails.images.length > 0 && (
              <>
                <Carousel
                  activeIndex={activeIndex}
                  onSelect={handleSelect}
                  controls={false} // Disable default controls (arrows)
                  indicators={false} // Disable default indicators (dots)
                >
                  {/* Carousel items */}
                  {propertyDetails.images.map((img, index) => (
                    <Carousel.Item key={index}>
                      <img
                        className="d-block w-100"
                        src={img.image}
                        alt={`property ${index + 1}`}
                        style={{ height: "400px", objectFit: "cover" }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>

                {/* Custom Thumbnail Indicators */}
                <div className="d-flex justify-content-center mt-3">
                  {propertyDetails.images.map((img, index) => (
                    <img
                      key={index}
                      src={img.image}
                      onClick={() => handleSelect(index)}
                      className={`thumbnail-indicator ${
                        index === activeIndex ? "active" : ""
                      }`}
                      alt={`Thumbnail ${index + 1}`}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        cursor: "pointer",
                        margin: "0 5px",
                        border: index === activeIndex ? "2px solid #007bff" : "none",
                      }}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Property Information */}
            <Card.Body>
              <Card.Title>{propertyDetails.propertyTitle}</Card.Title>
              <Card.Text>
                <strong>Description:</strong>{" "}
                {propertyDetails.propertyDescription}
              </Card.Text>
              <Card.Text>
                <strong>Location:</strong> {propertyDetails.propertyState}
              </Card.Text>
              <Card.Text>
                <strong>Posted on:</strong>{" "}
                {new Date(propertyDetails.created_date).toDateString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PropertyDetails;
