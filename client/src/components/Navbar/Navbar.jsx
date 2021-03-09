import React from 'react';
import { Link } from 'react-router-dom';

import { AntCloudOutlined } from '@ant-design/icons';

import './Navbar.scss';

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="navbar__logo">
        <AntCloudOutlined className="navbar__logo-icon"/>
        <div className="navbar__logo-title">MERM Cloud</div>
      </Link>

      <div className="navbar__links">
        <Link to='/login' className="navbar__login">Войти</Link>
        <Link to='/registration' className="navbar__registration">Регистрация</Link>
      </div>
    </div>
  );
};

export default Navbar;
