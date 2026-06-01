import "./ElectoralDistrictPage.css";
import DistrictCard from "./DistrictCard";
import SearchBar from "./SearchBar";
import {  useNavigate } from "react-router-dom";


const districts = [
  {
    name: "Nasr City",
    voters: 120000,
    governorate: "Cairo",
    code: 101,
  },
  {
    name: "New Cairo",
    voters: 98000,
    governorate: "Cairo",
    code: 102,
  },
  {
    name: "Heliopolis",
    voters: 54000,
    governorate: "Cairo",
    code: 106,
  },
  {
    name: "Obur",
    voters: 52000,
    governorate: "Cairo",
    code: 102,
  },
];

function ElectoralDistrictPage() {
  const navigate = useNavigate();

  return (
    <div className="district-page">

      <h2 className="page-title">Electoral District</h2>

      <div className="actions">
        <button
          className="btn-primary"
          onClick={() => navigate("/DistrictForm")}
        >
          Add Electoral District
        </button>
        

        <button
          className="btn-secondary"
          onClick={() => navigate("/zoma")}
        >
          Edit
        </button>
      </div>

      <SearchBar />

      <div className="district-grid">
        {districts.map((d, index) => (
          <DistrictCard key={index} district={d} />
        ))}
      </div>
    </div>
  );
}

export default ElectoralDistrictPage;