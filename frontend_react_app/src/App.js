import React, { useState } from 'react';
import './App.css';
import { 
  FaGlobe, 
  FaFilePdf, 
  FaDownload, 
  FaCog, 
  FaHistory, 
  FaBolt, 
  FaBars, 
  FaBell, 
  FaQuestionCircle 
} from 'react-icons/fa';
import ScrapeSection from './components/ScrapeSection';
import PDFToolsSection from './components/PDFToolsSection';
import DownloadsSection from './components/DownloadsSection';
import PipelinesSection from './components/PipelinesSection';
import HistorySection from './components/HistorySection';
import SettingsSection from './components/SettingsSection';

// PUBLIC_INTERFACE
/**
 * Main application component for the web scraping command center
 * Manages navigation between different sections and overall layout
 */
function App() {
  const [activeSection, setActiveSection] = useState('scrape');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const sections = [
    { id: 'scrape', label: 'Scrape', icon: FaGlobe },
    { id: 'pdf', label: 'PDF Tools', icon: FaFilePdf },
    { id: 'downloads', label: 'Downloads', icon: FaDownload },
    { id: 'pipelines', label: 'Pipelines', icon: FaCog },
    { id: 'history', label: 'History', icon: FaHistory },
    { id: 'settings', label: 'Settings', icon: FaBolt }
  ];

  // PUBLIC_INTERFACE
  const renderSection = () => {
    switch (activeSection) {
      case 'scrape':
        return <ScrapeSection />;
      case 'pdf':
        return <PDFToolsSection />;
      case 'downloads':
        return <DownloadsSection />;
      case 'pipelines':
        return <PipelinesSection />;
      case 'history':
        return <HistorySection />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <ScrapeSection />;
    }
  };

  return (
    <div className="app-container">
      {/* Top Bar */}
      <header className="top-bar">
        <button 
          className="sidebar-toggle"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>
        <h1 className="app-title">Web Scraping Command Center</h1>
        <div className="quick-actions">
          <button className="quick-action-btn" title="Notifications">
            <FaBell />
          </button>
          <button className="quick-action-btn" title="Help">
            <FaQuestionCircle />
          </button>
        </div>
      </header>

      <div className="main-layout">
        {/* Sidebar Navigation */}
        <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
          <nav className="sidebar-nav">
            {sections.map(section => {
              const IconComponent = section.icon;
              return (
                <button
                  key={section.id}
                  className={`nav-item ${activeSection === section.id ? 'active' : ''}`}
                  onClick={() => setActiveSection(section.id)}
                  title={section.label}
                >
                  <span className="nav-icon"><IconComponent /></span>
                  {!sidebarCollapsed && <span className="nav-label">{section.label}</span>}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}

export default App;
