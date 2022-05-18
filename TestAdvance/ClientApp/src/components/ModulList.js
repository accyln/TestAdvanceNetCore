import React, { Component } from 'react';
import { Container, Accordion, Card, Row, Col, Table, FormControl, Form, Button, ButtonToolbar, Badge, Spinner, Textarea, ListGroup, ListGroupItem } from 'react-bootstrap'
import TaskConfirmModal from './Modals/TaskConfirmModal';
import LoadingOverlay from 'react-loading-overlay';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BasePage } from './base/basepage';
import CreateModulModal from './Modals/CreateModulModal';


class ModulList extends BasePage {

    constructor(props) {
        super(props);
        this.connect(['authReducers']);
        this.state = {
          ...this.state,
          modulList:[],
          silinecekKayit:null,
          deleteModalShow:false,
          loading:true,
          openModulCreateModal:false
        };
        this.getAllModules = this.getAllModules.bind(this);
      }

      componentDidMount() {
        this.getAllModules();
      }

      getAllModules(){
        this.GetSecureBase('api/Modul/GetAllModules',this.state?.userInfo?.token).
        then(
            data => {
                if (data) {
                    this.setState({
                        ...this.state,
                        modulList: data,
                        loading:false
                    });
                }
            });

    }

    openModal = item => {
        this.setState({ deleteModalShow: true });
      };

      deleteModul=(item)=>{

        let header = {
           'Content-Type': 'application/json',
        };

       this.PostSecureBase('api/Modul/DeleteModul?modulId='+item.id,{},this.state?.userInfo?.token)
       .then(
           data => {
               if (data===204) {
                   alert("İşlem tamamlandı");
                   this.getAllModules();
                   this.setState({deleteModalShow:false});
               } else {alert("Kayıt silinemedi");
               this.setState({deleteModalShow:false});
              }
           });
     }

    render() {
        var _this = this;
        let runModalClose = () => {
          this.setState({
            deleteModalShow:false,
            openModulCreateModal:false
          });
          this.getAllModules();
        };
    
        return ( <div className="body flex-grow-1 px-3">
        <TaskConfirmModal
          show={this.state.deleteModalShow}
          deleteRecord={() => this.deleteModul(this.state.silinecekKayit)}
          onHide={runModalClose}
          title="Kayıt Sil"
          body="Seçilen kaydı silmek istediğinize emin misiniz?"
        />
         <LoadingOverlay
          active={this.state.loading}
          spinner
          text="Modül listesi alınıyor..."
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
                        onClick={() => this.setState({ openModulCreateModal: true })}
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
                        Modül Ekle
                      </Button>
                      <CreateModulModal
                        show={this.state.openModulCreateModal}
                        reCallFunction={this.getAllModules}
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
                      <th className="text-center">Modul ID</th>
                        <th className="text-center">Modul Adı</th>
                        <th className="text-center">Email</th>
                        <th className="text-center">Sorumlu</th>
                        <th></th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.modulList?.map((item,i) => {
                        return (
                          <tr key={item.id}>
                            <td className="text-center">{item.id}</td>
                            <td className="text-center">{item.modulAdi}</td>
                            <td className="text-center">{item.email}</td>
                            <td className="text-center">{item.sorumluPersonel}</td>
                            <td className="text-center">
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={event => {
                                  var url = "/ModulDetay/" + item.id;
                                  _this.props.history.push(url)
                                }}
                              >
                                Detaya Git
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
      </div>)}

} export default ModulList