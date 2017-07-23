import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './stylesheets/main.scss';

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.render(
  <AppContainer>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppContainer>,
  rootElement
);

if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require<RequireImport>("./App").default;
    ReactDOM.render(
      <AppContainer>
        <BrowserRouter>
          <NextApp />
        </BrowserRouter>
      </AppContainer>
      ,
      rootElement
    );
  });
}
