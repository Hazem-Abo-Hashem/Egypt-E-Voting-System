import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  function goHome(e) {
    e.preventDefault();
    navigate("/home");
  }

  return (
    <div className="login-container">
  <form onSubmit={goHome}>
    <h1>Welcome</h1>
    <p>Login to your account</p>

    <label>Email</label>
    <input type="email" placeholder="Enter Email address" required />

    <label>Password</label>
    <input type="password" placeholder="Enter Password" required />

    <button type="submit">Sign In</button>
  </form>
</div>

  );
}

export default Login;
