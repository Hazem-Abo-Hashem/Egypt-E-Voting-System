import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function goHome(e) {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://egypt-voting-system.onrender.com/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        // حفظ التوكن
        localStorage.setItem("token", data.token);

        // حفظ بيانات الادمن (اختياري)
        localStorage.setItem("admin", JSON.stringify(data.admin_data));

        navigate("/home");
      } else {
        alert("Invalid email or password");
      }
    } catch (err) {
      console.log(err);
      alert("Server error");
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={goHome}>
        <h1>Welcome</h1>
        <p>Login to your account</p>

        <label>Email</label>
        <input
          type="email"
          placeholder="Enter Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="Enter Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}

export default Login;