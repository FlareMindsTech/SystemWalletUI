import { useMemo, useState, useEffect } from "react";
import { MdLightMode, MdDarkMode, MdGridView, MdTableChart } from "react-icons/md";
import Marquee from "react-fast-marquee";
import axios from "axios";
import walletIcon from "../../assets/wallet-icon-.png";
import "./User.css";

function UserManagement() {
  const [theme, setTheme] = useState("light");
  const [viewMode, setViewMode] = useState("chart");
  const [currencyData, setCurrencyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const chartPoints = useMemo(
    () => [52, 46, 14, 30, 35, 28, 32, 40, 46, 38, 36, 41, 45, 42, 37, 9],
    []
  );

  const currencySymbols = {
    USD: "$", EUR: "€", GBP: "£", JPY: "¥", AUD: "A$",
    CAD: "C$", SGD: "S$", AED: "د.إ", SAR: "﷼",
    CNY: "¥", MYR: "RM", THB: "฿", RUB: "₽"
  };

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
        const rates = response.data.rates;
        const usdToInr = rates.INR;
        const targetCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'AED', 'SGD', 'SAR', 'CNY', 'MYR', 'THB', 'RUB'];

        const formattedData = targetCurrencies.map(code => {
          const rateAgainstUsd = rates[code];
          const valueInInr = usdToInr / rateAgainstUsd;
          return {
            code: code,
            symbol: currencySymbols[code] || code,
            value: valueInInr.toFixed(2),
            change: (Math.random() * 0.5 + 0.1).toFixed(2),
            high: (valueInInr + (Math.random() * 0.5)).toFixed(2),
            isUp: Math.random() > 0.4
          };
        });

        setCurrencyData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching currency:", error);
        setLoading(false);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  return (
    <div className={`user-dashboard-container ${theme}`}>
      <div className="top-bar">
        <div className="logo-mark">
          <span className="logo-text">arralore</span>
          <span className="logo-dots">
            <span className="dot dot-1" />
            <span className="dot dot-2" />
            <span className="dot dot-3" />
            <span className="dot dot-4" />
          </span>
        </div>
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "light" ? <MdDarkMode size={18} /> : <MdLightMode size={18} />}
          {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
      </div>

      <div className="section-heading">
        <span>Current Value of 1 $</span>
      </div>

      <div className="currency-marquee">
        <Marquee gradient={false} speed={50} pauseOnHover={true}>
          {!loading && currencyData.length > 0 ? (
            currencyData.map((item, index) => (
              <div className="marquee-item" key={index}>
                <span className="currency-symbol">
                  @ {item.symbol} {item.value}
                </span>
                <span className={item.isUp ? "rate-up" : "rate-down"}>
                  {item.isUp ? '▲' : '▼'} {item.change}%
                </span>
                <span className="currency-high">
                  # {item.high}
                </span>
                <span className="separator">|</span>
              </div>
            ))
          ) : (
            <span className="loading-text">Loading live rates...</span>
          )}
        </Marquee>
      </div>

      <div className="two-column-layout">
        <div className="left-section">
          <div className="wallet-card-compact">
            <div className="wallet-copy">
              <p className="wallet-label">Wallet Balance</p>
              <p className="wallet-amount">$ 100,000</p>
            </div>
            <img
              className="wallet-img-compact"
              src={walletIcon}
              alt="Wallet"
            />
          </div>
          <button className="primary-action-compact">Request for Transfer</button>
        </div>

        <div className="right-section">
          <div className="controls-row">
            <select className="currency-select" defaultValue="Dollar ($)">
              <option>Dollar ($)</option>
              <option>Euro (€)</option>
            </select>

            <div className="view-toggle">
              <button
                className={`view-btn ${viewMode === "chart" ? "active" : ""}`}
                onClick={() => setViewMode("chart")}
                aria-label="Chart view"
              >
                <MdGridView size={18} />
              </button>
              <button
                className={`view-btn ${viewMode === "stats" ? "active" : ""}`}
                onClick={() => setViewMode("stats")}
                aria-label="Stats view"
              >
                <MdTableChart size={18} />
              </button>
            </div>
          </div>

          <div className="card chart-stats-card">
            {viewMode === "chart" ? (
              <div className="chart-wrapper">
                <div className="chart-pill">$1,223.72</div>
                <svg viewBox="0 0 320 140" preserveAspectRatio="none" className="chart-svg">
                  <defs>
                    <linearGradient id="areaFill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.05" />
                    </linearGradient>
                  </defs>
                  <polyline
                    fill="url(#areaFill)"
                    stroke="none"
                    points={chartPoints
                      .map((v, i) => `${(i / (chartPoints.length - 1)) * 320},${140 - v}`)
                      .join(" ")}
                  />
                  <polyline
                    fill="none"
                    stroke="var(--accent-strong)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    points={chartPoints
                      .map((v, i) => `${(i / (chartPoints.length - 1)) * 320},${140 - v}`)
                      .join(" ")}
                  />
                </svg>
                <div className="arrow arrow-up">↑</div>
                <div className="arrow arrow-down">↓</div>
              </div>
            ) : (
              <div className="stats-stack">
                <div className="stat-line">
                  <span>Total Deposit USD</span>
                  <strong>$1000</strong>
                </div>
                <div className="stat-line">
                  <span>Profit</span>
                  <strong className="down">0.5% ↓</strong>
                </div>
                <div className="stat-line">
                  <span>Total Standing</span>
                  <strong>$981</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="request-section">
        <div className="request-title">Request Status</div>
        <div className="request-empty">No Current Request</div>
        <div className="request-row">
          <div>
            <div className="req-name">Withdrawal Request</div>
            <div className="req-amount">$ 250</div>
            <div className="req-date">25 Dec 25'</div>
          </div>
          <div className="req-actions">
            <span className="badge">Pending</span>
            <button className="cancel-btn">Cancel Request</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;