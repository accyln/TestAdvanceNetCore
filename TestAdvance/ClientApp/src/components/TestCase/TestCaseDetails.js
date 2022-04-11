import React, { Component } from 'react';
import { Container, Accordion, Card, Row, Col,Form,Button } from 'react-bootstrap'
import LoadingOverlay from 'react-loading-overlay';
import { BasePage } from '../base/basepage';
import { debug } from 'util';
import { KeywordComponent } from '../Custom/KeywordComponent';

class TestCaseDetails extends BasePage {
  constructor(props) {
    super(props);
    this.connect(['authReducers']);
    const {
      match: { params }
    } = this.props;
    var testCaseId = params.id;
    this.state = {
      ...this.state,
      testCaseInfo:[],
      testCaseDetay:[],
      senaryo:[],
      loadingTestCaseDetay:true,
      loadingTestCase:true,
      testCaseId:testCaseId
      
    };

    this.getTestCaseInfo = this.getTestCaseInfo.bind(this);
    this.getTestCaseDetails = this.getTestCaseDetails.bind(this);
  }

  componentDidMount() {
    this.getTestCaseInfo();
    this.getTestCaseDetails();
  }

  getTestCaseInfo = async () => {
    debugger;
    fetch('api/TestCase/GetTestCase?id='+this.state.testCaseId).then(response=> response.json())
        .then(
            data => {
              debugger;
                if (data) {
                    this.setState({
                        ...this.state,
                        testCaseDetay: data[0],
                        loadingTestCase:false
                    });
                }
            });
  };

  getTestCaseDetails = async () => {
    fetch('api/TestCase/GetTestCaseDetails').then(response=> response.json())
        .then(
            data => {
                if (data) {
                    this.setState({
                        ...this.state,
                        senaryo: data,
                        loadingTestCaseDetay:false
                    });
                }
            });
  };

  overlayDiv() {
    return <div style={{ height: 100 }}></div>;
  }

  

  render() {
    var _this = this;
    let runModalClose = () => {
      this.setState({
        deleteModalShow: false
      });
    };


    return (
      <div>
        <LoadingOverlay
          active={this.state.loadingTestCase || this.state.loadingTestCaseDetay}
          spinner
          text="Azure Devops üzerinden deployment detay bilgisi alınıyor lütfen bekleyiniz..."
          style={{ height: 100 }}
        >
          {" "}
          {this.state.loadingTestCase == true ? <this.overlayDiv /> : ""}
          <Card className="mb-4">
            <Card.Header>Deployment Info</Card.Header>
            <Card.Body>
              <div style={{ margin: 10 }}>
                <Row>
                  <Col sm={4}>
                    <Form>
                      <Form.Group controlId="DeploymentDetails">
                        <Form.Label>Build Id</Form.Label>

                        <Form.Control
                          type="text"
                          name="changeId"
                          required
                          value={this.state.testCaseDetay?.id}
                        />

                        <br></br>

                        <Form.Label>Build Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="changeId"
                          value={this.state.testCaseDetay?.testCaseAdi}
                        />

                        <br></br>

                        <Form.Label>Deploy Date</Form.Label>
                        <Form.Control
                          type="text"
                          name="changeId"
                          required
                          value={"acc"}
                        />

                        <br></br>

                        <Form.Label>User</Form.Label>
                        <Form.Control
                          type="text"
                          name="changeId"
                          required
                          value={this.state.testCaseInfo?.testCadeAdi}
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col sm={4}>
                    <Form.Label>Project</Form.Label>
                    <Form.Control
                      type="text"
                      name="TargetProject"
                      required
                      value={this.state.testCaseInfo?.testCadeAdi}
                    />

                    <br></br>
                    <Form.Label>Pipeline</Form.Label>
                    <Form.Control
                      type="text"
                      name="changeId"
                      required
                      value={this.state.testCaseInfo?.testCadeAdi}
                    />

                    <br></br>

                    <Form.Label>Repository</Form.Label>
                    <Form.Control
                      type="text"
                      name="changeId"
                      required
                      value={this.state.testCaseInfo?.testCadeAdi}
                    />
                   
                    <br></br>

                  </Col>
                  <Col sm={4}>
                    <div style={{margin:20,width:150}}>
                      <Card>
                        <Card.Header><div class="col text-center">Last Stage</div></Card.Header>
                        <Card.Body style={{textAlign:'center'}}></Card.Body>
                        </Card>
                        </div>
                        </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Header>Senaryo</Card.Header>
            <Card.Body>
                    <KeywordComponent senaryo={this.state.senaryo}/>
                    
            </Card.Body>
          </Card>
          <div style={{margin:10}}><Button variant='primary' onClick={()=>{
            this.props.history.push('/Devops/Deployments/');
          }}>Geri</Button></div>
        </LoadingOverlay>
      </div>
    );
  }
} 
export default TestCaseDetails