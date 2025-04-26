import React, { useEffect, useState } from 'react';
import HighlightList from './components/HighlightList';

const App: React.FC = () => {
  const [highlights, setHighlights] = useState < string[] > ([]);

  useEffect(() => {
    if (chrome?.storage?.local) {
      chrome.storage.local.get('highlights', (result) => {
        setHighlights(result.highlights || []);
      });
    }
  }, []);

  const clearAll = () => {
    if (chrome?.storage?.local) {
      chrome.storage.local.set({ highlights: [] });
    }
    setHighlights([]);
  };

  return (
    <div className="app-container">
      <h1>Saved Texts</h1>
      <HighlightList highlights={highlights} />
      <button onClick={clearAll}>Clear All</button>
    </div>
  );
};

export default App;
