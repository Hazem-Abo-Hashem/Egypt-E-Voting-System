import "./DistrictForm.css";
import {  useNavigate } from "react-router-dom";

function DistrictForm() {
const navigate = useNavigate();
  return (
    <div className="district-form">

      <h2 className="form-title">New Electoral District</h2>

      <div className="form">

        <input placeholder="Register Voter Count" />

        <input placeholder="Name" />

        <input placeholder="Governorate" />

        <input placeholder="District Code" />

      </div>

      <div className="form-actions">

        <button className="save-btn">
          Save
        </button>

        <button className="back-btn"
            onClick={() => navigate("/ElectoralDistrictPage")}>
          Back
        </button>

      </div>

    </div>
  );
}

export default DistrictForm;