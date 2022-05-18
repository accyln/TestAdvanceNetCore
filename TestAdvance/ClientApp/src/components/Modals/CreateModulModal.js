import React, { Component } from 'react'
import { Navbar, Nav, Modal, ModalBody, Button, Row, Col, Form, ListGroup, ListGroupItem ,Table,Spinner } from 'react-bootstrap';
import Select from 'react-select';
import LoadingOverlay from 'react-loading-overlay';
import {BasePage} from '../base/basepage';


export class CreateModulModal extends BasePage {

    constructor(props) {
        super(props);
        this.connect(['authReducers']);
        this.state = {
            ...this.state,
            loading:false,
            modulAdi:"",
            email:"",
            sorumluPersonel:""
        };


    }



    handleHide = () => this.setState({ runModalShow: false });

    createModul = async ()=>{
        try{
        this.setState({loading:true})
        let requestdata={
            modulAdi:this.state.modulAdi,
            email:this.state.email,
            sorumluPersonel:this.state.sorumluPersonel,
            
        }


            this.PostSecureBase('api/Modul/AddModul',requestdata,this.state?.userInfo?.token)
            .then(
                data => {
                    if (data) {
                        alert("Modul oluşturma başarılı.");
                this.setState({modulAdi:"",email:"",sorumluPersonel:"",loading:false})
                this.props.onHide()
                        } else {
                            alert("Modul oluşturma işleminde hata alındı. Hata kodu : "+data);
                        }
                    
                });
    } catch (e) {
        alert("İşleminizi gerçekleştirilemedi, servis çağrısında hata alındı.");
            this.setState({ loading: false });
        }
    }

      onModulAdiChange = (e) => this.setState({ modulAdi: e.target.value })
      onEmailChange = (e) => this.setState({ email: e.target.value })
      onSorumluPersonelChange = (e) => this.setState({ sorumluPersonel: e.target.value })

      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

   

    spinner() {
        document.getElementsByClassName("loader")[0].style.display = "block";
    }


    render() {
        var _this = this;
        let moduls = this.state.modulList;
     


        return (
            <div className="container">
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>

                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Test Case Oluştur
                        </Modal.Title>
                    </Modal.Header>

                    <ModalBody>
                            <Row>
                                <Col sm={6}>
                                 
                                    <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="Release">
                                    <Form.Label>Modül Adı</Form.Label>
                                        <div>
                                        <Form.Control type="text" name="releaseName" onChange={this.onModulAdiChange} required
                                              value={this.state.modulAdi}/>
                                        </div>
                                        <br></br>                 
                                        <Form.Label>Email</Form.Label>
                                        <div>
                                        <Form.Control type="text" name="releaseName" onChange={this.onEmailChange} required
                                              value={this.state.email}/>
                                        </div>
                                        <br></br>    
                                        <Form.Label>Sorumlu</Form.Label>
                                        <div>
                                        <Form.Control type="text" name="releaseName" onChange={this.onSorumluPersonelChange} required
                                              value={this.state.sorumluPersonel}/>
                                        </div>
                                    </Form.Group>

                                    <Form.Group>
                                    <br></br>
                                    <Button variant='success' size='md' onClick={event =>  
                                                    {this.createModul();

                                                    }} 
                                                    >{' '} {this.state.loading ? <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    /> : 'Modül Oluştur'}</Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </ModalBody>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Kapat</Button>
                    </Modal.Footer>

                </Modal>


            </div>
        )
}

}


export default CreateModulModal;