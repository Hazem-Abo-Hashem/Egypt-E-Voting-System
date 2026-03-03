import { useNavigate } from "react-router-dom";
import "./ContactPage.css";

function ContactPage() {
  const navigate = useNavigate();

  return (
    <div className="page-contenta">

      <div className="top-bara xx">
        <h2>Welcome , Admin !</h2>
        <p>Here's what's happening with your projects today</p>
      </div>

      <div className="contact-container">

        <div className="contact-title">
          Contact Us
        </div>

        <input className="contact-input" placeholder="Name" readOnly />
        <input className="contact-input" placeholder="Email" readOnly />
        <input className="contact-input" placeholder="Phone" readOnly />
        <textarea className="contact-textarea" placeholder="Message" readOnly></textarea>

        <div className="btn-group">
           <button 
            className="replyy-btn"
            onClick={() => navigate("/reply")}
          >
            Reply
          </button>
          <button className="backk-btn" onClick={() => navigate(-1)}>Back</button>
        </div>

      </div>

    </div>
  );
}

export default ContactPage;
