import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./edit.css";

function EditOrganizeElection() {
  const location = useLocation();
  const navigate = useNavigate();

  const oldData = location.state;

  // 🟢 نخلي الـ id يشتغل بأي اسم
  const electionId =
    oldData?.election_id || oldData?.electionId || null;

  const [formData, setFormData] = useState({
    election_name: "",
    governorate: "",
    elogo: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    if (!oldData) {
      navigate("/home");
      return;
    }

    setFormData({
      election_name: oldData.election_name || "",
      governorate: oldData.governorate || "",
      elogo: oldData.logo_url || "",
      start_date: oldData.start_date
        ? oldData.start_date.split("T")[0]
        : "",
      end_date: oldData.end_date
        ? oldData.end_date.split("T")[0]
        : "",
    });
  }, [oldData, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    if (!electionId) {
      alert("Missing election ID");
      return;
    }

    if (
      !formData.election_name ||
      !formData.start_date ||
      !formData.end_date
    ) {
      alert("Fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://egypt-voting-system.onrender.com/api/election/edit/${electionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            election_name: formData.election_name,
            start_date: formData.start_date,
            end_date: formData.end_date,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Updated successfully");

        navigate("/people-assembly", {
          state: {
            ...oldData,
            ...formData,
          },
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
      <div className="title">Edit Organize Elections</div>

      <div className="form">
        <label>Election Name</label>
        <input
          name="election_name"
          value={formData.election_name}
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

          
        </div>

        <div className="row">
          <div>
            <label>From Day</label>
            <input
              type="date"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>To Day</label>
            <input
              type="date"
              name="end_date"
              value={formData.end_date}
              min={formData.start_date}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="actions">
          <button className="save" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditOrganizeElection;