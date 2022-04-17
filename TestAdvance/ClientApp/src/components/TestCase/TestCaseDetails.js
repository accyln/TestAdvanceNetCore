import React, { Component } from 'react';
import { Container, Accordion, Card, Row, Col,Form,Button } from 'react-bootstrap'
import LoadingOverlay from 'react-loading-overlay';
import { BasePage } from '../base/basepage';
import { debug } from 'util';
import { KeywordComponent } from '../Custom/KeywordComponent';
import  KeywordListModal from '../Modals/KeywordListModal';

class TestCaseDetails extends BasePage {
  constructor(props) {
    super(props);
    this.childRef = React.createRef();
    this.connect(['authReducers']);
    const {
      match: { params }
    } = this.props;
    var testCaseId = params.id;
    this.state = {
      ...this.state,
      testCaseInfo:[],
      testCaseDetay:[],
      caseSenaryoSteps:[],
      senaryo:[],
      loadingTestCaseDetay:true,
      loadingTestCase:true,
      testCaseId:testCaseId,
      displayEkle:"none",
      isUpdateMode:false,
      runKeywordModalShow:false,
      selectedKeyword:[],
      lastKeyword:null,
      successfullInsertCount:0
      
    };

    this.getTestCaseInfo = this.getTestCaseInfo.bind(this);
    this.getTestCaseDetails = this.getTestCaseDetails.bind(this);

  }

  componentDidMount() {
    this.getTestCaseInfo();
    this.getTestCaseDetails();

  }

