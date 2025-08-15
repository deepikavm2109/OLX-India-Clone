import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Container, Row, Col, Carousel } from "react-bootstrap";

const CVSDetails = () => {
  const { pk } = useParams(); // Extract the cvs pk from the URL
  const [cvsDetails, setCvsDetails] = useState(null); // State to hold cvs details

  useEffect(() => {
    axios
      .get(`/olxapi/cvslist/${pk}/`) // Fetch cvs details by pk
      .then((response) => {
        setCvsDetails(response.data); // Set the response data to the state
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pk]); // Dependency on the cvs pk to refetch on pk change

  if (!cvsDetails) return <p>Loading...</p>; // Show a loading state while data is being fetched

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card style={{ margin: "20px", padding: "20px" }}>
            {/* cvs Images Carousel */}
            {cvsDetails.images.length > 0 ? (
              <Carousel>
                {cvsDetails.images.map((img, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={img.image}
                      alt={`cvs ${index + 1}`}
                      style={{ height: "400px", objectFit: "cover" }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <p>No images available</p>
            )}

            {/* cvs Information */}
            <Card.Body>
              <Card.Title>{cvsDetails.cvsTitle}</Card.Title>
              <Card.Text>
                <strong>Description:</strong> {cvsDetails.cvsDescription}
              </Card.Text>
              
            </Card.Body>
          </Card>
        </Col>

    <Col md={3}>
      <Card style={{ margin: "20px", padding: "20px" }}>
      <Card.Body>
               <Card.Title><h4>{cvsDetails.cvsTitle}</h4></Card.Title>
               
               <Card.Text>
                 <strong>Price:</strong> ₹{cvsDetails.cvsPrice}
               </Card.Text>
               <Card.Text>
                 <strong>Location:</strong> {cvsDetails.cvsState}
               </Card.Text>
               <Card.Text>
                 <strong>Posted on:</strong> {new Date(cvsDetails.created_date).toDateString()}
               </Card.Text>

               <Card.Text>
                 <strong>User:</strong> {cvsDetails.username}
               </Card.Text>
               <Card.Text>
                 <strong>Email:</strong> {cvsDetails.email}
               </Card.Text>
             </Card.Body>
           </Card>
    </Col>
       </Row>
     </Container>

  //   <Container>
  //   <Row>
  //     <Col
  //       sm={8}
  //       md={8}
  //       lg={8}
  //       style={{
  //         border: "1px solid grey",
  //         borderRadius: "5px",
  //         margin: "10px 0 5px 0",
  //         paddingLeft: "40px",
  //         display: "flex",
  //         flexDirection: "column",
  //         alignItems: "center",
  //         justifyContent: "center",
  //         textAlign: "center",
  //       }}
  //     >
  //       <img
  //         src={cvsDetails.images[0]?.image}
  //         alt={cvsDetails.cvsTitle}
  //         style={{ margin: "35px", width: "700px" }}
  //       />
  //       <p>{cvsDetails.cvsDescription}</p>
  //     </Col>
  //     {/* <Col sm={2} md={2} lg={2}></Col>  */}
  //     <Col sm={3} md={3} lg={3} style={{ marginLeft: "45px" }}>
  //       <Row style={{ marginTop: "35px" }}>
  //         <Col
  //           sm={12}
  //           md={12}
  //           lg={12}
  //           style={{ border: "1px solid grey", borderRadius: "5px" }}
  //         >
  //           <p>Rs. {cvsDetails.cvsPrice} /-</p>
  //           <h4>{cvsDetails.cvsTitle}</h4>
  //           <p>{cvsDetails.cvsState}</p>
  //         </Col>

  //         <Col
  //           sm={12}
  //           md={12}
  //           lg={12}
  //           style={{
  //             border: "1px solid grey",
  //             borderRadius: "5px",
  //             marginTop: "10px",
  //           }}
  //         >
  //           <p>Posted by {cvsDetails.username}</p>
  //           <p>Email: {cvsDetails.email}</p>
  //         </Col>
  //       </Row>
  //     </Col>
  //   </Row>
  // </Container>

    
  );
};

export default CVSDetails;
