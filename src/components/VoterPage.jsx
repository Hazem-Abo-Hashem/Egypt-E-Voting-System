import { useEffect, useState } from "react";
import "./VoterPage.css";

function VoterPage() {
  const [voters, setVoters] = useState([]);
  const [filteredVoters, setFilteredVoters] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVoters();
  }, []);

  useEffect(() => {
    const filtered = voters.filter(
      (voter) =>
        voter.v_name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        voter.v_national_id
          .toString()
          .includes(search) ||
        voter.status
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        voter.voted_for
          .toLowerCase()
          .includes(search.toLowerCase())
    );

    setFilteredVoters(filtered);
  }, [search, voters]);

  const fetchVoters = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://egypt-voting-system.onrender.com/api/admin/voters/status",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        setVoters(result.data);
        setFilteredVoters(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="voter-page">
      <h2 className="voter-title">
        Voter
      </h2>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search Text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      {loading ? (
        <h2 className="loading-text">
          Loading...
        </h2>
      ) : (
        <div className="table-container">
          <table className="voter-table">
            <thead>
              <tr>
                <th>Voter Number</th>
                <th>V National ID</th>
                <th>V Name</th>
                <th>Voted For</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredVoters.map(
                (voter, index) => (
                  <tr key={voter.v_national_id}>
                    <td>
                      {index + 1}
                    </td>

                    <td>
                      {voter.v_national_id}
                    </td>

                    <td>
                      {voter.v_name}
                    </td>

                    <td className="candidate-name">
                      {voter.voted_for}
                    </td>

                    <td>
                      <span
                        className={
                          voter.status ===
                          "Voted"
                            ? "status-voted"
                            : "status-not-voted"
                        }
                      >
                        {voter.status}
                      </span>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default VoterPage;