  getTestCaseInfo = async () => {
    fetch('api/TestCase/GetTestCase?id='+this.state.testCaseId).then(response=> response.json())
        .then(
            data => {
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
                        loadingTestCaseDetay:false,
                        lastKeyword : data[data.length - 1]
                    });
                }
            });
  };


  deleteSenaryo(){
    this.setState({loadingSenaryo:true})
    fetch('api/Senaryo/DeleteSenaryo?testCaseId='+this.state.testCaseId).then(response=> response.json())
            .then(
                data => {
                    if (data) {

                this.setState({isDeleted:true},this.saveScenario)
                        } else {
                            alert("Senaryo oluşturma işleminde hata alındı. Hata kodu : "+data);
                        }
                    
                });
  }

  saveScenario = async ()=>{
    try{

    let i=0;
    this.state.senaryo.forEach(element => {
      i++
    let requestdata={
        senaryoId:this.state.testCaseDetay.senaryoId,
        orderId:i,
        keywordId:element.keywordId ? element.keywordId : element.id,
        createdDate:new Date(Date.now()),
        createdBy:"UserName" //TODO usera göre düzenlenecek
    }


  

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(requestdata)
    };

    fetch('api/Senaryo/AddSenaryoSteps',requestOptions).then(response=> response.status)
            .then(
                data => {
                    if (data===200) {
                        this.setState({successfullInsertCount:this.state.successfullInsertCount+1})
                        } else {
                            alert("Senaryo oluşturma işleminde hata alındı. Hata kodu : "+data);
                        }
                    
                });
            });
            if(this.state.successfullInsertCount===i) {
              alert("İnsert başarılı")
            }
            await this.delay(5000);
              this.setState({successfullInsertCount:0,loadingSenaryo:false,isUpdateMode:false,displayEkle:"none"},this.getTestCaseDetails)
    } catch (e) {
        alert("İşleminizi gerçekleştirilemedi, servis çağrısında hata alındı.");
            this.setState({ loadingSenaryo: false });
        }
    }

  overlayDiv() {
    return <div style={{ height: 100 }}></div>;
  }

  removeTestStep(senary){
    senary.pop();
    this.setState({...this.state,senaryo:senary})
    this.childRef.current.getKeywordList(senary[senary.length-1].typeClass);
    
  };

  handleKeywordSelect(lang){
    this.state.senaryo.push(lang);
    debugger;
    this.setState({ runKeywordModalShow:false,lastKeyword:lang},this.getDeploymentBuildInfo);
    console.log(lang)
    
  };

  delay = ms => new Promise(res => setTimeout(res, ms));

  render() {
    var _this = this;
    let runModalClose = () => {
      this.setState({
        deleteModalShow: false,
        runKeywordModalShow:false
      });
    };
    return (
      <div>
        <LoadingOverlay
          active={this.state.loadingTestCase || this.state.loadingTestCaseDetay}
          spinner
          text="Test Case detay bilgisi alınıyor lütfen bekleyiniz..."
          style={{ height: 100 }}
        >
          {" "}
          {this.state.loadingTestCase == true ? <this.overlayDiv /> : ""}
          <Card className="mb-4" style={{borderColor:"grey"}}>
            <Card.Header style={{backgroundColor:"lightslategray"}}><h5 style={{color:"white"}}>Test Case Info</h5></Card.Header>
            <Card.Body>
              <div style={{ margin: 10 }}>
                <Row>
                  <Col sm={4}>
                    <Form>
                      <Form.Group controlId="CaseDetails">
                        <Form.Label>Case Id</Form.Label>

                        <Form.Control
                          type="text"
                          name="changeId"
                          required
                          value={this.state.testCaseDetay?.id}
                        />

                        <br></br>

                        <Form.Label>Case Adı</Form.Label>
                        <Form.Control
                          type="text"
                          name="changeId"
                          value={this.state.testCaseDetay?.testCaseAdi}
                        />

                        <br></br>

                        <Form.Label>Olusturma Tarihi</Form.Label>
                        <Form.Control
                          type="text"
                          name="changeId"
                          required
                          value={this.state.testCaseDetay?.createdDate}
                        />

                        <br></br>

                        <Form.Label>Olusturan</Form.Label>
                        <Form.Control
                          type="text"
                          name="changeId"
                          required
                          value={this.state.testCaseDetay?.createdBy}
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col sm={4}>
                    <Form.Label>Related Test Suite</Form.Label>
                    <Form.Control
                      type="text"
                      name="TargetProject"
                      required
                      value={this.state.testCaseDetay?.suiteId}
                    />

                    <br></br>

                    <Form.Label>Status</Form.Label>
                    <br></br>
                    {this.state.testCaseDetay?.isActive ===
                    1 ? (
                      <span class="badge bg-success">
                        {"Active"}
                      </span>
                    ) : this.state.testCaseDetay?.isActive===0 ? (
                      <span class="badge bg-danger">
                        {"Passive"}
                      </span>
                    ) : <span class="badge bg-secondary">
                    N/A
                  </span>}
                   
                    <br></br>

                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
          <Card className="mb-4" style={{borderColor:"grey",backgroundColor:"lightslategray"}}>
            <Card.Header>
              <Row><Col sm={2}><h5 style={{color:"white"}}>Senaryo Detay</h5></Col><Col sm={8}></Col><Col sm={2}>
                {this.state.isUpdateMode===true ? (<Button style={{float:"right"}} onClick={()=>this.deleteSenaryo()}>Kaydet</Button>) : 
                (<Button variant="warning" style={{float:"right"}} onClick={()=>this.setState({isUpdateMode:true,displayEkle:true})}>Güncelle</Button>)
                  }
                </Col></Row>
              
              
              </Card.Header>
              <LoadingOverlay
          active={this.state.loadingSenaryo}
          spinner
          text="Senaryo kaydediliyor, lütfen bekleyiniz..."
          style={{ height: 100 }}
        >
            <Card.Body style={{backgroundColor:"white"}}>
              <Row><Col sm={4}></Col>
              <Col sm={4}>
            {this.state.senaryo?.map((item) => {
                        return (
                    <KeywordComponent senaryo={item}/>
                    )}
                    )}
                    <center><Button variant="success" style={{display:this.state.displayEkle}} onClick={()=>this.setState({runKeywordModalShow:true})}>Keyword Ekle</Button>{" "}
                    <Button variant="danger" style={{display:this.state.displayEkle}} onClick={()=>this.removeTestStep(this.state.senaryo)}>Keyword Çıkar</Button>
                    </center>
                    {this.state.lastKeyword!=={} && this.state.lastKeyword ? 
                    (<KeywordListModal show={this.state.runKeywordModalShow} handleKeywordSelect={this.handleKeywordSelect.bind(this)}
                                              onHide={runModalClose} lastKeyword={this.state.senaryo[this.state.senaryo.length - 1]} ref={this.childRef}/>):null}
                    </Col>
                    <Col sm={4}></Col>
                    </Row>
            </Card.Body>
            </LoadingOverlay>
          </Card>
        </LoadingOverlay>
      </div>
    );
  }
} 
export default TestCaseDetails