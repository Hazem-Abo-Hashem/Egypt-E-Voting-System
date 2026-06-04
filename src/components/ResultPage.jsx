import { useEffect, useState } from "react";
import "./ResultPage.css";

function ResultPage() {
  const [results, setResults] = useState([]);
  const [election, setElection] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(false);

  useEffect(() => {
    fetchResults();
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://egypt-voting-system.onrender.com/api/admin/dashboard/stats",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchResults = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://egypt-voting-system.onrender.com/api/admin/election/results",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        setElection(result.election);
        setResults(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const approveResult = async () => {
    try {
      setApproving(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://egypt-voting-system.onrender.com/api/admin/group/decision",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            decision: "approved",
          }),
        }
      );

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        fetchResults();
      }
    } catch (error) {
      console.error(error);
    } finally {
      setApproving(false);
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="result-page">

      {stats && (
        <div className="top-stats">

          <div className="top-card">
            <div className="top-number">
              {stats.voters}
            </div>

            <div className="top-label">
              👥Voters
            </div>
          </div>

          <div className="top-card">
            <div className="top-number">
              {stats.candidates}
            </div>

            <div className="top-label">
              👨🏽‍💼Candidates
            </div>
          </div>

        </div>
      )}

      <h2 className="page-title">
        Result
      </h2>

      {election?.result_status === "approved" && (
        <div className="approved-box">
          ✅ Result Approved
        </div>
      )}

      <div className="result-grid">
        {results.map((candidate) => (
          <div
            className="candidate-card"
            key={candidate.candidate_id}
          >
            <div className="votes-count">
              {candidate.total_votes}
            </div>

            <div className="candidate-image">
              <img
                src={candidate.personal_photos_url}
                alt={candidate.full_name}
              />
            </div>

            <h3>
              {candidate.full_name}
            </h3>

            <p>
              Candidates For The
              <br />
              {candidate.candidate_type}
            </p>
          </div>
        ))}
      </div>

      <div className="actions">

        <button
          className="approve-btn"
          onClick={approveResult}
          disabled={approving}
        >
          {approving
            ? "Approving..."
            : "Approval"}
        </button>

        <button className="refuse-btn">
          Refusal
        </button>

      </div>

    </div>
  );
}

export default ResultPage;