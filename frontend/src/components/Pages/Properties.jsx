import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "../style/Forms.css";
import olximg from "../../images/avatar_2.png";
import { Link, useLocation } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { TbCameraPlus } from "react-icons/tb";

const Properties = () => {
  const [formData, setFormData] = useState({
    category:"",
    subcategory: "",
    propertyType: "",
    propertyBHK: "",
    propertyBathrooms: "",
    propertyFurnishing: "",
    propertyProjectStatus: "",
    propertySuperBuiltUpArea: "",
    propertyCarpetArea: "",
    propertyPlotArea: "",
    propertyLength: "",
    propertyBreadth: "",
    propertyMaintenance: "",
    propertyTotalFloors: "",
    propertyFloorNo: "",
    propertyFacing: "",
    propertyListedBy: "",
    propertyWashrooms: "",
    propertyProjectName: "",
    propertySubtype: "",
    propertyMealsIncluded: "",
    propertyTitle: "",
    propertyDescription: "",
    propertyPrice: "",
    propertyPhotos: [],
    propertyState: +"",
    username: "",
    email: "",
    propertyBachelorsAllowed: "",
  });

  const [states, setStates] = useState([]);

  // const [userName, setUserName] = useState("OLX USER");
  const [profileDetails, setProfileDetails] = useState({});
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [olxImage, setOlxImage] = useState(olximg);
  const [selectedImage, setSelectedImage] = useState(null);

  const hAType = [
    "Flats / Apartments",
    "Independent / Builder Floors",
    "Farm House",
    "House & Villa",
  ];

  const lPType = ["For Rent", "For Sale"];

  const bhk = ["1", "2", "3", "4", "4+"];
  const bathrooms = ["1", "2", "3", "4", "4+"];
  const furnishing = ["Furnished", "Semi-Furnished", "Unfurnished"];
  const projectStatus = ["New Launch", "Ready to Move", "Under Construction"];
  const listedBy = ["Builder", "Dealer", "Owner"];
  const carParking = ["0", "1", "2", "3", "3+"];
  const facing = [
    "East",
    "North",
    "South",
    "North-East",
    "North-West",
    "South-East",
    "South-West",
    "West",
  ];
  const bachelors = ["No","Yes"];
  // pg
  const pgSubtype = ["Guest Houses", "PG", "Roommate"];

  const meals = ["No", "Yes"];

  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category");

  const subcategory = params.get("subcategory");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.propertyTitle) {
      newErrors.propertyTitle = "Ad Title is mandatory";
    }
    if (!formData.propertyDescription) {
      newErrors.propertyDescription = "Description is mandatory";
    }

    if (!formData.propertyPrice) {
      newErrors.propertyPrice = "Price is mandatory";
    } else if (isNaN(formData.propertyPrice) || formData.propertyPrice <= 0) {
      newErrors.propertyPrice = "Price must be a positive number";
    }
    if (!formData.propertyState) {
      newErrors.propertyState = "State is mandatory";
    }

    if (formData.propertyPhotos.length === 0) {
      newErrors.propertyPhotos = "Atleast one image is mandatory";
    }
    if ((subcategory === "For Sale: Houses & Apartments" ||
      subcategory === "For Rent: Houses & Apartments" || subcategory === "Lands & Plots") && !formData.propertyType) {
      newErrors.propertyType = "Property type is mandatory";
    }

    if ((subcategory === "For Sale: Houses & Apartments" ||
      subcategory === "For Rent: Houses & Apartments") && !formData.propertyBHK) {
      newErrors.propertyBHK = "No. of BHK is mandatory";
    }

    if ((subcategory === "For Sale: Houses & Apartments" ||
      subcategory === "For Rent: Houses & Apartments") && !formData.propertyBathrooms) {
      newErrors.propertyBathrooms = "No. of bathrooms is mandatory";
    }

    if(subcategory === "For Sale: Houses & Apartments" ||
      subcategory === "For Rent: Houses & Apartments" ||
      subcategory === "For Rent: Shops & Offices" ||
      subcategory === "For Sale: Shops & Offices" || subcategory === "PG & Guest Houses")
      {
    if (!formData.propertyFurnishing) {
      newErrors.propertyFurnishing = "Furnishing is mandatory";
    }
  }
    if ((subcategory === "For Sale: Houses & Apartments" ||
      subcategory === "For Sale: Shops & Offices") && !formData.propertyProjectStatus) {
      newErrors.propertyProjectStatus = "Project Status is mandatory";
    }
    if ((subcategory === "For Sale: Houses & Apartments" ||
      subcategory === "For Rent: Houses & Apartments" ||
      subcategory === "For Rent: Shops & Offices" ||
      subcategory === "For Sale: Shops & Offices" ||
      subcategory === "PG & Guest Houses") && !formData.propertyListedBy) {
      newErrors.propertyListedBy = "Listing is mandatory";
    }
    if(subcategory === "For Sale: Houses & Apartments" ||
      subcategory === "For Rent: Houses & Apartments" ||
      subcategory === "For Rent: Shops & Offices" ||
      subcategory === "For Sale: Shops & Offices")
      {
    if (
      !formData.propertySuperBuiltUpArea ||
      isNaN(formData.propertySuperBuiltUpArea) ||
      formData.propertySuperBuiltUpArea <= 0
    ) {
      newErrors.propertySuperBuiltUpArea =
        "Super Built-Up Area must be a positive number";
    }
  }

  if(subcategory === "For Sale: Houses & Apartments" ||
    subcategory === "For Rent: Houses & Apartments" ||
    subcategory === "For Rent: Shops & Offices" ||
    subcategory === "For Sale: Shops & Offices")
    {
    if (
      !formData.propertyCarpetArea ||
      isNaN(formData.propertyCarpetArea) ||
      formData.propertyCarpetArea <= 0
    ) {
      newErrors.propertyCarpetArea = "Carpet Area must be a positive number";
    } else if (
      formData.propertyCarpetArea > formData.propertySuperBuiltUpArea
    ) {
      newErrors.propertyCarpetArea =
        "Carpet Area should be smaller or same as Super-built up Area";
    }
  }
 if (subcategory === "Lands & Plots"){
  if ( !formData.propertyPlotArea) {
    newErrors.propertyPlotArea = "Plot Area is mandatoryr";
  } else if (
    isNaN(formData.propertyPlotArea) ||
    formData.propertyPlotArea <= 0
  ) {
    newErrors.propertyPlotArea = "Plot Area must be a positive number";
  }
 }
    
 if (subcategory === "Lands & Plots"){
    if (
      isNaN(formData.propertyLength) ||
      formData.propertyLength < 0
    ) {
      newErrors.propertyLength = "Length must be a positive number";
    }
}
if (subcategory === "Lands & Plots"){
    if (
      isNaN(formData.propertyBreadth) ||
      formData.propertyBreadth < 0
    ) {
      newErrors.propertyBreadth = "Breadth must be a positive number";
    }
  }

  if(subcategory === "For Sale: Houses & Apartments" ||
    subcategory === "For Rent: Houses & Apartments" ||
    subcategory === "For Rent: Shops & Offices" ||
    subcategory === "For Sale: Shops & Offices")
    {
    if (
      isNaN(formData.propertyMaintenance) ||
      formData.propertyMaintenance < 0
    ) {
      newErrors.propertyMaintenance = "Maintenance must be positive number";
    }
  }
    if (
      (subcategory === "For Sale: Houses & Apartments" ||
        subcategory === "For Rent: Houses & Apartments") &&
      (isNaN(formData.propertyTotalFloors) ||
      formData.propertyTotalFloors < 0)
    ) {
      newErrors.propertyTotalFloors = "Total floors must be a positive number";
    }
    if ((subcategory === "For Sale: Houses & Apartments" ||
      subcategory === "For Rent: Houses & Apartments") && (isNaN(formData.propertyFloorNo) || formData.propertyFloorNo < 0)) {
      newErrors.propertyFloorNo = "Floor No. must be a zero or positive number";
    } else if (formData.propertyFloorNo > formData.propertyTotalFloors) {
      newErrors.propertyFloorNo =
        "Floor No. should be smaller or same as Total Floors";
    }

    return newErrors;
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
      propertyPhotos: files,
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
      
      uploadData.append("category", formData.category);
      uploadData.append("subcategory", formData.subcategory);
      uploadData.append("propertyType", formData.propertyType);
      uploadData.append("propertyBHK", formData.propertyBHK);
      uploadData.append("propertyBathrooms", formData.propertyBathrooms);
      uploadData.append("propertyFurnishing", formData.propertyFurnishing);
      uploadData.append(
        "propertyProjectStatus",
        formData.propertyProjectStatus
      );
      uploadData.append("propertyListedBy", formData.propertyListedBy);
      uploadData.append(
        "propertySuperBuiltUpArea",
        formData.propertySuperBuiltUpArea
      );
      uploadData.append("propertyCarpetArea", formData.propertyCarpetArea);
      uploadData.append("propertyPlotArea", formData.propertyPlotArea);
      uploadData.append("propertyLength", formData.propertyLength);
      uploadData.append("propertyBreadth", formData.propertyBreadth);
      uploadData.append("propertyMaintenance", formData.propertyMaintenance);
      uploadData.append("propertyTotalFloors", formData.propertyTotalFloors);
      uploadData.append("propertyFloorNo", formData.propertyFloorNo);
      uploadData.append("propertyCarParking", formData.propertyCarParking);
      uploadData.append("propertyFacing", formData.propertyFacing);
      uploadData.append("propertyWashrooms", formData.propertyWashrooms);
      uploadData.append(
        "propertypropertyProjectName",
        formData.propertyProjectName
      );
      uploadData.append(
        "propertyBachelorsAllowed",
        formData.propertyBachelorsAllowed
      );
      uploadData.append("propertySubtype", formData.propertySubtype);
      uploadData.append(
        "propertyMealsIncluded",
        formData.propertyMealsIncluded
      );
      uploadData.append("propertyTitle", formData.propertyTitle);
      uploadData.append("propertyDescription", formData.propertyDescription);
      uploadData.append("propertyPrice", formData.propertyPrice);
      uploadData.append("propertyState", formData.propertyState);
      uploadData.append("username", formData.username);
      uploadData.append("email", formData.email);

      // uploadData.append("propertyPhotos",formData.propertyPhotos);
      // for single photos

      formData.propertyPhotos.forEach((image, index) => {
        uploadData.append(`propertyPhotos[${index}]`, image);
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
          "http://127.0.0.1:8000/olxapi/propertyform/",
          uploadData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("property Data successfully posted:", response.data);
        // Clear the form and errors after successful submission
        setFormData({
          category: "",
          subcategory: "",
          propertyType: "",
          propertyBHK: "",
          propertyBathrooms: "",
          propertyFurnishing: "",
          propertyProjectStatus: "",
          propertySuperBuiltUpArea: "",
          propertyCarpetArea: "",
          propertyPlotArea: "",
          propertyLength: "",
          propertyBreadth: "",
          propertyMaintenance: "",
          propertyTotalFloors: "",
          propertyFloorNo: "",
          propertyFacing: "",
          propertyListedBy: "",
          propertyWashrooms: "",
          propertyProjectName: "",
          propertyBachelorsAllowed: "",
          propertySubtype: "",
          propertyMealsIncluded: "",
          propertyTitle: "",
          propertyDescription: "",
          propertyPrice: "",
          propertyPhotos: [],
          propertyState: "",
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
            category:formData.category,
            subcategory: formData.subcategory,
            propertyType: formData.propertyType,
            propertyBHK: formData.propertyBHK,
            propertyBathrooms: formData.propertyBathrooms,
            propertyFurnishing: formData.propertyFurnishing,
            propertyProjectStatus: formData.propertyProjectStatus,
            propertySuperBuiltUpArea: formData.propertySuperBuiltUpArea,
            propertyCarpetArea: formData.propertyCarpetArea,
            propertyPlotArea: formData.propertyPlotArea,
            propertyLength: formData.propertyLength,
            propertyBreadth: formData.propertyBreadth,
            propertyMaintenance: formData.propertyMaintenance,
            propertyTotalFloors: formData.propertyTotalFloors,
            propertyFloorNo: formData.propertyFloorNo,
            propertyFacing: formData.propertyFacing,
            propertyListedBy: formData.propertyListedBy,
            propertyWashrooms: formData.propertyWashrooms,
            propertyProjectName: formData.propertyProjectName,
            propertyCarParking: formData.propertyCarParking,
            propertyBachelorsAllowed: formData.propertyBachelorsAllowed,
            propertySubtype: formData.propertySubtype,
            propertyMealsIncluded: formData.propertyMealsIncluded,
            propertyTitle: formData.propertyTitle,
            propertyDescription: formData.propertyDescription,
            propertyPrice: formData.propertyPrice,
            propertyState: formData.propertyState,
            propertyPhotos: formData.propertyPhotos,
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

        {subcategory === "For Sale: Houses & Apartments" ||
        subcategory === "For Rent: Houses & Apartments" ? (
          <div className="form-div">
            <Form.Label className="form-input-button form-field d-block">
              Type *
            </Form.Label>
            {hAType.map((type) => (
              <Button
                key={type}
                className={`form-input-button-type ${
                  formData.propertyType === type ? "selected" : ""
                }`}
                onClick={() => {
                  setFormData({ ...formData, propertyType: type });
                  // setSelectedButton(fuelData.name); // Update selected transmission to change the color
                }}
              >
                {type}
              </Button>
            ))}
            {errors.propertyType && (
              <p className="error-message">{errors.propertyType}</p>
            )}
          </div>
        )
        : subcategory === "Lands & Plots" ? (
          <div className="form-div">
            <Form.Label className="form-input-button form-field d-block">
              Type *
            </Form.Label>
            {lPType.map((type) => (
              <Button
                key={type}
                className={`form-input-button-type ${
                  formData.propertyType === type ? "selected" : ""
                }`}
                onClick={() => {
                  setFormData({ ...formData, propertyType: type });
                  // setSelectedButton(fuelData.name); // Update selected transmission to change the color
                }}
              >
                {type}
              </Button>
            ))}
            {errors.propertyType && (
              <p className="error-message">{errors.propertyType}</p>
            )}
          </div>
        ) 
         : (
          <null></null>
        )}

        {subcategory === "PG & Guest Houses" ? (
          <div className="form-div">
            <Form.Label className="form-input-button form-field d-block">
              Subtype
            </Form.Label>
            {pgSubtype.map((type) => (
              <Button
                key={type}
                className={`form-input-button-type ${
                  formData.propertySubtype === type ? "selected" : ""
                }`}
                onClick={() => {
                  setFormData({ ...formData, propertySubtype: type });
                  // setSelectedButton(fuelData.name); // Update selected transmission to change the color
                }}
              >
                {type}
              </Button>
            ))}
          </div>
        ) : (
          <null></null>
        )}

        {subcategory === "For Sale: Houses & Apartments" ||
        subcategory === "For Rent: Houses & Apartments" ? (
          <div className="form-div">
            <Form.Label className="form-input-button form-field d-block">
              BHK *
            </Form.Label>
            {bhk.map((val, ind) => (
              <Button
                key={ind + 1}
                className={`form-input-button-type ${
                  formData.propertyBHK === val ? "selected" : ""
                }`}
                onClick={() => {
                  setFormData({ ...formData, propertyBHK: val });
                  // setSelectedButton(fuelData.name); // Update selected transmission to change the color
                }}
              >
                {val}
              </Button>
            ))}
            {errors.propertyBHK && (
              <p className="error-message">{errors.propertyBHK}</p>
            )}
          </div>
        ) : (
          <null></null>
        )}

        {subcategory === "For Sale: Houses & Apartments" ||
        subcategory === "For Rent: Houses & Apartments" ? (
          <div className="form-div">
            <Form.Label className="form-input-button form-field d-block">
              Bathrooms *
            </Form.Label>
            {bathrooms.map((val, ind) => (
              <Button
                key={ind + 1}
                className={`form-input-button-type ${
                  formData.propertyBathrooms === val ? "selected" : ""
                }`}
                onClick={() => {
                  setFormData({ ...formData, propertyBathrooms: val });
                  // setSelectedButton(fuelData.name); // Update selected transmission to change the color
                }}
              >
                {val}
              </Button>
            ))}
            {errors.propertyBathrooms && (
              <p className="error-message">{errors.propertyBathrooms}</p>
            )}
          </div>
        ) : (
          <null></null>
        )}

        {subcategory === "For Sale: Houses & Apartments" ||
        subcategory === "For Rent: Houses & Apartments" ||
        subcategory === "For Rent: Shops & Offices" ||
        subcategory === "For Sale: Shops & Offices" ||
        subcategory === "PG & Guest Houses" ? (
          <div className="form-div">
            <Form.Label className="form-input-button form-field d-block">
              Furnishing *
            </Form.Label>
            {furnishing.map((val, ind) => (
              <Button
                key={ind + 1}
                className={`form-input-button-type ${
                  formData.propertyFurnishing === val ? "selected" : ""
                }`}
                onClick={() => {
                  setFormData({ ...formData, propertyFurnishing: val });
                  // setSelectedButton(fuelData.name); // Update selected transmission to change the color
                }}
              >
                {val}
              </Button>
            ))}
            {errors.propertyFurnishing && (
              <p className="error-message">{errors.propertyFurnishing}</p>
            )}
          </div>
        ) : (
          <null></null>
        )}

        {subcategory === "For Sale: Houses & Apartments" ||
        subcategory === "For Sale: Shops & Offices" ? (
          <div className="form-div">
            <Form.Label className="form-input-button form-field d-block">
              Project Status *
            </Form.Label>
            {projectStatus.map((val, ind) => (
              <Button
                key={ind + 1}
                className={`form-input-button-type ${
                  formData.propertyProjectStatus === val ? "selected" : ""
                }`}
                onClick={() => {
                  setFormData({ ...formData, propertyProjectStatus: val });
                  // setSelectedButton(fuelData.name); // Update selected transmission to change the color
                }}
              >
                {val}
              </Button>
            ))}
            {errors.propertyProjectStatus && (
              <p className="error-message">{errors.propertyProjectStatus}</p>
            )}
          </div>
        ) : (
          <null></null>
        )}

        
          <div className="form-div">
            <Form.Label className="form-input-button form-field d-block">
              Listed By *
            </Form.Label>
            {listedBy.map((val, ind) => (
              <Button
                key={ind + 1}
                className={`form-input-button-type ${
                  formData.propertyListedBy === val ? "selected" : ""
                }`}
                onClick={() => {
                  setFormData({ ...formData, propertyListedBy: val });
                  // setSelectedButton(fuelData.name); // Update selected transmission to change the color
                }}
              >
                {val}
              </Button>
            ))}
            {errors.propertyListedBy && (
              <p className="error-message">{errors.propertyListedBy}</p>
            )}
          </div>
        

        {subcategory === "For Sale: Houses & Apartments" ||
        subcategory === "For Rent: Houses & Apartments" ||
        subcategory === "For Rent: Shops & Offices" ||
        subcategory === "For Sale: Shops & Offices" ? (
          <div className="form-div">
            <Form.Label>Super Builtup area sqft *</Form.Label>
            <Form.Control
              className="form-field"
              type="text"
              name="propertySuperBuiltUpArea"
              placeholder="Enter super Built up Area"
              value={formData.propertySuperBuiltUpArea}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  propertySuperBuiltUpArea: e.target.value,
                })
              }
            />

            {errors.propertySuperBuiltUpArea && (
              <p className="error-message">{errors.propertySuperBuiltUpArea}</p>
            )}
          </div>
        ) : (
          <null></null>
        )}

        {subcategory === "For Sale: Houses & Apartments" ||
        subcategory === "For Rent: Houses & Apartments" ||
        subcategory === "For Rent: Shops & Offices" ||
        subcategory === "For Sale: Shops & Offices" ? (
          <div className="form-div">
            <Form.Label>Carpet Area sqft *</Form.Label>
            <Form.Control
              className="form-field"
              type="text"
              name="propertyCarpetArea"
              placeholder="Enter Carpet Area"
              value={formData.propertyCarpetArea}
              onChange={(e) =>
                setFormData({ ...formData, propertyCarpetArea: e.target.value })
              }
            />

            {errors.propertyCarpetArea && (
              <p className="error-message">{errors.propertyCarpetArea}</p>
            )}
          </div>
        ) : (
          <null></null>
        )}

        {subcategory === "For Rent: Houses & Apartments" ? (
          <div className="form-div">
            <Form.Label className="form-input-button form-field d-block">
              Bachelors Allowed *
            </Form.Label>
            {bachelors.map((val, ind) => (
              <Button
                key={ind + 1}
                className={`form-input-button-type ${
                  formData.propertyBachelorsAllowed === val ? "selected" : ""
                }`}
                onClick={() => {
                  setFormData({ ...formData, propertyBachelorsAllowed: val });
                  // setSelectedButton(fuelData.name); // Update selected transmission to change the color
                }}
              >
                {val}
              </Button>
            ))}
          </div>
        ) : (
          <null></null>
        )}

        {subcategory === "For Sale: Houses & Apartments" ||
        subcategory === "For Rent: Houses & Apartments" ||
        subcategory === "For Rent: Shops & Offices" ||
        subcategory === "For Sale: Shops & Offices" ? (
          <div className="form-div">
            <Form.Label>Maintenance (Monthly) </Form.Label>
            <Form.Control
              className="form-field"
              type="text"
              name="propertyMaintenance"
              placeholder="Enter property maintenancee"
              value={formData.propertyMaintenance}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  propertyMaintenance: e.target.value,
                })
              }
            />
            {errors.propertyMaintenance && (
              <p className="error-message">{errors.propertyMaintenance}</p>
            )}
          </div>
        ) : (
          <null></null>
        )}

        {subcategory === "For Sale: Houses & Apartments" ||
        subcategory === "For Rent: Houses & Apartments" ? (
          <div className="form-div">
            <Form.Label>Total Floors </Form.Label>
            <Form.Control
              className="form-field"
              type="text"
              name="propertyTotalFloors"
              placeholder="Enter the total floors"
              value={formData.propertyTotalFloors}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  propertyTotalFloors: e.target.value,
                })
              }
            />
            {errors.propertyTotalFloors && (
              <p className="error-message">{errors.propertyTotalFloors}</p>
            )}
          </div>
        ) : (
          <null></null>
        )}

        {subcategory === "For Sale: Houses & Apartments" ||
        subcategory === "For Rent: Houses & Apartments" ? (
          <div className="form-div">
            <Form.Label>Floor No</Form.Label>
            <Form.Control
              className="form-field"
              type="text"
              name="propertyFloorNo"
              placeholder="Enter Floor no."
              value={formData.propertyFloorNo}
              onChange={(e) =>
                setFormData({ ...formData, propertyFloorNo: e.target.value })
              }
            />
            {errors.propertyFloorNo && (
              <p className="error-message">{errors.propertyFloorNo}</p>
            )}
          </div>
        ) : (
          <null></null>
        )}

        {subcategory === "For Sale: Houses & Apartments" ||
        subcategory === "For Rent: Houses & Apartments" ||
        subcategory === "For Rent: Shops & Offices" ||
        subcategory === "For Sale: Shops & Offices" ||
        subcategory === "PG & Guest Houses" ? (
          <div className="form-div">
            <Form.Label className="form-input-button form-field d-block">
              Car Parking
            </Form.Label>
            {carParking.map((val, ind) => (
              <Button
                key={ind + 1}
                className={`form-input-button-type ${
                  formData.propertyCarParking === val ? "selected" : ""
                }`}
                onClick={() => {
                  setFormData({ ...formData, propertyCarParking: val });
                  // setSelectedButton(fuelData.name); // Update selected transmission to change the color
                }}
              >
                {val}
              </Button>
            ))}
          </div>
        ) : (
          <null></null>
        )}

