import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Categories from "../FilterPage/Categories";

const CarHomePage = () => {
  const [carData, setCarData] = useState([]);
  const [petData, setPetData] = useState([]);
  const [jobData, setJobData] = useState([]);
  const [electronicApplianceData, setElectronicApplianceData] = useState([]);
  const [fashionData, setFashionData] = useState([]);
  const [furnitureData, setFurnitureData] = useState([]);
  const [bookSportsHobbiesData, setBookSportsHobbiesData] = useState([]);
  const [mobileData, setMobileData] = useState([]);
  const [cvsData, setCvsData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [bikeData, setBikeData] = useState([]);
  const [propertyData, setPropertyData] = useState([]);
  // Initialize as an empty array
  const navigate = useNavigate(); // Initialize navigate hook
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  const subcategory = params.get("subcategory");

  useEffect(() => {
    axios
      .get("/olxapi/carlist/")
      .then((response) => {
        console.log(response.data.service_data);
        setCarData(response.data.car_data);
        setPetData(response.data.pet_data);
        setJobData(response.data.job_data);
        setElectronicApplianceData(response.data.electronicappliance_data);
        setFurnitureData(response.data.furniture_data);
        setFashionData(response.data.fashion_data);
        setBookSportsHobbiesData(response.data.booksportshobbies_data);
        setMobileData(response.data.mobile_data);
        setCvsData(response.data.cvs_data);
        setServiceData(response.data.service_data);
        setBikeData(response.data.bike_data);
        setPropertyData(response.data.property_data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // const handleImageClick = (carId) => {
  //   // Navigate to the car details page
  //   navigate(`/car/${carId}`);
  // };

  const handleImageClick = (id, type) => {
    navigate(`/${type}/${id}`);
    console.log('---',type)
  };
  //   if (carData.length === 0) return <p>Loading...</p>; // Conditional render when no data
  // Merge carData and petData, adding a 'type' field to each
  const mergedData = [
    ...mobileData.map((data) => ({
      ...data,
      type: "mobile", // Add a type to differentiate car
    })),
    ...carData.map((data) => ({
      ...data,
      type: "car", // Add a type to differentiate car
    })),
    ...petData.map((data) => ({
      ...data,
      type: "pet", // Add a type to differentiate pet
    })),
    ...jobData.map((data) => ({
      ...data,
      type: "job", // Add a type to differentiate job
    })),
    ...electronicApplianceData.map((data) => ({
      ...data,
      type: "electronicsandappliance", // Add a type to differentiate electronic appliance
    })),
    ...furnitureData.map((data) => ({
      ...data,
      type: "furniture", // Add a type to differentiate furniture
    })),
    ...fashionData.map((data) => ({
      ...data,
      type: "fashion", // Add a type to differentiate fashion
    })),
    ...bookSportsHobbiesData.map((data) => ({
      ...data,
      type: "booksportshobbies", // Add a type to differentiate booksportshobbies
    })),
    ...cvsData.map((data) => ({
      ...data,
      type: "cvs", // Add a type to differentiate cvs
    })),

    ...serviceData.map((data) => ({
      ...data,
      type: "service", // Add a type to differentiate service
    })),

    ...bikeData.map((data) => ({
      ...data,
      type: "bike", // Add a type to differentiate bike
    })),

    ...propertyData.map((data) => ({
      ...data,
      type: "property", // Add a type to differentiate property
    })),
  ];
  // console.log(mergedData)
  // Sort the merged data by created_date in descending order
  const sortedData = mergedData.sort(
    (a, b) => new Date(b.created_date) - new Date(a.created_date)
  );

  // Sort the merged data by created_date in descending order
  // const sortedData = mergedData.sort(
  //   (a, b) => new Date(b.created_date) - new Date(a.created_date)
  // );

  // const sortedData = mergedData.sort(
  //   (car, pet, job) => {
  //     const dateDiffCarPet = new Date(pet.created_date) - new Date(car.created_date);
  //     if (dateDiffCarPet !== 0) return dateDiffCarPet;

  //     const dateDiffPetJob = new Date(job.created_date) - new Date(pet.created_date);
  //     if (dateDiffPetJob !== 0) return dateDiffPetJob;

  //     const dateDiffJobCar = new Date(car.created_date) - new Date(job.created_date);
  //     if (dateDiffJobCar !== 0) return dateDiffCarPet;
  //   }
  // );

  return (
    <>
      <Container>
        <Row>
          <Categories />
        </Row>
        <Row>
          {sortedData.map((data, index) => (
            <Col key={index} md={3} sm={6} lg={3}>
              <Card style={{ margin: "10px", width: "300px", height: "500px" }}>
                {data.images.length > 1 ? (
                  <Carousel>
                    {data.images.map((dataimg, imgind) => (
                      <Carousel.Item key={imgind}>
                        <Card.Img
                          src={dataimg.image}
                          style={{ width: "280px", height: "300px" }}
                          onClick={() => handleImageClick(data.id, data.type)} // Navigate based on type
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : data.images[0] ? (
                  <Card.Img
                    src={data.images[0].image} // Access the first image directly
                    style={{ width: "280px", height: "300px" }}
                    onClick={() => handleImageClick(data.id, data.type)} // Navigate based on type
                  />
                ) : (
                  <></>
                )}
                <Card.Body>
                  <Card.Title>
                    {data.type === "property" ? (
                      `₹${data.propertyPrice}`
                    ) : data.type === "bike" ? (
                      `₹${data.bikePrice}`
                    ) : data.type === "cvs" ? (
                      `₹${data.cvsPrice}`
                    ) : data.type === "mobile" ? (
                      `₹${data.mobilePrice}`
                    ) : data.type === "booksportshobbies" ? (
                      `Books, Sports and Hobbies Price: ₹${data.booksSportsHobbiesPrice}`
                    ) : data.type === "fashion" ? (
                      `Fashion Price: ₹${data.fashionPrice}`
                    ) : data.type === "furniture" ? (
                      `Furniture Price: ₹${data.furniturePrice}`
                    ) : data.type === "electronicsandappliance" ? (
                      `Electronic Appliance Price: ₹${data.electronicAppliancePrice}`
                    ) : data.type === "job" ? (
                      `Salary ₹${data.jobSalaryFrom} -₹${data.jobSalaryTo}`
                    ) : data.type === "pet" ? (
                      `Pet Price: ₹${data.petPrice}`
                    ) : data.type === "car" ? (
                      `Car Price: ₹${data.carPrice}`
                    ) : (
                      <></>
                    )}
                  </Card.Title>

                  <Card.Text>
                    {data.type === "property"
                      ? data.propertyDescription.substring(0, 20) + "..."
                      : data.type === "bike"
                      ? data.subcategory === "Spare Parts" ||
                        data.subcategory === "Bicycles"
                        ? data.bikeDescription
                        : `${data.bikeKM} km - ${data.bikeYear}`
                      : data.type === "service"
                      ? data.serviceDescription.substring(0, 20) + "..."
                      : data.type === "cvs"
                      ? data.cvsDescription.substring(0, 20) + "..."
                      : data.type === "mobile"
                      ? data.mobileDescription.substring(0, 20) + "..."
                      : data.type === "booksportshobbies"
                      ? data.booksSportsHobbiesDescription.substring(0, 20) +
                        "..."
                      : data.type === "fashion"
                      ? data.fashionDescription.substring(0, 20) + "..."
                      : data.type === "furniture"
                      ? data.furnitureDescription.substring(0, 20) + "..."
                      : data.type === "electronicsandappliance"
                      ? data.electronicApplianceDescription.substring(0, 20) +
                        "..."
                      : data.type === "job"
                      ? data.jobDescription.substring(0, 20) + "..."
                      : data.type === "pet"
                      ? data.petDescription.substring(0, 20) + "..."
                      : `${data.carYear} - ${data.carKM} KM`}
                  </Card.Text>

                  {/* <Card.Text>{data.subcategory}</Card.Text> */}
                  <Card.Text>
                    <p>{data.carDescription}</p>
                  </Card.Text>
                  <Card.Text>
                    <Row>
                      <Col md={5} sm={5} lg={5}>
                        {data.type === "property"
                          ? data.propertyState
                          : data.type === "bike"
                          ? data.bikeState
                          : data.type === "service"
                          ? data.serviceState
                          : data.type === "cvs"
                          ? data.cvsState
                          : data.type === "mobile"
                          ? data.mobileState
                          : data.type === "booksportshobbies"
                          ? data.booksSportsHobbiesState
                          : data.type === "fashion"
                          ? data.fashionState
                          : data.type === "furniture"
                          ? data.furnitureState
                          : data.type === "electronicappliance"
                          ? data.electronicApplianceState
                          : data.type === "job"
                          ? data.jobState
                          : data.type === "pet"
                          ? data.petState
                          : data.carState}
                      </Col>
                      <Col md={7} sm={7} lg={7}>
                        {/* {new Date(data.created_date).getFullYear()} */}
                        {`Posted on ${data.created_date.substring(0, 7)}`}
                      </Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default CarHomePage;
