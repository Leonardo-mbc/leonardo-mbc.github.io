import * as React from 'react';
import { Route, Redirect, RouteProps, Switch, RouteComponentProps } from 'react-router';
import * as styles from './style.css';

export interface AppProps {

}

export class AppView extends React.Component<AppProps, {}> {
  render() {
    return <div>This is App.</div>;
  }
}