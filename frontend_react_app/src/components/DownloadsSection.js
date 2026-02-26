import React, { useState } from 'react';

// PUBLIC_INTERFACE
/**
 * Downloads section component - simulates file download operations
 * Manages download queue, batch operations, and file retrieval
 */
function DownloadsSection() {
  const [urls, setUrls] = useState('');
  const [downloads, setDownloads] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);

  // PUBLIC_INTERFACE
  const startDownloads = async () => {
    const urlList = urls.split('\n').filter(url => url.trim());
    setIsDownloading(true);

    const mockDownloads = urlList.map((url, index) => ({
      id: Date.now() + index,
      url: url.trim(),
      fileName: `file_${index + 1}.${url.includes('.pdf') ? 'pdf' : url.includes('.zip') ? 'zip' : 'jpg'}`,
      progress: 0,
      status: 'queued',
      size: Math.floor(Math.random() * 5000) + 500 + ' KB'
    }));

    setDownloads(mockDownloads);

    // Simulate downloads
    for (let i = 0; i < mockDownloads.length; i++) {
      setDownloads(prev => prev.map((d, idx) =>
        idx === i ? { ...d, status: 'downloading' } : d
      ));

      // Simulate progress
      for (let progress = 0; progress <= 100; progress += 20) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setDownloads(prev => prev.map((d, idx) =>
          idx === i ? { ...d, progress } : d
        ));
      }

      setDownloads(prev => prev.map((d, idx) =>
        idx === i ? { ...d, status: 'completed', progress: 100 } : d
      ));
    }

    setIsDownloading(false);
  };

  // PUBLIC_INTERFACE
  const clearCompleted = () => {
    setDownloads(prev => prev.filter(d => d.status !== 'completed'));
  };

  return (
    <div className="section-container">
      <div className="section-header">
        <h2 className="section-title">Downloads Manager</h2>
        <p className="section-subtitle">Batch download files with queue management</p>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">Add Downloads</h3>
          <span className="status-badge idle">
            {downloads.length} files in queue
          </span>
        </div>

        <div className="form-group">
          <label className="form-label">File URLs (one per line)</label>
          <textarea
            className="form-textarea"
            placeholder="https://example.com/file1.pdf&#10;https://example.com/image.jpg&#10;https://example.com/data.zip"
            value={urls}
            onChange={(e) => setUrls(e.target.value)}
            disabled={isDownloading}
            rows={6}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            className="btn btn-primary"
            onClick={startDownloads}
            disabled={isDownloading || !urls.trim()}
          >
            {isDownloading ? <span className="spinner"></span> : '⬇️'}
            {isDownloading ? 'Downloading...' : 'Start Downloads'}
          </button>
          {downloads.length > 0 && (
            <button className="btn btn-secondary" onClick={clearCompleted}>
              🗑️ Clear Completed
            </button>
          )}
        </div>
      </div>

      {downloads.length > 0 && (
        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Download Queue</h3>
            <span className="status-badge running">
              {downloads.filter(d => d.status === 'completed').length} / {downloads.length} completed
            </span>
          </div>

          <div className="grid">
            {downloads.map(download => (
              <div key={download.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      {download.fileName}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                      {download.size}
                    </div>
                  </div>
                  <span className={`status-badge ${download.status === 'completed' ? 'success' : download.status === 'downloading' ? 'running' : 'idle'}`}>
                    {download.status === 'completed' && '✓'}
                    {download.status === 'downloading' && <span className="spinner"></span>}
                    {download.status === 'queued' && '⏳'}
                    {' '}
                    {download.status}
                  </span>
                </div>

                {download.status !== 'completed' && (
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${download.progress}%` }}></div>
                  </div>
                )}

                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem', wordBreak: 'break-all' }}>
                  {download.url}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default DownloadsSection;
