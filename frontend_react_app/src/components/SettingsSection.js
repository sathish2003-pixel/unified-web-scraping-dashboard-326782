import React, { useState } from 'react';
import { FaSave, FaCheckCircle, FaCircle } from 'react-icons/fa';

// PUBLIC_INTERFACE
/**
 * Settings section component - manages application configuration
 * Provides API settings, preferences, and system options
 */
function SettingsSection() {
  const [settings, setSettings] = useState({
    apiTimeout: '30',
    maxRetries: '3',
    concurrentDownloads: '5',
    autoExport: true,
    darkMode: true,
    notifications: true,
    logLevel: 'info'
  });

  const [saved, setSaved] = useState(false);

  // PUBLIC_INTERFACE
  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  // PUBLIC_INTERFACE
  const saveSettings = () => {
    // Simulate save
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="section-container">
      <div className="section-header">
        <h2 className="section-title">Settings</h2>
        <p className="section-subtitle">Configure application behavior and preferences</p>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">API Configuration</h3>
        </div>

        <div className="form-group">
          <label className="form-label">Request Timeout (seconds)</label>
          <input
            type="number"
            className="form-input"
            value={settings.apiTimeout}
            onChange={(e) => handleChange('apiTimeout', e.target.value)}
            min="1"
            max="120"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Max Retries</label>
          <input
            type="number"
            className="form-input"
            value={settings.maxRetries}
            onChange={(e) => handleChange('maxRetries', e.target.value)}
            min="0"
            max="10"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Concurrent Downloads</label>
          <input
            type="number"
            className="form-input"
            value={settings.concurrentDownloads}
            onChange={(e) => handleChange('concurrentDownloads', e.target.value)}
            min="1"
            max="20"
          />
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">Preferences</h3>
        </div>

        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.autoExport}
              onChange={(e) => handleChange('autoExport', e.target.checked)}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <span className="form-label" style={{ margin: 0 }}>Auto-export results after completion</span>
          </label>
        </div>

        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.darkMode}
              onChange={(e) => handleChange('darkMode', e.target.checked)}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <span className="form-label" style={{ margin: 0 }}>Dark mode (always enabled in demo)</span>
          </label>
        </div>

        <div className="form-group">
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => handleChange('notifications', e.target.checked)}
              style={{ width: '20px', height: '20px', cursor: 'pointer' }}
            />
            <span className="form-label" style={{ margin: 0 }}>Enable notifications</span>
          </label>
        </div>

        <div className="form-group">
          <label className="form-label">Log Level</label>
          <select
            className="form-select"
            value={settings.logLevel}
            onChange={(e) => handleChange('logLevel', e.target.value)}
          >
            <option value="debug">Debug</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">About</h3>
        </div>

        <div className="grid grid-2">
          <div className="card">
            <strong>Version:</strong> 1.0.0
          </div>
          <div className="card">
            <strong>Build:</strong> 2024.01.15
          </div>
          <div className="card">
            <strong>Environment:</strong> Demo
          </div>
          <div className="card">
            <strong>Status:</strong> <span style={{ color: 'var(--success)' }}><FaCircle style={{ fontSize: '0.5rem' }} /> Online</span>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          <strong style={{ color: 'var(--text-primary)' }}>Note:</strong> This is a frontend-only demo application. All operations are simulated with mock data and do not perform actual scraping, downloads, or API calls.
        </div>
      </div>

      <button
        className={`btn ${saved ? 'btn-success' : 'btn-primary'}`}
        onClick={saveSettings}
      >
        {saved ? <><FaCheckCircle /> Settings Saved</> : <><FaSave /> Save Settings</>}
      </button>
    </div>
  );
}

export default SettingsSection;
