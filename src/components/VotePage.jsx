import { useEffect, useState } from "react";
import "./VotePage.css";

function VotePage() {
  const [votes, setVotes] = useState([]);
  const [filteredVotes, setFilteredVotes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVotes();
  }, []);

  useEffect(() => {
    const filtered = votes.filter(
      (vote) =>
        vote.v_national_id
          .toString()
          .includes(search) ||
        vote.c_national_id
          .toString()
          .includes(search) ||
        vote.election_name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        vote.v_code
          .toString()
          .includes(search)
    );

    setFilteredVotes(filtered);
  }, [search, votes]);

  const fetchVotes = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://egypt-voting-system.onrender.com/api/admin/votes",
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
        setVotes(result.data);
        setFilteredVotes(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="vote-page">
      <h2 className="vote-title">
        Vote
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
          <table className="vote-table">
            <thead>
              <tr>
                <th>V Code</th>
                <th>Time</th>
                <th>Date</th>
                <th>V National ID</th>
                <th>Election Name</th>
                <th>C National ID</th>
              </tr>
            </thead>

            <tbody>
              {filteredVotes.map(
                (vote, index) => (
                  <tr key={index}>
                    <td>{vote.v_code}</td>
                    <td>{vote.time}</td>
                    <td>{vote.data}</td>
                    <td>
                      {vote.v_national_id}
                    </td>
                    <td className="election-name">
                      {vote.election_name}
                    </td>
                    <td>
                      {vote.c_national_id}
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

export default VotePage;