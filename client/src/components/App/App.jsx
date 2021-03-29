import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Registration from '../Registration/Registration';
import Navbar from '../Navbar/Navbar';
import Login from '../Login/Login';
import Disk from '../Disk/Disk';

import { auth } from '../../actions/user';
import './App.scss';

function App() {
  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
  }, []);

  return (
    <Router>
      <div className="app">
        <Navbar/>
        {!isAuth
          ? <Switch>
              <Route path="/registration" component={Registration}/>
              <Route path="/login" component={Login}/>
              <Redirect to="/login"/>
            </Switch>
          : <Switch>
              <Route exact path="/" component={Disk}/>
              <Redirect to="/"/>
            </Switch>
        }
      </div>
    </Router>
  );
}

export default App;
