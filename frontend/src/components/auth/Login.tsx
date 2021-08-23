import React, { useState } from "react";
import './Login.css';
import ContainerComponentProps from '../../types/ContainerComponent';
import request from "../../request";
import {AUTH_STATE_REGISTER} from "../../App";

const Login = (props: ContainerComponentProps) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = async () => {
    const data = await request({
      path: 'users/auth',
      method: 'post',
      isProtected: false,
      body: {
        username, password
      }
    });

    if (data.token) {
      props.setToken(data.token, username)
    }
  };

  return (
    <div className="login__container">

      <h1>Hi there!</h1>

      <div className="login__form">

        <div className="login__input">
          <input className="login-input" type='text' value={username} placeholder='username' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setUsername(e.target.value)
          }} />

          <br />

          <input className="login-input" type='password' value={password} placeholder='password' onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value)
          }} />

        </div>

        <br />

        <button className="btn-main" onClick={login}>Login</button>

        <p>or</p>

        <button className="btn-main" onClick={() => props.setAuthState(AUTH_STATE_REGISTER)}>Register</button>

      </div>

    </div>
  );
};

export default Login;
