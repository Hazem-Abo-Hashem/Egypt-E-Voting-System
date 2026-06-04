import "./AcceptedPage.css";
import { useEffect, useState } from "react";

function AcceptedPage() {
  const [accepted, setAccepted] = useState([]);

  // 🔥 تحميل الداتا من الباك
  useEffect(() => {
    const fetchAccepted = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(
          "https://egypt-voting-system.onrender.com/api/admin/candidates/accepted",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await res.json();

        if (data.success) {
          setAccepted(data.data);
        } else {
          alert("Error: " + data.message);
        }
      } catch (err) {
        console.log(err);
        alert("Server error");
      }
    };

    fetchAccepted();
  }, []);

  // 🔥 delete من الباك
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Candidate?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://egypt-voting-system.onrender.com/api/admin/candidates/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(data.message);

        // حذف من الواجهة
        setAccepted((prev) =>
          prev.filter((c) => c.candidate_id !== id)
        );
      } else {
        alert("Error: " + data.message);
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  };

  return (
    <div className="accepted-page">
      <div className="blue-header xc">
        <h2>Welcome , Admin !</h2>
      </div>

      <div className="accepted-wrapper">
        <h2 className="title">Accepted Candidates</h2>

        <div className="cards-container">
          {accepted.length === 0 ? (
            <p>No Accepted Candidates</p>
          ) : (
            accepted.map((candidate) => (
              <div className="carda uu" key={candidate.candidate_id}>
                <div className="card-img">
                  {candidate.personal_photos_url && (
                    <img
                      src={candidate.personal_photos_url}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "20px",
                      }}
                    />
                  )}
                </div>

                <h3>{candidate.full_name}</h3>
                <p>{candidate.candidate_type}</p>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(candidate.candidate_id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AcceptedPage;