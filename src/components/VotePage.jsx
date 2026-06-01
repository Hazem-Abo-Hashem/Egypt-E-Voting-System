import "./VotePage.css";

const votes = [
  {
    code: "A7m#kp2$",
    time: "11:00",
    date: "11/1/2025",
    nationalId: "20001011111111",
    election: "People Assembly",
    candidateId: "2542897506748",
  },
  {
    code: "ZQ4@lm9!",
    time: "11:01",
    date: "11/1/2025",
    nationalId: "20002022222222",
    election: "People Assembly",
    candidateId: "2542897506748",
  },
  {
    code: "ZQ4@lm9!",
    time: "11:02",
    date: "11/1/2025",
    nationalId: "20002022222333",
    election: "People Assembly",
    candidateId: "2542897506748",
  },
  {
    code: "ZQ4@lm9!",
    time: "11:03",
    date: "12/1/2025",
    nationalId: "20002022222444",
    election: "People Assembly",
    candidateId: "2542897506748",
  },
  {
    code: "ZQ4@lm9!",
    time: "11:04",
    date: "12/1/2025",
    nationalId: "20002022222555",
    election: "People Assembly",
    candidateId: "2542897506748",
  },
];

function VotePage() {
  return (
    <div className="vote-page">
      <h2 className="vote-title">Vote</h2>

      <div className="search-box">
        <input placeholder="Search for voter" />
      </div>

      <div className="table-card">
        <div className="table-header table-grid">
          <span>V Code</span>
          <span>Time</span>
          <span>Date</span>
          <span>V National Id</span>
          <span>Election Name</span>
          <span>C National Id</span>
        </div>

        {votes.map((v, index) => (
          <div className="table-row table-grid" key={index}>
            <span>{v.code}</span>
            <span>{v.time}</span>
            <span>{v.date}</span>
            <span>{v.nationalId}</span>
            <span className="link">{v.election}</span>
            <span>{v.candidateId}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VotePage;
