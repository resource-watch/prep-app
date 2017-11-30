/* eslint-disable import/first */


import React from 'react';
import { render } from 'react-dom';
import initOpbeat from 'opbeat-react';
import { createOpbeatMiddleware } from 'opbeat-react/redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';
import * as reducers from './reducers';
import Routes from './routes';

// Modules
import * as DatasetFilterModule from 'components/dataset-filter/dataset-filter';
import * as AuthModule from 'components/auth/auth';
import * as UserModule from 'components/user/user';

// utils
import { handleModule } from 'redux-actions';

import '../styles/lib/custom-foundation.css';
import '../styles/index.scss';

/**
 * Monitoring with Opbeat
 */
if (process.env.NODE_ENV === 'production') {
  initOpbeat({
    orgId: process.env.OPBEAT_ORG_ID,
    appId: process.env.OPBEAT_APP_ID
  });
}

/**
 * Reducers
 * @info(http://redux.js.org/docs/basics/Reducers.html)
 * @type {Object}
 */

const componentReducers = {
  datasetFilter: handleModule(DatasetFilterModule),
  auth: handleModule(AuthModule),
  user: handleModule(UserModule)
};

const reducer = combineReducers({
  ...reducers,
  ...componentReducers,
  routing: routerReducer
});

/**
 * Global state
 * @info(http://redux.js.org/docs/basics/Store.html)
 * @type {Object}
 */
const middlewareRouter = routerMiddleware(browserHistory);
const store = createStore(
  reducer,
  compose(
    /* The router middleware MUST be before thunk otherwise the URL changes
     * inside a thunk function won't work properly */
    applyMiddleware(middlewareRouter, thunk, createOpbeatMiddleware()),
    /* Redux dev tool, install chrome extension in
     * https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en */
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
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
