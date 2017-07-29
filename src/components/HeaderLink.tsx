import * as React from 'react';
import {NavLink} from 'react-router-dom';

interface HeaderLinkProps {
  to: string;
}

export default function HeaderLink(props:React.HTMLAttributes<HTMLDivElement> & HeaderLinkProps) {
  return (
    <div className="HeaderLink">
      <NavLink className="HeaderLink__Overlay" activeClassName="HeaderLink__Overlay--Active" to={props.to}>{props.children}</NavLink>
      <span className="HeaderLink__Base">{props.children}</span>
    </div>
  );
}
