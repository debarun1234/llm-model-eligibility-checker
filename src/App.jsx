import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import './index.css';

import WelcomeScreen from './components/WelcomeScreen';
import PermissionScreen from './components/PermissionScreen';
import InputScreen from './components/InputScreen';
import ScanningScreen from './components/ScanningScreen';
import ResultsScreen from './components/ResultsScreen';
import AboutScreen from './components/AboutScreen';
import TutorialScreen from './components/TutorialScreen';
import { analyzeHardware } from './services/recommendationEngine';

function App() {
  const [stage, setStage] = useState('welcome'); // welcome, permission, input, scanning, results, about, tutorial
  const [userData, setUserData] = useState(null);
  const [results, setResults] = useState(null);

  const handleStart = () => setStage('permission');

  const handlePermissionGrant = () => {
    setStage('input');
  };

  const handleInputSubmit = (data) => {
    setUserData(data);
    setStage('scanning');
  };

  const handleScanComplete = (systemData) => {
    // Analyze with user data context
    const analysis = analyzeHardware(
      systemData,
      userData?.intent,
      userData?.deviceType,
      userData?.processorType // Pass processor type for validation
    );
    setResults(analysis);
    setStage('results');
  };

  const handleRetry = () => {
    setStage('welcome');
    setUserData(null);
    setResults(null);
  };

  const handleShowAbout = () => setStage('about');
  const handleShowTutorial = () => setStage('tutorial');
  const handleBackToApp = () => setStage('welcome');

  return (
    <div className="premium-container">
      {/* Navigation Header */}
      {stage !== 'about' && stage !== 'tutorial' && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          display: 'flex',
          gap: '1rem',
          zIndex: 100
        }}>
          <button
            onClick={handleShowTutorial}
            style={{
              background: 'transparent',
              border: '1px solid var(--accent-primary)',
              color: 'var(--accent-primary)',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            📚 Tutorial
          </button>
          <button
            onClick={handleShowAbout}
            style={{
              background: 'transparent',
              border: '1px solid var(--accent-primary)',
              color: 'var(--accent-primary)',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            ℹ️ About
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {stage === 'welcome' && <WelcomeScreen key="welcome" onStart={handleStart} />}
        {stage === 'permission' && <PermissionScreen key="permission" onGrant={handlePermissionGrant} />}
        {stage === 'input' && <InputScreen key="input" onSubmit={handleInputSubmit} />}
        {stage === 'scanning' && <ScanningScreen key="scanning" onScanComplete={handleScanComplete} />}
        {stage === 'results' && <ResultsScreen key="results" results={results} onRetry={handleRetry} />}
        {stage === 'about' && <AboutScreen key="about" onBack={handleBackToApp} />}
        {stage === 'tutorial' && <TutorialScreen key="tutorial" onBack={handleBackToApp} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
