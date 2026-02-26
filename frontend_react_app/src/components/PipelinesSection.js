import React, { useState } from 'react';

// PUBLIC_INTERFACE
/**
 * Pipelines section component - simulates data transformation workflows
 * Provides multi-step pipeline creation and execution with visual progress
 */
function PipelinesSection() {
  const [pipelineName, setPipelineName] = useState('');
  const [selectedSteps, setSelectedSteps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [pipelineResult, setPipelineResult] = useState(null);

  const availableSteps = [
    { id: 'scrape', name: 'Web Scraping', icon: '🌐' },
    { id: 'clean', name: 'Data Cleaning', icon: '🧹' },
    { id: 'transform', name: 'Transform Data', icon: '🔄' },
    { id: 'validate', name: 'Validation', icon: '✓' },
    { id: 'export', name: 'Export Results', icon: '📤' }
  ];

  // PUBLIC_INTERFACE
  const toggleStep = (stepId) => {
    if (selectedSteps.includes(stepId)) {
      setSelectedSteps(selectedSteps.filter(id => id !== stepId));
    } else {
      setSelectedSteps([...selectedSteps, stepId]);
    }
  };

  // PUBLIC_INTERFACE
  const runPipeline = async () => {
    setIsRunning(true);
    setCurrentStep(0);
    setPipelineResult(null);

    for (let i = 0; i < selectedSteps.length; i++) {
      setCurrentStep(i);
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    setCurrentStep(selectedSteps.length);

    // Mock result
    setPipelineResult({
      pipelineName,
      stepsCompleted: selectedSteps.length,
      recordsProcessed: 1247,
      duration: (selectedSteps.length * 1.5).toFixed(1) + 's',
      status: 'success',
      timestamp: new Date().toLocaleString()
    });

    setIsRunning(false);
  };

  return (
    <div className="section-container">
      <div className="section-header">
        <h2 className="section-title">Data Pipelines</h2>
        <p className="section-subtitle">Create multi-step data transformation workflows</p>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h3 className="panel-title">Pipeline Configuration</h3>
        </div>

        <div className="form-group">
          <label className="form-label">Pipeline Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="My Data Pipeline"
            value={pipelineName}
            onChange={(e) => setPipelineName(e.target.value)}
            disabled={isRunning}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Pipeline Steps (select in order)</label>
          <div className="grid grid-2">
            {availableSteps.map(step => (
              <div
                key={step.id}
                className="card"
                onClick={() => !isRunning && toggleStep(step.id)}
                style={{
                  cursor: isRunning ? 'not-allowed' : 'pointer',
                  border: selectedSteps.includes(step.id) ? '2px solid var(--indigo-primary)' : '1px solid var(--border-color)',
                  background: selectedSteps.includes(step.id) ? 'rgba(99, 102, 241, 0.1)' : 'var(--bg-secondary)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{step.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{step.name}</div>
                    {selectedSteps.includes(step.id) && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--indigo-light)' }}>
                        Step {selectedSteps.indexOf(step.id) + 1}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="btn btn-primary"
          onClick={runPipeline}
          disabled={isRunning || !pipelineName || selectedSteps.length === 0}
        >
          {isRunning ? <span className="spinner"></span> : '▶️'}
          {isRunning ? 'Running Pipeline...' : 'Execute Pipeline'}
        </button>
      </div>

      {isRunning && (
        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Pipeline Execution</h3>
            <span className="status-badge running">
              Step {currentStep + 1} of {selectedSteps.length}
            </span>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            {selectedSteps.map((stepId, index) => {
              const step = availableSteps.find(s => s.id === stepId);
              const status = index < currentStep ? 'completed' : index === currentStep ? 'running' : 'pending';

              return (
                <div
                  key={stepId}
                  className="card"
                  style={{
                    marginBottom: '0.75rem',
                    border: status === 'running' ? '1px solid var(--indigo-primary)' : '1px solid var(--border-color)',
                    opacity: status === 'pending' ? 0.5 : 1
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{step.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600 }}>{step.name}</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Step {index + 1}
                      </div>
                    </div>
                    {status === 'completed' && <span style={{ color: 'var(--success)' }}>✓</span>}
                    {status === 'running' && <span className="spinner"></span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {pipelineResult && (
        <div className="panel">
          <div className="panel-header">
            <h3 className="panel-title">Pipeline Complete</h3>
            <span className="status-badge success">✓ Success</span>
          </div>

          <div className="grid grid-3">
            <div className="card">
              <strong>Pipeline:</strong> {pipelineResult.pipelineName}
            </div>
            <div className="card">
              <strong>Steps:</strong> {pipelineResult.stepsCompleted}
            </div>
            <div className="card">
              <strong>Duration:</strong> {pipelineResult.duration}
            </div>
            <div className="card">
              <strong>Records:</strong> {pipelineResult.recordsProcessed}
            </div>
            <div className="card">
              <strong>Status:</strong> {pipelineResult.status}
            </div>
            <div className="card">
              <strong>Completed:</strong> {pipelineResult.timestamp}
            </div>
          </div>

          <button className="btn btn-success" style={{ marginTop: '1rem' }}>
            💾 Save Pipeline
          </button>
        </div>
      )}
    </div>
  );
}

export default PipelinesSection;
