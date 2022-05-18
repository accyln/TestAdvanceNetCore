import React, { Component } from 'react';
import { Route } from 'react-router';
import  Layout  from './components/Layout';
import Home from './components/Home';
import { Redirect } from "react-router-dom";
import Counter from './components/Counter';
import TestSonuclari from './components/TestSonuclari.js';
import TestSenaryolari from './components/TestSenaryolari.js';
import ModulDetay from './components/ModulDetay';
import ModulList from './components/ModulList';
import {Login} from './components/Login/Login';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';
import {storeUserInfo,setAuthStatus} from './redux/actions/authAction';
import {checkAuth} from './components/Login/authService';

import './custom.css'
import Test from './components/Test';
import TestSuiteList from './components/TestSuite/TestSuiteList';
import TestCaseList from './components/TestCase/TestCaseList';
import TestCaseDetails from './components/TestCase/TestCaseDetails';
import { BasePage } from './components/base/basepage';
import ProtectedRoute from './components/AuthPages/ProtectedRoute';

export default class App extends BasePage {
  static displayName = App.name;

  constructor(props){
    super(props)
    this.connect(['authStatusReducer']);
    this.connect(['authReducers']);
    this.state = {
      ...this.state,
    }
  
  }


  componentDidMount(){
    checkAuth(setAuthStatus,storeUserInfo);

  }

  render () {
    return (
      <div>      {
          
        this.state?.userInfo?.token && this.state.isAuth ? 
      (
      
      <Layout>
      <div>
        
        <Route exact path="/">
           <Redirect to="/Home" />
      </Route>
        <Route exact path='/Home' component={Home} />
        <ProtectedRoute exact path='/TestSonuclari' isAuthenticated={this.state.isAuth} component={TestSonuclari} />
        <Route path='/TestSenaryolari' component={TestSenaryolari} />
        <Route path='/TestSuiteList' component={TestSuiteList} />
        <Route path='/TestCaseList' component={TestCaseList} />
        <Route path='/ModulList' component={ModulList} />
        <Route path='/Login' component={Login} />

        <Route path='/TestCaseDetails/:id'  component={TestCaseDetails} />
        <Route path='/ModulDetay/:id'  component={ModulDetay} />

        <Route path='/Test' component={Test} />
        <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
        
        </div>
      
      </Layout>
      ) : (<Login/>)
    }</div>  
    );
  }
}
