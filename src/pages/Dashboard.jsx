import React, { useState } from "react";
import "./Dashboard.css";
import Users from "../components/Users";
import Roles from "../components/Roles/Roles";
import Permissions from "../components/Permission/Permissions";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("users");
  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <ul>
          <li
            className={activeSection === "users" ? "active" : ""}
            onClick={() => setActiveSection("users")}
          >
            Users
          </li>
          <li
            className={activeSection === "roles" ? "active" : ""}
            onClick={() => setActiveSection("roles")}
          >
            Roles
          </li>
          <li
            className={activeSection === "permissions" ? "active" : ""}
            onClick={() => setActiveSection("permissions")}
          >
            Permissions
          </li>
        </ul>
      </aside>

      <main className="dashboard-main">
        {activeSection === "users" && <Users />}
        {activeSection === "roles" && <Roles />}
        {activeSection === "permissions" && <Permissions/>}
      </main>
    </div>
  );
};

export default Dashboard;
