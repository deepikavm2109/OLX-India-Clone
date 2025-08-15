// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Button, Form } from "react-bootstrap";
// // import "../../style/Forms.css"
// import { useNavigate } from "react-router-dom";
// import { FaCamera } from "react-icons/fa";

// const Car1 = () => {
//   const initialValues = {
//     brandId: "",
//     brand: "",
//     modelId: "",
//     model: "",
//     year: "",
//     fuel: "",
//     transmission: "",
//     owner: "",
//     title: "",
//     description: "",
//     price: "",
//     photos:[],
//     selectedstate:"",
//   };
//   const [brandTitle, setBrandTitle] = useState([]);
//   const [brandSubtitle, setBrandSubtitle] = useState({});
//   const [selectedSubtitle, setSelectedSubtitle] = useState("");
//   const [brand, setBrand] = useState([]);
//   const [carFuelType, setCarFuelType] = useState([]);
//   const [carTransmissionType, setCarTransmissionType] = useState([]);
//   const [carOwnerType, setCarOwnerType] = useState([]);

//   const [formData, setFormData] = useState(initialValues);
//   const [errors, setErrors] = useState({});
//   const [isSubmit, setIsSubmit] = useState(false);
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [previewUrls, setPreviewUrls] = useState([]);
//   const [states, setStates]=useState([])
//   const navigate = useNavigate();

//   const fetchCarData = async () => {
//     try {
//       const fuelResponse = await axios.get("/olxapi/carfuel/");
//       const transmissionResponse = await axios.get("/olxapi/cartransmission/");
//       const ownerResponse = await axios.get("/olxapi/carowners/");

//       setCarFuelType(fuelResponse.data);
//       setCarTransmissionType(transmissionResponse.data);
//       setCarOwnerType(ownerResponse.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const fetchBrandsAndSubtitles = async () => {
//       try {
//         const titleResponse = await axios.get("/olxapi/carbrandtitle/");
//         setBrandTitle(titleResponse.data);

//         const subtitle = {};

//         for (const brand of titleResponse.data) {
//           // console.log(brand)

//           const subtitleResponse = await axios.get(
//             `/olxapi/carbrandsubtitle/?brand_title_id=${brand.id}`
//           );
//         // for (const brand of titleResponse.data) {
//         //   const subtitleResponse = await axios.get("/olxapi/brandsubtitle/", {
//         //     params: { brandTitle_id: brand.id },
//         //   });
//           subtitle[brand.id] = subtitleResponse.data;
//         }
//         setBrandSubtitle(subtitle);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchBrandsAndSubtitles();
//   }, []);

//   useEffect(() => {
//     fetchCarData();
//   }, []);

//   useEffect(() => {
//     const fetchStates = async () => {
//       try {
//         const response = await axios.get(
//           "/olxapi/statelist/"
//         );
//         setStates(response.data);
//       } catch (error) {
//         console.error("Error fetching states:", error);
//       }
//     };
//     fetchStates();
//   }, []);

//   const handleStateChange = (event) => {
//     const brandSubtitleId = event.target.value;
//     console.log("--",brandSubtitleId)
//     setSelectedSubtitle(brandSubtitleId);
//     console.log(brandTitle)
//     console.log(brandSubtitle)

//     const selectedBrand = brandTitle.find((brand) =>
//       brandSubtitle[brand.id]?.some(
//         (subtitle) => subtitle.id === parseInt(brandSubtitleId)
//       )
//     );
//     console.log(selectedBrand)

//     const selectedSubtitleName = brandSubtitle[selectedBrand?.id]?.find(
//       (subtitle) => subtitle.id === parseInt(brandSubtitleId)
//     )?.name;

//     console.log(selectedSubtitleName)

//     setFormData({
//       ...formData,
//       brandId: selectedBrand?.id || "",
//       brand: selectedSubtitleName || "",
//       modelId: "",
//       model: "",
//       photos:""
//     });

