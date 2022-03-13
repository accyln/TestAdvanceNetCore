import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import Counter from './components/Counter';
import TestSonuclari from './components/TestSonuclari.js';
import TestSenaryolari from './components/TestSenaryolari.js';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css'
import Test from './components/Test';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
     
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/TestSonuclari' component={TestSonuclari} />
        <Route path='/TestSenaryolari' component={TestSenaryolari} />
        <Route path='/Test' component={Test} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
