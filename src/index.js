import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.scss';
import App from './App';

import { HashRouter } from 'react-router-dom';

const app = (
  <HashRouter basename='/'>
    <App/>
  </HashRouter>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);