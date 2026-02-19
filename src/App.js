import React from 'react';
import './App.css';
import LeftPart from './components/LeftPart';
import RightPart from './components/RightPart';

function App() {
  return (
    <div className="app-container">
      <LeftPart />
      <RightPart />
    </div>
  );
}

export default App;