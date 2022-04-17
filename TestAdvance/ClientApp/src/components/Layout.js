import React from 'react';
import {NavMenu}  from './NavMenu';
import styled from 'styled-components';

// component styles
const Wrapper = styled.div`
    @media (min-width: 700px) {
        display: flex;
        position: fixed;
        margim:30px
        height: calc(100% - 100px);
        width: 100%;
        flex: auto;
        flex-direction: column;
    }
`;
const Main = styled.main`
    position: fixed;
    height: calc(100% - 185px);
    top: 80px;
    overflow-y:scroll;
    width: 100%;
    padding: 1em;
    @media (min-width: 700px) {
        flex: 1;
        margin-left: 260px;
        height: calc(100% - 100px);
        width: calc(100% - 260px);
    }
`;

const Layout = ({ children }) => {
    return (
    <React.Fragment>
        {/* <Header /> */}
        <Wrapper>
        <NavMenu/>
            {/* <NavMenu /> */}
            <Main>{children}</Main>
        </Wrapper>
    </React.Fragment>
    );
};
export default Layout;



/* export class Layout extends Component {
  static displayName = Layout.name; 

  render () {
    return (
      <div style={{width:'auto'}}>

                
        <nav class='navbar navbar-expand-lg navbar-dark bg-dark'>
          
          <div style={{height:30}}>
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
       

          <Wrapper>
        <Row>
            <Col sm={2}>
                <div style={{height: "100vh",width:0}}>
        <NavMenu/>
        </div>
        </Col>
        <Col sm={8}>

            <div style={{margin:25}}>
        <Main>

              {this.props.children}


        </Main>
        </div>
        </Col>
        </Row>
        </Wrapper>

      </div>
    );
  }
} */
