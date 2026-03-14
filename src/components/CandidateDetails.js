import "./candidateDetails.css";
import { useNavigate } from "react-router-dom";


export default function CandidateDetails({acceptCandidate,refuseCandidate}) {
  const navigate = useNavigate();
   const candidateData = {
    id: 1,
    name: "Mohamed",
  };

  return (
    <div className="candidate-page">

      <div className="blue-header">
        <h2>Welcome , Admin !</h2>
        <p>Here's what's happening with your projects today</p>
      </div>
       {/* معاذ */}
      <div className="candidate-wrapper">

        <div className="candidate-title">
          Candidate 
        </div>

        <div className="card">

          <div className="image-box"></div>

          <h3 className="name">Mohamed</h3>
          <p className="sub">
            Candidates For The <br/> People Assembly
          </p>

          <div className="buttons">
            <button
              className="accept"
              onClick={() => {
                acceptCandidate(candidateData);
                navigate("/accepted");
              }}
            >
              Accept
            </button>
            <button
             className="refuse"
             onClick={() => {
             const confirmDelete = window.confirm("Are you sure you want to delete this Candidate?");

             if (confirmDelete) {
             refuseCandidate(candidateData);
             navigate("/email");
            }   
            }}
>
  Refused
</button>
          </div>


          <div className="form-section">

            <label>Username</label>
            <input placeholder="Name" readOnly/>

            <label>Email</label>
            <input placeholder="Email"  readOnly/>

            <label>Password</label>
            <input type="password" placeholder="Password"  readOnly/>

            <label>National ID</label>
            <input placeholder="National ID" readOnly />

            <label>Governorate</label>
            <input placeholder="cairo"  readOnly/>

            <label>Date Of Birth</label>
            <input placeholder="00/00/0000" readOnly />

            <label>Administrative</label>
            <input placeholder="Administrative" readOnly />

            <label>Degree</label>
            <input placeholder="degree"  readOnly/>

            <label>Age</label>
            <input placeholder="Age"  readOnly/>

            <label>Gender</label>
            <input placeholder="Gender"  readOnly/>

            <label>Phone Number</label>
            <input placeholder="01000000000"  readOnly/>

            <label>Candidate Type</label>
            <input placeholder="candidate"  readOnly/>

            <label>Occupation</label>
            <input placeholder="Occupation" readOnly />

            <label>Election Symbol</label>
            <input placeholder="Symbol"  readOnly/>

            <label>Short Bio</label>
            <input placeholder="Short bio" readOnly />

          </div>

          

          {[
  "National ID Card",
  "Education Qualification",
  "Military Service",
  "Financial Disclosure",
  "Political Party",
  "Personal Photos",
  "Birth Certificate",
  "Fitness and Health",
  "Deposit Payment Receipt",
  "Criminal Record",
].map((item, index) => (
  <div
    key={index}
    className="file-box"
    onClick={() => navigate(`/file/${item}`)}
  >
    {item}
  </div>
))}

          <button
            className="back"
            onClick={() => navigate("/email")}
          >
            Back
          </button>

        </div>
      </div>
    </div>
  );
}