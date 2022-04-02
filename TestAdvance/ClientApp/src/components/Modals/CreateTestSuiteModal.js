import React, { Component } from 'react'
import { Navbar, Nav, Modal, ModalBody, Button, Row, Col, Form, ListGroup, ListGroupItem ,Table,Spinner } from 'react-bootstrap';
import Select from 'react-select';
import LoadingOverlay from 'react-loading-overlay';
import {BasePage} from '../base/basepage';


export class CreateTestSuiteModal extends BasePage {

    constructor(props) {
        super(props);
        this.connect(['authReducers']);
        this.state = {
            ...this.state,
            modulList : [],
            selectedModul: null,
            selectedOrtam: null,
            loading:false,
            suiteName:""
        };


    }


    componentDidMount() {
    this.getModulList();
    
    }

    
    getModulList() {
        fetch('api/Modul/GetAllModules', ).then(response=> response.json())
        .then(data => {
          this.setState({ ...this.state, modulList: data });
    
    
        });
    }

    handleHide = () => this.setState({ runModalShow: false });

    createTestSuite = async ()=>{
        try{
        this.setState({loading:true})
        let requestdata={
            suiteAdi:this.state.suiteName,
            modulId:this.state.selectedModul.id
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(requestdata)
        }; 

            fetch('api/TestSuite/InsertTestSuite',requestOptions).then(response=> response.json())
            .then(
                data => {
                    if (data) {
                        alert("Suite oluşturma  başarılı.");
                this.setState({suiteName:"",selectedModul:"",loading:false})
                this.props.onHide()
                        } else {
                            alert("Release oluşturma işleminde hata alındı. Hata kodu : "+data);
                        }
                    
                });
    } catch (e) {
        alert("İşleminizi gerçekleştirilemedi, servis çağrısında hata alındı.");
            this.setState({ loading: false });
        }
    }


    handleModulSelect = selectedModul => {
        this.setState({ selectedModul });
        console.log(`Grup seçildi:`, selectedModul);
      };

      handleDateSelect = releaseDate => {
        this.setState({ releaseDate });
        console.log(`Date seçildi:`, releaseDate);
      };

      onSuiteNameChange = (e) => this.setState({ suiteName: e.target.value })

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
                            Suite Oluştur
                        </Modal.Title>
                    </Modal.Header>

                    <ModalBody>
                            <Row>
                                <Col sm={6}>
                                 
                                    <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="Release">
                                    <Form.Label>Modül</Form.Label>
                                        <div>
                                            <Select
                                            onChange={this.handleModulSelect}
                                            options={moduls}
                                            getOptionLabel={(moduls) => moduls['modulAdi']}
                                            getOptionValue={(moduls) => moduls['id']}
                                            
                                                >  
                                            </Select>
                                        </div>
                                        <br></br>                 
                                        <Form.Label>Suite Adı</Form.Label>
                                        <div>
                                        <Form.Control type="text" name="releaseName" onChange={this.onSuiteNameChange} required
                                              value={this.state.suiteName}/>
                                        </div>
                                    </Form.Group>

                                    <Form.Group>
                                    <br></br>
                                    <Button variant='success' size='md' onClick={event =>  
                                                    {this.createTestSuite();

                                                    }} 
                                                    >{' '} {this.state.loading ? <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    /> : 'Suite Oluştur'}</Button>
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


export default CreateTestSuiteModal;