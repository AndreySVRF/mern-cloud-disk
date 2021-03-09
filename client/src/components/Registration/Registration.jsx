import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Alert, message } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';


import './Registration.scss';
import { registration } from '../../actions/user';

const Registration = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const dispatch = useDispatch();
  const { alert } = useSelector(state => state.user);

  useEffect(() => {
    if (alert) {
      if (typeof(alert.message) === 'object') {
        alert.message.forEach(item => message[alert.type](item.msg));
      } else {
        message[alert.type](alert.message);
      }
    }
  }, [ alert ]);

  return (
    <div className="registration">
      <div className="registration__header">Регистрация</div>

      <form className="registration__form">
        <div className="form-item">
          <Input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
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
          <Button type="primary" onClick={() => dispatch(registration(email, password))}>Готово</Button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
