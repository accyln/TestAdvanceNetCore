import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
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

      <div style={{height: "auto"}}>
<Nav>
<ProSidebar image={false}
      >
      
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
    <MenuItem>Test Sonuçları<Link to="/TestSonuclari" /></MenuItem>
    <SubMenu title="Test Senaryoları">
        <MenuItem>Senaryo İzle<Link to="/Test" /></MenuItem>
        <MenuItem>Senaryo Oluştur<Link to="/TestSenaryolari" /></MenuItem>
    </SubMenu>
    <MenuItem>Modüller<Link to="/ModulDetay" /></MenuItem>
    <MenuItem>Test Suiteler<Link to="/TestSuiteList" /></MenuItem>
  </Menu>
  </div>
  </SidebarContent>
  <SidebarFooter></SidebarFooter>
</ProSidebar>
</Nav>
</div>


    );
  }
}
