import { useParams, useNavigate } from "react-router-dom";
import "./filePage.css";

export default function FilePage() {
  const { name } = useParams();
  const navigate = useNavigate();

  return (
    <div className="file-page">

      <div className="blue-header">
        <h2>Welcome , Admin !</h2>
        <p>Here's what's happening with your projects today</p>
      </div>

      <div className="file-content">
        <h3 className="file-title">{name}</h3>

        <div className="image-box"></div>

        <button
          className="back"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
}