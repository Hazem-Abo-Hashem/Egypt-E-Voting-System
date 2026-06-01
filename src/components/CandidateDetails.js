import "./candidateDetails.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CandidateDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const passedData = location.state;
  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    if (!passedData?.candidate_id) return;

    const fetchCandidate = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          `https://egypt-voting-system.onrender.com/api/admin/candidates/${passedData.candidate_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (data.success) {
          setCandidate(data.data);
        } else {
          alert("Error: " + data.message);
        }
      } catch (err) {
        console.log(err);
        alert("Server error");
      }
    };

    fetchCandidate();
  }, [passedData]);

  // 🔥 دي الفنكشن الجديدة
  const handleDecision = async (decision) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://egypt-voting-system.onrender.com/api/admin/candidates/${candidate.candidate_id}/decision`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ decision }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(data.message);

        if (decision === "accepted") {
          navigate("/accepted");
        } else {
          navigate("/email");
        }
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  if (!candidate) return <div className="content">Loading...</div>;

  return (
    <div className="candidate-page">
      <div className="blue-header">
        <h2>Welcome , Admin !</h2>
        <p>Here's what's happening with your projects today</p>
      </div>

      <div className="candidate-wrapper">
        <div className="candidate-title">Candidate</div>

        <div className="card">
          <div className="image-box">
            {candidate.personal_photos_url && (
              <img
                src={candidate.personal_photos_url}
                alt="candidate"
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "20px",
                }}
              />
            )}
          </div>

          <h3 className="name">{candidate.full_name}</h3>
          <p className="sub">{candidate.candidate_type}</p>

          <div className="buttons">
            <button
              className="accept"
              onClick={() => handleDecision("accepted")}
            >
              Accept
            </button>

            <button
              className="refuse"
              onClick={() => {
                const confirmDelete = window.confirm(
                  "Are you sure you want to refuse this candidate?"
                );

                if (confirmDelete) {
                  handleDecision("refused");
                }
              }}
            >
              Refused
            </button>
          </div>

          <div className="form-section">
            <label>Username</label>
            <input value={candidate.username || ""} readOnly />

            <label>Email</label>
            <input value={candidate.email || ""} readOnly />

            <label>Password</label>
            <input type="password" value="******" readOnly />

            <label>National ID</label>
            <input value={candidate.national_id || ""} readOnly />

            <label>Governorate</label>
            <input value={candidate.governorate || ""} readOnly />

            <label>Date Of Birth</label>
            <input
              value={
                candidate.birth_date
                  ? candidate.birth_date.split("T")[0]
                  : ""
              }
              readOnly
            />

            <label>Administrative</label>
            <input value={candidate.administrative_unit || ""} readOnly />

            <label>Degree</label>
            <input value={candidate.degree || ""} readOnly />

            <label>Age</label>
            <input value={candidate.age || ""} readOnly />

            <label>Gender</label>
            <input value={candidate.gender || ""} readOnly />

            <label>Phone Number</label>
            <input value={candidate.phone_number || ""} readOnly />

            <label>Candidate Type</label>
            <input value={candidate.candidate_type || ""} readOnly />

            <label>Occupation</label>
            <input value={candidate.occupation || ""} readOnly />

            <label>Election Symbol</label>
            <input value={candidate.election_symbol_url || ""} readOnly />

            <label>Short Bio</label>
            <input value={candidate.short_bio || ""} readOnly />
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
          ].map((item) => (
            <div
              key={item}
              className="file-box"
              onClick={() => navigate(`/file/${item}`, { state: candidate })}
            >
              {item}
            </div>
          ))}

          <button className="back" onClick={() => navigate("/email")}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}