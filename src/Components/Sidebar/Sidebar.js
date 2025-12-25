import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  MdDashboard,
  MdPeople,
  MdAccountBalance,
} from "react-icons/md";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

    const menuItems = [
    { name: "AdminManagemnt", path: "/dashboard", icon: <MdDashboard /> },
   { name: "User Management", path: "/users", icon: <MdPeople /> },
    {name:"Log out", path:"/login", icon:<MdAccountBalance/>},
  ];

  const activeItem =
    menuItems.find(item => location.pathname.startsWith(item.path))?.name ||
    "Dashboard";

  return (
    <div style={styles.sidebar}>
      {/* Title */}
      <div style={styles.title}>
        <div style={styles.titleText}>SYSTEM WALLET</div>
      </div>

      {/* Menu */}
      <ul style={styles.menu}>
        {menuItems.map(item => {
          const isActive = activeItem === item.name;
          const isHovered = hoveredItem === item.name;
          const isSelected = isActive || isHovered;

          return (
            <li
              key={item.name}
              style={{
                ...styles.item,
                ...(isSelected ? styles.active : {})
              }}
              onClick={() => navigate(item.path)}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div style={styles.itemContent}>
                
                <span
                  style={{
                    ...styles.iconWrapper,
                    backgroundColor: isSelected ? "#ffffff" : "transparent"
                  }}
                >
                  <span
                    style={{
                      ...styles.icon,
                      color: isSelected ? "#7C3AED" : "#9ca3af"
                    }}
                  >
                    {item.icon}
                  </span>
                </span>

             
                <span
                  style={{
                    ...styles.itemText,
                    color: isSelected ? "#ffffff" : "#9ca3af",
                    fontWeight: isActive ? "600" : "500"
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
  );
}

const styles = {
  sidebar: {
    width: "100%",
    height: "100%",
    backgroundColor: "#000008ff",
    color: "#fff",
    display: "flex",
    flexDirection: "column"
  },

  title: {
    height: "80px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000ff",
    borderBottom: "1px solid #2d2d40"
  },

  titleText: {
    fontSize: "20px",
    fontWeight: "bold"
  },

  titleSub: {
    fontSize: "11px",
    color: "#a0a0c0"
  },

  sidebarItemHover: {
    backgroundColor: 'rgba(124, 58, 237, 0.15)',
    color: '#ffffff',
  },

  menu: {
    listStyle: "none",
    padding: "16px 0",
    margin: 0,
    flex: 1
  },

  item: {
    padding: "10px 12px",
    margin: "4px 0",
    cursor: "pointer",
    transition: "all 0.25s ease",
    borderRadius: "14px"
  },

  itemContent: {
    display: "flex",
    alignItems: "center"
  },

  iconWrapper: {
    width: "34px",
    height: "34px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "14px",
    transition: "all 0.25s ease"
  },

  icon: {
    fontSize: "18px"
  },

  itemText: {
    fontSize: "14px"
  },

  active: {
    backgroundColor: "#7C3AED",
    margin: "6px 12px"
  }
};

export default Sidebar;
