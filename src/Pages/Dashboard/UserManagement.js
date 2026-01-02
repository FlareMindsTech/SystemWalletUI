import React, { useMemo, useState, useEffect } from "react";
import { MdGridView, MdViewList } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import "./User.css";

function UserManagement() {
  const [theme, setTheme] = useState("light");
  const [rates, setRates] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeTab, setActiveTab] = useState("chart"); // chart | stats

  const isDark = theme === "dark";
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  const themeLabel = useMemo(() => (isDark ? "Dark" : "Light"), [isDark]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch currency rates
  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch(
          "https://api.frankfurter.app/latest?from=USD&to=INR"
        );
        const data = await res.json();
        if (!data?.rates?.INR) throw new Error();

        const inr = data.rates.INR.toFixed(2);
        setRates([
          `1$ = ₹${inr}`,
          `Yesterday: ₹${(inr - 0.15).toFixed(2)}`,
          `High: ₹${(inr + 0.25).toFixed(2)}`,
          `Low: ₹${(inr - 0.3).toFixed(2)}`,
        ]);
      } catch {
        setError("Currency data unavailable");
      } finally {
        setLoading(false);
      }
    };
    fetchRate();
  }, []);

  return (
    <div className={`user-dashboard-container ${isDark ? 'dark' : 'light'}`}>
  
  {/* Topbar */}
  <div className="topbar">
    <div className="brand">arralore</div>
    <div className="top-actions">
      <button className="notif"><IoMdNotificationsOutline size={18} /></button>
      <div className="avatar-chip">VA</div>
      <button className="theme-toggle" onClick={toggleTheme}>
        {themeLabel} Mode
      </button>
    </div>
  </div>

  {/* Current Value Strip - Desktop only */}
  {!isMobile && (
    <div className="current-strip">
      <span>Current Value of 1 $</span>
      <div className="strip-values">
        <span>@ 60</span><span># 80</span><span>% 100</span>
        <span>@ 60</span><span># 80</span><span>% 100</span>
      </div>
    </div>
  )}

  {/* Main Desktop Row */}
  <div className="desktop-main">

    {/* Wallet - Left Column */}
    <div className="wallet-card">
      <div>
        <h3>Currency Balance</h3>
        <p className="wallet-amount">$ 100,000</p>
      </div>
      <img
        src="https://cdn-icons-png.flaticon.com/512/8634/8634075.png"
        className="wallet-icon-img"
        alt="wallet"
      />
      <button className="transfer-btn">Request for Withdrawal</button>
    </div>

    {/* Chart - Middle Column */}
    <div className="chart-container">
      <div className="chart-header">
        <select className="currency-dropdown">
          <option>Dollor ($)</option>
        </select>
        
        {/* Mobile Toggle (hidden on desktop) */}
        {isMobile && (
          <div className="view-toggle">
            <button
              className={activeTab === "chart" ? "active" : ""}
              onClick={() => setActiveTab("chart")}
            >
              <MdGridView size={18} />
            </button>
            <button
              className={activeTab === "stats" ? "active" : ""}
              onClick={() => setActiveTab("stats")}
            >
              <MdViewList size={18} />
            </button>
          </div>
        )}
      </div>

      {/* Chart Area */}
      {(!isMobile || activeTab === "chart") && (
        <div className="chart-visual-area">
          <div className="chart-tooltip">$1,223.72</div>
          <svg viewBox="0 0 500 150" className="chart-svg">
            <path
              d="M0,100 C150,200 350,0 500,100 L500,150 L0,150 Z"
              style={{ fill: 'var(--chart-fill)' }}
            />
            <path
              d="M0,100 C150,200 350,0 500,100"
              fill="none"
              style={{ stroke: 'var(--chart-stroke)' }}
              strokeWidth="3"
            />
          </svg>
        </div>
      )}

      {/* Stats (mobile view only) */}
      {isMobile && activeTab === "stats" && (
        <div className="inner-stats">
          <p><strong>Total Deposit USD</strong> <span>$1000</span></p>
          <p><strong>Profit</strong> <span className="down">0.5% ↓</span></p>
          <p><strong>Total Standing</strong> <span>$981</span></p>
        </div>
      )}
    </div>

    {/* Stats - Right Column (Desktop only) */}
    {!isMobile && (
      <div className="stats-card">
        <p><strong>Total Deposit USD</strong> <span>$1000</span></p>
        <p><strong>Profit</strong> <span className="down">0.5% <span className="arrow">↓</span></span></p>
        <p><strong>Total Standing</strong> <span>$981</span></p>
      </div>
    )}

  </div>

  {/* Request Status - Show in BOTH views */}
  <div className="status-section">
    <h3>Request Status</h3>
    <p>No Current Request</p>
  </div>

  {/* Withdrawal List - Show in BOTH views */}
  <div className="withdrawal-list">
    <h3>Withdrawal History</h3>
    <p>No withdrawal history available</p>
  </div>

</div>
  );
}

export default UserManagement;