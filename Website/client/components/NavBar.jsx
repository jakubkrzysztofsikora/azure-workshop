import React from 'react';
import LogInButton from './LogInButton'

const NavBar = ({getData}) => {
  return (
    <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div className="container">
        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        ><ul className="nav navbar-nav navbar-right">
        <li>
          <LogInButton getData={getData}/>
        </li>
      </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
