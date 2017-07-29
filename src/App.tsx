import * as React from 'react';

import AppBackgroundContainer from './components/AppBackgroundContainer';
import Header from './components/Header';
import Main from './components/Main';

export default class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <Header/>
        <Main />
        <AppBackgroundContainer/>
      </div>
    );
  }
}
