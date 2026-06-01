import "./DistrictCard.css";

function DistrictCard({ district }) {
  return (
    <div className="district-card">

      <div className="card-header">
        {district.name}
      </div>

      <div className="card-body">

        <div className="info">
          <span>Register Voter Count</span>
          <strong>{district.voters}</strong>
        </div>

        <div className="info">
          <span>Governorate</span>
          <strong>{district.governorate}</strong>
        </div>

        <div className="info">
          <span>District Code</span>
          <strong>{district.code}</strong>
        </div>

      </div>

    </div>
  );
}

export default DistrictCard;