import { useNavigate } from "react-router-dom";
import "./emailPage.css";

export default function EmailPage() {
  const navigate = useNavigate();

  const candidates = [
    "Data Candidate 1",
    "Data Candidate 2",
    "Data Candidate 3",
    "Data Candidate 4",
  ];

  return (
    <div className="content">

      <div className="blue-header mm">
        <h2>Welcome , Admin !</h2>
        <p>Here's what's happening with your projects today</p>
      </div>

      <div className="email-body">
        <h3>Email</h3><br/><br/>

        {candidates.map((item, index) => (
          <div
            key={index}
            className="email-card aa"
            onClick={() => navigate("/candidate")}
          >
            <span>{item}</span>
            <span>›</span>
          </div>
        ))}

      </div>

    </div>
  );
}