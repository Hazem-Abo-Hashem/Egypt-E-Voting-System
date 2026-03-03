import { useNavigate } from "react-router-dom";
import "./ReplyPage.css";

function ReplyPage() {
  const navigate = useNavigate();

  return (
    <div className="page-contentaa">

      <div className="reply-container">

        <div className="reply-title">
          Reply To The Email
        </div>

        <input
          type="email"
          placeholder="Email"
          className="reply-input"
        />

        <textarea
          placeholder="Message"
          className="reply-textarea"
        ></textarea>

        <div className="reply-buttons">
          <button className="sendd-btn">Send</button>
          <button className="backk-btn" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>

      </div>

    </div>
  );
}

export default ReplyPage;