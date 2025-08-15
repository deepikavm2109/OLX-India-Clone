import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "../style/Forms.css";
import olximg from "../../images/avatar_2.png";
import { Link, useLocation } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { TbCameraPlus } from "react-icons/tb";

const Services = () => {
  const [formData, setFormData] = useState({
    // serviceBrandId: "",
    category: "",
    subcategory: "",
    educationclassesType: "",
    tourstravelType: "",
    electronicsrepairservicesType: "",
    healthbeautyType: "",
    homerenovationrepairType: "",
    cleaningpestcontrolType: "",
    legaldocumentationType: "",
    subcategory: "",
    serviceBrand: "",
    serviceTitle: "",
    serviceDescription: "",
    servicePhotos: [],
    serviceState: "",
    username: "",
    email: "",
  });

  const [states, setStates] = useState([]);
  const [tourType, setTourType] = useState([]);
  const [erType, setErType] = useState([]);
  const [hrType, setHrType] = useState([]);

  // const [userName, setUserName] = useState("OLX USER");
  const [profileDetails, setProfileDetails] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [olxImage, setOlxImage] = useState(olximg);
  const [selectedImage, setSelectedImage] = useState(null);

  // to change the color of all buttons present in the form after selecting it
  // const [selectedButton, setSelectedButton] = useState(null);

  // user profile single image

  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  const subcategory = params.get("subcategory");

  const validateForm = () => {
    const newErrors = {};
    // if (
    //   !formData.educationclassesType &&
    //   !formData.healthbeautyType &&
    //   !formData.tourstravelType &&
    //   !formData.electronicsrepairservicesType &&
    //   !formData.cleaningpestcontrolType &&
    //   !formData.homerenovationrepairType &&
    //   !formData.legaldocumentationType
    // ) {
    //   newErrors.serviceType = "Service Type is mandatory";
    // }
    if (subcategory === "Tours & Travel" && !formData.tourstravelType) {
      newErrors.serviceType = "Service type is mandatory for Tours & Travel";
    } else if (subcategory === "Electronics Repair & Services" && !formData.electronicsrepairservicesType) {
      newErrors.serviceType = "Service type is mandatory for Electronics Repair & Services";
    } else if (subcategory === "Cleaning & Pest Control" && !formData.cleaningpestcontrolType) {
      newErrors.serviceType = "Service type is mandatory for Cleaning & Pest Control";
    } else if (subcategory === "Legal & Documentation Services" && !formData.legaldocumentationType) {
      newErrors.serviceType = "Service type is mandatory for Legal & Documentation Services";
    } 

    if (!formData.serviceTitle) {
      newErrors.serviceTitle = "Ad Title is mandatory";
    }
    if (!formData.serviceDescription) {
      newErrors.serviceDescription = "Description is mandatory";
    }
    
    if (!formData.serviceState) {
      newErrors.serviceState = "State is mandatory";
    }
    if (formData.servicePhotos.length === 0) {
      newErrors.servicePhotos = "Atleast one image is mandatory";
    }

    return newErrors;
  };

  const educationclassesType = [
    "Tutions",
    "Hobby Classes",
    "Skill Development",
    "Others",
  ];
  const healthbeautyType = [
    "Fitness & Wellness",
    "Salons Services",
    "Health & Safety",
    "Others",
  ];
  const cleaningpestcontrolType = [
    "Home Cleaning",
    "Pest Control",
    "Car Cleaning",
    "Others",
  ];
  const legaldocumentationType = [
    "RTO Related",
    "KYC Related",
    "Notary Services",
    "Others",
  ];

  const fetchType = async () => {
    try {
      const toursResponse = await axios.get(`/olxapi/tourstype/`);
      console.log(toursResponse.data);
      setTourType(toursResponse.data);
      const electronicrepairResponse = await axios.get(
        `/olxapi/electronicrepairtype/`
      );
      console.log(electronicrepairResponse.data);
      setErType(electronicrepairResponse.data);

      const homerenovationResponse = await axios.get(
        `/olxapi/homerenovationtype/`
      );
      console.log(homerenovationResponse.data);
      setHrType(homerenovationResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchType();
  }, []);
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
        username: profileResponse.data.username || "",
        category: category || "", // Set category from URL if available
        subcategory: subcategory || "", // Set subcategory from URL if available // Set subcategory from URL if available
        email: profileResponse.data.email || "",
        category: category || "", // Set category from URL if available
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

    setFormData({
      ...formData,
      servicePhotos: files,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setSelectedImage(newImageUrl); // Set the uploaded image for the profile
      setFormData({
        ...formData,
        // profile_image: e.target.files[0], #single
        profile_image: file,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      const uploadData = new FormData();

      uploadData.append("educationclassesType", formData.educationclassesType);
      uploadData.append("healthbeautyType", formData.healthbeautyType);
      uploadData.append("tourstravelType", formData.tourstravelType);
      uploadData.append(
        "cleaningpestcontrolType",
        formData.cleaningpestcontrolType
      );
      uploadData.append(
        "legaldocumentationType",
        formData.legaldocumentationType
      );
      uploadData.append("category", formData.category);
      uploadData.append("subcategory", formData.subcategory);
      uploadData.append("electronicsrepairservicesType", formData.electronicsrepairservicesType);
      uploadData.append("homerenovationrepairType", formData.homerenovationrepairType);
      uploadData.append("subcategory", formData.subcategory);
      uploadData.append("serviceTitle", formData.serviceTitle);
      uploadData.append("serviceDescription", formData.serviceDescription);
      uploadData.append("serviceState", formData.serviceState);
      uploadData.append("username", formData.username);
      uploadData.append("email", formData.email);
      // uploadData.append("servicePhotos",formData.servicePhotos);
      // for single photos
      console.log("sub:", subcategory);
      formData.servicePhotos.forEach((image, index) => {
        uploadData.append(`servicePhotos[${index}]`, image);
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
          "http://127.0.0.1:8000/olxapi/serviceform/",
          uploadData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("service Data successfully posted:", response.data);
        // Clear the form and errors after successful submission
        setFormData({
          category:"",
          subcategory: "",
          electronicsrepairservicesType:"",
          homerenovationrepairType: "",
          educationclassesType: "",
          healthbeautyType: "",
          tourstravelType: "",
          cleaningpestcontrolType: "",
          legaldocumentationType: "",
          serviceTitle: "",
          serviceDescription: "",
          servicePhotos: [],
          serviceState: "",
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
            tourstravelType: formData.tourstravelType,
            electronicsrepairservicesType:formData.electronicsrepairservicesType,
            cleaningpestcontrolType: formData.cleaningpestcontrolType,
            healthbeautyType: formData.heeducationclassesTypealthbeautyType,
            homerenovationrepairType: formData.homerenovationrepairType,
            educationclassesType: formData.educationclassesType,
            legaldocumentationType: formData.legaldocumentationType,
            serviceTitle: formData.serviceTitle,
            serviceDescription: formData.serviceDescription,
            serviceState: formData.serviceState,
            servicePhotos: formData.servicePhotos,
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

        {
          // dropdown
          subcategory === "Tours & Travel" ? (
            <div className="form-div">
              <Form.Label className="form-input-button form-field d-block">
                Type *
              </Form.Label>
              <Form.Control
                as="select"
                className="form-field"
                onChange={(e) =>
                  setFormData({ ...formData, tourstravelType: e.target.value })
                }
              >
                <option value="" />
                {tourType.map((type) => (
                  <option
                    value={type.tours_name}
                    key={type.id}
                    label={type.tours_name}
                  />
                ))}
              </Form.Control>
              <p>
              {errors.serviceType && (
                  <p className="error-message">{errors.serviceType}</p>
                )}
              </p>
            </div>
          ) : subcategory === "Electronics Repair & Services" ? (
            <div className="form-div">
              <Form.Label className="form-input-button form-field d-block">
                Type *
              </Form.Label>
              <Form.Control
                as="select"
                className="form-field"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    electronicsrepairservicesType: e.target.value,
                  })
                }
              >
                <option value="" />
                {erType.map((type) => (
                  <option
                    value={type.er_name}
                    key={type.id}
                    label={type.er_name}
                  />
                ))}
              </Form.Control>
              <p>
                {" "}
                {errors.serviceType && (
                  <p className="error-message">
                    {errors.serviceType}
                  </p>
                )}
              </p>
            </div>
          ) : subcategory === "Home Renovation & Repair" ? (
            <div className="form-div">
              <Form.Label className="form-input-button form-field d-block">
                Type *
              </Form.Label>
              <Form.Control
                as="select"
                className="form-field"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    homerenovationrepairType: e.target.value,
                  })
                }
              >
                <option value="" />
                {hrType.map((type) => (
                  <option
                    value={type.hr_name}
                    key={type.id}
                    label={type.hr_name}
                  />
                ))}
              </Form.Control>
              {errors.serviceType && (
                <p className="error-message">
                 {errors.serviceType}
                </p>
              )}
            </div>
          ) : subcategory === "Legal & Documentation Services" ? (
            <div className="form-div">
              <Form.Label className="form-input-button form-field d-block">
                Type *
              </Form.Label>
              {legaldocumentationType.map((type) => (
                <Button
                  key={type}
                  className={`form-input-button-type ${
                    formData.legaldocumentationType === type ? "selected" : ""
                  }`}
                  onClick={() => {
                    setFormData({ ...formData, legaldocumentationType: type });
                    // setSelectedButton(fuelData.name); // Update selected transmission to change the color
                  }}
                >
                  {type}
                </Button>
              ))}
              {errors.serviceType && (
                <p className="error-message">{errors.serviceType}</p>
              )}
            </div>
          ) : subcategory === "Cleaning & Pest Control" ? (
            <div className="form-div">
              <Form.Label className="form-input-button form-field d-block">
                Type *
              </Form.Label>
              {cleaningpestcontrolType.map((type) => (
                <Button
                  key={type}
                  className={`form-input-button-type ${
                    formData.cleaningpestcontrolType === type ? "selected" : ""
                  }`}
                  onClick={() => {
                    setFormData({ ...formData, cleaningpestcontrolType: type });
                    // setSelectedButton(fuelData.name); // Update selected transmission to change the color
                  }}
                >
                  {type}
                </Button>
              ))}
              {errors.serviceType && (
                <p className="error-message">
                  {errors.serviceType}
                </p>
              )}
            </div>
          ) : subcategory === "Health & Beauty" ? (
            <div className="form-div">
              <Form.Label className="form-input-button form-field d-block">
                Type *
              </Form.Label>
              {healthbeautyType.map((type) => (
                <Button
                  key={type}
                  className={`form-input-button-type ${
                    formData.healthbeautyType === type ? "selected" : ""
                  }`}
                  onClick={() => {
                    setFormData({ ...formData, healthbeautyType: type });
                    // setSelectedButton(fuelData.name); // Update selected transmission to change the color
                  }}
                >
                  {type}
                </Button>
              ))}
              {errors.serviceType && (
                <p className="error-message">{errors.serviceType}</p>
              )}
            </div>
          ) : subcategory === "Education & Classes" ? (
            <div className="form-div">
              <Form.Label className="form-input-button form-field d-block">
                Type *
              </Form.Label>
              {educationclassesType.map((type) => (
                <Button
                  key={type}
                  className={`form-input-button-type ${
                    formData.educationclassesType === type ? "selected" : ""
                  }`}
                  onClick={() => {
                    setFormData({ ...formData, educationclassesType: type });
                    // setSelectedButton(fuelData.name); // Update selected transmission to change the color
                  }}
                >
                  {type}
                </Button>
              ))}
              {errors.serviceType && (
                <p className="error-message">{errors.serviceType}</p>
              )}
            </div>
          ) : (
            <null></null>
          )
        }

        <div className="form-div">
          <Form.Label>Ad title *</Form.Label>
          <Form.Control
            className="form-field"
            type="text"
            name="serviceTitle"
            placeholder="Enter ad title"
            value={formData.serviceTitle}
            onChange={(e) =>
              setFormData({ ...formData, serviceTitle: e.target.value })
            }
          />
          <span className="form-description">
            Mention the key features of your item (e.g. brand, model, age, type)
          </span>
          {errors.serviceTitle && (
            <p className="error-message">{errors.serviceTitle}</p>
          )}
        </div>

        <div className="form-div">
          <Form.Label>Description *</Form.Label>
          <Form.Control
            className="form-field"
            as="textarea"
            rows={4}
            name="serviceDescription"
            placeholder="Enter description"
            value={formData.serviceDescription}
            onChange={(e) =>
              setFormData({ ...formData, serviceDescription: e.target.value })
            }
          />
          <span className="form-description">
            Include condition, features and reason for selling
          </span>
          {errors.serviceDescription && (
            <p className="error-message">{errors.serviceDescription}</p>
          )}
        </div>

        <hr/>

        <div className="form-div">
          <h4>UPLOAD UP TO 20 PHOTOS {`${100 / selectedFiles.length}px`}</h4>
          <Form.Group controlId="formservicePhotos">
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
              name="servicePhotos"
              onChange={handleFileChange}
            />
          </Form.Group>
          {errors.servicePhotos && (
            <p className="error-message">{errors.servicePhotos}</p>
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
              setFormData({ ...formData, serviceState: e.target.value })
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
        {errors.serviceState && (
          <p className="error-message">{errors.serviceState}</p>
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

export default Services;
