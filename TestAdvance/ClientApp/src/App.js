import React, { Component } from 'react';
import { Route } from 'react-router';
import  Layout  from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import Counter from './components/Counter';
import TestSonuclari from './components/TestSonuclari.js';
import TestSenaryolari from './components/TestSenaryolari.js';
import ModulDetay from './components/ModulDetay';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css'
import Test from './components/Test';
import TestSuiteList from './components/TestSuite/TestSuiteList';
import TestCaseList from './components/TestCase/TestCaseList';
import TestCaseDetails from './components/TestCase/TestCaseDetails';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
     
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/TestSonuclari' component={TestSonuclari} />
        <Route path='/TestSenaryolari' component={TestSenaryolari} />
        <Route path='/ModulDetay' component={ModulDetay} />
        <Route path='/TestSuiteList' component={TestSuiteList} />
        <Route path='/TestCaseList' component={TestCaseList} />

        <Route path='/TestCaseDetails/:id'  component={TestCaseDetails} />

        <Route path='/Test' component={Test} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
      </Layout>
    );
  }
}
