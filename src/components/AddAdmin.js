import "./addAdmin.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddAdmin({ addAdmin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAddAdmin = async () => {
    if (!email || !password) {
      alert("Fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://egypt-voting-system.onrender.com/api/admin/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // مهم
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Admin added successfully");

        // لو عايز تضيفه في state كمان
        addAdmin({
          id: data.data.admin_id,
          email: data.data.email,
        });

        navigate("/admin-list");
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="content center-content">

      <div className="admin-card">
        <h2>Add Admin</h2>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="admin-btn" onClick={handleAddAdmin}>
          Add user
        </button>

        <button
          className="show-all"
          onClick={() => navigate("/admin-list")}
        >
          Show All
        </button>
      </div>
    </div>
  );
}

export default AddAdmin;