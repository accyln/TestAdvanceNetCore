import React, { Component } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LoginMenu } from './api-authorization/LoginMenu';
import './NavMenu.css';
import { ProSidebar, Menu, MenuItem, SubMenu,SidebarHeader, SidebarContent,SidebarFooter} from 'react-pro-sidebar';
import {Nav} from 'react-bootstrap';
import 'react-pro-sidebar/dist/css/styles.css';
import TestSenaryolari from './TestSenaryolari';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (

      <div className='navcontainer'>
        <nav class='navbar navbar-expand-lg navbar-dark bg-dark'>
          

            <Row style={{width:2295}}>
              <Col>
            <div style={{width:250}}>
              <span class="white" style={{ marginLeft:30,marginTop:20,
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",color:"#adadad"
          }}>TEST ADVANCE</span></div>
          </Col> <Col sm={6}><div className="box" style={{
              height:30,
              padding: '4px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 12,
              letterSpacing: '1px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              color:"#adadad",
              marginLeft:'auto',
              marginRight:5,
              wordBreak: 'break-all',
              marginBottom:10,
              marginTop:15,
              float:"right"
            }}><span>{"_this.state?.userInfo?.name"}</span></div></Col>
          </Row>
          
        </nav>

<ProSidebar image={false}
 width="250px"     >
      
{/* <SidebarHeader>
<div
          style={{
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
          }}
        >
          TESUTO
        </div>
  </SidebarHeader> */}
  <SidebarContent >
      <div style={{height: "100vh",width:"250"}}>
  <Menu iconShape="square">
    <MenuItem>Dashboard<Link to="/" /></MenuItem>
    <MenuItem>Test Koşum Sonuçları<Link to="/TestSonuclari" /></MenuItem>
    <MenuItem>Test Senaryoları<Link to="/TestCaseList" /></MenuItem>
    <MenuItem>Senaryo Oluştur<Link to="/TestSenaryolari" /></MenuItem>
    <MenuItem>Modüller<Link to="/ModulDetay" /></MenuItem>
    <MenuItem>Test Suiteler<Link to="/TestSuiteList" /></MenuItem>
  </Menu>
  </div>
  </SidebarContent>
  <SidebarFooter></SidebarFooter>
</ProSidebar>

</div>


    );
  }
}
