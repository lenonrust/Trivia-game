import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Game from './pages/Game';
import Configuration from './pages/Configuration';
import './App.css';

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route path="/game" component={ Game } />
      <Route path="/configuration" component={ Configuration } />
    </Switch>
  );
}
