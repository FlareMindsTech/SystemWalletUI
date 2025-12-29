import React from 'react';
import { MdGridView, MdViewList } from "react-icons/md"; // Icons needed
import './User.css';

function UserManagement() {
  return (
    <div className="user-dashboard-container">
      
      {/* --- Left Column (Mobile: Top) --- */}
      <div className="dashboard-left">
        
        {/* 1. Wallet Balance Card */}
        <div className="wallet-card">
          <div className="wallet-info">
            <h3>Wallet Balance</h3>
            <p className="wallet-amount">$ 100,000</p>
          </div>
          {/* Using a 3D wallet image similar to screenshot */}
          <img 
            src="https://cdn-icons-png.flaticon.com/512/8634/8634075.png" 
            alt="Wallet" 
            className="wallet-icon-img" 
          />
        </div>

        {/* 2. Action Button */}
        <button className="transfer-btn">
          Request for Transfer
        </button>

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

      {/* --- Right Column (Mobile: Bottom) --- */}
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
            {/* Tooltip matching screenshot */}
            <div className="chart-tooltip">
              $1,223.72
            </div>
            
            {/* SVG Wave to mimic the screenshot graph */}
            <svg viewBox="0 0 500 150" className="chart-svg" preserveAspectRatio="none">
              <path d="M0,100 C150,200 350,0 500,100 L500,150 L0,150 Z" 
                    fill="#e0cffc" stroke="none" opacity="0.4" />
              <path d="M0,100 C150,200 350,0 500,100" 
                    fill="none" stroke="#8b5cf6" strokeWidth="3" />
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