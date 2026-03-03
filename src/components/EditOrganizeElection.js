import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./edit.css";

function EditOrganizeElection() {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(location.state);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="content">
      <div className="title">Edit Organize Elections</div>

      {/* 🔵 TABS */}
      <div className="tabs">
        <button className="tab active">People Assembly</button>
        <button className="tab">Senate</button>
        <button className="tab">Presidential</button>
        <button className="tab">Local</button>
      </div>

      {/* 🔵 FORM */}
      <div className="form">
        <label>Election Number</label>
        <input
          name="electionNumber"
          value={formData.electionNumber}
          onChange={handleChange}
        />

        <div className="row">
          <div>
            <label>Governorate</label>
            <input
              name="governorate"
              value={formData.governorate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Elogo</label>
            <input
              name="elogo"
              value={formData.elogo}
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </div>

          <div>
            <label>To Day</label>
            <input
              type="date"
              name="toDay"
              value={formData.toDay}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="actions">
          <button
            className="save"
            onClick={() =>
              navigate("/people-assembly", { state: formData })
            }
          >
            Save
          </button>

          {/* <button
            className="edit"
            onClick={() => navigate("/people-assembly")}
          >
            Back
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default EditOrganizeElection;
