import React from 'react'
import './User.css'
function UserManagement() {
  return (
   <div className="wallet-page">

      {/* Main Content */}
      <div className="content">

        {/* Balance Card */}
        <div className="wallet-card">
          <div>
            <p className="label">Wallet Balance</p>
            <h2>$ 100,000</h2>
          </div>
          <img src="https://via.placeholder.com/70" className="wallet-img" alt="wallet" />
        </div>

        {/* Button */}
        <button className="transfer-btn">Request for Transfer</button>

        {/* Value Section */}
        <p className="current-text">Current Value of 1 $</p>
        <div className="percent-row">
          <span>@ 60</span><span># 80</span><span>% 100</span>
          <span>@ 60</span><span># 80</span><span>% 100</span>
        </div>

        {/* Chart */}
        <div className="chart-container">
          <select className="dropdown">
            <option>Dollar ($)</option>
          </select>
          <div className="chart-icons">
            <span>🔲</span>
            <span>📦</span>
          </div>
          <div className="chart-box">
            📈 Chart Sample Area
          </div>
        </div>

        {/* Status */}
        <div className="status-card">
          <h4>Request Status</h4>
          <p>No Current Request</p>
        </div>
      </div>
    </div>

  )
}

export default UserManagement