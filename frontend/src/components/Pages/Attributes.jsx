import React from "react";
import { useLocation } from "react-router-dom";
import Car1 from "./Car1";
import Property1 from "./Property1";
import Pets from "./Pets";
import Jobs from "./Jobs";
import ElectronicAppliance from "./ElectronicAppliance";
import Furniture from "./Furniture";
import Fashion from "./Fashion";
import BooksSportsHobbies from "./BooksSportsHobbies";
import MobilePhones from "./Mobiles/MobilePhones";
import Accessories from "./Mobiles/Accessories";
import Tablets from "./Mobiles/Tablets";
import CommercialOtherVehicles from "./CommercialVehiclesSpare/CommercialOtherVehicles";
import SpareParts from "./CommercialVehiclesSpare/SpareParts";
import Services from "./Services";
import Bike from "./Bike";
import Properties from "./Properties";

const Attributes = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const subcategory1 = params.get("subcategory");
  console.log("---sub",subcategory1)
  const subcategory = subcategory1.replace(/\s+/g, "");
  console.log(subcategory);
  const category1=params.get("category")
  // const category = category1 ? category1.replace(/\s+/g, "").replace(/%26/g, "&") : ""; 
  const category=category1 ? decodeURIComponent(category1).replace(/\s+/g, "") : "";
  console.log("---cat",category)
  

  let formComponent;
  switch (subcategory) {
    case "Cars":
      formComponent = <Car1 />;
      break;

    case "ForSale:Houses&Apartments":
    case "ForRent:Houses&Apartments":
    case "Lands&Plots":
    case "ForRent:Shops&Offices":
    case "ForSale:Shops&Offices":
    case "PG&GuestHouses":
      formComponent = <Properties />;
      break;

    case "MobilePhones":
      formComponent = <MobilePhones />;
      break;
    case "Accessories":
      formComponent = <Accessories />;
      break;
    case "Tablets":
      formComponent = <Tablets />;
      break;

    case "ForRent:Houses&Apartments":
      formComponent = <Property1 />;
      break;
    case "Fishes&Aquarium":
    case "PetFood&Accessories":
    case "Dogs":
    case "OtherPets":
      formComponent = <Pets />;
      break;

    case "Fishes&Aquarium":
    case "PetFood&Accessories":
    case "Dogs":
    case "OtherPets":
    case "Dataentry&Backoffice":
    case "Sales&Marketing":
    case "BPO&Telecaller":
    case "Driver":
    case "OfficeAssistant":
    case "Delivery&Collection":
    case "Teacher":
    case "Cook":
    case "Receptionist&Frontoffice":
    case "Operator&Technician":
    case "ITEngineer&Developer":
    case "Hotel&TravelExecutive":
    case "Accountant":
    case "Designer":
    case "OtherJobs":
      formComponent = <Jobs />;
      break;

    case "TVs,Video-Audio":
    case "Kitchen&OtherAppliances":
    case "Computers&Laptops":
    case "Cameras&Lenses":
    case "Games&Entertainment":
    case "Fridges":
    case "ComputerAccessories":
    case "HardDisks,Printers&Monitors":
    case "ACs":
    case "WashingMachines":
      formComponent = <ElectronicAppliance />;
      break;

    case "Commercial&OtherVehicles":
      formComponent = <CommercialOtherVehicles />;
      break;

      case "SpareParts":
        formComponent =
          category === "Bikes" ? <Bike /> : <SpareParts />; // Conditional for SpareParts
        break;

    case "Services":
    case "Education&Classes":
    case "Tours&Travel":
    case "ElectronicsRepair&Services":
    case "Health&Beauty":
    case "HomeRenovation&Repair":
    case "Cleaning&PestControl":
    case "Legal&DocumentationServices":
    case "Packers&Movers":
    case "OtherServices":
      formComponent = <Services />;
      break;

    case "Sofa&Dining":
    case "Beds&Wardrobes":
    case "HomeDecor&Garden":
    case "KidsFurniture":
    case "OtherHouseholdItems":
      formComponent = <Furniture />;
      break;

    case "Men":
    case "Women":
    case "Kids":
      formComponent = <Fashion />;
      break;

    case "Books":
    case "Gym&Fitness":
    case "MusicalInstruments":
    case "SportsEquipment":
    case "OtherHobbies":
      formComponent = <BooksSportsHobbies />;
      break;

    case "Motorcycles":
    case "Scooters":
    case "Bicycles":
      formComponent = <Bike />;
      break;

    default:
      formComponent = <div>Error: Unknown category.</div>;
  }
  return <div>{formComponent}</div>;
};

export default Attributes;
