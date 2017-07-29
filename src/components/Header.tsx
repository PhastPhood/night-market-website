import * as React from 'react';
import {NavLink} from 'react-router-dom';

import HeaderLink from './HeaderLink';

export default function Header() {
  return (
    <header className="Header"> 
      <nav className="Header__Nav">
        <div className="Header__HomeContainer">
          <span className="Header__HomeHalo Header__HomeHalo--1">Jeff Gao</span>
          <span className="Header__HomeHalo Header__HomeHalo--2">Jeff Gao</span>
          <NavLink className="Header__Home" activeClassName="Header__Home--Active" exact to='/'>
            Jeff Gao
          </NavLink>
        </div>
        <div className="Header__NavLinkOuterContainer">
          <div className="Header__NavLinkContainer">
            <HeaderLink to='/work'>Work</HeaderLink>
            <HeaderLink to='/design'>Design</HeaderLink>
            <HeaderLink to='/cooking'>Contact</HeaderLink>
          </div>
          <div className="Header__Bar"/>
        </div>
      </nav>
    </header>
  );
}
