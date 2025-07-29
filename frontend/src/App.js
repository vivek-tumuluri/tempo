import React, { useState } from 'react';
import './App.css';
import EventSignupForm from './components/EventSignupForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5001/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ganesh_utsav_signups_${new Date().toISOString().slice(0, 10)}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        toast.success('CSV export completed successfully!');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Export failed');
      }
    } catch (error) {
      toast.error('Export failed: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <main className="App-main">
        <EventSignupForm />
        
        <div className="export-section">
          <button 
            onClick={handleExport}
            disabled={isLoading}
            className="export-button"
          >
            {isLoading ? 'Processing...' : 'Export Signups to CSV'}
          </button>
        </div>
      </main>
      
      <ToastContainer position="top-right" />
    </div>
  );
}

export default App;