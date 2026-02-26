import React, { useState } from 'react';
import { 
  FaGlobe, 
  FaFilePdf, 
  FaDownload, 
  FaCog, 
  FaCheckCircle, 
  FaTimes, 
  FaClock, 
  FaChartBar, 
  FaClipboard 
} from 'react-icons/fa';

// PUBLIC_INTERFACE
/**
 * History section component - displays operation history
 * Shows past executions with filtering and detailed logs
 */
function HistorySection() {
  const [filter, setFilter] = useState('all');

  // Mock history data
  const historyItems = [
    {
      id: 1,
      type: 'scrape',
      operation: 'Web Scraping',
      target: 'https://example.com/products',
      status: 'success',
      duration: '3.5s',
      itemsProcessed: 15,
      timestamp: new Date(Date.now() - 3600000).toLocaleString()
    },
    {
      id: 2,
      type: 'pdf',
      operation: 'PDF Text Extraction',
      target: 'document.pdf',
      status: 'success',
      duration: '2.1s',
      itemsProcessed: 12,
      timestamp: new Date(Date.now() - 7200000).toLocaleString()
    },
    {
      id: 3,
      type: 'download',
      operation: 'Batch Download',
      target: '5 files',
      status: 'success',
      duration: '8.7s',
      itemsProcessed: 5,
      timestamp: new Date(Date.now() - 10800000).toLocaleString()
    },
    {
      id: 4,
      type: 'pipeline',
      operation: 'Data Pipeline',
      target: 'Product ETL Pipeline',
      status: 'success',
      duration: '6.0s',
      itemsProcessed: 1247,
      timestamp: new Date(Date.now() - 14400000).toLocaleString()
    },
    {
      id: 5,
      type: 'scrape',
      operation: 'Web Scraping',
      target: 'https://example.com/articles',
      status: 'error',
      duration: '1.2s',
      itemsProcessed: 0,
      timestamp: new Date(Date.now() - 18000000).toLocaleString()
    }
  ];

  const filteredHistory = filter === 'all' 
    ? historyItems 
    : historyItems.filter(item => item.type === filter);

  const getTypeIcon = (type) => {
    const icons = {
      scrape: FaGlobe,
      pdf: FaFilePdf,
      download: FaDownload,
      pipeline: FaCog
    };
    return icons[type] || FaClipboard;
  };

  return (
    <div className="section-container">
      <div className="section-header">
        <h2 className="section-title">Operation History</h2>
        <p className="section-subtitle">View past executions and their results</p>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">Filter History</h3>
        </div>

        <div className="form-group">
          <label className="form-label">Operation Type</label>
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Operations</option>
            <option value="scrape">Web Scraping</option>
            <option value="pdf">PDF Tools</option>
            <option value="download">Downloads</option>
            <option value="pipeline">Pipelines</option>
          </select>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">Recent Operations</h3>
          <span className="status-badge idle">{filteredHistory.length} entries</span>
        </div>

        <div className="grid">
          {filteredHistory.map(item => {
            const IconComponent = getTypeIcon(item.type);
            return (
              <div key={item.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span style={{ fontSize: '1.5rem' }}><IconComponent /></span>
                    <div>
                      <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        {item.operation}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                        {item.target}
                      </div>
                    </div>
                  </div>
                  <span className={`status-badge ${item.status === 'success' ? 'success' : 'error'}`}>
                    {item.status === 'success' ? <FaCheckCircle /> : <FaTimes />} {item.status}
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
                  <span><FaClock style={{ fontSize: '0.75rem' }} /> {item.duration}</span>
                  <span><FaChartBar style={{ fontSize: '0.75rem' }} /> {item.itemsProcessed} items</span>
                  <span><FaClock style={{ fontSize: '0.75rem' }} /> {item.timestamp}</span>
                </div>

                <button
                  className="btn btn-secondary"
                  style={{ marginTop: '0.75rem', width: '100%', fontSize: '0.875rem' }}
                >
                  <FaClipboard /> View Details
                </button>
              </div>
            );
          })}
        </div>

        {filteredHistory.length === 0 && (
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
            No operations found for this filter
          </div>
        )}
      </div>
    </div>
  );
}

export default HistorySection;
