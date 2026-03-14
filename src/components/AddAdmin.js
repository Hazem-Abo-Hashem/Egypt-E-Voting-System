import "./addAdmin.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function AddAdmin({ addAdmin }) {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

        <button
        className="admin-btn"
          onClick={() => {
            if (!email || !password) {
              alert("Fill all fields");
              return;
            }

            addAdmin({ email, password });
            navigate("/admin-list");
          }}
        >
          Add user
        </button>
         <button className="show-all" onClick={()=> navigate("/admin-list")}>Show All </button>  
      </div>
    </div>
  );
}

export default AddAdmin;