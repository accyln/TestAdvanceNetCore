import React, { Component } from 'react';
import { Container, Row, Col,Button} from 'react-bootstrap';
import { BasePage } from '../basepage';
import {getAuthToken} from '../../redux/actions/authActions';


class NotAuthenticated extends  BasePage {




render(){
return(

<Container>
<Row>
    <Col sm={3}></Col>
    <Col sm={6}>
    <div class="col text-center">
    <h3>Sayfayı görüntülemeye yetkiniz bulunmuyor</h3>
    <h3>Anasayfaya dönmek için tıklayınız.</h3>
    </div>
    <div class="col text-center">
    <Button variant='primary' href={"/Devops/Home/"} onClick={getAuthToken()} size='sm'>Ana Sayfa</Button>
    </div>
    </Col>
    <Col sm={3}>
    
    
    </Col>
</Row>


</Container>


);



}




} export default NotAuthenticated;