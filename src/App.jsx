import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import './index.css';

import WelcomeScreen from './components/WelcomeScreen';
import PermissionScreen from './components/PermissionScreen';
import InputScreen from './components/InputScreen';
import ScanningScreen from './components/ScanningScreen';
import ResultsScreen from './components/ResultsScreen';
import { analyzeHardware } from './services/recommendationEngine';

function App() {
  const [stage, setStage] = useState('welcome'); // welcome, permission, input, scanning, results
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
  }

  return (
    <div className="premium-container">
      <AnimatePresence mode="wait">
        {stage === 'welcome' && <WelcomeScreen key="welcome" onStart={handleStart} />}
        {stage === 'permission' && <PermissionScreen key="permission" onGrant={handlePermissionGrant} />}
        {stage === 'input' && <InputScreen key="input" onSubmit={handleInputSubmit} />}
        {stage === 'scanning' && <ScanningScreen key="scanning" onScanComplete={handleScanComplete} />}
        {stage === 'results' && <ResultsScreen key="results" results={results} onRetry={handleRetry} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
