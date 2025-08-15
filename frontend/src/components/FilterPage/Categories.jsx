import React, { useState, useEffect } from "react";
import { Col, Row, Card, Container, Carousel } from "react-bootstrap";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Categories = () => {
  const [allData, setAllData] = useState([]); // Holds merged data
  const [filteredData, setFilteredData] = useState([]); // Data filtered by category
  const [categories, setCategories] = useState([]); // Link options
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const categoryFromURL = params.get("category") ? decodeURIComponent(params.get("category")) : "";

  useEffect(() => {
    // Fetch all data
    const fetchAllData = async () => {
      try {
        const response = await axios.get("/olxapi/carlist/");
        const mergedData = [
          ...response.data.car_data.map((data) => ({ ...data, type: "car" })),
          ...response.data.pet_data.map((data) => ({ ...data, type: "pet" })),
          ...response.data.job_data.map((data) => ({ ...data, type: "job" })),
          ...response.data.electronicappliance_data.map((data) => ({ ...data, type: "electronics & Appliance" })),
          ...response.data.furniture_data.map((data) => ({ ...data, type: "furniture" })),
          ...response.data.fashion_data.map((data) => ({ ...data, type: "fashion" })),
          ...response.data.booksportshobbies_data.map((data) => ({ ...data, type: "book, Sports & Hobbies" })),
          ...response.data.mobile_data.map((data) => ({ ...data, type: "mobile" })),
          ...response.data.cvs_data.map((data) => ({ ...data, type: "cvs" })),
          ...response.data.service_data.map((data) => ({ ...data, type: "service" })),
          ...response.data.bike_data.map((data) => ({ ...data, type: "bike" })),
          ...response.data.property_data.map((data) => ({ ...data, type: "property" })),
        ];

        const sortedData = mergedData.sort(
          (a, b) => new Date(b.created_date) - new Date(a.created_date)
        );

        setAllData(sortedData);

        // Extract unique categories for links
        const uniqueCategories = Array.from(
          new Set(mergedData.map((item) => item.type))
        );
        setCategories(uniqueCategories);

        // Filter data if category is in the URL
        if (categoryFromURL) {
          handleFilter(categoryFromURL, sortedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    if (categoryFromURL) {
      handleFilter(categoryFromURL, allData);
    }
  }, [categoryFromURL, allData]);

  const handleFilter = (category, data = allData) => {
    console.log("------", category)
    const filtered = category ? data.filter((item) => item.type === category) : data;
    setFilteredData(filtered);
  };

  const handleImageClick = (id, type) => {
    // navigate(`/${type}/${id}`);
    navigate(`/${type.replace(/[\s,&]/g, "").toLowerCase()}/${id}`);
    console.log(".....---", type.replace(/[\s,&]/g, "").toLowerCase());
  };

  return (
    <Container>
      {/* Categories as Links */}
      <div className="d-flex flex-wrap mb-3">
        <Link
          to="/"
          className={`m-2 text-decoration-none ${!categoryFromURL ? "fw-bold text-primary" : ""}`}
        >
          All Categories
        </Link>
        {categories.map((category, index) => (
          <Link
            key={index}
            to={`/filter/?category=${encodeURIComponent(category)}`}
            className={`m-2 text-decoration-none ${
              categoryFromURL === category ? "fw-bold text-primary" : ""
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Link>
        ))}
      </div>

      {/* Filtered Results */}
      <Row>
        {filteredData.map((data, index) => (
          <Col key={index} md={3} sm={6} lg={3}>
            <Card style={{ margin: "10px", width: "300px", height: "500px" }}>
              {data.images.length > 1 ? (
                <Carousel>
                  {data.images.map((img, imgIndex) => (
                    <Carousel.Item key={imgIndex}>
                      <Card.Img
                        src={img.image}
                        style={{ width: "280px", height: "300px" }}
                        onClick={() => handleImageClick(data.id, data.type)}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              ) : data.images[0] ? (
                <Card.Img
                  src={data.images[0].image}
                  style={{ width: "280px", height: "300px" }}
                  onClick={() => handleImageClick(data.id, data.type)}
                />
              ) : null}
              <Card.Body>
                <Card.Title>{`₹${data[data.type + "Price"] || "N/A"}`}</Card.Title>
                <Card.Text>{data[data.type + "Description"]?.substring(0, 20) + "..."}</Card.Text>
                <Card.Text>
                  <Row>
                    <Col md={5}>{data[data.type + "State"]}</Col>
                    <Col md={7}>
                      {`Posted on ${new Date(data.created_date).toLocaleDateString()}`}
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Categories;
