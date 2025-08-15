import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";

const CarDetails = () => {
  const { pk } = useParams(); // Get the 'pk' from the URL parameters
  const [carData, setCarData] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage errors

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/olxapi/carlist/${pk}/`
        );
        setCarData(response.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
        setError("Could not fetch car details."); // Set error state
      } finally {
        setLoading(false); // Set loading to false after the request
      }
    };

    if (pk) {
      // Ensure pk is defined before making the request
      fetchCarData();
    }
  }, [pk]);

  if (loading) {
    return <p>Loading car details...</p>; // Show loading message
  }

  if (error) {
    return <p>{error}</p>; // Show error message if there was an error
  }

  if (!carData) {
    return <p>No car data available.</p>; // Handle case where carData is still null
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
            src={carData.images[0]?.image}
            alt={carData.carTitle}
            style={{ margin: "35px", width: "700px" }}
          />
          <p>{carData.carDescription}</p>
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
              <p>Rs. {carData.carPrice} /-</p>
              <h4>{carData.carTitle}</h4>
              <p>{carData.carState}</p>
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
              <p>Posted by {carData.username}</p>
              <p>Email: {carData.email}</p>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CarDetails;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const CarDetails = () => {
//     const { pk } = useParams(); // Get the 'pk' from URL parameters
//     const [carData, setCarData] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchCarData = async () => {
//             console.log(`Car ID (pk): ${pk}`); // Log the pk
//             if (!pk) {
//                 setError('Invalid car ID.');
//                 setLoading(false);
//                 return;
//             }
//             try {
//                 console.log(`Fetching car data for pk: ${pk}`);
//                 const response = await axios.get(`http://localhost:8000/olxapi/carlist/${pk}/`);
//                 console.log('Fetched car data:', response.data);
//                 setCarData(response.data);
//             } catch (error) {
//                 console.error('Error fetching car data:', error);
//                 setError('Could not fetch car details.');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCarData();
//     }, [pk]);

//     if (loading) {
//         return <p>Loading car details...</p>;
//     }

//     if (error) {
//         return <p>{error}</p>;
//     }

//     if (!carData) {
//         return <p>No car data available.</p>;
//     }

//     return (
//         <div>
//             <h1>{carData.carTitle}</h1>
//             <img src={carData.images[0]?.image} alt={carData.carTitle} />
//             <p><strong>Brand:</strong> {carData.carBrand}</p>
//             <p><strong>Model:</strong> {carData.carModel}</p>
//             <p><strong>Year:</strong> {carData.carYear}</p>
//             <p><strong>Fuel:</strong> {carData.carFuel}</p>
//             <p><strong>Transmission:</strong> {carData.carTransmission}</p>
//             <p><strong>KMs Driven:</strong> {carData.carKM}</p>
//             <p><strong>Owners:</strong> {carData.carOwners}</p>
//             <p><strong>Description:</strong> {carData.carDescription}</p>
//             <p><strong>Price:</strong> {carData.carPrice} USD</p>
//             <p><strong>State:</strong> {carData.carState}</p>
//             <p><strong>Listed By:</strong> {carData.username}</p>
//             <p><strong>Email:</strong> {carData.email}</p>
//         </div>
//     );
// };

// export default CarDetails;
