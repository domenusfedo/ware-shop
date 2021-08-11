import React from 'react';
import ReactDOM from 'react-dom';
import './index.module.scss';
import App from './App';

import {Provider} from 'react-redux'

import { createStore, combineReducers, applyMiddleware, compose} from 'redux';

import thunk from 'redux-thunk';

import cartReducer from './store/reducers/cartReducer'
import searchReducer from './store/reducers/searchReducer'
import shopReducer from './store/reducers/shopReducer'

import { HashRouter } from 'react-router-dom';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  cart: cartReducer,
  shop: shopReducer,
  search: searchReducer
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