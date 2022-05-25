import React, { Component } from 'react';
import { Container, Accordion, Card, Row, Col, Table, FormControl, Form, Button, ButtonToolbar, Badge, Spinner, Textarea, ListGroup, ListGroupItem } from 'react-bootstrap'
import { getApiUrl } from '../base/settings';
import TaskConfirmModal from '../Modals/TaskConfirmModal';
import LoadingOverlay from 'react-loading-overlay';
import CreateTestCaseModal from '../Modals/CreateTestCaseModal';
import UpdateTestCaseModal from './UpdateTestCaseModal';
import 'bootstrap/dist/css/bootstrap.min.css';
/* import {RemedyChangeDetailsModal} from './RemedyChangeDetailsModal'; */
import { BasePage } from '../base/basepage';


class TestCaseList extends BasePage {
  constructor(props) {
    super(props);
    this.connect(['authReducers']);
    const {
      match: { params }
    } = this.props;
    var releaseid = params.id;
    this.state = {
      ...this.state,
      testCases: [],
      testSuites:[],
      silinecekKayit: [],
      deleteModalShow: false,
      releaseid: releaseid,
      loading:true,
      openCaseCreateModal:false,
      openCaseUpdateModal:false,
      selectedItem:[]
    };
    this.getTestSuites = this.getTestSuites.bind(this);
    this.getTestCases = this.getTestCases.bind(this);
  }

  componentDidMount() {
    this.getTestCases();
    this.getTestSuites();
  }


  getTestCases = async () => {
    await  this.GetSecureBase('api/TestCase/GetAllTestCases',this.state?.userInfo?.token)
      .then(data => {
        this.setState({ ...this.state, testCases: data,loading:false });
      });
  };


  getTestSuites = async () => {
    await  this.GetSecureBase('api/TestSuite/GetAllTestSuites',this.state?.userInfo?.token)
      .then(data => {
        this.setState({ ...this.state, testSuites: data.result,loading:false });
      });
  };



runModalClose=()=>{this.setState({openCaseUpdateModal:false})}

  deleteRecord = item => {
    this.PostSecureBase("api/TestCase/DeleteTestCase?testCaseId=" +item.id,{},this.state?.userInfo?.token)
    .then(data => {
      if (data) {
        alert("Kayıt silindi");
        this.setState({ deleteModalShow: false, loading: true });
        this.getTestCases();
      } else {
        alert("Kayıt silme başarısız")
        this.setState({ deleteModalShow: false });}
    });
  };

  openModal = item => {
    this.setState({ deleteModalShow: true });
  };


  render() {
    var _this = this;
    let suites = this.state.testSuites;
    let runModalClose = () => {
      this.setState({
        openSuiteUpdateModal: false,
        deleteModalShow: false,
        openCaseCreateModal: false
      });
      this.getTestCases();
    };

    return (
      <div className="body flex-grow-1 px-3">
        <TaskConfirmModal
          show={this.state.deleteModalShow}
          deleteRecord={() => this.deleteRecord(this.state.silinecekKayit)}
          onHide={runModalClose}
          title="Kayıt Sil"
          body="Seçilen kaydı silmek istediğinize emin misiniz?"
        />
         <LoadingOverlay
          active={this.state.loading}
          spinner
          text="Release detay bilgileri alınıyor..."
          style={{ height: 100 }}
        >
        <div>
          <Container fluid>
            <Row className="mb-4">
              <Col sm={12} lg={12}>
                <Row>
                  <Col sm={1}>
                    <div className="text-center">
                      <Button
                        variant="success"
                        onClick={() => this.setState({ openCaseCreateModal: true })}
                        style={{ height: 50, width: 180 }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-plus-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>{" "}
                        Test Durum Ekle
                      </Button>
                       <CreateTestCaseModal
                        show={this.state.openCaseCreateModal}
                        reCallFunction={this.getTestCases}
                        onHide={runModalClose}
                      /> 
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Card>
                  <Table>
                    <thead>
                      <tr>
                      <th className="text-center"></th>
                        <th className="text-center">TestCaseId</th>
                        <th className="text-center">Test Case Adı</th>
                        <th className="text-center">Bağlı Suite</th>
                        <th className="text-center">SenaryoId</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.testCases?.map((item,i) => {
                        return (
                          <tr key={item.id}>
                            <td><Button variant='warning' onClick={event => {
                                  this.setState({openCaseUpdateModal:true,selectedItem:item})
                                }}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
</svg></Button></td>
                            <td className="text-center">{item.id}</td>
                            <td className="text-center">{item.testCaseAdi}</td>
                            <td
                              style={{ wordBreak: "break-all" }}
                              className="text-center"
                            >
                              {
                                                suites.filter(option => 
                                                   option.id === item.suiteId)[0]?.suiteAdi}
                            </td>
                            <td className="text-center">{item.senaryoId}</td>
                            <td className="text-center">
                              <Button
                                variant="warning"
                                size="sm"
                                onClick={event => {
                                  var url = "/TestCaseDetails/" + item.id;
                                  _this.props.history.push(url)
                                }}
                              >
                                Detay
                              </Button>
                            </td>
                            <td style={{ width: 50 }} className="text-center">
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => {
                                  this.setState(
                                    { silinecekKayit: item },
                                    this.openModal(item)
                                  );
                                }}
                              >
                                Sil
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                  {this.state.openCaseUpdateModal ? ( <UpdateTestCaseModal show={this.state.openCaseUpdateModal}
                                                                  testCase={this.state.selectedItem}
                                                                  reCallFunction={this.getTestCases}
                                                                onHide={this.runModalClose}
                                                                 />) : null} 
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
        </LoadingOverlay>
      </div>
    );
  }
}
export default TestCaseList;
