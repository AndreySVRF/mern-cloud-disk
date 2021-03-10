import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { AntCloudOutlined } from '@ant-design/icons';

import './Navbar.scss';
import { logout } from '../../reducers/userReducer';

const Navbar = () => {
  const isAuth = useSelector(state => state.user.isAuth);
  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <Link to="/" className="navbar__logo">
        <AntCloudOutlined className="navbar__logo-icon"/>
        <div className="navbar__logo-title">MERM Cloud</div>
      </Link>

      <div className="navbar__links">
        {!isAuth && <Link to='/login' className="navbar__login">Войти</Link>}
        {!isAuth && <Link to='/registration' className="navbar__registration">Регистрация</Link>}
        {isAuth && <a className="navbar__logout" onClick={() => dispatch(logout())}>Выход</a>}
      </div>
    </div>
  );
};

export default Navbar;
