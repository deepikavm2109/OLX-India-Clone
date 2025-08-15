// import { useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import { CiSearch } from "react-icons/ci";
// import "../style/SearchResults.css"; // Import the CSS file

// const SearchResults = () => {
//     const location = useLocation();
//     const [results, setResults] = useState({ cars: [], jobs: [], properties: [] });
//     const [loading, setLoading] = useState(true);
//     const [query, setQuery] = useState("");

//     useEffect(() => {
//         const queryParams = new URLSearchParams(location.search);
//         const searchQuery = queryParams.get("q");
//         setQuery(searchQuery || "");

//         if (searchQuery) {
//             setLoading(true);
//             axios.get(`/olxapi/all-search/?q=${searchQuery}`)
//                 .then(response => {
//                     setResults(response.data);
//                     setLoading(false);
//                 })
//                 .catch(error => {
//                     console.error("Error fetching search results:", error);
//                     setLoading(false);
//                 });
//         }
//     }, [location.search]);

//     return (
//         <div className="search-results-container">
//             {loading ? (
//                 <div>
//                     <AiOutlineLoading3Quarters className="loading-spinner" />
//                     <p>Loading...</p>
//                 </div>
//             ) : (
//                 <>

//                     <h2 className="results-heading">Search Results</h2>

//                     {results.cars.length > 0 ? (
//                         <div>
//                             <h3>Cars</h3>
//                             <ul className="result-list">
//                                 {results.cars.map((car) => (
//                                     <>
//                                     <li key={car.id} className="result-item">
//                                         {car.carTitle}
//                                     </li>
//                                     <li key={car.id} className="result-item">
//                                     {car.carDescription}
//                                 </li>
//                                 </>
//                                 ))}
//                             </ul>
//                         </div>
//                     ) : (
//                         <p>No cars found</p>
//                     )}

//                     {results.jobs.length > 0 ? (
//                         <div>
//                             <h3>Jobs</h3>
//                             <ul className="result-list">
//                                 {results.jobs.map((job) => (
//                                     <li key={job.id} className="result-item">
//                                         {job.jobTitle}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     ) : (
//                         <p>No jobs found</p>
//                     )}

