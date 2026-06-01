import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar bn">
      <div className="logo">Egypt E_voting <br/>system </div>

      <h3>
        <NavLink
  to="/home"
  className={() =>
    window.location.pathname === "/home" ||
    window.location.pathname === "/people-assembly" ||
    window.location.pathname === "/edit"
      ? "sidebar-link active-link"
      : "sidebar-link"
  }
>
  Management
</NavLink>
      </h3>

      <ul>
        <li>
         <NavLink
  to="/add-admin"
  className={({ isActive }) =>
    window.location.pathname.includes("admin")
      ? "sidebar-link active-link"
      : "sidebar-link"
  }
>
  Add Admin
</NavLink>
        </li>

       <li>
  <NavLink
  to="/email"
  className={({ isActive }) =>
    isActive ||
    window.location.pathname.startsWith("/file") ||
    window.location.pathname.startsWith("/candidate")
      ? "sidebar-link active-link"
      : "sidebar-link"
  }
>
  Email
</NavLink>
</li>
<li>
  <NavLink
    to="/problem"
    className={({ isActive }) =>
      isActive ||
      window.location.pathname.startsWith("/problem")
        ? "sidebar-link active-link"
        : "sidebar-link"
    }
  >
    Problem
  </NavLink>
</li>
        <li><NavLink
  to="/accepted"
  className={({ isActive }) =>
    isActive ? "sidebar-link active-link" : "sidebar-link"
  
  }
>
  Accepted
</NavLink></li>
        <li>Electoral District</li>
        <li>Political Party</li>
        <li>Vote</li>
          <li>Voter</li>
        <li>Result</li>
      </ul>
    </div>
  );
}