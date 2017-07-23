import * as React from 'react';
import {Link} from 'react-router-dom';

export default class Header extends React.Component<{}, {}> {
  render() {
    return (
      <header> 
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/work'>Work</Link></li>
            <li><Link to='/design'>Design</Link></li>
            <li><Link to='/cooking'>Cooking</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}
