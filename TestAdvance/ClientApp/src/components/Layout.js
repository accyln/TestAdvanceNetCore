import React, { Component } from 'react';
import { Container,Row,Col } from 'reactstrap';
import { Nav, Navbar } from 'react-bootstrap';
import { NavMenu } from './NavMenu';
import Button from 'reactstrap/lib/Button';
import Sidebar from './Sidebar';

export class Layout extends Component {
  static displayName = Layout.name;

  render () {
    return (
      <div style={{width:'auto'}}>

                
        <nav class='navbar navbar-expand-lg navbar-dark bg-dark'>
          
          <div style={{height:30,width:2530}}>
            <Row>
            <div style={{width:250}}>
              <span class="white" style={{ marginLeft:40,marginTop:10,
            padding: "24px",
            textTransform: "uppercase",
            fontWeight: "bold",
            fontSize: 14,
            letterSpacing: "1px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",color:"#adadad"
          }}>TEST ADVANCE</span></div>
          
          <div style={{float: 'right',width:100,marginLeft:'auto',marginRight:0}}><Button size='sm' variant='warning'>Kullanıcı</Button>
          </div>
          </Row>
          </div>
          
        </nav>
       
       
        <Row>
            <Col sm={2}>
                <div style={{height: "100vh",width:250}}>
        <NavMenu/>
        </div>
        </Col>
        <Col sm={8}>

            <div style={{margin:25}}>
        <Container>
            {this.props.children}
        </Container>
        </div>
        </Col>
        </Row>
       
      </div>
    );
  }
}
