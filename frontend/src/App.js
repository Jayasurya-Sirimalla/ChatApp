import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container, Paper, TextField, Button } from '@material-ui/core';
import './App.css';
import Chat from './components/Chat';
import Join from './components/Join';

function App() {
  return (
    <div className="App">
    <Router>
      <Route path="/" exact component={Join} />
      <Route path="/chat" component={Chat} />
    </Router>
    </div>
  );
}

export default App;
