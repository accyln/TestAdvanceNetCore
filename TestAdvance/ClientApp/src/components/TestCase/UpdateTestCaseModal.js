import React, { Component } from 'react'
import { Navbar, Nav, Modal, ModalBody, Button, Row, Col, Form, ListGroup, ListGroupItem ,Table,Spinner } from 'react-bootstrap';
import Select from 'react-select';
import LoadingOverlay from 'react-loading-overlay';
import {BasePage} from '../base/basepage';


export class UpdateTestCaseModal extends BasePage {

    constructor(props) {
        super(props);
        this.connect(['authReducers']);
        this.state = {
            ...this.state,
            suiteList : [],
            selectedSuite: null,
            selectedOrtam: null,
            loading:false,
            caseName:this.props.testCase.testCaseAdi,
            modul:this.props.modulId
        };


    }


    componentDidMount() {
    this.getSuiteList();
    

    }

    
    getSuiteList() {
        this.GetSecureBase('api/TestSuite/GetAllTestSuites', this.state?.userInfo?.token)
        .then(data => {
          this.setState({ ...this.state, suiteList: data.result },this.setSuiteRelatedModul);
    
    
        });
    }

    handleHide = () => this.setState({ runModalShow: false });

    updateTestCase = async ()=>{
        try{
        this.setState({loading:true})
        debugger;
        let requestdata={
            id:this.props.testCase.id,
            testCaseAdi:this.state.caseName,
            suiteId:this.state.selectedSuite[0].id
        }
debugger;
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body: JSON.stringify(requestdata)
        }; 

            this.PostSecureBase('api/TestCase/UpdateTestCase',requestdata,this.state?.userInfo?.token)
            .then(
                data => {

                    if (data) {
                        alert("Test Case güncelleme  başarılı.");
                this.setState({caseName:"",selectedSuite:""})
                this.props.reCallFunction()
                        } else {
                            alert("Case güncelleme işleminde hata alındı. Hata kodu : "+data);
                        }
                        this.setState({loading:false})
                        this.props.onHide()
                });
    } catch (e) {
        alert("İşleminizi gerçekleştirilemedi, servis çağrısında hata alındı.");
            this.setState({ loading: false });
        }
    }


    handleSuiteSelect = selectedSuite => {
        this.setState({ selectedSuite });

      };


      onSuiteNameChange = (e) => this.setState({ caseName: e.target.value })

      sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

   

    spinner() {
        document.getElementsByClassName("loader")[0].style.display = "block";
    }

    setSuiteRelatedModul(){
        let value=this.state.suiteList.filter(option => option.id === this.props.testCase.suiteId)
        this.setState({selectedSuite:value});
    }


    render() {
        var _this = this;
        let suites = this.state.suiteList;
     


        return (
            <div className="container">
                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>

                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Test Case Güncelle
                        </Modal.Title>
                    </Modal.Header>

                    <ModalBody>
                            <Row>
                                <Col sm={6}>
                                 
                                    <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="Release">
                                    <Form.Label>Test Suite</Form.Label>
                                        <div>
                                            <Select
                                             value = {
                                                this.state.selectedSuite
                                             }
                                            onChange={this.handleSuiteSelect}
                                            options={suites}
                                            getOptionLabel={(suites) => suites['suiteAdi']}
                                            getOptionValue={(suites) => suites['id']}
                                            
                                                >  
                                            </Select>
                                        </div>
                                        <br></br>                 
                                        <Form.Label>Test Case Adı</Form.Label>
                                        <div>
                                        <Form.Control type="text" name="releaseName" onChange={this.onSuiteNameChange} required
                                              value={this.state?.caseName}/>
                                        </div>
                                    </Form.Group>

                                    <Form.Group>
                                    <br></br>
                                    <Button variant='success' size='md' onClick={event =>  
                                                    {this.updateTestCase();

                                                    }} 
                                                    >{' '} {this.state.loading ? <Spinner
      as="span"
      animation="border"
      size="sm"
      role="status"
      aria-hidden="true"
    /> : 'Güncelle'}</Button>
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


export default UpdateTestCaseModal;