import * as React from 'react';
import {Link} from 'react-router-dom';

export default class Home extends React.Component<any, any> {
  render() {
    return (
      <section>
        <h1> Welcome! </h1>
        <p> I'm Jeff, and I'm a millenial Seattleite hailing from Albuqerque, New Mexico.
            I currently work as a program manager at Microsoft, where I've helped 
            to <a href="https://blogs.msdn.microsoft.com/visualstudio/2016/04/01/faster-leaner-visual-studio-installer/">
                overhaul the installation experience
            </a> and <a href="https://blogs.msdn.microsoft.com/visualstudio/2017/03/07/redgate-data-tools-in-visual-studio-2017/">
                bring new tools to developers
            </a>
            .
        </p>
        <p>
          While you’re here, please check out some of 
          my <Link to="/work">technical work</Link>,
          a few <Link to="/design">design projects</Link>,
          or <Link to="/cooking">what I’ve cooked</Link> recently.
        </p>
      </section>
    );
  }
}
