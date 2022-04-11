import React, { Component } from 'react';
import { Container, Accordion, Card, Row, Col, Table, FormControl, Form, Button, ButtonToolbar, Badge, Spinner, Textarea, ListGroup, ListGroupItem } from 'react-bootstrap'
import { getApiUrl } from '../base/settings';
import TaskConfirmModal from '../Modals/TaskConfirmModal';
import LoadingOverlay from 'react-loading-overlay';
import CreateTestSuiteModal from '../Modals/CreateTestSuiteModal';
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
    await  fetch('/api/TestCase/GetAllTestCases').then(response=> response.json())
      .then(data => {
        this.setState({ ...this.state, testCases: data,loading:false });
      });
  };


  getTestSuites = async () => {
    await  fetch('/api/TestSuite/GetAllTestSuites').then(response=> response.json())
      .then(data => {
        this.setState({ ...this.state, testSuites: data,loading:false });
      });
  };



runModalClose=()=>{this.setState({openCaseUpdateModal:false})}

  deleteRecord = item => {
    fetch(
        "/api/TestSuite/DeleteTestSuite?testSuiteId=" +
        item.id,{
          method: 'POST'

            },undefined).then(response=> response.status)
        .then(data => {
          console.log(data);
      if (data===200) {
        console.log("Kayıt silindi");
        this.setState({ deleteModalShow: false, loading: true });
        this.getTestSuites();
      }
    });
  };




  render() {
    var _this = this;
    let suites = this.state.testSuites;
    let runModalClose = () => {
      this.setState({
        openSuiteUpdateModal: false,
        deleteModalShow: false,
        openSuiteCreateModal: false
      });
      this.getTestSuites();
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
                        onClick={() => this.setState({ openSuiteCreateModal: true })}
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
                        Test Case Ekle
                      </Button>
                       <CreateTestSuiteModal
                        show={this.state.openSuiteCreateModal}
                        reCallFunction={this.getTestSuites}
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
