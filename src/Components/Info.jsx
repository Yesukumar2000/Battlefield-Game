import React, { useState, useEffect } from 'react';
import './info.css';

// Main App component
export default function App() {
  const [serverData, setServerData] = useState(null);
  const [mapRotation, setMapRotation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Base URL for the backend API - UPDATED FOR VERCEL
  // Vercel automatically proxies requests from /api to your functions
  const API_BASE_URL = 'https://battle-field-backend.vercel.app/api';

  useEffect(() => {
    // Function to fetch server information
    const fetchServerInfo = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/server-info`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setServerData(data);
      } catch (e) {
        console.error("Failed to fetch server info:", e);
        // More descriptive error message for the user
        setError("Failed to load server information. Please ensure the Node.js backend server is deployed correctly.");
      }
    };

    // Function to fetch map rotation data
    const fetchMapRotation = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/map-rotation`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setMapRotation(data);
      } catch (e) {
        console.error("Failed to fetch map rotation:", e);
        // More descriptive error message for the user
        setError("Failed to load map rotation. Please ensure the Node.js backend server is deployed correctly.");
      } finally {
        setLoading(false); // Set loading to false after both fetches
      }
    };

    fetchServerInfo();
    fetchMapRotation();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#1a202c', color: '#fff' }}>
        Loading server data...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#1a202c', color: '#ef4444', textAlign: 'center', padding: '20px' }}>
        Error: {error}
      </div>
    );
  }

  if (!serverData) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#1a202c', color: '#fff' }}>
        No server data available.
      </div>
    );
  }

  return (
    <>
      <div className="app-container">
        {/* Header Section */}
        <header className="header-section">
          <div className="breadcrumb">
            <span className="breadcrumb-link">MULTIPLAYERS</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-link">SERVER BROWSER</span>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">SERVER INFO</span>
          </div>
          <h1 className="main-title">SERVER INFO</h1>

          {/* Server Details */}
          <div className="server-details-card">
            <h2 className="server-name">{serverData.serverName}</h2>
            <p className="server-info-text">
              {serverData.mapName} - {serverData.gameMode}
            </p>
            <p className="server-anti-cheat-text">
              {serverData.antiCheatInfo} <a href={serverData.discordLink} target="_blank" rel="noopener noreferrer" className="discord-link">{serverData.discordLink}</a>
            </p>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="action-button join-button">
                JOIN
              </button>
              <button className="action-button secondary-button">
                SPECTATE
              </button>
              <button className="action-button secondary-button">
                JOIN AS COMMANDER
              </button>
              <button className="action-button secondary-button commander-button">
                <span className="star-icon">★</span> 13672
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="main-content">
          {/* Left Column - Players, Ping, Tickrate */}
          <div className="left-column">
            <div className="player-stats-grid">
              <div className="stat-card">
                <p className="stat-label">PLAYERS</p>
                <p className="stat-value">{serverData.players}</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">PING</p>
                <p className="stat-value">{serverData.ping}</p>
              </div>
              <div className="stat-card">
                <p className="stat-label">TICKRATE</p>
                <p className="stat-value">{serverData.tickrate}</p>
              </div>
            </div>

            {/* Settings Section */}
            <h3 className="section-title">SETTINGS</h3>
            <div className="server__setting">
              {serverData.settings.map((item, index) => (
                <div key={index}>
                  <div className="server__setting-text">{item.label}</div>
                  <div className="server__setting-text">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Advanced & Rules */}
          <div className="right-column">
            {/* Advanced Section */}
            <h3 className="section-title">ADVANCED</h3>
            <div className="advanced-grid">
              {serverData.advanced.map((item, index) => (
                <div key={index} className="server__setting">
                  <span className="server__setting-text">{item.label}</span>
                  <span className="server__setting-text">{item.value}</span>
                </div>
              ))}
            </div>

            {/* Rules Section */}
            <h3 className="section-title">RULES</h3>
            <div className="rules-grid">
              {serverData.rules.map((item, index) => (
                <div key={index} className="server__setting">
                  <span className="server__setting-text">{item.label}</span>
                  <span className="server__setting-text">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Map Rotation Section */}
        <section className="map-rotation-section">
          <h3 className="section-title">MAP ROTATION</h3>
          <div className="map-rotation-list">
            {mapRotation.map((map, index) => (
              <span key={index} className="map-tag">
                {map}
              </span>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
