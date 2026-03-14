import "./ProblemPage.css";
import { useNavigate } from "react-router-dom";

function ProblemPage() {
  const navigate = useNavigate();
  return (
    <div className="page-content">

      <div className="top-bar aa">
        <h2>Welcome , Admin !</h2>
        <p>Here's what's happening with your projects today</p>
      </div><br/><br/>

      <div className="email-section ">
        <h3>Proplem Email</h3><br/><br/>

        <div className="email-card" onClick={() => navigate("/problem/details")}>
        Problem 1 <span>›</span>
      </div>

      <div className="email-card" onClick={() => navigate("/problem/details")}>
        Problem 2 <span>›</span>
      </div>

      <div className="email-card" onClick={() => navigate("/problem/details")}>
        Problem 3 <span>›</span>
      </div>

      <div className="email-card" onClick={() => navigate("/problem/details")}>
        Problem 4 <span>›</span>
      </div>
      

      </div>

    </div>
  );
}

export default ProblemPage;