import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./edit.css";

function OrganizeElection() {

  const navigate = useNavigate();

  const [governorates, setGovernorates] = useState([]);

  const [formData, setFormData] = useState({
    electionNumber: "",
    governorate: "",
    elogo: "",
    fromDay: "",
    toDay: "",
  });

  useEffect(() => {

    const fetchGovernorates = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://egypt-voting-system.onrender.com/api/election/governorates",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (data.success) {
          setGovernorates(data.data);
        }

      } catch (err) {
        console.log(err);
      }
    };

    fetchGovernorates();

  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {

    if (
      !formData.electionNumber ||
      !formData.governorate ||
      !formData.fromDay ||
      !formData.toDay
    ) {
      alert("Fill all fields");
      return;
    }

    try {

      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://egypt-voting-system.onrender.com/api/election/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            election_type: "People Assembly",
            election_name: formData.electionNumber,
            governorate: formData.governorate,
            logo_url: formData.elogo,
            start_date: formData.fromDay,
            end_date: formData.toDay,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {

        alert("Election created successfully");

        navigate("/people-assembly", {
          state: data.data,
        });

      } else {
        alert("Error: " + data.message);
      }

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="content">

      <div className="blue-header mm">
        <h2>Welcome , Admin !</h2>
      </div>

<br></br>
<br></br>

      <div className="title">
        Organize Elections
      </div>

      <div className="form">

        <label>Election Name</label>

        <input
          name="electionNumber"
          value={formData.electionNumber}
          onChange={handleChange}
          placeholder="Enter Election Name"
        />

        <div className="row yy">

          <div>

            <label>Governorate</label>

            <select
              name="governorate"
              value={formData.governorate}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "15px",
                border: "1px solid #b8c0ff"
              }}
            >
              <option value="">
                Select Governorate
              </option>

              {governorates.map((gov) => (
                <option
                  key={gov.governorate_id}
                  value={gov.governorate_name}
                >
                  {gov.governorate_name}
                </option>
              ))}
            </select>

          </div>

        </div>

        <div className="row">

          <div>

            <label>From Day</label>

            <input
              name="fromDay"
              type="date"
              value={formData.fromDay}
              onChange={handleChange}
            />

          </div>

          <div>

            <label>To Day</label>

            <input
              name="toDay"
              type="date"
              value={formData.toDay}
              min={formData.fromDay}
              onChange={handleChange}
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

        <button
          className="save"
          onClick={() => navigate("/elections")}
        >
          Show Elections
        </button>

      </div>

    </div>
  );
}

export default OrganizeElection;  