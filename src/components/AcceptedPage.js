import "./AcceptedPage.css";

function AcceptedPage({ accepted, deleteAccepted }) {

  return (
    
    <div className="accepted-page">
      <div className="blue-header xc">
        <h2>Welcome , Admin !</h2>
        <p>Here's what's happening with your projects today</p>
      </div>

      <div className="accepted-wrapper">
        <h2 className="title">Accept</h2>

        <div className="cards-container">

          {accepted.length === 0 ? (
            <p>No Accepted Candidates</p>
          ) : (
            accepted.map((candidate) => (
              <div className="carda uu" key={candidate.id}>
                <div className="card-img"></div>

                <h3>{candidate.name}</h3>
                <p>Candidates For The People Assembly</p>

                <button
                  className="delete-btn"
                  onClick={() => {
                  const confirmDelete = window.confirm("Are you sure you want to delete this Candidate?");

                  if (confirmDelete) {
                  deleteAccepted(candidate.id);
                  }
                  }}
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