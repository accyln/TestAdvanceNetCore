import React, { Component } from 'react'
import { Navbar, Nav, Modal, ModalBody, Button, Row, Col, Form, ListGroup, ListGroupItem ,Table,Spinner } from 'react-bootstrap';
import Select from 'react-select';
import LoadingOverlay from 'react-loading-overlay';
import {BasePage} from '../base/basepage';


export class CreateTestCaseModal extends BasePage {

    constructor(props) {
        super(props);
        this.connect(['authReducers']);
        this.state = {
            ...this.state,
            suiteList : [],
            selectedSuite: null,
            loading:false,
            caseName:""
        };


    }


    componentDidMount() {
    this.getTestSuiteList();
    
    }

    
    getTestSuiteList() {
        this.GetSecureBase('api/TestSuite/GetAllTestSuites',this.state?.userInfo?.token)
        .then(data => {
          this.setState({ ...this.state, suiteList: data.result });
    
    
        });
    }

    handleHide = () => this.setState({ runModalShow: false });

    createTestCase = async ()=>{
        try{
        this.setState({loading:true})
        let requestdata={
            testCaseAdi:this.state.caseName,
            suiteId:this.state.selectedSuite.id,
            senaryoId:1,
            isActive:1,
            createdDate:new Date(Date.now()),
            createdBy:this.state?.userInfo?.name+" "+this.state?.userInfo?.surName //TODO usera göre düzenlenecek
        }

        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(requestdata)
        }; 

            this.PostSecureBase('api/TestCase/InsertTestCase',requestdata,this.state?.userInfo?.token)
            .then(
                data => {
                    if (data) {
                        alert("Test Case oluşturma  başarılı.");
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


    handleSuiteSelect = selectedSuite => {
        this.setState({ selectedSuite });
        console.log(`Suite seçildi:`, selectedSuite);
      };

      onCaseNameChange = (e) => this.setState({ caseName: e.target.value })

      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

   

    spinner() {
        document.getElementsByClassName("loader")[0].style.display = "block";
    }


    render() {
        var _this = this;
        let suiteList = this.state.suiteList;
     


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
                                    <Form.Label>Suite</Form.Label>
                                        <div>
                                            <Select
                                            onChange={this.handleSuiteSelect}
                                            options={suiteList}
                                            getOptionLabel={(suiteList) => suiteList['suiteAdi']}
                                            getOptionValue={(suiteList) => suiteList['id']}
                                            
                                                >  
                                            </Select>
                                        </div>
                                        <br></br>                 
                                        <Form.Label>Test Case Adı</Form.Label>
                                        <div>
                                        <Form.Control type="text" name="releaseName" onChange={this.onCaseNameChange} required
                                              value={this.state.caseName}/>
                                        </div>
                                    </Form.Group>

                                    <Form.Group>
                                    <br></br>
                                    <Button variant='success' size='md' onClick={event =>  
                                                    {this.createTestCase();

                                                    }} 
                                                    >{' '} {this.state.loading ? <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    /> : 'Test Case Oluştur'}</Button>
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


export default CreateTestCaseModal;