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
      {/* Navigation Header - Glassmorphism Style */}
      {stage !== 'about' && stage !== 'tutorial' && (
        <div style={{
          position: 'absolute',
          top: '1.5rem',
          right: '1.5rem',
          display: 'flex',
          gap: '0.75rem',
          zIndex: 100
        }}>
          <button
            onClick={handleShowTutorial}
            className="glass-nav-button"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1.5px solid rgba(0, 229, 255, 0.3)',
              color: 'var(--accent-primary)',
              padding: '0.6rem 1.2rem',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, rgba(0, 229, 255, 0.15), rgba(0, 229, 255, 0.05))';
              e.target.style.borderColor = 'var(--accent-primary)';
              e.target.style.boxShadow = '0 0 20px rgba(0, 229, 255, 0.4), 0 4px 20px rgba(0, 0, 0, 0.3)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))';
              e.target.style.borderColor = 'rgba(0, 229, 255, 0.3)';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <span>📚</span>
            Tutorial
          </button>
          <button
            onClick={handleShowAbout}
            className="glass-nav-button"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1.5px solid rgba(0, 229, 255, 0.3)',
              color: 'var(--accent-primary)',
              padding: '0.6rem 1.2rem',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'linear-gradient(135deg, rgba(0, 229, 255, 0.15), rgba(0, 229, 255, 0.05))';
              e.target.style.borderColor = 'var(--accent-primary)';
              e.target.style.boxShadow = '0 0 20px rgba(0, 229, 255, 0.4), 0 4px 20px rgba(0, 0, 0, 0.3)';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))';
              e.target.style.borderColor = 'rgba(0, 229, 255, 0.3)';
              e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            <span>ℹ️</span>
            About
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
