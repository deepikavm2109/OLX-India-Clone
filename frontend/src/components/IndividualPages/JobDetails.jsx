import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Container, Row, Col, Carousel } from "react-bootstrap";

const JobDetails = () => {
  const { pk } = useParams(); // Extract the job pk from the URL
  const [jobDetails, setjobDetails] = useState(null); // State to hold job details

  useEffect(() => {
    axios
      .get(`/olxapi/joblist/${pk}/`) // Fetch job details by pk
      .then((response) => {
        setjobDetails(response.data); // Set the response data to the state
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pk]); // Dependency on the job pk to refetch on pk change

  if (!jobDetails) return <p>Loading...</p>; // Show a loading state while data is being fetched

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card style={{ margin: "20px", padding: "20px" }}>
            {/* job Images Carousel */}
            {jobDetails.images.length > 0 ? (
              <Carousel>
                {jobDetails.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={img.image}
                      alt={`job ${index + 1}`}
                      style={{ height: "400px", objectFit: "cover" }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <p>No images available</p>
            )}

            {/* job Information */}
            <Card.Body>
              <Card.Title>{jobDetails.jobTitle}</Card.Title>
              <Card.Text>
                <strong>Description:</strong> {jobDetails.jobDescription}
              </Card.Text>
              <Card.Text>
                <strong>Salary:</strong> ₹{jobDetails.jobSalaryFrom}-₹{jobDetails.jobSalaryTo}
              </Card.Text>
              <Card.Text>
                <strong>Location:</strong> {jobDetails.jobState}
              </Card.Text>
              <Card.Text>
                <strong>Posted on:</strong> {new Date(jobDetails.created_date).toDateString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default JobDetails;
