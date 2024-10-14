import React, { useState, useEffect } from 'react';
import './App.css';
import AssignRoles from './AssignRoles';
import Home from './Home';
import AddMed from './AddMed';
import Supply from './Supply';
import Track from './Track';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


function App() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="App">
      <Router>
        <nav className="navbar">
          <div className="navbar-logo">
            <img src="/medl.png" alt="Logo" />
          </div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/roles">Assign Roles</Link></li>
            <li><Link to="/addmed">Add Medicine</Link></li>
            <li><Link to="/supply">Supply</Link></li>
            <li><Link to="/track">Track</Link></li>
          </ul>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </nav>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/roles" component={AssignRoles} />
          <Route path="/addmed" component={AddMed} />
          <Route path="/supply" component={Supply} />
          <Route path="/track" component={Track} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;