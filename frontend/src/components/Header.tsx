import React, { useState } from 'react';
import './Header.css';
import ContainerComponentProps from "../types/ContainerComponent";
import { AUTH_STATE_AUTHENTICATED } from "../App";

const Header = (props: ContainerComponentProps) => {
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <div className="header">

        <div className="logo">
            <h1 className="logo__name">Todui</h1>
        </div>

        {props.authState === AUTH_STATE_AUTHENTICATED && <div className="header__user-name">
            <h2 className="user-name" onClick={() => {
              setExpanded(!expanded)
            }}>{props.username.slice(0, 1).toUpperCase()}</h2>

            {expanded && <>
              <button className="btn__logout" onClick={props.logout}>Log out</button>
            </>}
        </div>}

    </div>
  );
}

export default Header;
