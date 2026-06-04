import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./emailPage.css";

export default function EmailPage() {
  const navigate = useNavigate();
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "https://egypt-voting-system.onrender.com/api/admin/candidates/pending",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setCandidates(data.data);
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

      <div className="email-body">
        <h3 className="hh">Candidates Approval</h3>

        {candidates.map((item) => (
          <div
            key={item.candidate_id}
            className="email-card aa"
            onClick={() => navigate("/candidate", { state: item })}
          >
            <span>{item.full_name || "No Name"}</span>
            <span>›</span>
          </div>
        ))}

      </div>

    </div>
  );
}