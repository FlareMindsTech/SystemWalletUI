import React, { useMemo, useState } from 'react';
import { MdGridView, MdViewList } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import './User.css';

function UserManagement() {
  const [theme, setTheme] = useState('light');

  const isDark = theme === 'dark';
  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  const themeLabel = useMemo(() => (isDark ? 'Dark' : 'Light'), [isDark]);

  return (
    <div className={`user-dashboard-container ${isDark ? 'dark' : 'light'}`}>

      <div className="topbar">
        <div className="brand">arralore</div>
        <div className="top-actions">
          <button className="notif" aria-label="notifications">
            <IoMdNotificationsOutline size={18} />
          </button>
          <div className="avatar-chip">VA</div>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="toggle theme">
            {themeLabel} Mode
          </button>
        </div>
      </div>
      
      {/* --- Left Column --- */}
      <div className="dashboard-left">
        
        {/* 1. Wallet Balance Card */}
        <div className="wallet-card">
          <div className="wallet-info">
            <h3>Wallet Balance</h3>
            <p className="wallet-amount">$ 100,000</p>
          </div>
          <img 
            src="https://cdn-icons-png.flaticon.com/512/8634/8634075.png" 
            alt="Wallet" 
            className="wallet-icon-img" 
          />
        </div>

        {/* 2. Action Button */}
        <button className="transfer-btn">Request for Transfer</button>

        {/* 3. Current Value Stats */}
        <div className="current-value-section">
          <p className="current-value-label">Current Value of 1 $</p>
          <div className="stats-row">
            <span className="stat-item">@ 60</span>
            <span className="stat-item"># 80</span>
            <span className="stat-item">% 100</span>
            <span className="stat-item">@ 60</span>
            <span className="stat-item"># 80</span>
            <span className="stat-item">% 100</span>
          </div>
        </div>
      </div>

      {/* --- Right Column --- */}
      <div className="dashboard-right">
        
        {/* 4. Chart Section */}
        <div className="chart-container">
          <div className="chart-header">
            <select className="currency-dropdown">
              <option>Dollor ($)</option>
              <option>Euro (€)</option>
            </select>
            
            <div className="chart-toggles">
              <button className="toggle-btn active"><MdGridView /></button>
              <button className="toggle-btn inactive"><MdViewList /></button>
            </div>
          </div>

          <div className="chart-visual-area">
            <div className="chart-tooltip">
              $1,223.72
            </div>
            <svg viewBox="0 0 500 150" className="chart-svg" preserveAspectRatio="none">
              <path
                d="M0,100 C150,200 350,0 500,100 L500,150 L0,150 Z"
                style={{ fill: 'var(--chart-fill)' }}
                stroke="none"
                opacity="0.4"
              />
              <path
                d="M0,100 C150,200 350,0 500,100"
                fill="none"
                style={{ stroke: 'var(--chart-stroke)' }}
                strokeWidth="3"
              />
            </svg>
          </div>
        </div>

        {/* 5. Request Status */}
        <div className="status-section">
          <h3>Request Status</h3>
          <p className="no-request">No Current Request</p>
        </div>

      </div>
    </div>
  );
}

export default UserManagement;