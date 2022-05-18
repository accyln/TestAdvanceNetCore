import React, { useState } from 'react';
import { Container, Accordion, Card, Row, Col, Table, FormControl, Form, Button, ButtonToolbar, Badge, Spinner, Textarea, ListGroup, ListGroupItem } from 'react-bootstrap'
import { BasePage } from './base/basepage'
import Select from 'react-select';
import {GetSecure, PostSecure}  from './base/Server';


class ModulDetay extends BasePage {


    constructor(props) {
        super(props);
        this.connect(['authReducers']);
        const {
            match: { params }
          } = this.props;
          var modulId = params.id;
        this.state = {
            ...this.state,
            modulId:modulId,
            modulInfo:[
                {id:0,
                modulAdi:"",
                email:"",
                sorumluPersonel:""
                }
            ],
            isDisabled:true,
            guncelleMod:false,
            showSaveButton:'none',
            showAddButton:'none',
            id:'',
            modulAdi:"",
            email:"",
            sorumluPersonel:""

        };
    }

    componentDidMount() {
        this.getAllModules();
    }

    getAllModules(){
        this.GetSecureBase('api/Modul/GetModul?id='+this.state.modulId,this.state?.userInfo?.token)
        .then(
            data => {
                if (data) {
                    this.setState({
                        ...this.state,
                        modulInfo: data[0],
                        id:data[0].id,
                        modulAdi:data[0].modulAdi,
                        email:data[0].email,
                        sorumluPersonel:data[0].sorumluPersonel
                    });
                }
            });

    }


    onClickNewRecord = () => {
        this.setState({
            showInfoDiv: true,
            isDisabled: false,
            guncelleMod:'none',
            showAddButton:true,
            id: '',
            modulAdi: '',
            modulDomainAdi: '',
            sorumlu: '',
            emailGrubu: ''
        });
    }

      handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Modül seçildi:`, selectedOption.modulAdi);

      };

      handleGuncelle = () => this.setState({ isDisabled: false,guncelleMod:'none',showSaveButton:false})

      onMailChange = (e) => this.setState({ email: e.target.value })
      onModulAdiChange = (e) => this.setState({ modulAdi: e.target.value })
      onSorumluChange = (e) => this.setState({ sorumluPersonel: e.target.value })

      onClickVazgec = () => {
        this.setState({isDisabled: true,guncelleMod:false,showSaveButton:'none',showInfoDiv:'none',showAddButton:'none'}) ;
      }

      onClickKaydet = () => {
        let data={
            id:this.state.id,   
            modulAdi:this.state.modulAdi,
            email:this.state.email,
            sorumluPersonel:this.state.sorumluPersonel
            }
            this.setState({isDisabled: true,guncelleMod:false,showSaveButton:'none',showInfoDiv:'none',showAddButton:'none'});
            console.log(data);
            this.updateModul(data); ;
      }

      onClickEkle = () => {
       let data={
        id:0,   
        modulAdi:this.state.modulAdi,
        email:this.state.emailGrubu,
        sorumluPersonel:this.state.sorumlu
        }
        this.setState({isDisabled: true,guncelleMod:false,showSaveButton:'none',showInfoDiv:'none',showAddButton:'none'});
        console.log(data);
        this.insertorupdate(data);
      }

      /* insertorupdate=(data)=>{
        this.PostSecureBase('api/controller/RobotestSonuclar/InsertModul',data).then(
            data => {
                if (data===200) {
                    console.log("insert edildi")
                    alert("İşlem tamamlandı");
                    this.componentDidMount();
                }
            });
      } */

      insertorupdate=(data)=>{

         let header = {
            'Content-Type': 'application/json',
         };

        this.PostSecureBase('api/Modul/AddModul', data,this.state?.userInfo?.token)
        .then(
            data => {
                if (data) {
                    console.log("insert edildi")
                    alert("İşlem tamamlandı");
                    this.componentDidMount();
                }
            });
      }

      updateModul=(data)=>{

       this.PostSecureBase('api/Modul/UpdateModul', data,this.state?.userInfo?.token)//response.status idi
       .then(
           data => {
               if (data) {
                   console.log("Update edildi")
                   alert("Güncelleme Başarılı");
                   this.componentDidMount();
                   this.setState({isDisabled: true,guncelleMod:false,showSaveButton:'none',showInfoDiv:'none',showAddButton:'none'});
               }
           });
     }

     


    render() {
        var _this=this;
        let modules = this.state.apiList;

        return (
            <div>

                <div className="policy">
                <div className='mb-2' style={{marginLeft:10}}>
                <Button variant="success" type="submit" onClick={event => {
                                  var url = "/ModulList/";
                                  _this.props.history.push(url)
                                }}>
                            Geri
                        </Button>
                        </div>
                <Card>
                 <div>
                 <Container style={{ margin: 10}}>
                    <Row>
                    <Col sm={4}>
                    <Form.Label>Id</Form.Label>
                    <Form.Control type="text" name="id"  required
                                             disabled={true} value={this.state.modulInfo.id}/>
                    </Col>
                    <Col sm={4}>
                    <Form.Label>Modül Adı</Form.Label>
                    <Form.Control type="text" name="modulad" onChange={this.onModulAdiChange} required
                                             disabled={this.state.isDisabled} value={this.state.modulAdi}/>
                    </Col>
                    </Row>
                    <pre></pre>
                    <pre></pre>
                    <Row>
                    <Col sm={4}>
                    <Form.Label>Sorumlu</Form.Label>
                    <Form.Control type="text" name="sorumlu" onChange={this.onSorumluChange} required
                                             disabled={this.state.isDisabled} value={this.state.sorumluPersonel}/>
                   
                    </Col>
                    <Col sm={4}>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" name="email" onChange={this.onMailChange} required
                                             disabled={this.state.isDisabled} value={this.state.email}/>
                    </Col>
                    </Row>
                    <pre></pre>
                    <pre></pre>
                    <pre></pre>
                    <Row style={{ display:this.state.guncelleMod}}> 
                    <Col sm={2}>
                    <Button variant="info" type="submit" onClick={this.handleGuncelle}/* style={{ float: 'right' }} */>
                                        Güncelle
                        </Button>

                    </Col>
                    </Row>
                    <Row style={{ display:this.state.showSaveButton}}> 
                    <Col sm={2}>
                    <Button variant="primary" type="submit" onClick={this.onClickKaydet}/* style={{ float: 'right' }} */>
                                        Kaydet
                        </Button>
                        {" "}
                        <Button variant="danger" type="submit" onClick={this.onClickVazgec}/* style={{ float: 'right' }} */>
                                        Vazgeç
                        </Button>
                    </Col>
                    </Row>

                    <Row style={{ display:this.state.showAddButton}}> 
                    <Col sm={2}>
                    <Button variant="primary" type="submit" onClick={this.onClickEkle}/* style={{ float: 'right' }} */>
                                        Ekle
                        </Button>
                        {" "}
                        <Button variant="danger" type="submit" onClick={this.onClickVazgec}/* style={{ float: 'right' }} */>
                                        Vazgeç
                        </Button>
                    </Col>
                    </Row>
                    </Container>


                    </div>
                 </Card>
                </div>
            </div>

        )


    }


} export default ModulDetay