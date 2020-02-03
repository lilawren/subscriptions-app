import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Subscriptions from './containers/Subscriptions';
import Layout from './components/Layout';

// Written by Lawrence Li

export default function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path='/' component={Subscriptions} />
        </Switch>
      </Layout>
    </Router>
  );
}
