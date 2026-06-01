import "./AdminList.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AdminList({ deleteAdmin }) {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://egypt-voting-system.onrender.com/api/admin/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setAdmins(data.data);
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="admin-page">
      <div className="blue-header">
        <h2>Welcome , Admin !</h2>
        <p>Here's what's happening with your projects today</p>
      </div>

      <div className="admin-wrapper">
        <div className="admin-table">
          <div className="table-head">
            <div>Admin Number</div>
            <div className="vv">Email</div>
            <div className="kk">Password</div>
            <div className="ww">Action</div>
          </div>

          {admins.map((admin) => (
            <div className="table-row" key={admin.admin_id}>
              <div>{admin.admin_id}</div>
              <div className="ll">{admin.email}</div>

              {/* 🔥 الباسورد مش بيرجع من الباك */}
              <div className="oo">******</div>

              <div>
                <button
  onClick={async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admin?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://egypt-voting-system.onrender.com/api/admin/delete/${admin.admin_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Deleted successfully");

        // 🔥 امسحه من الواجهة فورًا
        setAdmins((prev) =>
          prev.filter((a) => a.admin_id !== admin.admin_id)
        );
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  }}
  className="delete-btn"
>
  Delete
</button>
              </div>
            </div>
          ))}
        </div>

        <button className="backq-btn" onClick={() => navigate("/add-admin")}>
          Back
        </button>
      </div>
    </div>
  );
}

export default AdminList;