//     axios
//       .get(`/olxapi/carbrandmodels/?brand_subtitle_id=${brandSubtitleId}`)
//       .then((response) => {
//         setBrand(response.data);
//       })
//       .catch((error) => {
//         console.error("There was an error fetching the model!", error);
//       });
//   };

//   const handleModelChange = (event) => {
//     const modelId = event.target.value;
//     const selectedModel = brand.find((model) => model.id === parseInt(modelId));

//     setFormData({
//       ...formData,
//       modelId: modelId,
//       model: selectedModel?.name || "",
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors(validate(formData));
//     setIsSubmit(true);

//     if (Object.keys(errors).length === 0) {
//         try {
//             const response = await axios.post(`http://127.0.0.1:8000/olxapi/complete-car-form/`, formData, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//             console.log("Form submitted successfully:", response.data);

//         } catch (error) {
//             console.error("There was an error submitting the form:", error);
//         }
//     }
// };

//   const validate = (values) => {
//     const errors = {};

//     if (!values.brand) {
//       errors.brand = "Brand is required";
//     }

//     if (!values.model) {
//       errors.model = "Model is required";
//     }

//     if (!values.year) {
//       errors.year = "Year is required";
//     } else if (!/^\d{4}$/.test(values.year)) {
//       errors.year = "Year must be a 4-digit number";
//     } else if (values.year < 1980) {
//       errors.year = "Model is too old to be accepted";
//     } else if (values.year > new Date().getFullYear()) {
//       errors.year = "Year has not yet occurred";
//     }

//     if (!values.fuel) {
//       errors.fuel = "Fuel type is required";
//     }

//     if (!values.transmission) {
//       errors.transmission = "Transmission type is required";
//     }

//     if (!values.owner) {
//       errors.owner = "Owner type is required";
//     }

//     if (!values.title) {
//       errors.title = "Ad title is required";
//     }

//     if (!values.description) {
//       errors.description = "Description is required";
//     }

//     if (!values.price) {
//       errors.price = "Price is required";
//     } else if (isNaN(values.price) || values.price <= 0) {
//       errors.price = "Price must be a positive number";
//     }

//     if (selectedFiles.length === 0) {
//       errors.photos = "At least one photo is required";
//     }

//     return errors;
//   };

//   useEffect(() => {
//     if (Object.keys(errors).length === 0 && isSubmit) {
//       console.log("Form submitted successfully with values:", formData);
//       // navigate("/practice1/");
//       // Proceed with form submission, e.g., send data to the server
//     }
//   }, [errors]);

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);

//     if (files.length > 20) {
//       setErrors({ photos: "You can upload a maximum of 20 photos." });
//       return;
//     }

//     setSelectedFiles(files);
//     const urls = files.map((file) => URL.createObjectURL(file));
//     setPreviewUrls(urls);
//     setErrors((prevErrors) => ({ ...prevErrors, photos: "" })); // Clear photo errors if any

//     // Convert files to JSON string URLs for form submission
//     const fileUrls = files.map((file) => URL.createObjectURL(file));
//     setFormData((prevformData) => ({
//       ...prevformData,
//       photos: JSON.stringify(fileUrls),
//     }));
//   };

//   return (
//     <>
// <pre>
//   {JSON.stringify(
//     {
//       brand: formData.brand,
//       model: formData.model,
//       year: formData.year,
//       fuel: formData.fuel,
//       transmission: formData.transmission,
//       owner: formData.owner,
//       title: formData.title,
//       description: formData.description,
//       price: formData.price,
//       photos:formData.photos,

