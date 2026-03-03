import "./AdminList.css";
import { useNavigate } from "react-router-dom";

function AdminList({ admins,deleteAdmin }) {
  const navigate = useNavigate();

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
  <div className="table-row" key={admin.id}>
    <div>{admin.id}</div>
    <div className="ll" >{admin.email}</div>
    <div className="oo">{admin.password}</div>

    <div>
      <button
        onClick={() => deleteAdmin(admin.id)}
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