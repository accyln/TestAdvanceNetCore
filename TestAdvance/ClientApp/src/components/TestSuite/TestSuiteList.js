import React, { Component } from 'react';
import { Container, Accordion, Card, Row, Col, Table, FormControl, Form, Button, ButtonToolbar, Badge, Spinner, Textarea, ListGroup, ListGroupItem } from 'react-bootstrap'
import { getApiUrl } from '../base/settings';
import TaskConfirmModal from '../Modals/TaskConfirmModal';
import LoadingOverlay from 'react-loading-overlay';
import CreateTestSuiteModal from '../Modals/CreateTestSuiteModal';
import UpdateTestSuiteModal from './UpdateTestSuiteModal';
import 'bootstrap/dist/css/bootstrap.min.css';
/* import {RemedyChangeDetailsModal} from './RemedyChangeDetailsModal'; */
import { BasePage } from '../base/basepage';


class TestSuiteList extends BasePage {
  constructor(props) {
    super(props);
    this.connect(['authReducers']);
    const {
      match: { params }
    } = this.props;
    var releaseid = params.id;
    this.state = {
      ...this.state,
      testSuites: [],
      silinecekKayit: [],
      deleteModalShow: false,
      releaseid: releaseid,
      loading:true,
      openSuiteCreateModal:false,
      openSuiteUpdateModal:false,
      selectedItem:[],
      modulList:[]
    };
    this.getTestSuites = this.getTestSuites.bind(this);
    this.getAllModules = this.getAllModules.bind(this);
  }

  componentDidMount() {
    this.getTestSuites();
    this.getAllModules();
  }


  getTestSuites = async () => {
    await  this.GetSecureBase('api/TestSuite/GetAllTestSuites',this.state?.userInfo?.token)
      .then(data => {
        this.setState({ ...this.state, testSuites: data.result,loading:false });
      });
  };

  getAllModules(){
    debugger;
    this.GetSecureBase('api/Modul/GetAllModules',this.state?.userInfo?.token)
    .then(
        data => {
            if (data) {
                this.setState({
                    ...this.state,
                    modulList: data
                },this.test);
            }
        });

}


  openModal = item => {
    this.setState({ deleteModalShow: true });
  };

  test= () =>{
    debugger;
    console.log(this.state.modulList.filter(option => option.id === 1));
  }


runModalClose=()=>{this.setState({openSuiteUpdateModal:false})}

  deleteRecord = item => {
    this.PostSecureBase(
        "api/TestSuite/DeleteTestSuite?testSuiteId=" +
        item.id,{},this.state?.userInfo?.token)
        .then(data => {
          console.log(data);
      if (data) {
        console.log("Kayıt silindi");
        this.setState({ deleteModalShow: false, loading: true });
        this.getTestSuites();
      } else {
        alert("Silme işlemind hata alındı");
        this.setState({ deleteModalShow: false});
      }
    });
  };




  render() {
    var _this = this;
    let moduls = this.state.modulList;
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
                        Test Suite Ekle
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
                        <th className="text-center">SuiteId</th>
                        <th className="text-center">Suite Adı</th>
                        <th className="text-center">Bağlı Modül</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.testSuites?.map((item,i) => {
                        return (
                          <tr key={item.id}>
                            <td className="text-center">{item.id}</td>
                            <td className="text-center">{item.suiteAdi}</td>
                            <td
                              style={{ wordBreak: "break-all" }}
                              className="text-center"
                            >
                              {
                                                moduls.filter(option => 
                                                   option.id === item.modulId)[0]?.modulAdi}
                            </td>

                            <td className="text-center">
                              <Button
                                variant="warning"
                                size="sm"
                                onClick={event => {
                                  this.setState({openSuiteUpdateModal:true,selectedItem:item})
                                }}
                              >
                                Güncelle
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
             {this.state.openSuiteUpdateModal ? ( <UpdateTestSuiteModal show={this.state.openSuiteUpdateModal}
                                                                  suite={this.state.selectedItem}
                                                                  reCallFunction={this.getTestSuites}
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
export default TestSuiteList;
