import * as React from 'react';
import {Link} from 'react-router-dom';

export default function Header() {
  return (
    <header className="Header"> 
      <nav className="Header__Nav">
        <div className="Header__HomeContainer">
          <span className="Header__HomeHalo Header__HomeHalo--1">Jeff Gao</span>
          <span className="Header__HomeHalo Header__HomeHalo--2">Jeff Gao</span>
          <Link className="Header__Home" to='/'>Jeff Gao</Link>
        </div>
        <div className="Header__NavItemContainer">
          <Link className="Header__NavItem" to='/work'>Work</Link>
          <Link className="Header__NavItem" to='/design'>Design</Link>
          <Link className="Header__NavItem" to='/cooking'>Contact</Link>
        </div>
        <div className="Header__Bar"/>
      </nav>
    </header>
  );
}
