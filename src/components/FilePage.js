import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./filePage.css";

export default function FilePage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [candidate, setCandidate] = useState(null);

  const passedData = location.state;

  useEffect(() => {
    if (!passedData?.candidate_id) return;

    const fetchData = async () => {
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
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [passedData]);

  if (!candidate) return <div className="file-page">Loading...</div>;

  // 🔥 ربط اسم الملف بالـ API
  const fileMap = {
    "National ID Card": candidate.national_id_front_url,
    "Education Qualification": candidate.education_qualification_url,
    "Military Service": candidate.military_service_url,
    "Financial Disclosure": candidate.financial_disclosure_url,
    "Personal Photos": candidate.personal_photos_url,
    "Birth Certificate": candidate.birth_certificate_url,
    "Fitness and Health": candidate.fitness_health_url,
    "Deposit Payment Receipt": candidate.deposit_receipt_url,
    "Criminal Record": candidate.criminal_record_url,
  };

  const fileUrl = fileMap[name];

  return (
    <div className="file-page">
      <div className="blue-header">
        <h2>Welcome , Admin !</h2>
        <p>Here's what's happening with your projects today</p>
      </div>

      <div className="file-content">
        <h3 className="file-title">{name}</h3>

        <div className="image-box">
          {fileUrl ? (
            <img
              src={fileUrl}
              alt="file"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "20px",
                objectFit: "cover",
              }}
            />
          ) : (
            <p style={{ textAlign: "center", marginTop: "20px" }}>
              No File Available
            </p>
          )}
        </div>

        <button className="back" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
}