//     },
//     undefined,
//     2
//   )}
// </pre>
//       <Form style={{ margin: "50px" }} onSubmit={handleSubmit}>
//         {/* Brand */}
//         <Form.Label style={{ margin: "20px" }}>Brand:</Form.Label>
//         <Form.Control
//           as="select"
//           style={{ width: "250px", margin: "0 20px 20px 20px" }}
//           onChange={handleStateChange}
//         >
//           <option value="">---Select Brand---</option>
//           {brandTitle.map((brandtitle) => (
//             <optgroup key={brandtitle.id} label={brandtitle.name}>
//               {brandSubtitle[brandtitle.id]?.map((brandsubtitle) => (
//                 <option key={brandsubtitle.id} value={brandsubtitle.id}>
//                   {brandsubtitle.name}
//                 </option>
//               ))}
//             </optgroup>
//           ))}
//         </Form.Control>
//         {errors.brand && <p className="error-message">{errors.brand}</p>}

//         {/* Model */}
//         {selectedSubtitle && (
//           <div>
//             <Form.Label style={{ margin: "20px" }}>Model:</Form.Label>
//             <Form.Control
//               as="select"
//               style={{ width: "250px", margin: "0 20px 20px 20px" }}
//               onChange={handleModelChange}
//               value={formData.modelId}
//             >
//               <option value="">---Select Model---</option>
//               {brand.map((modelbrand) => (
//                 <option key={modelbrand.id} value={modelbrand.id}>
//                   {modelbrand.name}
//                 </option>
//               ))}
//             </Form.Control>
//             {errors.model && <p className="error-message">{errors.model}</p>}
//           </div>
//         )}

//         {/* Year */}
//         <Form.Group controlId="formCaryear">
//           <Form.Label>Year</Form.Label>
//           <Form.Control
//             className="form-input-group-car"
//             type="text"
//             name="year"
//             placeholder="Enter year of manufacture"
//             value={formData.year}
//             onChange={(e) =>
//               setFormData({ ...formData, year: e.target.value })
//             }
//           />
//           {errors.year && <p className="error-message">{errors.year}</p>}
//         </Form.Group>

//         {/* Fuel */}
//         <Form.Group controlId="formCarFuel">
//           <Form.Label className="form-input-button">Fuel *</Form.Label>
//           {carFuelType.map((fuel) => (
//             <Button
//               className={`form-input-button-type`}
//               key={fuel.id}
//               onClick={() => setFormData({ ...formData, fuel: fuel.name })}
//             >
//               {fuel.name}
//             </Button>
//           ))}
//           {errors.fuel && <p className="error-message">{errors.fuel}</p>}
//         </Form.Group>

//         {/* Transmission */}
//         <Form.Group controlId="formCarTransmission">
//           <Form.Label className="form-input-button">Transmission *</Form.Label>
//           {carTransmissionType.map((transmission) => (
//             <Button
//               className={`form-input-button-type`}
//               key={transmission.id}
//               onClick={() =>
//                 setFormData({
//                   ...formData,
//                   transmission: transmission.name,
//                 })
//               }
//             >
//               {transmission.name}
//             </Button>
//           ))}
//           {errors.transmission && (
//             <p className="error-message">{errors.transmission}</p>
//           )}
//         </Form.Group>

//         {/* Owner */}
//         <Form.Group controlId="formCarOwner">
//           <Form.Label className="form-input-button">Owner *</Form.Label>
//           {carOwnerType.map((owner) => (
//             <Button
//               className={`form-input-button-type`}
//               key={owner.id}
//               onClick={() =>
//                 setFormData({ ...formData, owner: owner.name })
//               }
//             >
//               {owner.name}
//             </Button>
//           ))}
//           {errors.owner && <p className="error-message">{errors.owner}</p>}
//         </Form.Group>

//         {/* Title */}
//         <Form.Group controlId="formCarTitle">
//           <Form.Label>Title</Form.Label>
//           <Form.Control
//             type="text"
//             name="title"
//             placeholder="Enter ad title"
//             value={formData.title}
//             onChange={(e) =>
//               setFormData({ ...formData, title: e.target.value })
//             }
//           />
//           <small>Mention the key features of your item (e.g. brand, model, age, type)</small>
//           {errors.title && <p className="error-message">{errors.title}</p>}
//         </Form.Group>

