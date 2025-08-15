import React, { useState, useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { FaAngleRight } from "react-icons/fa6";
import {
  PiCarSimpleLight,
  PiBuildings,
  PiDeviceMobileSpeakerLight,
  PiBriefcaseThin,
  PiMotorcycleFill,
  PiTelevisionThin,
  PiTruckTrailerThin,
  PiBedThin,
  PiTShirtThin,
  PiGuitarThin,
  PiDogThin,
  PiCallBell,
} from "react-icons/pi";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const iconsMap = {
  Cars: <PiCarSimpleLight />,
  Properties: <PiBuildings />,
  Mobiles: <PiDeviceMobileSpeakerLight />,
  Jobs: <PiBriefcaseThin />,
  Bikes: <PiMotorcycleFill />,
  "Electronics & Appliances": <PiTelevisionThin />,
  "Commercial Vehicles & Spares": <PiTruckTrailerThin />,
  Furniture: <PiBedThin />,
  Fashion: <PiTShirtThin />,
  "Books, Sports & Hobbies": <PiGuitarThin />,
  Pets: <PiDogThin />,
  Services: <PiCallBell />,
};

const PostPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/olxapi/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // on clicking a particular category find all data
  const showSubcategories = (subcategory) => {
    const category = categories.find(
      (item) => item.category_name === subcategory
    );
    console.log("show selected data", category.category_name);
    setSelectedCategory(category)
  };
  return (
    <Container>
      <h1>POST YOUR AD</h1>
      <hr />
      <Row style={{ border: "1px solid red", marginBottom: "10px" }}>
        <h1>Choose a Category</h1>
        <Col
          sm={6}
          md={6}
          lg={6}
          xl={6}
          style={{ border: "1px solid grey", margin: "10px" }}
        >
          {categories.map((item, index) => (
            <Row key={index} className="my-2">
              <Col sm={2} md={2} lg={2} xl={2} style={{ border: "1px solid" }}>
                <h5>{iconsMap[item.category_name]}</h5>
              </Col>
              <Col sm={8} md={8} lg={8} xl={8} style={{ border: "1px solid" }}>
                <h5>{item.category_name}</h5>
              </Col>
              <Col sm={2} md={2} lg={2} xl={2}>
                <Button
                  variant="light"
                  className="tab-button"
                  onClick={() => showSubcategories(item.category_name)}
                >
                  <FaAngleRight />
                </Button>
              </Col>
            </Row>
          ))}
        </Col>

        {selectedCategory && (
        <Col
          sm={6}
          md={4}
          lg={4}
          xl={4}
          style={{ border: "5px solid green", margin: "10px" }}
        >
          
            
              {selectedCategory.subcategories.map((subcategory, index) => (
                <Row key={index} className="my-2">
                  <Col
                    sm={10}
                    md={10}
                    lg={10}
                    xl={10}
                    style={{ border: "1px solid", marginLeft: "10px" }}
                  >
                    {/*encodeURIComponent() sends & as %26 instead of & in url which is helpful for us to not avoid things written after & in Attributes.jsx  */}
                    
                    {/* <Link to={`/post/attributes?category=${selectedCategory.category_name}&subcategory=${encodeURIComponent(subcategory.subcategory_name)}`}>
                      <h5>{subcategory.subcategory_name}</h5>
                      </Link> */} 
{/* the above was giving problem in subcategory shown in url coz of which everything from & onwards was neglected */}
<Link style={{color:"black", textDecoration:"none"}}
  to={`/post/attributes?category=${encodeURIComponent(
    selectedCategory.category_name
  )}&subcategory=${encodeURIComponent(subcategory.subcategory_name)}`}
>
  <h5>{subcategory.subcategory_name}</h5>
</Link>
                  </Col>
                </Row>
              ))}
            
          
        </Col>
        )}
      </Row>
    </Container>
  );
};

export default PostPage;