{subcategory === "Lands & Plots"  ? (
      <div className="form-div">
        <Form.Label>Plot Area *</Form.Label>
        <Form.Control
          className="form-field"
          type="text"
          name="propertyPlotArea"
          placeholder="Enter Plot Area"
          value={formData.propertyPlotArea}
          onChange={(e) =>
            setFormData({
              ...formData,
              propertyPlotArea: e.target.value,
            })
          }
        />

        {errors.propertyPlotArea && (
          <p className="error-message">{errors.propertyPlotArea}</p>
        )}
      </div>
    ) : (
      <null></null>
    )}

{subcategory === "Lands & Plots"  ? (
      <div className="form-div">
        <Form.Label>Length </Form.Label>
        <Form.Control
          className="form-field"
          type="text"
          name="propertyLength"
          placeholder="Enter Length"
          value={formData.propertyLength}
          onChange={(e) =>
            setFormData({
              ...formData,
              propertyLength: e.target.value,
            })
          }
        />

        {errors.propertyLength && (
          <p className="error-message">{errors.propertyLength}</p>
        )}
      </div>
    ) : (
      <null></null>
    )}

{subcategory === "Lands & Plots"  ? (
      <div className="form-div">
        <Form.Label>Breadth </Form.Label>
        <Form.Control
          className="form-field"
          type="text"
          name="propertyBreadth"
          placeholder="Enter Breadth"
          value={formData.propertyBreadth}
          onChange={(e) =>
            setFormData({
              ...formData,
              propertyBreadth: e.target.value,
            })
          }
        />

        {errors.propertyBreadth && (
          <p className="error-message">{errors.propertyBreadth}</p>
        )}
      </div>
    ) : (
      <null></null>
    )}
        {subcategory === "For Sale: Houses & Apartments" || subcategory === "For Rent: Houses & Apartments" 
        || subcategory === "Lands & Plots"? (
          <div className="form-div">
            <Form.Label className="form-input-button form-field d-block">
              Facing
            </Form.Label>
            <Form.Control
              as="select"
              className="form-field"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  propertyFacing: e.target.value,
                })
              }
            >
              <option value="" />
              {facing.map((val, ind) => (
                <option value={val} key={ind + 1} label={val} />
              ))}
            </Form.Control>
          </div>
        ) : (
          <null></null>
        )}

        {subcategory === "For Rent: Shops & Offices" ||
        subcategory === "For Sale: Shops & Offices" ? (
          <div className="form-div">
            <Form.Label>Washrooms</Form.Label>
            <Form.Control
              className="form-field"
              type="text"
              name="propertyWashrooms"
              value={formData.propertyWashrooms}
              onChange={(e) =>
                setFormData({ ...formData, propertyWashrooms: e.target.value })
              }
            />
          </div>
        ) : (
          <null></null>
        )}

        {subcategory === "PG & Guest Houses" ? (
          <div className="form-div">
            <Form.Label className="form-input-button form-field d-block">
              Meals Included
            </Form.Label>
            {meals.map((val, ind) => (
              <Button
                key={ind + 1}
                className={`form-input-button-type ${
                  formData.propertyMealsIncluded === val ? "selected" : ""
                }`}
                onClick={() => {
                  setFormData({ ...formData, propertyMealsIncluded: val });
                  // setSelectedButton(fuelData.name); // Update selected transmission to change the color
                }}
              >
                {val}
              </Button>
            ))}
          </div>
        ) : (
          <null></null>
        )}

        {subcategory === "For Sale: Houses & Apartments" ||
        subcategory === "For Rent: Houses & Apartments" ||
        subcategory === "For Rent: Shops & Offices" ||
        subcategory === "For Sale: Shops & Offices" ||
        subcategory === "Lands & Plots"? (
          <div className="form-div">
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              className="form-field"
              type="text"
              name="propertyProjectName"
              placeholder="Enter project name"
              value={formData.propertyProjectName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  propertyProjectName: e.target.value,
                })
              }
            />
          </div>
        ) : (
          <null></null>
        )}

        <div className="form-div">
          <Form.Label>Ad title *</Form.Label>
          <Form.Control
            className="form-field"
            type="text"
            name="propertyTitle"
            placeholder="Enter ad title"
            value={formData.propertyTitle}
            onChange={(e) =>
              setFormData({ ...formData, propertyTitle: e.target.value })
            }
          />
          <span className="form-description">
            Mention the key features of your item (e.g. brand, model, age, type)
          </span>
          {errors.propertyTitle && (
            <p className="error-message">{errors.propertyTitle}</p>
          )}
        </div>

        <div className="form-div">
          <Form.Label>Description *</Form.Label>
          <Form.Control
            className="form-field"
            as="textarea"
            rows={4}
            name="propertyDescription"
            placeholder="Enter description"
            value={formData.propertyDescription}
            onChange={(e) =>
              setFormData({ ...formData, propertyDescription: e.target.value })
            }
          />
          <span className="form-description">
            Include condition, features and reason for selling
          </span>
          {errors.propertyDescription && (
            <p className="error-message">{errors.propertyDescription}</p>
          )}
        </div>
        <hr></hr>
        <div className="form-div">
          <h1>SET A PRICE</h1>
          <Form.Label className="form-input-button d-block">Price *</Form.Label>
          <Form.Control
            className="form-field"
            type="number"
            name="propertyPrice"
            placeholder="Enter price"
            value={formData.propertyPrice}
            onChange={(e) =>
              setFormData({ ...formData, propertyPrice: e.target.value })
            }
            style={{
              backgroundImage: "url(/images/rupee-indian.png)", // Path relative to the public folder in React
              backgroundPosition: "10px center",
              backgroundRepeat: "no-repeat",
              paddingLeft: "30px", // Adjust padding to make space for the symbol
            }}
          />
          {errors.propertyPrice && (
            <p className="error-message">{errors.propertyPrice}</p>
          )}
        </div>
        <hr />
        <div className="form-div">
          <h4>UPLOAD UP TO 20 PHOTOS {`${100 / selectedFiles.length}px`}</h4>
          <Form.Group controlId="formpropertyPhotos">
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
              name="propertyPhotos"
              onChange={handleFileChange}
            />
          </Form.Group>
          {errors.propertyPhotos && (
            <p className="error-message">{errors.propertyPhotos}</p>
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
              setFormData({ ...formData, propertyState: e.target.value })
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
        {errors.propertyState && (
          <p className="error-message">{errors.propertyState}</p>
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

export default Properties;
