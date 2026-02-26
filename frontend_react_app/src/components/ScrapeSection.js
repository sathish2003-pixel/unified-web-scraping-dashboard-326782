import React, { useState } from 'react';
import { FaRocket, FaCircle, FaCheckCircle, FaFileDownload, FaStar, FaDollarSign } from 'react-icons/fa';

// PUBLIC_INTERFACE
/**
 * Scrape section component - simulates web scraping operations
 * Provides URL input, selector configuration, and animated scraping workflow
 */
function ScrapeSection() {
  const [url, setUrl] = useState('');
  const [selectors, setSelectors] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [results, setResults] = useState(null);

  // PUBLIC_INTERFACE
  const addLog = (message, type = 'info') => {
    setLogs(prev => [...prev, { message, type, timestamp: new Date().toISOString() }]);
  };

  // PUBLIC_INTERFACE
  const simulateScrape = async () => {
    setIsRunning(true);
    setProgress(0);
    setLogs([]);
    setResults(null);

    // Simulate scraping workflow
    const steps = [
      { message: `Initializing browser session...`, delay: 500, progress: 10 },
      { message: `Navigating to ${url}...`, delay: 800, progress: 25 },
      { message: `Page loaded successfully`, type: 'success', delay: 600, progress: 40 },
      { message: `Waiting for dynamic content...`, delay: 700, progress: 55 },
      { message: `Applying selectors: ${selectors}`, delay: 500, progress: 70 },
      { message: `Extracting data from 15 elements...`, delay: 900, progress: 85 },
      { message: `Data extraction complete`, type: 'success', delay: 400, progress: 100 }
    ];

    for (const step of steps) {
      await new Promise(resolve => setTimeout(resolve, step.delay));
      addLog(step.message, step.type);
      setProgress(step.progress);
    }

    // Mock results
    const mockResults = {
      itemsFound: 15,
      dataExtracted: [
        { title: 'Product Alpha', price: '$299', rating: '4.5/5' },
        { title: 'Product Beta', price: '$199', rating: '4.8/5' },
        { title: 'Product Gamma', price: '$399', rating: '4.2/5' },
        { title: 'Product Delta', price: '$149', rating: '4.7/5' },
        { title: 'Product Epsilon', price: '$249', rating: '4.6/5' }
      ],
      executionTime: '3.5s',
      timestamp: new Date().toLocaleString()
    };

    setResults(mockResults);
    setIsRunning(false);
  };

  return (
    <div className="section-container">
      <div className="section-header">
        <h2 className="section-title">Web Scraper</h2>
        <p className="section-subtitle">Extract data from any website with simulated browser automation</p>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">Configuration</h3>
          <div className="status-badge idle">
            {isRunning ? <span className="spinner"></span> : <FaCircle />} 
            {isRunning ? 'Running' : 'Idle'}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Target URL</label>
          <input
            type="text"
            className="form-input"
            placeholder="https://example.com/products"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isRunning}
          />
        </div>

        <div className="form-group">
          <label className="form-label">CSS Selectors (comma-separated)</label>
          <input
            type="text"
            className="form-input mono"
            placeholder=".product-title, .price, .rating"
            value={selectors}
            onChange={(e) => setSelectors(e.target.value)}
            disabled={isRunning}
          />
        </div>

        <button 
          className="btn btn-primary"
          onClick={simulateScrape}
          disabled={isRunning || !url || !selectors}
        >
          {isRunning ? <span className="spinner"></span> : <FaRocket />} 
          {isRunning ? 'Scraping...' : 'Start Scraping'}
        </button>
      </div>

      {(isRunning || logs.length > 0) && (
        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Execution Log</h3>
            <span className="status-badge running">
              Progress: {progress}%
            </span>
          </div>

          {isRunning && (
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            </div>
          )}

          <div className="log-output">
            {logs.map((log, index) => (
              <div key={index} className={`log-line ${log.type}`}>
                <span className="mono">[{new Date(log.timestamp).toLocaleTimeString()}]</span> {log.message}
              </div>
            ))}
          </div>
        </div>
      )}

      {results && (
        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Results</h3>
            <span className="status-badge success"><FaCheckCircle /> {results.itemsFound} items</span>
          </div>

          <div className="grid grid-2">
            <div className="card">
              <strong>Execution Time:</strong> {results.executionTime}
            </div>
            <div className="card">
              <strong>Timestamp:</strong> {results.timestamp}
            </div>
          </div>

          <h4 style={{ marginTop: '1.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            Extracted Data (showing 5 of {results.itemsFound})
          </h4>

          <div className="grid">
            {results.dataExtracted.map((item, index) => (
              <div key={index} className="card">
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong style={{ color: 'var(--primary)' }}>{item.title}</strong>
                </div>
                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  <span><FaDollarSign style={{ fontSize: '0.75rem' }} /> {item.price}</span>
                  <span><FaStar style={{ fontSize: '0.75rem' }} /> {item.rating}</span>
                </div>
              </div>
            ))}
          </div>

          <button className="btn btn-success" style={{ marginTop: '1rem' }}>
            <FaFileDownload /> Export to JSON
          </button>
        </div>
      )}
    </div>
  );
}

export default ScrapeSection;
