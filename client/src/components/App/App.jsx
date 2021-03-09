import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

import Registration from '../Registration/Registration';

import './App.scss';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar/>
        <Switch>
          <Route path="/registration" component={Registration}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
