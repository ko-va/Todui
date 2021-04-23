import React, { FC, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Board from "./components/Board";
import Login from './components/auth/Login'
import Register from './components/auth/Register'

export const AUTH_STATE_UNAUTHENTICATED = 'unauthenticated'
export const AUTH_STATE_AUTHENTICATED = 'authenticated'
export const AUTH_STATE_REGISTER = 'register'

export const LOCAL_STORAGE_TOKEN_KEY = 'accessToken'
export const LOCAL_STORAGE_USERNAME_KEY = 'username'

const App: FC = () => {
  const [token, _setToken] = useState(localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY))
  const [username, setUsername] = useState<string>(localStorage.getItem(LOCAL_STORAGE_USERNAME_KEY) || '')
  const [authState, setAuthState] = useState(token ? AUTH_STATE_AUTHENTICATED : AUTH_STATE_UNAUTHENTICATED);

  const setToken = (token: string, username: string) => {
    _setToken(token)
    setAuthState(AUTH_STATE_AUTHENTICATED)
    localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token)
    localStorage.setItem(LOCAL_STORAGE_USERNAME_KEY, username)
    setUsername(username)
  }

  const logout = () => {
    _setToken(null)
    setAuthState(AUTH_STATE_UNAUTHENTICATED)
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY)
    localStorage.removeItem(LOCAL_STORAGE_USERNAME_KEY)
  }

  const props = { logout, setToken, setAuthState, authState, username }

  const render = () => {
    if (authState === AUTH_STATE_AUTHENTICATED) {
      return <Board {...props} />
    } else if (authState === AUTH_STATE_REGISTER) {
      return <Register {...props} />
    } else if (authState === AUTH_STATE_UNAUTHENTICATED) {
      return <Login {...props} />
    }

    return null
  }

  return (
    <div className="App">
      <Header {...props} />
      {render()}
    </div>
  );
}

export default App;
