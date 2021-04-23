import React, {useState} from 'react';
import './Register.css';
import ContainerComponentProps from "../../types/ContainerComponent";
import request from "../../request";
import {AUTH_STATE_UNAUTHENTICATED} from "../../App";

const Register = (props: ContainerComponentProps) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const register = async () => {
    await request({
      path: 'users/',
      method: 'post',
      isProtected: false,
      body: {
        username, password
      }
    });

    props.setAuthState(AUTH_STATE_UNAUTHENTICATED)
  };

  return (
    <div className="login__container">

      <h1>Register</h1>

      <div className="login__input">

        <input className="login-input" type='text' value={username} placeholder='username' onChange={(e: any) => {
          setUsername(e.target.value)
        }} />
        <br/>
        <input className="login-input" type='password' value={password} placeholder='oassword' onChange={(e: any) => {
          setPassword(e.target.value)
        }} />

      </div>

      <br />

      <button className="btn-main btn--register" onClick={register}>Register</button>
    </div>
  );
};

export default Register;