//         {/* Description */}
//         <Form.Group controlId="formCarDescription">
//           <Form.Label>Description</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             name="description"
//             placeholder="Enter description"
//             value={formData.description}
//             onChange={(e) =>
//               setFormData({ ...formData, description: e.target.value })
//             }
//           />
//           <small>Include condition, features and reason for selling</small>
//           {errors.description && (
//             <p className="error-message">{errors.description}</p>
//           )}
//         </Form.Group>

//         {/* Price */}
//         <Form.Group controlId="formCarPrice">
//           <Form.Label>Price</Form.Label>
//           <Form.Control
//             type="text"
//             name="price"
//             placeholder="Enter price"
//             value={formData.price}
//             onChange={(e) =>
//               setFormData({ ...formData, price: e.target.value })
//             }
//           />
//           {errors.price && <p className="error-message">{errors.price}</p>}
//         </Form.Group>

//         <hr />

// {/* Upload Photos */}
// <h1>{selectedFiles.length}</h1>
// <h1>Upload Photos</h1>
// <Form.Group controlId="formCarPhotos">
//   <Form.Label style={{ border: "1px solid", width: "150px", height: "150px", display: "block", textAlign: "center", lineHeight: "150px" }}>
//     {previewUrls.map((url, index) => (

//       <img
//         key={index}
//         src={url}
//         alt={`Preview ${index + 1}`}
//         className="photo-thumbnail1"
//         width={`${120 / selectedFiles.length}px`}
//         height={`${120 / selectedFiles.length}px`}
//         style={{ margin: "5px" }}
//       />

//     ))}

//    {previewUrls.length === 0 && (
// <FaCamera style={{ width: "50px", height: "50px", display: "flex", margin: "50px" }} />
// )}
//   </Form.Label>
//   <Form.Control
//     type="file"
//     multiple
//     accept="image/*"
//     onChange={handleFileChange}
//     isInvalid={!!errors.photos}
//     className="d-none"
//   />
//   <Form.Control.Feedback type="invalid">
//     {errors.photos}
//   </Form.Control.Feedback>

// <div>
//   <h1>Confirm your Loctation</h1>
//   <div>
//     <label>State:</label>
//     <select
//           value={formData.selectedstate}
//           name="selectedstate"

//         >
//             <option value="">--Select States--</option>
//           {/* Mapping through the 'states' array */}
//           {states.map((stateObj) => (
//             <option key={stateObj.id} value={stateObj.id}>
//               {stateObj.state_name}
//             </option>
//           ))}
//         </select>

//   </div>
//   </div>

// </Form.Group>

//         <Button type="submit">Submit</Button>
//       </Form>
//     </>
//   );
// };

// export default Car1;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "../style/Forms.css";
import olximg from "../../images/avatar_2.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import { TbCameraPlus } from "react-icons/tb";

