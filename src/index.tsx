/**
 * @fileoverview エントリーポイント
 * @author LeonardoKen Orihara
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import createHistory from 'history/createHashHistory'
import { Route, Switch, RouteProps } from 'react-router';
import { HashRouter } from 'react-router-dom';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import { ConnectedRouter, routerReducer as router, routerMiddleware, push } from 'react-router-redux';

import { reducer } from './reducers';
import { initialState } from './constants/initial-state';

import { AppView, AppProps } from './views/app-view';

const history = createHistory();
const routerMiddlewareImpl = routerMiddleware(history);

const store = createStore(
  combineReducers({
    ...reducer,
    router
  }),
  initialState,
  applyMiddleware(routerMiddlewareImpl)
);

const App = connect((state: AppProps & RouteProps) => {
  return state;
}, dispatch => ({

}))(AppView);

ReactDOM.render(
  // <HashRouter>
  //   <Provider store={store}>
  //     <ConnectedRouter history={history}>
  //       <Switch>
  //         {/* <Route path="/" component={App} /> */}
  //         <Route path="*" render={() => <div>404</div>} />
  //       </Switch>
  //     </ConnectedRouter>
  //   </Provider>
  // </HashRouter>,
  <span>test pages</span>,
  document.getElementById('app')
);
