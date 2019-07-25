import 'babel-polyfill';
import finallyShim from 'promise.prototype.finally';
finallyShim.shim();

/* eslint-disable import/first */
import React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import { reducers as widgetEditorReducers, setConfig } from 'widget-editor';
import 'widget-editor/dist/styles.min.css';

// utils
import { handleModule } from 'redux-tools';
import { initGA } from 'helpers/analytics';

// Modules
import * as AuthModule from 'modules/auth';
import * as UserModule from 'modules/user';
import * as PartnersModule from 'modules/partners';
import * as ShareModalModule from 'components/share-modal';
import * as EmbedModalModule from 'components/embed-modal';

// Reducers and routes
import * as reducers from './reducers';
import Routes from './routes';

// Pages
import * as ExploreModule from './pages/explore';
import * as ResourcesModule from './pages/resources';
import * as DatasetModule from './pages/dataset';

import '../styles/lib/custom-foundation.css';
import '../styles/index.scss';

setConfig({
  url: process.env.RW_API_URL,
  env: process.env.DATASET_ENV,
  applications: process.env.APPLICATIONS,
  authUrl: 'https://api.resourcewatch.org/auth',
  userToken: localStorage.getItem('token') || null,
  assetsPath: '/images/'
});

// Google Analytics
if (!window.GA_INITIALIZED) {
  initGA();
  window.GA_INITIALIZED = true;
}

/**
 * Reducers
 * @info(http://redux.js.org/docs/basics/Reducers.html)
 * @type {Object}
 */

const componentReducers = {
  auth: handleModule(AuthModule),
  user: handleModule(UserModule),
  partners: handleModule(PartnersModule),
  shareModal: handleModule(ShareModalModule),
  embedModal: handleModule(EmbedModalModule)
};

const pagesReducers = {
  explorePage: handleModule(ExploreModule),
  resourcePage: handleModule(ResourcesModule),
  datasetPage: handleModule(DatasetModule)
};

const reducer = combineReducers({
  ...reducers,
  ...widgetEditorReducers,
  ...componentReducers,
  ...pagesReducers,
  routing: routerReducer
});

/**
 * Global state
 * @info(http://redux.js.org/docs/basics/Store.html)
 * @type {Object}
 */
const composeEnhancers = composeWithDevTools({});
const middlewareRouter = routerMiddleware(browserHistory);
const store = createStore(
  reducer,
  composeEnhancers(
    /* The router middleware MUST be before thunk otherwise the URL changes
     * inside a thunk function won't work properly */
    applyMiddleware(middlewareRouter, thunk)
  )
);

/**
 * HTML5 History API managed by React Router module
 * @info(https://github.com/reactjs/react-router/tree/master/docs)
 * @type {Object}
 */
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    <Routes history={history} />
  </Provider>,
  document.getElementById('app')
);
