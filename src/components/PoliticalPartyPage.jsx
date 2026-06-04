import { useEffect, useState } from "react";
import "./PoliticalPartyPage.css";


function PoliticalPartyPage() {
  const [parties, setParties] = useState([]);
  const [filteredParties, setFilteredParties] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchParties();
  }, []);

  useEffect(() => {
    const filtered = parties.filter((party) =>
      party.party_name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredParties(filtered);
  }, [search, parties]);

  const fetchParties = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://egypt-voting-system.onrender.com/api/admin/parties",
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
        setParties(result.data);
        setFilteredParties(result.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="party-page">


      <h2 className="page-title">
        Political Party
      </h2>


      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search For Political Parties"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <h2 className="loading-text">
          Loading...
        </h2>
      ) : (
        <div className="party-grid">
          {filteredParties.map((party) => (
            <div
              className="party-card"
              key={party.party_id}
            >
              <div className="card-header">
                {party.party_name}
              </div>

              <div className="card-body">

                <div className="info">
                  <span>Leader Name</span>
                  <strong>
                    {party.leader_name}
                  </strong>
                </div>

                <div className="info">
                  <span>Ideology</span>
                  <strong>
                    {party.ideology}
                  </strong>
                </div>

                <div className="info">
                  <span>Found Date</span>
                  <strong>
                    {party.found_date}
                  </strong>
                </div>

                <div className="info">
                  <span>Symbol</span>
                  <strong>
                    {party.symbol}
                  </strong>
                </div>

                <div className="info">
                  <span>Governorate</span>
                  <strong>
                    {party.governorate}
                  </strong>
                </div>

                <div className="info">
                  <span>Party Number</span>
                  <strong>
                    {party.party_number}
                  </strong>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PoliticalPartyPage;