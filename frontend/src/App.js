import AppBar from "./components/AppBar";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Authentication/Register";
import Login from "./components/Authentication/Login";
import Logout from "./components/Authentication/Logout";
import Profile from "./components/Appbar/Profile";
import Chat from "./components/Appbar/Chat";
import Notification from "./components/Appbar/Notification";

// import H from "./components/AppBar/H";
// import NotFound from "./components/Pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./components/Pages/HomePage";
import PostPage from "./components/Appbar/PostPage";
import Attributes from "./components/Pages/Attributes";
import CarHomePage from "./components/Pages/CarHomePage";
import CarDetails from "./components/IndividualPages/CarDetails";
import PetDetails from "./components/IndividualPages/PetDetails";
import JobDetails from "./components/IndividualPages/JobDetails";
import ElectronicApplianceDetails from "./components/IndividualPages/ElectronicApplianceDetails";
import FurnitureDetails from "./components/IndividualPages/FurnitureDetails";
import FashionDetails from "./components/IndividualPages/FashionDetails";
import BooksSportsHobbiesDetails from "./components/IndividualPages/BooksSportsHobbiesDetails";
import MobileDetails from "./components/IndividualPages/MobileDetails";
import CVSDetails from "./components/IndividualPages/CVSDetails";
import ServiceDetailsPage from "./components/IndividualPages/ServiceDetails";
import BikeDetails from "./components/IndividualPages/BikeDetails";
import PropertyDetails from "./components/IndividualPages/PropertyDetails";
import SearchResults from "./components/IndividualPages/SearchResults";
import Categories from "./components/FilterPage/Categories";

function App() {
  return (
    <Router>
      <AppBar />
      <Routes>
      <Route path="/search-results" element={<SearchResults />} />
        <Route path="/" element={<CarHomePage />} />
        <Route path="/?category=service" element={<Categories />} />
        
        <Route path="/categories" element={<Categories />} />
       
        <Route path="/car/:pk" element={<CarDetails />} />
        <Route path="/pet/:pk" element={<PetDetails />} />
        <Route path="/job/:pk" element={<JobDetails />} />
        <Route
          path="/electronicsappliance/:pk"
          element={<ElectronicApplianceDetails />}
        />
        <Route path="/furniture/:pk" element={<FurnitureDetails />} />
        <Route path="/fashion/:pk" element={<FashionDetails />} />
        <Route
          path="/booksportshobbies/:pk"
          element={<BooksSportsHobbiesDetails />}
        />
        <Route path="/mobile/:pk" element={<MobileDetails />} />
        <Route path="/cvs/:pk" element={<CVSDetails />} />
        <Route path="/service/:pk" element={<ServiceDetailsPage />} />
        <Route path="/bike/:pk" element={<BikeDetails />} />
        <Route path="/property/:pk" element={<PropertyDetails />} />

        <Route path="/chat" element={<Chat />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/post"
          element={
            <ProtectedRoute>
              <PostPage />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/post/attributes" element={<Attributes />} />
        <Route path="/filter" element={<Categories />}/>

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
