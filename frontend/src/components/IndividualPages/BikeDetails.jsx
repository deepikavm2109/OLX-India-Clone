import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';

const BikeDetails = () => {
    const { pk } = useParams(); // Get the 'pk' from the URL parameters
    const [bikeData, setBikeData] = useState(null);
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to manage errors

    useEffect(() => {
        const fetchbikeData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/olxapi/bikelist/${pk}/`);
                setBikeData(response.data);
            } catch (error) {
                console.error('Error fetching bike data:', error);
                setError('Could not fetch bike details.'); // Set error state
            } finally {
                setLoading(false); // Set loading to false after the request
            }
        };

        if (pk) { // Ensure pk is defined before making the request
            fetchbikeData();
        }
    }, [pk]);

    if (loading) {
        return <p>Loading bike details...</p>; // Show loading message
    }

    if (error) {
        return <p>{error}</p>; // Show error message if there was an error
    }

    if (!bikeData) {
        return <p>No bike data available.</p>; // Handle case where bikeData is still null
    }

    return (
        <Container>
      <Row>
        <Col
          sm={8}
          md={8}
          lg={8}
          style={{
            border: "1px solid grey",
            borderRadius: "5px",
            margin: "10px 0 5px 0",
            paddingLeft: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <img
            src={bikeData.images[0]?.image}
            alt={bikeData.bikeTitle}
            style={{ margin: "35px", width: "700px" }}
          />
          <p>{bikeData.bikeDescription}</p>
        </Col>
        {/* <Col sm={2} md={2} lg={2}></Col>  */}
        <Col sm={3} md={3} lg={3} style={{ marginLeft: "45px" }}>
          <Row style={{ marginTop: "35px" }}>
            <Col
              sm={12}
              md={12}
              lg={12}
              style={{ border: "1px solid grey", borderRadius: "5px" }}
            >
              <p>Rs. {bikeData.bikePrice} /-</p>
              <h4>{bikeData.bikeTitle}</h4>
              <p>{bikeData.bikeState}</p>
            </Col>

            <Col
              sm={12}
              md={12}
              lg={12}
              style={{
                border: "1px solid grey",
                borderRadius: "5px",
                marginTop: "10px",
              }}
            >
              <p>Posted by {bikeData.username}</p>
              <p>Email: {bikeData.email}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
    );
};

export default BikeDetails;
