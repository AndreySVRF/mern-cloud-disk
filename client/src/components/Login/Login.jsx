import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, message } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';

import { login } from '../../actions/user';

import './Login.scss';

const Login = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const dispatch = useDispatch();
  const { alert } = useSelector(state => state.user);

  useEffect(() => {
    if (alert) {
      if (typeof (alert.message) === 'object') {
        alert.message.forEach(item => message[alert.type](item.msg));
      } else {
        message[alert.type](alert.message);
      }
    }
  }, [ alert ]);

  return (
    <div className="login">
      <div className="login__header">Вход</div>

      <form className="login__form">
        <div className="form-item">
          <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/>
        </div>
        <div className="form-item">
          <Input.Password
            placeholder="Пароль"
            iconRender={visible => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="form-item form-item-button">
          <Button type="primary" onClick={() => dispatch(login(email, password))}>Войти</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
