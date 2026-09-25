import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectsTab from "./tabs/ProjectsTab";
import SkillsTab from "./tabs/SkillsTab";
import ExperienceTab from "./tabs/ExperienceTab";
import EducationTab from "./tabs/EducationTab";
import CertificatesTab from "./tabs/CertificatesTab";
import AboutTab from "./tabs/AboutTab";
import "../../css/Dashboard.css";

const TABS = [
  { name: "Projects", icon: "📁" },
  { name: "Skills", icon: "🛠️" },
  { name: "Experience", icon: "💼" },
  { name: "Education", icon: "🎓" },
  { name: "Certificates", icon: "🏅" },
  { name: "About", icon: "👤" },
];

function Dashboard() {
  const [activeTab, setActiveTab] = useState("Projects");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Admin";

  const handleLogout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/admin/login");
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard">
      <button
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        ☰
      </button>

      <aside className={`dashboard-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="sidebar-avatar">
            {username.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="sidebar-username">{username}</div>
            <div className="sidebar-role">Administrator</div>
          </div>
        </div>

        <nav>
          {TABS.map((tab) => (
            <button
              key={tab.name}
              className={activeTab === tab.name ? "tab-btn active" : "tab-btn"}
              onClick={() => handleTabClick(tab.name)}
            >
              <span className="tab-icon">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>
            <span>🚪</span> Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <main className="dashboard-content">
        <div className="content-header">
          <h1>{activeTab}</h1>
        </div>

        {activeTab === "Projects" && <ProjectsTab />}
        {activeTab === "Skills" && <SkillsTab />}
        {activeTab === "Experience" && <ExperienceTab />}
        {activeTab === "Education" && <EducationTab />}
        {activeTab === "Certificates" && <CertificatesTab />}
        {activeTab === "About" && <AboutTab />}
      </main>
    </div>
  );
}

export default Dashboard;
