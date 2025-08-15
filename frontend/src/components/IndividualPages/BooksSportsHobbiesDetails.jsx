import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Container, Row, Col, Carousel } from "react-bootstrap";

const BooksSportsHobbiesDetails = () => {
  const { pk } = useParams(); // Extract the booksSportsHobbies pk from the URL
  const [booksSportsHobbiesDetails, setBooksSportsHobbiesDetails] = useState(null); // State to hold booksSportsHobbies details

  useEffect(() => {
    axios
      .get(`/olxapi/bookSportsHobbieslist/${pk}/`) // Fetch booksSportsHobbies details by pk
      .then((response) => {
        setBooksSportsHobbiesDetails(response.data); // Set the response data to the state
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pk]); // Dependency on the booksSportsHobbies pk to refetch on pk change

  if (!booksSportsHobbiesDetails) return <p>Loading...</p>; // Show a loading state while data is being fetched

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card style={{ margin: "20px", padding: "20px" }}>
            {/* booksSportsHobbies Images Carousel */}
            {booksSportsHobbiesDetails.images.length > 0 ? (
              <Carousel>
                {booksSportsHobbiesDetails.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={img.image}
                      alt={`booksSportsHobbies ${index + 1}`}
                      style={{ height: "400px", objectFit: "cover" }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <p>No images available</p>
            )}

            {/* booksSportsHobbies Information */}
            <Card.Body>
              <Card.Title>{booksSportsHobbiesDetails.booksSportsHobbiesTitle}</Card.Title>
              <Card.Text>
                <strong>Description:</strong> {booksSportsHobbiesDetails.booksSportsHobbiesDescription}
              </Card.Text>
              <Card.Text>
                <strong>Price:</strong> ₹{booksSportsHobbiesDetails.booksSportsHobbiesPrice}
              </Card.Text>
              <Card.Text>
                <strong>Location:</strong> {booksSportsHobbiesDetails.booksSportsHobbiesState}
              </Card.Text>
              <Card.Text>
                <strong>Posted on:</strong> {new Date(booksSportsHobbiesDetails.created_date).toDateString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BooksSportsHobbiesDetails;
