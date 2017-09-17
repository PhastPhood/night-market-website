import * as React from 'react';

import AppBackgroundContainer from './components/AppBackgroundContainer';
import Header from './components/Header';
import Lanterns from './components/Lanterns';
import Main from './components/Main';

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <div className="App__Content">
          <Header/>
          <Main />
        </div>
        <Lanterns />
        <AppBackgroundContainer/>
      </div>
    );
  }
}
