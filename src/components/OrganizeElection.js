import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./edit.css";

function OrganizeElection() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    electionNumber: "",
    governorate: "",
    elogo: "",
    fromDay: "",
    toDay: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSave = () => {
  if (
    !formData.electionNumber ||
    !formData.governorate ||
    !formData.elogo ||
    !formData.fromDay ||
    !formData.toDay
  ) {
    alert("Fill all fields");
    return;
  }

  navigate("/people-assembly", { state: formData });
};

  return (
    <div className="content">
      <div className="title">Organize Elections</div>

     
      <div className="tabs">
        <button className="tab active">People Assembly</button>
        <button className="tab">Senate</button>
        <button className="tab">Presidential</button>
        <button className="tab">Local</button>
      </div>

      
      <div className="form">
        <label>Election Number</label>
        <input
          name="electionNumber"
          value={formData.electionNumber}
          onChange={handleChange} placeholder="Enter Eletion Number" required
        />

        <div className="row">
          <div>
            <label>Governorate</label>
            <input
              name="governorate"
              value={formData.governorate}
              onChange={handleChange} placeholder="Enter Your City"required
            />
          </div>

          <div>
            <label>logo</label>
            <input
              name="elogo"
              value={formData.elogo}
              onChange={handleChange} placeholder="Enter Your Logo" required
            />
          </div>
        </div>

        <div className="row">
          <div>
            <label>From Day</label>
            <input
              type="date"
              name="fromDay"
              value={formData.fromDay}
              onChange={handleChange} placeholder="Enter " required 
            />
          </div>

          <div>
            <label>To Day</label>
            <input
              type="date"
              name="toDay"
              value={formData.toDay}
              onChange={handleChange} required
            />
          </div>
        </div>

        <div className="actions">
          <button
            className="save"
            onClick={handleSave}

          >
            Save
          </button>

          
        </div>
      </div>
    </div>
  );
}

export default OrganizeElection;
