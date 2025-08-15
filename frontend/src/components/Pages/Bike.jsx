import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "../style/Forms.css";
import olximg from "../../images/avatar_2.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { TbCameraPlus } from "react-icons/tb";

const Bike = () => {
  const [formData, setFormData] = useState({
    category: "",
    subcategory: "",
    bikeBrandId: "",
    bikeBrand: "",
    bikeModelId: "",
    bikeModel: "",
    bikeYear: "",
    bikeKM: "",
    bikeTitle: "",
    bikeDescription: "",
    bikePrice: "",
    bikePhotos: [],
    bikeState: "",
    username: "",
    email: "",
  });

  const [motorcycleBrandTitle, setMotorcycleBrandTitle] = useState([]);
  const [selectedMotorcycleTitle, setSelectedMotorcycleTitle] = useState("");
  const [motorcycleModel, setMotorcycleModel] = useState([]);

  const [scooterBrandTitle, setScooterBrandTitle] = useState([]);
  const [selectedScooterTitle, setSelectedScooterTitle] = useState("");
  const [scooterModel, setScooterModel] = useState([]);

  const [bicycleBrandTitle, setBicycleBrandTitle] = useState([]);

  const [states, setStates] = useState([]);
  const [profileDetails, setProfileDetails] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [olxImage, setOlxImage] = useState(olximg);
  const [selectedImage, setSelectedImage] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  const subcategory = params.get("subcategory");

  const validateForm = () => {
    const newErrors = {};

    if (
      (subcategory === "Motorcycles" ||
        subcategory === "Scooters" ||
        subcategory === "Bicycles") &&
      !formData.bikeBrand
    ) {
      newErrors.bikeBrand = "Brand is mandatory";
    }
    if (
      (subcategory === "Motorcycles" || subcategory === "Scooters") &&
      !formData.bikeModel
    ) {
      newErrors.bikeModel = "Model is mandatory";
    }
    if (subcategory === "Motorcycles" || subcategory === "Scooters") {
    if (
      (!formData.bikeYear)
    ) {
      newErrors.bikeYear = "Year is mandatory";
    } else if (!/^\d{4}$/.test(formData.bikeYear)) {
      newErrors.bikeYear = "Year must be a 4-digit number";
    } else if (formData.bikeYear < 1980) {
      newErrors.bikeYear = "Model is too old to be accepted";
    } else if (formData.bikeYear > new Date().getFullYear()) {
      newErrors.bikeYear = "Year has not yet occurred";
    }
}
    if (
      (subcategory === "Motorcycles" || subcategory === "Scooters") &&
      !formData.bikeKM
    ) {
      newErrors.bikeKM = "KM is mandatory";
    }
    if (!formData.bikeTitle) {
      newErrors.bikeTitle = "Ad Title is mandatory";
    }
    if (!formData.bikeDescription) {
      newErrors.bikeDescription = "Description is mandatory";
    }

    if (!formData.bikePrice) {
      newErrors.bikePrice = "Price is mandatory";
    } else if (isNaN(formData.bikePrice) || formData.bikePrice <= 0) {
      newErrors.bikePrice = "Price must be a positive number";
    }
    if (!formData.bikeState) {
      newErrors.bikeState = "State is mandatory";
    }

    if (formData.bikePhotos.length === 0) {
      newErrors.bikePhotos = "Atleast one image is mandatory";
    }

    return newErrors;
  };

  const fetchMotorcycleBrandTitle = async () => {
    try {
      const titleResponse = await axios.get(`/olxapi/motorcyclebrandtitle/`);
      console.log(titleResponse.data);
      setMotorcycleBrandTitle(titleResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchScooterBrandTitle = async () => {
    try {
      const titleResponse = await axios.get(`/olxapi/scooterbrandtitle/`);
      console.log(titleResponse.data);
      setScooterBrandTitle(titleResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBicycleBrandTitle = async () => {
    try {
      const titleResponse = await axios.get(`/olxapi/bicyclebrandtitle/`);
      console.log(titleResponse.data);
      setBicycleBrandTitle(titleResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMotorcycleBrandTitle();
    fetchScooterBrandTitle();
    fetchBicycleBrandTitle();
  }, []);

//   motorcycle 

  const handleMotorcycleStateChange = (event) => {
    console.log("checking", event.target.value);
    const brandId = event.target.value;
    setSelectedMotorcycleTitle(brandId); // Store the ID first

    const selectedBrand = motorcycleBrandTitle.find(
      (brand) => brand.id === parseInt(brandId)
    );
    setFormData({
      ...formData,
      bikeBrandId: brandId,
      bikeBrand: selectedBrand?.name || "",
    });

    axios
      .get(`/olxapi/motorcyclebrandmodels/?brand_title_id=${brandId}`)
      .then((response) => {
        console.log(response.data);
        setMotorcycleModel(response.data);

        console.log(formData);
      })
      .catch((error) => {
        console.error("There was an error fetching the model!", error);
      });

    console.log("value ", event.target.value);
    console.log("name ", event.target.name);
  };

  const handleMotorcycleModelChange = (event) => {
    // console.log(event.target.value)
    const modelId = event.target.value;
    const selectedModel = motorcycleModel.find((model) => model.id === parseInt(modelId));
    setFormData({
      ...formData,
      bikeModelId: modelId,
      bikeModel: selectedModel?.name || "",
    });
  };

// scooter
const handleScooterStateChange = (event) => {
    console.log("checking", event.target.value);
    const brandId = event.target.value;
    setSelectedScooterTitle(brandId); // Store the ID first

    const selectedBrand = scooterBrandTitle.find(
      (brand) => brand.id === parseInt(brandId)
    );
    setFormData({
      ...formData,
      bikeBrandId: brandId,
      bikeBrand: selectedBrand?.name || "",
    });

    axios
      .get(`/olxapi/scooterbrandmodels/?brand_title_id=${brandId}`)
      .then((response) => {
        console.log(response.data);
        setScooterModel(response.data);

        console.log(formData);
      })
      .catch((error) => {
        console.error("There was an error fetching the model!", error);
      });

    console.log("value ", event.target.value);
    console.log("name ", event.target.name);
  };

  const handleScooterModelChange = (event) => {
    // console.log(event.target.value)
    const modelId = event.target.value;
    const selectedModel = scooterModel.find((model) => model.id === parseInt(modelId));
    setFormData({
      ...formData,
      bikeModelId: modelId,
      bikeModel: selectedModel?.name || "",
    });
  };


  const StateDropdown = async () => {
    try {
      const fetchStateResponse = await axios.get("/olxapi/statelist/");
      setStates(fetchStateResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const isTokenExpired = (token) => {
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000; // in seconds
    return decodedToken.exp < currentTime;
  };

  const fetchProfile = async () => {
    try {
      let tokens = JSON.parse(localStorage.getItem("tokens"));
      let accessToken = tokens?.access;

      // Refresh token if access token is expired
      if (isTokenExpired(accessToken)) {
        const refreshToken = tokens?.refresh;
        console.log("refresh token: ", refreshToken);
        const response = await axios.post(
          "http://127.0.0.1:8000/olxapi/token/refresh/",
          { refresh: refreshToken }
        );
        accessToken = response.data.access;
        localStorage.setItem(
          "tokens",
          JSON.stringify({ ...tokens, access: accessToken })
        );
      }

      const profileResponse = await axios.get(
        "http://127.0.0.1:8000/olxapi/profile/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setProfileDetails(profileResponse.data);

      // Update formData with the fetched username and email
      setFormData((prevFormData) => ({
        ...prevFormData,
        category: category || "", // Set category from URL if available
        subcategory: subcategory || "", // Set subcategory from URL if available
        username: profileResponse.data.username || "",
        email: profileResponse.data.email || "",
        subcategory: subcategory || "", // Set subcategory from URL if available
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    StateDropdown();
    fetchProfile();
  }, []);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    console.log("files", files);
    setSelectedFiles(files);
    const urls = files.map((file) => URL.createObjectURL(file));
    console.log("urls", urls);
    setPreviewUrls(urls);

    // Convert files to JSON string URLs for form submission
    // setFormData({
    //   ...formData,
    //   bikePhotos: JSON.stringify(urls),
    // });

    setFormData({
      ...formData,
      bikePhotos: files,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setSelectedImage(newImageUrl); // Set the uploaded image for the profile
      setFormData({
        ...formData,
        profile_image: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      const uploadData = new FormData();
      uploadData.append("category", formData.category);
      uploadData.append("subcategory", formData.subcategory);
      console.log("subcategory: ",subcategory)
      uploadData.append("bikeBrand", formData.bikeBrand);
      uploadData.append("bikeModel", formData.bikeModel);
      uploadData.append("bikeYear", formData.bikeYear);
      uploadData.append("bikeKM", formData.bikeKM);
      uploadData.append("bikeTitle", formData.bikeTitle);
      uploadData.append("bikeDescription", formData.bikeDescription);
      uploadData.append("bikePrice", formData.bikePrice);
      uploadData.append("bikeState", formData.bikeState);
      uploadData.append("username", formData.username);
      uploadData.append("email", formData.email);

      formData.bikePhotos.forEach((image, index) => {
        uploadData.append(`bikePhotos[${index}]`, image);
      });

      // Log the FormData content to check
      for (const pair of uploadData.entries()) {
        console.log(pair[0], pair[1]);
      }
      setIsSubmit(true);

      try {
        let tokens = JSON.parse(localStorage.getItem("tokens"));
        let accessToken = tokens?.access;

        if (isTokenExpired(accessToken)) {
          const refreshToken = tokens?.refresh;
          const response = await axios.post(
            "http://127.0.0.1:8000/olxapi/token/refresh/",
            { refresh: refreshToken }
          );
          accessToken = response.data.access;
          localStorage.setItem(
            "tokens",
            JSON.stringify({ ...tokens, access: accessToken })
          );
        }

        // Send the POST request with the access token in headers
        const response = await axios.post(
          "http://127.0.0.1:8000/olxapi/bikeform/",
          uploadData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("bike Data successfully posted:", response.data);
        // Clear the form and errors after successful submission
        setFormData({
          category: "",
    subcategory: "",
          bikeBrandId: "",
          bikeBrand: "",
          bikeModelId: "",
          bikeModel: "",
          bikeYear: "",
          bikeKM: "",
          bikeTitle: "",
          bikeDescription: "",
          bikePrice: "",
          bikePhotos: [],
          bikeState: "",
          username: "",
          email: "",
        });
        setErrors({});
        setIsSubmit(true);
      } catch (error) {
        console.error("Error uploading data:", error);
      }
    } else {
      setErrors(formErrors);
      console.log(formErrors);
    }
  };

  return (
    <>
      <pre>
        {JSON.stringify(
          {
            category: formData.category,
            subcategory: formData.subcategory,
            bikeBrand: formData.bikeBrand,
            bikeModel: formData.bikeModel,
            bikeYear: formData.bikeYear,
            bikeKM: formData.bikeKM,
            bikeTitle: formData.bikeTitle,
            bikeDescription: formData.bikeDescription,
            bikePrice: formData.bikePrice,
            bikeState: formData.bikeState,
            bikePhotos: formData.bikePhotos,
            username: formData.username,
            email: formData.email,
          },
          undefined,
          2
        )}
      </pre>

      <form className="form-title" onSubmit={handleSubmit}>
        <div className="form-div">
          <span>
            {category}/{subcategory}
          </span>
          <Link className="form-link" to={"/post"}>
            Change
          </Link>
        </div>
        <h2>Include some details</h2>

        {subcategory === "Motorcycles" ? (
          <div className="form-div">
            <Form.Label className="d-block">Brand *</Form.Label>
            <Form.Control
              as="select"
              className="form-field"
              onChange={handleMotorcycleStateChange}
            >
              <option value="">---Select Brand---</option>

              {motorcycleBrandTitle.map((title) => (
                <option value={title.id} key={title.id}>
                  {title.name}
                </option>
              ))}
            </Form.Control>
            {errors.bikeBrand && (
              <p className="error-message">{errors.bikeBrand}</p>
            )}
          </div>
        )
        :subcategory === "Scooters" ? (
            <div className="form-div">
              <Form.Label className="d-block">Brand *</Form.Label>
              <Form.Control
                as="select"
                className="form-field"
                onChange={handleScooterStateChange}
              >
                <option value="">---Select Brand---</option>
  
                {scooterBrandTitle.map((title) => (
                  <option value={title.id} key={title.id}>
                    {title.name}
                  </option>
                ))}
              </Form.Control>
              {errors.bikeBrand && (
                <p className="error-message">{errors.bikeBrand}</p>
              )}
            </div>
          )
          :subcategory === "Bicycles" ? (
            <div className="form-div">
              <Form.Label className="d-block">Brand *</Form.Label>
              <Form.Control
                as="select"
                className="form-field"
                onChange={(e) =>
                    setFormData({ ...formData, bikeBrand: e.target.value })
                  }
              >
                <option value="">---Select Brand---</option>
  
                {bicycleBrandTitle.map((title) => (
                  <option value={title.id} key={title.id}>
                    {title.name}
                  </option>
                ))}
              </Form.Control>
              {errors.bikeBrand && (
                <p className="error-message">{errors.bikeBrand}</p>
              )}
            </div>
          )

          : (
          <></>
        )}

        {(selectedMotorcycleTitle && (
          <div className="form-div">
            <Form.Label>Model *</Form.Label>
            <Form.Control
              as="select"
              className="form-field"
              onChange={handleMotorcycleModelChange}
              value={formData.modelId}
            >
              <option value="">---Select Model---</option>
              {motorcycleModel.map((modelname) => (
                <option value={modelname.id} key={modelname.id}>
                  {modelname.name}
                </option>
              ))}
            </Form.Control>
            {errors.bikeModel && (
              <p className="error-message">{errors.bikeModel}</p>
            )}
          </div>
        ))
        || 
        (selectedScooterTitle && (
            <div className="form-div">
              <Form.Label>Model *</Form.Label>
              <Form.Control
                as="select"
                className="form-field"
                onChange={handleScooterModelChange}
                value={formData.modelId}
              >
                <option value="">---Select Model---</option>
                {scooterModel.map((modelname) => (
                  <option value={modelname.id} key={modelname.id}>
                    {modelname.name}
                  </option>
                ))}
              </Form.Control>
              {errors.bikeModel && (
                <p className="error-message">{errors.bikeModel}</p>
              )}
            </div>
          ))
        }

        {(subcategory === "Motorcycles" || subcategory === "Scooters" ) ? (
          <div className="form-div">
            <Form.Label>Year *</Form.Label>
            <Form.Control
              className="form-input-group-bike form-field"
              type="number"
              name="bikeYear"
              placeholder="Enter year of manufacture"
              value={formData.bikeYear}
              onChange={(e) =>
                setFormData({ ...formData, bikeYear: e.target.value })
              }
            />
            {errors.bikeYear && (
              <p className="error-message">{errors.bikeYear}</p>
            )}
          </div>
        ) : (
          <></>
        )}

        {(subcategory === "Motorcycles" || subcategory === "Scooters") ? (
          <div className="form-div">
            <Form.Label className="form-field">KM driven *</Form.Label>
            <Form.Control
              className="form-input-group-bike"
              type="number"
              name="bikeKM"
              placeholder="Enter KM Driven"
              value={formData.bikeKM}
              onChange={(e) =>
                setFormData({ ...formData, bikeKM: e.target.value })
              }
            />
            {errors.bikeKM && <p className="error-message">{errors.bikeKM}</p>}
          </div>
        ) : (
          <></>
        )}

        <div className="form-div">
          <Form.Label>Ad title *</Form.Label>
          <Form.Control
            className="form-field"
            type="text"
            name="bikeTitle"
            placeholder="Enter ad title"
            value={formData.bikeTitle}
            onChange={(e) =>
              setFormData({ ...formData, bikeTitle: e.target.value })
            }
          />
          <span className="form-description">
            Mention the key features of your item (e.g. brand, model, age, type)
          </span>
          {errors.bikeTitle && (
            <p className="error-message">{errors.bikeTitle}</p>
          )}
        </div>

        <div className="form-div">
          <Form.Label>Description *</Form.Label>
          <Form.Control
            className="form-field"
            as="textarea"
            rows={4}
            name="bikeDescription"
            placeholder="Enter description"
            value={formData.bikeDescription}
            onChange={(e) =>
              setFormData({ ...formData, bikeDescription: e.target.value })
            }
          />
          <span className="form-description">
            Include condition, features and reason for selling
          </span>
          {errors.bikeDescription && (
            <p className="error-message">{errors.bikeDescription}</p>
          )}
        </div>

        <hr></hr>

        <div className="form-div">
          <h1>SET A PRICE</h1>
          <Form.Label className="form-input-button d-block">Price *</Form.Label>
          <Form.Control
            className="form-field"
            type="number"
            name="bikePrice"
            placeholder="Enter price"
            value={formData.bikePrice}
            onChange={(e) =>
              setFormData({ ...formData, bikePrice: e.target.value })
            }
            style={{
              backgroundImage: "url(/images/rupee-indian.png)", // Path relative to the public folder in React
              backgroundPosition: "10px center",
              backgroundRepeat: "no-repeat",
              paddingLeft: "30px", // Adjust padding to make space for the symbol
            }}
          />
          {errors.bikePrice && (
            <p className="error-message">{errors.bikePrice}</p>
          )}
        </div>
        <hr />

        <div className="form-div">
          <h4>UPLOAD UP TO 20 PHOTOS {`${100 / selectedFiles.length}px`}</h4>
          <Form.Group controlId="formbikePhotos">
            <Form.Label
              style={{
                border: "1px solid",
                width: "150px",
                height: "150px",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {previewUrls.map((url, index) => (
                <img
                  alt={`Preview ${index + 1}`}
                  className="photo-thumbnail1"
                  key={index}
                  src={url}
                  width={`${120 / previewUrls.length}px`}
                  height={`${120 / selectedFiles.length}px`}
                  style={{ margin: "10px", border: "1px solid" }}
                />
              ))}
              {previewUrls.length === 0 && (
                <FaCamera
                  style={{ width: "50px", height: "50px", margin: "50px" }}
                />
              )}
            </Form.Label>
            <Form.Control
              type="file"
              multiple
              accept="image/*"
              className="d-none"
              name="bikePhotos"
              onChange={handleFileChange}
            />
          </Form.Group>
          {errors.bikePhotos && (
            <p className="error-message">{errors.bikePhotos}</p>
          )}
        </div>

        <hr />

        <div className="form-div">
          <h4>CONFIRM YOUR LOCATION</h4>
          <Form.Label>State *</Form.Label>
          <Form.Control
            as="select"
            className="form-field"
            onChange={(e) =>
              setFormData({ ...formData, bikeState: e.target.value })
            }
          >
            <option value="">---Select States---</option>
            {states.map((state) => (
              <option value={state.state_name} key={state.id}>
                {state.state_name}
              </option>
            ))}
          </Form.Control>
        </div>
        {errors.bikeState && (
          <p className="error-message">{errors.bikeState}</p>
        )}
        <hr />

        <div className="form-div">
          <h4>REVIEW YOUR DETAILS</h4>
          <Row>
            <Col sd={2} md={2} lg={2}>
              <Form.Group controlId="formProfileImage">
                <Form.Label
                  style={{
                    position: "relative",
                    width: "100px",
                    height: "100px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={selectedImage || olxImage} // Display the uploaded image or the default one
                    width="100px"
                    height="100px"
                    style={{ zIndex: 1 }}
                    alt="Upload"
                  />
                  <TbCameraPlus
                    style={{
                      width: "20px",
                      height: "20px",
                      position: "absolute",
                      zIndex: 2,
                      top: "72px", // Adjust positioning as necessary
                      left: "40px",
                      color: "white",
                    }}
                  />

                  <Form.Control
                    type="file"
                    accept="image/*"
                    className="d-none"
                    onChange={handleImageUpload}
                  />
                </Form.Label>
              </Form.Group>
            </Col>
            <Col sd={4} md={4} lg={4}>
              <div>
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  className="form-input-button"
                  name="username"
                  value={profileDetails.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  // onChange={(event) => {
                  //   setUserName(event.target.value);
                  // }}
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col sd={3} md={3} lg={3}>
              <Form.Label>Your email id:</Form.Label>
              {errors.profileDetails}
            </Col>
            <Col sd={3} md={3} lg={3}>
              {profileDetails.email && (
                // <p >{profileDetails.email}</p>
                <Form.Control
                  type="email"
                  className="form-input-button"
                  name="email"
                  value={profileDetails.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  // onChange={(event) => {
                  //   setUserName(event.target.value);
                  // }}
                />
              )}
              <p className="error-message">{errors.profileDetails}</p>
            </Col>
          </Row>
        </div>

        <hr />
        <Button
          className="form-post-button"
          type="submit"
          style={{
            // backgroundColor: "#D8DFE0",
            border: "none",
            // color: "#7F9799",
            backgroundColor: isSubmit ? "#4CAF50" : "#D8DFE0",
            color: isSubmit ? "#D8DFE0" : "#4CAF50",
          }}
        >
          Post now
        </Button>
        <h1>{selectedImage || olxImage}</h1>
      </form>
    </>
  );
};

export default Bike;
