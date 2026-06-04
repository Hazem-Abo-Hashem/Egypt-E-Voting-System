import { useLocation, useNavigate } from "react-router-dom";
import "./edit.css";

function PeopleAssembly() {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  return (
    <div className="content">
      <div className="title">People Assembly</div>

      <div className="form">
        <label>Election Name</label>
        <input value={data?.election_name || ""} readOnly />
       
        <div className="row">
          <div>
            <label>Governorate</label>
            <input value={data?.governorate || ""} readOnly />
          </div>

          
        </div>

        <div className="row">
          <div>
            <label>From Day</label>
            <input
  value={data?.start_date ? data.start_date.split("T")[0] : ""}
  readOnly
/>
          </div>

          <div>
            <label>To Day</label>
          <input
  value={data?.end_date ? data.end_date.split("T")[0] : ""}
  readOnly
/>
          </div>
        </div>

        <div className="actions">
          <button
            className="save"
            onClick={() => navigate("/home")}
          >
            Back
          </button>

          <button
            className="edit"
            onClick={() =>
              navigate("/edit", { state: data })
            }
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default PeopleAssembly;