//                     {results.properties.length > 0 ? (
//                         <div>
//                             <h3>Properties</h3>
//                             <ul className="result-list">
//                                 {results.properties.map((property) => (
//                                     <li key={property.id} className="result-item">
//                                         {property.propertyTitle}
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     ) : (
//                         <p>No properties found</p>
//                     )}
//                 </>
//             )}
//         </div>
//     );
// };

// export default SearchResults;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Categories from "../FilterPage/Categories";

const SearchResults = () => {
  const [results, setResults] = useState({
    mobiles: [],
    cars: [],
    pets: [],
    electronicappliances: [],
    jobs: [],
    properties: [],
    services: [],
    cvs: [],
    fashion: [],
    furniture: [],
    bikes: [],
    booksports: [],
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("q");
    setQuery(searchQuery || "");

    if (searchQuery) {
      setLoading(true);
      console.log(`/olxapi/all-search/?q=${searchQuery}`);
      axios
        .get(`/olxapi/all-search/?q=${searchQuery}`)
        .then((response) => {
          setResults(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
          setLoading(false);
        });
    }
  }, [location.search]);

  const handleImageClick = (id, type) => {
    console.log("type: ", type);
    let route;
    switch (type) {
      case "mobiles":
        route = `/mobile/${id}`;
        break;
      case "cars":
        route = `/car/${id}`;
        break;

      case "pets":
        route = `/pet/${id}`;
        break;

      case "jobs":
        route = `/job/${id}`;
        break;

      case "electronicappliances":
        route = `/electronicsandappliance/${id}`;
        break;

      case "furniture":
        route = `/furniture/${id}`;
        break;

      case "fashion":
        route = `/fashion/${id}`;
        break;

      case "cvs":
        route = `/cvs/${id}`;
        break;

      case "booksportsandhobbies":
        route = `/booksportshobbies/${id}`;
        break;

      case "service":
        route = `/service/${id}`;
        break;

      case "bike":
        route = `/bike/${id}`;
        break;

      case "properties":
        route = `/property/${id}`;
        break;
      default:
        return;
    }
    navigate(route);
  };

  return (
    
    <Container>
      <Categories />
      {loading ? (
        <div>Loading...</div>
      ) : results && Object.values(results).every((arr) => arr.length === 0) ? (
        <div>No results found for "{query}"</div>
      ) : (
        <Row>
          {results?.mobiles?.map((data, index) => (
            <Col key={index} md={3} sm={6} lg={3}>
              <Card style={{ margin: "10px", width: "300px", height: "500px" }}>
                {data.images.length > 1 ? (
                  <Carousel>
                    {data.images.map((dataimg, imgind) => (
                      <Carousel.Item key={imgind}>
                        <Card.Img
                          src={dataimg.image}
                          style={{ width: "280px", height: "300px" }}
                          onClick={() => handleImageClick(data.id, "mobiles")}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : data.images[0] ? (
                  <Card.Img
                    src={data.images[0].image}
                    style={{ width: "280px", height: "300px" }}
                    onClick={() => handleImageClick(data.id, "mobiles")}
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{data.mobilePrice}</Card.Title>
                  <Card.Text>
          {/* Ensure mobileDescription is a string before calling substring */}
          {data.mobileDescription && typeof data.mobileDescription === 'string'
            ? data.mobileDescription.substring(0, 20) + "..."
            : "No description available."}
        </Card.Text>
                  <Card.Text>
                    <Row>
                      <Col md={5}>{data.mobileState}</Col>
                      <Col md={7}>{`Posted on ${data.created_date.substring(
                        0,
                        7
                      )}`}</Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}

          {results?.cars?.map((data, index) => (
            <Col key={index} md={3} sm={6} lg={3}>
              <Card style={{ margin: "10px", width: "300px", height: "500px" }}>
                {data.images.length > 1 ? (
                  <Carousel>
                    {data.images.map((dataimg, imgind) => (
                      <Carousel.Item key={imgind}>
                        <Card.Img
                          src={dataimg.image}
                          style={{ width: "280px", height: "300px" }}
                          onClick={() => handleImageClick(data.id, "cars")}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : data.images[0] ? (
                  <Card.Img
                    src={data.images[0].image}
                    style={{ width: "280px", height: "300px" }}
                    onClick={() => handleImageClick(data.id, "cars")}
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{data.carPrice}</Card.Title>
                  <Card.Text>
          {/* Ensure carDescription is a string before calling substring */}
          {data.carDescription && typeof data.carDescription === 'string'
            ? data.carDescription.substring(0, 20) + "..."
            : "No description available."}
        </Card.Text>
                  <Card.Text>
                    <Row>
                      <Col md={5}>{data.carState}</Col>
                      <Col md={7}>{`Posted on ${data.created_date.substring(
                        0,
                        7
                      )}`}</Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}

          {results?.pets?.map((data, index) => (
            <Col key={index} md={3} sm={6} lg={3}>
              <Card style={{ margin: "10px", width: "300px", height: "500px" }}>
                {data.images.length > 1 ? (
                  <Carousel>
                    {data.images.map((dataimg, imgind) => (
                      <Carousel.Item key={imgind}>
                        <Card.Img
                          src={dataimg.image}
                          style={{ width: "280px", height: "300px" }}
                          onClick={() => handleImageClick(data.id, "pets")}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : data.images[0] ? (
                  <Card.Img
                    src={data.images[0].image}
                    style={{ width: "280px", height: "300px" }}
                    onClick={() => handleImageClick(data.id, "pets")}
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{data.petPrice}</Card.Title>
                  <Card.Text>
          {/* Ensure petDescription is a string before calling substring */}
          {data.petDescription && typeof data.petDescription === 'string'
            ? data.petDescription.substring(0, 20) + "..."
            : "No description available."}
        </Card.Text>
                  <Card.Text>
                    <Row>
                      <Col md={5}>{data.petState}</Col>
                      <Col md={7}>{`Posted on ${data.created_date.substring(
                        0,
                        7
                      )}`}</Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}

          {results?.jobs?.map((data, index) => (
            <Col key={index} md={3} sm={6} lg={3}>
              <Card style={{ margin: "10px", width: "300px", height: "500px" }}>
                {data.images.length > 1 ? (
                  <Carousel>
                    {data.images.map((dataimg, imgind) => (
                      <Carousel.Item key={imgind}>
                        <Card.Img
                          src={dataimg.image}
                          style={{ width: "280px", height: "300px" }}
                          onClick={() => handleImageClick(data.id, "jobs")}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : data.images[0] ? (
                  <Card.Img
                    src={data.images[0].image}
                    style={{ width: "280px", height: "300px" }}
                    onClick={() => handleImageClick(data.id, "jobs")}
                  />
                ) : null}
                <Card.Body>
                <Card.Text>
          {/* Ensure jobDescription is a string before calling substring */}
          {data.jobDescription && typeof data.jobDescription === 'string'
            ? data.jobDescription.substring(0, 20) + "..."
            : "No description available."}
        </Card.Text>
                  <Card.Text>
                    <Row>
                      <Col md={5}>{data.jobState}</Col>
                      <Col md={7}>{`Posted on ${data.created_date.substring(
                        0,
                        7
                      )}`}</Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}

          {results?.electronicappliances?.map((data, index) => (
            <Col key={index} md={3} sm={6} lg={3}>
              <Card style={{ margin: "10px", width: "300px", height: "500px" }}>
                {data.images.length > 1 ? (
                  <Carousel>
                    {data.images.map((dataimg, imgind) => (
                      <Carousel.Item key={imgind}>
                        <Card.Img
                          src={dataimg.image}
                          style={{ width: "280px", height: "300px" }}
                          onClick={() =>
                            handleImageClick(data.id, "electronicsandappliance")
                          }
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : data.images[0] ? (
                  <Card.Img
                    src={data.images[0].image}
                    style={{ width: "280px", height: "300px" }}
                    onClick={() =>
                      handleImageClick(data.id, "electronicsandappliances")
                    }
                  />
                ) : null}
                <Card.Body>

                <Card.Text>
          {/* Ensure electronicsandapplianceDescription is a string before calling substring */}
          {data.electronicsandapplianceDescription && typeof data.electronicsandapplianceDescription === 'string'
            ? data.electronicsandapplianceDescription.substring(0, 20) + "..."
            : "No description available."}
        </Card.Text>
                
                  <Card.Text>
                    <Row>
                      <Col md={5}>{data.electronicsandapplianceState}</Col>
                      <Col md={7}>{`Posted on ${data.created_date.substring(
                        0,
                        7
                      )}`}</Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}

          {results?.furniture?.map((data, index) => (
            <Col key={index} md={3} sm={6} lg={3}>
              <Card style={{ margin: "10px", width: "300px", height: "500px" }}>
                {data.images.length > 1 ? (
                  <Carousel>
                    {data.images.map((dataimg, imgind) => (
                      <Carousel.Item key={imgind}>
                        <Card.Img
                          src={dataimg.image}
                          style={{ width: "280px", height: "300px" }}
                          onClick={() => handleImageClick(data.id, "furniture")}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : data.images[0] ? (
                  <Card.Img
                    src={data.images[0].image}
                    style={{ width: "280px", height: "300px" }}
                    onClick={() => handleImageClick(data.id, "furniture")}
                  />
                ) : null}
                <Card.Body>
                  {/* <Card.Text>
                    {data.furnitureDescription.substring(0, 20) + "..."}
                  </Card.Text> */}

<Card.Text>
  {/* Ensure furnitureDescription is a string and has enough length */}
  {data.furnitureDescription && typeof data.furnitureDescription === 'string'
    ? data.furnitureDescription.length > 20 
      ? data.furnitureDescription.substring(0, 20) + "..."
      : data.furnitureDescription // Show the full short description
    : "No description available."}
</Card.Text>

                  <Card.Text>
                    <Row>
                      <Col md={5}>{data.furnitureState}</Col>
                      <Col md={7}>{`Posted on ${data.created_date.substring(
                        0,
                        7
                      )}`}</Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}

          {results?.fashion?.map((data, index) => (
            <Col key={index} md={3} sm={6} lg={3}>
              <Card style={{ margin: "10px", width: "300px", height: "500px" }}>
                {data.images.length > 1 ? (
                  <Carousel>
                    {data.images.map((dataimg, imgind) => (
                      <Carousel.Item key={imgind}>
                        <Card.Img
                          src={dataimg.image}
                          style={{ width: "280px", height: "300px" }}
                          onClick={() => handleImageClick(data.id, "fashion")}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : data.images[0] ? (
                  <Card.Img
                    src={data.images[0].image}
                    style={{ width: "280px", height: "300px" }}
                    onClick={() => handleImageClick(data.id, "fashion")}
                  />
                ) : null}
                <Card.Body>
                <Card.Text>
  {/* Ensure fashionDescription is a string and has enough length */}
  {data.fashionDescription && typeof data.fashionDescription === 'string'
    ? data.fashionDescription.length > 20 
      ? data.fashionDescription.substring(0, 20) + "..."
      : data.fashionDescription // Show the full short description
    : "No description available."}
</Card.Text>
                  <Card.Text>
                    <Row>
                      <Col md={5}>{data.fashionState}</Col>
                      <Col md={7}>{`Posted on ${data.created_date.substring(
                        0,
                        7
                      )}`}</Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}

          {results?.booksports?.map((data, index) => (
            <Col key={index} md={3} sm={6} lg={3}>
              <Card style={{ margin: "10px", width: "300px", height: "500px" }}>
                {data.images.length > 1 ? (
                  <Carousel>
                    {data.images.map((dataimg, imgind) => (
                      <Carousel.Item key={imgind}>
                        <Card.Img
                          src={dataimg.image}
                          style={{ width: "280px", height: "300px" }}
                          onClick={() =>
                            handleImageClick(data.id, "booksportshobbies")
                          }
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : data.images[0] ? (
                  <Card.Img
                    src={data.images[0].image}
                    style={{ width: "280px", height: "300px" }}
                    onClick={() =>
                      handleImageClick(data.id, "booksportshobbies")
                    }
                  />
                ) : null}
                <Card.Body>
                <Card.Text>
  {/* Ensure booksSportsHobbiesDescription is a string and has enough length */}
  {data.booksSportsHobbiesDescription && typeof data.booksSportsHobbiesDescription === 'string'
    ? data.booksSportsHobbiesDescription.length > 20 
      ? data.booksSportsHobbiesDescription.substring(0, 20) + "..."
      : data.booksSportsHobbiesDescription // Show the full short description
    : "No description available."}
</Card.Text>
                  <Card.Text>
                    <Row>
                      <Col md={5}>{data.booksSportsHobbiesstate}</Col>
                      <Col md={7}>{`Posted on ${data.created_date.substring(
                        0,
                        7
                      )}`}</Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}

          {results?.cvs?.map((data, index) => (
            <Col key={index} md={3} sm={6} lg={3}>
              <Card style={{ margin: "10px", width: "300px", height: "500px" }}>
                {data.images.length > 1 ? (
                  <Carousel>
                    {data.images.map((dataimg, imgind) => (
                      <Carousel.Item key={imgind}>
                        <Card.Img
                          src={dataimg.image}
                          style={{ width: "280px", height: "300px" }}
                          onClick={() => handleImageClick(data.id, "cvs")}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : data.images[0] ? (
                  <Card.Img
                    src={data.images[0].image}
                    style={{ width: "280px", height: "300px" }}
                    onClick={() => handleImageClick(data.id, "cvs")}
                  />
                ) : null}
                <Card.Body>
                <Card.Text>
  {/* Ensure cvsDescription is a string and has enough length */}
  {data.cvsDescription && typeof data.cvsDescription === 'string'
    ? data.cvsDescription.length > 20 
      ? data.cvsDescription.substring(0, 20) + "..."
      : data.cvsDescription // Show the full short description
    : "No description available."}
</Card.Text>
                  <Card.Text>
                    <Row>
                      <Col md={5}>{data.cvsState}</Col>
                      <Col md={7}>{`Posted on ${data.created_date.substring(
                        0,
                        7
                      )}`}</Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}

          {results?.services?.map((data, index) => (
            <Col key={index} md={3} sm={6} lg={3}>
              <Card style={{ margin: "10px", width: "300px", height: "500px" }}>
                {data.images.length > 1 ? (
                  <Carousel>
                    {data.images.map((dataimg, imgind) => (
                      <Carousel.Item key={imgind}>
                        <Card.Img
                          src={dataimg.image}
                          style={{ width: "280px", height: "300px" }}
                          onClick={() => handleImageClick(data.id, "service")}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : data.images[0] ? (
                  <Card.Img
                    src={data.images[0].image}
                    style={{ width: "280px", height: "300px" }}
                    onClick={() => handleImageClick(data.id, "service")}
                  />
                ) : null}
                <Card.Body>
                <Card.Text>
  {/* Ensure serviceDescription is a string and has enough length */}
  {data.serviceDescription && typeof data.serviceDescription === 'string'
    ? data.serviceDescription.length > 20 
      ? data.serviceDescription.substring(0, 20) + "..."
      : data.serviceDescription // Show the full short description
    : "No description available."}
</Card.Text>
                  <Card.Text>
                    <Row>
                      <Col md={5}>{data.serviceState}</Col>
                      <Col md={7}>{`Posted on ${data.created_date.substring(
                        0,
                        7
                      )}`}</Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}

          {results?.properties?.map((data, index) => (
            <Col key={index} md={3} sm={6} lg={3}>
              <Card style={{ margin: "10px", width: "300px", height: "500px" }}>
                {data.images.length > 1 ? (
                  <Carousel>
                    {data.images.map((dataimg, imgind) => (
                      <Carousel.Item key={imgind}>
                        <Card.Img
                          src={dataimg.image}
                          style={{ width: "280px", height: "300px" }}
                          onClick={() =>
                            handleImageClick(data.id, "properties")
                          }
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : data.images[0] ? (
                  <Card.Img
                    src={data.images[0].image}
                    style={{ width: "280px", height: "300px" }}
                    onClick={() => handleImageClick(data.id, "properties")}
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{data.propertyPrice}</Card.Title>
                  <Card.Text>
  {/* Ensure propertiesDescription is a string and has enough length */}
  {data.propertiesDescription && typeof data.propertiesDescription === 'string'
    ? data.propertiesDescription.length > 20 
      ? data.propertiesDescription.substring(0, 20) + "..."
      : data.propertiesDescription // Show the full short description
    : "No description available."}
</Card.Text>
                  <Card.Text>
                    <Row>
                      <Col md={5}>{data.propertyState}</Col>
                      <Col md={7}>{`Posted on ${data.created_date.substring(
                        0,
                        7
                      )}`}</Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}

          {results?.bikes?.map((data, index) => (
            <Col key={index} md={3} sm={6} lg={3}>
              <Card style={{ margin: "10px", width: "300px", height: "500px" }}>
                {data.images.length > 1 ? (
                  <Carousel>
                    {data.images.map((dataimg, imgind) => (
                      <Carousel.Item key={imgind}>
                        <Card.Img
                          src={dataimg.image}
                          style={{ width: "280px", height: "300px" }}
                          onClick={() => handleImageClick(data.id, "bike")}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                ) : data.images[0] ? (
                  <Card.Img
                    src={data.images[0].image}
                    style={{ width: "280px", height: "300px" }}
                    onClick={() => handleImageClick(data.id, "bike")}
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{data.bikePrice}</Card.Title>
                  <Card.Text>
  {/* Ensure bikeDescription is a string and has enough length */}
  {data.bikeDescription && typeof data.bikeDescription === 'string'
    ? data.bikeDescription.length > 20 
      ? data.bikeDescription.substring(0, 20) + "..."
      : data.bikeDescription // Show the full short description
    : "No description available."}
</Card.Text>
                  <Card.Text>
                    <Row>
                      <Col md={5}>{data.bikeState}</Col>
                      <Col md={7}>{`Posted on ${data.created_date.substring(
                        0,
                        7
                      )}`}</Col>
                    </Row>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default SearchResults;

// results.mobiles.map