const Car1 = () => {
  const [formData, setFormData] = useState({
    category:"",
    subcategory:"",
    carBrandId: "",
    carBrand: "",
    carModelId: "",
    carModel: "",
    carYear: "",
    carFuel: "",
    carTransmission: "",
    carKM: "",
    carOwners: "",
    carTitle: "",
    carDescription: "",
    carPrice: "",
    carPhotos: [],
    carState: "",
    username: "",
    email: "",
  });

  const [brandTitle, setBrandTitle] = useState([]);
  const [brandSubtitle, setBrandSubtitle] = useState([]);
  const [selectedSubtitle, setSelectedSubtitle] = useState("");
  const [model, setModel] = useState([]);
  const [fuel, setFuel] = useState([]);
  const [transmission, setTransmission] = useState([]);
  const [owner, setOwner] = useState([]);
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
  const category = params.get("category");

  const subcategory = params.get("subcategory");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.carBrand) {
      newErrors.carBrand = "Brand is mandatory";
    }
    if (!formData.carModel) {
      newErrors.carModel = "Model is mandatory";
    }

    if (!formData.carYear) {
      newErrors.carYear = "Year is mandatory";
    } else if (!/^\d{4}$/.test(formData.carYear)) {
      newErrors.carYear = "Year must be a 4-digit number";
    } else if (formData.carYear < 1980) {
      newErrors.carYear = "Model is too old to be accepted";
    } else if (formData.carYear > new Date().getFullYear()) {
      newErrors.carYear = "Year has not yet occurred";
    }
    if (!formData.carFuel) {
      newErrors.carFuel = "Fuel is mandatory";
    }
    if (!formData.carTransmission) {
      newErrors.carTransmission = "Transmission is mandatory";
    }

    if (!formData.carKM) {
      newErrors.carKM = "KM is mandatory";
    }
    if (!formData.carOwners) {
      newErrors.carOwners = "Number of Car owners is mandatory";
    }

    if (!formData.carTitle) {
      newErrors.carTitle = "Ad Title is mandatory";
    }
    if (!formData.carDescription) {
      newErrors.carDescription = "Description is mandatory";
    }

    if (!formData.carPrice) {
      newErrors.carPrice = "Price is mandatory";
    } else if (isNaN(formData.carPrice) || formData.carPrice <= 0) {
      newErrors.carPrice = "Price must be a positive number";
    }
    if (!formData.carState) {
      newErrors.carState = "State is mandatory";
    }

    if (formData.carPhotos.length === 0) {
      newErrors.carPhotos = "Atleast one image is mandatory";
    }

    // if (!formData.profileUsername) {
    //   newErrors.carPhotos = "Username is mandatory";
    // }

    // if (!formData.profileEmailId) {
    //   newErrors.carPhotos = "Email id is mandatory";
    // }
    return newErrors;
  };

  // const handleChange=(e)=>{
  //   console.log(e.target.value)
  //   console.log(e.target.name)
  // }

  const fetchBrandTitle = async () => {
    try {
      const titleResponse = await axios.get(`/olxapi/carbrandtitle/`);
      console.log(titleResponse.data);
      setBrandTitle(titleResponse.data);
      const subtitle = {};
      console.log(subtitle);
      for (const brand of titleResponse.data) {
        console.log(brand);
        const subTitleResponse = await axios.get(
          `/olxapi/carbrandsubtitle/?brand_title_id=${brand.id}`
        );
        console.log("---", subTitleResponse.data);

        subtitle[brand.id] = subTitleResponse.data;
      }
      console.log("-", subtitle);
      setBrandSubtitle(subtitle);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBrandTitle();
  }, []);

  const handleStateChange = (event) => {
    const modelId = event.target.value;
    setSelectedSubtitle(modelId);
    const selectedBrand = brandTitle.find((brand) =>
      brandSubtitle[brand.id]?.some(
        (subtitle) => subtitle.id === parseInt(modelId)
      )
    );

    const selectedSubtitleName = brandSubtitle[selectedBrand?.id]?.find(
      (subtitle) => subtitle.id === parseInt(modelId)
    )?.name;

    console.log("subtitleName", selectedSubtitleName);

    axios
      .get(`/olxapi/carbrandmodels/?brand_subtitle_id=${modelId}`)
      .then((response) => {
        console.log(response.data);
        setModel(response.data);
        setFormData({
          ...formData,
          carBrandId: selectedBrand?.id || "",
          carBrand: selectedSubtitleName || "",
          // carYear: "",
          // carTransmission: "",
          // carModelId: "",
          // carModel: "",
        });
        console.log(formData);
      })
      .catch((error) => {
        console.error("There was an error fetching the model!", error);
      });

    console.log("value ", event.target.value);
    console.log("name ", event.target.name);
  };

  const handleModelChange = (event) => {
    // console.log(event.target.value)
    const modelId = event.target.value;
    const selectedModel = model.find((model) => model.id === parseInt(modelId));
    setFormData({
      ...formData,
      carModelId: modelId,
      carModel: selectedModel?.name || "",
    });
  };

  const CarButtonResponse = async () => {
    try {
      const fetchFuelResponse = await axios.get(`/olxapi/carfuel/`);
      const fetchTransmissionResponse = await axios.get(
        `/olxapi/cartransmission/`
      );
      const fetchOwnerResponse = await axios.get(`/olxapi/carowners/`);
      console.log("carfuelbutton", fetchFuelResponse.data);
      setFuel(fetchFuelResponse.data);
      setTransmission(fetchTransmissionResponse.data);
      setOwner(fetchOwnerResponse.data);
    } catch (error) {
      console.log(error);
    }
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
    CarButtonResponse();
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
    //   carPhotos: JSON.stringify(urls),
    // });

    setFormData({
      ...formData,
      // profile_image: e.target.files[0], #single
      carPhotos: files,
    });
  };

  // user detail image (olxuser)
  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     // Create a URL for the uploaded image
  //     const newImageUrl = URL.createObjectURL(file);
  //     // Update state to reflect the uploaded image
  //     setSelectedImage(newImageUrl);
  //     console.log("userIMAGE",newImageUrl)
  //   }
  // };

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

  


  const handleSubmit = async(e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      const uploadData = new FormData();
      uploadData.append("category", formData.category);
      uploadData.append("subcategory", formData.subcategory);
      uploadData.append("carBrand", formData.carBrand);
      uploadData.append("carModel", formData.carModel);
      uploadData.append("carYear", formData.carYear);
      uploadData.append("carFuel", formData.carFuel);
      uploadData.append("carTransmission", formData.carTransmission);
      uploadData.append("carKM", formData.carKM);
      uploadData.append("carOwners", formData.carOwners);
      uploadData.append("carTitle", formData.carTitle);
      uploadData.append("carDescription", formData.carDescription);
      uploadData.append("carPrice", formData.carPrice);
      uploadData.append("carState", formData.carState);
      uploadData.append("username", formData.username);
      uploadData.append("email", formData.email);
      // uploadData.append("carPhotos",formData.carPhotos);
      // for single photos

      formData.carPhotos.forEach((image, index) => {
        uploadData.append(`carPhotos[${index}]`, image);
      });
      // uploadData.append("profileImage", formData.profileImage);
      // uploadData.append("profileUsername", formData.profileUsername);
      // uploadData.append("profileEmailId",formData.profileEmailId)

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
          "http://127.0.0.1:8000/olxapi/carform/",
          uploadData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        console.log("Car Data successfully posted:", response.data);
        // Clear the form and errors after successful submission
        setFormData({
          category: "",
          subcategory: "",
          carBrandId: "",
          carBrand: "",
          carModelId: "",
          carModel: "",
          carYear: "",
          carFuel: "",
          carTransmission: "",
          carKM: "",
          carOwners: "",
          carTitle: "",
          carDescription: "",
          carPrice: "",
          carPhotos: [],
          carState: "",
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
            carBrand: formData.carBrand,
            carModel: formData.carModel,
            carYear: formData.carYear,
            carFuel: formData.carFuel,
            carTransmission: formData.carTransmission,
            carKM: formData.carKM,
            carOwners: formData.carOwners,
            carTitle: formData.carTitle,
            carDescription: formData.carDescription,
            carPrice: formData.carPrice,
            carState: formData.carState,
            carPhotos: formData.carPhotos,
            username:formData.username,
            email:formData.email,
            // profile_image:profileDetails.profileImage,
            // username: profileDetails.profileUsername,
            // email: profileDetails.profileEmailId,
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
          <Form.Label className="d-block">Brand *</Form.Label>
          <Form.Control
            as="select"
            className="form-field"
            onChange={handleStateChange}
          >
            <option value="">---Select Brand---</option>

            {brandTitle.map((title) => (
              <optgroup label={title.name} key={title.id}>
                {brandSubtitle[title.id]?.map((brandsubtitle) => (
                  // {brandSubtitle[title.id]?.map((brandtitle)=>(
                  <option value={brandsubtitle.id} key={brandsubtitle.id}>
                    {brandsubtitle.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </Form.Control>
          {errors.carBrand && (
            <p className="error-message">{errors.carBrand}</p>
          )}
        </div>

        {selectedSubtitle && (
          <div className="form-div">
            <Form.Label>Model *</Form.Label>
            <Form.Control
              as="select"
              className="form-field"
              onChange={handleModelChange}
              value={formData.modelId}
            >
              <option value="">---Select Model---</option>
              {model.map((modelname) => (
                <option value={modelname.id} key={modelname.id}>
                  {modelname.name}
                </option>
              ))}
            </Form.Control>
            {errors.carModel && (
              <p className="error-message">{errors.carModel}</p>
            )}
          </div>
        )}

        <div className="form-div">
          <Form.Label>Year *</Form.Label>
          <Form.Control
            className="form-input-group-car form-field"
            type="number"
            name="carYear"
            placeholder="Enter year of manufacture"
            value={formData.carYear}
            onChange={(e) =>
              setFormData({ ...formData, carYear: e.target.value })
            }
          />
          {errors.carYear && <p className="error-message">{errors.carYear}</p>}
        </div>

        <div className="form-div">
          <Form.Label className="form-input-button form-field d-block">
            Fuel *
          </Form.Label>
          {fuel.map((fuelData) => (
            <Button
              key={fuelData.name}
              className={`form-input-button-type ${
                formData.carFuel === fuelData.name ? "selected" : ""
              }`}
              onClick={() => {
                setFormData({ ...formData, carFuel: fuelData.name });
                // setSelectedButton(fuelData.name); // Update selected transmission to change the color
              }}
            >
              {fuelData.name}
            </Button>
          ))}
          {errors.carFuel && <p className="error-message">{errors.carFuel}</p>}
        </div>

        <div className="form-div">
          <Form.Label className="form-input-button d-block">
            Transmission *
          </Form.Label>
          {transmission.map((transmissionData) => (
            <Button
              key={transmissionData.name} // Add a key for each item
              className={`form-input-button-type ${
                formData.carTransmission === transmissionData.name
                  ? "selected"
                  : ""
              }`}
              onClick={() => {
                setFormData({
                  ...formData,
                  carTransmission: transmissionData.name,
                });
                // setSelectedButton(transmissionData.name); // Update selected transmission to change the color
              }}
            >
              {transmissionData.name}
            </Button>
          ))}
          {errors.carBrand && (
            <p className="error-message">{errors.carBrand}</p>
          )}
        </div>

        <div className="form-div">
          <Form.Label className="form-field">KM driven *</Form.Label>
          <Form.Control
            className="form-input-group-car"
            type="number"
            name="carKM"
            placeholder="Enter KM Driven"
            value={formData.carKM}
            onChange={(e) =>
              setFormData({ ...formData, carKM: e.target.value })
            }
          />
          {errors.carKM && <p className="error-message">{errors.carKM}</p>}
        </div>

        <div className="form-div">
          <Form.Label className="form-input-button d-block">
            No. of Owners *
          </Form.Label>
          {owner.map((ownerData) => (
            <Button
              key={ownerData.name} // Add a key for each item
              className={`form-input-button-type ${
                formData.carOwners === ownerData.name ? "selected" : ""
              }`}
              onClick={() => {
                setFormData({ ...formData, carOwners: ownerData.name });
                // setSelectedButton(ownerData.name); // Update selected transmission to change the color
              }}
            >
              {ownerData.name}
            </Button>
          ))}
          {errors.carOwners && (
            <p className="error-message">{errors.carOwners}</p>
          )}
        </div>

        <div className="form-div">
          <Form.Label>Ad title *</Form.Label>
          <Form.Control
            className="form-field"
            type="text"
            name="carTitle"
            placeholder="Enter ad title"
            value={formData.carTitle}
            onChange={(e) =>
              setFormData({ ...formData, carTitle: e.target.value })
            }
          />
          <span className="form-description">
            Mention the key features of your item (e.g. brand, model, age, type)
          </span>
          {errors.carTitle && (
            <p className="error-message">{errors.carTitle}</p>
          )}
        </div>

        <div className="form-div">
          <Form.Label>Description *</Form.Label>
          <Form.Control
            className="form-field"
            as="textarea"
            rows={4}
            name="carDescription"
            placeholder="Enter description"
            value={formData.carDescription}
            onChange={(e) =>
              setFormData({ ...formData, carDescription: e.target.value })
            }
          />
          <span className="form-description">
            Include condition, features and reason for selling
          </span>
          {errors.carDescription && (
            <p className="error-message">{errors.carDescription}</p>
          )}
        </div>

        <hr></hr>

        <div className="form-div">
          <h1>SET A PRICE</h1>
          <Form.Label className="form-input-button d-block">Price *</Form.Label>
          <Form.Control
            className="form-field"
            type="number"
            name="carPrice"
            placeholder="Enter price"
            value={formData.carPrice}
            onChange={(e) =>
              setFormData({ ...formData, carPrice: e.target.value })
            }
            style={{
              backgroundImage: "url(/images/rupee-indian.png)", // Path relative to the public folder in React
              backgroundPosition: "10px center",
              backgroundRepeat: "no-repeat",
              paddingLeft: "30px", // Adjust padding to make space for the symbol
            }}
          />
          {errors.carPrice && (
            <p className="error-message">{errors.carPrice}</p>
          )}
        </div>
        <hr />

        <div className="form-div">
          <h4>UPLOAD UP TO 20 PHOTOS {`${100 / selectedFiles.length}px`}</h4>
          <Form.Group controlId="formCarPhotos">
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
              name="carPhotos"
              onChange={handleFileChange}
            />
          </Form.Group>
          {errors.carPhotos && (
            <p className="error-message">{errors.carPhotos}</p>
          )}
        </div>

        {/* <div className="form-div">
          <h4>UPLOAD UP TO 20 PHOTOS</h4>
          <Form.Group controlId="formCarPhotos">
            <Form.Label
              style={{
                border: "1px solid",
                width: "150px",
                height: "150px",
                display: "flex",
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
                  width="100px"
                  height="100px"
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
              name="carPhotos"
              onChange={handleFileChange}
            />
          </Form.Group>
        </div> */}

        <hr />

        <div className="form-div">
          <h4>CONFIRM YOUR LOCATION</h4>
          <Form.Label>State *</Form.Label>
          <Form.Control
            as="select"
            className="form-field"
            onChange={(e) =>
              setFormData({ ...formData, carState: e.target.value })
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
        {errors.carState && <p className="error-message">{errors.carState}</p>}
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
              {profileDetails.email && 
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
                />}
              <p className="error-message">{errors.profileDetails}</p>
            </Col>
          </Row>
        </div>

        {/* <div className="form-div">
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
                    src={selectedImage || olxImage}
                    width="100px"
                    height="100px"
                    alt="Profile"
                    style={{ zIndex: 1 }}
                  />
                  <TbCameraPlus
                    style={{
                      width: "20px",
                      height: "20px",
                      position: "absolute",
                      zIndex: 2,
                      top: "72px",
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
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col sd={3} md={3} lg={3}>
              <p>Your email id: </p>
            </Col>
            <Col sd={3} md={3} lg={3}>
              {profileDetails.email && <p>{profileDetails.email}</p>}
            </Col>
          </Row>
        </div> */}
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
        <h1>{selectedImage || olxImage }</h1>
      </form>
    </>
  );
};

export default Car1;
