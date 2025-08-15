import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "../../style/Forms.css";
import olximg from "../../../images/avatar_2.png";
import { Link, useLocation } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { TbCameraPlus } from "react-icons/tb";

const SpareParts = () => {
  const [formData, setFormData] = useState({
    // cvsBrandId: "",
    cvsType: "",
    category: "",
    subcategory: "",
    cvsBrand: "",
    cvsTitle: "",
    cvsDescription: "",
    cvsPrice: "",
    cvsPhotos: [],
    cvsState: "",
    username: "",
    email: "",
  });

  const [states, setStates] = useState([]);

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
  const category = decodeURIComponent(params.get("category"));
  console.log("--cat--", category);

  const subcategory = params.get("subcategory");
  console.log("--subcat--", subcategory);
  const validateForm = () => {
    const newErrors = {};

    if (!formData.cvsType) {
      newErrors.cvsType = "cvs type is mandatory";
    }
    if (!formData.cvsTitle) {
      newErrors.cvsTitle = "Ad Title is mandatory";
    }
    if (!formData.cvsDescription) {
      newErrors.cvsDescription = "Description is mandatory";
    }

    if (!formData.cvsPrice) {
      newErrors.cvsPrice = "Price is mandatory";
    } else if (isNaN(formData.cvsPrice) || formData.cvsPrice <= 0) {
      newErrors.cvsPrice = "Price must be a positive number";
    }
    if (!formData.cvsState) {
      newErrors.cvsState = "State is mandatory";
    }

    if (formData.cvsPhotos.length === 0) {
      newErrors.cvsPhotos = "Atleast one image is mandatory";
    }

    return newErrors;
  };

  const cvsType = [
    "Wheels & Tyres",
    "Audio & Other Accessories",
    "Other Spare Parts",
  ];

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
        subcategory: subcategory || "", // Set subcategory from URL if available
        email: profileResponse.data.email || "",
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
      cvsPhotos: files,
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
      uploadData.append("cvsType", formData.cvsType);
      uploadData.append("category", formData.category);
      uploadData.append("subcategory", formData.subcategory);
      uploadData.append("cvsTitle", formData.cvsTitle);
      uploadData.append("cvsDescription", formData.cvsDescription);
      uploadData.append("cvsPrice", formData.cvsPrice);
      uploadData.append("cvsState", formData.cvsState);
      uploadData.append("username", formData.username);
      uploadData.append("email", formData.email);
      // uploadData.append("cvsPhotos",formData.cvsPhotos);
      // for single photos
      console.log("sub:", subcategory);
      formData.cvsPhotos.forEach((image, index) => {
        uploadData.append(`cvsPhotos[${index}]`, image);
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
          "http://127.0.0.1:8000/olxapi/cvsform/",
          uploadData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("cvs Data successfully posted:", response.data);
        // Clear the form and errors after successful submission
        setFormData({
          category: "",
          subcategory: "",
          cvsType: "",
          cvsTitle: "",
          cvsDescription: "",
          cvsPrice: "",
          cvsPhotos: [],
          cvsState: "",
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
            cvsType: formData.cvsType,
            cvsTitle: formData.cvsTitle,
            cvsDescription: formData.cvsDescription,
            cvsPrice: formData.cvsPrice,
            cvsState: formData.cvsState,
            cvsPhotos: formData.cvsPhotos,
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

        <div className="form-div">
          <Form.Label className="form-input-button form-field d-block">
            Type *
          </Form.Label>
          {cvsType.map((type) => (
            <Button
              key={type}
              className={`form-input-button-type ${
                formData.cvsType === type ? "selected" : ""
              }`}
              onClick={() => {
                setFormData({ ...formData, cvsType: type });
                // setSelectedButton(fuelData.name); // Update selected transmission to change the color
              }}
            >
              {type}
            </Button>
          ))}
          {errors.cvsType && <p className="error-message">{errors.cvsType}</p>}
        </div>

        <div className="form-div">
          <Form.Label>Ad title *</Form.Label>
          <Form.Control
            className="form-field"
            type="text"
            name="cvsTitle"
            placeholder="Enter ad title"
            value={formData.cvsTitle}
            onChange={(e) =>
              setFormData({ ...formData, cvsTitle: e.target.value })
            }
          />
          <span className="form-description">
            Mention the key features of your item (e.g. brand, model, age, type)
          </span>
          {errors.cvsTitle && (
            <p className="error-message">{errors.cvsTitle}</p>
          )}
        </div>

        <div className="form-div">
          <Form.Label>Description *</Form.Label>
          <Form.Control
            className="form-field"
            as="textarea"
            rows={4}
            name="cvsDescription"
            placeholder="Enter description"
            value={formData.cvsDescription}
            onChange={(e) =>
              setFormData({ ...formData, cvsDescription: e.target.value })
            }
          />
          <span className="form-description">
            Include condition, features and reason for selling
          </span>
          {errors.cvsDescription && (
            <p className="error-message">{errors.cvsDescription}</p>
          )}
        </div>

        <hr></hr>

        <div className="form-div">
          <h1>SET A PRICE</h1>
          <Form.Label className="form-input-button d-block">Price *</Form.Label>
          <Form.Control
            className="form-field"
            type="number"
            name="cvsPrice"
            placeholder="Enter price"
            value={formData.cvsPrice}
            onChange={(e) =>
              setFormData({ ...formData, cvsPrice: e.target.value })
            }
            style={{
              backgroundImage: "url(/images/rupee-indian.png)", // Path relative to the public folder in React
              backgroundPosition: "10px center",
              backgroundRepeat: "no-repeat",
              paddingLeft: "30px", // Adjust padding to make space for the symbol
            }}
          />
          {errors.cvsPrice && (
            <p className="error-message">{errors.cvsPrice}</p>
          )}
        </div>
        <hr />

        <div className="form-div">
          <h4>UPLOAD UP TO 20 PHOTOS {`${100 / selectedFiles.length}px`}</h4>
          <Form.Group controlId="formcvsPhotos">
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
              name="cvsPhotos"
              onChange={handleFileChange}
            />
          </Form.Group>
          {errors.cvsPhotos && (
            <p className="error-message">{errors.cvsPhotos}</p>
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
              setFormData({ ...formData, cvsState: e.target.value })
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
        {errors.cvsState && <p className="error-message">{errors.cvsState}</p>}
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

export default SpareParts;
