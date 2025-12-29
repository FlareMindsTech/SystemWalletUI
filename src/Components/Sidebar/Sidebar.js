import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdDashboard, MdPeople, MdLogout } from "react-icons/md";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Read stored auth data
  const role = localStorage.getItem("role");

  // Dynamic Sidebar Menu Based on Role
  const menuItems =
    role === "admin"
      ? [
          { name: "Dashboard", path: "/dashboard", icon: <MdDashboard /> },
          { name: "Logout", path: "/logout", icon: <MdLogout /> },
        ]
      : [
          { name: "User Management", path: "/users", icon: <MdPeople /> },
          { name: "Logout", path: "/logout", icon: <MdLogout /> },
        ];

  const confirmLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const activeItem =
    menuItems.find((item) => location.pathname.startsWith(item.path))?.name ||
    "";

  return (
    <>
      <div style={styles.sidebar}>
        <div style={styles.title}>
          <div style={styles.titleText}>SYSTEM WALLET</div>
        </div>

        <ul style={styles.menu}>
          {menuItems.map((item) => {
            const isActive = activeItem === item.name;
            const isHovered = hoveredItem === item.name;
            const isSelected = isActive || isHovered;

            return (
              <li
                key={item.name}
                style={{ ...styles.item, ...(isSelected ? styles.active : {}) }}
                onClick={() => {
                  if (item.name === "Logout") setShowLogoutModal(true);
                  else navigate(item.path);
                }}
                onMouseEnter={() => setHoveredItem(item.name)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div style={styles.itemContent}>
                  <span
                    style={{
                      ...styles.iconWrapper,
                      backgroundColor: isSelected ? "#ffffff" : "transparent",
                    }}
                  >
                    <span
                      style={{
                        ...styles.icon,
                        color: isSelected ? "#7C3AED" : "#9ca3af",
                      }}
                    >
                      {item.icon}
                    </span>
                  </span>

                  <span
                    style={{
                      ...styles.itemText,
                      color: isSelected ? "#ffffff" : "#9ca3af",
                      fontWeight: isActive ? "600" : "500",
                    }}
                  >
                    {item.name}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {showLogoutModal && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3 style={{ marginBottom: "18px" }}>
              Are you sure you want to logout?
            </h3>

            <div
              style={{ display: "flex", justifyContent: "center", gap: "14px" }}
            >
              <button
                style={styles.cancelBtn}
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
              <button style={styles.logoutBtn} onClick={confirmLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// 🎨 Styles
const styles = {
  sidebar: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000008ff",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    height: "80px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000ff",
    borderBottom: "1px solid #2d2d40",
  },
  titleText: { fontSize: "20px", fontWeight: "bold" },
  menu: {
    listStyle: "none",
    padding: "16px 0",
    margin: 0,
    flex: 1,
  },
  item: {
    padding: "10px 12px",
    margin: "4px 0",
    cursor: "pointer",
    transition: "all 0.25s ease",
    borderRadius: "14px",
  },
  itemContent: { display: "flex", alignItems: "center" },
  iconWrapper: {
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "14px",
    transition: "all 0.25s ease",
  },
  icon: { fontSize: "18px" },
  itemText: { fontSize: "14px" },
  active: { backgroundColor: "#7C3AED", margin: "6px 12px" },

  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2000,
  },
  modal: {
    background: "#ffffff",
    padding: "28px",
    width: "380px",
    textAlign: "center",
    borderRadius: "12px",
  },
  cancelBtn: {
    padding: "10px 18px",
    borderRadius: "8px",
    background: "#f1f1f1",
    border: "1px solid #999",
    cursor: "pointer",
  },
  logoutBtn: {
    padding: "10px 18px",
    borderRadius: "8px",
    background: "#e11d48",
    border: "none",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Sidebar;
