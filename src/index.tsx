import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import './stylesheets/main.scss';

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  rootElement
);

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require<RequireImport>("./App").default;
    ReactDOM.render(
      <AppContainer>
        <NextApp />
      </AppContainer>
      ,
      rootElement
    );
  });
}
