//all imports
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Taskpage from './components/Taskpage';
import { useEffect, useState } from 'react';


//app functions
function App() {
  const [clientId,setclientId] = useState("");

  const handleLogin = (idd) => {
    setclientId(idd);
    localStorage.setItem('clientId', idd);
  };

  useEffect(() => {
    // Retrieve clientId from localStorage when the component mounts
    const storedClientId = localStorage.getItem('clientId');
    if (storedClientId) {
      setclientId(storedClientId);
    }
  }, []);

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/"element={<Homepage onLogin={handleLogin}/>}/>
        <Route path={`/Task-page`}element={<Taskpage identify={clientId} />}/>
      </Routes>
    </Router>
  );
}

export default App;
