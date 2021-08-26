import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.scss';
import App from './App';

import {Provider} from 'react-redux'

import { createStore, combineReducers, applyMiddleware, compose} from 'redux';

import thunk from 'redux-thunk';

import authReducer from './store/reducers/authReducer'
import cartReducer from './store/reducers/cartReducer'

import { HashRouter } from 'react-router-dom';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
})

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
)

const app = (
  <Provider store={store}>
    <HashRouter basename='/'>
      <App/>
    </HashRouter>
  </Provider>
)

ReactDOM.render(
  app,
  document.getElementById('root')
);