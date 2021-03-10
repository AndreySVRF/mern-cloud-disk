import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';

import Registration from '../Registration/Registration';
import Login from '../Login/Login';

import { auth } from '../../actions/user';

import './App.scss';

function App() {
  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth())
  }, []);

  return (
    <Router>
      <div className="app">
        <Navbar/>
        {!isAuth &&
        <Switch>
          <Route path="/registration" component={Registration}/>
          <Route path="/login" component={Login}/>
        </Switch>
        }
      </div>
    </Router>
  );
}

export default App;
