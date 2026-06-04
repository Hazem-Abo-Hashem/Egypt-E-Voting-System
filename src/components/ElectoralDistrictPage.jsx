import { useEffect, useState } from "react";
import "./ElectoralDistrictPage.css";

function ElectoralDistrictPage() {
  const [districts, setDistricts] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDistricts();
  }, []);

  useEffect(() => {
    const filtered = districts.filter((district) =>
      district.district_name
        .toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredDistricts(filtered);
  }, [search, districts]);

  const fetchDistricts = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "https://egypt-voting-system.onrender.com/api/admin/districts",
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
        setDistricts(result.data);
        setFilteredDistricts(result.data);
      } else {
        setError("Failed to load districts");
      }
    } catch (err) {
      console.error(err);
      setError("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="district-page">

      <h2 className="page-title">
        Electoral District
      </h2>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search For Electoral Districts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading && (
        <h3 style={{ textAlign: "center" }}>
          Loading...
        </h3>
      )}

      {error && (
        <h3
          style={{
            textAlign: "center",
            color: "red",
          }}
        >
          {error}
        </h3>
      )}

      {!loading && !error && (
        <div className="district-grid">
          {filteredDistricts.map((district) => (
            <div
              className="district-card"
              key={district.district_id}
            >
              <div className="card-header">
                {district.district_name}
              </div>

              <div className="card-body">
                <div className="info">
                  <span>Register Voter Count</span>
                  <strong>
                    {district.register_voter_count}
                  </strong>
                </div>

                <div className="info">
                  <span>Governorate</span>
                  <strong>
                    {district.governorate}
                  </strong>
                </div>

                <div className="info">
                  <span>District Code</span>
                  <strong>
                    {district.district_code}
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

export default ElectoralDistrictPage;