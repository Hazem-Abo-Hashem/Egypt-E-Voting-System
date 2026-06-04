import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./electionsPage.css";

export default function ElectionsPage() {

  const navigate = useNavigate();

  const [elections, setElections] = useState([]);

  useEffect(() => {

    const fetchElections = async () => {

      try {

        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://egypt-voting-system.onrender.com/api/election/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (data.success) {
          setElections(data.data);
        } else {
          alert(data.message);
        }

      } catch (err) {
        console.log(err);
        alert("Server error");
      }
    };

    fetchElections();

  }, []);

  const deleteElection = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this election?"
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://egypt-voting-system.onrender.com/api/election/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {

        const updated = elections.filter(
          (item) => item.election_id !== id
        );

        setElections(updated);

        alert("Election deleted successfully");

      } else {
        alert(data.message);
      }

    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (

    <div className="elections-page">

      <div className="blue-header">
        <h2>All Elections</h2>
        <p>Manage all created elections</p>
      </div>

      <div className="elections-wrapper">

        {elections.length === 0 ? (

          <p>No Elections Found</p>

        ) : (

          elections.map((item) => (

            <div
              className="election-card"
              key={item.election_id}
            >

              <div className="election-top">

                <div className="election-info">

                  <h3>{item.election_name}</h3>

                  <div className="gov">
                    📍 {item.governorate}
                  </div>

                  <div className="election-dates">
                    📅 {item.start_date?.split("T")[0]} →{" "}
                    {item.end_date?.split("T")[0]}
                  </div>

                </div>

                <button
                  className="delete-election"
                  onClick={() =>
                    deleteElection(item.election_id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))
        )}

        <button
          className="back-election"
          onClick={() => navigate("/home")}
        >
          Back
        </button>

      </div>

    </div>
  );
}