import * as React from 'react';
import {Route, Switch} from 'react-router-dom';

import Cooking from './Cooking'
import Design from './Design'
import Home from './Home'
import Work from './Work'

export default function Main() {
  return (
    <main className="Main">
      <div className="Main__Spacer"/>
      <div className="Main__Content">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/work' component={Work}/>
          <Route path='/design' component={Design}/>
          <Route path='/cooking' component={Cooking}/>
        </Switch>
      </div>
    </main>
  );
}
