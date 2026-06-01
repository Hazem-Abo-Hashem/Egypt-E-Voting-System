import "./VoterPage.css";

const voters = [
  {
    VoterNumber: "1",
    V_National_Id: "20001011111111",
    election: "People Assembly",
    V_Name: "Hazem",
  },
  {
    VoterNumber: "2",
    V_National_Id: "20001011111111",
    election: "People Assembly",
    V_Name: "Hazem",
  },
  {
    VoterNumber: "3",
    V_National_Id: "20001011111111",
    election: "People Assembly",
    V_Name: "Hazem",
  },
  {
    VoterNumber: "4",
    V_National_Id: "20001011111111",
    election: "People Assembly",
    V_Name: "Hazem",
  },
  {
    VoterNumber: "5",
    V_National_Id: "20001011111111",
    election: "People Assembly",
    V_Name: "Hazem",
  },
   {
    VoterNumber: "6",
    V_National_Id: "20001011111111",
    election: "People Assembly",
    V_Name: "Hazem",
  },
   {
    VoterNumber: "7",
    V_National_Id: "20001011111111",
    election: "People Assembly",
    V_Name: "Hazem",
  },
   {
    VoterNumber: "8",
    V_National_Id: "20001011111111",
    election: "People Assembly",
    V_Name: "Hazem",
  },
];

function VoterPage() {
  return (
    <div className="vote-page">
      <h2 className="vote-title">Voter</h2>

      <div className="search-box">
        <input placeholder="Search for voter" />
      </div>

      <div className="table-card">
        <div className="table-header table-grid1">
          <span>VoterNumber</span>
          <span>V_National_Id</span>
          <span>Election Name</span>
          <span>V_Name</span>
        </div>

        {voters.map((v, index) => (
          <div className="table-row table-grid1" key={index}>
            <span>{v.VoterNumber}</span>
            <span>{v.V_National_Id}</span>
            <span className="link">{v.election}</span>
            <span>{v.V_Name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VoterPage;
